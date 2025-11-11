import express from "express";
import { addMember, updateMember, deleteMember } from "../controllers/membersController.js";


const membersRouter = express.Router();

membersRouter.post('/', addMember);
membersRouter.put('/:id', updateMember);
membersRouter.delete('/:id', deleteMember);

export default membersRouter;

