/**
 * ============================================================
 * LINEAGE TREE DATA
 * Data for the "Cây Phả Hệ Biến Tấu Công Thức" page
 * ============================================================
 */

export const LINEAGE_FAMILIES = [
  {
    id: 'old_fashioned',
    name: 'Old Fashioned & Manhattan',
    icon: 'local_bar',
  },
  {
    id: 'negroni',
    name: 'Negroni & Boulevardier',
    icon: 'science',
  },
  {
    id: 'sour',
    name: 'Sour & Daisy',
    icon: 'water_drop',
  },
  {
    id: 'highball',
    name: 'Highball & Fizz',
    icon: 'bubble_chart',
  },
];

export const ERA_FILTERS = [
  { value: 'all', label: 'Tất Cả Thời Kỳ' },
  { value: 'golden', label: 'Kỷ Nguyên Vàng (1880 - 1920)' },
  { value: 'prohibition', label: 'Thời Kỳ Cấm Rượu (1920 - 1933)' },
  { value: 'modern', label: 'Phục Hưng Hiện Đại (2000 - Nay)' },
];

export const NODE_LEGEND = [
  { color: 'bg-amber-vibrant', label: 'Gốc Cội Nguồn' },
  { color: 'bg-copper-accent', label: 'Riffs Cổ Điển' },
  { color: 'bg-tertiary-container', label: 'Độc Bản Atelier' },
];

// ============================================================
// OLD FASHIONED & MANHATTAN LINEAGE
// ============================================================
export const oldFashionedTree = {
  family: 'old_fashioned',
  title: 'Cây Phả Hệ Old Fashioned & Manhattan',
  subtitle:
    'Truy vết nguồn gốc và sự tiến hóa của dòng cocktail whiskey kinh điển từ nguyên bản 1884 đến các sáng tạo độc bản tại trạm bar hiện đại.',
  levels: [
    // ─── LEVEL 0: ROOT ─────────────────────────────────────────
    {
      id: 'root',
      level: 0,
      nodes: [
        {
          id: 'classic-old-fashioned',
          title: 'Classic Whiskey Old Fashioned',
          era: '1884',
          eraLabel: 'Công Thức Cội Nguồn #ROOT-01 • 1884',
          origin: 'Pendennis Club, Louisville & Jerry Thomas compendium (1884)',
          abv: 'ABV ~34%',
          baseRatio:
            '60ml Rye/Bourbon, 1 viên đường mía, 2 dashes Angostura Bitters, tinh dầu cam.',
          imageUrl:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuCcibtVt6HHaSab3ZBwP9QRQusv3poM2u1Dtmg2oo3ClPfEd8PQR3U8C1JbIPYw3rCIvx9w9VzFSdavcY81kYL9MYCTr6EPHGUsVqk7qnQCYdocrKVU6zzxkcq8bzHVN6kahKHlyKfX8IL-n9u9RpdyT9YqLkNRsHjopN_7lgLWGxBgfUy5qmR5Kquz98fHCTqNX7bochZFaaCGHUIy0Bn7dfx-VZCE2PTCMG26wPpuwPrjHKIM9woP',
          imageAlt:
            'Close up photograph of a vintage classic Old Fashioned cocktail in a crystal lowball rock glass with a large hand carved ice block and orange peel garnish inside a moody speakeasy atmosphere warm amber lighting',
          nodeType: 'root',
          childKeys: ['boulevardier', 'vieux-carre', 'sazerac'],
        },
      ],
    },
    // ─── LEVEL 1: FIRST GEN RIFFS ──────────────────────────────
    {
      id: 'level1',
      level: 1,
      nodes: [
        {
          id: 'boulevardier',
          title: 'Boulevardier',
          era: '1927',
          eraLabel: 'Cấm Rượu • 1927',
          branchLabel: 'Nhánh Paris Riff',
          origin:
            'Erskine Gwynne, Harry\'s New York Bar Paris. Hoán vị cấu trúc Bourbon bằng việc phối trộn Sweet Vermouth & Campari.',
          recipe:
            '45ml Bourbon + 30ml Sweet Vermouth + 30ml Campari',
          nodeType: 'classic',
          childKeys: ['left-hand'],
          specs: {
            spirit: '45ml Bourbon',
            spiritNote: 'Vanilla oak, warm spice, corn sweetness',
            sweetener: '30ml Sweet Vermouth',
            sweetenerNote: 'Fortified wine body, dried fruit & herbal depth',
            bitter: '30ml Campari',
            bitterNote: 'Bold bitter-sweet, citrus peel intensity',
            garnish: 'Orange Peel / Luxardo Cherry',
            garnishNote: 'Aromatic citrus oil expression over ice',
            abv: 'ABV 28% • Brix 5.1',
          },
        },
        {
          id: 'vieux-carre',
          title: 'Vieux Carré',
          era: '1938',
          eraLabel: 'Hậu Cấm Rượu • 1938',
          branchLabel: 'Nhánh Creole',
          origin:
            'Walter Bergeron, Monteleone New Orleans. Cấu trúc phức hợp kết hợp Rye Whiskey với Cognac và rượu thảo mộc Bénédictine.',
          recipe:
            '30ml Rye + 30ml Cognac + 30ml Sweet Vermouth + Barspoon Bénédictine',
          nodeType: 'classic',
          childKeys: [],
          specs: {
            spirit: '30ml Rye + 30ml Cognac',
            spiritNote: 'Dual whiskey structure: spice + fruit brandy richness',
            sweetener: '30ml Sweet Vermouth + Bénédictine',
            sweetenerNote: 'Complex herbal sweetness with chartreuse-adjacent botanicals',
            bitter: 'Dashes Angostura + Peychaud\'s',
            bitterNote: 'Cinnamon spice + anise-fennel from New Orleans',
            garnish: 'Lemon twist, Angostura floater',
            garnishNote: 'Aromatic oils over full-bodied spirit structure',
            abv: 'ABV 30% • Brix 5.8',
          },
        },
        {
          id: 'sazerac',
          title: 'Sazerac',
          era: '1890s',
          eraLabel: 'Tiền Cấm Rượu • 1890s',
          branchLabel: 'Nhánh Absinthe',
          origin:
            'Biểu tượng huyền thoại New Orleans: Thay thế ly ướp lạnh tráng rượu Absinthe Herbsaint sắc sảo kết hợp Peychaud\'s Bitters.',
          recipe:
            '60ml Rye + Tráng ly Absinthe + Đường viên + Peychaud\'s Bitters',
          nodeType: 'classic',
          childKeys: [],
          specs: {
            spirit: '60ml Rye Whiskey',
            spiritNote: 'Full-proof rye grain character, bold and drying',
            sweetener: '1 Sugar Cube (Demerara)',
            sweetenerNote: 'Dissolved directly with bitters for silky texture',
            bitter: 'Peychaud\'s Bitters',
            bitterNote: 'Anise-forward, gentian root, bright cherry',
            garnish: 'Absinthe Rinsed Glass',
            garnishNote: 'Herbsaint or Pernod rinse — aromatic ghost layer',
            abv: 'ABV 38% • Brix 3.9',
          },
        },
      ],
    },
    // ─── LEVEL 2: MODERN CRAFT RIFFS ──────────────────────────
    {
      id: 'level2',
      level: 2,
      nodes: [
        {
          id: 'left-hand',
          title: 'Left Hand Cocktail',
          era: '2008',
          eraLabel: 'NYC Craft • 2008',
          icon: 'alt_route',
          origin:
            'Sam Ross (Milk & Honey). Đột biến thêm nốt đắng béo của Chocolate Mole Bitters vào bộ khung Boulevardier cổ điển.',
          recipe:
            'Bourbon, Campari, Sweet Vermouth, 3 dashes Xocolatl Mole Bitters.',
          nodeType: 'atelier',
          parentKey: 'boulevardier',
          specs: {
            spirit: '45ml Bourbon 100°',
            spiritNote: 'High-proof backbone carries mole spice without fatigue',
            sweetener: '22ml Sweet Vermouth',
            sweetenerNote: 'Restrained vermouth for balance with mole bitterness',
            bitter: '22ml Campari + 3 dashes Xocolatl Mole Bitters',
            bitterNote: 'Dark chocolate, ancho chili, warming cinnamon',
            garnish: 'Orange Peel',
            garnishNote: 'Cut stud to express oils, drop in glass',
            abv: 'ABV 26% • Brix 5.9',
          },
        },
        {
          id: 'smoked-oak-honey',
          title: 'Smoked Oak & Honey Old Fashioned',
          era: '2018',
          eraLabel: 'Atelier Rev. • 2018',
          icon: 'fireplace',
          origin:
            'Master Nguyễn Hoàng. Tác động khói gỗ sồi nướng cháy trực tiếp, thay thế đường mía bằng mật ong hoa rừng Tây Bắc ủ lạnh.',
          recipe:
            'Rye Whiskey, Raw Wild Honey, Smoked Cherry Bitters, xông khói vòm ly.',
          nodeType: 'atelier',
          parentKey: null,
          specs: {
            spirit: '55ml Rye Whiskey High-Proof',
            spiritNote: 'Gia vị cay nồng hỗ trợ chịu tải khói',
            sweetener: '10ml Mật Ong Rừng Ủ Sồi',
            sweetenerNote: 'Hạ vị gắt, tăng cường độ sánh mượt (mouthfeel)',
            bitter: 'Cherry Bark & Vanilla Bitters',
            bitterNote: 'Tạo lớp đắng êm dịu phong vị quả mọng',
            garnish: 'Xông Khói Gỗ Sồi Trực Tiếp',
            garnishNote: 'Đốt dăm gỗ sồi Pháp trong vòm thủy tinh',
            abv: 'ABV 31% • Brix 6.8',
          },
        },
        {
          id: 'oaxaca-old-fashioned',
          title: 'Oaxaca Old Fashioned',
          era: '2007',
          eraLabel: 'Death & Co • 2007',
          icon: 'psychology',
          origin:
            'Phil Ward. Cách mạng Agave thay thế Whiskey: Cân bằng Reposado Tequila kết hợp Mezcal khói và Agave Nectar đậm đặc.',
          recipe:
            '45ml Reposado Tequila, 15ml Mezcal, 1 barspoon Agave, 2 dashes Angostura.',
          nodeType: 'atelier',
          parentKey: null,
          specs: {
            spirit: '45ml Reposado Tequila + 15ml Mezcal',
            spiritNote: 'Reposado vanilla-oak + Mezcal earthy smoke duality',
            sweetener: '1 barspoon Agave Nectar',
            sweetenerNote: 'Pillowy floral sweetness, agave-authentic',
            bitter: '2 dashes Angostura Bitters',
            bitterNote: 'Allspice, clove warmth on the back palate',
            garnish: 'Orange Peel',
            garnishNote: 'Expressed and draped, complements agave floral notes',
            abv: 'ABV 29% • Brix 5.3',
          },
        },
      ],
    },
    // ─── LEVEL 3: ATELIER SIGNATURE ───────────────────────────
    {
      id: 'level3',
      level: 3,
      nodes: [
        {
          id: 'midnight-saffron-boulevardier',
          title: 'Midnight Saffron Boulevardier',
          era: '2025',
          eraLabel: 'Atelier Đương Đại (2025)',
          code: 'Mã Đăng Bộ: #ARC-8942',
          servingTag: 'Công Thức Trạm Đang Phục Vụ',
          origin:
            'Sáng tạo độc quyền tại trạm bar: Kỹ thuật Saffron Fat-wash trên nền Rye 100 Proof, kết hợp Campari xông gỗ táo và Sweet Vermouth ủ thảo mộc vùng Turin.',
          imageUrl:
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBEwhkapqbE_24Em0Ro7Yai5Lj6PRlxGS93moRwGCC7JSvHAzep2yQxLusDWZwH_77I1hBJDUWUlI4GHsTgMF3iw2PyJZFEcifIVdpixF0ypNL-VFkfz0iSYzSGAoZvNm22_VnFzXDXBmPZnDBIXF0C02cIjs8B7sz7tIbdsGJ7lQrU7TLRrRWE34f24QdKiPbMd9MOPz4ZJEK0ITPGLOuVe7kR9LnHFnTkUSB7QZz1gUvwjxffPlkd',
          imageAlt:
            'Sophisticated artisanal dark crimson cocktail with saffron threads and orange twist garnish served in a vintage crystal cut coupe glass with smoky atmospheric bar background',
          nodeType: 'crown',
          parentKey: 'boulevardier',
          specs: {
            spirit: '40ml Saffron Washed Rye 100°',
            spiritNote: 'Ngâm chiết nhụy nghệ tây & lọc béo trong 48h',
            sweetener: '30ml Sweet Vermouth Torino',
            sweetenerNote: 'Chứa hàm lượng đường nho tự nhiên & thảo mộc',
            bitter: '30ml Campari Applewood Infused',
            bitterNote: 'Đắng rực rỡ kết hợp khói gỗ táo phương Bắc',
            garnish: 'Khói Lạnh & Sợi Saffron Tươi',
            garnishNote: 'Sợi saffron dát lên khối đá tinh khiết 50mm',
            abv: 'ABV 27.5% • Brix 8.1',
          },
          actions: [
            { label: 'Xem Chi Tiết Công Thức', icon: 'receipt_long', primary: true },
            { label: 'Mở Trong Studio Sáng Tạo', icon: 'science', primary: false },
          ],
        },
      ],
    },
  ],

  // Station metrics
  metrics: {
    derivedRecipes: 12,
    heritageTechniques: 3,
    contributingArtisans: 4,
  },

  // 3-gen comparison data for Mutation Analyzer
  generations: [
    {
      id: 'gen1',
      generation: 'I',
      period: 'Gốc Tổ Tiên (1884)',
      name: 'Classic Old Fashioned',
      specs: {
        spirit: { amount: '60ml Kentucky Rye / Bourbon', note: 'Ngũ cốc nguyên bản, hương gỗ sồi vani ấm.' },
        sweetener: { amount: '1 White Sugar Cube (Đường Mía)', note: 'Dầm tan chảy trực tiếp dưới đáy ly.' },
        bitter: { amount: '2 Dashes Angostura Bitters', note: 'Vỏ quế, rễ cây khổ sâm Trinidad.' },
        garnish: { amount: 'Bày Vỏ Cam Tươi (Orange Twist)', note: 'Vắt biểu bì tạo màng sương tinh dầu cam.' },
      },
      abv: 'ABV 34% • Brix 4.2',
      highlight: false,
    },
    {
      id: 'gen2',
      generation: 'II',
      period: 'Cầu Nối Đột Biến (Rev. 1928)',
      name: 'Smoked Oak & Honey',
      specs: {
        spirit: { amount: '55ml Rye Whiskey High-Proof', note: 'Gia vị cay nồng hỗ trợ chịu tải khói.' },
        sweetener: { amount: '10ml Mật Ong Rừng Ủ Sồi', note: 'Hạ vị gắt, tăng cường độ sánh mượt (mouthfeel).' },
        bitter: { amount: 'Cherry Bark & Vanilla Bitters', note: 'Tạo lớp đắng êm dịu phong vị quả mọng.' },
        garnish: { amount: 'Xông Khói Gỗ Sồi Trực Tiếp', note: 'Đốt dăm gỗ sồi Pháp trong vòm thủy tinh.' },
      },
      abv: 'ABV 31% • Brix 6.8',
      highlight: false,
    },
    {
      id: 'gen3',
      generation: 'III',
      period: 'Atelier Đương Đại (2025)',
      name: 'Midnight Saffron Boulevardier',
      specs: {
        spirit: { amount: '40ml Saffron Washed Rye 100°', note: 'Ngâm chiết nhụy nghệ tây & lọc béo trong 48h.' },
        sweetener: { amount: '30ml Sweet Vermouth Torino', note: 'Chứa hàm lượng đường nho tự nhiên & thảo mộc.' },
        bitter: { amount: '30ml Campari Applewood Infused', note: 'Đắng rực rỡ kết hợp khói gỗ táo phương Bắc.' },
        garnish: { amount: 'Khói Lạnh & Sợi Saffron Tươi', note: 'Sợi saffron dát lên khối đá tinh khiết 50mm.' },
      },
      abv: 'ABV 27.5% • Brix 8.1',
      highlight: true,
    },
  ],
};

// ============================================================
// PLACEHOLDER DATA FOR OTHER FAMILIES
// ============================================================
export const negroniTree = {
  family: 'negroni',
  title: 'Cây Phả Hệ Negroni & Boulevardier',
  subtitle: 'Dòng Campari kinh điển Ý, từ Negroni 1919 tại Florence đến phong cách Speakeasy hiện đại.',
  levels: [],
  metrics: { derivedRecipes: 8, heritageTechniques: 2, contributingArtisans: 3 },
  generations: [],
};

export const sourTree = {
  family: 'sour',
  title: 'Cây Phả Hệ Sour & Daisy',
  subtitle: 'Cấu trúc citrus acid cân bằng, từ Whiskey Sour cổ điển đến các biến tấu foam và clarification.',
  levels: [],
  metrics: { derivedRecipes: 10, heritageTechniques: 3, contributingArtisans: 5 },
  generations: [],
};

export const highballTree = {
  family: 'highball',
  title: 'Cây Phả Hệ Highball & Fizz',
  subtitle: 'Dòng long drink tươi mát, từ Gin & Tonic đến Yuzu Highball và các biến thể sparkling.',
  levels: [],
  metrics: { derivedRecipes: 9, heritageTechniques: 2, contributingArtisans: 4 },
  generations: [],
};

export const getLineageTree = (familyId) => {
  const trees = {
    old_fashioned: oldFashionedTree,
    negroni: negroniTree,
    sour: sourTree,
    highball: highballTree,
  };
  return trees[familyId] || oldFashionedTree;
};
