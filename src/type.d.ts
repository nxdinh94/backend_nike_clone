
import { Request } from "express";
import { Users } from "./models/entity/users";

declare module 'express-serve-static-core' {
    interface Request {
        now?: number;
        userId: number;
        user : Users;
        decoded_authorization?: TokenPayload
        decoded_refresh_token? : TokenPayload
    }
}