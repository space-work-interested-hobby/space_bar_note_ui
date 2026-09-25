/**
 * DiscoveryPage.jsx - Khám Phá & Tìm Kiếm Công Thức
 * 
 * Features:
 * - Search bar với trending keywords
 * - Category tabs filter (Tất cả, Cocktail, Coffee, Bakery, etc.)
 * - Filter panel với checkbox options
 * - Recipe cards với trending leaderboard
 * - Creator profiles section
 * - Article/blog section
 */
import { useState, useMemo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../i18n';
import { useNotes } from '../hooks/useNotes';
import Pagination from '../components/Pagination';

// Material Symbol component
const MS = ({ name, className = '', filled = false }) => (
  <span className={`material-symbols-outlined ${filled ? 'material-symbols-filled' : ''} ${className}`}>
    {name}
  </span>
);

// Mock data for recipes
const MOCK_RECIPES = [
  {
    id: 1,
    name: 'Old Fashioned Xông Khói Gỗ Sồi',
    category: 'Cocktail Cổ Điển',
    categoryKey: 'cocktail',
    description: 'Rye Whiskey ủ 6 năm phối cùng bitters vỏ cam đắng thủ công, xông khí sồi Pháp trực tiếp bằng chụp thủy tinh cloche kín.',
    image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80',
    time: '4 phút',
    rating: 5.0,
    reviewCount: 420,
    remixCount: 1800,
    isTrending: true,
    rank: 1,
    author: 'Arthur Vance',
  },
  {
    id: 2,
    name: 'Sourdough Lúa Mạch Đen & Rượu Mật Mía',
    category: 'Bánh Mì Men Sống',
    categoryKey: 'bakery',
    description: 'Độ ẩm 78%, lên men lạnh 36 giờ cùng nho khô ngâm Dark Rum Guatemala. Vỏ bánh caramen giòn rụm, ruột ẩm mềm dai.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&q=80',
    time: '36h ủ',
    rating: 4.9,
    reviewCount: 312,
    remixCount: 980,
    isTrending: true,
    rank: 2,
    author: 'Elena Baker',
  },
  {
    id: 3,
    name: 'Slow Drip Geisha Panama & Tonic Hoa Cam',
    category: 'Specialty Coffee',
    categoryKey: 'coffee',
    description: 'Chiết xuất lạnh giọt chậm 12 giờ hạt Geisha sơ chế yếm khí, bừng hương hoa nhài và tép cam bergamot khi hòa cùng artisanal tonic.',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&q=80',
    time: '12h chiết',
    rating: 4.8,
    reviewCount: 289,
    remixCount: 740,
    isTrending: true,
    rank: 3,
    author: 'Kenji Brew',
  },
  {
    id: 4,
    name: 'Boulevardier Thảo Mộc',
    category: 'Cocktail Hiện Đại',
    categoryKey: 'cocktail',
    description: 'Kế thừa Negroni với gốc Bourbon Kentucky, thêm absinthe rinse tạo chiều sâu đắng thanh đặc trưng.',
    image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=800&q=80',
    time: '5 phút',
    rating: 4.7,
    reviewCount: 156,
    remixCount: 520,
    isTrending: false,
    author: 'Arthur Vance',
  },
  {
    id: 5,
    name: 'Matcha Uji & Panna Cotta',
    category: 'Tráng Miệng',
    categoryKey: 'dessert',
    description: 'Matcha Uji ceremonial grade phủ lớp panna cotta vanilla Madagascar, topping caramel rang muối.',
    image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&q=80',
    time: '2h làm',
    rating: 4.9,
    reviewCount: 198,
    remixCount: 420,
    isTrending: false,
    author: 'Elena Baker',
  },
  {
    id: 6,
    name: 'Cold Brew Geisha Natural',
    category: 'Specialty Coffee',
    categoryKey: 'coffee',
    description: 'Cold brew 24 giờ với hạt Geisha natural process Ethiopia, notes blueberry và jasmine.',
    image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&q=80',
    time: '24h ủ',
    rating: 4.8,
    reviewCount: 245,
    remixCount: 680,
    isTrending: false,
    author: 'Kenji Brew',
  },
  {
    id: 7,
    name: 'Espresso Martini Velvet',
    category: 'Cocktail Cà Phê',
    categoryKey: 'cocktail',
    description: 'Double shot espresso với vodka xa tanh, liqueur cà phê và vanilla syrup. Foam mịn màng.',
    image: 'https://images.unsplash.com/photo-1545438102-799c3991ffef?w=800&q=80',
    time: '3 phút',
    rating: 4.6,
    reviewCount: 312,
    remixCount: 890,
    isTrending: false,
    author: 'Arthur Vance',
  },
  {
    id: 8,
    name: 'Croissant Bơ Normandy 64 Lớp',
    category: 'Bánh Thủ Công',
    categoryKey: 'bakery',
    description: 'Kỹ thuật lách bơ French style với bơ Isigny AOP, 64 lớp giòn tan, ruột tổ ong hoàn hảo.',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&q=80',
    time: '3 ngày',
    rating: 4.9,
    reviewCount: 178,
    remixCount: 340,
    isTrending: false,
    author: 'Elena Baker',
  },
];

// Mock creators data
const MOCK_CREATORS = [
  {
    id: 1,
    name: 'Arthur Vance',
    role: 'Master Bartender',
    handle: '@arthur.vance',
    bio: 'Chuyên gia chế tác thức uống thảo mộc lên men hoang dã và phương pháp fat-washing.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    recipeCount: 48,
    trialCount: 24500,
    verified: true,
  },
  {
    id: 2,
    name: 'Elena Baker',
    role: 'Artisan Baker',
    handle: '@elena.baker',
    bio: 'Lưu giữ 12 chủng men hoang dã từ lúa mạch hữu cơ, tái định hình kỹ thuật cán nghìn lớp.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
    recipeCount: 35,
    trialCount: 18200,
    verified: true,
  },
  {
    id: 3,
    name: 'Kenji Brew',
    role: 'Head Roaster',
    handle: '@kenji.brew',
    bio: 'Nghiên cứu áp suất nước, chỉ số TDS và biểu đồ trích xuất pour-over tối ưu.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    recipeCount: 52,
    trialCount: 31000,
    verified: true,
  },
];

// Trending keywords
const TRENDING_KEYWORDS = [
  'Mojito Chanh Bạc Hà',
  'Bánh Mì Sourdough & Pastry',
  'Cold Brew Geisha',
  'Old Fashioned Khói Sồi',
  'Matcha Uji & Panna Cotta',
  'Cocktail Cà Phê',
];

// Filter categories
const CATEGORIES = [
  { key: 'all', label: 'Tất Cả Danh Mục', emoji: null },
  { key: 'cocktail', label: 'Đồ Uống & Cocktail', emoji: '🍸' },
  { key: 'coffee', label: 'Trà & Cà Phê Đặc Sản', emoji: '☕' },
  { key: 'bakery', label: 'Bánh & Tráng Miệng Thủ Công', emoji: '🥐' },
  { key: 'dessert', label: 'Món Khai Vị & Housemade Syrup', emoji: '🍯' },
];

// ============================================================
// RECIPE CARD COMPONENT
// ============================================================
function RecipeCard({ recipe, showRank = false }) {
  const navigate = useNavigate();
  
  return (
    <article 
      className="group relative bg-surface-slate rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
      onClick={() => navigate(`/note/${recipe.id}`)}
    >
      {/* Image */}
      <div className="relative h-64 w-full overflow-hidden">
        <img 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          src={recipe.image} 
          alt={recipe.name}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-slate via-surface-slate/30 to-transparent" />
        
        {/* Rank Badge */}
        {showRank && recipe.rank && (
          <div className={`absolute top-4 left-4 font-bar-mode-metric text-headline-md px-3.5 py-1 rounded-lg shadow-xl flex items-center gap-1 ${
            recipe.rank === 1 ? 'bg-primary text-on-primary' : 'bg-surface-smoke text-cream-text'
          }`}>
            <span className="font-label-sm font-bold uppercase">#</span>{String(recipe.rank).padStart(2, '0')}
          </div>
        )}
        
        {/* Category Badge */}
        {!showRank && (
          <span className="absolute top-4 left-4 px-2.5 py-1 bg-surface-smoke/90 backdrop-blur-md text-copper-accent font-label-sm uppercase rounded-full">
            {recipe.category}
          </span>
        )}
        
        {/* Heart Button */}
        <button 
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-surface-obsidian/70 backdrop-blur-md text-cream-text hover:text-error flex items-center justify-center transition-colors shadow-md"
          onClick={(e) => { e.stopPropagation(); }}
        >
          <MS name="favorite" className="text-lg" />
        </button>
        
        {/* Bottom Info */}
        <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
          {showRank && (
            <span className="px-2.5 py-1 bg-surface-smoke/90 backdrop-blur-md text-copper-accent font-label-sm uppercase rounded-full">
              {recipe.category}
            </span>
          )}
          <div className={`flex items-center gap-1 bg-surface-obsidian/80 px-2 py-0.5 rounded-lg text-amber-vibrant font-label-md ${showRank ? '' : 'ml-auto'}`}>
            <MS name="star" className="text-sm" style={{ fontVariationSettings: "'FILL' 1" }} />
            <span>{recipe.rating}</span>
            <span className="text-cream-muted text-xs font-normal">({recipe.reviewCount})</span>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-space-lg flex flex-col justify-between">
        <div>
          <h3 className="font-headline-md text-headline-md text-cream-text group-hover:text-primary transition-colors">
            {recipe.name}
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 line-clamp-2">
            {recipe.description}
          </p>
        </div>
        
        <div className="mt-space-md pt-space-sm flex items-center justify-between">
          <div className="flex items-center gap-4 text-cream-muted font-body-sm">
            <span className="flex items-center gap-1">
              <MS name="schedule" className="text-base text-primary" />
              {recipe.time}
            </span>
            {recipe.remixCount > 0 && (
              <span className="flex items-center gap-1">
                <MS name="sync" className="text-base text-primary" />
                {recipe.remixCount >= 1000 ? `${(recipe.remixCount/1000).toFixed(1)}k` : recipe.remixCount} bản remix
              </span>
            )}
          </div>
          <button className="bg-primary-container text-on-primary-container px-3.5 py-1.5 rounded-lg font-label-md hover:bg-tertiary-container hover:text-on-tertiary-container transition-all flex items-center gap-1">
            <span>{showRank ? 'Pha Ngay' : 'Xem'}</span>
            <MS name="tune" className="text-sm" />
          </button>
        </div>
      </div>
    </article>
  );
}

// ============================================================
// CREATOR CARD COMPONENT
// ============================================================
function CreatorCard({ creator }) {
  return (
    <div className="bg-surface-slate rounded-xl p-space-lg shadow-lg relative flex flex-col justify-between">
      <div className="flex items-start justify-between mb-space-md">
        <div className="relative">
          <img 
            className="w-16 h-16 rounded-full object-cover shadow-md" 
            src={creator.avatar} 
            alt={creator.name}
          />
          {creator.verified && (
            <span className="absolute -bottom-1 -right-1 bg-primary text-on-primary rounded-full p-0.5" title="Xác minh Atelier">
              <MS name="verified" className="text-xs block" />
            </span>
          )}
        </div>
        <button className="follow-btn px-4 py-1.5 rounded-lg bg-surface-smoke hover:bg-primary hover:text-on-primary text-cream-text font-label-sm transition-all flex items-center gap-1">
          <MS name="add" className="text-xs" />
          <span>Theo Dõi</span>
        </button>
      </div>
      
      <div>
        <div className="flex items-center gap-2">
          <h4 className="font-headline-md text-headline-md text-cream-text">{creator.name}</h4>
          <span className={`px-2 py-0.5 rounded font-label-sm ${
            creator.role === 'Master Bartender' ? 'bg-primary/10 text-primary' : 'bg-copper-accent/20 text-copper-accent'
          }`}>
            {creator.role}
          </span>
        </div>
        <p className="font-label-sm text-label-sm text-copper-accent mt-0.5">{creator.handle}</p>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-3">
          {creator.bio}
        </p>
      </div>
      
      <div className="mt-space-md pt-space-sm bg-surface-obsidian/50 rounded-lg p-3 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-label-sm text-label-sm text-cream-muted uppercase">Sổ Lưu Trữ</span>
          <span className="font-label-md text-label-md text-cream-text font-bold">{creator.recipeCount} Công thức</span>
        </div>
        <div className="flex flex-col text-right">
          <span className="font-label-sm text-label-sm text-cream-muted uppercase">Lượt Thử Nghiệm</span>
          <span className="font-label-md text-label-md text-primary font-bold">{(creator.trialCount/1000).toFixed(1)}k lượt</span>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SEARCH BAR COMPONENT
// ============================================================
function SearchBar({ value, onChange, onSearch, trendingKeywords }) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  return (
    <div className="relative">
      <div className="relative flex items-center">
        <MS name="manage_search" className="absolute left-4 text-primary text-2xl pointer-events-none" />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          onKeyDown={(e) => e.key === 'Enter' && onSearch()}
          placeholder="Tìm theo rượu nền (Bourbon, Mezcal), hạt cà phê, men bánh Sourdough, hương vị..."
          className="w-full bg-surface-obsidian text-cream-text font-body-lg pl-14 pr-32 py-4 rounded-lg placeholder:text-cream-muted focus:outline-none focus:shadow-[0_0_0_2px_rgba(229,158,56,0.5)] transition-all"
        />
        <button 
          onClick={onSearch}
          className="absolute right-2.5 bg-primary-container text-on-primary-container px-5 py-2.5 rounded-lg font-label-md text-label-md hover:bg-tertiary-container hover:text-on-tertiary-container transition-all flex items-center gap-1.5 shadow-md"
        >
          <span>Tra Cứu</span>
          <MS name="arrow_forward" className="text-sm" />
        </button>
      </div>
      
      {/* Trending Keywords */}
      <div className="flex flex-wrap items-center gap-2 pt-3">
        <span className="font-label-sm text-label-sm uppercase tracking-wider text-cream-muted flex items-center gap-1 mr-1">
          <MS name="trending_up" className="text-sm text-copper-accent" />
          Xu Hướng:
        </span>
        {trendingKeywords.map((keyword, index) => (
          <button
            key={index}
            onClick={() => { onChange(keyword); onSearch(); }}
            className="px-3 py-1.5 bg-surface-smoke hover:bg-primary/20 text-cream-text hover:text-primary rounded-full font-label-sm text-label-sm transition-all flex items-center gap-1.5"
          >
            <span>{keyword}</span>
            <MS name="north_east" className="text-xs text-cream-muted" />
          </button>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// CATEGORY TABS COMPONENT
// ============================================================
function CategoryTabs({ categories, activeCategory, onCategoryChange }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pt-space-md mt-space-md border-t border-surface-smoke scrollbar-none">
      {categories.map((cat) => (
        <button
          key={cat.key}
          onClick={() => onCategoryChange(cat.key)}
          className={`px-4 py-2 font-label-md text-label-md rounded-lg whitespace-nowrap transition-all ${
            activeCategory === cat.key
              ? 'bg-primary text-on-primary shadow-sm'
              : 'bg-surface-obsidian text-on-surface-variant hover:text-cream-text'
          }`}
        >
          {cat.emoji && <span className="mr-1.5">{cat.emoji}</span>}
          {cat.label}
        </button>
      ))}
    </div>
  );
}

// ============================================================
// FILTER PANEL COMPONENT
// ============================================================
function FilterPanel({ isOpen, onToggle, selectedFilters, onFilterChange, resultCount }) {
  const FILTER_GROUPS = [
    {
      key: 'difficulty',
      label: 'Độ khó',
      icon: 'speed',
      options: [
        { id: 'easy', label: 'Dễ', count: 45 },
        { id: 'medium', label: 'Trung bình', count: 38 },
        { id: 'hard', label: 'Khó', count: 22 },
        { id: 'expert', label: 'Chuyên gia', count: 12 },
      ],
    },
    {
      key: 'time',
      label: 'Thời gian',
      icon: 'schedule',
      options: [
        { id: 'under5', label: 'Dưới 5 phút', count: 32 },
        { id: 'under30', label: 'Dưới 30 phút', count: 48 },
        { id: 'under2h', label: 'Dưới 2 giờ', count: 28 },
        { id: 'overnight', label: 'Qua đêm', count: 18 },
      ],
    },
    {
      key: 'flavor',
      label: 'Hương vị',
      icon: 'bubble_chart',
      options: [
        { id: 'sweet', label: 'Ngọt', count: 56 },
        { id: 'sour', label: 'Chua', count: 42 },
        { id: 'bitter', label: 'Đắng', count: 35 },
        { id: 'smoky', label: 'Khói', count: 22 },
        { id: 'fruity', label: 'Hoa quả', count: 48 },
      ],
    },
  ];

  const handleCheckboxChange = (groupKey, itemId) => {
    const currentSelection = selectedFilters[groupKey] || [];
    const newSelection = currentSelection.includes(itemId)
      ? currentSelection.filter((id) => id !== itemId)
      : [...currentSelection, itemId];
    onFilterChange({ ...selectedFilters, [groupKey]: newSelection });
  };

  const clearAllFilters = () => onFilterChange({});
  const activeFilterCount = Object.values(selectedFilters).flat().length;

  return (
    <div className="bg-surface-slate rounded-xl overflow-hidden shadow-xl">
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="w-full p-4 flex items-center justify-between hover:bg-surface-smoke/30 transition-colors"
      >
        <div className="flex items-center gap-2">
          <MS name="tune" className="text-primary" />
          <span className="text-[14px] text-cream-text font-medium">Bộ lọc nâng cao</span>
          {activeFilterCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-primary-container text-on-primary-container text-[11px] font-semibold">
              {activeFilterCount}
            </span>
          )}
        </div>
        <MS name={isOpen ? 'expand_less' : 'expand_more'} className="text-cream-muted" />
      </button>

      {/* Expanded Filters */}
      {isOpen && (
        <>
          <div className="p-4 pt-0 grid grid-cols-1 md:grid-cols-3 gap-6">
            {FILTER_GROUPS.map((group) => (
              <div key={group.key} className="flex flex-col gap-2">
                <h4 className="text-[13px] text-primary font-semibold uppercase tracking-wider flex items-center gap-1">
                  <MS name={group.icon} className="text-sm" />
                  {group.label}
                </h4>
                <div className="flex flex-col gap-1.5 max-h-40 overflow-y-auto custom-scrollbar">
                  {group.options.map((option) => (
                    <label
                      key={option.id}
                      className="flex items-center gap-2 p-2 rounded hover:bg-surface-obsidian cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={(selectedFilters[group.key] || []).includes(option.id)}
                        onChange={() => handleCheckboxChange(group.key, option.id)}
                        className="w-4 h-4 rounded border-cream-muted text-primary-container focus:ring-primary-container focus:ring-offset-0 bg-surface-obsidian"
                      />
                      <span className="text-[13px] text-cream-text flex-1">{option.label}</span>
                      <span className="text-[11px] text-cream-muted">({option.count})</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 pt-2 border-t border-surface-smoke flex items-center justify-between">
            <span className="text-[13px] text-cream-muted">
              Tìm thấy <span className="text-primary font-semibold">{resultCount}</span> công thức
            </span>
            {activeFilterCount > 0 && (
              <button
                onClick={clearAllFilters}
                className="text-[13px] text-copper-accent hover:text-secondary flex items-center gap-1 transition-colors"
              >
                <MS name="clear_all" className="text-sm" />
                Xóa tất cả
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

// ============================================================
// MAIN PAGE COMPONENT
// ============================================================
export default function DiscoveryPage() {
  const { t } = useI18n();
  const navigate = useNavigate();
  
  // Fetch recipes from database
  const { notes, loading: notesLoading } = useNotes();
  
  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [following, setFollowing] = useState({});
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  
  // Transform notes from DB to recipe format
  const recipesFromDb = useMemo(() => {
    return notes.map(note => ({
      id: note.id,
      name: note.title,
      category: note.category,
      categoryKey: note.category || 'other',
      description: note.description || '',
      image: note.image_url || 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800&q=80',
      time: note.prep_time || '5 phút',
      rating: note.avg_rating || 0,
      reviewCount: note.review_count || 0,
      remixCount: note.remix_count || 0,
      isTrending: false,
      rank: 0,
      author: note.author_name || 'Bartender',
    }));
  }, [notes]);
  
  // Use DB recipes if available, otherwise fallback to mock data
  const recipes = recipesFromDb.length > 0 ? recipesFromDb : MOCK_RECIPES;
  
  // Filter recipes based on search, category, and filters
  const filteredRecipes = useMemo(() => {
    let recipesToFilter = [...recipes];
    
    // Filter by category
    if (activeCategory !== 'all') {
      recipesToFilter = recipesToFilter.filter(r => r.categoryKey === activeCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      recipesToFilter = recipesToFilter.filter(r => 
        r.name.toLowerCase().includes(query) ||
        r.description.toLowerCase().includes(query) ||
        r.category.toLowerCase().includes(query) ||
        r.author.toLowerCase().includes(query)
      );
    }
    
    // Filter by selected filters (simplified logic)
    // In real app, this would filter by difficulty, time, flavor
    
    return recipesToFilter;
  }, [recipes, activeCategory, searchQuery, selectedFilters]);
  
  // Pagination for filtered recipes
  const paginatedRecipes = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredRecipes.slice(startIndex, endIndex);
  }, [filteredRecipes, currentPage, itemsPerPage]);
  
  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery, selectedFilters]);
  
  // Trending recipes (top 3 from all recipes)
  const trendingRecipes = useMemo(() => {
    return [...recipes]
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 3)
      .map((r, idx) => ({ ...r, isTrending: true, rank: idx + 1 }));
  }, [recipes]);
  
  // Handle search
  const handleSearch = useCallback(() => {
    // In real app, this would trigger API search or navigate to search results
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery);
    }
  }, [searchQuery]);
  
  // Handle follow toggle
  const toggleFollow = useCallback((creatorId) => {
    setFollowing(prev => ({ ...prev, [creatorId]: !prev[creatorId] }));
  }, []);
  
  return (
    <div className="w-full bg-surface-obsidian min-h-screen">
      {/* Subtle Ambient Glow Orbs */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute -top-32 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-96 right-10 w-80 h-80 bg-copper-accent/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-gutter py-space-xl">
          {/* Editorial Header Block */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
            <div className="flex flex-col gap-space-xs max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary">
                  Sổ Tay Lưu Giữ Công Thức & Nghệ Thuật Chế Tác
                </span>
              </div>
              <h1 className="font-headline-display text-headline-display text-cream-text tracking-tight">
                Khám Phá Vũ Trụ <span className="italic text-primary">Pha Chế & Làm Bánh</span>
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
                Tuyển tập tỷ lệ chuẩn xác từ speakeasy underground danh tiếng, trạm cà phê specialty wave 3 và xưởng bánh men sống thủ công cổ điển.
              </p>
            </div>
            
            {/* Quick Live Stats Pill */}
            <div className="flex items-center gap-space-md p-3 bg-surface-slate rounded-lg shadow-md shrink-0">
              <div className="flex flex-col text-right">
                <span className="font-label-sm text-label-sm uppercase text-cream-muted">Kho Dữ Liệu Bar</span>
                <span className="font-label-md text-label-md text-cream-text">1,420+ Tỷ Lệ Đã Kiểm Duyệt</span>
              </div>
              <div className="w-10 h-10 rounded-lg bg-surface-smoke flex items-center justify-center text-primary">
                <MS name="auto_stories" className="text-xl" />
              </div>
            </div>
          </div>
          
          {/* Search & Smart Filter Module */}
          <div className="bg-surface-slate rounded-xl p-space-md md:p-space-lg shadow-xl mb-space-2xl relative">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              onSearch={handleSearch}
              trendingKeywords={TRENDING_KEYWORDS}
            />
            
            {/* Category Tabs */}
            <CategoryTabs
              categories={CATEGORIES}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>
          
          {/* Filter Panel */}
          <FilterPanel
            isOpen={showFilters}
            onToggle={() => setShowFilters(!showFilters)}
            selectedFilters={selectedFilters}
            onFilterChange={setSelectedFilters}
            resultCount={filteredRecipes.length}
          />
          
          {/* SECTION 1: TRENDING LEADERBOARD */}
          <section className="mb-space-2xl">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-space-lg gap-2">
              <div>
                <div className="flex items-center gap-2 text-primary font-label-sm text-label-sm uppercase tracking-widest">
                  <MS name="local_fire_department" className="text-base" />
                  <span>Bảng Xếp Hạng Tuần Này</span>
                </div>
                <h2 className="font-headline-lg text-headline-lg text-cream-text mt-1">Đang Thịnh Hành Tại Quầy</h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-label-sm text-label-sm text-cream-muted">Cập nhật mỗi 24 giờ</span>
                <button className="w-8 h-8 rounded-lg bg-surface-slate flex items-center justify-center text-primary hover:bg-surface-smoke transition-colors">
                  <MS name="refresh" className="text-sm" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-lg">
              {trendingRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} showRank={true} />
              ))}
            </div>
          </section>
          
          {/* SECTION 2: FILTERED RECIPES */}
          <section className="mb-space-2xl">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-space-lg gap-2">
              <div>
                <div className="flex items-center gap-2 text-primary font-label-sm text-label-sm uppercase tracking-widest">
                  <MS name="restaurant" className="text-base" />
                  <span>Kết Quả Lọc</span>
                </div>
                <h2 className="font-headline-lg text-headline-lg text-cream-text mt-1">
                  {activeCategory === 'all' ? 'Tất Cả Công Thức' : CATEGORIES.find(c => c.key === activeCategory)?.label}
                </h2>
              </div>
              <span className="font-label-sm text-label-sm text-cream-muted">
                {filteredRecipes.length} công thức
              </span>
            </div>
            
            {paginatedRecipes.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-lg">
                  {paginatedRecipes.map((recipe) => (
                    <RecipeCard key={recipe.id} recipe={recipe} />
                  ))}
                </div>
                
                {/* Pagination */}
                {filteredRecipes.filter(r => !r.isTrending).length > itemsPerPage && (
                  <Pagination
                    currentPage={currentPage}
                    totalItems={filteredRecipes.filter(r => !r.isTrending).length}
                    itemsPerPage={itemsPerPage}
                    onPageChange={(page) => {
                      setCurrentPage(page);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="mt-8 pt-6 border-t border-surface-smoke"
                  />
                )}
              </>
            ) : (
              <div className="text-center py-12 rounded-xl bg-surface-slate">
                <MS name="search_off" className="text-5xl text-cream-muted mb-4" />
                <h3 className="font-headline-md text-cream-text mb-2">Không tìm thấy công thức</h3>
                <p className="font-body-md text-cream-muted">Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc</p>
              </div>
            )}
          </section>
          
          {/* SECTION 3: FEATURED MASTERS & CREATORS */}
          <section className="mb-space-2xl">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-space-lg gap-2">
              <div>
                <div className="flex items-center gap-2 text-primary font-label-sm text-label-sm uppercase tracking-widest">
                  <MS name="stars" className="text-base" />
                  <span>Cộng Đồng Nghệ Nhân Tinh Hoa</span>
                </div>
                <h2 className="font-headline-lg text-headline-lg text-cream-text mt-1">Bậc Thầy Pha Chế & Thợ Làm Bánh Tiêu Biểu</h2>
              </div>
              <button className="font-label-md text-label-md text-primary hover:text-copper-accent flex items-center gap-1 transition-colors">
                <span>Xem tất cả nghệ nhân</span>
                <MS name="arrow_forward" className="text-sm" />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
              {MOCK_CREATORS.map((creator) => (
                <CreatorCard key={creator.id} creator={creator} />
              ))}
            </div>
          </section>
          
          {/* Bottom Newsletter Banner */}
          <div className="bg-gradient-to-r from-surface-slate via-surface-smoke to-surface-slate rounded-2xl p-space-xl shadow-xl flex flex-col lg:flex-row items-center justify-between gap-space-lg">
            <div className="flex items-center gap-space-md">
              <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center text-primary shrink-0">
                <MS name="local_cafe" className="text-3xl" />
              </div>
              <div className="flex flex-col">
                <h3 className="font-headline-md text-headline-md text-cream-text">Nhận Bản Tin Bí Quyết Hàng Tuần</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Tỷ lệ công thức bí mật, biểu đồ hương vị theo mùa và tài liệu PDF dành riêng cho các thành viên Atelier.
                </p>
              </div>
            </div>
            <div className="flex w-full lg:w-auto items-center gap-2 max-w-md">
              <input 
                className="bg-surface-obsidian text-cream-text font-body-sm px-4 py-3 rounded-lg flex-1 placeholder:text-cream-muted focus:outline-none focus:ring-1 focus:ring-primary" 
                placeholder="Địa chỉ email cá nhân..." 
                type="email"
              />
              <button className="bg-primary text-on-primary px-5 py-3 rounded-lg font-label-md hover:bg-primary-container transition-all shrink-0">
                Đăng Ký
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
