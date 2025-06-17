import express from "express";
import upload from "../middlewares/upload.middleware.js";


const router = express.Router();

router.post("/upload", upload.single("image"));

export default router;
