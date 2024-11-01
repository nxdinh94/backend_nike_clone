import { NextFunction, Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { omit } from 'lodash'
import { USERS_MESSAGES } from '~/constants/messages'
import { Users } from '~/models/entity/users'
import { LoginReqBody, LogoutReqBody, RegisterReqBody } from '~/requests/Users.requests'
import userServices from '~/services/users.services'
import { hashPassword } from '~/util/crypto'
import { formatName } from '~/util/formatName'

export const loginController = async (
  req: Request<ParamsDictionary, any, LoginReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { email, id } = req.user as Users

  if (email != null && id != null) {
    const result: { refresh_token: string; access_token: string } = await userServices.loginService({
      id: id.toString(),
      email
    })

    return res.json({
      refreshToken: result.refresh_token,
      accessToken: result.access_token
    })
  }
}
export const registerController = async (
  req: Request<ParamsDictionary, any, RegisterReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { email, password, country, dob, name } = req.body
  const { message } = await userServices.registerService({ email, password, country, dob, name })
  return res.json({
    message
  })
}
export const logoutController = async (
  req: Request<ParamsDictionary, any, LogoutReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { refreshToken } = req.body
  const { id } = req.decoded_authorization

  const result = await userServices.logout(refreshToken, id)
  return res.json(result)
}
