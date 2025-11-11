import express from "express";
import dotenv from "dotenv/config";
import session from "express-session";

import uploadsRouter from "./routes/uploadsRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
import adminRoutes from "./routes/adminRoutes.js";
import articlesRouter from "./routes/articlesRoutes.js";
import upcomingEventsRouter from "./routes/upcomingEventsRoutes.js";
import pastEventsRouter from "./routes/pastEventsRoutes.js";
import membersRouter from "./routes/membersRoutes.js";
import inquiriesRouter from "./routes/inquiriesRoutes.js";


const app = express();

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60,
      secure: false,
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const serverPort = process.env.SERVER_PORT;


app.use('/uploads', uploadsRouter);

app.use('/admin', adminRoutes);

app.use('/articles', articlesRouter);

app.use('/upcoming-events', upcomingEventsRouter);

app.use('/past-events', pastEventsRouter);

app.use('/members', membersRouter);

app.use('/inquiries', inquiriesRouter);

app.use(errorHandler);

app.listen(serverPort, () => {
  console.log("New server running on port ", serverPort);
});