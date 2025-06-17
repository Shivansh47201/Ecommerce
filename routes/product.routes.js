import express from "express";
import authToken from "../middlewares/auth.middleware.js";
import isAdmin from "../middlewares/isAdmin.middleware.js";
import upload from '../middlewares/upload.middleware.js';

import {
  createProduct,
  getAllProducts,
  getProductsById,
  updateProduct,
  deleteProduct
} from "../controllers/product.controller.js"

const router = express.Router();


//user routes
router.get("/", getAllProducts);
router.get("/:id", getProductsById);

//Admin Routers
router.post("/", authToken, isAdmin, upload, createProduct);
router.put("/:id", authToken, isAdmin, upload, updateProduct);
router.delete("/:id", authToken, isAdmin, deleteProduct);

export default router;