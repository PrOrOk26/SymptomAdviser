import mongoose from "mongoose";
import { ObjectID } from "mongodb";
import { Request } from "express";

export type ConditionsDocument = mongoose.Document & {
  _id: ObjectID;
  id: string;
  name: string;
  common_name: string;
  sex_filter: string;
  categories: string[];
  prevalence: string;
  acuteness: string;
  severity: string;
  exras: {
    icd10_code: string | undefined;
    hint: string | undefined;
  };
  triage_level: string;
};

export interface RequestConditions extends Request {
  params: {
    id: string;
    [key: string]: string | undefined;
  };
}

const conditionsSchema = new mongoose.Schema({
  _id: ObjectID,
  id: String,
  name: String,
  common_name: String,
  sex_filter: String,
  categories: [String],
  prevalence: String,
  acuteness: String,
  severity: String,
  exras: {
    icd10_code: String || undefined,
    hint: String || undefined,
  },
  triage_level: String
}, { timestamps: true });

export const Conditions = mongoose.model<ConditionsDocument>("Conditions", conditionsSchema, "conditions");