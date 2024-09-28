import express from 'express';
import {
    loginController,
    logoutController,
    registerController
} from '~/controllers/users.controllers';
import { accessTokenValidator, loginValidator, refreshTokenValidator } from '../middlewares/users.middlewares';
import { registerValidator } from './../middlewares/users.middlewares';
import { wrapRequestHandler } from './../util/handler';

const usersRouters = express.Router()

usersRouters.post('/login' , loginValidator, wrapRequestHandler(loginController));
usersRouters.post('/register', registerValidator, wrapRequestHandler(registerController));


usersRouters.post('/logout', refreshTokenValidator, accessTokenValidator, wrapRequestHandler(logoutController));


export default usersRouters