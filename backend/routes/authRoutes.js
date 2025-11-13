import express from "express";
import { login, logout, refresh, resetPasswordRequest, resetPassword } from "../controllers/authController.js";
import authenticateAdminUser from "../middlewares/authenticateAdminUser.js";

const adminRoutes = express.Router();


adminRoutes.post('/login', login);

adminRoutes.post('/refresh', refresh);

adminRoutes.delete('/logout', logout);

adminRoutes.post('/forgot-password', resetPasswordRequest);

adminRoutes.post('/reset-password', resetPassword);

export default adminRoutes;