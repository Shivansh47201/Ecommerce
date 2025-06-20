import Cart from "../models/cart.model.js";

class CartService {
  async getCart(userId) {
    console.log(userId);
    let cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart) cart = await Cart.create({ user: userId, items: [] });
    return cart;
  }

  async addToCart(userId, { productId, quantity }) {
    let cart = await Cart.findOne({ user: userId });
    if (!cart) cart = await Cart.create({ user: userId, items: [] });

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }
    return await cart.save();
  }

  //Update Cart

  async updateCartItem(userId, productId, quantity) {
    if (quantity === undefined) {
      throw new Error("Quantity is required in body");
    }

    const cart = await Cart.findOne({ user: userId });
    if (!cart) throw new Error("Cart not found");

    const item = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (!item) throw new Error("Product not in cart");

    item.quantity = quantity;
    return await cart.save();
  }

  //Remove Cart
  async removeCartItem(userId, productId) {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) throw new Error("Cart not found");

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );
    return await cart.save();
  }

  //Clear Cart
  async clearCart(userId) {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) throw new Error("Cart not found");

    cart.items = [];
    await cart.save();

    return cart;
  }
}

export default new CartService();
