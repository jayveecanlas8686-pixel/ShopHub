// ShopHub - Main App Module

const WISHLIST_KEY = 'shophub_wishlist';
const NOTIFICATIONS_KEY = 'shophub_notifications';

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
  initializeData();
  renderHeader();
  renderCartCount();
  renderWishlistCount();
  trackRecentlyViewed();
});

// ===== HEADER =====
function renderHeader() {
  const header = document.getElementById('main-header');
  if (!header) return;
  const user = getCurrentUser();
  const cartCount = getCartCount();
  const wishCount = getWishlist().length;

  header.innerHTML = `
    <div class="header-top">
      <div class="container header-top-inner">
        <span>🇵🇭 Free delivery on orders over ₱1,000</span>
        <div class="header-top-links">
          ${user ? `<span>Hi, ${user.name.split(' ')[0]}!</span>` : ''}
          ${user && user.role === 'seller' ? `<a href="seller-dashboard.html">Seller Center</a>` : ''}
          ${user && user.role === 'admin' ? `<a href="admin-dashboard.html">Admin Panel</a>` : ''}
          ${!user ? '<a href="login.html">Login</a><a href="register.html">Register</a>' : `<a href="#" onclick="logout();return false;">Logout</a>`}
        </div>
      </div>
    </div>
    <div class="header-main">
      <div class="container header-main-inner">
        <a href="index.html" class="logo">
          <span class="logo-icon">🛍️</span>
          <span class="logo-text">ShopHub</span>
        </a>
        <div class="search-bar-wrap">
          <form class="search-bar" onsubmit="handleSearch(event)">
            <input type="text" id="main-search" placeholder="Search products, brands, categories..." autocomplete="off">
            <button type="submit"><i class="fas fa-search"></i></button>
          </form>
        </div>
        <div class="header-actions">
          <a href="wishlist.html" class="header-action-btn" title="Wishlist">
            <i class="far fa-heart"></i>
            <span class="wishlist-count badge-count" style="display:${wishCount>0?'flex':'none'}">${wishCount}</span>
          </a>
          <a href="cart.html" class="header-action-btn" title="Cart">
            <i class="fas fa-shopping-cart"></i>
            <span class="cart-count badge-count" style="display:${cartCount>0?'flex':'none'}">${cartCount}</span>
          </a>
          ${user ? `
            <div class="header-user-menu">
              <img src="${user.avatar}" alt="${user.name}" class="user-avatar-sm" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=2563EB&color=fff'">
              <div class="user-dropdown">
                <a href="profile.html"><i class="fas fa-user"></i> My Profile</a>
                <a href="orders.html"><i class="fas fa-box"></i> My Orders</a>
                <a href="wishlist.html"><i class="fas fa-heart"></i> Wishlist</a>
                ${user.role === 'seller' ? '<a href="seller-dashboard.html"><i class="fas fa-store"></i> Seller Center</a>' : ''}
                ${user.role === 'admin' ? '<a href="admin-dashboard.html"><i class="fas fa-cog"></i> Admin Panel</a>' : ''}
                <hr>
                <a href="#" onclick="logout();return false;" class="text-danger"><i class="fas fa-sign-out-alt"></i> Logout</a>
              </div>
            </div>
          ` : `<a href="login.html" class="btn-login">Login</a>`}
        </div>
        <button class="mobile-menu-btn" id="mobileMenuBtn" onclick="toggleMobileMenu()">
          <i class="fas fa-bars"></i>
        </button>
      </div>
    </div>
    <nav class="header-nav" id="main-nav">
      <div class="container nav-inner">
        <a href="index.html" class="nav-link"><i class="fas fa-home"></i> Home</a>
        <a href="products.html" class="nav-link"><i class="fas fa-th"></i> All Products</a>
        ${DEMO_CATEGORIES.slice(0, 5).map(c => `<a href="products.html?category=${c.id}" class="nav-link">${c.icon} ${c.name}</a>`).join('')}
        <a href="products.html?sort=discount" class="nav-link nav-sale"><i class="fas fa-tag"></i> Sale</a>
      </div>
    </nav>
    <div class="mobile-menu" id="mobile-menu" style="display:none">
      <a href="index.html"><i class="fas fa-home"></i> Home</a>
      <a href="products.html"><i class="fas fa-th"></i> All Products</a>
      ${DEMO_CATEGORIES.map(c => `<a href="products.html?category=${c.id}">${c.icon} ${c.name}</a>`).join('')}
      <a href="cart.html"><i class="fas fa-shopping-cart"></i> Cart (${cartCount})</a>
      <a href="wishlist.html"><i class="fas fa-heart"></i> Wishlist</a>
      ${user ? `<a href="profile.html"><i class="fas fa-user"></i> Profile</a><a href="orders.html"><i class="fas fa-box"></i> Orders</a><a href="#" onclick="logout();return false;"><i class="fas fa-sign-out-alt"></i> Logout</a>` : `<a href="login.html"><i class="fas fa-sign-in-alt"></i> Login</a><a href="register.html"><i class="fas fa-user-plus"></i> Register</a>`}
    </div>
  `;
  highlightActiveNav();
}

function highlightActiveNav() {
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link, .mobile-menu a').forEach(a => {
    if (a.getAttribute('href') && a.getAttribute('href').startsWith(current)) {
      a.classList.add('active');
    }
  });
}

function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  if (menu) menu.style.display = menu.style.display === 'none' ? 'block' : 'none';
}

function handleSearch(e) {
  e.preventDefault();
  const query = document.getElementById('main-search').value.trim();
  if (query) window.location.href = `products.html?search=${encodeURIComponent(query)}`;
}

// ===== WISHLIST =====
function getWishlist() {
  return JSON.parse(localStorage.getItem(WISHLIST_KEY) || '[]');
}

function addToWishlist(productId) {
  const wishlist = getWishlist();
  if (!wishlist.includes(productId)) {
    wishlist.push(productId);
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
    renderWishlistCount();
    showNotification('Added to wishlist!', 'success');
  }
}

function removeFromWishlist(productId) {
  const wishlist = getWishlist().filter(id => id !== productId);
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist));
  renderWishlistCount();
}

function isInWishlist(productId) {
  return getWishlist().includes(parseInt(productId));
}

function toggleWishlist(productId, btn) {
  productId = parseInt(productId);
  if (isInWishlist(productId)) {
    removeFromWishlist(productId);
    if (btn) {
      btn.classList.remove('active');
      btn.innerHTML = '<i class="far fa-heart"></i>';
      btn.title = 'Add to wishlist';
    }
    showNotification('Removed from wishlist.', 'info');
  } else {
    addToWishlist(productId);
    if (btn) {
      btn.classList.add('active');
      btn.innerHTML = '<i class="fas fa-heart"></i>';
      btn.title = 'Remove from wishlist';
    }
  }
  renderWishlistCount();
}

function renderWishlistCount() {
  const count = getWishlist().length;
  document.querySelectorAll('.wishlist-count').forEach(el => {
    el.textContent = count;
    el.style.display = count > 0 ? 'flex' : 'none';
  });
}

// ===== NOTIFICATIONS (TOAST) =====
function showNotification(message, type) {
  type = type || 'info';
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  const icons = { success: 'fa-check-circle', error: 'fa-times-circle', info: 'fa-info-circle', warning: 'fa-exclamation-circle' };
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `<i class="fas ${icons[type] || 'fa-info-circle'}"></i><span>${message}</span><button onclick="this.parentElement.remove()">×</button>`;
  container.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 10);
  setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, 3500);
}

// ===== RECENTLY VIEWED TRACKING =====
function trackRecentlyViewed() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  if (id && window.location.pathname.includes('product.html')) {
    addToRecentlyViewed(parseInt(id));
  }
}

// ===== UTILITY =====
function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' });
}

function formatCurrency(amount) {
  return formatPrice(amount);
}

function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

function getUrlParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

function renderFooter() {
  const footer = document.getElementById('main-footer');
  if (!footer) return;
  footer.innerHTML = `
    <div class="footer-top">
      <div class="container footer-grid">
        <div class="footer-col">
          <h4>🛍️ ShopHub</h4>
          <p>Your trusted online marketplace in the Philippines. Shop from thousands of products with secure payment and fast delivery.</p>
          <div class="footer-social">
            <a href="#" title="Facebook"><i class="fab fa-facebook"></i></a>
            <a href="#" title="Instagram"><i class="fab fa-instagram"></i></a>
            <a href="#" title="Twitter"><i class="fab fa-twitter"></i></a>
            <a href="#" title="YouTube"><i class="fab fa-youtube"></i></a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Shop</h4>
          <ul>
            ${DEMO_CATEGORIES.map(c => `<li><a href="products.html?category=${c.id}">${c.icon} ${c.name}</a></li>`).join('')}
          </ul>
        </div>
        <div class="footer-col">
          <h4>Account</h4>
          <ul>
            <li><a href="profile.html"><i class="fas fa-user"></i> My Profile</a></li>
            <li><a href="orders.html"><i class="fas fa-box"></i> My Orders</a></li>
            <li><a href="wishlist.html"><i class="fas fa-heart"></i> Wishlist</a></li>
            <li><a href="cart.html"><i class="fas fa-shopping-cart"></i> Cart</a></li>
            <li><a href="seller-dashboard.html"><i class="fas fa-store"></i> Sell on ShopHub</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>Help & Support</h4>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Return Policy</a></li>
            <li><a href="#">Shipping Info</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
          </ul>
          <div class="footer-payment">
            <span>We accept:</span>
            <div class="payment-icons">
              <span class="pay-icon">💳 Visa</span>
              <span class="pay-icon">💳 Mastercard</span>
              <span class="pay-icon">📱 GCash</span>
              <span class="pay-icon">🏦 COD</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="container footer-bottom-inner">
        <p>© 2024 ShopHub. All rights reserved. Demo project — for educational purposes.</p>
        <p>
          <!-- GitHub Pages Deployment:
            1. Create a GitHub repository.
            2. Upload all files maintaining the folder structure.
            3. Go to Settings > Pages.
            4. Select branch 'main' and root folder '/'.
            5. Click Save and open the generated GitHub Pages link.
          -->
          <a href="#">Privacy</a> · <a href="#">Terms</a> · <a href="#">Sitemap</a>
        </p>
      </div>
    </div>
  `;
}

// ===== MODAL =====
function openModal(contentHtml, title) {
  let modal = document.getElementById('global-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'global-modal';
    modal.className = 'modal-overlay';
    modal.innerHTML = '<div class="modal-box"><div class="modal-header"><h3 id="modal-title"></h3><button class="modal-close" onclick="closeModal()">×</button></div><div id="modal-body"></div></div>';
    document.body.appendChild(modal);
    modal.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  }
  document.getElementById('modal-title').textContent = title || '';
  document.getElementById('modal-body').innerHTML = contentHtml;
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('global-modal');
  if (modal) { modal.style.display = 'none'; document.body.style.overflow = ''; }
  const editModal = document.getElementById('edit-product-modal');
  if (editModal) editModal.style.display = 'none';
}

// ===== NOTIFICATIONS PAGE =====
function getStoredNotifications() {
  const user = getCurrentUser();
  const stored = JSON.parse(localStorage.getItem(NOTIFICATIONS_KEY) || '{}');
  if (!user) return [];
  if (!stored[user.id]) {
    stored[user.id] = [
      { id: 1, type: 'order', message: 'Your order ORD-2024-001 has been delivered!', time: '2 hours ago', read: false },
      { id: 2, type: 'promo', message: '🎉 Use code SAVE200 for ₱200 off!', time: '1 day ago', read: false },
      { id: 3, type: 'system', message: 'Welcome to ShopHub! Explore thousands of products.', time: '1 week ago', read: true }
    ];
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(stored));
  }
  return stored[user.id];
}

function markNotificationRead(id) {
  const user = getCurrentUser();
  if (!user) return;
  const stored = JSON.parse(localStorage.getItem(NOTIFICATIONS_KEY) || '{}');
  if (stored[user.id]) {
    const n = stored[user.id].find(n => n.id === id);
    if (n) n.read = true;
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(stored));
  }
}

// ===== PAGINATION =====
function renderPagination(container, total, perPage, currentPage, onPageChange) {
  const totalPages = Math.ceil(total / perPage);
  if (totalPages <= 1) { container.innerHTML = ''; return; }
  let html = '<div class="pagination">';
  if (currentPage > 1) html += `<button class="page-btn" onclick="(${onPageChange})(${currentPage - 1})">‹ Prev</button>`;
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 2) {
      html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="(${onPageChange})(${i})">${i}</button>`;
    } else if (Math.abs(i - currentPage) === 3) {
      html += '<span class="page-ellipsis">…</span>';
    }
  }
  if (currentPage < totalPages) html += `<button class="page-btn" onclick="(${onPageChange})(${currentPage + 1})">Next ›</button>`;
  html += '</div>';
  container.innerHTML = html;
}
