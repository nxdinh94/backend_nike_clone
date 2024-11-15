import express from 'express'
import {
  favoriteController,
  getMeController,
  loginController,
  logoutController,
  registerController
} from '~/controllers/users.controllers'
import {
  accessTokenValidator,
  favoriteValidator,
  loginValidator,
  refreshTokenValidator
} from '../middlewares/users.middlewares'
import { registerValidator } from './../middlewares/users.middlewares'
import { wrapRequestHandler } from './../util/handler'

const usersRouters = express.Router()

/*
    Description: Login 
    Path: users/login
    Method: POST,
    Body: {email: string, password: string}
*/
usersRouters.post('/login', loginValidator, wrapRequestHandler(loginController))

/*
    Description: Register 
    Path: users/register
    Method: POST,
    Body: {email: string, password: string, country: string, name: string, dob: string}
*/
usersRouters.post('/register', registerValidator, wrapRequestHandler(registerController))

/*
    Description: Logout 
    Header: Bearer token 
    Path: users/logout
    Method: POST,
    Body: {refresh_token: string}
*/
usersRouters.post('/logout', refreshTokenValidator, accessTokenValidator, wrapRequestHandler(logoutController))

usersRouters.get('/me', accessTokenValidator, wrapRequestHandler(getMeController))

/*
    Description: add or remove favorite products 
    Header: Bearer token 
    Path: users/favorite
    Method: POST,
    Params: {product_id: string}
*/
usersRouters.post(
  '/favorite/:product_id',
  accessTokenValidator,
  favoriteValidator,
  wrapRequestHandler(favoriteController)
)

export default usersRouters
