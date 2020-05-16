import mongoose from "mongoose";
import { ObjectID } from "mongodb";

export type SymptomDocument = mongoose.Document & {
  _id: ObjectID;
  id: string;
  name: string;
  common_name: string;
  sex_filter: string;
  category: string;
  seriousness: string;
  extras: object;
  image_url: string | null;
  image_source: string | null;
  parent_id: string | null;
  parent_relation: string | null;
};

const symptomSchema = new mongoose.Schema({
  _id: ObjectID,
  id: String,
  name: String,
  common_name: String,
  sex_filter: String,
  category: String,
  seriousness: String,
  extras: Object,
  image_url: String || null,
  image_source: String || null,
  parent_id: String || null,
  parent_relation: String || null,
}, { timestamps: true });

export const Symptoms = mongoose.model<SymptomDocument>("Symptoms", symptomSchema, "symptoms");