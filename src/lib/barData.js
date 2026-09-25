// Expanded mock data for MyBar feature
// This data represents the user's bar inventory and recipe matching

export const mockBarIngredients = [
  // === SPIRITS (Rượu Nền) ===
  {
    id: 'bourbon',
    name: 'Bourbon Whiskey',
    category: 'spirits',
    abv: '40-45%',
    description: 'Rượu whisky Mỹ từ ngô, ủ gỗ sồi trắng',
    icon: 'liquor'
  },
  {
    id: 'gin',
    name: 'London Dry Gin',
    category: 'spirits',
    abv: '40%',
    description: 'Gin London khô, hương juniper & thảo mộc',
    icon: 'liquor'
  },
  {
    id: 'rum',
    name: 'Dark Rum',
    category: 'spirits',
    abv: '40%',
    description: 'Rhum từ mía, ủ gỗ sồi caramel',
    icon: 'liquor'
  },
  {
    id: 'vodka',
    name: 'Vodka Craft',
    category: 'spirits',
    abv: '40%',
    description: 'Vodka lọc than hoạt tính, trung tính',
    icon: 'liquor'
  },
  {
    id: 'tequila',
    name: 'Tequila Reposado',
    category: 'spirits',
    abv: '40%',
    description: 'Tequila ủ 2-12 tháng trong thùng gỗ sồi',
    icon: 'liquor'
  },
  {
    id: 'mezcal',
    name: 'Mezcal Artesanal',
    category: 'spirits',
    abv: '45%',
    description: 'Mezcal hun khói agavales truyền thống',
    icon: 'liquor'
  },
  {
    id: 'rye-whiskey',
    name: 'Rye Whiskey',
    category: 'spirits',
    abv: '45%',
    description: 'Whisky từ lúa mạch đen, cay nồng',
    icon: 'liquor'
  },
  {
    id: 'scotch',
    name: 'Single Malt Scotch',
    category: 'spirits',
    abv: '43%',
    description: 'Scotch whisky từ mạch nha, khói than bùn',
    icon: 'liquor'
  },

  // === LIQUEURS (Rượu Mùi) ===
  {
    id: 'campari',
    name: 'Campari Bitter',
    category: 'liqueurs',
    abv: '25%',
    description: 'Bitter đắng đỏ Ý, hương thảo mộc',
    icon: 'science'
  },
  {
    id: 'cointreau',
    name: 'Cointreau (Triple Sec)',
    category: 'liqueurs',
    abv: '40%',
    description: 'Liqueur cam triple sec Pháp',
    icon: 'science'
  },
  {
    id: 'kahlua',
    name: 'Kahlúa Coffee',
    category: 'liqueurs',
    abv: '20%',
    description: 'Liqueur cà phê từ Mexico',
    icon: 'science'
  },
  {
    id: 'vermouth-rosso',
    name: 'Sweet Vermouth (Rosso)',
    category: 'liqueurs',
    abv: '18%',
    description: 'Vermouth ngọt Ý, hương thảo mộc',
    icon: 'science'
  },
  {
    id: 'vermouth-dry',
    name: 'Dry Vermouth',
    category: 'liqueurs',
    abv: '18%',
    description: 'Vermouth khô Pháp',
    icon: 'science'
  },
  {
    id: 'amaro',
    name: 'Amaro Montenegro',
    category: 'liqueurs',
    abv: '23%',
    description: 'Amaro thảo mộc Ý, ngọt nhẹ',
    icon: 'science'
  },
  {
    id: 'aperol',
    name: 'Aperol',
    category: 'liqueurs',
    abv: '11%',
    description: 'Aperitivo cam đỏ, nhẹ và tươi mát',
    icon: 'science'
  },
  {
    id: 'chartreuse',
    name: 'Chartreuse Verte',
    category: 'liqueurs',
    abv: '54%',
    description: 'Liqueur thảo mộc tu viện Pháp, 130 thảo dược',
    icon: 'science'
  },
  {
    id: 'maraschino',
    name: 'Luxardo Maraschino',
    category: 'liqueurs',
    abv: '32%',
    description: 'Liqueur anh đào Marasca Ý',
    icon: 'science'
  },

  // === MIXERS (Đồ Pha & Trái Cây) ===
  {
    id: 'tonic',
    name: 'Tonic Water Cao Cấp',
    category: 'mixers',
    abv: null,
    description: 'Tonic water Fever-Tree, 1694, hoặc tự làm',
    icon: 'water_drop'
  },
  {
    id: 'lime-juice',
    name: 'Nước Cốt Chanh Vàng',
    category: 'mixers',
    abv: null,
    description: 'Vắt tươi, không đường',
    icon: 'local_cafe'
  },
  {
    id: 'lemon-juice',
    name: 'Nước Cốt Chanh Xanh',
    category: 'mixers',
    abv: null,
    description: 'Vắt tươi từ chanh xanh',
    icon: 'local_cafe'
  },
  {
    id: 'simple-syrup',
    name: 'Syrup Đường Mía (1:1)',
    category: 'mixers',
    abv: null,
    description: 'Đường : nước = 1:1, bảo quản lạnh 2 tuần',
    icon: 'water_drop'
  },
  {
    id: 'rich-simple',
    name: 'Rich Simple Syrup (2:1)',
    category: 'mixers',
    abv: null,
    description: 'Đường : nước = 2:1, nhất thiệu hơn',
    icon: 'water_drop'
  },
  {
    id: 'honey-syrup',
    name: 'Syrup Mật Ong (1:1)',
    category: 'mixers',
    abv: null,
    description: 'Mật ong : nước = 1:1, khuấy tan',
    icon: 'water_drop'
  },
  {
    id: 'agave-syrup',
    name: 'Nectar Agave',
    category: 'mixers',
    abv: null,
    description: 'Nectar agave nguyên chất',
    icon: 'water_drop'
  },
  {
    id: 'grapefruit',
    name: 'Nước Ép Bưởi Hồng',
    category: 'mixers',
    abv: null,
    description: 'Ép tươi, không đường',
    icon: 'local_cafe'
  },
  {
    id: 'orange-juice',
    name: 'Nước Ép Cam Tươi',
    category: 'mixers',
    abv: null,
    description: 'Ép nguyên quả, không đường',
    icon: 'local_cafe'
  },
  {
    id: 'cranberry',
    name: 'Nước Ép Cranberry',
    category: 'mixers',
    abv: null,
    description: 'Nước cranberry không đường',
    icon: 'local_cafe'
  },
  {
    id: 'soda',
    name: 'Club Soda Khí Sâu',
    category: 'mixers',
    abv: null,
    description: 'Soda nguyên chất, CO2 cao',
    icon: 'bubbles'
  },
  {
    id: 'ginger-beer',
    name: 'Ginger Beer',
    category: 'mixers',
    abv: null,
    description: 'Bia gừng thủ công, cay nhẹ',
    icon: 'bubbles'
  },
  {
    id: 'prosecco',
    name: 'Prosecco',
    category: 'mixers',
    abv: '12%',
    description: 'Rượu vang sủi Ý, khô',
    icon: 'wine_bar'
  },
  {
    id: 'egg-white',
    name: 'Lòng Trắng Trứng',
    category: 'mixers',
    abv: null,
    description: 'Trứng gà tươi, đánh bông',
    icon: 'egg'
  },
  {
    id: 'heavy-cream',
    name: 'Kem Whipping (32%)',
    category: 'mixers',
    abv: null,
    description: 'Kem sữa béo, đánh bông',
    icon: 'icecream'
  },

  // === COFFEE & TEA (Cà Phê & Trà) ===
  {
    id: 'cold-brew',
    name: 'Cold Brew Cốt Đậm',
    category: 'coffee',
    abv: null,
    description: 'Cà phê ngâm lạnh 12-24h, ratio 1:8',
    icon: 'coffee'
  },
  {
    id: 'espresso',
    name: 'Espresso Shot',
    category: 'coffee',
    abv: null,
    description: 'Chiết xuất 25-30ml, áp suất 9 bar',
    icon: 'coffee'
  },
  {
    id: 'v60-pour-over',
    name: 'V60 Pour Over',
    category: 'coffee',
    abv: null,
    description: 'Cà phê pha tay V60, sạch và tinh tế',
    icon: 'coffee'
  },
  {
    id: 'matcha',
    name: 'Matcha Uji Ceremonial',
    category: 'coffee',
    abv: null,
    description: 'Bột trà xanh Nhật Uji grade cao',
    icon: 'eco'
  },
  {
    id: 'cascara',
    name: 'Trà Vỏ Cà Phê Cascara',
    category: 'coffee',
    abv: null,
    description: 'Vỏ quả cà phê sấy, hương hoa dịu',
    icon: 'eco'
  },
  {
    id: 'chai-spice',
    name: 'Chai Spice Blend',
    category: 'coffee',
    abv: null,
    description: 'Hỗn hợp quế, đại hồi, gừng, tiêu đen',
    icon: 'spa'
  },

  // === BOTANICALS (Gia Vị & Thảo Mộc) ===
  {
    id: 'angostura',
    name: 'Angostura Aromatic Bitters',
    category: 'botanicals',
    abv: '44%',
    description: 'Bitters thảo mộc từ Trinidad, 10+ thảo dược',
    icon: 'science'
  },
  {
    id: 'orange-bitters',
    name: "Regans' Orange Bitters",
    category: 'botanicals',
    abv: '25%',
    description: 'Bitters vỏ cam đắng, citrusy',
    icon: 'science'
  },
  {
    id: 'peychauds',
    name: "Peychaud's Bitters",
    category: 'botanicals',
    abv: '35%',
    description: 'Bitters sassafras, hương hạt anise',
    icon: 'science'
  },
  {
    id: 'fresh-mint',
    name: 'Lá Bạc Hà Tươi',
    category: 'botanicals',
    abv: null,
    description: 'Bạc hà Vietnamese hoặc spearmint',
    icon: 'eco'
  },
  {
    id: 'basil',
    name: 'Lá húng quế Tươi',
    category: 'botanicals',
    abv: null,
    description: 'Basil Thái hoặc Genovese',
    icon: 'eco'
  },
  {
    id: 'cinnamon',
    name: 'Thanh Quế Khò Lửa',
    category: 'botanicals',
    abv: null,
    description: 'Quế cây khò trên ngọn lửa',
    icon: 'local_fire_department'
  },
  {
    id: 'dried-orange',
    name: 'Lát Cam Sấy Khô',
    category: 'botanicals',
    abv: null,
    description: 'Cam vàng sấy mỏng, trang trí',
    icon: 'eco'
  },
  {
    id: 'marasca-cherry',
    name: 'Anh Đào Marasca Ngâm',
    category: 'botanicals',
    abv: null,
    description: 'Anh đào Luxardo ngâm rượu, trang trí',
    icon: 'cherry'
  },
  {
    id: 'olive',
    name: 'Olives Xanh',
    category: 'botanicals',
    abv: null,
    description: 'Olives xanh Tây Ban Nha, garnish martini',
    icon: 'circle'
  },
  {
    id: 'coarse-salt',
    name: 'Muối Thô Ranh Giới',
    category: 'botanicals',
    abv: null,
    description: 'Muối thô rim ly, hồng Himalaya',
    icon: 'grain'
  },
]

// Category labels and metadata
export const ingredientCategories = {
  spirits: {
    key: 'spirits',
    label: 'Rượu Nền',
    labelEn: 'Base Spirits',
    description: '40-50% ABV',
    abvRange: '40-50%',
    color: 'copper-accent'
  },
  liqueurs: {
    key: 'liqueurs',
    label: 'Rượu Mùi',
    labelEn: 'Liqueurs & Amaro',
    description: 'Hương thảo mộc & quả',
    color: 'primary'
  },
  mixers: {
    key: 'mixers',
    label: 'Đồ Pha & Trái Cây',
    labelEn: 'Mixers & Syrups',
    description: 'Cân bằng Acid & Đường',
    color: 'tertiary'
  },
  coffee: {
    key: 'coffee',
    label: 'Cà Phê & Trà',
    labelEn: 'Brew Specialty',
    description: 'Hương hoa & Chiết xuất',
    color: 'secondary'
  },
  botanicals: {
    key: 'botanicals',
    label: 'Gia Vị & Thảo Mộc',
    labelEn: 'Botanicals & Bitters',
    description: 'Garnish & Drops',
    color: 'amber-vibrant'
  }
}

// Mock recipes for bar matching
export const mockBarRecipes = [
  // === 100% MATCH READY RECIPES ===
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
      { id: 'gin', name: 'London Dry Gin', amount: '45ml', isOptional: false },
      { id: 'tonic', name: 'Tonic Cao Cấp', amount: '120ml', isOptional: false },
      { id: 'lime-juice', name: 'Nước Cốt Chanh', amount: '5ml', isOptional: false },
    ],
    equipment: ['mixing-glass', 'jigger', 'bar-spoon'],
    steps: [
      'Cho Gin vào ly highball đã có đá.',
      'Thêm Tonic từ từ để giữ bọt.',
      'Vắt chanh và khuấy nhẹ.',
      'Trang trí với vỏ chanh.'
    ]
  },
  {
    id: 'bar-002',
    name: 'Classic Bourbon Sour',
    nameEn: 'Bourbon Whiskey Sour',
    category: 'Shaken Classics',
    description: 'Tỉ lệ vàng kinh điển của làng cocktail: sự nồng ấm đầm chắc của Bourbon kết hợp độ chua mượt mà và hậu vị caramel thanh thoát.',
    image_url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800',
    time_minutes: 3,
    difficulty: 'Trung bình',
    avg_rating: 5.0,
    tags: ['bourbon', 'sour', 'classic'],
    ingredients: [
      { id: 'bourbon', name: 'Bourbon Whiskey', amount: '60ml', isOptional: false },
      { id: 'lime-juice', name: 'Nước Cốt Chanh Vàng', amount: '25ml', isOptional: false },
      { id: 'simple-syrup', name: 'Syrup Đường Mía', amount: '20ml', isOptional: false },
    ],
    equipment: ['shaker', 'jigger', 'strainer'],
    steps: [
      'Cho Bourbon, chanh và syrup vào shaker với đá.',
      'Lắc mạnh trong 10 giây.',
      'Lọc vào ly rocks đã có đá.',
      'Trang trí với vỏ chanh.'
    ]
  },
  {
    id: 'bar-003',
    name: 'Campari Spritz',
    nameEn: 'Aperol/Campari Spritz',
    category: 'Aperitivo',
    description: 'Mở đầu bữa tối với vị đắng nhẹ và bọt sủi tươi mát, màu cam rực rỡ như hoàng hôn Ý.',
    image_url: 'https://images.unsplash.com/photo-1560508179-b2c9a3f8e92b?w=800',
    time_minutes: 2,
    difficulty: 'Dễ',
    avg_rating: 4.7,
    tags: ['aperol', 'spritz', 'refreshing'],
    ingredients: [
      { id: 'aperol', name: 'Aperol', amount: '60ml', isOptional: false },
      { id: 'prosecco', name: 'Prosecco', amount: '90ml', isOptional: false },
      { id: 'soda', name: 'Soda', amount: '30ml', isOptional: false },
    ],
    equipment: ['wine-glass', 'jigger'],
    steps: [
      'Cho Aperol vào ly wine glass đã có đá.',
      'Thêm Prosecco.',
      'Thêm Soda.',
      'Trang trí với lát cam.'
    ]
  },
  {
    id: 'bar-004',
    name: 'Espresso Martini Phú Quốc',
    nameEn: 'Vietnamese Coffee Martini',
    category: 'Modern Classics',
    description: 'Kết hợp espresso Phú Quốc đậm đà với vodka và liqueur cà phê, tạo nên ly martini thức vừa tỉnh táo vừa say.',
    image_url: 'https://images.unsplash.com/photo-1545438102-799c3991ffef?w=800',
    time_minutes: 4,
    difficulty: 'Dễ',
    avg_rating: 4.8,
    tags: ['vodka', 'coffee', 'martini'],
    ingredients: [
      { id: 'vodka', name: 'Vodka Craft', amount: '45ml', isOptional: false },
      { id: 'kahlua', name: 'Kahlúa Coffee', amount: '20ml', isOptional: false },
      { id: 'espresso', name: 'Espresso Shot', amount: '30ml', isOptional: false },
    ],
    equipment: ['shaker', 'espresso-machine', 'coupe-glass'],
    steps: [
      'Pha espresso và để nguội nhẹ.',
      'Cho espresso, vodka và Kahlúa vào shaker với đá.',
      'Lắc mạnh trong 15 giây.',
      'Lọc vào ly coupe đã làm lạnh.'
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
      { id: 'vodka', name: 'Vodka Craft', amount: '45ml', isOptional: false },
      { id: 'ginger-beer', name: 'Ginger Beer', amount: '120ml', isOptional: false },
      { id: 'lime-juice', name: 'Nước Cốt Chanh', amount: '15ml', isOptional: false },
    ],
    equipment: ['copper-mug', 'jigger'],
    steps: [
      'Cho vodka và chanh vào mug đã có đá.',
      'Thêm ginger beer từ từ.',
      'Khuấy nhẹ.',
      'Trang trí với lá bạc hà.'
    ]
  },
  {
    id: 'bar-006',
    name: 'Tequila Sunrise Vị Việt',
    nameEn: 'Tropical Tequila Sunrise',
    category: 'Tropical Classics',
    description: 'Tequila Reposado ấm nồng hòa cùng nước cam tươi, gradient đỏ cam như bình minh Đà Lạt.',
    image_url: 'https://images.unsplash.com/photo-1560512823-829485b8bf24?w=800',
    time_minutes: 3,
    difficulty: 'Dễ',
    avg_rating: 4.5,
    tags: ['tequila', 'tropical', 'orange'],
    ingredients: [
      { id: 'tequila', name: 'Tequila Reposado', amount: '45ml', isOptional: false },
      { id: 'orange-juice', name: 'Nước Ép Cam', amount: '90ml', isOptional: false },
      { id: 'simple-syrup', name: 'Syrup Đường', amount: '10ml', isOptional: false },
    ],
    equipment: ['highball-glass', 'jigger', 'bar-spoon'],
    steps: [
      'Cho tequila và syrup vào ly đá.',
      'Thêm đá và khuấy nhẹ.',
      'Đổ nước cam từ từ lên thành ly.',
      'Để tự nhiên tạo gradient.'
    ]
  },
  {
    id: 'bar-007',
    name: 'Negroni Bianco Thanh Tao',
    nameEn: 'Bianco Negroni',
    category: 'Italian Classics',
    description: 'Biến tấu trắng của Negroni kinh điển: gin, vermouth và Campari với hương nhẹ hơn, thanh tao hơn.',
    image_url: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800',
    time_minutes: 3,
    difficulty: 'Dễ',
    avg_rating: 4.8,
    tags: ['gin', 'italian', 'bitter'],
    ingredients: [
      { id: 'gin', name: 'London Dry Gin', amount: '30ml', isOptional: false },
      { id: 'campari', name: 'Campari Bitter', amount: '30ml', isOptional: false },
      { id: 'vermouth-dry', name: 'Dry Vermouth', amount: '30ml', isOptional: false },
    ],
    equipment: ['mixing-glass', 'bar-spoon', 'rocks-glass'],
    steps: [
      'Cho gin, Campari và vermouth vào cối trộn.',
      'Thêm đá và khuấy 30 giây.',
      'Lọc vào ly rocks đã làm lạnh.',
      'Trang trí với vỏ cam.'
    ]
  },
  {
    id: 'bar-008',
    name: 'Cointreau Collins Chanh Cam',
    nameEn: 'Cointreau Orange Collins',
    category: 'Refreshing Fizz',
    description: 'Sảng khoái và sáng chói: Triple Sec Cointreau hòa cùng chanh và soda, mùi cam quýt tươi mát.',
    image_url: 'https://images.unsplash.com/photo-1556855810-ac404aa91e85?w=800',
    time_minutes: 3,
    difficulty: 'Dễ',
    avg_rating: 4.7,
    tags: ['cointreau', 'fizz', 'refreshing'],
    ingredients: [
      { id: 'cointreau', name: 'Cointreau (Triple Sec)', amount: '30ml', isOptional: false },
      { id: 'lemon-juice', name: 'Nước Cốt Chanh Xanh', amount: '25ml', isOptional: false },
      { id: 'simple-syrup', name: 'Syrup Đường', amount: '15ml', isOptional: false },
    ],
    equipment: ['shaker', 'highball-glass'],
    steps: [
      'Cho Cointreau, chanh và syrup vào shaker.',
      'Lắc với đá.',
      'Đổ vào ly highball đã có đá.',
      'Thêm soda và khuấy nhẹ.'
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
      { id: 'bourbon', name: 'Bourbon Whiskey', amount: '45ml', isOptional: false },
      { id: 'campari', name: 'Campari Bitter', amount: '30ml', isOptional: false },
      { id: 'vermouth-rosso', name: 'Sweet Vermouth', amount: '30ml', isOptional: false },
    ],
    equipment: ['mixing-glass', 'bar-spoon', 'rocks-glass'],
    steps: [
      'Cho Bourbon, Campari và vermouth vào cối trộn.',
      'Thêm đá và khuấy 30 giây.',
      'Lọc vào ly rocks đã có đá lớn.',
      'Trang trí với vỏ cam khò lửa.'
    ]
  },
  {
    id: 'bar-102',
    name: 'White Lady (1919)',
    nameEn: 'White Lady',
    category: 'Art Deco Sour',
    description: 'Kiệt tác cân bằng giữa Gin thảo mộc, hương cam tươi từ Cointreau và lòng trắng trứng tạo bọt kem bồng bềnh mượt như nhung.',
    image_url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800',
    time_minutes: 4,
    difficulty: 'Trung bình',
    avg_rating: 4.7,
    tags: ['gin', 'sour', 'classic'],
    ingredients: [
      { id: 'gin', name: 'London Dry Gin', amount: '40ml', isOptional: false },
      { id: 'cointreau', name: 'Cointreau (Triple Sec)', amount: '20ml', isOptional: false },
      { id: 'lemon-juice', name: 'Nước Cốt Chanh', amount: '20ml', isOptional: false },
      { id: 'egg-white', name: 'Lòng Trắng Trứng', amount: '1 quả', isOptional: false },
    ],
    equipment: ['shaker', 'coupe-glass', 'strainer'],
    steps: [
      'Dry shake không đá trong 15 giây.',
      'Thêm đá và shake tiếp 15 giây.',
      'Double strain vào ly coupe.',
      'Trang trí với vỏ chanh.'
    ]
  },
  {
    id: 'bar-103',
    name: 'Old Fashioned Bourbon',
    nameEn: 'Bourbon Old Fashioned',
    category: 'Speakeasy Classics',
    description: 'Công thức cổ điển nhất: Bourbon đậm đà, đường tan chảy và bitters thơm nồng, tất cả trong một ly rocks.',
    image_url: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800',
    time_minutes: 5,
    difficulty: 'Dễ',
    avg_rating: 5.0,
    tags: ['bourbon', 'classic', 'stirred'],
    ingredients: [
      { id: 'bourbon', name: 'Bourbon Whiskey', amount: '60ml', isOptional: false },
      { id: 'simple-syrup', name: 'Syrup Đường', amount: '10ml', isOptional: false },
      { id: 'angostura', name: 'Angostura Bitters', amount: '2 dashes', isOptional: false },
      { id: 'dried-orange', name: 'Lát Cam Sấy', amount: '1 lát', isOptional: true },
    ],
    equipment: ['mixing-glass', 'bar-spoon', 'rocks-glass'],
    steps: [
      'Cho syrup và bitters vào cối trộn.',
      'Thêm đá và khuấy tan.',
      'Cho Bourbon và khuấy 30 giây.',
      'Lọc vào ly rocks đã làm lạnh.',
      'Trang trí với vỏ cam.'
    ]
  },
  {
    id: 'bar-104',
    name: 'Gin Gimlet Thảo Mộc',
    nameEn: 'Classic Gin Gimlet',
    category: 'Nautical History',
    description: 'Nguồn gốc hải quân Anh: Gin pha cùng nước cốt chanh và đường, giữ độ tươi mát và hương vị cân bằng.',
    image_url: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=800',
    time_minutes: 3,
    difficulty: 'Dễ',
    avg_rating: 4.6,
    tags: ['gin', 'classic', 'sour'],
    ingredients: [
      { id: 'gin', name: 'London Dry Gin', amount: '60ml', isOptional: false },
      { id: 'lime-juice', name: 'Nước Cốt Chanh', amount: '25ml', isOptional: false },
      { id: 'simple-syrup', name: 'Syrup Đường', amount: '15ml', isOptional: false },
      { id: 'fresh-mint', name: 'Lá Bạc Hà', amount: '2 lá', isOptional: true },
    ],
    equipment: ['shaker', 'coupe-glass'],
    steps: [
      'Cho gin, chanh và syrup vào shaker.',
      'Lắc mạnh với đá.',
      'Lọc vào ly coupe đã làm lạnh.',
      'Trang trí với bạc hà.'
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
      { id: 'bourbon', name: 'Bourbon Whiskey', amount: '60ml', isOptional: false },
      { id: 'honey-syrup', name: 'Syrup Mật Ong', amount: '20ml', isOptional: false },
      { id: 'lemon-juice', name: 'Nước Cốt Chanh', amount: '25ml', isOptional: false },
      { id: 'fresh-mint', name: 'Lá Bạc Hà', amount: '6-8 lá', isOptional: false },
    ],
    equipment: ['muddler', 'shaker', 'rocks-glass'],
    steps: [
      'Nghiền nhẹ bạc hà với syrup mật ong.',
      'Thêm Bourbon và chanh.',
      'Thêm đá và lắc.',
      'Đổ vào ly rocks đã có đá.',
      'Trang trí thêm bạc hà.'
    ]
  },
  {
    id: 'bar-106',
    name: 'Paper Plane Peaty',
    nameEn: 'Paper Plane',
    category: 'Modern Classic',
    description: 'Cocktail đương đại được tạo tại bar ở Brooklyn 2007: Bourbon, Aperol, Amaro và nước chanh cân bằng hoàn hảo.',
    image_url: 'https://images.unsplash.com/photo-1545438102-799c3991ffef?w=800',
    time_minutes: 3,
    difficulty: 'Dễ',
    avg_rating: 4.7,
    tags: ['bourbon', 'aperol', 'modern'],
    ingredients: [
      { id: 'bourbon', name: 'Bourbon Whiskey', amount: '30ml', isOptional: false },
      { id: 'aperol', name: 'Aperol', amount: '30ml', isOptional: false },
      { id: 'amaro', name: 'Amaro Montenegro', amount: '30ml', isOptional: false },
      { id: 'lemon-juice', name: 'Nước Cốt Chanh', amount: '30ml', isOptional: false },
    ],
    equipment: ['shaker', 'coupe-glass'],
    steps: [
      'Cho tất cả vào shaker với đá.',
      'Lắc mạnh 15 giây.',
      'Double strain vào ly coupe.',
      'Không trang trí, giữ minimal.'
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
      { id: 'rum', name: 'Dark Rum', amount: '60ml', isOptional: false },
      { id: 'lime-juice', name: 'Nước Cốt Chanh', amount: '25ml', isOptional: false },
      { id: 'simple-syrup', name: 'Syrup Đường', amount: '15ml', isOptional: false },
    ],
    equipment: ['shaker', 'coupe-glass'],
    steps: [
      'Cho rum, chanh và syrup vào shaker.',
      'Lắc mạnh với đá.',
      'Double strain vào ly coupe đã làm lạnh.',
      'Trang trí với vỏ chanh.'
    ]
  },
  {
    id: 'bar-108',
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
      { id: 'rye-whiskey', name: 'Rye Whiskey', amount: '30ml', isOptional: false },
      { id: 'cognac', name: 'Cognac/VS', amount: '30ml', isOptional: false },
      { id: 'vermouth-rosso', name: 'Sweet Vermouth', amount: '30ml', isOptional: false },
      { id: 'angostura', name: 'Angostura Bitters', amount: '1 dash', isOptional: false },
      { id: 'peychauds', name: "Peychaud's Bitters", amount: '1 dash', isOptional: false },
    ],
    equipment: ['mixing-glass', 'rocks-glass'],
    steps: [
      'Cho tất cả vào cối trộn với đá.',
      'Khuấy 30 giây.',
      'Lọc vào ly rocks đã có đá lớn.',
      'Trang trí với vỏ cam và cherry.'
    ]
  },
  {
    id: 'bar-109',
    name: 'Last Word Đặc Sản',
    nameEn: 'The Last Word',
    category: 'Prohibition Era',
    description: 'Cocktail thời cấm rượu từ Detroit: Gin, Chartreuse, Maraschino và chanh, cân bằng giữa thảo mộc, ngọt và chua.',
    image_url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800',
    time_minutes: 3,
    difficulty: 'Dễ',
    avg_rating: 4.9,
    tags: ['gin', 'chartreuse', 'classic'],
    ingredients: [
      { id: 'gin', name: 'London Dry Gin', amount: '22ml', isOptional: false },
      { id: 'chartreuse', name: 'Chartreuse Verte', amount: '22ml', isOptional: false },
      { id: 'maraschino', name: 'Luxardo Maraschino', amount: '22ml', isOptional: false },
      { id: 'lemon-juice', name: 'Nước Cốt Chanh', amount: '22ml', isOptional: false },
    ],
    equipment: ['shaker', 'coupe-glass'],
    steps: [
      'Cho tất cả vào shaker với đá.',
      'Lắc mạnh 15 giây.',
      'Double strain vào ly coupe.',
      'Trang trí với cherry.'
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
      { id: 'scotch', name: 'Single Malt Scotch', amount: '45ml', isOptional: false },
      { id: 'lemon-juice', name: 'Nước Cốt Chanh', amount: '20ml', isOptional: false },
      { id: 'honey-syrup', name: 'Syrup Mật Ong', amount: '20ml', isOptional: false },
      { id: 'ginger-beer', name: 'Ginger Beer', amount: 'dash', isOptional: true },
    ],
    equipment: ['shaker', 'rocks-glass', 'torch'],
    steps: [
      'Rinse ly với smoke.',
      'Cho Scotch, chanh và syrup vào shaker.',
      'Lắc với đá.',
      'Đổ vào ly rocks đã có đá.',
      'Garnish với gừng caramel.'
    ]
  },
  {
    id: 'bar-111',
    name: 'Mai Tai Đặc Sản',
    nameEn: 'Artisanal Mai Tai',
    category: 'Tiki Heritage',
    description: 'Huyền thoại từ 1944 Oakland: rum, orange curaçao, lime và orgeat, một ly tropical đích thực.',
    image_url: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=800',
    time_minutes: 4,
    difficulty: 'Trung bình',
    avg_rating: 4.7,
    tags: ['rum', 'tiki', 'tropical'],
    ingredients: [
      { id: 'rum', name: 'Dark Rum', amount: '30ml', isOptional: false },
      { id: 'cointreau', name: 'Cointreau (Triple Sec)', amount: '15ml', isOptional: false },
      { id: 'lime-juice', name: 'Nước Cốt Chanh', amount: '25ml', isOptional: false },
      { id: 'orgeat', name: 'Orgeat Syrup', amount: '15ml', isOptional: false },
    ],
    equipment: ['shaker', 'rocks-glass'],
    steps: [
      'Cho rum, Cointreau, chanh và orgeat vào shaker.',
      'Lắc mạnh với đá.',
      'Đổ vào ly rocks đã có đá.',
      'Trang trí với mint và lime wheel.'
    ]
  },
  {
    id: 'bar-112',
    name: 'Cosmopolitan Hoa Anh Đào',
    nameEn: 'Cherry Blossom Cosmopolitan',
    category: 'Modern Elegance',
    description: 'Biến tấu thanh lịch của Cosmopolitan: vodka, triple sec, nước cam và cranberry với chút cherry.',
    image_url: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800',
    time_minutes: 3,
    difficulty: 'Dễ',
    avg_rating: 4.6,
    tags: ['vodka', 'feminine', 'modern'],
    ingredients: [
      { id: 'vodka', name: 'Vodka Craft', amount: '40ml', isOptional: false },
      { id: 'cointreau', name: 'Cointreau (Triple Sec)', amount: '15ml', isOptional: false },
      { id: 'cranberry', name: 'Nước Ép Cranberry', amount: '30ml', isOptional: false },
      { id: 'lime-juice', name: 'Nước Cốt Chanh', amount: '15ml', isOptional: false },
    ],
    equipment: ['shaker', 'coupe-glass'],
    steps: [
      'Cho tất cả vào shaker với đá.',
      'Lắc mạnh.',
      'Double strain vào ly coupe.',
      'Trang trí với vỏ cam.'
    ]
  },
  {
    id: 'bar-113',
    name: 'Aeronautical',
    nameEn: 'The Aeronaut',
    category: 'Aviation Revival',
    description: 'Từ barrel bar London: Gin, maraschino, lemon và lilac floral water, bay lên không trung.',
    image_url: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?w=800',
    time_minutes: 3,
    difficulty: 'Dễ',
    avg_rating: 4.8,
    tags: ['gin', 'floral', 'modern'],
    ingredients: [
      { id: 'gin', name: 'London Dry Gin', amount: '60ml', isOptional: false },
      { id: 'maraschino', name: 'Luxardo Maraschino', amount: '15ml', isOptional: false },
      { id: 'lemon-juice', name: 'Nước Cốt Chanh', amount: '20ml', isOptional: false },
      { id: 'violet-liqueur', name: 'Crème Yvette', amount: '5ml', isOptional: true },
    ],
    equipment: ['shaker', 'coupe-glass'],
    steps: [
      'Cho gin, maraschino và chanh vào shaker.',
      'Lắc với đá.',
      'Double strain vào ly coupe.',
      'Trang trí nhẹ nhàng.'
    ]
  },
  {
    id: 'bar-114',
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
      { id: 'gin', name: 'London Dry Gin', amount: '30ml', isOptional: false },
      { id: 'chartreuse', name: 'Chartreuse Verte', amount: '30ml', isOptional: false },
      { id: 'vermouth-rosso', name: 'Sweet Vermouth', amount: '30ml', isOptional: false },
      { id: 'orange-bitters', name: 'Orange Bitters', amount: '1 dash', isOptional: false },
    ],
    equipment: ['mixing-glass', 'rocks-glass'],
    steps: [
      'Cho tất cả vào cối trộn.',
      'Khuấy với đá 30 giây.',
      'Lọc vào ly coupe đã làm lạnh.',
      'Trang trí với cherry.'
    ]
  }
]

// Helper: Get ingredient by ID
export function getIngredientById(id) {
  return mockBarIngredients.find(i => i.id === id)
}

// Helper: Get recipe by ID
export function getRecipeById(id) {
  return mockBarRecipes.find(r => r.id === id)
}

// Helper: Match recipes with selected ingredients
export function matchRecipes(selectedIds) {
  return mockBarRecipes.map(recipe => {
    const recipeIngredientIds = recipe.ingredients.map(i => i.id)
    
    // Find matched ingredients
    const matched = recipeIngredientIds.filter(id => selectedIds.includes(id))
    
    // Find missing ingredients
    const missing = recipeIngredientIds.filter(id => !selectedIds.includes(id))
    
    const matchPercentage = Math.round((matched.length / recipeIngredientIds.length) * 100)
    
    return {
      ...recipe,
      matchPercentage,
      matchedCount: matched.length,
      missingCount: missing.length,
      totalCount: recipeIngredientIds.length,
      matchedIngredients: matched,
      missingIngredients: missing.map(id => {
        const ing = getIngredientById(id)
        const recipeIng = recipe.ingredients.find(ri => ri.id === id)
        return {
          id,
          name: ing?.name || id,
          amount: recipeIng?.amount
        }
      })
    }
  }).sort((a, b) => b.matchPercentage - a.matchPercentage)
}

// Get ready recipes (100% match)
export function getReadyRecipes(selectedIds) {
  return matchRecipes(selectedIds).filter(r => r.matchPercentage === 100)
}

// Get almost ready recipes (missing 1 ingredient)
export function getAlmostRecipes(selectedIds) {
  return matchRecipes(selectedIds).filter(r => r.matchPercentage >= 50 && r.matchPercentage < 100)
}

// Get bar coverage percentage
export function getBarCoverage(selectedIds, allIngredientIds) {
  return Math.round((selectedIds.length / allIngredientIds.length) * 100)
}

// Save bar to localStorage
export function saveBarToStorage(selectedIds) {
  localStorage.setItem('atelier_bar_selected', JSON.stringify(selectedIds))
  localStorage.setItem('atelier_bar_timestamp', Date.now().toString())
}

// Load bar from localStorage
export function loadBarFromStorage() {
  try {
    const saved = localStorage.getItem('atelier_bar_selected')
    if (saved) {
      return JSON.parse(saved)
    }
  } catch (e) {
    console.error('Failed to load bar from storage:', e)
  }
  return ['bourbon', 'gin', 'campari', 'cointreau', 'tonic', 'lime-juice', 'simple-syrup']
}

// Get all ingredient IDs
export function getAllIngredientIds() {
  return mockBarIngredients.map(i => i.id)
}
