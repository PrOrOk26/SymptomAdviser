import mongoose from "mongoose";
import { ObjectID } from "mongodb";
import { Request } from "express";

export type DoctorsDocument = mongoose.Document & {
  _id: ObjectID;
  name: string;
  surname: string;
  specialty: string;
};

export interface RequestDoctors extends Request {
  params: {
    _id: string;
    [key: string]: string | undefined;
  };
}

const schema = new mongoose.Schema({
  _id: ObjectID,
  name: String,
  surname: String,
  specialty: String,
}, { timestamps: true });

export const Doctors = mongoose.model<DoctorsDocument>("Doctors", schema, "doctors");