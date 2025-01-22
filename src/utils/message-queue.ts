import { JobsOptions, Queue, QueueOptions } from 'bullmq';

import { v4 as uuid } from 'uuid';
import {
  NOTIFICATION_QUEUE_NAME,
  NOTIFICATION_QUEUE_PREFIX,
} from '../constants';
import { redisConnection } from './redis';

const jobOptions: JobsOptions = {
  removeOnComplete: true,
  removeOnFail: true,
  attempts: 2,
  backoff: 2,
};

const queueOptions: QueueOptions = {
  connection: redisConnection,
  prefix: NOTIFICATION_QUEUE_PREFIX,
};

const messageQueue = new Queue(NOTIFICATION_QUEUE_NAME, queueOptions);
(async () => await messageQueue.setGlobalConcurrency(4))();

export const addMessageToDockerQueue = async <T>(task: T) => {
  const _id = uuid();
  return await messageQueue.add(_id, task, jobOptions);
};
