import express from "express";
import { addUpcomingEvent } from "../controllers/upcomingEventsController.js";


const upcomingEventsRouter = express.Router();

upcomingEventsRouter.post('/', addUpcomingEvent);

export default upcomingEventsRouter;