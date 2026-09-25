/**
 * ============================================================
 * useEquipment Hook - Quản lý dụng cụ bar & bakery
 * Extended với đầy đủ equipment từ Atelier Design
 * ============================================================
 */
import { useState, useEffect, useCallback, useMemo } from 'react';

export const EQUIPMENT_CATEGORIES = {
  // =============================================
  // OVEN & HEATING - Lò Nướng, Bếp & Cấp Nhiệt
  // =============================================
  oven: {
    label: 'Lò Nướng & Bếp',
    labelEn: 'Ovens & Heating',
    description: 'Nền tảng kiểm soát nhiệt lượng, phản ứng Maillard và caramel hóa chính xác',
    icon: 'local_fire_department',
    scope: ['pastry', 'pro'],
    items: [
      { 
        id: 'convection-oven', 
        name: 'Lò Nướng Đối Lưu Đa Tầng', 
        nameEn: 'Convection Oven Unox Bake',
        description: 'Quạt gió đảo chiều kiểm soát độ giòn vỏ baguette và bánh mì men chua.',
        tier: 'pro',
        tierLabel: 'Chuyên Nghiệp',
        recipeCount: 52
      },
      { 
        id: 'dutch-oven', 
        name: 'Nồi Gang Đúc Dutch Oven', 
        nameEn: 'Enameled Cast Iron 26cm',
        description: 'Giữ nhiệt tối đa và bẫy hơi nước tự nhiên giúp bánh sourdough nở phồng rực rỡ.',
        tier: 'essential',
        tierLabel: 'Thiết Yếu',
        recipeCount: 18
      },
      { 
        id: 'torch', 
        name: 'Đèn Khò Gas Torch Thủ Công', 
        nameEn: 'Micro Butane Culinary Torch',
        description: 'Đốt cháy vỏ cam bưởi tinh dầu, sấy đường Crème Brûlée và xông khói thảo mộc.',
        tier: 'essential',
        tierLabel: 'Thiết Yếu',
        recipeCount: 24
      },
      { 
        id: 'induction-cooktop', 
        name: 'Bếp Từ Vi Điểm Kiểm Soát Nhiệt', 
        nameEn: 'Precision Induction Cooktop',
        description: 'Định chuẩn nhiệt từng độ C khi nấu siro đường mía, nấu sữa chưng cất và sốt Ganache.',
        tier: 'pro',
        tierLabel: 'Chuyên Nghiệp',
        recipeCount: 14
      },
      { 
        id: 'pizza-stone', 
        name: 'Đá Nướng Bánh Pizza Cordierite', 
        nameEn: 'Cordierite Pizza Stone',
        description: 'Truyền nhiệt đều và giữ nhiệt ổn định cho bánh pizza và bánh mì giòn.',
        tier: 'pro',
        tierLabel: 'Chuyên Nghiệp',
        recipeCount: 11
      },
    ]
  },

  // =============================================
  // BAR TOOLS - Khí Tài Pha Chế & Ly Tách Speakeasy
  // =============================================
  bar_tools: {
    label: 'Khí Tài Pha Chế & Ly Tách',
    labelEn: 'Bar Equipment & Glassware',
    description: 'Vũ khí tạo hình dòng chảy, làm lạnh tức thời và thăng hoa tầng hương rượu nền',
    icon: 'local_bar',
    scope: ['bar', 'essential'],
    items: [
      { 
        id: 'boston-shaker', 
        name: 'Boston Shaker Hai Mảnh', 
        nameEn: 'Tin-on-Tin 28oz/18oz',
        description: 'Khóa kín tuyệt đối, hạ nhiệt âm 6 độ chỉ trong 10 giây lắc mạnh.',
        tier: 'essential',
        tierLabel: 'Thiết Yếu',
        recipeCount: 42
      },
      { 
        id: 'mixing-glass', 
        name: 'Cối Pha Lê Mixing Glass Yarai', 
        nameEn: 'Yarai Seamless 650ml',
        description: 'Đáy dày đầm tay giúp duy trì nhiệt độ khuấy mượt mà cho Negroni & Manhattan.',
        tier: 'pro',
        tierLabel: 'Chuyên Nghiệp',
        recipeCount: 29
      },
      { 
        id: 'bar-spoon', 
        name: 'Bar Spoon Xoắn 35cm Nhật Bản', 
        nameEn: 'Japanese Teardrop Bar Spoon',
        description: 'Trục xoắn định hướng dòng chảy bọt khí và thao tác stir mượt như lụa.',
        tier: 'essential',
        tierLabel: 'Thiết Yếu',
        recipeCount: 38
      },
      { 
        id: 'jigger', 
        name: 'Jigger Nhật Bản 30/60ml', 
        nameEn: 'Slim Multi-Step Jigger',
        description: 'Khắc vạch 10, 15, 20, 30, 45, 60ml triệt tiêu sai lệch tỷ lệ công thức.',
        tier: 'essential',
        tierLabel: 'Thiết Yếu',
        recipeCount: 64
      },
      { 
        id: 'clear-ice-mold', 
        name: 'Khuôn Đá Tròn Clear Ice', 
        nameEn: 'Directional Freezing Mold',
        description: 'Đông lạnh định hướng triệt tiêu bọt khí, cho khối đá trong suốt không tan nhanh.',
        tier: 'pro',
        tierLabel: 'Chuyên Nghiệp',
        recipeCount: 17
      },
      { 
        id: 'hawthorne-strainer', 
        name: 'Lưới Lọc Hawthorne Có Lò Xo', 
        nameEn: 'Hawthorne Strainer',
        description: 'Có lò xo ôm sát miệng shaker, lọc đá hiệu quả khi rót cocktail.',
        tier: 'essential',
        tierLabel: 'Thiết Yếu',
        recipeCount: 35
      },
      { 
        id: 'julep-strainer', 
        name: 'Lưới Lọc Julep Cho Mixing Glass', 
        nameEn: 'Julep Strainer',
        description: 'Dùng cho mixing glass khi khuấy cocktail stirred.',
        tier: 'essential',
        tierLabel: 'Thiết Yếu',
        recipeCount: 28
      },
    ]
  },

  // =============================================
  // MIXING & GRINDING - Máy Trộn & Máy Xay Kỹ Thuật
  // =============================================
  mixing: {
    label: 'Máy Trộn & Máy Xay Kỹ Thuật',
    labelEn: 'Mixers & Grinders',
    description: 'Công nghệ động cơ nhào bột cấu trúc mạng gluten và nhũ hóa chất lỏng cao cấp',
    icon: 'blender',
    scope: ['pastry', 'bar', 'pro'],
    items: [
      { 
        id: 'stand-mixer', 
        name: 'Máy Trộn Bột Stand Mixer KitchenAid', 
        nameEn: 'KitchenAid Artisan 4.8L',
        description: 'Chuyển động quỹ đạo hành tinh đánh bông kem trứng merengue và tạo màng bột bánh ngọt chuẩn xác.',
        tier: 'pro',
        tierLabel: 'Chuyên Nghiệp',
        recipeCount: 31
      },
      { 
        id: 'vitamix', 
        name: 'Máy Xay Sinh Tố & Cốt Rượu Vitamix', 
        nameEn: 'Commercial Quiet One 2.2HP',
        description: 'Nghiền mịn hạt thảo mộc, tạo kết cấu nhũ hóa cho bơ kem hạt phỉ và cocktail đá xay mịn.',
        tier: 'pro',
        tierLabel: 'Chuyên Nghiệp',
        recipeCount: 27
      },
      { 
        id: 'separatory-funnel', 
        name: 'Phễu Chiết Phòng Thí Nghiệm Bar', 
        nameEn: 'Separatory Glass Funnel 1000ml',
        description: 'Tách lớp triệt để trong kỹ thuật Fat-washing cocktail (dầu dừa nướng, bơ lạt caramel và rượu Bourbon).',
        tier: 'pro',
        tierLabel: 'Chuyên Nghiệp',
        recipeCount: 9
      },
      { 
        id: 'pepper-mill', 
        name: 'Cối Xay Tiêu Burr Grinder', 
        nameEn: 'Burr Pepper Grinder',
        description: 'Xay hạt tiêu mịn đều cho garnish cocktail và nấu ăn.',
        tier: 'essential',
        tierLabel: 'Thiết Yếu',
        recipeCount: 15
      },
      { 
        id: 'food-processor', 
        name: 'Máy Xay Thực Phẩm Công Suất Lớn', 
        nameEn: 'Food Processor 1000W',
        description: 'Xay nhuyễn nguyên liệu, làm bột nhão và trộn bột cho bánh.',
        tier: 'pro',
        tierLabel: 'Chuyên Nghiệp',
        recipeCount: 22
      },
    ]
  },

  // =============================================
  // MEASURING - Cân Điện Tử & Đo Lường Vi Lượng
  // =============================================
  measuring: {
    label: 'Cân Điện Tử & Đo Lường Vi Lượng',
    labelEn: 'Scales & Precision Measuring',
    description: 'Sự chênh lệch giữa kiệt tác và thất bại nằm ở biên độ 0.1 gram và 1 độ Brix',
    icon: 'scale',
    scope: ['bar', 'pastry', 'essential'],
    items: [
      { 
        id: 'precision-scale', 
        name: 'Cân Tiểu Ly Điện Tử Vi Lượng', 
        nameEn: 'Precision Scale 0.01g - 2000g',
        description: 'Tốc độ phản hồi 20ms, đo lường acid citric, muối kosher và men nở vi sinh cực chuẩn.',
        tier: 'essential',
        tierLabel: 'Thiết Yếu',
        recipeCount: 88
      },
      { 
        id: 'refractometer', 
        name: 'Khúc Xạ Kế Điện Tử Brix & TDS', 
        nameEn: 'Digital Refractometer 0-85% Brix',
        description: 'Đo độ bão hòa đường trong Cordial, Shrub trái cây và tỷ lệ chiết xuất cà phê Cold Brew.',
        tier: 'pro',
        tierLabel: 'Chuyên Nghiệp',
        recipeCount: 21
      },
      { 
        id: 'infrared-thermometer', 
        name: 'Nhiệt Kế Hồng Ngoại Không Chạm', 
        nameEn: 'Infrared Laser Thermometer Gun',
        description: 'Đo ngay nhiệt độ đá nướng bánh Pizza và kiểm tra nhiệt độ khối bột lên men từ xa.',
        tier: 'pro',
        tierLabel: 'Chuyên Nghiệp',
        recipeCount: 16
      },
      { 
        id: 'instant-read-thermometer', 
        name: 'Nhiệt Kế Đọc Tức Thì Probe', 
        nameEn: 'Instant Read Probe Thermometer',
        description: 'Đo nhiệt độ lõi bánh thịt và kiểm tra nhiệt độ nước pha cà phê.',
        tier: 'essential',
        tierLabel: 'Thiết Yếu',
        recipeCount: 25
      },
      { 
        id: 'alcohol-meter', 
        name: 'Khúc Xạ Kế Rượu Cầm Tay', 
        nameEn: 'Handheld Alcohol Refractometer',
        description: 'Đo nồng độ cồn trong rượu homebrew và cocktail tự làm.',
        tier: 'pro',
        tierLabel: 'Chuyên Nghiệp',
        recipeCount: 8
      },
    ]
  },

  // =============================================
  // BAKING TOOLS - Dụng Cụ Tạo Hình & Nướng Bánh
  // =============================================
  baking: {
    label: 'Dụng Cụ Tạo Hình & Nướng Bánh',
    labelEn: 'Shaping & Baking Tools',
    description: 'Trau chuốt hình dáng, bảo vệ độ thoáng khí của ổ bánh và hoàn thiện vân nướng',
    icon: 'breakfast_dining',
    scope: ['pastry', 'essential'],
    items: [
      { 
        id: 'banneton', 
        name: 'Rổ Mây Ủ Bột Banneton 22cm', 
        nameEn: 'Round Rattan Proofing Basket',
        description: 'Hút ẩm nhẹ bề mặt tạo vòng xoắn gân bột nghệ thuật đặc trưng của Sourdough.',
        tier: 'essential',
        tierLabel: 'Thiết Yếu',
        recipeCount: 26
      },
      { 
        id: 'bread-lame', 
        name: 'Dao Rạch Bánh Mì Lame Bén', 
        nameEn: 'Curved Bread Lame Scoring Tool',
        description: 'Góc cắt vát 30 độ chuẩn xác giúp bánh nở bung "tai lúa mạch" (ear) sắc nét.',
        tier: 'pro',
        tierLabel: 'Chuyên Nghiệp',
        recipeCount: 34
      },
      { 
        id: 'silicone-spatula', 
        name: 'Phới Dẹt Silicon Chịu Nhiệt 260°C', 
        nameEn: 'Seamless High-Heat Spatula',
        description: 'Vét sạch bột không lưu cặn và không làm trầy âu pha lê, chịu nhiệt tới 260°C.',
        tier: 'essential',
        tierLabel: 'Thiết Yếu',
        recipeCount: 56
      },
      { 
        id: 'silpat-mat', 
        name: 'Tấm Nướng Chống Dính Silpat Pháp', 
        nameEn: 'Original Fiberglass Baking Mat',
        description: 'Truyền nhiệt đồng nhất tuyệt đối cho bánh Macaron và kẹo caramen bơ muối giòn tan.',
        tier: 'essential',
        tierLabel: 'Thiết Yếu',
        recipeCount: 39
      },
      { 
        id: 'rolling-pin', 
        name: 'Gậy Cao Su Lăn Bột Phủ Flour', 
        nameEn: 'French Rolling Pin',
        description: 'Lăn bột đều không tạo áp lực không đều, phủ flour chống dính.',
        tier: 'essential',
        tierLabel: 'Thiết Yếu',
        recipeCount: 30
      },
      { 
        id: 'pastry-brush', 
        name: 'Cọ Quét Phết Trứng & Bơ', 
        nameEn: 'Pastry Brush Set',
        description: 'Quét trứng lên vỏ bánh để có lớp vỏ bóng vàng đẹp mắt.',
        tier: 'essential',
        tierLabel: 'Thiết Yếu',
        recipeCount: 18
      },
      { 
        id: 'piping-bag', 
        name: 'Túi Bắt Kem Có Tips', 
        nameEn: 'Piping Bag with Tips',
        description: 'Trang trí bánh kem với các đầu bắt đa dạng từ kem đến frosting.',
        tier: 'essential',
        tierLabel: 'Thiết Yếu',
        recipeCount: 24
      },
    ]
  },

  // =============================================
  // GLASSWARE - Ly & Cốc
  // =============================================
  glassware: {
    label: 'Ly & Cốc Pha Chế',
    labelEn: 'Bar Glassware',
    description: 'Ly chuyên dụng cho từng loại cocktail, tối ưu hóa trải nghiệm thưởng thức',
    icon: 'wine_bar',
    scope: ['bar', 'essential'],
    items: [
      { 
        id: 'rocks-glass', 
        name: 'Ly Rocks / Old Fashioned', 
        nameEn: 'Rocks Glass 8-10oz',
        description: 'Ly ngắn cho cocktail trên đá viên lớn như Old Fashioned, Negroni.',
        tier: 'essential',
        tierLabel: 'Thiết Yếu',
        recipeCount: 48
      },
      { 
        id: 'highball-glass', 
        name: 'Ly Highball Cao', 
        nameEn: 'Highball Glass 10-12oz',
        description: 'Ly cao cho đồ uống có soda, tonic, gin tonic và các loại highball.',
        tier: 'essential',
        tierLabel: 'Thiết Yếu',
        recipeCount: 35
      },
      { 
        id: 'martini-glass', 
        name: 'Ly Martini Coupe', 
        nameEn: 'Martini Coupe Glass',
        description: 'Ly coupe cho cocktail martini, daiquiri và các loại stirred cocktail.',
        tier: 'essential',
        tierLabel: 'Thiết Yếu',
        recipeCount: 40
      },
      { 
        id: 'collins-glass', 
        name: 'Ly Collins Thủy Tinh', 
        nameEn: 'Collins Glass 14-16oz',
        description: 'Ly cao mỏng cho Collins, Tom Collins và các loại fizz.',
        tier: 'essential',
        tierLabel: 'Thiết Yếu',
        recipeCount: 28
      },
      { 
        id: 'copper-mug', 
        name: 'Cốc Đồng Moscow Mule', 
        nameEn: 'Copper Mug 16oz',
        description: 'Cốc đồng truyền thống cho Moscow Mule, giữ lạnh đồ uống.',
        tier: 'essential',
        tierLabel: 'Thiết Yếu',
        recipeCount: 12
      },
      { 
        id: 'shot-glass', 
        name: 'Ly Shot Nhỏ', 
        nameEn: 'Shot Glass 1-1.5oz',
        description: 'Ly nhỏ cho shot rượu mạnh và shooter.',
        tier: 'essential',
        tierLabel: 'Thiết Yếu',
        recipeCount: 15
      },
    ]
  },

  // =============================================
  // CUTTING & PEELING - Dụng Cụ Cắt & Gọt
  // =============================================
  cutting: {
    label: 'Dụng Cụ Cắt & Gọt Vỏ',
    labelEn: 'Cutting & Peeling Tools',
    description: 'Dao sắc và dụng cụ tỉa citrus cho garnish và preparation',
    icon: 'content_cut',
    scope: ['bar', 'essential'],
    items: [
      { 
        id: 'bar-knife', 
        name: 'Dao Bar Sắc Chuyên Dụng', 
        nameEn: 'Professional Bar Knife',
        description: 'Dao sắc cho cắt citrus, herbs và các nguyên liệu bar.',
        tier: 'essential',
        tierLabel: 'Thiết Yếu',
        recipeCount: 45
      },
      { 
        id: 'citrus-peeler', 
        name: 'Dao Gọt Vỏ Cam Chanh Peeler', 
        nameEn: 'Citrus Peeler/Zester',
        description: 'Tạo vỏ citrus mỏng cho garnish và zest cocktail.',
        tier: 'essential',
        tierLabel: 'Thiết Yếu',
        recipeCount: 38
      },
      { 
        id: 'channel-knife', 
        name: 'Dao Tỉa Vỏ Citrus Twist', 
        nameEn: 'Channel Knife',
        description: 'Tạo twist vỏ cam chanh dài cho trang trí cocktail.',
        tier: 'pro',
        tierLabel: 'Chuyên Nghiệp',
        recipeCount: 25
      },
      { 
        id: 'muddler', 
        name: 'Muddler Gỗ Nghiền Thảo Mộc', 
        nameEn: 'Wooden Muddler',
        description: 'Nghiền lá bạc hà, gừng và trái cây để giải phóng tinh dầu.',
        tier: 'essential',
        tierLabel: 'Thiết Yếu',
        recipeCount: 30
      },
    ]
  },

  // =============================================
  // STORAGE & OTHER - Lưu Trữ & Khác
  // =============================================
  storage: {
    label: 'Dụng Cụ Lưu Trữ & Phụ Kiện',
    labelEn: 'Storage & Accessories',
    description: 'Tủ kho, dụng cụ bảo quản và phụ kiện bar không thể thiếu',
    icon: 'inventory_2',
    scope: ['bar', 'pastry', 'essential'],
    items: [
      { 
        id: 'speed-pourer', 
        name: 'Vòi Rót Nhanh Speed Pourer', 
        nameEn: 'Speed Pourer Set',
        description: 'Lắp vào chai pour nhanh với lượng chuẩn xác 1/2 oz.',
        tier: 'essential',
        tierLabel: 'Thiết Yếu',
        recipeCount: 50
      },
      { 
        id: 'ice-tongs', 
        name: 'Kẹp Đá Vệ Sinh', 
        nameEn: 'Ice Tongs',
        description: 'Kẹp đá viên vệ sinh không chạm tay trực tiếp.',
        tier: 'essential',
        tierLabel: 'Thiết Yếu',
        recipeCount: 40
      },
      { 
        id: 'ice-crusher', 
        name: 'Máy Xay Đá Viên', 
        nameEn: 'Ice Crusher',
        description: 'Xay đá viên thành đá bào cho cocktail đá xay.',
        tier: 'pro',
        tierLabel: 'Chuyên Nghiệp',
        recipeCount: 18
      },
      { 
        id: 'bottle-preserver', 
        name: 'Bình Bảo Quản Rượu Húy Diệt Kỵ Khí', 
        nameEn: 'Wine Preserver / Private Preserve',
        description: 'Giữ rượu vang và rượu mở tươi trong nhiều ngày.',
        tier: 'pro',
        tierLabel: 'Chuyên Nghiệp',
        recipeCount: 12
      },
      { 
        id: 'bar-towel', 
        name: 'Khăn Bar Chuyên Dụng', 
        nameEn: 'Bar Towels',
        description: 'Khăn cotton hút nước chuyên dụng lau quầy bar và dụng cụ.',
        tier: 'essential',
        tierLabel: 'Thiết Yếu',
        recipeCount: 60
      },
      { 
        id: 'cocktail-picks', 
        name: 'Tăm Xiên Cocktail Trang Trí', 
        nameEn: 'Cocktail Picks & Skewers',
        description: 'Xiên cherry, olive và garnish cho cocktail.',
        tier: 'essential',
        tierLabel: 'Thiết Yếu',
        recipeCount: 35
      },
    ]
  }
};

// =============================================
// EQUIPMENT RECOMMENDATIONS
// =============================================
export const EQUIPMENT_RECOMMENDATIONS = [
  {
    id: 'rec-1',
    title: 'Bổ Sung Dao Rạch Lame Bén & Đá Nướng Cordierite',
    description: 'Bạn đang lưu 6 công thức bánh men chua cao độ ẩm (high hydration). Dao thông thường sẽ làm rách thớ gluten; bộ dao rạch Lame chuyên dụng sẽ kích hoạt độ nở bung tai (ear) kiêu hãnh chuẩn thợ bánh châu Âu.',
    target: 'Sourdough Bánh Mì Men Tự Nhiên',
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800',
    itemsCount: 2
  },
  {
    id: 'rec-2',
    title: 'Bộ Phễu Lọc Vi Hạt & V60 Thủy Tinh Hario',
    description: 'Bạn vừa thử nghiệm làm Clarified Milk Punch và Bourbon bơ đậu phộng. Giấy lọc vi hạt chuyên dụng sẽ loại bỏ 99.8% phân tử protein vẩn đục, cho chất rượu vàng óng lấp lánh như hổ phách.',
    target: 'Fat-Washing & Clarified Punch',
    imageUrl: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800',
    improvementPercent: 15
  }
];

// =============================================
// MAIN HOOK
// =============================================
export function useEquipment() {
  const [myEquipment, setMyEquipment] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load từ localStorage
  useEffect(() => {
    const savedEquipment = localStorage.getItem('atelier_equipment_owned');
    if (savedEquipment) {
      try {
        setMyEquipment(JSON.parse(savedEquipment));
      } catch (e) {
        console.error('Error loading equipment:', e);
      }
    }
    setIsLoading(false);
  }, []);

  // Lưu khi thay đổi
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('atelier_equipment_owned', JSON.stringify(myEquipment));
      localStorage.setItem('atelier_equipment_timestamp', Date.now().toString());
    }
  }, [myEquipment, isLoading]);

  // Thêm dụng cụ
  const addEquipment = useCallback((equipmentId) => {
    setMyEquipment(prev => {
      if (!prev.includes(equipmentId)) {
        return [...prev, equipmentId];
      }
      return prev;
    });
  }, []);

  // Xóa dụng cụ
  const removeEquipment = useCallback((equipmentId) => {
    setMyEquipment(prev => prev.filter(id => id !== equipmentId));
  }, []);

  // Toggle dụng cụ
  const toggleEquipment = useCallback((equipmentId) => {
    setMyEquipment(prev => {
      if (prev.includes(equipmentId)) {
        return prev.filter(id => id !== equipmentId);
      }
      return [...prev, equipmentId];
    });
  }, []);

  // Check có dụng cụ không
  const hasEquipment = useCallback((equipmentId) => {
    return myEquipment.includes(equipmentId);
  }, [myEquipment]);

  // Xóa tất cả
  const clearAll = useCallback(() => {
    setMyEquipment([]);
  }, []);

  // Get all equipment items flattened
  const allEquipmentItems = useMemo(() => {
    return Object.values(EQUIPMENT_CATEGORIES).flatMap(cat => cat.items);
  }, []);

  // Get total count by scope (bar vs pastry)
  const statsByScope = useMemo(() => {
    const barItems = Object.values(EQUIPMENT_CATEGORIES)
      .filter(cat => cat.scope?.includes('bar'))
      .flatMap(cat => cat.items);
    
    const pastryItems = Object.values(EQUIPMENT_CATEGORIES)
      .filter(cat => cat.scope?.includes('pastry'))
      .flatMap(cat => cat.items);

    const ownedBar = barItems.filter(item => myEquipment.includes(item.id)).length;
    const ownedPastry = pastryItems.filter(item => myEquipment.includes(item.id)).length;

    return {
      bar: {
        total: barItems.length,
        owned: ownedBar,
        percent: Math.round((ownedBar / barItems.length) * 100) || 0
      },
      pastry: {
        total: pastryItems.length,
        owned: ownedPastry,
        percent: Math.round((ownedPastry / pastryItems.length) * 100) || 0
      }
    };
  }, [myEquipment]);

  // Check dụng cụ còn thiếu cho công thức
  const getMissingForRecipe = useCallback((recipeEquipmentNeeds) => {
    if (!recipeEquipmentNeeds) return [];
    return recipeEquipmentNeeds.filter(id => !myEquipment.includes(id));
  }, [myEquipment]);

  // Get equipment by category
  const getEquipmentByCategory = useCallback((categoryKey) => {
    const category = EQUIPMENT_CATEGORIES[categoryKey];
    if (!category) return [];
    return category.items;
  }, []);

  return {
    myEquipment,
    isLoading,
    addEquipment,
    removeEquipment,
    toggleEquipment,
    hasEquipment,
    clearAll,
    allEquipmentItems,
    getMissingForRecipe,
    getEquipmentByCategory,
    statsByScope,
    EQUIPMENT_CATEGORIES,
    EQUIPMENT_RECOMMENDATIONS
  };
}
