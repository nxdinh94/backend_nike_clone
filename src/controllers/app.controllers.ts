import appServices from '~/services/app.services'
import { Request, Response } from 'express'

export const getProductController = async (req: Request, res: Response) => {
  const result =  await appServices.getProductServices();
  return res.status(200).json(result);
}
