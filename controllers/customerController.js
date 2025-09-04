const Product = require("../models/Product");
const User = require("../models/User");
const Order = require("../models/Order");

exports.getData = async (req,res,next) => {
  try {
    const userId = req.user;
    const user = await User.findById(userId).populate('orders');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const products = await Product.find();
    res.status(200).json({ products, cart: user.cart || [], orders: user.orders || [] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  
}

exports.addToCart = async (req,res,next) => {
  try {
    const userId = req.user;
    const productId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (!user.cart) user.cart = [];
    user.cart.push(productId);
    await user.save();
    res.status(200).json(user.cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

exports.removeFromCart = async (req,res,next) => {
  try {
    const userId = req.user;
    const productId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    user.cart = (user.cart || []).filter(id => id.toString() !== productId);
    await user.save();
    res.status(200).json(user.cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

}

exports.createOrder = async (req,res,next) => {
  try {
    const userId = req.user;
    const user = await User.findById(userId).populate('cart');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    let totalAmount = 0;
    for (const product of user.cart || []) {
      totalAmount += product.price || 0;
    }
    const order = new Order({ products: user.cart, totalAmount, customer: userId });
    await order.save();
    if (!user.orders) user.orders = [];
    user.orders.push(order._id);
    user.cart = [];
    await user.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}