const Order = require('../../models/order');
// const Item = require('../../models/item');

module.exports = {
  cart,
  addToCart,
  setItemQtyInCart,
  checkout,
  index,
};

// A cart is the unpaid order for a user
async function cart(req, res) {
  try {
    // A cart is the unpaid order for a user
    const cart = await Order.getCart(req.user._id);
    res.json(cart);
  } catch (err) {
    console.error('Error fetching cart:', err);
    res.status(500).json({ error: 'Unable to fetch cart' });
  }
}

// Add an item to the cart
async function addToCart(req, res) {
  try {
    const cart = await Order.getCart(req.user._id);
    // addItemToCart returns the saved cart document — return that to the client
    const updatedCart = await cart.addItemToCart(req.params.id);
    res.json(updatedCart);
  } catch (err) {
    console.error('Error adding item to cart:', err);
    res.status(500).json({ error: 'Unable to add item to cart' });
  }
}

// Updates an item's qty in the cart
async function setItemQtyInCart(req, res) {
  try {
    const cart = await Order.getCart(req.user._id);
    const updatedCart = await cart.setItemQty(req.body.itemId, req.body.newQty);
    res.json(updatedCart);
  } catch (err) {
    console.error('Error setting item qty in cart:', err);
    res.status(500).json({ error: 'Unable to update cart' });
  }
}

// Update the cart's isPaid property to true
async function checkout(req, res) {
  try {
    const cart = await Order.getCart(req.user._id);
    cart.isPaid = true;
    const updatedCart = await cart.save();
    res.json(updatedCart);
  } catch (err) {
    console.error('Error during checkout:', err);
    res.status(500).json({ error: 'Checkout failed' });
  }
}

// Return a list of paid orders for the logged in user
async function index(req, res) {
  try {
    // Find all orders for the user where isPaid is true, newest first
    const orders = await Order.find({ user: req.user._id, isPaid: true }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: 'Unable to fetch orders' });
  }
}
