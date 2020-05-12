import express from 'express';
import axios from 'axios';
import { api } from './api/api';

const app: express.Application = express();

app.use('/api', api);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('App is listening on port 3000!');
});