import express from "express";
import { login, logout } from "../controllers/authController.js";

const adminRoutes = express.Router();

adminRoutes.get('/login', login);

adminRoutes.delete('/logout', logout);

export default adminRoutes;