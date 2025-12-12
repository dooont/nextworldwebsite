import express from "express";
import { addMember, updateMember, deleteMember, getMembers, getEveryMember } from "../controllers/membersController.js";
import authenticateAdminUser from "../middlewares/authenticateAdminUser.js";

const membersRouter = express.Router();

membersRouter.post('/', authenticateAdminUser, addMember);
membersRouter.get('/', getEveryMember);
membersRouter.get('/:type', getMembers);
membersRouter.put('/:id', authenticateAdminUser, updateMember);
membersRouter.delete('/:id', authenticateAdminUser, deleteMember);

export default membersRouter;

