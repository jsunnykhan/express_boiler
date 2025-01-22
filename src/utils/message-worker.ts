import { Job, Worker, WorkerOptions } from 'bullmq';
import {
  NOTIFICATION_QUEUE_NAME,
  NOTIFICATION_QUEUE_PREFIX,
} from '../constants';
import { redisConnection } from './redis';
import { createNewDockerContainer } from './docker-config';
import { FileUploadResponse } from '../@types';
import logger from './logger';

const workerOptions: WorkerOptions = {
  connection: redisConnection,
  prefix: NOTIFICATION_QUEUE_PREFIX,
  limiter: {
    max: 1,
    duration: 10 * 1000,
  },
};

const processors = async (job: Job) => {
  try {
    const token = job.token as string;
    const { url, size, name }: FileUploadResponse = job.data;

    if (!url) return 'No data Found';

    const container = await createNewDockerContainer({
      VIDEO_URL: url,
      TOKEN: token,
    });

    if (!container) return 'failed to create docker container';

    await container.start();

    return {
      'container-id': container.id,
      message: 'container started',
    };
  } catch (error) {
    logger.error(error);
  }
};

export const notificationQueueListener = () =>
  new Worker(NOTIFICATION_QUEUE_NAME, processors, workerOptions);
