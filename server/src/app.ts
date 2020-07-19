import express, { Request, Response, NextFunction } from "express";
import { api } from "./controllers/api";
import { getDoctors, getDoctorsOne } from "./controllers/doctors";
import {
  getDoctorPatients,
  getDoctorPatientsOne,
  postDoctorPatient,
  putDoctorPatient,
  deleteDoctorPatient,
  getAllPatients,
} from "./controllers/patients";
import {
  getDiagnosticHistory,
  putDiagnosticHistory,
  postDiagnosticHistory,
} from "./controllers/diagnostic_history";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connected to MongoDB");
  })
  .catch((err) => {
    console.log(
      "MongoDB connection error. Please make sure MongoDB is running. " + err
    );
  });

app.set("port", process.env.PORT || 3000);
app.use(cors());
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", api);
app.get("/doctors/:doctorId/patients/:patientId", getDoctorPatientsOne);
app.get("/doctors/:doctorId/patients", getDoctorPatients);

app.get("/doctors/:_id", getDoctorsOne);
app.get("/doctors", getDoctors);
app.get("/patients", getAllPatients);

app.post("/doctors/:doctorId/patients", postDoctorPatient);
app.put("/doctors/:doctorId/patients/:patientId", putDoctorPatient);
app.delete("/doctors/:doctorId/patients/:patientId", deleteDoctorPatient);

app.get("/patients/:patientId/diagnostic_history", getDiagnosticHistory);
app.put("/patients/:patientId/diagnostic_history", putDiagnosticHistory);
app.post("/patients/:patientId/diagnostic_history", postDiagnosticHistory);

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});

export default app;
