import { Request, Response, NextFunction } from 'express';
import { Doctors, RequestDoctors } from "../models/Doctors";
import { ObjectId } from 'mongodb';


export const getDoctorsOne = async (req: RequestDoctors, res: Response, next: NextFunction) => {
  const {
    _id,
  } = req.params;

  try {

    const data = await Doctors
      .findOne({ _id })
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

export const getDoctors = async (req: RequestDoctors, res: Response, next: NextFunction) => {

  const data = await Doctors
    .find({})
    .exec()
    .catch((err) => {
      console.error(err);
      res.status(500).send("Internal server error");
    });

  console.log(data)
  res.json(data);
}