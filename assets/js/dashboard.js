// ShopHub - Dashboard Module (Seller & Admin)

// ===== SELLER DASHBOARD =====

function initSellerDashboard() {
  const user = getCurrentUser();
  if (!user || user.role !== 'seller') { window.location.href = 'index.html'; return; }
  const seller = getSellerById(user.sellerId);
  if (!seller) { window.location.href = 'index.html'; return; }

  renderSellerStats(seller, user);
  renderSellerProducts(user.sellerId);
  renderSellerOrders(user.id);
  setupSellerProductForm(user);
}

function renderSellerStats(seller, user) {
  const myProducts = getSellerProducts(user.sellerId);
  const myOrders = getOrders().filter(o =>
    o.items.some(item => item.sellerId == user.sellerId) && o.status !== 'cancelled'
  );
  const revenue = myOrders.reduce((s, o) => {
    const myItems = o.items.filter(item => item.sellerId == user.sellerId);
    return s + myItems.reduce((si, item) => si + item.price * item.quantity, 0);
  }, 0);
  const totalSold = myProducts.reduce((s, p) => s + (p.sold || 0), 0);

  const el = document.getElementById('seller-stats');
  if (el) el.innerHTML = `
    <div class="stat-card"><div class="stat-icon" style="background:#2563EB20;color:#2563EB"><i class="fas fa-box"></i></div><div class="stat-info"><div class="stat-val">${myProducts.length}</div><div class="stat-label">Total Products</div></div></div>
    <div class="stat-card"><div class="stat-icon" style="background:#27AE6020;color:#27AE60"><i class="fas fa-shopping-bag"></i></div><div class="stat-info"><div class="stat-val">${myOrders.length}</div><div class="stat-label">Total Orders</div></div></div>
    <div class="stat-card"><div class="stat-icon" style="background:#F39C1220;color:#F39C12"><i class="fas fa-peso-sign"></i></div><div class="stat-info"><div class="stat-val">${formatPrice(revenue)}</div><div class="stat-label">Total Revenue</div></div></div>
    <div class="stat-card"><div class="stat-icon" style="background:#2980B920;color:#2980B9"><i class="fas fa-star"></i></div><div class="stat-info"><div class="stat-val">${seller.rating || 0}</div><div class="stat-label">Store Rating</div></div></div>
  `;
}

function renderSellerProducts(sellerId) {
  const products = getSellerProducts(sellerId);
  const el = document.getElementById('seller-products-table');
  if (!el) return;
  if (!products.length) { el.innerHTML = '<tr><td colspan="6" class="text-center text-muted">No products yet. Add your first product!</td></tr>'; return; }
  el.innerHTML = products.map(p => `
    <tr>
      <td><div class="product-thumb-wrap"><img src="${p.image}" alt="" class="product-thumb" onerror="this.src='https://picsum.photos/seed/default/60/60'"><span>${p.name}</span></div></td>
      <td>${formatPrice(p.price)}</td>
      <td>${p.stock}</td>
      <td>${(p.sold || 0).toLocaleString()}</td>
      <td><span class="status-badge ${p.isActive !== false ? 'status-delivered' : 'status-cancelled'}">${p.isActive !== false ? 'Active' : 'Inactive'}</span></td>
      <td>
        <button class="btn-sm btn-outline" onclick="openEditProduct(${p.id})"><i class="fas fa-edit"></i></button>
        <button class="btn-sm btn-danger-outline" onclick="confirmDeleteProduct(${p.id})"><i class="fas fa-trash"></i></button>
      </td>
    </tr>
  `).join('');
}

function renderSellerOrders(userId) {
  const user = getCurrentUser();
  const orders = getOrders().filter(o => o.items.some(item => item.sellerId == user.sellerId));
  const el = document.getElementById('seller-orders-table');
  if (!el) return;
  if (!orders.length) { el.innerHTML = '<tr><td colspan="5" class="text-center text-muted">No orders yet.</td></tr>'; return; }
  const sorted = [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 20);
  el.innerHTML = sorted.map(o => {
    const myItems = o.items.filter(item => item.sellerId == user.sellerId);
    const myTotal = myItems.reduce((s, i) => s + i.price * i.quantity, 0);
    return `
      <tr>
        <td><strong>${o.id}</strong></td>
        <td>${myItems.map(i => i.name).join(', ')}</td>
        <td>${formatPrice(myTotal)}</td>
        <td>${getOrderStatusBadge(o.status)}</td>
        <td>${new Date(o.createdAt).toLocaleDateString()}</td>
      </tr>
    `;
  }).join('');
}

function setupSellerProductForm(user) {
  const form = document.getElementById('add-product-form');
  if (!form) return;
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const data = {
      name: form.querySelector('[name=name]').value,
      price: form.querySelector('[name=price]').value,
      originalPrice: form.querySelector('[name=originalPrice]').value,
      category: form.querySelector('[name=category]').value,
      stock: form.querySelector('[name=stock]').value,
      description: form.querySelector('[name=description]').value,
      image: form.querySelector('[name=image]').value || `https://picsum.photos/seed/prod${Date.now()}/400/400`
    };
    const result = addProduct(data);
    if (result.success) {
      showNotification('Product added successfully!', 'success');
      form.reset();
      renderSellerProducts(user.sellerId);
      document.getElementById('add-product-section').style.display = 'none';
    } else {
      showNotification(result.message || 'Failed to add product.', 'error');
    }
  });
}

function openEditProduct(productId) {
  const product = getProduct(productId);
  if (!product) return;
  const modal = document.getElementById('edit-product-modal');
  if (!modal) return;
  modal.querySelector('[name=name]').value = product.name;
  modal.querySelector('[name=price]').value = product.price;
  modal.querySelector('[name=originalPrice]').value = product.originalPrice || '';
  modal.querySelector('[name=category]').value = product.category;
  modal.querySelector('[name=stock]').value = product.stock;
  modal.querySelector('[name=description]').value = product.description || '';
  modal.querySelector('[name=image]').value = product.image || '';
  modal.dataset.productId = productId;
  modal.style.display = 'flex';
}

function saveEditProduct() {
  const modal = document.getElementById('edit-product-modal');
  if (!modal) return;
  const id = modal.dataset.productId;
  const data = {
    name: modal.querySelector('[name=name]').value,
    price: modal.querySelector('[name=price]').value,
    originalPrice: modal.querySelector('[name=originalPrice]').value,
    category: modal.querySelector('[name=category]').value,
    stock: modal.querySelector('[name=stock]').value,
    description: modal.querySelector('[name=description]').value,
    image: modal.querySelector('[name=image]').value
  };
  const result = updateProduct(id, data);
  if (result.success) {
    showNotification('Product updated!', 'success');
    modal.style.display = 'none';
    const user = getCurrentUser();
    renderSellerProducts(user.sellerId);
  } else {
    showNotification('Failed to update.', 'error');
  }
}

function confirmDeleteProduct(productId) {
  if (confirm('Are you sure you want to delete this product?')) {
    deleteProduct(productId);
    showNotification('Product deleted.', 'success');
    const user = getCurrentUser();
    renderSellerProducts(user.sellerId);
  }
}

// ===== ADMIN DASHBOARD =====

function initAdminDashboard() {
  const user = getCurrentUser();
  if (!user || user.role !== 'admin') { window.location.href = 'index.html'; return; }
  renderAdminStats();
  renderAdminProducts();
  renderAdminUsers();
  renderAdminOrders();
  renderAdminSellers();
  renderAdminCharts();
}

function renderAdminStats() {
  const products = getAllProductsAdmin();
  const users = getAllUsers();
  const orders = getOrders();
  const revenue = orders.filter(o => o.status !== 'cancelled').reduce((s, o) => s + o.total, 0);
  const el = document.getElementById('admin-stats');
  if (el) el.innerHTML = `
    <div class="stat-card"><div class="stat-icon" style="background:#2563EB20;color:#2563EB"><i class="fas fa-shopping-bag"></i></div><div class="stat-info"><div class="stat-val">${orders.length}</div><div class="stat-label">Total Orders</div></div></div>
    <div class="stat-card"><div class="stat-icon" style="background:#27AE6020;color:#27AE60"><i class="fas fa-peso-sign"></i></div><div class="stat-info"><div class="stat-val">${formatPrice(revenue)}</div><div class="stat-label">Total Revenue</div></div></div>
    <div class="stat-card"><div class="stat-icon" style="background:#2980B920;color:#2980B9"><i class="fas fa-users"></i></div><div class="stat-info"><div class="stat-val">${users.length}</div><div class="stat-label">Total Users</div></div></div>
    <div class="stat-card"><div class="stat-icon" style="background:#F39C1220;color:#F39C12"><i class="fas fa-box"></i></div><div class="stat-info"><div class="stat-val">${products.filter(p => p.isActive !== false).length}</div><div class="stat-label">Active Products</div></div></div>
  `;
}

function renderAdminProducts() {
  const products = getAllProductsAdmin();
  const el = document.getElementById('admin-products-table');
  if (!el) return;
  el.innerHTML = products.slice(0, 20).map(p => {
    const seller = getSellerById(p.sellerId);
    return `
      <tr>
        <td><div class="product-thumb-wrap"><img src="${p.image}" alt="" class="product-thumb" onerror="this.src='https://picsum.photos/seed/default/60/60'"><span>${p.name}</span></div></td>
        <td>${p.category}</td>
        <td>${formatPrice(p.price)}</td>
        <td>${seller ? seller.name : '—'}</td>
        <td>${p.stock}</td>
        <td><span class="status-badge ${p.isActive !== false ? 'status-delivered' : 'status-cancelled'}">${p.isActive !== false ? 'Active' : 'Inactive'}</span></td>
        <td><button class="btn-sm btn-danger-outline" onclick="adminDeleteProduct(${p.id})"><i class="fas fa-trash"></i></button></td>
      </tr>
    `;
  }).join('');
}

function renderAdminUsers() {
  const users = getAllUsers();
  const el = document.getElementById('admin-users-table');
  if (!el) return;
  el.innerHTML = users.map(u => `
    <tr>
      <td><div style="display:flex;align-items:center;gap:8px"><img src="${u.avatar}" style="width:32px;height:32px;border-radius:50%" onerror="this.style.display='none'">${u.name}</div></td>
      <td>${u.email}</td>
      <td><span class="badge-role badge-role-${u.role}">${u.role}</span></td>
      <td>${new Date(u.createdAt).toLocaleDateString()}</td>
      <td>${u.role !== 'admin' ? `<button class="btn-sm btn-danger-outline" onclick="adminDeleteUser('${u.id}')"><i class="fas fa-ban"></i></button>` : '—'}</td>
    </tr>
  `).join('');
}

function renderAdminOrders() {
  const orders = getOrders().slice(0, 20);
  const el = document.getElementById('admin-orders-table');
  if (!el) return;
  el.innerHTML = orders.map(o => `
    <tr>
      <td><strong>${o.id}</strong></td>
      <td>${o.shippingAddress ? o.shippingAddress.name : '—'}</td>
      <td>${o.items.length} item(s)</td>
      <td>${formatPrice(o.total)}</td>
      <td>${getOrderStatusBadge(o.status)}</td>
      <td>${new Date(o.createdAt).toLocaleDateString()}</td>
      <td>
        <select class="select-sm" onchange="adminUpdateOrderStatus('${o.id}', this.value)">
          ${['processing','shipped','delivered','cancelled'].map(s => `<option value="${s}" ${o.status===s?'selected':''}>${s}</option>`).join('')}
        </select>
      </td>
    </tr>
  `).join('');
}

function renderAdminSellers() {
  const sellers = getSellers();
  const el = document.getElementById('admin-sellers-table');
  if (!el) return;
  el.innerHTML = sellers.map(s => {
    const prods = getSellerProducts(s.id);
    return `
      <tr>
        <td><div style="display:flex;align-items:center;gap:8px"><img src="${s.avatar}" style="width:32px;height:32px;border-radius:50%" onerror="this.style.display='none'">${s.name}</div></td>
        <td>${s.email}</td>
        <td>${prods.length}</td>
        <td>${s.totalSales.toLocaleString()}</td>
        <td>${renderStars(s.rating)} ${s.rating}</td>
        <td><span class="status-badge ${s.verified ? 'status-delivered' : 'status-pending'}">${s.verified ? 'Verified' : 'Pending'}</span></td>
        <td><a href="seller.html?id=${s.id}" class="btn-sm btn-outline">View</a></td>
      </tr>
    `;
  }).join('');
}

function renderAdminCharts() {
  const products = getAllProductsAdmin().filter(p => p.isActive !== false);
  const categoryCounts = {};
  products.forEach(p => { categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1; });
  const chartEl = document.getElementById('category-chart');
  if (!chartEl) return;
  const max = Math.max(...Object.values(categoryCounts));
  chartEl.innerHTML = Object.entries(categoryCounts).map(([cat, count]) => {
    const catInfo = DEMO_CATEGORIES.find(c => c.id === cat);
    const pct = Math.round((count / max) * 100);
    return `
      <div class="chart-bar-row">
        <span class="chart-label">${catInfo ? catInfo.icon + ' ' + catInfo.name : cat}</span>
        <div class="chart-bar-wrap"><div class="chart-bar" style="width:${pct}%;background:${catInfo ? catInfo.color : '#2563EB'}">${count}</div></div>
      </div>
    `;
  }).join('');

  const orders = getOrders();
  const statusCounts = {};
  orders.forEach(o => { statusCounts[o.status] = (statusCounts[o.status] || 0) + 1; });
  const statusEl = document.getElementById('order-status-chart');
  if (!statusEl) return;
  const smax = Math.max(...Object.values(statusCounts), 1);
  const statusColors = { processing: '#F39C12', shipped: '#2980B9', delivered: '#27AE60', cancelled: '#E74C3C', pending: '#95A5A6' };
  statusEl.innerHTML = Object.entries(statusCounts).map(([st, cnt]) => {
    const pct = Math.round((cnt / smax) * 100);
    return `
      <div class="chart-bar-row">
        <span class="chart-label">${st}</span>
        <div class="chart-bar-wrap"><div class="chart-bar" style="width:${pct}%;background:${statusColors[st]||'#2563EB'}">${cnt}</div></div>
      </div>
    `;
  }).join('');
}

function adminDeleteProduct(id) {
  if (confirm('Delete this product?')) {
    deleteProduct(id);
    showNotification('Product deleted.', 'success');
    renderAdminProducts();
    renderAdminStats();
  }
}

function adminDeleteUser(id) {
  if (confirm('Ban/delete this user?')) {
    deleteUser(id);
    showNotification('User removed.', 'success');
    renderAdminUsers();
    renderAdminStats();
  }
}

function adminUpdateOrderStatus(orderId, newStatus) {
  const orders = JSON.parse(localStorage.getItem(SHOPHUB_ORDERS_KEY) || '[]');
  const idx = orders.findIndex(o => o.id === orderId);
  if (idx !== -1) {
    orders[idx].status = newStatus;
    localStorage.setItem(SHOPHUB_ORDERS_KEY, JSON.stringify(orders));
    showNotification('Order status updated!', 'success');
    renderAdminStats();
  }
}

function adminSearchProducts(query) {
  const all = getAllProductsAdmin();
  const filtered = searchProducts(query, all);
  const el = document.getElementById('admin-products-table');
  if (!el) return;
  el.innerHTML = filtered.slice(0, 30).map(p => {
    const seller = getSellerById(p.sellerId);
    return `
      <tr>
        <td><div class="product-thumb-wrap"><img src="${p.image}" alt="" class="product-thumb" onerror="this.src='https://picsum.photos/seed/default/60/60'"><span>${p.name}</span></div></td>
        <td>${p.category}</td>
        <td>${formatPrice(p.price)}</td>
        <td>${seller ? seller.name : '—'}</td>
        <td>${p.stock}</td>
        <td><span class="status-badge ${p.isActive !== false ? 'status-delivered' : 'status-cancelled'}">${p.isActive !== false ? 'Active' : 'Inactive'}</span></td>
        <td><button class="btn-sm btn-danger-outline" onclick="adminDeleteProduct(${p.id})"><i class="fas fa-trash"></i></button></td>
      </tr>
    `;
  }).join('');
}
