import express from "express";
import { addUpcomingEvent, updateUpcomingEvent, deleteUpcomingEvent, getUpcomingEvents } from "../controllers/upcomingEventsController.js";
import authenticateAdminUser from "../middlewares/authenticateAdminUser.js";

const upcomingEventsRouter = express.Router();

upcomingEventsRouter.post('/', authenticateAdminUser, addUpcomingEvent);
upcomingEventsRouter.get('/', getUpcomingEvents);
upcomingEventsRouter.put('/:id', authenticateAdminUser, updateUpcomingEvent);
upcomingEventsRouter.delete('/:id', authenticateAdminUser, deleteUpcomingEvent);

export default upcomingEventsRouter;