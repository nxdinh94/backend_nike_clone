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
    const result = await userServices.loginService({ id: id.toString(), email })

    return res.json({
      message: USERS_MESSAGES.LOGGIN_SUCCESS,
      result
    })
  }
}
export const registerController = async (
  req: Request<ParamsDictionary, any, RegisterReqBody>,
  res: Response,
  next: NextFunction
) => {
  console.log('dfdf')
  const { email, password, country } = req.body
  const result = await userServices.registerService({ email, password, country })
  return res.json({
    message: USERS_MESSAGES.REGISTER_SUCCESS,
    result
  })
}
export const logoutController = async (
  req: Request<ParamsDictionary, any, LogoutReqBody>,
  res: Response,
  next: NextFunction
) => {
  const { refresh_token } = req.body
  const { id } = req.decoded_authorization

  const result = await userServices.logout(refresh_token, id)
  return res.json(result)
}
