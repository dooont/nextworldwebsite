import express from "express";
import { newInquiry } from "../controllers/inquiriesController.js";


const inquiriesRouter = express.Router();

inquiriesRouter.post('/', newInquiry);

export default inquiriesRouter;

