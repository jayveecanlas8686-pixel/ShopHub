// ShopHub - Checkout & Orders Module

function generateOrderId() {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const rand = Math.floor(Math.random() * 9000) + 1000;
  return `ORD-${y}${m}-${rand}`;
}

function createOrder(orderData) {
  const orders = JSON.parse(localStorage.getItem(SHOPHUB_ORDERS_KEY) || '[]');
  const user = getCurrentUser();
  const estimatedDays = 3 + Math.floor(Math.random() * 5);
  const estimatedDate = new Date();
  estimatedDate.setDate(estimatedDate.getDate() + estimatedDays);

  const newOrder = {
    id: generateOrderId(),
    userId: user ? user.id : 'guest',
    items: orderData.items,
    subtotal: orderData.subtotal,
    shipping: orderData.shipping,
    discount: orderData.discount || 0,
    total: orderData.total,
    status: 'processing',
    shippingAddress: orderData.shippingAddress,
    paymentMethod: orderData.paymentMethod,
    couponCode: orderData.couponCode || null,
    createdAt: new Date().toISOString(),
    estimatedDelivery: estimatedDate.toISOString().split('T')[0],
    trackingNumber: 'TRK' + Date.now()
  };
  orders.push(newOrder);
  localStorage.setItem(SHOPHUB_ORDERS_KEY, JSON.stringify(orders));
  clearCart();
  localStorage.setItem('shophub_last_order', JSON.stringify(newOrder));
  return newOrder;
}

function getOrders() {
  return JSON.parse(localStorage.getItem(SHOPHUB_ORDERS_KEY) || '[]');
}

function getUserOrders(userId) {
  return getOrders().filter(o => o.userId === userId);
}

function getOrder(orderId) {
  return getOrders().find(o => o.id === orderId) || null;
}

function getLastOrder() {
  return JSON.parse(localStorage.getItem('shophub_last_order') || 'null');
}

function cancelOrder(orderId) {
  const orders = JSON.parse(localStorage.getItem(SHOPHUB_ORDERS_KEY) || '[]');
  const idx = orders.findIndex(o => o.id === orderId);
  if (idx !== -1 && ['processing', 'pending'].includes(orders[idx].status)) {
    orders[idx].status = 'cancelled';
    localStorage.setItem(SHOPHUB_ORDERS_KEY, JSON.stringify(orders));
    return { success: true };
  }
  return { success: false, message: 'Cannot cancel this order.' };
}

function applyDiscount(code, subtotal) {
  const coupon = DEMO_COUPONS.find(c => c.code === code.toUpperCase());
  if (!coupon) return { success: false, message: 'Invalid coupon code.' };
  if (subtotal < coupon.minOrder) {
    return { success: false, message: `Minimum order of ${formatPrice(coupon.minOrder)} required for this coupon.` };
  }
  let discountAmount = 0;
  if (coupon.type === 'percent') discountAmount = subtotal * (coupon.value / 100);
  else if (coupon.type === 'fixed') discountAmount = coupon.value;
  else if (coupon.type === 'shipping') discountAmount = coupon.value;
  return { success: true, discountAmount: Math.round(discountAmount), coupon };
}

function getShippingFee(subtotal) {
  if (subtotal >= 1000) return 0;
  return 99;
}

function formatOrderDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function getOrderStatusBadge(status) {
  const map = {
    pending: '<span class="status-badge status-pending">⏳ Pending</span>',
    processing: '<span class="status-badge status-processing">⚙️ Processing</span>',
    shipped: '<span class="status-badge status-shipped">🚚 Shipped</span>',
    delivered: '<span class="status-badge status-delivered">✅ Delivered</span>',
    cancelled: '<span class="status-badge status-cancelled">❌ Cancelled</span>'
  };
  return map[status] || `<span class="status-badge">${status}</span>`;
}

function getOrderStats() {
  const orders = getOrders();
  const total = orders.length;
  const revenue = orders.filter(o => o.status !== 'cancelled').reduce((s, o) => s + o.total, 0);
  const byStatus = {};
  orders.forEach(o => { byStatus[o.status] = (byStatus[o.status] || 0) + 1; });
  return { total, revenue, byStatus };
}
