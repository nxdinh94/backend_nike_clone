import { NextFunction, Request, Response } from "express";
import { ParamsDictionary } from 'express-serve-static-core';
import { omit } from "lodash";
import { USERS_MESSAGES } from "~/constants/messages";
import { Users } from "~/models/entity/users";
import { LoginReqBody, LogoutReqBody, RegisterReqBody } from "~/requests/Users.requests";
import userServices from "~/services/users.services";
import { hashPassword } from "~/util/crypto";
import { formatName } from "~/util/formatName";



export const loginController =async (req: Request<ParamsDictionary, any, LoginReqBody>, res: Response, next: NextFunction) =>{
    const email = req.body.email
    const password = req.body.password
    const decodePassword = hashPassword(password)
    const result = await userServices.loginService({email, password: decodePassword})
    if (typeof result === 'string') {
        return res.status(401).json({ message: result });
    }
    req.user = result.user;
    return res.json({
        'message': USERS_MESSAGES.LOGGIN_SUCCESS,
        result: omit(result, 'user')
    });
}
export const registerController =async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response, next: NextFunction) =>{
    const email = req.body.email
    const password = req.body.password
    const name = req.body.name
    const role = req.body.role
    const result = await userServices.registerService({email, password, name, role})
    return res.json({
        'message': USERS_MESSAGES.LOGGIN_SUCCESS,
        result
    });
}
export const logoutController =async (req: Request<ParamsDictionary, any, LogoutReqBody>, res: Response, next: NextFunction) =>{
    const {refresh_token} = req.body
    const result = await userServices.logout(refresh_token)
    return res.json(result)
}
export const genAccessTokenController =async (req: Request<ParamsDictionary, any, RegisterReqBody>, res: Response, next: NextFunction) =>{
    var now = Math.floor(Date.now() / 1000);
    //expire after one hour
	var exp = now + 3600;

	var header = {cty: "stringee-api;v=1"};
	var payload = {
		jti: process.env.API_SID_KEY + "-" + now,
		iss: process.env.API_SID_KEY,
		exp: exp,
		userId: formatName(req.decoded_authorization.user_name),
	};
	var jwt = require('jsonwebtoken');
	var token = await jwt.sign(payload, process.env.API_SECRET_KEY, {algorithm: 'HS256', header: header})
	return res.status(200).json({'result': token});
}
