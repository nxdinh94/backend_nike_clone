import { body, check } from 'express-validator';
import { Request, Response } from 'express';
import { validate } from "~/util/validate";
import { verifyToken } from '~/util/jwt';
import { ErrorWithStatus } from '~/models/Errors';
import { USERS_MESSAGES } from '~/constants/messages';
import HTTP_STATUS from '~/constants/httpStatus';
import { dataSource } from '~/dataSource';
import { Users } from '~/models/entity/users';

export const loginValidator = validate([
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
])



export const registerValidator = validate([
  body('email').isEmail().withMessage('Invalid email format').custom(async(value)=>{
    const firstUser = await dataSource
      .getRepository(Users)
      .createQueryBuilder("user")
      .where("user.email = :email", { email: value})
      .getOne()
    if(firstUser){
      throw new ErrorWithStatus({
        message : USERS_MESSAGES.USER_EXISTED,
        status : HTTP_STATUS.NOT_FOUND
      })
    }
  }),
  body('name').trim().notEmpty().withMessage(USERS_MESSAGES.NAME_IS_REQUIRED).custom(async(value: string)=>{
    if(value.length < 6){
      throw new ErrorWithStatus({
        message: USERS_MESSAGES.NAME_LENGTH_MUST_BE_GREATER_THAN_5,
        status : HTTP_STATUS.NOT_FOUND
      })    
    }
  }),
  body('password').isStrongPassword({
      minLength: 6,
      minLowercase : 1,
      minUppercase : 1,
      minNumbers: 1,
      minSymbols: 1,
    }).withMessage(USERS_MESSAGES.PASSWORD_MUST_BE_STRONG)
])


export const accessTokenValidator = validate([
    check('Authorization')
    .exists()
    .withMessage('Authorization header is required')
    .custom(async(value, { req }) => {
      // Split the Authorization header and check if it starts with "Bearer"
      if (!value || !value.startsWith('Bearer ')) {
        throw new Error('Invalid authorization format. Must use Bearer token.');
      }
      // Extract the token from the Bearer string
      const access_token = value.split(' ')[1];
      if (!access_token) {
        throw new Error('Bearer token missing.');
      }
      const decoded_authorization = await verifyToken({token: access_token, privateKey: process.env.JWT_SECRET_ACCESS_TOKEN as string})
      //cast req from express-validator to Request type of express
      //user semi collumn because we use bracket here
      ;(req as Request).decoded_authorization = decoded_authorization

      return true; // Token exists and follows the Bearer pattern
    }),
])

export const refreshTokenValidator = validate([
  body('refresh_token').custom(async(value)=>{
    if(!value){
      throw new ErrorWithStatus({
        message : USERS_MESSAGES.REFRESH_TOKEN_IS_REQUIRED,
        status:  HTTP_STATUS.UNAUTHORIZED
      })
    }
    console.log('refresh token');
  })
])

