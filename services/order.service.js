import Order from "../models/order.model.js";
import Cart from "../models/cart.model.js";

class OrderService {
  async placeOrder(userId, shippingAddress) {
    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      throw new Error("Cart is empty");
    }

    const orderItems = cart.items.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
      price: item.product.price,
    }));

    const totalAmount = orderItems.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );

    const order = new Order({
      user: userId,
      items: orderItems,
      shippingAddress,
      totalAmount,
      status: "Pending",
    });

    await order.save();

    cart.items = [];
    await cart.save();

    return order;
  }

  //User Get Order
  async getUserOrder(userId) {
    return await Order.find({ user: userId }).populate(
      "items.product",
      "name price"
    ).sort({ createdAt: -1 });
  }

  //Get All Order data (Admin)
  async getAllOrders() {
    return await Order.find()
      .populate("user", "name email")
      .populate("items.product", "name price");
  }

  //Update Order Status (Admin)
  async updateOrderStatus(orderId, status) {
    const order = await Order.findById(orderId);
    if (!order) throw new Error("Order not found");

    order.status = status;
    return await order.save();
  }
}

export default new OrderService();
