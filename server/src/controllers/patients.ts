import { Request, Response, NextFunction } from 'express';
import { RequestPatients, Patients, PatientsDocument } from "../models/Patients";
import { ObjectID } from 'mongodb';


export const getPatientsOne = async (req: RequestPatients, res: Response, next: NextFunction) => {
  const {
    doctorId,
    patientId,
  } = req.params;

  try {

    const data = await Patients
      .find({ doctors: { $elemMatch: { $eq: doctorId } } })
      .findOne({ _id: patientId })
      .exec()
      .catch((err) => {
        console.error(err);
        if (err.name === 'CastError') {
          throw new Error('Wrong ObjectId was provided');
        }
        res.status(500).send({ error: err.message });
      });

    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ error: 'Not found', data: data })
    }
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message })
  }
}

export const getPatients = async (req: RequestPatients, res: Response, next: NextFunction) => {

  const {
    doctorId,
  } = req.params;

  const data = await Patients
    .find({ doctors: { $elemMatch: { $eq: doctorId } } })
    .exec()
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal server error");
    });

  console.log(data)
  res.json(data);
}

export const postPatient = async (req: RequestPatients, res: Response, next: NextFunction) => {

  const {
    doctorId,
  } = req.params;

  const newPatient: PatientsDocument = req.body;

  await Patients
    .insertMany([{ ...newPatient, doctors: [doctorId] }])
    .then(patient => {
      console.log(patient)
      res.json(patient);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal server error");
    });
}

export const deletePatient = async (req: RequestPatients, res: Response, next: NextFunction) => {

  const {
    doctorId,
    patientId: _id,
  } = req.params;

  const data = await Patients
    .deleteOne({ _id })
    .exec()
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal server error");
    });

  console.log(data)
  res.json(data);
}

export const putPatient = async (req: RequestPatients, res: Response, next: NextFunction) => {

  const {
    patientId: _id,
  } = req.params;

  const patientData: PatientsDocument = req.body;

  await Patients
    .updateOne({ _id }, patientData)
    .exec()
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal server error");
    });

  res.json(await Patients.find({ _id }));
}