import express from "express";
import { addArticle, updateArticle, getArticles } from "../controllers/articlesController.js";


const articlesRouter = express.Router();

articlesRouter.post('/', addArticle);
articlesRouter.get('/', getArticles);
articlesRouter.put('/:id', updateArticle);

export default articlesRouter;