import { registerValidator } from './../middlewares/users.middlewares';
import express from 'express';
import { accessTokenValidator, loginValidator, refreshTokenValidator } from '../middlewares/users.middlewares';
import { wrapRequestHandler } from './../util/handler';
import {
    genAccessTokenController,
    loginController,
    logoutController,
    registerController
} from '~/controllers/users.controllers';

const usersRouters = express.Router()

usersRouters.post('/login' , loginValidator, wrapRequestHandler(loginController));
usersRouters.post('/register', registerValidator,wrapRequestHandler(registerController));



usersRouters.get('/stringee/gen-access-token', accessTokenValidator,wrapRequestHandler(genAccessTokenController));
usersRouters.post('/logout ',()=>{
    console.log('dfdf');
});


export default usersRouters