import express, { Request, Response, NextFunction } from 'express';
import { api } from './controllers/api';
import { getDoctors, getDoctorsOne } from './controllers/doctors';
import { MONGODB_URI } from "./util/credentials";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

const mongoUrl = MONGODB_URI;

mongoose.connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then(
  () => { console.log('Successfully connected to MongoDB') },
).catch(err => {
  console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
});

app.set("port", process.env.PORT || 3000);
app.use(cors());
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', api);

app.get('/doctors/:_id', getDoctorsOne);
app.get('/doctors', getDoctors);
app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});

export default app