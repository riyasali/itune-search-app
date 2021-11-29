import bodyParser from 'body-parser';
import express, { Router, Application } from 'express';
import helmet from 'helmet';
import responseTime from 'response-time';
import http from 'http';
import cors from 'cors';
import ituneRouter from './routes';

const corsOptions = {
    origin: 'http://localhost:4200',
    optionsSuccessStatus: 200 
  }

const app: Application = express();
app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(responseTime());

app.use('/itunes', cors(corsOptions), ituneRouter);

export default app;