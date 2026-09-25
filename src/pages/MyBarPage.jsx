/**
 * MyBarPage.jsx - Bar Inventory & Recipe Matching Page
 * 
 * Features:
 * - Interactive ingredient selector with category tabs
 * - Real-time recipe matching algorithm
 * - SVG donut chart showing bar coverage
 * - Progress bars for each recipe showing matched/missing ingredients
 * - Toast notification for shopping list
 * - Save/Reset bar functionality
 */
import { useState, useMemo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../i18n';
import { 
  useMyBar, 
  barIngredients, 
  barCategories,
  getIngredientById 
} from '../hooks/useMyBar';
import Pagination from '../components/Pagination';

// Material Symbol component
const MS = ({ name, className = '', filled = false }) => (
  <span className={`material-symbols-outlined ${filled ? 'material-symbols-filled' : ''} ${className}`}>
    {name}
  </span>
);

// ============================================================
// DONUT CHART COMPONENT
// ============================================================
function DonutChart({ percentage, size = 80, strokeWidth = 6, centerText, centerSubtext }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  
  return (
    <div className="relative w-20 h-20 flex items-center justify-center shrink-0">
      <svg className="w-20 h-20 transform -rotate-90" viewBox={`0 0 ${size} ${size}`}>
        {/* Background circle */}
        <circle
          className="text-surface-smoke"
          stroke="currentColor"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        {/* Progress circle */}
        <circle
          className="text-amber-vibrant transition-all duration-700 ease-out"
          stroke="currentColor"
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      {/* Center text */}
      <div className="absolute flex flex-col items-center">
        <span className="font-bar-mode-metric-mobile text-bar-mode-metric-mobile text-cream-text leading-none font-bold">
          {centerText}
        </span>
        {centerSubtext && (
          <span className="text-[9px] uppercase tracking-wider text-primary font-bold">
            {centerSubtext}
          </span>
        )}
      </div>
    </div>
  );
}

// ============================================================
// MATCH PROGRESS BAR COMPONENT
// ============================================================
function MatchProgressBar({ recipe }) {
  const isFullMatch = recipe.matchPercentage === 100;
  
  return (
    <div className="mt-3 p-2.5 rounded-lg bg-surface-obsidian">
      <div className="flex items-center justify-between text-[12px] mb-1.5">
        <span className={`font-semibold flex items-center gap-1 ${
          isFullMatch ? 'text-primary' : 'text-secondary'
        }`}>
          <MS name={isFullMatch ? 'task_alt' : 'warning'} className="text-sm" />
          {isFullMatch 
            ? '100% Nguyên liệu sẵn sàng'
            : `Bạn đang có ${recipe.matchedCount} / ${recipe.totalCount} nguyên liệu`
          }
        </span>
        <span className="text-cream-muted">{recipe.matchedCount}/{recipe.totalCount} có sẵn</span>
      </div>
      
      {/* Progress bar */}
      <div className="w-full bg-surface-smoke h-1.5 rounded-full overflow-hidden">
        <div 
          className={`h-full rounded-full transition-all duration-500 ${
            isFullMatch ? 'bg-primary-container' : 'bg-copper-accent'
          }`}
          style={{ width: `${recipe.matchPercentage}%` }}
        />
      </div>
      
      {/* Ingredient chips */}
      <div className="flex flex-wrap gap-1.5 mt-2">
        {/* Matched ingredients */}
        {recipe.matchedIngredients.map(id => {
          const ing = getIngredientById(id);
          const recipeIng = recipe.ingredients.find(i => i.id === id);
          return (
            <span 
              key={id}
              className="px-2 py-0.5 rounded bg-surface-smoke text-[11px] text-cream-text flex items-center gap-1"
            >
              <MS name="done" className="text-[10px] text-primary" />
              {ing?.nameVi} ({recipeIng?.amount})
            </span>
          );
        })}
        
        {/* Missing ingredients */}
        {recipe.missingIngredients.map(ing => (
          <span 
            key={ing.id}
            className="px-2 py-0.5 rounded bg-error-container/30 text-[11px] text-error font-semibold flex items-center gap-1"
          >
            <MS name="close" className="text-[10px]" />
            Thiếu: {ing.name} ({ing.amount})
          </span>
        ))}
      </div>
    </div>
  );
}

// ============================================================
// RECIPE CARD COMPONENT
// ============================================================
function RecipeCard({ recipe, onAddToCart }) {
  const navigate = useNavigate();
  const isFullMatch = recipe.matchPercentage === 100;
  
  const handleDetails = () => {
    navigate(`/note/${recipe.id}`);
  };
  
  return (
    <article className="recipe-card p-4 sm:p-6 rounded-xl bg-surface-slate shadow-xl flex flex-col md:flex-row gap-4 transition-all hover:bg-surface-container-high group">
      {/* Image */}
      <div 
        className="w-full md:w-48 h-48 rounded-lg overflow-hidden shrink-0 relative bg-surface-obsidian cursor-pointer"
        onClick={handleDetails}
      >
        <img 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          src={recipe.image_url} 
          alt={recipe.name}
          loading="lazy"
        />
        {/* Status badge */}
        <div className={`absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full backdrop-blur-md font-label-sm text-label-sm flex items-center gap-1 ${
          isFullMatch 
            ? 'bg-surface-obsidian/80 text-primary'
            : 'bg-secondary-container/90 text-secondary-fixed'
        }`}>
          {isFullMatch ? (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-vibrant"></span>
              <span>Pha ngay</span>
            </>
          ) : (
            <>
              <MS name="hourglass_top" className="text-xs" />
              <span>Thiếu {recipe.missingCount} vị</span>
            </>
          )}
        </div>
      </div>
      
      {/* Content */}
      <div className="flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-start justify-between gap-2">
            <div className="flex flex-col">
              <span className="text-label-sm uppercase tracking-widest text-copper-accent">
                {recipe.category}
              </span>
              <h4 className="text-headline-md text-cream-text group-hover:text-primary transition-colors">
                {recipe.name}
              </h4>
            </div>
            <button 
              className="p-2 rounded-lg hover:bg-surface-smoke text-cream-muted hover:text-primary transition-colors"
              title="Lưu công thức"
            >
              <MS name="favorite" className="text-xl" />
            </button>
          </div>
          
          <p className="text-body-sm text-cream-muted mt-2 line-clamp-2">
            {recipe.description}
          </p>
          
          {/* Match progress */}
          <MatchProgressBar recipe={recipe} />
        </div>
        
        {/* Footer */}
        <div className="flex items-center justify-between pt-3 mt-3">
          <div className="flex items-center gap-4 text-body-sm text-cream-muted">
            <span className="flex items-center gap-1">
              <MS name="schedule" className="text-base text-copper-accent" />
              {recipe.time_minutes} phút
            </span>
            <span className="flex items-center gap-1">
              <MS name="star" className="text-base text-primary" />
              {recipe.avg_rating}
            </span>
          </div>
          
          {isFullMatch ? (
            <button
              onClick={() => navigate(`/note/${recipe.id}`)}
              className="px-4 py-2 rounded-lg bg-primary-container text-on-primary-container text-label-md hover:bg-tertiary-container transition-all shadow-md flex items-center gap-1"
            >
              <span>Pha Ngay</span>
              <MS name="arrow_forward" className="text-base" />
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button 
                className="add-cart-btn flex-1 sm:flex-initial px-3 py-2 rounded-lg bg-surface-smoke hover:bg-surface-container-high text-copper-accent text-label-md flex items-center justify-center gap-1.5 transition-colors"
                onClick={() => onAddToCart(recipe.missingIngredients)}
              >
                <MS name="add_shopping_cart" className="text-sm" />
                <span className="hidden sm:inline">Thêm Vào Giỏ</span>
                <span className="sm:hidden">Mua</span>
              </button>
              <button 
                className="px-3.5 py-2 rounded-lg bg-surface-container-high hover:bg-surface-bright text-cream-text text-label-md transition-colors"
                onClick={handleDetails}
              >
                Chi Tiết
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

// ============================================================
// TOAST NOTIFICATION COMPONENT
// ============================================================
function ToastNotification({ show, message, onClose }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 4000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);
  
  if (!show) return null;
  
  return (
    <div className="fixed bottom-6 right-6 p-4 rounded-xl bg-surface-bright text-cream-text shadow-2xl flex items-center justify-between gap-4 animate-slide-in-right z-50">
      <div className="flex items-center gap-2">
        <MS name="shopping_bag" className="text-primary" />
        <span className="text-body-md">{message}</span>
      </div>
      <button 
        onClick={onClose}
        className="text-cream-muted hover:text-cream-text transition-colors"
      >
        <MS name="close" className="text-base" />
      </button>
    </div>
  );
}

// ============================================================
// BAR TIP CARD COMPONENT
// ============================================================
function BarTipCard({ selectedIds }) {
  const tips = [];
  
  if (selectedIds.includes('bourbon') && selectedIds.includes('campari')) {
    tips.push({
      icon: 'tips_and_updates',
      title: 'Bartender Tip',
      text: 'Bạn có Bourbon và Campari? Thêm Sweet Vermouth để pha một ly Boulevardier kinh điển với chiều sâu đắng ngọt hài hòa.'
    });
  }
  
  if (selectedIds.includes('gin') && !selectedIds.includes('tonic')) {
    tips.push({
      icon: 'lightbulb',
      title: 'Gợi Ý',
      text: 'Thêm Tonic Water để pha Gin Tonic - sự kết hợp kinh điển giữa juniper thảo mộc và tonic sủi bọt.'
    });
  }
  
  if (tips.length === 0) return null;
  
  const tip = tips[0];
  
  return (
    <div className="p-4 rounded-xl bg-surface-container-low shadow-md flex items-start gap-3">
      <div className="w-8 h-8 rounded-lg bg-tertiary-container/30 text-amber-vibrant flex items-center justify-center shrink-0 mt-0.5">
        <MS name={tip.icon} className="text-base" />
      </div>
      <div className="flex flex-col">
        <span className="text-label-sm text-primary uppercase">{tip.title}</span>
        <p className="text-body-sm text-cream-muted mt-1 leading-relaxed">
          {tip.text}
        </p>
      </div>
    </div>
  );
}

// ============================================================
// MAIN PAGE COMPONENT
// ============================================================
export default function MyBarPage() {
  const { t } = useI18n();
  const {
    selectedIngredients,
    viewMode,
    setViewMode,
    toggleIngredient,
    resetAll,
    handleSave,
    readyRecipes,
    almostRecipes,
    coveragePercentage,
    displayedRecipes,
    totalIngredients,
  } = useMyBar();

  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [showToast, setShowToast] = useState(false);
  const [saveAnimation, setSaveAnimation] = useState(false);
  
  // Pagination state for recipes
  const [recipeCurrentPage, setRecipeCurrentPage] = useState(1);
  const RECIPES_PER_PAGE = 4;

  // Filter ingredients by category and search
  const filteredIngredients = useMemo(() => {
    return barIngredients.filter(ing => {
      const matchesCategory = activeCategory === 'all' || ing.category === activeCategory;
      const matchesSearch = !searchTerm || 
        ing.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ing.nameVi.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchTerm]);

  // Group ingredients by category
  const groupedIngredients = useMemo(() => {
    const groups = {};
    filteredIngredients.forEach(ing => {
      if (!groups[ing.category]) {
        groups[ing.category] = [];
      }
      groups[ing.category].push(ing);
    });
    return groups;
  }, [filteredIngredients]);

  // Handle save button
  const onSave = useCallback(() => {
    setSaveAnimation(true);
    handleSave().then(() => {
      setTimeout(() => setSaveAnimation(false), 2000);
    });
  }, [handleSave]);

  // Handle add to cart
  const onAddToCart = useCallback((missingIngredients) => {
    console.log('Adding to shopping list:', missingIngredients);
    setShowToast(true);
  }, []);

  // Paginated recipes based on viewMode
  const paginatedRecipes = useMemo(() => {
    const startIndex = (recipeCurrentPage - 1) * RECIPES_PER_PAGE;
    const endIndex = startIndex + RECIPES_PER_PAGE;
    return displayedRecipes.slice(startIndex, endIndex);
  }, [displayedRecipes, recipeCurrentPage]);

  // Reset page when view mode changes
  useEffect(() => {
    setRecipeCurrentPage(1);
  }, [viewMode]);

  return (
    <div className="flex flex-col w-full">
      {/* ========================================
          TOP ARCHIVAL AMBIENT BACKDROP
      ========================================= */}
      <div className="relative w-full overflow-hidden bg-surface-obsidian pt-12 pb-10 px-gutter sm:px-margin">
        {/* Ambient glow effects */}
        <div className="absolute -top-32 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 left-10 w-72 h-72 bg-secondary-container/15 rounded-full blur-2xl pointer-events-none"></div>
        
        <div className="relative max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-6 relative z-10">
          {/* Left: Title & Description */}
          <div className="flex flex-col max-w-2xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-label-sm uppercase tracking-widest text-primary">
                Atelier Inventory Algorithm
              </span>
            </div>
            <h1 className="text-headline-display text-cream-text tracking-tight font-headline-display">
              Tủ Quầy Của Tôi <span className="italic text-primary font-serif font-light text-headline-lg">(My Bar & Pantry)</span>
            </h1>
            <p className="text-body-lg text-cream-muted mt-3 leading-relaxed">
              Chọn những chai rượu, đồ pha và nguyên liệu bạn đang có sẵn — Atelier sẽ đối soát tỷ lệ chuẩn xác và đề xuất ngay các ly cocktail thủ công cùng cà phê bạn có thể pha chế tức thì.
            </p>
          </div>
          
          {/* Right: Station Status Bar Widget */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-4 p-4 rounded-xl bg-surface-slate shadow-xl border-0">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-surface-smoke flex items-center justify-center text-primary">
                <MS name="liquor" className="text-2xl" />
              </div>
              <div>
                <div className="text-label-sm text-cream-muted uppercase">Tình trạng quầy</div>
                <div className="text-bar-mode-step-mobile text-bar-mode-step-mobile text-primary tracking-tight">
                  <span>{selectedIngredients.length}</span>
                  <span className="text-body-sm text-cream-muted font-normal"> vị có sẵn</span>
                </div>
              </div>
            </div>
            
            <div className="h-8 w-px bg-surface-smoke hidden sm:block"></div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={onSave}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface-smoke hover:bg-surface-container-high text-cream-text transition-all text-label-md ${
                  saveAnimation ? 'text-primary' : ''
                }`}
              >
                <MS 
                  name={saveAnimation ? 'done' : 'bookmark'} 
                  className="text-base text-primary" 
                />
                <span>{saveAnimation ? 'Đã Lưu!' : 'Lưu Tủ Quầy'}</span>
              </button>
              
              <button
                onClick={resetAll}
                className="p-2.5 rounded-lg bg-surface-smoke hover:bg-surface-container-high text-cream-muted hover:text-cream-text transition-all"
                title="Bỏ chọn tất cả"
              >
                <MS name="restart_alt" className="text-base" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* ========================================
          MAIN WORKSTATION LAYOUT
      ========================================= */}
      <div className="max-w-7xl mx-auto px-gutter sm:px-margin w-full pb-space-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
          
          {/* ========================================
              LEFT COLUMN: Ingredient Selector
          ========================================= */}
          <section className="lg:col-span-5 flex flex-col gap-4">
            
            {/* Ingredient Shelf Card */}
            <div className="p-6 rounded-xl bg-surface-slate shadow-xl">
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <MS name="inventory_2" className="text-primary text-xl" />
                  <h2 className="text-headline-md text-cream-text">Kho Nguyên Liệu</h2>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-surface-smoke text-label-sm text-amber-vibrant">
                  Live Filter
                </span>
              </div>
              
              {/* Category Pill Switcher */}
              <div 
                className="flex gap-1.5 p-1 rounded-lg bg-surface-obsidian overflow-x-auto scrollbar-none mb-4"
              >
                <button
                  className={`px-3 py-1.5 rounded-md text-label-sm whitespace-nowrap transition-all ${
                    activeCategory === 'all'
                      ? 'bg-primary-container text-on-primary-container font-semibold'
                      : 'text-cream-muted hover:text-cream-text'
                  }`}
                  onClick={() => setActiveCategory('all')}
                >
                  Tất Cả
                </button>
                {Object.values(barCategories).map(cat => (
                  <button
                    key={cat.key}
                    className={`px-3 py-1.5 rounded-md text-label-sm whitespace-nowrap transition-all ${
                      activeCategory === cat.key
                        ? 'bg-primary-container text-on-primary-container font-semibold'
                        : 'text-cream-muted hover:text-cream-text'
                    }`}
                    onClick={() => setActiveCategory(cat.key)}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
              
              {/* Quick Search Filter */}
              <div className="relative mb-4">
                <MS name="search" className="absolute left-3.5 top-2.5 text-cream-muted text-sm" />
                <input
                  type="text"
                  placeholder="Tìm nhanh nguyên liệu (VD: Gin, Tonic...)"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-surface-obsidian text-cream-text text-body-sm pl-9 pr-3 py-2 rounded-lg placeholder:text-cream-muted focus:outline-none focus:bg-surface-smoke transition-all shadow-inner"
                />
              </div>
              
              {/* Ingredient Badges Matrix */}
              <div className="flex flex-col gap-6">
                {Object.entries(groupedIngredients).map(([category, ingredients]) => {
                  const catInfo = barCategories[category];
                  if (!catInfo) return null;
                  
                  return (
                    <div key={category} className="flex flex-col gap-2">
                      {/* Category header */}
                      <div className="flex items-center justify-between text-cream-muted text-label-sm uppercase tracking-wider py-1">
                        <span>{catInfo.label}</span>
                        <span className="text-[10px] text-copper-accent">{catInfo.description}</span>
                      </div>
                      
                      {/* Ingredient chips */}
                      <div className="flex flex-wrap gap-2">
                        {ingredients.map(ing => {
                          const isSelected = selectedIngredients.includes(ing.id);
                          return (
                            <button
                              key={ing.id}
                              className={`ing-chip flex items-center gap-1.5 px-3 py-2 rounded-lg text-label-md transition-all ${
                                isSelected
                                  ? 'bg-surface-smoke text-primary shadow-sm'
                                  : 'bg-surface-container-low text-cream-muted hover:text-cream-text hover:bg-surface-smoke'
                              }`}
                              onClick={() => toggleIngredient(ing.id)}
                              title={ing.name}
                            >
                              <MS
                                name={isSelected ? 'check_circle' : 'add_circle'}
                                className={`text-sm ${isSelected ? 'text-primary' : 'text-surface-variant'}`}
                              />
                              <span>{ing.nameVi}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
                
                {filteredIngredients.length === 0 && (
                  <div className="text-center py-8 text-cream-muted">
                    <MS name="search_off" className="text-4xl mb-2" />
                    <p>Không tìm thấy nguyên liệu phù hợp</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Bar Tip Card */}
            <BarTipCard selectedIds={selectedIngredients} />
          </section>
          
          {/* ========================================
              RIGHT COLUMN: Recipe Matching Results
          ========================================= */}
          <section className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Summary Match Banner with Donut Chart */}
            <div className="p-6 rounded-xl bg-surface-slate shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 relative overflow-hidden">
              {/* Ambient glow */}
              <div className="absolute -right-6 -bottom-6 w-36 h-36 bg-primary-container/10 rounded-full blur-xl pointer-events-none"></div>
              
              <div className="flex items-center gap-4 w-full sm:w-auto">
                {/* Donut Chart */}
                <DonutChart
                  percentage={coveragePercentage}
                  centerText={readyRecipes.length}
                  centerSubtext="Món"
                />
                
                <div className="flex flex-col">
                  <span className="text-label-sm uppercase tracking-widest text-primary">Khả năng pha tức thì</span>
                  <h3 className="text-headline-md text-cream-text">
                    {readyRecipes.length} món đủ 100% nguyên liệu
                  </h3>
                  <p className="text-body-sm text-cream-muted">
                    và {almostRecipes.length} công thức đặc sắc chỉ thiếu đúng 1 thành phần duy nhất.
                  </p>
                </div>
              </div>
              
              <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2">
                <span className="px-3 py-1 rounded-full bg-surface-smoke text-label-sm text-cream-muted">
                  Độ khớp quầy: <strong className="text-primary">{coveragePercentage}%</strong>
                </span>
                <button className="px-3 py-1.5 rounded-lg bg-surface-smoke hover:bg-surface-container-high text-cream-text text-body-sm text-label-md flex items-center gap-1.5 transition-colors">
                  <MS name="sort" className="text-sm text-copper-accent" />
                  <span>Sắp xếp</span>
                </button>
              </div>
            </div>
            
            {/* Filter Segmented Tabs */}
            <div className="flex items-center justify-between">
              <div className="flex p-1 rounded-xl bg-surface-slate shadow-sm">
                <button
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-label-md transition-all ${
                    viewMode === 'ready'
                      ? 'bg-primary-container text-on-primary-container shadow-sm'
                      : 'text-cream-muted hover:text-cream-text'
                  }`}
                  onClick={() => setViewMode('ready')}
                >
                  <MS name="check_circle" className="text-base" />
                  <span>Pha Được Ngay</span>
                  <span className="ml-1 px-1.5 py-0.5 rounded-md bg-surface-obsidian/30 text-[11px] font-bold">
                    {readyRecipes.length}
                  </span>
                </button>
                
                <button
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-label-md transition-all ${
                    viewMode === 'almost'
                      ? 'bg-primary-container text-on-primary-container shadow-sm'
                      : 'text-cream-muted hover:text-cream-text'
                  }`}
                  onClick={() => setViewMode('almost')}
                >
                  <MS name="incomplete_circle" className="text-base" />
                  <span>Thiếu 1 Nguyên Liệu</span>
                  <span className="ml-1 px-1.5 py-0.5 rounded-md bg-surface-smoke text-[11px] font-bold">
                    {almostRecipes.length}
                  </span>
                </button>
              </div>
              
              <span className="text-body-sm text-cream-muted hidden sm:inline-block">
                Hiển thị chuẩn Bar Mode
              </span>
            </div>
            
            {/* RECIPES STREAM */}
            <div className="flex flex-col gap-4">
              {paginatedRecipes.length > 0 ? (
                <>
                  {paginatedRecipes.map(recipe => (
                    <RecipeCard 
                      key={recipe.id} 
                      recipe={recipe} 
                      onAddToCart={onAddToCart}
                    />
                  ))}
                  
                  {/* Pagination */}
                  {displayedRecipes.length > RECIPES_PER_PAGE && (
                    <Pagination
                      currentPage={recipeCurrentPage}
                      totalItems={displayedRecipes.length}
                      itemsPerPage={RECIPES_PER_PAGE}
                      onPageChange={(page) => {
                        setRecipeCurrentPage(page);
                        window.scrollTo({ top: 400, behavior: 'smooth' });
                      }}
                      className="mt-4 pt-4 border-t border-surface-smoke"
                    />
                  )}
                </>
              ) : (
                <div className="text-center py-12 rounded-xl bg-surface-slate">
                  <MS name="search_off" className="text-5xl text-cream-muted mb-4" />
                  <h3 className="text-headline-md text-cream-text mb-2">
                    {viewMode === 'ready' 
                      ? 'Chưa có công thức hoàn chỉnh'
                      : 'Không có công thức thiếu 1 vị'
                    }
                  </h3>
                  <p className="text-body-md text-cream-muted">
                    {viewMode === 'ready'
                      ? 'Thêm nguyên liệu để có thêm công thức pha được ngay!'
                      : 'Tuyệt vời! Bạn đã có đủ nguyên liệu cho tất cả công thức gần hoàn chỉnh.'
                    }
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
      
      {/* Toast Notification */}
      <ToastNotification
        show={showToast}
        message="Đã thêm nguyên liệu còn thiếu vào Danh Sách Đi Chợ (Shopping List)."
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}
