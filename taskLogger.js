import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logFilePath = path.join(__dirname, "logs.log");

function formatLogMessage(level, message) {
  const timestamp = new Date().toISOString();
  return `${timestamp} [${level.toUpperCase()}]: ${message}\n`;
}

const logger = {
  info: (message) => {
    const logMessage = formatLogMessage("info", message);
    fs.appendFileSync(logFilePath, logMessage);
  },
  warn: (message) => {
    const logMessage = formatLogMessage("warn", message);
    fs.appendFileSync(logFilePath, logMessage);
  },
  error: (message) => {
    const logMessage = formatLogMessage("error", message);
    fs.appendFileSync(logFilePath, logMessage);
  },
};

export default logger;
