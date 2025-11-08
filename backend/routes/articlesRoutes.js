import express from "express";
import { addArticle, updateArticle } from "../controllers/articlesController.js";


const articlesRouter = express.Router();

articlesRouter.post('/', addArticle);
articlesRouter.put('/:id', updateArticle);

export default articlesRouter;