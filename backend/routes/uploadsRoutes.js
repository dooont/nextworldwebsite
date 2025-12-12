import express from "express";
import { deleteS3Image, getPresignedUrl } from "../controllers/uploadsController.js";
import authenticateAdminUser from "../middlewares/authenticateAdminUser.js";

const uploadsRouter = express.Router();

uploadsRouter.get('/presign', authenticateAdminUser, getPresignedUrl);
uploadsRouter.delete('/', authenticateAdminUser, deleteS3Image);

export default uploadsRouter;