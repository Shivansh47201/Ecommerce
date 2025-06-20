import express from "express";
import authToken from '../middlewares/auth.middleware.js'

import {
  addToCart,
  getCart,
  updateCartItem,
  removeCartItem,
  clearCart
} from '../controllers/cart.controller.js'


const router = express.Router();


router.use(authToken);

router.get('/', getCart);
router.post('/add', addToCart);
router.put('/update/:productId', updateCartItem);
router.delete('/update/:productId', removeCartItem);
router.delete('/clear',  clearCart);

export default router;