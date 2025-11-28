import express from "express";
import { deleteS3Image, getPresignedUrl } from "../controllers/uploadsController.js";

const uploadsRouter = express.Router();

uploadsRouter.get('/presign', getPresignedUrl);
uploadsRouter.delete('/', deleteS3Image);

export default uploadsRouter;