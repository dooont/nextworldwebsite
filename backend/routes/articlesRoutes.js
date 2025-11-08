import express from "express";
import { addArticle } from "../controllers/articlesController.js";


const articlesRouter = express.Router();

articlesRouter.post('/', addArticle);

export default articlesRouter;