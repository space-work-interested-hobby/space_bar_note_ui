import { useState, useMemo, useCallback, useEffect } from 'react';
import { useEquipment, EQUIPMENT_CATEGORIES, EQUIPMENT_RECOMMENDATIONS } from '../hooks/useEquipment';
import { useI18n } from '../i18n';
import Pagination from '../components/Pagination';

// ============================================================
// Category Icons Map
// ============================================================
const CATEGORY_ICONS = {
  oven: 'local_fire_department',
  bar_tools: 'local_bar',
  mixing: 'blender',
  measuring: 'scale',
  baking: 'breakfast_dining',
  glassware: 'wine_bar',
  cutting: 'content_cut',
  storage: 'inventory_2',
};

// ============================================================
// Donut Chart Component
// ============================================================
function DonutChart({ percentage, size = 64, strokeWidth = 6, colorClass = 'text-primary' }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
      <svg className="w-16 h-16 transform -rotate-90" viewBox={`0 0 ${size} ${size}`}>
        <circle
          className="text-surface-smoke"
          stroke="currentColor"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className={`${colorClass} transition-all duration-700 ease-out`}
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
      <span className="absolute text-label-sm text-cream-text font-bold">{percentage}%</span>
    </div>
  );
}

// ============================================================
// Equipment Card Component
// ============================================================
function EquipmentCard({ item, isOwned, onToggle }) {
  const tierColor = item.tier === 'essential' ? 'text-primary' : 'text-tertiary';

  return (
    <article
      className={`equipment-card bg-surface-slate rounded-xl p-space-md flex flex-col justify-between shadow-md hover:shadow-xl transition-all ${
        isOwned ? 'ring-1 ring-primary-container/50' : ''
      }`}
    >
      <div>
        {/* Header badges */}
        <div className="flex items-start justify-between gap-2 mb-space-sm">
          <span className={`px-2.5 py-1 rounded-full text-label-sm font-label-sm bg-surface-smoke ${tierColor}`}>
            {item.tierLabel}
          </span>
          <span className={`status-badge px-2.5 py-1 rounded-full text-label-sm font-label-sm flex items-center gap-1 ${
            isOwned
              ? 'bg-[#1b382b] text-[#7ce4a5]'
              : 'bg-surface-container text-cream-muted'
          }`}>
            <span className="material-symbols-outlined text-xs">
              {isOwned ? 'check_circle' : 'add_circle_outline'}
            </span>
            {isOwned ? 'Đã có' : 'Chưa có'}
          </span>
        </div>

        {/* Image placeholder */}
        <div className="w-full h-32 rounded-lg bg-surface-obsidian mb-space-md overflow-hidden relative group flex items-center justify-center">
          <span className="material-symbols-outlined text-4xl text-surface-smoke">
            {CATEGORY_ICONS[item.id.split('-')[0]] || 'construction'}
          </span>
          <div className="absolute inset-0 bg-gradient-to-t from-surface-obsidian via-transparent to-transparent"></div>
        </div>

        {/* Content */}
        <h3 className="font-headline-md text-lg text-cream-text font-medium leading-snug line-clamp-1">
          {item.name}
        </h3>
        <p className="font-body-sm text-xs text-cream-muted italic mb-2 line-clamp-1">
          {item.nameEn}
        </p>
        <p className="font-body-sm text-xs text-on-surface-variant line-clamp-2">
          {item.description}
        </p>
      </div>

      <div>
        {/* Recipe count */}
        <div className="flex items-center gap-1.5 text-cream-muted text-body-sm font-body-sm mb-3">
          <span className="material-symbols-outlined text-sm text-copper-accent">menu_book</span>
          <span>Yêu cầu: <strong className="text-cream-text">{item.recipeCount} công thức</strong></span>
        </div>

        {/* Action button */}
        <button
          onClick={() => onToggle(item.id)}
          className={`toggle-btn w-full py-2.5 px-3 rounded-lg font-label-md text-label-md transition-colors flex items-center justify-center gap-1.5 ${
            isOwned
              ? 'bg-surface-smoke hover:bg-surface-container text-cream-text'
              : 'bg-primary-container hover:bg-tertiary-container text-on-primary-container font-semibold'
          }`}
        >
          <span className="material-symbols-outlined text-sm">
            {isOwned ? 'settings' : 'add'}
          </span>
          {isOwned ? 'Quản lý thông số' : 'Thêm vào tủ'}
        </button>
      </div>
    </article>
  );
}

// ============================================================
// Recommendation Card Component
// ============================================================
function RecommendationCard({ recommendation }) {
  const handleAction = () => {
    if (recommendation.improvementPercent) {
      // Navigate to equipment recommendations
      alert('Đang mở khuyến nghị nâng cấp trạm...');
    } else {
      // Add to shopping list
      alert(`Đã thêm ${recommendation.itemsCount} dụng cụ vào danh sách mua sắm!`);
    }
  };
  
  return (
    <div className="bg-gradient-to-br from-surface-slate to-surface-obsidian p-space-lg rounded-2xl shadow-xl flex flex-col sm:flex-row gap-space-md relative overflow-hidden">
      <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-copper-accent/10 rounded-full blur-2xl pointer-events-none"></div>

      <div className="w-full sm:w-44 h-44 rounded-xl bg-surface-container overflow-hidden shrink-0 flex items-center justify-center">
        <span className="material-symbols-outlined text-5xl text-surface-smoke">auto_awesome</span>
      </div>

      <div className="flex flex-col justify-between flex-1">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 rounded text-label-sm font-label-sm bg-surface-smoke text-tertiary">
              Mục tiêu: {recommendation.target}
            </span>
          </div>
          <h3 className="font-headline-md text-xl text-cream-text font-medium mb-1">
            {recommendation.title}
          </h3>
          <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed line-clamp-3">
            {recommendation.description}
          </p>
        </div>
        <div className="flex items-center justify-between gap-2 pt-space-xs">
          <span className="font-label-sm text-label-sm text-cream-muted">
            {recommendation.improvementPercent
              ? `+ Nâng cấp trạm ${recommendation.improvementPercent}%`
              : `+ Thêm ${recommendation.itemsCount} dụng cụ gợi ý`}
          </span>
          <button 
            onClick={handleAction}
            className="px-4 py-2 rounded-lg font-label-md text-label-md bg-copper-accent hover:bg-[#c4682c] text-cream-text transition-colors shadow-sm"
          >
            {recommendation.improvementPercent ? 'Xem Khuyên Dùng' : 'Thêm vào DS Mua'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// Main Equipment Station Page
// ============================================================
export default function EquipmentPage() {
  const { t } = useI18n();
  const {
    myEquipment,
    toggleEquipment,
    hasEquipment,
    clearAll,
    allEquipmentItems,
    statsByScope
  } = useEquipment();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  
  // Pagination state - one for each category
  const [equipmentPagination, setEquipmentPagination] = useState({});
  const ITEMS_PER_PAGE = 6;

  // Stats
  const totalOwned = myEquipment.length;
  const totalItems = allEquipmentItems.length;
  const coveragePercent = Math.round((totalOwned / totalItems) * 100) || 0;

  // Filter tabs
  const filterTabs = [
    { key: 'all', label: 'Tất cả dụng cụ' },
    { key: 'bar', label: 'Quầy Bar & Pha Chế' },
    { key: 'pastry', label: 'Xưởng Bánh & Pastry' },
    { key: 'essential', label: 'Thiết Yếu' },
    { key: 'pro', label: 'Nâng Cao / Pro' }
  ];

  // Filtered categories
  const filteredCategories = useMemo(() => {
    return Object.entries(EQUIPMENT_CATEGORIES).filter(([key, category]) => {
      // Apply filter
      if (activeFilter === 'bar' && !category.scope?.includes('bar')) return false;
      if (activeFilter === 'pastry' && !category.scope?.includes('pastry')) return false;
      if (activeFilter === 'essential' && !category.items.some(item => item.tier === 'essential')) return false;
      if (activeFilter === 'pro' && !category.items.some(item => item.tier === 'pro')) return false;

      // Apply search
      if (searchQuery) {
        const term = searchQuery.toLowerCase();
        return category.items.some(item =>
          item.name.toLowerCase().includes(term) ||
          item.nameEn.toLowerCase().includes(term) ||
          item.description.toLowerCase().includes(term)
        );
      }

      return true;
    });
  }, [searchQuery, activeFilter]);

  // Helper to get pagination state for a category
  const getCategoryPage = (categoryKey) => {
    return equipmentPagination[categoryKey] || 1;
  };

  const setCategoryPage = (categoryKey, page) => {
    setEquipmentPagination(prev => ({
      ...prev,
      [categoryKey]: page
    }));
  };

  // Paginated categories - memoized based on filteredCategories and pagination state
  const paginatedCategories = useMemo(() => {
    return filteredCategories.map(([categoryKey, category]) => {
      const currentPage = getCategoryPage(categoryKey);
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;
      const totalPages = Math.ceil(category.items.length / ITEMS_PER_PAGE);
      
      return {
        categoryKey,
        category,
        items: category.items.slice(startIndex, endIndex),
        currentPage,
        totalPages,
        totalItems: category.items.length
      };
    });
  }, [filteredCategories, equipmentPagination]);

  // Handle toggle
  const handleToggle = useCallback((id) => {
    toggleEquipment(id);
  }, [toggleEquipment]);

  // Reset pagination when filter/search changes
  useEffect(() => {
    setEquipmentPagination({});
  }, [activeFilter, searchQuery]);

  return (
    <div className="flex flex-col w-full">
      {/* ========================================
          TOP: Ambient Backdrop & Header
      ========================================= */}
      <div className="relative w-full overflow-hidden bg-surface-obsidian py-space-xl">
        {/* Ambient glow effects */}
        <div className="absolute top-10 right-1/4 w-96 h-96 bg-primary-container/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div className="absolute top-96 -left-20 w-80 h-80 bg-copper-accent/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

        <div className="max-w-7xl mx-auto px-gutter flex flex-col lg:flex-row lg:items-end justify-between gap-space-xl relative z-10">
          {/* Left: Title & Description */}
          <div className="max-w-3xl flex flex-col gap-space-sm">
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-surface-slate text-primary shadow-sm">
                <span className="material-symbols-outlined text-base">architecture</span>
              </span>
              <span className="font-label-sm text-label-sm tracking-widest uppercase text-copper-accent">
                Atelier Equipment & Station Essentials
              </span>
            </div>
            <h1 className="font-headline-display text-headline-display text-cream-text tracking-tight">
              Dụng Cụ Trạm Bar & Xưởng Bánh
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
              Quản lý toàn bộ khí tài pha chế tinh tế và thiết bị thủ công chuyên sâu của bạn. Hệ thống tự động kiểm kê, đối soát độ tương thích với thư viện công thức.
            </p>
          </div>

          {/* Right: Quick Actions */}
          <div className="flex flex-wrap items-center gap-space-sm shrink-0">
          <button 
            onClick={() => alert('Tính năng đồng bộ đang được phát triển!')}
            className="inline-flex items-center gap-2 bg-surface-slate hover:bg-surface-smoke text-cream-text px-space-md py-3 rounded-lg font-label-md text-label-md transition-all shadow-md"
          >
            <span className="material-symbols-outlined text-primary text-lg">sync</span>
            <span>Đồng Bộ Công Thức</span>
          </button>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 bg-primary-container hover:bg-tertiary-container text-on-primary-container px-space-md py-3 rounded-lg font-label-md text-label-md transition-all shadow-lg shadow-amber-glow"
            >
              <span className="material-symbols-outlined text-lg">print</span>
              <span>Xuất Bản In A4</span>
            </button>
          </div>
        </div>
      </div>

      {/* ========================================
          MAIN CONTENT
      ========================================= */}
      <div className="max-w-7xl mx-auto px-gutter w-full pb-space-2xl">

        {/* ========================================
            Station Metrics (Bento Trio)
        ========================================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md mb-space-xl -mt-space-lg">
          {/* Card 1: Inventory Total */}
          <div className="bg-surface-slate p-space-lg rounded-xl shadow-md flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="font-label-sm text-label-sm text-cream-muted uppercase tracking-wider">Tủ Khí Tài Của Tôi</span>
              <div className="flex items-baseline gap-2">
                <span className="font-bar-mode-metric text-bar-mode-metric text-cream-text font-bold">
                  {totalOwned}
                </span>
                <span className="font-body-md text-body-md text-on-surface-variant">/ {totalItems} món đã lưu</span>
              </div>
              <span className="font-body-sm text-body-sm text-primary flex items-center gap-1 mt-1">
                <span className="material-symbols-outlined text-sm">verified</span>
                Sẵn sàng pha {coveragePercent}% thực đơn
              </span>
            </div>
            <div className="w-14 h-14 rounded-xl bg-surface-obsidian flex items-center justify-center text-primary shadow-inner">
              <span className="material-symbols-outlined text-3xl">shelves</span>
            </div>
          </div>

          {/* Card 2: Bar Station Completeness */}
          <div className="bg-surface-slate p-space-lg rounded-xl shadow-md flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="font-label-sm text-label-sm text-copper-accent uppercase tracking-wider">Trạm Pha Chế / Bar</span>
              <div className="flex items-baseline gap-2">
                <span className="font-bar-mode-metric text-bar-mode-metric text-cream-text font-bold">
                  {statsByScope.bar.percent}%
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Đạt chuẩn Speakeasy</span>
              </div>
              <span className="font-body-sm text-body-sm text-cream-muted">Thiếu: Phễu lọc lạnh vi hạt</span>
            </div>
            <DonutChart percentage={statsByScope.bar.percent} colorClass="text-primary" />
          </div>

          {/* Card 3: Pastry Atelier Completeness */}
          <div className="bg-surface-slate p-space-lg rounded-xl shadow-md flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="font-label-sm text-label-sm text-tertiary uppercase tracking-wider">Xưởng Bánh & Pastry</span>
              <div className="flex items-baseline gap-2">
                <span className="font-bar-mode-metric text-bar-mode-metric text-cream-text font-bold">
                  {statsByScope.pastry.percent}%
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">Đạt chuẩn Artisan</span>
              </div>
              <span className="font-body-sm text-body-sm text-cream-muted">Thiếu: Dao Lame & Đá nướng</span>
            </div>
            <DonutChart percentage={statsByScope.pastry.percent} colorClass="text-copper-accent" />
          </div>
        </div>

        {/* ========================================
            Search & Filter Bar
        ========================================= */}
        <div className="bg-surface-slate/90 backdrop-blur-md p-space-md rounded-xl shadow-lg mb-space-xl flex flex-col md:flex-row items-stretch md:items-center justify-between gap-space-md">
          {/* Search Input */}
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-cream-muted text-lg">search</span>
            <input
              type="text"
              placeholder="Tìm kiếm dụng cụ (Jigger, Banneton, Vitamix...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-surface-obsidian text-cream-text font-body-sm pl-10 pr-4 py-2.5 rounded-lg placeholder:text-cream-muted focus:outline-none focus:bg-surface-container transition-all shadow-inner"
            />
          </div>

          {/* Segmented Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 scrollbar-none shrink-0">
            {filterTabs.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveFilter(tab.key)}
                className={`filter-tab px-3.5 py-2 rounded-lg font-label-md text-label-md transition-all whitespace-nowrap ${
                  activeFilter === tab.key
                    ? 'bg-primary-container text-on-primary-container active'
                    : 'bg-surface-smoke text-cream-muted hover:text-cream-text'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ========================================
            Equipment Sections by Category
        ========================================= */}
        <div className="space-y-space-2xl">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-space-2xl bg-surface-slate rounded-xl">
              <span className="material-symbols-outlined text-6xl text-cream-muted mb-4 block">search_off</span>
              <h3 className="font-headline-md text-xl text-cream-text mb-2">Không Tìm Thấy</h3>
              <p className="text-body-md text-cream-muted">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</p>
            </div>
          ) : (
            paginatedCategories.map(({ categoryKey, category, items, currentPage, totalPages, totalItems }) => {
              // Determine grid columns based on category
              const isBarTools = categoryKey === 'bar_tools' || categoryKey === 'glassware';
              const gridCols = isBarTools
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';

              return (
                <section key={categoryKey} className="equipment-category-group">
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-space-lg">
                    <div className="flex items-center gap-3">
                      <span className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-primary text-xl">
                        <span className="material-symbols-outlined text-2xl">
                          {CATEGORY_ICONS[categoryKey] || 'construction'}
                        </span>
                      </span>
                      <div>
                        <h2 className="font-headline-md text-headline-md text-cream-text">{category.label}</h2>
                        <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-1">{category.description}</p>
                      </div>
                    </div>
                    <span className="font-label-sm text-label-sm text-cream-muted uppercase tracking-wider hidden sm:block">
                      {totalItems} Dụng cụ
                    </span>
                  </div>

                  {/* Equipment Grid */}
                  <div className={`grid ${gridCols} gap-space-md`}>
                    {items.map(item => (
                      <EquipmentCard
                        key={item.id}
                        item={item}
                        isOwned={hasEquipment(item.id)}
                        onToggle={handleToggle}
                      />
                    ))}
                  </div>

                  {/* Category Pagination */}
                  {totalPages > 1 && (
                    <Pagination
                      currentPage={currentPage}
                      totalItems={totalItems}
                      itemsPerPage={ITEMS_PER_PAGE}
                      onPageChange={(page) => setCategoryPage(categoryKey, page)}
                      className="mt-6 pt-4 border-t border-surface-smoke"
                    />
                  )}
                </section>
              );
            })
          )}
        </div>

        {/* ========================================
            Equipment Upgrade Recommendations
        ========================================= */}
        <div className="mt-space-2xl pt-space-xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg gap-space-sm">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-copper-accent text-lg">auto_awesome</span>
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-copper-accent">
                  Curated Atelier Diagnostics
                </span>
              </div>
              <h2 className="font-headline-md text-headline-md text-cream-text">
                Gợi Ý Nâng Cấp Trạm Thông Minh
              </h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Phân tích dựa trên các công thức bạn đã bookmark gần đây và phong cách pha chế / nướng bạn theo đuổi.
              </p>
            </div>
            <span 
              onClick={() => alert('Lộ trình Mastery đang được phát triển!')}
              className="font-label-md text-label-md text-primary hover:underline cursor-pointer flex items-center gap-1"
            >
              Xem lộ trình Mastery toàn diện
              <span className="material-symbols-outlined text-sm">arrow_forward</span>
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-lg">
            {EQUIPMENT_RECOMMENDATIONS.map(rec => (
              <RecommendationCard key={rec.id} recommendation={rec} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
