import express from "express";
import { addPastEvent, deletePastEvent } from "../controllers/pastEventsController.js";


const pastEventsRouter = express.Router();

pastEventsRouter.post('/', addPastEvent);
pastEventsRouter.delete('/:id', deletePastEvent);

export default pastEventsRouter;

