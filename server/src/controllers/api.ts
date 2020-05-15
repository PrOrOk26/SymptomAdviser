import express from 'express'
import credentials from '../config/credentials'
import { Request, Response } from 'express';

const router = express.Router()

const headers = () => {
  return {
    'content-type': 'application/json',
    ...credentials,
  };
}

router.get('/risk_factors', (req: Request, res: Response) => {
  res.send('This is a test response')
})

export { router as api }