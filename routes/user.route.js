import express from "express";
import { validateUserMiddleware } from "../middlewares/validate.middleware.js";
import {
  registerProfile,
  loginProfile,
  getProfile,
  updateProfile,
} from "../controllers/user.controller.js";
import authToken from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/home", (req, res) => res.send("Home"));

router.post("/register", validateUserMiddleware, registerProfile);
router.post("/login", loginProfile);
router.get("/me", authToken, getProfile);
router.put("/update", authToken, validateUserMiddleware, updateProfile);

export default router;
