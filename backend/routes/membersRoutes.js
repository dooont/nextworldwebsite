import express from "express";
import { addMember } from "../controllers/membersController.js";


const membersRouter = express.Router();

membersRouter.post('/', addMember);

export default membersRouter;

