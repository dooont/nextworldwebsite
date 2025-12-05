import express from "express";
import { addMember, updateMember, deleteMember, getMembers, getEveryMember } from "../controllers/membersController.js";


const membersRouter = express.Router();

membersRouter.post('/', addMember);
membersRouter.get('/', getEveryMember);
membersRouter.get('/:type', getMembers);
membersRouter.put('/:id', updateMember);
membersRouter.delete('/:id', deleteMember);

export default membersRouter;

