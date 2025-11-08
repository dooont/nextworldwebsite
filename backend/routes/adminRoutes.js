import express from "express";
import { login } from "../controllers/adminController.js";

export default adminRoutes = express.Router();

router.post('/users', login);