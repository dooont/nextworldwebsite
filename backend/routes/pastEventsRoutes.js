import express from "express";
import { addPastEvent } from "../controllers/pastEventsController.js";


const pastEventsRouter = express.Router();

pastEventsRouter.post('/', addPastEvent);

export default pastEventsRouter;

