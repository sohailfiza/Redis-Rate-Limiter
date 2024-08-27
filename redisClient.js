import Redis from "ioredis";
import { REDIS_HOST, REDIS_PORT } from "./config.js";

// Create Redis client using IIFE and Singleton pattern
const redisClient = (() => {
  const client = new Redis({
    host: REDIS_HOST,
    port: REDIS_PORT,
  });
  client.on("connect", () => {
    console.log("Connected to Redis");
  });
  client.on("error", (err) => {
    console.error("Redis error:", err);
  });
  return client;
})();

export default redisClient;
