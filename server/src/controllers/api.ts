import express from 'express'
import { INFERMEDICA_ID, INFERMEDICA_KEY } from '../util/credentials'
import { Request, Response, NextFunction } from 'express';
import { RiskFactors, RequestRiskFactors } from "../models/RiskFactor";
import { Symptoms, RequestSymptoms } from "../models/Symptoms";
import { Conditions, RequestConditions } from '../models/Conditions';

const router = express.Router()

const headers = () => {
  return {
    'content-type': 'application/json',
    'App-Id': INFERMEDICA_ID,
    'App-Key': INFERMEDICA_KEY,
  };
}

router.get('/risk_factors/:id', async (req: RequestRiskFactors, res: Response, next: NextFunction) => {
  const {
    id,
  } = req.params;

  const data = await RiskFactors
    .findOne({ id })
    .exec()
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal server error");
    });

  if (data) {
    res.json(data);
  } else {
    res.status(404).json({ error: 'Not found' })
  }
})

router.get('/risk_factors', async (req: RequestRiskFactors, res: Response, next: NextFunction) => {

  const data = await RiskFactors
    .find({})
    .exec()
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal server error");
    });

  console.log(data)
  res.json(data);
})

router.get('/symptoms/:id', async (req: RequestSymptoms, res: Response, next: NextFunction) => {
  const {
    id,
  } = req.params;

  const data = await Symptoms
    .findOne({ id })
    .exec()
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal server error");
    });

  if (data) {
    console.log(data)
    res.json(data);
  } else {
    res.status(404).json({ error: 'Not found' })
  }
})

router.get('/symptoms', async (req: RequestSymptoms, res: Response, next: NextFunction) => {
  const data = await Symptoms
    .find({})
    .exec()
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal server error");
    });

  console.log(data)
  res.json(data);
})

router.get('/conditions/:id', async (req: RequestConditions, res: Response, next: NextFunction) => {
  const {
    id,
  } = req.params;

  const data = await Conditions
    .findOne({ id })
    .exec()
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal server error");
    });

  if (data) {
    console.log(data)
    res.json(data);
  } else {
    res.status(404).json({ error: 'Not found' })
  }
})

router.get('/conditions', async (req: RequestConditions, res: Response, next: NextFunction) => {
  const data = await Conditions
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