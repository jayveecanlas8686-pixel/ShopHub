// ShopHub - Cart Module

const CART_KEY = 'shophub_cart';

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  renderCartCount();
}

function addToCart(product, quantity) {
  quantity = parseInt(quantity) || 1;
  const cart = getCart();
  const existing = cart.find(item => item.productId === product.id);
  if (existing) {
    existing.quantity = Math.min(existing.quantity + quantity, product.stock || 99);
  } else {
    cart.push({
      productId: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      sellerId: product.sellerId,
      sellerName: getSellerName(product.sellerId),
      stock: product.stock,
      quantity: Math.min(quantity, product.stock || 99)
    });
  }
  saveCart(cart);
  showNotification(`"${product.name}" added to cart!`, 'success');
}

function removeFromCart(productId) {
  const cart = getCart().filter(item => item.productId !== productId);
  saveCart(cart);
}

function updateQuantity(productId, qty) {
  const cart = getCart();
  const item = cart.find(i => i.productId === productId);
  if (item) {
    item.quantity = Math.max(1, Math.min(parseInt(qty), item.stock || 99));
    saveCart(cart);
  }
}

function clearCart() {
  localStorage.removeItem(CART_KEY);
  renderCartCount();
}

function getCartCount() {
  return getCart().reduce((sum, item) => sum + item.quantity, 0);
}

function getCartSubtotal() {
  return getCart().reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function getCartSummary(discountAmount, shippingFee) {
  const subtotal = getCartSubtotal();
  const shipping = shippingFee !== undefined ? shippingFee : (subtotal >= 1000 ? 0 : 99);
  const discount = discountAmount || 0;
  const total = Math.max(0, subtotal + shipping - discount);
  return { subtotal, shipping, discount, total, itemCount: getCartCount() };
}

function renderCartCount() {
  const count = getCartCount();
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });
}

function getSellerName(sellerId) {
  const seller = getSellerById(sellerId);
  return seller ? seller.name : 'Unknown Seller';
}

function isInCart(productId) {
  return getCart().some(item => item.productId === productId);
}

function getCartItem(productId) {
  return getCart().find(item => item.productId === productId) || null;
}
