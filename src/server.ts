import express, { Express, NextFunction, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import Routes from './routers';
import { VIDEO_DEST_PATH, VIDEO_DEST_PATH_NAME } from './constants';
import { notificationQueueListener } from './utils';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8080;

const consOptions = {
  origin: ['http://localhost:3000'],
};
const customHeaders = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Headers', 'Origin, Accept');
  next();
};

app.use(cors(consOptions));
app.use(customHeaders);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(VIDEO_DEST_PATH, express.static(VIDEO_DEST_PATH_NAME));

// video message worker
notificationQueueListener();

// routers
app.use('/api/', Routes);

app.listen(port, async () => {
  console.log(`[server]: Server is running at http://localhost:${port} `);
});
