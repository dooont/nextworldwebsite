import express from "express";
import { addPastEvent, deletePastEvent, editPastEvent, getPastEvents } from "../controllers/pastEventsController.js";
import authenticateAdminUser from "../middlewares/authenticateAdminUser.js";

const pastEventsRouter = express.Router();

pastEventsRouter.post('/', authenticateAdminUser, addPastEvent);
pastEventsRouter.get('/', getPastEvents);
pastEventsRouter.delete('/:id', authenticateAdminUser, deletePastEvent);
pastEventsRouter.put('/:id', authenticateAdminUser, editPastEvent);
export default pastEventsRouter;

