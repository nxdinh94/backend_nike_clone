import express from 'express';
import { body, validationResult, ContextRunner } from 'express-validator';
import HTTP_STATUS from '~/constants/httpStatus';
import { ErrorWithStatus } from '~/models/Errors';

// can be reused by many routes
export const validate = (validations: ContextRunner[]) => {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    // sequential processing, stops running validations chain if one fails.
    for (const validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) {
        const errorObject = result.mapped()
        
        for(const key in errorObject) {
          const {msg} = errorObject[key];
          if(msg instanceof ErrorWithStatus) {
            next(msg)
          }
          next(errorObject);
        }
      }
    }
    next();
  };
};