// ShopHub - Demo Data
// All initial seed data for products, sellers, categories, users, and coupons

const SHOPHUB_INITIALIZED_KEY = 'shophub_initialized';
const SHOPHUB_PRODUCTS_KEY = 'shophub_products';
const SHOPHUB_USERS_KEY = 'shophub_users';
const SHOPHUB_ORDERS_KEY = 'shophub_orders';
const SHOPHUB_REVIEWS_KEY = 'shophub_reviews';

const DEMO_SELLERS = [
  {
    id: 1,
    name: 'TechZone PH',
    email: 'seller@example.com',
    avatar: 'https://ui-avatars.com/api/?name=TechZone+PH&background=2563EB&color=fff&size=100',
    rating: 4.9,
    totalSales: 15832,
    followers: 8421,
    joinedDate: '2022-03-15',
    location: 'Makati, Metro Manila',
    responseTime: 'within 30 minutes',
    description: 'Official gadgets and electronics store. All products are authentic with warranty.',
    verified: true,
    productCount: 0
  },
  {
    id: 2,
    name: 'FashionForward PH',
    email: 'fashion@example.com',
    avatar: 'https://ui-avatars.com/api/?name=FashionForward&background=9B59B6&color=fff&size=100',
    rating: 4.7,
    totalSales: 9234,
    followers: 5120,
    joinedDate: '2022-07-01',
    location: 'BGC, Taguig',
    responseTime: 'within 1 hour',
    description: 'Trendy fashion and accessories for men and women. New arrivals every week!',
    verified: true,
    productCount: 0
  },
  {
    id: 3,
    name: 'HomeEssentials PH',
    email: 'home@example.com',
    avatar: 'https://ui-avatars.com/api/?name=HomeEssentials&background=27AE60&color=fff&size=100',
    rating: 4.8,
    totalSales: 6789,
    followers: 3200,
    joinedDate: '2021-11-20',
    location: 'Quezon City',
    responseTime: 'within 2 hours',
    description: 'Your one-stop shop for home appliances, kitchen tools, and household essentials.',
    verified: true,
    productCount: 0
  },
  {
    id: 4,
    name: 'FitLife Store',
    email: 'fitlife@example.com',
    avatar: 'https://ui-avatars.com/api/?name=FitLife+Store&background=E67E22&color=fff&size=100',
    rating: 4.6,
    totalSales: 4521,
    followers: 2800,
    joinedDate: '2023-01-10',
    location: 'Pasig, Metro Manila',
    responseTime: 'within 1 hour',
    description: 'Premium sports and fitness equipment to help you achieve your goals.',
    verified: false,
    productCount: 0
  },
  {
    id: 5,
    name: 'BeautyGlow Shop',
    email: 'beauty@example.com',
    avatar: 'https://ui-avatars.com/api/?name=BeautyGlow&background=E91E63&color=fff&size=100',
    rating: 4.8,
    totalSales: 7345,
    followers: 4600,
    joinedDate: '2022-05-22',
    location: 'Mandaluyong, Metro Manila',
    responseTime: 'within 30 minutes',
    description: 'Authentic beauty, skincare, and wellness products. 100% genuine items.',
    verified: true,
    productCount: 0
  }
];

const DEMO_PRODUCTS = [
  // Electronics
  {
    id: 1, name: 'iPhone 15 Pro 256GB', price: 58999, originalPrice: 64999,
    category: 'electronics', subcategory: 'smartphones',
    image: 'https://picsum.photos/seed/iphone15/400/400',
    images: ['https://picsum.photos/seed/iphone15/400/400','https://picsum.photos/seed/iphone15b/400/400','https://picsum.photos/seed/iphone15c/400/400'],
    rating: 4.9, reviewCount: 1243, stock: 45, sold: 8921,
    sellerId: 1, discount: 9,
    description: 'The iPhone 15 Pro features a titanium design, A17 Pro chip, and a pro camera system. Experience the best iPhone ever with USB-C, Action button, and incredible battery life.',
    specifications: { Brand: 'Apple', Model: 'iPhone 15 Pro', Storage: '256GB', Color: 'Natural Titanium', Display: '6.1-inch Super Retina XDR', Battery: '3274 mAh', OS: 'iOS 17' },
    tags: ['hot', 'new'], isActive: true, createdAt: '2024-01-15'
  },
  {
    id: 2, name: 'Samsung Galaxy S24 Ultra', price: 62999, originalPrice: 69999,
    category: 'electronics', subcategory: 'smartphones',
    image: 'https://picsum.photos/seed/s24ultra/400/400',
    images: ['https://picsum.photos/seed/s24ultra/400/400','https://picsum.photos/seed/s24ultrab/400/400'],
    rating: 4.8, reviewCount: 987, stock: 32, sold: 5634,
    sellerId: 1, discount: 10,
    description: 'Samsung Galaxy S24 Ultra with 200MP camera, built-in S Pen, and AI-powered Galaxy AI features. The ultimate Android flagship.',
    specifications: { Brand: 'Samsung', Model: 'Galaxy S24 Ultra', Storage: '256GB', RAM: '12GB', Display: '6.8-inch QHD+', Battery: '5000 mAh', OS: 'Android 14' },
    tags: ['hot'], isActive: true, createdAt: '2024-01-20'
  },
  {
    id: 3, name: 'MacBook Pro 14" M3 Pro', price: 115000, originalPrice: 120000,
    category: 'electronics', subcategory: 'laptops',
    image: 'https://picsum.photos/seed/macbookpro/400/400',
    images: ['https://picsum.photos/seed/macbookpro/400/400','https://picsum.photos/seed/macbookprob/400/400'],
    rating: 4.9, reviewCount: 432, stock: 18, sold: 2341,
    sellerId: 1, discount: 4,
    description: 'MacBook Pro 14-inch with M3 Pro chip delivers phenomenal performance. Stunning Liquid Retina XDR display, up to 18 hours of battery life.',
    specifications: { Brand: 'Apple', Chip: 'M3 Pro', RAM: '18GB', Storage: '512GB SSD', Display: '14.2-inch Liquid Retina XDR', Battery: 'Up to 18 hrs', OS: 'macOS Sonoma' },
    tags: ['new'], isActive: true, createdAt: '2024-02-01'
  },
  {
    id: 4, name: 'Sony WH-1000XM5 Headphones', price: 18999, originalPrice: 22999,
    category: 'electronics', subcategory: 'audio',
    image: 'https://picsum.photos/seed/sonywh5/400/400',
    images: ['https://picsum.photos/seed/sonywh5/400/400','https://picsum.photos/seed/sonywh5b/400/400'],
    rating: 4.8, reviewCount: 2145, stock: 87, sold: 12450,
    sellerId: 1, discount: 17,
    description: 'Industry-leading noise canceling with Auto NC Optimizer. Crystal clear hands-free calling and up to 30 hours of battery life.',
    specifications: { Brand: 'Sony', Model: 'WH-1000XM5', Driver: '30mm', Battery: '30 hours', Weight: '250g', Connectivity: 'Bluetooth 5.2, USB-C' },
    tags: ['bestseller'], isActive: true, createdAt: '2023-11-10'
  },
  {
    id: 5, name: 'iPad Air 5th Gen 256GB', price: 42000, originalPrice: 46000,
    category: 'electronics', subcategory: 'tablets',
    image: 'https://picsum.photos/seed/ipadair5/400/400',
    images: ['https://picsum.photos/seed/ipadair5/400/400','https://picsum.photos/seed/ipadair5b/400/400'],
    rating: 4.7, reviewCount: 654, stock: 25, sold: 3210,
    sellerId: 1, discount: 9,
    description: 'iPad Air with M1 chip. Beautiful 10.9-inch Liquid Retina display with True Tone and P3 wide color. Support for Apple Pencil and Magic Keyboard.',
    specifications: { Brand: 'Apple', Chip: 'M1', Storage: '256GB', Display: '10.9-inch', Camera: '12MP Wide', Battery: 'Up to 10 hrs' },
    tags: ['new'], isActive: true, createdAt: '2024-01-08'
  },
  {
    id: 6, name: 'LG 55" 4K OLED Smart TV', price: 65000, originalPrice: 79999,
    category: 'electronics', subcategory: 'tv',
    image: 'https://picsum.photos/seed/lgtv55/400/400',
    images: ['https://picsum.photos/seed/lgtv55/400/400'],
    rating: 4.8, reviewCount: 345, stock: 12, sold: 1234,
    sellerId: 1, discount: 19,
    description: 'LG OLED evo TV with self-lit pixels for perfect black and brilliant color. α9 AI Processor 4K Gen6 for exceptional picture and sound.',
    specifications: { Brand: 'LG', Size: '55 inches', Display: 'OLED evo', Resolution: '4K Ultra HD', HDR: 'Dolby Vision IQ', OS: 'webOS 23' },
    tags: ['sale'], isActive: true, createdAt: '2023-12-05'
  },
  {
    id: 7, name: 'Logitech MX Master 3S Mouse', price: 5499, originalPrice: 6500,
    category: 'electronics', subcategory: 'accessories',
    image: 'https://picsum.photos/seed/mxmaster3/400/400',
    images: ['https://picsum.photos/seed/mxmaster3/400/400'],
    rating: 4.7, reviewCount: 1876, stock: 120, sold: 8765,
    sellerId: 1, discount: 15,
    description: 'The master of mice. Advanced ergonomics, quiet clicks, and MagSpeed scroll wheel. Works on any surface, connects up to 3 devices.',
    specifications: { Brand: 'Logitech', Model: 'MX Master 3S', DPI: '200-8000', Battery: '70 days', Buttons: 7, Connectivity: 'USB-C, Bluetooth' },
    tags: ['bestseller'], isActive: true, createdAt: '2023-10-20'
  },
  {
    id: 8, name: 'Samsung Galaxy Watch 6 Classic', price: 17999, originalPrice: 21000,
    category: 'electronics', subcategory: 'wearables',
    image: 'https://picsum.photos/seed/galaxywatch6/400/400',
    images: ['https://picsum.photos/seed/galaxywatch6/400/400'],
    rating: 4.6, reviewCount: 543, stock: 56, sold: 3456,
    sellerId: 1, discount: 14,
    description: 'Galaxy Watch 6 Classic with rotating bezel. Advanced health monitoring, sleep tracking, and up to 40 hours of battery life.',
    specifications: { Brand: 'Samsung', Model: 'Galaxy Watch 6 Classic', Size: '47mm', OS: 'Wear OS 4', Battery: 'Up to 40 hrs', Water: '5ATM + IP68' },
    tags: ['new'], isActive: true, createdAt: '2024-01-25'
  },

  // Fashion
  {
    id: 9, name: 'Nike Air Max 270 React', price: 6299, originalPrice: 7500,
    category: 'fashion', subcategory: 'shoes',
    image: 'https://picsum.photos/seed/nikeairmax/400/400',
    images: ['https://picsum.photos/seed/nikeairmax/400/400','https://picsum.photos/seed/nikeairmaxb/400/400'],
    rating: 4.6, reviewCount: 2341, stock: 234, sold: 15678,
    sellerId: 2, discount: 16,
    description: 'The Nike Air Max 270 React combines two of Nike\'s best technologies for a supremely comfortable shoe. Features a large Air unit and React foam.',
    specifications: { Brand: 'Nike', Model: 'Air Max 270 React', Material: 'Mesh/Synthetic', Sole: 'React + Air Max', Sizes: '38-46', Closure: 'Lace-up' },
    tags: ['hot', 'bestseller'], isActive: true, createdAt: '2023-09-15'
  },
  {
    id: 10, name: "Levi's 501 Original Fit Jeans", price: 3299, originalPrice: 4000,
    category: 'fashion', subcategory: 'bottoms',
    image: 'https://picsum.photos/seed/levis501/400/400',
    images: ['https://picsum.photos/seed/levis501/400/400'],
    rating: 4.5, reviewCount: 4532, stock: 450, sold: 23456,
    sellerId: 2, discount: 18,
    description: "The original jeans since 1873. Levi's 501 straight fit jeans in classic stonewash. Button fly, 5-pocket styling.",
    specifications: { Brand: "Levi's", Model: '501 Original Fit', Material: '100% Cotton', Fit: 'Straight', Wash: 'Stonewash', Sizes: '28-38' },
    tags: ['bestseller'], isActive: true, createdAt: '2023-08-10'
  },
  {
    id: 11, name: 'Adidas Ultraboost 22 Running Shoes', price: 7999, originalPrice: 9500,
    category: 'fashion', subcategory: 'shoes',
    image: 'https://picsum.photos/seed/ultraboost/400/400',
    images: ['https://picsum.photos/seed/ultraboost/400/400','https://picsum.photos/seed/ultraboostb/400/400'],
    rating: 4.7, reviewCount: 1876, stock: 180, sold: 9876,
    sellerId: 2, discount: 16,
    description: 'Adidas Ultraboost 22 running shoes with BOOST midsole for incredible energy return. Primeknit+ upper for a sock-like fit.',
    specifications: { Brand: 'Adidas', Model: 'Ultraboost 22', Midsole: 'BOOST', Upper: 'Primeknit+', Drop: '10mm', Sizes: '38-47' },
    tags: ['hot'], isActive: true, createdAt: '2023-11-20'
  },
  {
    id: 12, name: 'Ray-Ban Original Aviator Sunglasses', price: 8499, originalPrice: 10000,
    category: 'fashion', subcategory: 'accessories',
    image: 'https://picsum.photos/seed/rayban/400/400',
    images: ['https://picsum.photos/seed/rayban/400/400'],
    rating: 4.8, reviewCount: 876, stock: 95, sold: 5432,
    sellerId: 2, discount: 15,
    description: 'Classic Ray-Ban Aviator with gold metal frame and polarized green lenses. UV400 protection. The icon that started it all.',
    specifications: { Brand: 'Ray-Ban', Model: 'RB3025', Lens: 'Polarized Green G-15', Frame: 'Gold Metal', UV: 'UV400 Protection', Gender: 'Unisex' },
    tags: ['new'], isActive: true, createdAt: '2024-01-10'
  },
  {
    id: 13, name: "Women's Floral Maxi Dress", price: 1899, originalPrice: 2500,
    category: 'fashion', subcategory: 'women',
    image: 'https://picsum.photos/seed/floralmaxi/400/400',
    images: ['https://picsum.photos/seed/floralmaxi/400/400','https://picsum.photos/seed/floralmaxib/400/400'],
    rating: 4.4, reviewCount: 654, stock: 120, sold: 3456,
    sellerId: 2, discount: 24,
    description: 'Beautiful floral maxi dress perfect for summer. Light chiffon fabric with adjustable spaghetti straps. Great for beach, parties, and casual outings.',
    specifications: { Material: 'Chiffon', Fit: 'Flowy', Length: 'Maxi', Sizes: 'XS-3XL', Care: 'Hand wash cold' },
    tags: ['sale', 'new'], isActive: true, createdAt: '2024-02-05'
  },
  {
    id: 14, name: 'Premium Leather Crossbody Bag', price: 3599, originalPrice: 4800,
    category: 'fashion', subcategory: 'bags',
    image: 'https://picsum.photos/seed/leatherbag/400/400',
    images: ['https://picsum.photos/seed/leatherbag/400/400'],
    rating: 4.6, reviewCount: 432, stock: 65, sold: 2134,
    sellerId: 2, discount: 25,
    description: 'Genuine leather crossbody bag with adjustable strap. Multiple compartments for organization. Perfect for everyday use.',
    specifications: { Material: 'Genuine Leather', Dimensions: '25 x 18 x 8 cm', Strap: 'Adjustable 50-120cm', Closure: 'Magnetic snap', Pockets: '3 compartments' },
    tags: ['sale'], isActive: true, createdAt: '2023-12-12'
  },
  {
    id: 15, name: 'The North Face Fleece Jacket', price: 4299, originalPrice: 5500,
    category: 'fashion', subcategory: 'outerwear',
    image: 'https://picsum.photos/seed/northface/400/400',
    images: ['https://picsum.photos/seed/northface/400/400'],
    rating: 4.7, reviewCount: 987, stock: 78, sold: 4321,
    sellerId: 2, discount: 22,
    description: 'The North Face 100 Glacier Full-Zip Fleece Jacket. Polartec Classic 100 fleece. Warmth without bulk.',
    specifications: { Brand: 'The North Face', Material: 'Polartec Classic 100 Fleece', Fit: 'Standard', Sizes: 'XS-XXL', Closure: 'Full-Zip', Pockets: '2 hand pockets' },
    tags: ['sale'], isActive: true, createdAt: '2023-11-05'
  },

  // Home & Kitchen
  {
    id: 16, name: 'Ninja Foodi 10-in-1 Air Fryer', price: 9999, originalPrice: 12999,
    category: 'home', subcategory: 'kitchen',
    image: 'https://picsum.photos/seed/ninjafoodi/400/400',
    images: ['https://picsum.photos/seed/ninjafoodi/400/400','https://picsum.photos/seed/ninjafoodik/400/400'],
    rating: 4.8, reviewCount: 1543, stock: 67, sold: 6789,
    sellerId: 3, discount: 23,
    description: 'Air fry, roast, bake, dehydrate, whole roast, and more. 10 cooking functions in one appliance. 8-quart capacity for family-sized meals.',
    specifications: { Brand: 'Ninja', Model: 'Foodi OP401', Capacity: '8 Quarts', Functions: '10-in-1', Wattage: '1750W', Material: 'Stainless Steel' },
    tags: ['hot', 'bestseller'], isActive: true, createdAt: '2023-10-15'
  },
  {
    id: 17, name: 'KitchenAid Artisan Stand Mixer', price: 24999, originalPrice: 29999,
    category: 'home', subcategory: 'kitchen',
    image: 'https://picsum.photos/seed/kitchenaid/400/400',
    images: ['https://picsum.photos/seed/kitchenaid/400/400'],
    rating: 4.9, reviewCount: 2876, stock: 23, sold: 8765,
    sellerId: 3, discount: 17,
    description: 'KitchenAid Artisan 5-Qt Stand Mixer with 10-speed motor and tilt-head design. Includes flat beater, dough hook, and wire whip.',
    specifications: { Brand: 'KitchenAid', Capacity: '5 Quarts', Motor: '325 Watts', Speeds: '10', Attachments: '3 included', Colors: 'Multiple' },
    tags: ['bestseller'], isActive: true, createdAt: '2023-09-20'
  },
  {
    id: 18, name: 'Dyson V15 Detect Cordless Vacuum', price: 39999, originalPrice: 49999,
    category: 'home', subcategory: 'cleaning',
    image: 'https://picsum.photos/seed/dysonv15/400/400',
    images: ['https://picsum.photos/seed/dysonv15/400/400'],
    rating: 4.8, reviewCount: 876, stock: 34, sold: 3456,
    sellerId: 3, discount: 20,
    description: 'Detects and counts microscopic particles with laser and acoustic sensors. Full-size cordless vacuum with 60-minute run time.',
    specifications: { Brand: 'Dyson', Model: 'V15 Detect', Runtime: '60 minutes', Suction: '230 AW', Filtration: 'HEPA', Weight: '3.1 kg' },
    tags: ['new'], isActive: true, createdAt: '2024-01-30'
  },
  {
    id: 19, name: 'Instant Pot Duo 7-in-1', price: 5499, originalPrice: 7000,
    category: 'home', subcategory: 'kitchen',
    image: 'https://picsum.photos/seed/instantpot/400/400',
    images: ['https://picsum.photos/seed/instantpot/400/400'],
    rating: 4.7, reviewCount: 5432, stock: 145, sold: 34567,
    sellerId: 3, discount: 21,
    description: 'The original 7-in-1 multi-use pressure cooker. Replace 7 kitchen appliances. Cook 70% faster.',
    specifications: { Brand: 'Instant Pot', Model: 'Duo 7-in-1', Capacity: '6 Quarts', Functions: '7-in-1', Material: 'Stainless Steel', Safety: '10 safety features' },
    tags: ['bestseller', 'hot'], isActive: true, createdAt: '2023-08-05'
  },
  {
    id: 20, name: 'Nespresso Vertuo Next Coffee Machine', price: 7999, originalPrice: 9999,
    category: 'home', subcategory: 'kitchen',
    image: 'https://picsum.photos/seed/nespresso/400/400',
    images: ['https://picsum.photos/seed/nespresso/400/400'],
    rating: 4.6, reviewCount: 765, stock: 89, sold: 4567,
    sellerId: 3, discount: 20,
    description: 'Brew coffee at the touch of a button with Nespresso Vertuo. Centrifusion technology for perfect crema every time.',
    specifications: { Brand: 'Nespresso', Model: 'Vertuo Next', Capacity: '1.1 Liters', CupSizes: '5 sizes', Capsule: 'Vertuo', Material: 'Plastic/Metal' },
    tags: ['new'], isActive: true, createdAt: '2024-02-10'
  },

  // Sports & Fitness
  {
    id: 21, name: 'Manduka PRO Yoga Mat', price: 5999, originalPrice: 7500,
    category: 'sports', subcategory: 'yoga',
    image: 'https://picsum.photos/seed/yogamat/400/400',
    images: ['https://picsum.photos/seed/yogamat/400/400'],
    rating: 4.8, reviewCount: 1234, stock: 187, sold: 8765,
    sellerId: 4, discount: 20,
    description: 'The PRO yoga mat. 6mm dense cushioning for joint protection. Lifetime guarantee. Non-slip surface and superior stability.',
    specifications: { Brand: 'Manduka', Thickness: '6mm', Dimensions: '180 x 60cm', Material: 'PVC-free', Weight: '3.6 kg', Grip: 'Non-slip' },
    tags: ['bestseller'], isActive: true, createdAt: '2023-07-15'
  },
  {
    id: 22, name: 'Resistance Bands Set (11 Piece)', price: 1299, originalPrice: 1800,
    category: 'sports', subcategory: 'fitness',
    image: 'https://picsum.photos/seed/resistancebands/400/400',
    images: ['https://picsum.photos/seed/resistancebands/400/400'],
    rating: 4.5, reviewCount: 3456, stock: 560, sold: 45678,
    sellerId: 4, discount: 28,
    description: 'Complete resistance bands set with 5 bands (10-50 lbs), handles, ankle straps, door anchor, and carry bag. Perfect for home workouts.',
    specifications: { Bands: '5 resistance levels', Resistance: '10-50 lbs each', Handles: '2 foam handles', Material: 'Natural Latex', Includes: '11 pieces total' },
    tags: ['bestseller', 'hot'], isActive: true, createdAt: '2023-06-01'
  },
  {
    id: 23, name: 'PowerBlock Adjustable Dumbbells 50lb', price: 12999, originalPrice: 16000,
    category: 'sports', subcategory: 'weights',
    image: 'https://picsum.photos/seed/dumbbells/400/400',
    images: ['https://picsum.photos/seed/dumbbells/400/400'],
    rating: 4.7, reviewCount: 654, stock: 45, sold: 2345,
    sellerId: 4, discount: 19,
    description: 'Adjustable dumbbells that replace 16 pairs of weights. Select-A-Weight technology lets you switch from 5 to 50 lbs in seconds.',
    specifications: { Brand: 'PowerBlock', Range: '5-50 lbs', Increments: '2.5 lb', Replaces: '16 pairs', Material: 'Steel with urethane' },
    tags: ['new'], isActive: true, createdAt: '2024-01-05'
  },
  {
    id: 24, name: 'Fitbit Charge 6 Fitness Tracker', price: 8999, originalPrice: 11000,
    category: 'sports', subcategory: 'wearables',
    image: 'https://picsum.photos/seed/fitbit/400/400',
    images: ['https://picsum.photos/seed/fitbit/400/400'],
    rating: 4.5, reviewCount: 876, stock: 123, sold: 5678,
    sellerId: 4, discount: 18,
    description: 'Fitbit Charge 6 with built-in GPS, heart rate monitoring, sleep tracking, and Google apps support. Water resistant up to 50m.',
    specifications: { Brand: 'Fitbit', GPS: 'Built-in', Heart: 'Continuous HR', Battery: '7 days', Water: '50m resistance', Compatibility: 'iOS & Android' },
    tags: ['new', 'hot'], isActive: true, createdAt: '2024-02-15'
  },

  // Beauty
  {
    id: 25, name: 'The Ordinary Skincare Starter Set', price: 2999, originalPrice: 3800,
    category: 'beauty', subcategory: 'skincare',
    image: 'https://picsum.photos/seed/ordinary/400/400',
    images: ['https://picsum.photos/seed/ordinary/400/400'],
    rating: 4.7, reviewCount: 2345, stock: 234, sold: 12345,
    sellerId: 5, discount: 21,
    description: 'The Ordinary complete beginner skincare set. Includes Niacinamide 10% + Zinc 1%, Hyaluronic Acid 2% + B5, AHA 30% + BHA 2%.',
    specifications: { Brand: 'The Ordinary', Includes: '5 products', Skin: 'All skin types', Size: '30ml each', Cruelty: 'Cruelty-free', Vegan: 'Yes' },
    tags: ['bestseller', 'hot'], isActive: true, createdAt: '2023-05-20'
  },
  {
    id: 26, name: 'Fenty Beauty Pro Filt\'r Foundation', price: 2199, originalPrice: 2500,
    category: 'beauty', subcategory: 'makeup',
    image: 'https://picsum.photos/seed/fentybeauty/400/400',
    images: ['https://picsum.photos/seed/fentybeauty/400/400'],
    rating: 4.6, reviewCount: 1543, stock: 178, sold: 8765,
    sellerId: 5, discount: 12,
    description: "Fenty Beauty Pro Filt'r Soft Matte Foundation. 40 shades for all skin tones. 24-hour wear, sweat-resistant, and oil-controlling.",
    specifications: { Brand: 'Fenty Beauty', Finish: 'Soft Matte', Coverage: 'Medium to full', Shades: '40 shades', Size: '32ml', SPF: 'No SPF' },
    tags: ['hot'], isActive: true, createdAt: '2023-10-10'
  },
  {
    id: 27, name: 'Dyson Airwrap Multi-Styler Complete', price: 34999, originalPrice: 42000,
    category: 'beauty', subcategory: 'haircare',
    image: 'https://picsum.photos/seed/dysonairwrap/400/400',
    images: ['https://picsum.photos/seed/dysonairwrap/400/400'],
    rating: 4.8, reviewCount: 1234, stock: 23, sold: 4567,
    sellerId: 5, discount: 17,
    description: 'Style and dry simultaneously. The Dyson Airwrap uses the Coanda effect to attract, wrap and style hair. No extreme heat damage.',
    specifications: { Brand: 'Dyson', Model: 'Airwrap Complete', Attachments: '6 attachments', Technology: 'Coanda effect', Heat: 'No extreme heat', Voltage: 'Dual voltage' },
    tags: ['new', 'hot'], isActive: true, createdAt: '2024-01-20'
  },

  // Books
  {
    id: 28, name: 'Atomic Habits by James Clear', price: 699, originalPrice: 900,
    category: 'books', subcategory: 'self-help',
    image: 'https://picsum.photos/seed/atomichabits/400/400',
    images: ['https://picsum.photos/seed/atomichabits/400/400'],
    rating: 4.9, reviewCount: 8765, stock: 500, sold: 56789,
    sellerId: 3, discount: 22,
    description: 'The #1 New York Times bestseller. An Easy & Proven Way to Build Good Habits & Break Bad Ones. Transform your life with tiny changes.',
    specifications: { Author: 'James Clear', Publisher: 'Avery', Pages: '320', Format: 'Paperback', Language: 'English', ISBN: '9780735211292' },
    tags: ['bestseller', 'hot'], isActive: true, createdAt: '2023-04-01'
  },
  {
    id: 29, name: 'The Lean Startup by Eric Ries', price: 649, originalPrice: 850,
    category: 'books', subcategory: 'business',
    image: 'https://picsum.photos/seed/leanstartup/400/400',
    images: ['https://picsum.photos/seed/leanstartup/400/400'],
    rating: 4.7, reviewCount: 4321, stock: 300, sold: 23456,
    sellerId: 3, discount: 24,
    description: 'How Today\'s Entrepreneurs Use Continuous Innovation to Create Radically Successful Businesses.',
    specifications: { Author: 'Eric Ries', Publisher: 'Crown Business', Pages: '299', Format: 'Paperback', Language: 'English', ISBN: '9780307887894' },
    tags: ['bestseller'], isActive: true, createdAt: '2023-03-15'
  },

  // Toys
  {
    id: 30, name: 'LEGO Technic Lamborghini Set', price: 8999, originalPrice: 10500,
    category: 'toys', subcategory: 'lego',
    image: 'https://picsum.photos/seed/legolamborghini/400/400',
    images: ['https://picsum.photos/seed/legolamborghini/400/400'],
    rating: 4.8, reviewCount: 654, stock: 67, sold: 3456,
    sellerId: 3, discount: 14,
    description: 'LEGO Technic Lamborghini Huracán Tecnica. 806 pieces. Features opening doors, detailed V10 engine with moving pistons. For ages 10+.',
    specifications: { Brand: 'LEGO', Set: '42161', Pieces: '806', Age: '10+', Scale: '1:12', Features: 'Opening doors, V10 engine' },
    tags: ['new', 'hot'], isActive: true, createdAt: '2024-02-20'
  }
];

const DEMO_CATEGORIES = [
  { id: 'electronics', name: 'Electronics', icon: '💻', color: '#2196F3', count: 8 },
  { id: 'fashion', name: 'Fashion', icon: '👗', color: '#E91E63', count: 7 },
  { id: 'home', name: 'Home & Kitchen', icon: '🏠', color: '#4CAF50', count: 5 },
  { id: 'sports', name: 'Sports & Fitness', icon: '🏋️', color: '#FF9800', count: 4 },
  { id: 'beauty', name: 'Beauty & Health', icon: '💄', color: '#9C27B0', count: 3 },
  { id: 'books', name: 'Books', icon: '📚', color: '#795548', count: 2 },
  { id: 'toys', name: 'Toys & Games', icon: '🎮', color: '#F44336', count: 1 }
];

const DEMO_USERS = [
  {
    id: 'user_customer_1',
    name: 'Juan dela Cruz',
    email: 'customer@example.com',
    password: 'password123',
    role: 'customer',
    avatar: 'https://ui-avatars.com/api/?name=Juan+dela+Cruz&background=2563EB&color=fff',
    phone: '09171234567',
    address: { street: '123 Rizal Ave', city: 'Manila', province: 'Metro Manila', zip: '1000', country: 'Philippines' },
    createdAt: '2023-06-15',
    sellerId: null
  },
  {
    id: 'user_seller_1',
    name: 'Maria Santos',
    email: 'seller@example.com',
    password: 'password123',
    role: 'seller',
    avatar: 'https://ui-avatars.com/api/?name=Maria+Santos&background=2563EB&color=fff',
    phone: '09281234567',
    address: { street: '456 EDSA', city: 'Makati', province: 'Metro Manila', zip: '1200', country: 'Philippines' },
    createdAt: '2022-03-15',
    sellerId: 1
  },
  {
    id: 'user_admin_1',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'password123',
    role: 'admin',
    avatar: 'https://ui-avatars.com/api/?name=Admin+User&background=333&color=fff',
    phone: '09391234567',
    address: { street: '789 Bonifacio St', city: 'Taguig', province: 'Metro Manila', zip: '1634', country: 'Philippines' },
    createdAt: '2021-01-01',
    sellerId: null
  }
];

const DEMO_COUPONS = [
  { code: 'WELCOME10', type: 'percent', value: 10, minOrder: 500, description: '10% off your first order', maxUses: 100, usedCount: 45 },
  { code: 'SAVE200', type: 'fixed', value: 200, minOrder: 2000, description: '₱200 off orders over ₱2,000', maxUses: 50, usedCount: 12 },
  { code: 'FREESHIP', type: 'shipping', value: 100, minOrder: 1000, description: 'Free shipping on orders over ₱1,000', maxUses: 200, usedCount: 89 },
  { code: 'FLASH50', type: 'percent', value: 50, minOrder: 5000, description: '50% off orders over ₱5,000', maxUses: 20, usedCount: 18 },
  { code: 'SUMMER15', type: 'percent', value: 15, minOrder: 1500, description: '15% off summer sale', maxUses: 150, usedCount: 67 }
];

const DEMO_ORDERS = [
  {
    id: 'ORD-2024-001',
    userId: 'user_customer_1',
    items: [
      { productId: 1, name: 'iPhone 15 Pro 256GB', price: 58999, quantity: 1, image: 'https://picsum.photos/seed/iphone15/400/400', sellerId: 1 },
      { productId: 4, name: 'Sony WH-1000XM5 Headphones', price: 18999, quantity: 1, image: 'https://picsum.photos/seed/sonywh5/400/400', sellerId: 1 }
    ],
    subtotal: 77998, shipping: 0, discount: 0, total: 77998,
    status: 'delivered',
    shippingAddress: { name: 'Juan dela Cruz', street: '123 Rizal Ave', city: 'Manila', province: 'Metro Manila', zip: '1000', phone: '09171234567' },
    paymentMethod: 'credit_card',
    createdAt: '2024-01-15T10:30:00',
    estimatedDelivery: '2024-01-20',
    trackingNumber: 'TRK123456789'
  },
  {
    id: 'ORD-2024-002',
    userId: 'user_customer_1',
    items: [
      { productId: 9, name: 'Nike Air Max 270 React', price: 6299, quantity: 1, image: 'https://picsum.photos/seed/nikeairmax/400/400', sellerId: 2 },
      { productId: 10, name: "Levi's 501 Original Fit Jeans", price: 3299, quantity: 2, image: 'https://picsum.photos/seed/levis501/400/400', sellerId: 2 }
    ],
    subtotal: 12897, shipping: 99, discount: 0, total: 12996,
    status: 'shipped',
    shippingAddress: { name: 'Juan dela Cruz', street: '123 Rizal Ave', city: 'Manila', province: 'Metro Manila', zip: '1000', phone: '09171234567' },
    paymentMethod: 'gcash',
    createdAt: '2024-02-10T14:20:00',
    estimatedDelivery: '2024-02-15',
    trackingNumber: 'TRK987654321'
  }
];

const DEMO_REVIEWS = [
  { id: 'rev_1', productId: 1, userId: 'user_customer_1', userName: 'Juan dela Cruz', userAvatar: 'https://ui-avatars.com/api/?name=Juan+dela+Cruz&background=2563EB&color=fff', rating: 5, comment: 'Absolutely love this phone! The camera is incredible and the titanium design is premium. Battery life is amazing too. Highly recommend!', helpful: 45, date: '2024-01-25' },
  { id: 'rev_2', productId: 1, userId: 'guest_1', userName: 'Ana Reyes', userAvatar: 'https://ui-avatars.com/api/?name=Ana+Reyes&background=9B59B6&color=fff', rating: 5, comment: 'Best iPhone yet! Love the Action button and USB-C. Camera quality is unmatched.', helpful: 32, date: '2024-01-28' },
  { id: 'rev_3', productId: 1, userId: 'guest_2', userName: 'Carlo Mendoza', userAvatar: 'https://ui-avatars.com/api/?name=Carlo+Mendoza&background=27AE60&color=fff', rating: 4, comment: 'Great phone overall. A bit pricey but worth it for the performance. Would have given 5 stars if the price was lower.', helpful: 18, date: '2024-02-01' },
  { id: 'rev_4', productId: 4, userId: 'user_customer_1', userName: 'Juan dela Cruz', userAvatar: 'https://ui-avatars.com/api/?name=Juan+dela+Cruz&background=2563EB&color=fff', rating: 5, comment: 'The noise cancellation is absolutely incredible! Perfect for working from home and commuting.', helpful: 67, date: '2024-01-20' },
  { id: 'rev_5', productId: 9, userId: 'guest_3', userName: 'Sofia Garcia', userAvatar: 'https://ui-avatars.com/api/?name=Sofia+Garcia&background=E67E22&color=fff', rating: 4, comment: 'Comfortable and stylish. True to size. Great for everyday wear and light running.', helpful: 23, date: '2024-02-05' },
  { id: 'rev_6', productId: 19, userId: 'guest_4', userName: 'Pedro Bautista', userAvatar: 'https://ui-avatars.com/api/?name=Pedro+Bautista&background=E91E63&color=fff', rating: 5, comment: 'Changed my cooking life! So easy to use and makes amazing meals in half the time. Best kitchen purchase ever!', helpful: 89, date: '2024-01-10' },
  { id: 'rev_7', productId: 25, userId: 'guest_5', userName: 'Isabel Torres', userAvatar: 'https://ui-avatars.com/api/?name=Isabel+Torres&background=2196F3&color=fff', rating: 5, comment: 'Visible results in just 2 weeks! Niacinamide really works. Skin is glowing and pores look smaller.', helpful: 134, date: '2024-01-30' },
  { id: 'rev_8', productId: 28, userId: 'guest_6', userName: 'Miguel Cruz', userAvatar: 'https://ui-avatars.com/api/?name=Miguel+Cruz&background=795548&color=fff', rating: 5, comment: 'One of the best books I have ever read. Clear actionable advice that actually works. Must read for everyone!', helpful: 56, date: '2024-02-08' }
];

function initializeData() {
  if (!localStorage.getItem(SHOPHUB_INITIALIZED_KEY)) {
    localStorage.setItem(SHOPHUB_PRODUCTS_KEY, JSON.stringify(DEMO_PRODUCTS));
    localStorage.setItem(SHOPHUB_USERS_KEY, JSON.stringify(DEMO_USERS));
    localStorage.setItem(SHOPHUB_ORDERS_KEY, JSON.stringify(DEMO_ORDERS));
    localStorage.setItem(SHOPHUB_REVIEWS_KEY, JSON.stringify(DEMO_REVIEWS));
    localStorage.setItem(SHOPHUB_INITIALIZED_KEY, 'true');
  }
}

function resetData() {
  localStorage.removeItem(SHOPHUB_INITIALIZED_KEY);
  localStorage.removeItem(SHOPHUB_PRODUCTS_KEY);
  localStorage.removeItem(SHOPHUB_USERS_KEY);
  localStorage.removeItem(SHOPHUB_ORDERS_KEY);
  localStorage.removeItem(SHOPHUB_REVIEWS_KEY);
  initializeData();
}
