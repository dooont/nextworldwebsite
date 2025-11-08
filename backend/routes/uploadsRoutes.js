import express from "express";
import { getPresignedUrl } from "../controllers/uploadsController.js";

const uploadsRouter = express.Router();

uploadsRouter.get('/presign', getPresignedUrl);

export default uploadsRouter;