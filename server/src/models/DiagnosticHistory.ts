import mongoose from "mongoose";
import { ObjectID } from "mongodb";
import { Request } from "express";

interface DiagnosticHistoryItem {
  id: string;
  common_name: string;
  name: string;
  probability: string;
};

export type DiagnosticHistoryDocument = mongoose.Document & {
  _id: ObjectID;
  patientId: ObjectID;
  dateCreated: Date;
  conditions: Array<DiagnosticHistoryItem>;
};

export interface RequestDiagnosticHistory extends Request {
  params: {
    doctorId?: string;
    patientId?: string;
    [key: string]: string | undefined;
  }
}

const DiagnosticHistoryItemSchema = new mongoose.Schema({
  id: String,
  common_name: String,
  name: String,
  probability: Boolean,
}, { timestamps: true });

const schema = new mongoose.Schema({
  _id: ObjectID,
  patientId: ObjectID,
  dateCreated: Date,
  conditions: [DiagnosticHistoryItemSchema]
}, { timestamps: true });

export const DiagnosticHistory = mongoose.model<DiagnosticHistoryDocument>("DiagnosticHistory", schema, "diagnostic_history");