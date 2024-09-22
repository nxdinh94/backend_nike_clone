import { wrapRequestHandler } from './../util/handler';
import { Router, Request, Response, NextFunction } from 'express'
import { getProductController } from '~/controllers/app.controllers'

const appRouter = Router()


/*
    Description: Get all products
    Path: /products
    Method: GET,
    Body: {}
*/
appRouter.get('/products', wrapRequestHandler(getProductController))

export default appRouter
