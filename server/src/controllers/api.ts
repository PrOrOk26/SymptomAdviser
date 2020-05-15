import express from 'express'
import { INFERMEDICA_ID, INFERMEDICA_KEY } from '../util/credentials'
import { Request, Response, NextFunction } from 'express';
import { RiskFactor, RiskFactorDocument } from "../models/RiskFactor";

const router = express.Router()

const headers = () => {
  return {
    'content-type': 'application/json',
    'App-Id': INFERMEDICA_ID,
    'App-Key': INFERMEDICA_KEY,
  };
}

router.get('/risk_factors', async (req: Request, res: Response, next: NextFunction) => {
  const data = await RiskFactor
    .find({})
    .exec()
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal server error");
    });

  console.log(data)
  res.json(data);
})

export { router as api }