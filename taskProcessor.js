import redisClient from "./redisClient.js";
import logger from "./taskLogger.js";
import fs from "fs";

export async function processQueue(user_id) {
  const redisKey = `rate_limit:${user_id}`;
  const queueKey = `task_queue:${user_id}`;

  const interval = setInterval(async () => {
    const requests = await redisClient.get(redisKey);

    if (!requests || parseInt(requests) < 20) {
      const nextTask = await redisClient.lpop(queueKey);
      if (nextTask) {
        const { taskId, timestamp } = JSON.parse(nextTask);
        await redisClient.multi().incr(redisKey).expire(redisKey, 60).exec();

        const logEntry = `${user_id}-task completed at-${timestamp}\n`;
        fs.appendFileSync("./logs/tasks.log", logEntry);
        logger.info(`Processed task ${taskId} for user ${user_id}`);
      } else {
        clearInterval(interval);
      }
    }
  }, 1000);
}
