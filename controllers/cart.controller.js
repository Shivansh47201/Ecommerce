import CartService from '../services/cart.service.js'

//Get Cart
export const getCart = async (req, res) => {
  try {
    console.log(req.user._id)
    const cart = await CartService.getCart(req.user._id);
    res.status(200).json({
      status: true,
      message: "Get Cart Successfully",
      cart,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

//Get Add cart
export const addToCart = async (req, res) => {
  try {
    const cart = await CartService.addToCart(req.user._id, req.body);
    res.status(201).json({
      status: true,
      message: "Add Cart Product Successfully",
      cart,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

//Get Update cart
export const updateCartItem = async (req, res) => {
  try {
    const cart = await CartService.updateCartItem(
      req.user._id,
      req.params.productId,
      req.body.quantity
    );

    res.status(200).json({
      status: true,
      message: "Update Cart Product Successfully",
      cart,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

//Get Remove cart
export const removeCartItem = async (req, res) => {
  try {
    const cart = await CartService.removeCartItem(
      req.user._id,
      req.params.productId
    );

    res.status(200).json({
      status: true,
      message: "Remove cart Product  Successfully",
      cart,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};

//Get Clear cart
export const clearCart = async (req, res) => {
  try {
    const cart = await CartService.clearCart(req.user._id);

    res.status(200).json({
      status: true,
      message: "Cart cleared successfully",
      cart,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};
