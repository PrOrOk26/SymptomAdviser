import express, { Request, Response } from 'express';
import { api } from './controllers/api';

const app = express();

app.use('/api', api);

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!');
});

export default app