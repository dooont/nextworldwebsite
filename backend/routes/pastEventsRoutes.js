import express from "express";
import { addPastEvent, deletePastEvent, getPastEvents } from "../controllers/pastEventsController.js";


const pastEventsRouter = express.Router();

pastEventsRouter.post('/', addPastEvent);
pastEventsRouter.get('/', getPastEvents);
pastEventsRouter.delete('/:id', deletePastEvent);

export default pastEventsRouter;

