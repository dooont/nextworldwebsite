import express from "express";
import dotenv from "dotenv/config";

import uploadsRouter from "./routes/uploadsRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";

const serverPort = process.env.SERVER_PORT;

const app = express();

app.use('/uploads', uploadsRouter);

app.use(errorHandler);

app.listen(serverPort, () => {
  console.log("New server running on port ", serverPort);
});