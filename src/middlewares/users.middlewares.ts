import { body, check, matchedData } from 'express-validator'
import { Request, Response } from 'express'
import { validate } from '~/util/validate'
import { verifyToken } from '~/util/jwt'
import { ErrorWithStatus } from '~/models/Errors'
import { USERS_MESSAGES } from '~/constants/messages'
import HTTP_STATUS from '~/constants/httpStatus'
import { dataSource } from '~/dataSource'
import { Users } from '~/models/entity/users'
import { RefreshToken } from '~/models/entity/refreshToken'
import { hashPassword } from '~/util/crypto'

export const loginValidator = validate([
  body('email').notEmpty().withMessage(USERS_MESSAGES.EMAIL_IS_REQUIRED),

  body('password')
    .notEmpty()
    .withMessage(USERS_MESSAGES.PASSWORD_IS_REQUIRED)
    .custom(async (password, { req }) => {
      const { email } = matchedData(req)
      const hashedPassword = hashPassword(password)
      const firstUser = await dataSource
        .getRepository(Users)
        .createQueryBuilder('user')
        .where('user.email = :email', { email })
        .andWhere('user.password = :password', { password: hashedPassword })
        .getOne()

      if (!firstUser) {
        throw new ErrorWithStatus({ message: 'Invalid email or password', status: HTTP_STATUS.UNAUTHORIZED })
      }
      ;(req as Request).user = firstUser
      return true
    })
])

export const registerValidator = validate([
  body('email')
    .isEmail()
    .withMessage('Invalid email format')
    .custom(async (value) => {
      const firstUser = await dataSource
        .getRepository(Users)
        .createQueryBuilder('user')
        .where('user.email = :email', { email: value })
        .getOne()
      if (firstUser) {
        throw new ErrorWithStatus({
          message: USERS_MESSAGES.USER_EXISTED,
          status: HTTP_STATUS.NOT_FOUND
        })
      }
      return true
    }),
  body('password')
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    })
    .withMessage(USERS_MESSAGES.PASSWORD_MUST_BE_STRONG),

  body('country').trim().notEmpty().withMessage('Country is require')
])

export const accessTokenValidator = validate([
  check('Authorization')
    .exists()
    .withMessage('Authorization header is required')
    .custom(async (value, { req }) => {
      // Split the Authorization header and check if it starts with "Bearer"
      if (!value || !value.startsWith('Bearer ')) {
        throw new Error('Invalid authorization format. Must use Bearer token.')
      }
      // Extract the token from the Bearer string
      const access_token = value.split(' ')[1]
      if (!access_token) {
        throw new Error('Bearer token missing.')
      }
      const decoded_authorization = await verifyToken({
        token: access_token,
        privateKey: process.env.JWT_SECRET_ACCESS_TOKEN as string
      })
      //cast req from express-validator to Request type of express
      //user semi collumn because we use bracket here
      ;(req as Request).decoded_authorization = decoded_authorization

      return true // Token exists and follows the Bearer pattern
    })
])

export const refreshTokenValidator = validate([
  body('refresh_token').custom(async (value: string, { req }) => {
    if (!value) {
      throw new ErrorWithStatus({
        message: USERS_MESSAGES.REFRESH_TOKEN_IS_REQUIRED,
        status: HTTP_STATUS.UNAUTHORIZED
      })
    }
    const [decoded_refresh_token, refresh_token] = await Promise.all([
      verifyToken({ token: value, privateKey: process.env.JWT_SECRET_REFRESH_TOKEN as string }),
      dataSource
        .getRepository(RefreshToken)
        .createQueryBuilder('refresh_token')
        .where('refresh_token.token = :token', { token: value })
        .getOne()
    ])
    console.log(refresh_token)
    if (refresh_token === null) {
      throw new ErrorWithStatus({
        message: USERS_MESSAGES.USED_REFRESH_TOKEN_OR_NOT_EXISTS,
        status: HTTP_STATUS.UNAUTHORIZED
      })
    }
    ;(req as Request).decoded_refresh_token = decoded_refresh_token
    return true
  })
])
