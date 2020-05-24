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
  doctorId: ObjectID;
  triage: {
    triage_level: String,
    serious: [Object],
    teleconsultation_applicable: Boolean,
  },
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
  probability: String,
}, { timestamps: true });

const schema = new mongoose.Schema({
  _id: ObjectID,
  patientId: ObjectID,
  doctorId: ObjectID,
  dateCreated: Date,
  triage: {
    root_cause: String,
    triage_level: String,
    serious: [Object],
    teleconsultation_applicable: Boolean,
  },
  conditions: [DiagnosticHistoryItemSchema]
}, { timestamps: true });

export const DiagnosticHistory = mongoose.model<DiagnosticHistoryDocument>("DiagnosticHistory", schema, "diagnostic_history");