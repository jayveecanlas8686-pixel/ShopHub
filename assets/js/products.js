// ShopHub - Products Module

const RECENTLY_VIEWED_KEY = 'shophub_recently_viewed';

function getProducts() {
  return JSON.parse(localStorage.getItem(SHOPHUB_PRODUCTS_KEY) || '[]').filter(p => p.isActive !== false);
}

function getAllProductsAdmin() {
  return JSON.parse(localStorage.getItem(SHOPHUB_PRODUCTS_KEY) || '[]');
}

function getProduct(id) {
  const products = JSON.parse(localStorage.getItem(SHOPHUB_PRODUCTS_KEY) || '[]');
  return products.find(p => p.id == id) || null;
}

function searchProducts(query, products) {
  if (!query) return products;
  const q = query.toLowerCase().trim();
  return products.filter(p =>
    p.name.toLowerCase().includes(q) ||
    p.category.toLowerCase().includes(q) ||
    (p.description && p.description.toLowerCase().includes(q)) ||
    (p.tags && p.tags.some(t => t.toLowerCase().includes(q)))
  );
}

function filterByCategory(category, products) {
  if (!category || category === 'all') return products;
  return products.filter(p => p.category === category);
}

function filterByPriceRange(min, max, products) {
  return products.filter(p => {
    const price = p.price;
    if (min && price < min) return false;
    if (max && price > max) return false;
    return true;
  });
}

function filterByRating(minRating, products) {
  if (!minRating) return products;
  return products.filter(p => p.rating >= minRating);
}

function sortProducts(products, sortBy) {
  const arr = [...products];
  switch (sortBy) {
    case 'price_asc': return arr.sort((a, b) => a.price - b.price);
    case 'price_desc': return arr.sort((a, b) => b.price - a.price);
    case 'rating': return arr.sort((a, b) => b.rating - a.rating);
    case 'newest': return arr.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    case 'popular': return arr.sort((a, b) => (b.sold || 0) - (a.sold || 0));
    case 'discount': return arr.sort((a, b) => (b.discount || 0) - (a.discount || 0));
    default: return arr;
  }
}

function getReviews(productId) {
  const all = JSON.parse(localStorage.getItem(SHOPHUB_REVIEWS_KEY) || '[]');
  return all.filter(r => r.productId == productId);
}

function addReview(productId, reviewData) {
  const user = getCurrentUser();
  if (!user) return { success: false, message: 'Please login to review.' };
  const reviews = JSON.parse(localStorage.getItem(SHOPHUB_REVIEWS_KEY) || '[]');
  const existing = reviews.find(r => r.productId == productId && r.userId === user.id);
  if (existing) return { success: false, message: 'You have already reviewed this product.' };
  const newReview = {
    id: 'rev_' + Date.now(),
    productId: parseInt(productId),
    userId: user.id,
    userName: user.name,
    userAvatar: user.avatar,
    rating: reviewData.rating,
    comment: reviewData.comment,
    helpful: 0,
    date: new Date().toISOString().split('T')[0]
  };
  reviews.push(newReview);
  localStorage.setItem(SHOPHUB_REVIEWS_KEY, JSON.stringify(reviews));
  updateProductRating(productId);
  return { success: true, review: newReview };
}

function updateProductRating(productId) {
  const reviews = getReviews(productId);
  if (!reviews.length) return;
  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  const products = JSON.parse(localStorage.getItem(SHOPHUB_PRODUCTS_KEY) || '[]');
  const idx = products.findIndex(p => p.id == productId);
  if (idx !== -1) {
    products[idx].rating = Math.round(avg * 10) / 10;
    products[idx].reviewCount = reviews.length;
    localStorage.setItem(SHOPHUB_PRODUCTS_KEY, JSON.stringify(products));
  }
}

function addToRecentlyViewed(productId) {
  let viewed = JSON.parse(localStorage.getItem(RECENTLY_VIEWED_KEY) || '[]');
  viewed = viewed.filter(id => id !== productId);
  viewed.unshift(productId);
  viewed = viewed.slice(0, 10);
  localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(viewed));
}

function getRecentlyViewed() {
  const ids = JSON.parse(localStorage.getItem(RECENTLY_VIEWED_KEY) || '[]');
  return ids.map(id => getProduct(id)).filter(Boolean);
}

function getRelatedProducts(productId, limit) {
  const product = getProduct(productId);
  if (!product) return [];
  return getProducts()
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, limit || 6);
}

function getSellerProducts(sellerId) {
  return getProducts().filter(p => p.sellerId == sellerId);
}

function addProduct(productData) {
  const user = getCurrentUser();
  if (!user || user.role !== 'seller') return { success: false, message: 'Unauthorized' };
  const products = JSON.parse(localStorage.getItem(SHOPHUB_PRODUCTS_KEY) || '[]');
  const maxId = products.reduce((m, p) => Math.max(m, p.id), 0);
  const newProduct = {
    id: maxId + 1,
    name: productData.name,
    price: parseFloat(productData.price),
    originalPrice: parseFloat(productData.originalPrice) || parseFloat(productData.price),
    category: productData.category,
    subcategory: productData.subcategory || '',
    image: productData.image || `https://picsum.photos/seed/prod${maxId + 1}/400/400`,
    images: [productData.image || `https://picsum.photos/seed/prod${maxId + 1}/400/400`],
    rating: 0, reviewCount: 0,
    stock: parseInt(productData.stock) || 0,
    sold: 0,
    sellerId: user.sellerId,
    discount: productData.originalPrice ? Math.round((1 - productData.price / productData.originalPrice) * 100) : 0,
    description: productData.description || '',
    specifications: productData.specifications || {},
    tags: [],
    isActive: true,
    createdAt: new Date().toISOString().split('T')[0]
  };
  products.push(newProduct);
  localStorage.setItem(SHOPHUB_PRODUCTS_KEY, JSON.stringify(products));
  return { success: true, product: newProduct };
}

function updateProduct(id, data) {
  const products = JSON.parse(localStorage.getItem(SHOPHUB_PRODUCTS_KEY) || '[]');
  const idx = products.findIndex(p => p.id == id);
  if (idx === -1) return { success: false };
  const price = parseFloat(data.price) || products[idx].price;
  const originalPrice = parseFloat(data.originalPrice) || price;
  products[idx] = {
    ...products[idx],
    ...data,
    price,
    originalPrice,
    discount: Math.round((1 - price / originalPrice) * 100)
  };
  localStorage.setItem(SHOPHUB_PRODUCTS_KEY, JSON.stringify(products));
  return { success: true };
}

function deleteProduct(id) {
  const products = JSON.parse(localStorage.getItem(SHOPHUB_PRODUCTS_KEY) || '[]');
  const idx = products.findIndex(p => p.id == id);
  if (idx !== -1) {
    products[idx].isActive = false;
    localStorage.setItem(SHOPHUB_PRODUCTS_KEY, JSON.stringify(products));
  }
}

function formatPrice(amount) {
  return '₱' + parseFloat(amount).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function renderStars(rating, max) {
  max = max || 5;
  let html = '<span class="stars">';
  for (let i = 1; i <= max; i++) {
    if (i <= Math.floor(rating)) html += '<i class="fas fa-star"></i>';
    else if (i - 0.5 <= rating) html += '<i class="fas fa-star-half-alt"></i>';
    else html += '<i class="far fa-star"></i>';
  }
  html += '</span>';
  return html;
}

function renderProductCard(product, options) {
  options = options || {};
  const inWishlist = isInWishlist(product.id);
  const discount = product.discount || 0;
  const seller = getSellerById(product.sellerId);
  const sellerName = seller ? seller.name : 'Unknown';
  return `
    <div class="product-card" data-id="${product.id}">
      <div class="product-card-image-wrap">
        <a href="product.html?id=${product.id}">
          <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.src='https://picsum.photos/seed/default/400/400'">
        </a>
        ${discount > 0 ? `<span class="badge badge-sale">-${discount}%</span>` : ''}
        ${product.tags && product.tags.includes('new') ? '<span class="badge badge-new">NEW</span>' : ''}
        ${product.tags && product.tags.includes('hot') ? '<span class="badge badge-hot">🔥 HOT</span>' : ''}
        <button class="wishlist-btn ${inWishlist ? 'active' : ''}" onclick="toggleWishlist(${product.id}, this)" title="${inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}">
          <i class="${inWishlist ? 'fas' : 'far'} fa-heart"></i>
        </button>
      </div>
      <div class="product-card-body">
        <a href="product.html?id=${product.id}" class="product-name">${product.name}</a>
        <div class="product-rating">
          ${renderStars(product.rating)}
          <span class="rating-val">${product.rating || 0}</span>
          <span class="review-count">(${(product.reviewCount || 0).toLocaleString()})</span>
        </div>
        <div class="product-price-wrap">
          <span class="product-price">${formatPrice(product.price)}</span>
          ${product.originalPrice && product.originalPrice > product.price ? `<span class="product-original-price">${formatPrice(product.originalPrice)}</span>` : ''}
        </div>
        <div class="product-meta">
          <span class="product-sold">${(product.sold || 0).toLocaleString()} sold</span>
          <span class="product-seller">${sellerName}</span>
        </div>
        <button class="btn-add-cart" onclick="handleAddToCart(${product.id})">
          <i class="fas fa-shopping-cart"></i> Add to Cart
        </button>
      </div>
    </div>
  `;
}

function handleAddToCart(productId) {
  const product = getProduct(productId);
  if (!product) return;
  if (product.stock < 1) { showNotification('This product is out of stock.', 'error'); return; }
  addToCart(product, 1);
}
