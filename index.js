import express from "express";
import { rateLimiter } from "./rateLimiter.js";
import logger from "./taskLogger.js";
import { PORT } from "./config.js";

export function createServer() {
  const app = express();

  app.use(express.json());

  app.post(
    "/api/v1/task",
    rateLimiter({ limit: 3, duration: 60 }),
    (req, res) => {
      const { user_id } = req.body;

      if (!user_id) {
        res.status(400).json({ message: "Please provide a user_id." });
        return;
      }

      const completionMessage = `${user_id}-task completed at-${Date.now()}`;
      logger.info(completionMessage);
      console.log(completionMessage);

      res.json({ message: "Task processed successfully..." });
      logger.info(`Success: ${req.ip} accessed ${req.originalUrl}`);
    }
  );

  const port = PORT;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}

export default createServer;
