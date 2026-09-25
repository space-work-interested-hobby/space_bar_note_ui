/**
 * useMyBar.js - Hook for managing bar inventory and recipe matching
 * 
 * Handles:
 * - Selected ingredients state (persisted to localStorage)
 * - Recipe matching algorithm
 * - Bar coverage calculation
 */
import { useState, useMemo, useCallback, useEffect } from 'react';

// ============================================================
// BAR INGREDIENTS DATA
// ============================================================

export const barIngredients = [
  // === SPIRITS (Rượu Nền) ===
  { id: 'bourbon', name: 'Bourbon Whiskey', nameVi: 'Bourbon Whiskey', category: 'spirits', abv: '40-45%' },
  { id: 'gin', name: 'London Dry Gin', nameVi: 'London Dry Gin', category: 'spirits', abv: '40%' },
  { id: 'rum', name: 'Dark Rum', nameVi: 'Dark Rum', category: 'spirits', abv: '40%' },
  { id: 'vodka', name: 'Vodka Craft', nameVi: 'Vodka Craft', category: 'spirits', abv: '40%' },
  { id: 'tequila', name: 'Tequila Reposado', nameVi: 'Tequila Reposado', category: 'spirits', abv: '40%' },
  { id: 'mezcal', name: 'Mezcal Artesanal', nameVi: 'Mezcal Artesanal', category: 'spirits', abv: '45%' },
  { id: 'rye-whiskey', name: 'Rye Whiskey', nameVi: 'Rye Whiskey', category: 'spirits', abv: '45%' },
  { id: 'scotch', name: 'Single Malt Scotch', nameVi: 'Single Malt Scotch', category: 'spirits', abv: '43%' },
  { id: 'brandy', name: 'VSOP Brandy', nameVi: 'VSOP Brandy', category: 'spirits', abv: '40%' },
  { id: 'cognac', name: 'Cognac', nameVi: 'Cognac', category: 'spirits', abv: '40%' },

  // === LIQUEURS (Rượu Mùi) ===
  { id: 'campari', name: 'Campari Bitter', nameVi: 'Campari Bitter', category: 'liqueurs', abv: '25%' },
  { id: 'cointreau', name: 'Cointreau', nameVi: 'Cointreau (Triple Sec)', category: 'liqueurs', abv: '40%' },
  { id: 'kahlua', name: 'Kahlúa Coffee', nameVi: 'Kahlúa Coffee', category: 'liqueurs', abv: '20%' },
  { id: 'vermouth-rosso', name: 'Sweet Vermouth', nameVi: 'Sweet Vermouth (Rosso)', category: 'liqueurs', abv: '18%' },
  { id: 'vermouth-dry', name: 'Dry Vermouth', nameVi: 'Dry Vermouth', category: 'liqueurs', abv: '18%' },
  { id: 'amaro', name: 'Amaro Montenegro', nameVi: 'Amaro Montenegro', category: 'liqueurs', abv: '23%' },
  { id: 'aperol', name: 'Aperol', nameVi: 'Aperol', category: 'liqueurs', abv: '11%' },
  { id: 'chartreuse', name: 'Chartreuse Verte', nameVi: 'Chartreuse Verte', category: 'liqueurs', abv: '54%' },
  { id: 'maraschino', name: 'Luxardo Maraschino', nameVi: 'Luxardo Maraschino', category: 'liqueurs', abv: '32%' },

  // === MIXERS (Đồ Pha & Trái Cây) ===
  { id: 'tonic', name: 'Premium Tonic Water', nameVi: 'Tonic Water Cao Cấp', category: 'mixers', abv: null },
  { id: 'lime-juice', name: 'Fresh Lime Juice', nameVi: 'Nước Cốt Chanh Vàng', category: 'mixers', abv: null },
  { id: 'lemon-juice', name: 'Fresh Lemon Juice', nameVi: 'Nước Cốt Chanh Xanh', category: 'mixers', abv: null },
  { id: 'simple-syrup', name: 'Simple Syrup (1:1)', nameVi: 'Syrup Đường Mía (1:1)', category: 'mixers', abv: null },
  { id: 'rich-simple', name: 'Rich Simple Syrup (2:1)', nameVi: 'Rich Simple Syrup (2:1)', category: 'mixers', abv: null },
  { id: 'honey-syrup', name: 'Honey Syrup (1:1)', nameVi: 'Syrup Mật Ong (1:1)', category: 'mixers', abv: null },
  { id: 'agave-syrup', name: 'Agave Nectar', nameVi: 'Nectar Agave', category: 'mixers', abv: null },
  { id: 'grapefruit', name: 'Pink Grapefruit Juice', nameVi: 'Nước Ép Bưởi Hồng', category: 'mixers', abv: null },
  { id: 'orange-juice', name: 'Fresh Orange Juice', nameVi: 'Nước Ép Cam Tươi', category: 'mixers', abv: null },
  { id: 'cranberry', name: 'Cranberry Juice', nameVi: 'Nước Ép Cranberry', category: 'mixers', abv: null },
  { id: 'soda', name: 'Club Soda', nameVi: 'Club Soda Khí Sâu', category: 'mixers', abv: null },
  { id: 'ginger-beer', name: 'Ginger Beer', nameVi: 'Ginger Beer', category: 'mixers', abv: null },
  { id: 'prosecco', name: 'Prosecco', nameVi: 'Prosecco', category: 'mixers', abv: '12%' },
  { id: 'egg-white', name: 'Egg White', nameVi: 'Lòng Trắng Trứng', category: 'mixers', abv: null },
  { id: 'heavy-cream', name: 'Whipping Cream', nameVi: 'Kem Whipping (32%)', category: 'mixers', abv: null },
  { id: 'orgeat', name: 'Orgeat Syrup', nameVi: 'Syrup Orgeat', category: 'mixers', abv: null },

  // === COFFEE & TEA (Cà Phê & Trà) ===
  { id: 'cold-brew', name: 'Cold Brew Concentrate', nameVi: 'Cold Brew Cốt Đậm', category: 'coffee', abv: null },
  { id: 'espresso', name: 'Espresso Shot', nameVi: 'Espresso Shot', category: 'coffee', abv: null },
  { id: 'v60-pour-over', name: 'V60 Pour Over', nameVi: 'V60 Pour Over', category: 'coffee', abv: null },
  { id: 'matcha', name: 'Matcha Uji Ceremonial', nameVi: 'Matcha Uji Ceremonial', category: 'coffee', abv: null },
  { id: 'cascara', name: 'Cascara Tea', nameVi: 'Trà Vỏ Cà Phê Cascara', category: 'coffee', abv: null },
  { id: 'chai-spice', name: 'Chai Spice Blend', nameVi: 'Chai Spice Blend', category: 'coffee', abv: null },

  // === BOTANICALS (Gia Vị & Thảo Mộc) ===
  { id: 'angostura', name: 'Angostura Bitters', nameVi: 'Angostura Aromatic Bitters', category: 'botanicals', abv: '44%' },
  { id: 'orange-bitters', name: "Regans' Orange Bitters", nameVi: "Regans' Orange Bitters", category: 'botanicals', abv: '25%' },
  { id: 'peychauds', name: "Peychaud's Bitters", nameVi: "Peychaud's Bitters", category: 'botanicals', abv: '35%' },
  { id: 'fresh-mint', name: 'Fresh Mint Leaves', nameVi: 'Lá Bạc Hà Tươi', category: 'botanicals', abv: null },
  { id: 'basil', name: 'Fresh Thai Basil', nameVi: 'Lá Húng Quế Tươi', category: 'botanicals', abv: null },
  { id: 'cinnamon', name: 'Fire-Toasted Cinnamon', nameVi: 'Thanh Quế Khò Lửa', category: 'botanicals', abv: null },
  { id: 'dried-orange', name: 'Dried Orange Slice', nameVi: 'Lát Cam Sấy Khô', category: 'botanicals', abv: null },
  { id: 'marasca-cherry', name: 'Luxardo Cherry', nameVi: 'Anh Đào Marasca Ngâm', category: 'botanicals', abv: null },
  { id: 'olive', name: 'Green Olives', nameVi: 'Olives Xanh', category: 'botanicals', abv: null },
  { id: 'coarse-salt', name: 'Himalayan Salt Rim', nameVi: 'Muối Thô Ranh Giới', category: 'botanicals', abv: null },
];

// Category metadata
export const barCategories = {
  spirits: {
    key: 'spirits',
    label: 'Rượu Nền',
    labelEn: 'Base Spirits',
    description: '40-55% ABV',
    icon: 'liquor'
  },
  liqueurs: {
    key: 'liqueurs',
    label: 'Rượu Mùi',
    labelEn: 'Liqueurs & Amaro',
    description: 'Hương thảo mộc & quả',
    icon: 'science'
  },
  mixers: {
    key: 'mixers',
    label: 'Đồ Pha & Trái Cây',
    labelEn: 'Mixers & Syrups',
    description: 'Cân bằng Acid & Đường',
    icon: 'water_drop'
  },
  coffee: {
    key: 'coffee',
    label: 'Cà Phê & Trà',
    labelEn: 'Brew Specialty',
    description: 'Hương hoa & Chiết xuất',
    icon: 'coffee'
  },
  botanicals: {
    key: 'botanicals',
    label: 'Gia Vị & Thảo Mộc',
    labelEn: 'Botanicals & Bitters',
    description: 'Garnish & Drops',
    icon: 'eco'
  }
};

// ============================================================
// BAR RECIPES DATA
// ============================================================

export const barRecipes = [
  // === 100% MATCH READY ===
  {
    id: 'bar-001',
    name: 'Gin Tonic Trúc Bạch',
    nameEn: 'Classic Gin & Tonic',
    category: 'Highball & Refreshing',
    description: 'Hương quả bách xù khô quyện vị sủi bọt thanh tao của tonic thảo mộc cao cấp, kết thúc bằng tinh dầu chanh tươi sảng khoái.',
    image_url: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=800',
    time_minutes: 2,
    difficulty: 'Dễ',
    avg_rating: 4.9,
    tags: ['gin', 'refreshing', 'highball'],
    ingredients: [
      { id: 'gin', amount: '45ml', isOptional: false },
      { id: 'tonic', amount: '120ml', isOptional: false },
      { id: 'lime-juice', amount: '5ml', isOptional: false },
    ]
  },
  {
    id: 'bar-002',
    name: 'Classic Bourbon Sour',
    nameEn: 'Bourbon Whiskey Sour',
    category: 'Shaken Classics',
    description: 'Tỉ lệ vàng kinh điển: sự nồng ấm đầm chắc của Bourbon kết hợp độ chua mượt mà và hậu vị caramel thanh thoát.',
    image_url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800',
    time_minutes: 3,
    difficulty: 'Trung bình',
    avg_rating: 5.0,
    tags: ['bourbon', 'sour', 'classic'],
    ingredients: [
      { id: 'bourbon', amount: '60ml', isOptional: false },
      { id: 'lime-juice', amount: '25ml', isOptional: false },
      { id: 'simple-syrup', amount: '20ml', isOptional: false },
    ]
  },
  {
    id: 'bar-003',
    name: 'Aperol Spritz',
    nameEn: 'Aperol Spritz',
    category: 'Aperitivo',
    description: 'Mở đầu bữa tối với vị đắng nhẹ và bọt sủi tươi mát, màu cam rực rỡ như hoàng hôn Ý.',
    image_url: 'https://images.unsplash.com/photo-1560512823-829485b8bf24?w=800',
    time_minutes: 2,
    difficulty: 'Dễ',
    avg_rating: 4.7,
    tags: ['aperol', 'spritz', 'refreshing'],
    ingredients: [
      { id: 'aperol', amount: '60ml', isOptional: false },
      { id: 'prosecco', amount: '90ml', isOptional: false },
      { id: 'soda', amount: '30ml', isOptional: false },
    ]
  },
  {
    id: 'bar-004',
    name: 'Espresso Martini',
    nameEn: 'Espresso Martini',
    category: 'Modern Classics',
    description: 'Kết hợp espresso đậm đà với vodka và liqueur cà phê, tạo nên ly martini thức vừa tỉnh táo vừa say.',
    image_url: 'https://images.unsplash.com/photo-1545438102-799c3991ffef?w=800',
    time_minutes: 4,
    difficulty: 'Dễ',
    avg_rating: 4.8,
    tags: ['vodka', 'coffee', 'martini'],
    ingredients: [
      { id: 'vodka', amount: '45ml', isOptional: false },
      { id: 'kahlua', amount: '20ml', isOptional: false },
      { id: 'espresso', amount: '30ml', isOptional: false },
    ]
  },
  {
    id: 'bar-005',
    name: 'Moscow Mule Đặc Sản',
    nameEn: 'Artisanal Moscow Mule',
    category: 'Refreshing Mules',
    description: 'Vodka lạnh kết hợp ginger beer cay nồng, vắt chanh tươi và topping bạc hà thơm mát.',
    image_url: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800',
    time_minutes: 3,
    difficulty: 'Dễ',
    avg_rating: 4.6,
    tags: ['vodka', 'mule', 'ginger'],
    ingredients: [
      { id: 'vodka', amount: '45ml', isOptional: false },
      { id: 'ginger-beer', amount: '120ml', isOptional: false },
      { id: 'lime-juice', amount: '15ml', isOptional: false },
    ]
  },
  {
    id: 'bar-006',
    name: 'Negroni Bianco',
    nameEn: 'Bianco Negroni',
    category: 'Italian Classics',
    description: 'Biến tấu trắng của Negroni kinh điển: gin, vermouth và Campari với hương nhẹ hơn, thanh tao hơn.',
    image_url: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800',
    time_minutes: 3,
    difficulty: 'Dễ',
    avg_rating: 4.8,
    tags: ['gin', 'italian', 'bitter'],
    ingredients: [
      { id: 'gin', amount: '30ml', isOptional: false },
      { id: 'campari', amount: '30ml', isOptional: false },
      { id: 'vermouth-dry', amount: '30ml', isOptional: false },
    ]
  },
  {
    id: 'bar-007',
    name: 'Cointreau Collins',
    nameEn: 'Cointreau Orange Collins',
    category: 'Refreshing Fizz',
    description: 'Sảng khoái và sáng chói: Triple Sec Cointreau hòa cùng chanh và soda, mùi cam quýt tươi mát.',
    image_url: 'https://images.unsplash.com/photo-1556855810-ac404aa91e85?w=800',
    time_minutes: 3,
    difficulty: 'Dễ',
    avg_rating: 4.7,
    tags: ['cointreau', 'fizz', 'refreshing'],
    ingredients: [
      { id: 'cointreau', amount: '30ml', isOptional: false },
      { id: 'lemon-juice', amount: '25ml', isOptional: false },
      { id: 'simple-syrup', amount: '15ml', isOptional: false },
    ]
  },
  {
    id: 'bar-008',
    name: 'Campari Orange',
    nameEn: 'Campari & Orange',
    category: 'Aperitivo',
    description: 'Đơn giản nhưng đầy tinh tế: Campari đắng nhẹ hòa cùng nước cam tươi mát.',
    image_url: 'https://images.unsplash.com/photo-1560512823-829485b8bf24?w=800',
    time_minutes: 2,
    difficulty: 'Dễ',
    avg_rating: 4.5,
    tags: ['campari', 'aperol', 'refreshing'],
    ingredients: [
      { id: 'campari', amount: '45ml', isOptional: false },
      { id: 'orange-juice', amount: '90ml', isOptional: false },
    ]
  },

  // === ALMOST READY (Missing 1 ingredient) ===
  {
    id: 'bar-101',
    name: 'Boulevardier Atelier',
    nameEn: 'Boulevardier',
    category: 'Parisian Speakeasy',
    description: 'Người anh em quyến rũ của Negroni với nền rượu Bourbon ấm nồng hòa cùng vị đắng kiêu hãnh của Campari.',
    image_url: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800',
    time_minutes: 4,
    difficulty: 'Trung bình',
    avg_rating: 4.8,
    tags: ['bourbon', 'italian', 'bitter'],
    ingredients: [
      { id: 'bourbon', amount: '45ml', isOptional: false },
      { id: 'campari', amount: '30ml', isOptional: false },
      { id: 'vermouth-rosso', amount: '30ml', isOptional: false },
    ]
  },
  {
    id: 'bar-102',
    name: 'White Lady (1919)',
    nameEn: 'White Lady',
    category: 'Art Deco Sour',
    description: 'Kiệt tác cân bằng giữa Gin thảo mộc, hương cam tươi từ Cointreau và lòng trắng trứng tạo bọt kem bồng bềnh.',
    image_url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800',
    time_minutes: 4,
    difficulty: 'Trung bình',
    avg_rating: 4.7,
    tags: ['gin', 'sour', 'classic'],
    ingredients: [
      { id: 'gin', amount: '40ml', isOptional: false },
      { id: 'cointreau', amount: '20ml', isOptional: false },
      { id: 'lemon-juice', amount: '20ml', isOptional: false },
      { id: 'egg-white', amount: '1 quả', isOptional: false },
    ]
  },
  {
    id: 'bar-103',
    name: 'Old Fashioned Bourbon',
    nameEn: 'Bourbon Old Fashioned',
    category: 'Speakeasy Classics',
    description: 'Công thức cổ điển nhất: Bourbon đậm đà, đường tan chảy và bitters thơm nồng.',
    image_url: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800',
    time_minutes: 5,
    difficulty: 'Dễ',
    avg_rating: 5.0,
    tags: ['bourbon', 'classic', 'stirred'],
    ingredients: [
      { id: 'bourbon', amount: '60ml', isOptional: false },
      { id: 'simple-syrup', amount: '10ml', isOptional: false },
      { id: 'angostura', amount: '2 dashes', isOptional: false },
      { id: 'dried-orange', amount: '1 lát', isOptional: true },
    ]
  },
  {
    id: 'bar-104',
    name: 'Gin Gimlet Thảo Mộc',
    nameEn: 'Classic Gin Gimlet',
    category: 'Nautical History',
    description: 'Nguồn gốc hải quân Anh: Gin pha cùng nước cốt chanh tươi và đường, đơn giản nhưng hoàn hảo.',
    image_url: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=800',
    time_minutes: 3,
    difficulty: 'Dễ',
    avg_rating: 4.6,
    tags: ['gin', 'classic', 'sour'],
    ingredients: [
      { id: 'gin', amount: '60ml', isOptional: false },
      { id: 'lime-juice', amount: '25ml', isOptional: false },
      { id: 'simple-syrup', amount: '15ml', isOptional: false },
      { id: 'fresh-mint', amount: '2 lá', isOptional: true },
    ]
  },
  {
    id: 'bar-105',
    name: 'Whiskey Smash Mật Ong',
    nameEn: 'Honey Bourbon Smash',
    category: 'Summer Refreshment',
    description: 'Mùa hè nóng bỏng với Bourbon nghiền cùng bạc hà tươi, mật ong và chanh, giải khát hoàn hảo.',
    image_url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800',
    time_minutes: 4,
    difficulty: 'Dễ',
    avg_rating: 4.8,
    tags: ['bourbon', 'summer', 'fresh'],
    ingredients: [
      { id: 'bourbon', amount: '60ml', isOptional: false },
      { id: 'honey-syrup', amount: '20ml', isOptional: false },
      { id: 'lemon-juice', amount: '25ml', isOptional: false },
      { id: 'fresh-mint', amount: '6-8 lá', isOptional: false },
    ]
  },
  {
    id: 'bar-106',
    name: 'Paper Plane',
    nameEn: 'Paper Plane',
    category: 'Modern Classic',
    description: 'Cocktail đương đại được tạo tại bar ở Brooklyn 2007: Bourbon, Aperol, Amaro và nước chanh cân bằng hoàn hảo.',
    image_url: 'https://images.unsplash.com/photo-1545438102-799c3991ffef?w=800',
    time_minutes: 3,
    difficulty: 'Dễ',
    avg_rating: 4.7,
    tags: ['bourbon', 'aperol', 'modern'],
    ingredients: [
      { id: 'bourbon', amount: '30ml', isOptional: false },
      { id: 'aperol', amount: '30ml', isOptional: false },
      { id: 'amaro', amount: '30ml', isOptional: false },
      { id: 'lemon-juice', amount: '30ml', isOptional: false },
    ]
  },
  {
    id: 'bar-107',
    name: 'Daiquiri Đặc Sản',
    nameEn: 'Artisanal Daiquiri',
    category: 'Cuban Classics',
    description: 'Công thức gốc từ Cuba: Rum trắng, nước cốt chanh tươi và đường, đơn giản nhưng hoàn hảo.',
    image_url: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800',
    time_minutes: 3,
    difficulty: 'Dễ',
    avg_rating: 4.9,
    tags: ['rum', 'classic', 'sour'],
    ingredients: [
      { id: 'rum', amount: '60ml', isOptional: false },
      { id: 'lime-juice', amount: '25ml', isOptional: false },
      { id: 'simple-syrup', amount: '15ml', isOptional: false },
    ]
  },
  {
    id: 'bar-108',
    name: 'Last Word Đặc Sản',
    nameEn: 'The Last Word',
    category: 'Prohibition Era',
    description: 'Cocktail thời cấm rượu từ Detroit: Gin, Chartreuse, Maraschino và chanh, cân bằng hoàn hảo.',
    image_url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800',
    time_minutes: 3,
    difficulty: 'Dễ',
    avg_rating: 4.9,
    tags: ['gin', 'chartreuse', 'classic'],
    ingredients: [
      { id: 'gin', amount: '22ml', isOptional: false },
      { id: 'chartreuse', amount: '22ml', isOptional: false },
      { id: 'maraschino', amount: '22ml', isOptional: false },
      { id: 'lemon-juice', amount: '22ml', isOptional: false },
    ]
  },
  {
    id: 'bar-109',
    name: 'Cosmopolitan Hoa Anh Đào',
    nameEn: 'Cherry Blossom Cosmopolitan',
    category: 'Modern Elegance',
    description: 'Biến tấu thanh lịch của Cosmopolitan: vodka, triple sec, nước cam và cranberry.',
    image_url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800',
    time_minutes: 3,
    difficulty: 'Dễ',
    avg_rating: 4.6,
    tags: ['vodka', 'feminine', 'modern'],
    ingredients: [
      { id: 'vodka', amount: '40ml', isOptional: false },
      { id: 'cointreau', amount: '15ml', isOptional: false },
      { id: 'cranberry', amount: '30ml', isOptional: false },
      { id: 'lime-juice', amount: '15ml', isOptional: false },
    ]
  },
  {
    id: 'bar-110',
    name: 'Penicillin Smoke',
    nameEn: 'Penicillin',
    category: 'Modern Classics',
    description: 'Cocktail được tạo ở New York 2005: Scotch whisky, gừng, mật ong và khói từ than đặc trưng.',
    image_url: 'https://images.unsplash.com/photo-1545438102-799c3991ffef?w=800',
    time_minutes: 5,
    difficulty: 'Trung bình',
    avg_rating: 4.9,
    tags: ['scotch', 'smoky', 'modern'],
    ingredients: [
      { id: 'scotch', amount: '45ml', isOptional: false },
      { id: 'lemon-juice', amount: '20ml', isOptional: false },
      { id: 'honey-syrup', amount: '20ml', isOptional: false },
      { id: 'ginger-beer', amount: 'dash', isOptional: true },
    ]
  },
  {
    id: 'bar-111',
    name: 'Vieux Carré',
    nameEn: 'Vieux Carré',
    category: 'New Orleans Heritage',
    description: 'Từ quán bar Hotel Monteleone 1938: sự hòa quyện giữa whiskey, cognac và bitters, phức tạp và cân bằng.',
    image_url: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800',
    time_minutes: 5,
    difficulty: 'Trung bình',
    avg_rating: 4.8,
    tags: ['whiskey', 'cognac', 'heritage'],
    ingredients: [
      { id: 'rye-whiskey', amount: '30ml', isOptional: false },
      { id: 'cognac', amount: '30ml', isOptional: false },
      { id: 'vermouth-rosso', amount: '30ml', isOptional: false },
      { id: 'angostura', amount: '1 dash', isOptional: false },
      { id: 'peychauds', amount: '1 dash', isOptional: false },
    ]
  },
  {
    id: 'bar-112',
    name: 'Bijou Cocktail',
    nameEn: 'The Bijou',
    category: 'Gilded Age',
    description: 'Cocktail từ 1900s New York: Gin, Chartreuse, sweet vermouth và bitters, lấp lánh như viên ngọc.',
    image_url: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800',
    time_minutes: 4,
    difficulty: 'Trung bình',
    avg_rating: 4.9,
    tags: ['gin', 'chartreuse', 'heritage'],
    ingredients: [
      { id: 'gin', amount: '30ml', isOptional: false },
      { id: 'chartreuse', amount: '30ml', isOptional: false },
      { id: 'vermouth-rosso', amount: '30ml', isOptional: false },
      { id: 'orange-bitters', amount: '1 dash', isOptional: false },
    ]
  },
  {
    id: 'bar-113',
    name: 'Sazerac Thảo Mộc',
    nameEn: 'Herbal Sazerac',
    category: 'New Orleans Heritage',
    description: 'Cocktail được cho là cocktail đầu tiên của Mỹ, từ New Orleans 1850: whiskey, absinthe và bitters.',
    image_url: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800',
    time_minutes: 5,
    difficulty: 'Trung bình',
    avg_rating: 4.9,
    tags: ['rye-whiskey', 'classic', 'heritage'],
    ingredients: [
      { id: 'rye-whiskey', amount: '60ml', isOptional: false },
      { id: 'simple-syrup', amount: '10ml', isOptional: false },
      { id: 'angostura', amount: '2 dashes', isOptional: false },
      { id: ' Peychauds', amount: 'few drops', isOptional: false },
    ]
  },
  {
    id: 'bar-114',
    name: 'Bitter Negroni',
    nameEn: 'Negroni',
    category: 'Italian Classics',
    description: 'Công thức huyền thoại từ Florence 1919: equal parts gin, Campari và sweet vermouth.',
    image_url: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800',
    time_minutes: 3,
    difficulty: 'Dễ',
    avg_rating: 4.9,
    tags: ['gin', 'italian', 'bitter'],
    ingredients: [
      { id: 'gin', amount: '30ml', isOptional: false },
      { id: 'campari', amount: '30ml', isOptional: false },
      { id: 'vermouth-rosso', amount: '30ml', isOptional: false },
    ]
  },
];

// ============================================================
// HELPER FUNCTIONS
// ============================================================

// Get ingredient by ID
export function getIngredientById(id) {
  return barIngredients.find(i => i.id === id);
}

// Match recipes with selected ingredients
export function matchRecipes(selectedIds) {
  return barRecipes.map(recipe => {
    const recipeIngredientIds = recipe.ingredients
      .filter(i => !i.isOptional)
      .map(i => i.id);
    
    const matched = recipeIngredientIds.filter(id => selectedIds.includes(id));
    const missing = recipeIngredientIds.filter(id => !selectedIds.includes(id));
    
    const matchPercentage = Math.round((matched.length / recipeIngredientIds.length) * 100);
    
    return {
      ...recipe,
      matchPercentage,
      matchedCount: matched.length,
      missingCount: missing.length,
      totalCount: recipeIngredientIds.length,
      matchedIngredients: matched,
      missingIngredients: missing.map(id => {
        const ing = getIngredientById(id);
        const recipeIng = recipe.ingredients.find(ri => ri.id === id);
        return {
          id,
          name: ing?.nameVi || ing?.name || id,
          nameEn: ing?.name || id,
          amount: recipeIng?.amount
        };
      })
    };
  }).sort((a, b) => b.matchPercentage - a.matchPercentage);
}

// Get ready recipes (100% match)
export function getReadyRecipes(selectedIds) {
  return matchRecipes(selectedIds).filter(r => r.matchPercentage === 100);
}

// Get almost ready recipes (missing 1 ingredient)
export function getAlmostRecipes(selectedIds) {
  return matchRecipes(selectedIds).filter(r => r.missingCount === 1);
}

// Get bar coverage percentage
export function getBarCoverage(selectedIds) {
  return Math.round((selectedIds.length / barIngredients.length) * 100);
}

// Save bar to localStorage
export function saveBarToStorage(selectedIds) {
  localStorage.setItem('atelier_bar_selected', JSON.stringify(selectedIds));
  localStorage.setItem('atelier_bar_timestamp', Date.now().toString());
}

// Load bar from localStorage
export function loadBarFromStorage() {
  try {
    const saved = localStorage.getItem('atelier_bar_selected');
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (e) {
    console.error('Failed to load bar from storage:', e);
  }
  // Default selection
  return ['bourbon', 'gin', 'campari', 'cointreau', 'tonic', 'lime-juice', 'simple-syrup'];
}

// ============================================================
// CUSTOM HOOK
// ============================================================

export function useMyBar() {
  const [selectedIngredients, setSelectedIngredients] = useState(() => loadBarFromStorage());
  const [viewMode, setViewMode] = useState('ready'); // 'ready' or 'almost'

  // Persist to localStorage when selection changes
  useEffect(() => {
    saveBarToStorage(selectedIngredients);
  }, [selectedIngredients]);

  // Toggle ingredient selection
  const toggleIngredient = useCallback((id) => {
    setSelectedIngredients(prev => 
      prev.includes(id) 
        ? prev.filter(i => i !== id)
        : [...prev, id]
    );
  }, []);

  // Reset all selections
  const resetAll = useCallback(() => {
    setSelectedIngredients([]);
  }, []);

  // Save bar (with animation callback)
  const handleSave = useCallback(() => {
    // In a real app, this would sync to Supabase
    return Promise.resolve();
  }, []);

  // Computed values
  const matchedRecipes = useMemo(() => matchRecipes(selectedIngredients), [selectedIngredients]);
  const readyRecipes = useMemo(() => getReadyRecipes(selectedIngredients), [selectedIngredients]);
  const almostRecipes = useMemo(() => getAlmostRecipes(selectedIngredients), [selectedIngredients]);
  const coveragePercentage = useMemo(() => getBarCoverage(selectedIngredients), [selectedIngredients]);
  const displayedRecipes = viewMode === 'ready' ? readyRecipes : almostRecipes;

  return {
    selectedIngredients,
    viewMode,
    setViewMode,
    toggleIngredient,
    resetAll,
    handleSave,
    matchedRecipes,
    readyRecipes,
    almostRecipes,
    coveragePercentage,
    displayedRecipes,
    totalIngredients: barIngredients.length,
  };
}
