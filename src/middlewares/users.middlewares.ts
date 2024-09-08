import { body, check } from 'express-validator';
import { Request, Response } from 'express';
import { validate } from "~/util/validate";
import { verifyToken } from '~/util/jwt';

export const loginValidator = validate([
    body('email').isEmail().withMessage('Invalid email format'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
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

