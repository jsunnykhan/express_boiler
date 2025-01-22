import { Router } from 'express';
import videoRoute from './routes/video-upload';

const routers = Router();

routers.use('/video', videoRoute);

export default routers;
