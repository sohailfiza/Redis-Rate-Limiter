import { config } from "dotenv";

config();

export const PORT = process.env.PORT;
export const REDIS_HOST = process.env.REDIS_HOST;
export const REDIS_PORT = process.env.REDIS_PORT;
