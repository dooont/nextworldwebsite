import express from "express";
import { addArticle, updateArticle, getArticles, deleteArticle } from "../controllers/articlesController.js";
import authenticateAdminUser from "../middlewares/authenticateAdminUser.js";

const articlesRouter = express.Router();

articlesRouter.post('/', authenticateAdminUser, addArticle);
articlesRouter.get('/', getArticles);
articlesRouter.put('/:id', authenticateAdminUser, updateArticle);
articlesRouter.delete('/:id', authenticateAdminUser, deleteArticle);

export default articlesRouter;