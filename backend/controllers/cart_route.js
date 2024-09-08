const express = require('express');
const User = require('../models/user_model');
const Product = require('../models/product_model');

const cartRoute = express.Router();

cartRoute.post('/add-to-cart', async (req, res) => {
    const { userId, productId, quantity, name } = req.body;

    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const productCategory = await Product.findOne({ 'items._id': productId });
      if (!productCategory) {
        return res.status(404).json({ message: 'Product not found' });
      }
      const product = productCategory.items.find(item => item._id.toString() === productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found in the items array' });
      }
      const cartItem = user.cart.find(item => item.productId.toString() === productId.toString());

      if (cartItem) {
        cartItem.quantity += quantity;
      } else {
        user.cart.push({
          productId: product._id,
          name: name,
          quantity: quantity,
          price: product.price,
        });
      }
      await user.save();
      res.status(200).json({ message: 'Item added to cart', cart: user.cart });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

cartRoute.get('/get-cart/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

cartRoute.post('/remove-from-cart', async (req, res) => {
    const { userId, productId } = req.body;

    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const cartItemIndex = user.cart.findIndex(item => item.productId.toString() === productId.toString());

      if (cartItemIndex === -1) {
        return res.status(404).json({ message: 'Item not found in cart' });
      }

      const cartItem = user.cart[cartItemIndex];

      if (cartItem.quantity > 1) {
        user.cart[cartItemIndex].quantity -= 1;
      } else {
        user.cart.splice(cartItemIndex, 1);
      }

      await user.save();
      res.status(200).json({ message: 'Item removed from cart', cart: user.cart });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  cartRoute.post('/clear-item-from-cart', async (req, res) => {
    const { userId, productId } = req.body;
    console.log(req.body);
    try {
      const user = await User.findById(userId);
      console.log(user);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const cartItemIndex = user.cart.findIndex(item => item._id.toString() === productId.toString());
      
      if (cartItemIndex === -1) {
        return res.status(404).json({ message: 'Item not found in cart' });
      }

      const cartItem = user.cart[cartItemIndex];
    user.cart.splice(cartItemIndex, 1);

      await user.save();
      res.status(200).json({ message: 'Item cleared from cart', cart: user.cart });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });



module.exports = cartRoute;
