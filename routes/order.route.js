import express from "express";
import authToken from "../middlewares/auth.middleware.js";
import isAdmin from "../middlewares/isAdmin.middleware.js";

import {
  placeOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
} from "../controllers/order.controller.js";

const router = express.Router();

router.post("/", authToken, placeOrder);
router.get("/", authToken, getUserOrders);
router.get("/admin", authToken, isAdmin, getAllOrders);
router.put("/admin/:orderId", authToken, isAdmin, updateOrderStatus);

export default router;
