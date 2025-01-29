import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import Routes from './routes';
import { logger } from './utils';

dotenv.config();

const app: Express = express();
const port = process.env.SERVER_PORT || 8080;

const consOptions = {
  origin: ['http://localhost:3000'],
};
const customHeaders = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, Accept');
  next();
};

const customLogger = (req: Request, res: Response, next: NextFunction) => {
  logger.debug('catch debug data and store somewhere');
  next();
};

app.use(cors(consOptions));
app.use(customHeaders);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(customLogger);

// routes with prefix
app.use('/api/', Routes);

app.listen(port, async () => {
  console.log(`[server]: Server is running at http://localhost:${port} `);
});
