import express from 'express';
import { accessTokenValidator, loginValidator } from '../middlewares/users.middlewares';
import { wrapRequestHandler } from './../util/handler';
import {
    genAccessTokenController,
    loginController,
    registerController
} from '~/controllers/users.controllers';

const usersRouters = express.Router()

usersRouters.post('/login' , loginValidator, wrapRequestHandler(loginController));
usersRouters.post('/register', wrapRequestHandler(registerController));

usersRouters.get('/stringee/gen-access-token', accessTokenValidator,wrapRequestHandler(genAccessTokenController));


export default usersRouters