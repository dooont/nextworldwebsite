import express from "express";
import { login, logout } from "../controllers/adminController.js";

const adminRoutes = express.Router();

adminRoutes.post('/login', login);

adminRoutes.delete('/logout', logout);

export default adminRoutes;