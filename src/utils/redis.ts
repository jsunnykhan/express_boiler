import Redis, { RedisOptions } from 'ioredis';

const port: number = Number(process.env.REDIS_PORT) || 6379;

const config: RedisOptions = {
  port,
  maxRetriesPerRequest: null,
};

export const redisConnection = new Redis(config);


