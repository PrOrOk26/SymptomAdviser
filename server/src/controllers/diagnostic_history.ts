import { Request, Response, NextFunction } from 'express';
import {
  DiagnosticHistory,
  DiagnosticHistoryDocument,
  RequestDiagnosticHistory
} from "../models/DiagnosticHistory";
import { ObjectID } from 'mongodb';

export const getDiagnosticHistory = async (req: RequestDiagnosticHistory, res: Response, next: NextFunction) => {

  const {
    patientId,
  } = req.params;

  console.log(patientId)

  const data = await DiagnosticHistory
    .findOne({ patientId })
    .exec()
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal server error");
    });

  console.log(data)
  res.json(data);
}

export const putDiagnosticHistory = async (req: RequestDiagnosticHistory, res: Response, next: NextFunction) => {

  const {
    patientId,
  } = req.params;

  const newDiagnosticHistory: DiagnosticHistoryDocument = req.body;

  await DiagnosticHistory
    .findOneAndUpdate({ patientId }, newDiagnosticHistory)
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal server error");
    });

  res.json(await DiagnosticHistory.findOne({ patientId }))
}
