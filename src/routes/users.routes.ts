import express from 'express'
import { loginController, logoutController, registerController } from '~/controllers/users.controllers'
import { accessTokenValidator, loginValidator, refreshTokenValidator } from '../middlewares/users.middlewares'
import { registerValidator } from './../middlewares/users.middlewares'
import { wrapRequestHandler } from './../util/handler'
import { body } from 'express-validator'

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

export default usersRouters
