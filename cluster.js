import cluster from "cluster";
import os from "os";
import createServer from "./index.js";

if (cluster.isPrimary) {
  const numCPUs = os.cpus().length;

  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < Math.min(numCPUs, 2); i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  createServer();
  console.log(`Worker ${process.pid} started`);
}
