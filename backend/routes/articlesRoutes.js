import express from "express";
import { addArticle, updateArticle, getArticles, deleteArticle } from "../controllers/articlesController.js";


const articlesRouter = express.Router();

articlesRouter.post('/', addArticle);
articlesRouter.get('/', getArticles);
articlesRouter.put('/:id', updateArticle);
articlesRouter.delete('/:id', deleteArticle);

export default articlesRouter;