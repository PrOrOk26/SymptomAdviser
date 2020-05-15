import express, { Request, Response } from 'express';
import { api } from './controllers/api';
import { MONGODB_URI } from "./util/credentials";
import mongoose from "mongoose";
import bodyParser from "body-parser";

const app = express();

const mongoUrl = MONGODB_URI;

mongoose.connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then(
  () => { console.log('Successfully connected to MongoDB') },
).catch(err => {
  console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
});

app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', api);

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});

export default app