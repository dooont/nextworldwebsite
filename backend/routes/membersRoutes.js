import express from "express";
import { addMember, updateMember } from "../controllers/membersController.js";


const membersRouter = express.Router();

membersRouter.post('/', addMember);
membersRouter.put('/:id', updateMember);

export default membersRouter;

