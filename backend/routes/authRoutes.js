import express from "express";
import { login, logout, refresh } from "../controllers/authController.js";
import authenticateAdminUser from "../middlewares/authenticateAdminUser.js";

const adminRoutes = express.Router();


adminRoutes.post('/login', login);

adminRoutes.post('/refresh', refresh);

adminRoutes.delete('/logout', logout);

export default adminRoutes;