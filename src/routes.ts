import { Router } from 'express';
import { exampleRouter } from './routers';

const routers = Router();

routers.use('/example', exampleRouter);

export default routers;
