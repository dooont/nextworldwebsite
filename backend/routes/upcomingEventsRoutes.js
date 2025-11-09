import express from "express";
import { addUpcomingEvent, updateUpcomingEvent } from "../controllers/upcomingEventsController.js";


const upcomingEventsRouter = express.Router();

upcomingEventsRouter.post('/', addUpcomingEvent);
upcomingEventsRouter.put('/:id', updateUpcomingEvent);

export default upcomingEventsRouter;