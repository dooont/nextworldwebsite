import express from "express";
import dotenv from "dotenv/config";

import uploadsRouter from "./routes/uploadsRoutes.js";

const serverPort = process.env.SERVER_PORT;

const app = express();

app.use('/uploads', uploadsRouter);

app.listen(serverPort, () => {
  console.log("New server running on port ", serverPort);
})