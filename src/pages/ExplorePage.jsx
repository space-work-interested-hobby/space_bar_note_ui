import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotes } from '../hooks/useNotes';
import { useI18n } from '../i18n';
import NoteCard from '../components/NoteCard';

const CATEGORY_ICONS = {
  all: '✨',
  cocktail: '🍸',
  mocktail: '🍹',
  coffee: '☕',
  tea: '🍵',
  juice: '🧃',
  beer: '🍺',
  wine: '🍷',
  dessert: '🍰',
  smoothie: '🥤',
  milkshake: '🧋',
  iced_tea: '🧊',
  lemonade: '🍋',
  hot_chocolate: '☕',
  cake: '🎂',
  cupcake: '🧁',
  muffin: '🧇',
  cookies: '🍪',
  bread: '🍞',
  pastry: '🥐',
  pie: '🥧',
  pudding: '🍮',
  ice_cream: '🍦',
  chocolate: '🍫',
  salad: '🥗',
  snack: '🍿',
  appetizer: '🥟',
  main_dish: '🍝',
  sauce: '🫙',
  other: '📝',
};

const SORT_OPTIONS = [
  { key: 'newest', label: 'Mới Nhất', icon: 'schedule' },
  { key: 'oldest', label: 'Cũ Nhất', icon: 'history' },
  { key: 'rating', label: 'Đánh Giá Cao', icon: 'star' },
  { key: 'name', label: 'Theo Tên', icon: 'sort_by_alpha' },
];

const TRENDING_SEARCHES = [
  'Mojito Chanh Bạc Hà',
  'Bánh Mì Sourdough & Pastry',
  'Cold Brew Geisha',
  'Old Fashioned Khói Sồi',
  'Matcha Uji & Panna Cotta',
  'Cocktail Cà Phê',
];

// Pagination configuration
const ITEMS_PER_PAGE_OPTIONS = [
  { key: 8, label: '8' },
  { key: 12, label: '12' },
  { key: 16, label: '16' },
  { key: 24, label: '24' },
];

// Pagination Component
function Pagination({ currentPage, totalPages, onPageChange }) {
  const getVisiblePages = () => {
    const pages = [];
    const showFirst = currentPage > 3;
    const showLast = currentPage < totalPages - 2;
    
    if (showFirst) {
      pages.push(1, '...');
    }
    
    for (let i = Math.max(1, currentPage - 1); i <= Math.min(totalPages, currentPage + 1); i++) {
      if (!pages.includes(i)) pages.push(i);
    }
    
    if (showLast) {
      if (!pages.includes('...')) pages.push('...');
      pages.push(totalPages);
    }
    
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      {/* Previous Button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
          currentPage === 1
            ? 'bg-surface-smoke text-cream-muted cursor-not-allowed opacity-50'
            : 'bg-surface-slate text-cream-text hover:bg-primary-container hover:text-on-primary-container'
        }`}
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </button>

      {/* Page Numbers */}
      <div className="flex items-center gap-1">
        {getVisiblePages().map((page, index) => (
          page === '...' ? (
            <span key={`ellipsis-${index}`} className="w-10 h-10 flex items-center justify-center text-cream-muted">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-10 h-10 rounded-lg font-label-md text-label-md transition-all ${
                currentPage === page
                  ? 'bg-primary-container text-on-primary-container shadow-md'
                  : 'bg-surface-slate text-cream-text hover:bg-surface-smoke'
              }`}
            >
              {page}
            </button>
          )
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${
          currentPage === totalPages
            ? 'bg-surface-smoke text-cream-muted cursor-not-allowed opacity-50'
            : 'bg-surface-slate text-cream-text hover:bg-primary-container hover:text-on-primary-container'
        }`}
      >
        <span className="material-symbols-outlined">chevron_right</span>
      </button>
    </div>
  );
}

export default function ExplorePage() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const { notes, loading } = useNotes();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  // Reset page when filters change
  const handleFilterChange = () => {
    setCurrentPage(1);
  };

  // Filter và sort notes
  const filteredNotes = useMemo(() => {
    let result = [...notes];

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(note => note.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(note =>
        note.title?.toLowerCase().includes(term) ||
        note.description?.toLowerCase().includes(term) ||
        note.ingredients?.some(ing => ing.toLowerCase().includes(term))
      );
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.created_at) - new Date(b.created_at));
        break;
      case 'rating':
        result.sort((a, b) => (b.avg_rating || 0) - (a.avg_rating || 0));
        break;
      case 'name':
        result.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
        break;
    }

    return result;
  }, [notes, selectedCategory, searchTerm, sortBy]);

  // Pagination logic
  const totalPages = Math.ceil(filteredNotes.length / itemsPerPage);
  const paginatedNotes = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredNotes.slice(start, end);
  }, [filteredNotes, currentPage, itemsPerPage]);

  // Get category counts
  const categoryCounts = useMemo(() => {
    const counts = { all: notes.length };
    notes.forEach(note => {
      counts[note.category] = (counts[note.category] || 0) + 1;
    });
    return counts;
  }, [notes]);

  const categories = [
    { key: 'all', label: 'Tất Cả' },
    { key: 'cocktail', label: 'Cocktail' },
    { key: 'mocktail', label: 'Mocktail' },
    { key: 'coffee', label: 'Cà Phê' },
    { key: 'tea', label: 'Trà' },
    { key: 'juice', label: 'Nước Ép' },
    { key: 'smoothie', label: 'Sinh Tố' },
    { key: 'milkshake', label: 'Milkshake' },
    { key: 'iced_tea', label: 'Trà Đá' },
    { key: 'lemonade', label: 'Lemonade' },
    { key: 'hot_chocolate', label: 'Socola Nóng' },
    { key: 'beer', label: 'Bia' },
    { key: 'wine', label: 'Rượu Vang' },
    { key: 'cake', label: 'Bánh Kem' },
    { key: 'cupcake', label: 'Cupcake' },
    { key: 'muffin', label: 'Muffin' },
    { key: 'cookies', label: 'Bánh Quy' },
    { key: 'bread', label: 'Bánh Mì' },
    { key: 'pastry', label: 'Pastry' },
    { key: 'pie', label: 'Pie' },
    { key: 'pudding', label: 'Pudding' },
    { key: 'ice_cream', label: 'Kem' },
    { key: 'chocolate', label: 'Socola' },
    { key: 'dessert', label: 'Tráng Miệng' },
    { key: 'salad', label: 'Salad' },
    { key: 'snack', label: 'Snack' },
    { key: 'appetizer', label: 'Khai Vị' },
    { key: 'main_dish', label: 'Món Chính' },
    { key: 'sauce', label: 'Nước Sốt' },
    { key: 'other', label: 'Khác' },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-gutter py-space-xl">
      {/* Subtle Ambient Glow Orbs */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute -top-32 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 right-10 w-80 h-80 bg-copper-accent/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Header */}
        <div className="mb-8 relative">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary">
              Khám Phá Kho Tàng Công Thức
            </span>
          </div>
          <h1 className="font-headline-display text-headline-display text-cream-text tracking-tight mb-3">
            Khám Phá <span className="italic text-primary">Vũ Trụ Pha Chế</span>
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
            Tuyển tập tỷ lệ chuẩn xác từ speakeasy underground danh tiếng, trạm cà phê specialty wave 3 và xưởng bánh men sống thủ công cổ điển.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative mb-6">
          <span className="material-symbols-outlined absolute left-5 top-1/2 -translate-y-1/2 text-primary text-2xl pointer-events-none">
            manage_search
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); handleFilterChange(); }}
            placeholder="Tìm theo rượu nền (Bourbon, Mezcal), hạt cà phê, men bánh Sourdough, hương vị..."
            className="w-full bg-surface-slate text-cream-text font-body-lg text-body-lg pl-14 pr-32 py-4 rounded-xl placeholder:text-cream-muted focus:outline-none focus:shadow-[0_0_0_2px_rgba(229,158,56,0.5)] transition-all shadow-lg"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-24 top-1/2 -translate-y-1/2 text-cream-muted hover:text-cream-text p-2"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          )}
          <button className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-primary-container text-on-primary-container px-5 py-2.5 rounded-lg font-label-md text-label-md hover:bg-tertiary-container hover:text-on-tertiary-container transition-all flex items-center gap-1.5 shadow-md">
            <span>Tra Cứu</span>
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>

        {/* Trending Search Keywords Chips */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-cream-muted flex items-center gap-1 mr-1">
            <span className="material-symbols-outlined text-sm text-copper-accent">trending_up</span> 
            Xu Hướng:
          </span>
          {TRENDING_SEARCHES.map((trend) => (
            <button
              key={trend}
              onClick={() => { setSearchTerm(trend); handleFilterChange(); }}
              className="px-3 py-1.5 bg-surface-smoke hover:bg-primary/20 text-cream-text hover:text-primary rounded-full font-label-sm text-label-sm transition-all flex items-center gap-1.5"
            >
              <span>{trend}</span>
              <span className="material-symbols-outlined text-xs text-cream-muted">north_east</span>
            </button>
          ))}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-thin">
          {categories.map((cat) => {
            const count = categoryCounts[cat.key] || 0;
            const isSelected = selectedCategory === cat.key;
            
            return (
            <button
              key={cat.key}
              onClick={() => { setSelectedCategory(cat.key); handleFilterChange(); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-primary-container text-on-primary-container shadow-md scale-105'
                  : 'bg-surface-slate text-cream-text hover:bg-surface-smoke hover:shadow-sm'
              }`}
            >
                <span>{CATEGORY_ICONS[cat.key] || '📝'}</span>
                <span className="font-label-sm text-label-sm">{cat.label}</span>
                {count > 0 && (
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    isSelected 
                      ? 'bg-surface-obsidian/20' 
                      : 'bg-surface-smoke'
                  }`}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Sort & View Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <span className="font-label-sm text-label-sm text-cream-muted">Sắp xếp:</span>
            <div className="flex items-center gap-1 bg-surface-slate rounded-lg p-1">
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.key}
                  onClick={() => { setSortBy(opt.key); handleFilterChange(); }}
                  className={`px-3 py-1.5 rounded-md font-label-sm text-label-sm transition-all flex items-center gap-1.5 ${
                    sortBy === opt.key
                      ? 'bg-primary-container text-on-primary-container'
                      : 'text-cream-muted hover:text-cream-text hover:bg-surface-smoke'
                  }`}
                >
                  <span className="material-symbols-outlined text-sm">{opt.icon}</span>
                  <span className="hidden sm:inline">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-cream-muted font-label-md text-label-md">
              {filteredNotes.length} công thức
            </span>
            
            {/* Items Per Page Selector */}
            <div className="flex items-center gap-2">
              <span className="text-cream-muted text-sm hidden sm:inline">Hiển thị:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => { setItemsPerPage(Number(e.target.value)); handleFilterChange(); }}
                className="bg-surface-slate text-cream-text text-sm px-3 py-1.5 rounded-lg border border-surface-smoke focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
              >
                {ITEMS_PER_PAGE_OPTIONS.map(opt => (
                  <option key={opt.key} value={opt.key}>{opt.label}</option>
                ))}
              </select>
            </div>
            
            <div className="flex items-center gap-1 bg-surface-slate rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'grid' ? 'bg-primary-container text-on-primary-container' : 'text-cream-muted hover:text-cream-text'
                }`}
              >
                <span className="material-symbols-outlined">grid_view</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${
                  viewMode === 'list' ? 'bg-primary-container text-on-primary-container' : 'text-cream-muted hover:text-cream-text'
                }`}
              >
                <span className="material-symbols-outlined">view_list</span>
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {filteredNotes.length === 0 ? (
          <div className="text-center py-20 bg-surface-slate rounded-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-surface-smoke/50 to-transparent"></div>
            <div className="relative">
              <span className="text-7xl mb-6 block">🔍</span>
              <h3 className="font-headline-md text-headline-md text-cream-text mb-3">Không Tìm Thấy</h3>
              <p className="font-body-md text-cream-muted mb-6">
                Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc danh mục
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  handleFilterChange();
                }}
                className="bg-primary-container text-on-primary-container px-6 py-3 rounded-lg font-label-md inline-flex items-center gap-2 hover:bg-tertiary-container transition-all"
              >
                <span className="material-symbols-outlined">refresh</span>
                Đặt Lại Bộ Lọc
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Page Info */}
            <div className="text-sm text-cream-muted mb-4">
              Hiển thị {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredNotes.length)} của {filteredNotes.length} công thức
            </div>

            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {paginatedNotes.map((note) => (
                  <NoteCard key={note.id} note={note} />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {paginatedNotes.map((note) => (
                  <div
                    key={note.id}
                    onClick={() => navigate(`/note/${note.id}`)}
                    className="bg-surface-slate rounded-xl p-4 flex gap-4 cursor-pointer hover:bg-surface-smoke hover:shadow-lg transition-all"
                  >
                    <div className="w-20 h-20 rounded-lg bg-surface-smoke flex items-center justify-center text-4xl shrink-0">
                      {CATEGORY_ICONS[note.category] || '📝'}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs uppercase text-primary font-label-sm">{t(`categories.${note.category}`)}</span>
                        {note.avg_rating && (
                          <span className="flex items-center gap-1 text-xs text-amber-vibrant">
                            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                            {note.avg_rating}
                          </span>
                        )}
                      </div>
                      <h3 className="font-headline-md text-headline-md text-cream-text mb-1">{note.title}</h3>
                      <p className="text-sm text-on-surface-variant line-clamp-2">{note.description}</p>
                      <div className="flex items-center gap-4 mt-2 text-cream-muted text-sm">
                        {note.prep_time && (
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm text-copper-accent">schedule</span>
                            {note.prep_time} phút
                          </span>
                        )}
                        {note.ingredients && (
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-sm text-primary">list</span>
                            {note.ingredients.length} nguyên liệu
                          </span>
                        )}
                      </div>
                    </div>
                    <button className="self-center p-3 rounded-lg bg-surface-smoke text-cream-muted hover:text-primary hover:bg-primary-container hover:text-on-primary-container transition-all">
                      <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </div>
    </div>
  );
}
