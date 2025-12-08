import express from "express";
import { addPastEvent, deletePastEvent, editPastEvent, getPastEvents } from "../controllers/pastEventsController.js";


const pastEventsRouter = express.Router();

pastEventsRouter.post('/', addPastEvent);
pastEventsRouter.get('/', getPastEvents);
pastEventsRouter.delete('/:id', deletePastEvent);
pastEventsRouter.put('/:id', editPastEvent);
export default pastEventsRouter;

