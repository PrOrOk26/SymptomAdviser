import mongoose from "mongoose";
import { ObjectID } from "mongodb";
import { Request } from "express";
import { SymptomDocument } from "./Symptoms"

interface PatientsSymptom {
  id: string;
  common_name: string;
  choise_id: "present" | "absent" | "unknown";
  initial: boolean | undefined;
};

export type PatientsDocument = mongoose.Document & {
  _id: ObjectID;
  name: string;
  surname: string;
  card_number: string;
  sex: string;
  age: string;
  evidence?: Array<PatientsSymptom>;
  doctors?: ObjectID[];
};

export interface RequestPatients extends Request {
  params: {
    doctorId: string;
    patientId?: string;
    [key: string]: string | undefined;
  }
}

const SymptomSchema = new mongoose.Schema({
  id: String,
  common_name: String,
  choise_id: String,
  initial: Boolean,
}, { timestamps: true });

const schema = new mongoose.Schema({
  _id: ObjectID,
  name: String,
  surname: String,
  card_number: String,
  sex: String,
  age: String,
  evidence: [SymptomSchema],
  doctors: [ObjectID],
}, { timestamps: true });

export const Patients = mongoose.model<PatientsDocument>("Patients", schema, "patients");