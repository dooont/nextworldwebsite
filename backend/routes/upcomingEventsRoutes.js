import express from "express";
import { addUpcomingEvent, updateUpcomingEvent, deleteUpcomingEvent, getUpcomingEvents } from "../controllers/upcomingEventsController.js";


const upcomingEventsRouter = express.Router();

upcomingEventsRouter.post('/', addUpcomingEvent);
upcomingEventsRouter.get('/', getUpcomingEvents);
upcomingEventsRouter.put('/:id', updateUpcomingEvent);
upcomingEventsRouter.delete('/:id', deleteUpcomingEvent);

export default upcomingEventsRouter;