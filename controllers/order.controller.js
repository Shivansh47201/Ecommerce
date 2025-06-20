import OrderService from '../services/order.service.js';

export const placeOrder = async (req, res) => {
  try {
    const order = await OrderService.placeOrder(req.user._id, req.body.shippingAddress);
    res.status(201).json({
      success: true,
      message: "Order Placed",
      order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await OrderService.getUserOrder(req.user._id);
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllOrders = async (req, res) => {
  try {
    const order = await OrderService.getAllOrders();
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const order = await OrderService.updateOrderStatus(
      req.params.orderId,
      req.body.status
    );
    res.status(200).json({
      success: true,
      message: "Status updated",
      order,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
