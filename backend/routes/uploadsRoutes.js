import express from "express";
import { getPresignedUrl } from "../controllers/uploadsController.js";

const router = express.Router();

router.get('/presign', getPresignedUrl);

export default router;