import mongoose from "mongoose";
import { ObjectID } from "mongodb";
import { Request } from "express";

export type RiskFactorsDocument = mongoose.Document & {
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
};

export interface RequestRiskFactors extends Request {
  params: {
    id: string;
    [key: string]: string | undefined;
  };
}

const riskFactorsSchema = new mongoose.Schema({
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
}, { timestamps: true });

export const RiskFactors = mongoose.model<RiskFactorsDocument>("RiskFactors", riskFactorsSchema, "risk_factors");