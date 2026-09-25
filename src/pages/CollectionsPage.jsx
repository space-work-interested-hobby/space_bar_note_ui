import { useState, useMemo, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useNotes } from '../hooks/useNotes';
import { useCollections } from '../hooks/useCollections';
import { useCollectionsBackend } from '../hooks/useCollectionsBackend';
import { useI18n } from '../i18n';
import Pagination from '../components/Pagination';
import {
  mockCollections,
  mockSystemCollections,
  featuredArchive,
  FILTER_TABS,
  COLLECTION_CATEGORIES,
  FILTER_OPTIONS,
} from '../lib/collectionsData';

// ============================================================
// ICONS COMPONENTS
// ============================================================
const Icon = ({ name, filled = false, className = '' }) => (
  <span
    className={`material-symbols-outlined ${className}`}
    style={filled ? { fontVariationSettings: "'FILL' 1" } : {}}
  >
    {name}
  </span>
);

// ============================================================
// MODAL COMPONENT - TẠO BỘ SƯU TẬP MỚI
// ============================================================
function CreateCollectionModal({ isOpen, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: 'cocktail',
    privacy: 'public',
  });

  const handleSave = () => {
    if (formData.name.trim()) {
      onSave(formData);
      setFormData({ name: '', description: '', category: 'cocktail', privacy: 'public' });
      onClose();
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-[#17191F] w-full max-w-xl rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-fade-in-scale">
        {/* Modal Header */}
        <div className="p-6 bg-[#2A2E37] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#e59e38] text-[#5c3900] flex items-center justify-center">
              <Icon name="create_new_folder" />
            </div>
            <div className="flex flex-col">
              <h3 className="text-[24px] font-medium text-[#F8F5EE] font-serif">Tạo Bộ Sưu Tập Mới</h3>
              <span className="text-[11px] text-[#D97736] uppercase tracking-wider">
                Atelier Spirits Curated Archive
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#C5C0B0] hover:text-[#F8F5EE] transition-colors p-1 cursor-pointer"
          >
            <Icon name="close" className="text-2xl" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 flex flex-col gap-4 overflow-y-auto">
          {/* Collection Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[14px] text-[#F8F5EE]">
              Tên bộ sưu tập <span className="text-[#ffbb60]">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Ví dụ: Signature Bourbon Mùa Thu, Bánh Ngọt Trà Chiều..."
              className="w-full bg-[#0F1115] text-[#F8F5EE] text-[15px] px-4 py-3 rounded-lg placeholder:text-[#C5C0B0] focus:outline-none focus:ring-1 focus:ring-[#e59e38]"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[14px] text-[#F8F5EE]">Mô tả & Triết lý phối vị</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Chia sẻ cảm hứng, câu chuyện hoặc lưu ý về hương vị của tuyển tập này..."
              rows={3}
              className="w-full bg-[#0F1115] text-[#F8F5EE] text-[15px] p-4 rounded-lg placeholder:text-[#C5C0B0] focus:outline-none focus:ring-1 focus:ring-[#e59e38] resize-none"
            />
          </div>

          {/* Primary Category */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[14px] text-[#F8F5EE]">Danh mục trọng tâm</label>
            <div className="grid grid-cols-3 gap-2">
              {COLLECTION_CATEGORIES.map((cat) => (
                <label
                  key={cat.key}
                  className={`flex items-center gap-2 p-3 bg-[#0F1115] rounded-lg cursor-pointer transition-colors ${
                    formData.category === cat.key
                      ? 'ring-2 ring-[#e59e38] bg-[#2A2E37]'
                      : 'hover:bg-[#2A2E37]'
                  }`}
                >
                  <input
                    type="radio"
                    name="category"
                    value={cat.key}
                    checked={formData.category === cat.key}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="sr-only"
                  />
                  <span className="text-[13px] text-[#F8F5EE]">{cat.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Privacy Setting */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[14px] text-[#F8F5EE]">Chế độ hiển thị</label>
            <div className="flex items-center gap-6 p-3 bg-[#0F1115] rounded-lg">
              <label className="flex items-center gap-2 cursor-pointer flex-1">
                <input
                  type="radio"
                  name="privacy"
                  value="public"
                  checked={formData.privacy === 'public'}
                  onChange={(e) => setFormData({ ...formData, privacy: e.target.value })}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    formData.privacy === 'public' ? 'border-[#e59e38]' : 'border-[#C5C0B0]'
                  }`}
                >
                  {formData.privacy === 'public' && (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#e59e38]" />
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] text-[#F8F5EE] flex items-center gap-1 font-semibold">
                    <Icon name="public" className="text-xs text-[#ffbb60]" />
                    Công khai
                  </span>
                  <span className="text-[11px] text-[#C5C0B0]">
                    Hiển thị trên thư viện khám phá toàn Atelier
                  </span>
                </div>
              </label>
              <label className="flex items-center gap-2 cursor-pointer flex-1">
                <input
                  type="radio"
                  name="privacy"
                  value="private"
                  checked={formData.privacy === 'private'}
                  onChange={(e) => setFormData({ ...formData, privacy: e.target.value })}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    formData.privacy === 'private' ? 'border-[#ffb68c]' : 'border-[#C5C0B0]'
                  }`}
                >
                  {formData.privacy === 'private' && (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ffb68c]" />
                  )}
                </div>
                <div className="flex flex-col">
                  <span className="text-[13px] text-[#F8F5EE] flex items-center gap-1 font-semibold">
                    <Icon name="lock" className="text-xs text-[#ffb68c]" />
                    Riêng tư
                  </span>
                  <span className="text-[11px] text-[#C5C0B0]">
                    Chỉ mình bạn xem và sử dụng trên trạm bar
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 bg-[#2A2E37] flex items-center justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-lg bg-[#17191F] text-[#C5C0B0] hover:text-[#F8F5EE] text-[14px] transition-colors cursor-pointer"
          >
            Hủy bỏ
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-lg bg-[#e59e38] text-[#5c3900] text-[14px] hover:bg-[#e0a131] shadow-[0_4px_16px_rgba(229,158,56,0.3)] transition-all cursor-pointer flex items-center gap-2 font-semibold"
          >
            <Icon name="check" />
            <span>Lưu Bộ Sưu Tập</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// COLLECTION CARD COMPONENT
// ============================================================
function CollectionCard({ collection, variant = 'default', onBookmark, onEdit, onOpen }) {
  const navigate = useNavigate();
  const isSystemCard = variant === 'system';

  const handleOpen = () => {
    if (onOpen) {
      onOpen(collection);
    } else {
      navigate(`/collections/${collection.id}`);
    }
  };

  const getBadgeStyles = (badgeColor) => {
    switch (badgeColor) {
      case 'primary':
        return 'bg-[#e59e38] text-[#5c3900]';
      case 'secondary':
        return 'bg-[#964400] text-[#ffcaac]';
      default:
        return 'bg-[#2A2E37] text-[#F8F5EE]';
    }
  };

  return (
    <div
      className={`group flex flex-col bg-[#17191F] rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ${
        isSystemCard ? 'cursor-pointer' : ''
      }`}
      onClick={handleOpen}
    >
      {/* Image Section */}
      <div className="relative w-full h-56 overflow-hidden">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          src={collection.imageUrl || collection.cover_image || 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&q=80'}
          alt={collection.imageAlt || collection.title}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#17191F] via-[#17191F]/20 to-transparent" />

        {/* Top Left Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          {isSystemCard && collection.badge ? (
            <span
              className={`px-2.5 py-1 rounded-full text-[11px] flex items-center gap-1 font-semibold shadow-sm ${getBadgeStyles(
                collection.badgeColor
              )}`}
            >
              <Icon name={collection.badgeColor === 'primary' ? 'verified' : 'local_cafe'} className="text-xs" />
              {collection.badge}
            </span>
          ) : collection.is_public || collection.privacy === 'public' ? (
            <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-[11px] text-[#ffbb60] flex items-center gap-1">
              <Icon name="public" className="text-xs" />
              Công khai
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-[11px] text-[#ffdbc9] flex items-center gap-1">
              <Icon name="lock" className="text-xs" />
              Riêng tư
            </span>
          )}
          <span className="px-2.5 py-1 rounded-full bg-black/75 backdrop-blur-md text-[11px] text-[#F8F5EE]">
            {collection.recipeCount || collection.recipe_count || 0} Công thức
          </span>
        </div>

        {/* Top Right Actions */}
        <div className="absolute top-3 right-3 flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onBookmark?.(collection.id);
            }}
            className={`w-8 h-8 rounded-full bg-black/70 backdrop-blur-md flex items-center justify-center transition-colors cursor-pointer ${
              collection.isBookmarked ? 'text-[#ffbb60]' : 'text-[#C5C0B0]'
            }`}
            title="Lưu yêu thích"
          >
            <Icon name="bookmark" filled={collection.isBookmarked} />
          </button>
          {!isSystemCard && (
            <button
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="w-8 h-8 rounded-full bg-black/70 backdrop-blur-md flex items-center justify-center text-[#C5C0B0] hover:text-[#F8F5EE] transition-colors cursor-pointer"
              title="Menu thao tác"
            >
              <Icon name="more_vert" />
            </button>
          )}
        </div>

        {/* Bottom Info */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[#C5C0B0] text-[13px]">
          {isSystemCard ? (
            <div className="flex items-center gap-2">
              <img
                className="w-6 h-6 rounded-full object-cover"
                src={collection.author?.avatar || 'https://via.placeholder.com/24'}
                alt={collection.author?.name}
              />
              <span className="text-[#F8F5EE] font-medium">{collection.author?.name}</span>
            </div>
          ) : (collection.viewCount || 0) > 0 ? (
            <span className="flex items-center gap-1 text-[#D97736]">
              <Icon name="visibility" className="text-sm" />
              {collection.viewCount.toLocaleString()} lượt xem
            </span>
          ) : !collection.is_public && collection.privacy === 'private' ? (
            <span className="flex items-center gap-1">
              <Icon name="lock_person" className="text-sm" />
              Chỉ mình bạn
            </span>
          ) : null}
          <span className="text-[11px] text-[#C5C0B0]">
            {collection.updatedAt || collection.updated_at || ''}
          </span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-4">
        <div className="flex flex-col gap-2">
          <h3 className="text-[24px] text-[#F8F5EE] group-hover:text-[#ffbb60] transition-colors font-serif leading-tight">
            {collection.name || collection.title}
          </h3>
          <p className="text-[15px] text-[#C5C0B0] line-clamp-2 leading-relaxed">
            {collection.description || ''}
          </p>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {(collection.tags || []).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-0.5 rounded bg-[#2A2E37] text-[11px] text-[#F8F5EE]"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Row */}
        <div className="pt-4 flex items-center justify-between bg-[#0F1115]/40 -mx-4 -mb-4 p-4 mt-2">
          {isSystemCard ? (
            <>
              <span className="text-[11px] text-[#C5C0B0] uppercase tracking-wider">
                Hồ sơ #{collection.profileId}
              </span>
              <button 
                onClick={(e) => { e.stopPropagation(); navigate(`/profile/${collection.profileId}`); }}
                className="px-4 py-2 rounded-lg bg-[#2A2E37] text-[#F8F5EE] hover:bg-[#e59e38] hover:text-[#5c3900] transition-all flex items-center gap-1 text-[14px] cursor-pointer"
              >
                <span>Mở tuyển tập</span>
                <Icon name="menu_book" className="text-sm" />
              </button>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <img
                  className="w-6 h-6 rounded-full object-cover"
                  src={collection.author?.avatar || 'https://via.placeholder.com/24'}
                  alt={collection.author?.name}
                />
                <span className="text-[13px] text-[#C5C0B0] truncate max-w-[100px]">
                  {collection.author?.name || 'Minh Quân'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {onEdit && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(collection);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#2A2E37] text-[#F8F5EE] hover:bg-[#373940] transition-colors text-[11px] cursor-pointer"
                  >
                    Chỉnh sửa
                  </button>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleOpen();
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#e59e38] text-[#5c3900] hover:bg-[#e0a131] transition-colors text-[11px] cursor-pointer flex items-center gap-1"
                >
                  <span>{collection.category === 'coffee' ? 'Mở Bar Mode' : 'Mở Bar Mode'}</span>
                  <Icon name={collection.category === 'coffee' ? 'coffee' : 'local_bar'} className="text-xs" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// FEATURED ARCHIVE STRIP
// ============================================================
function FeaturedArchiveStrip() {
  const navigate = useNavigate();
  
  return (
    <div className="relative w-full bg-[#17191F] rounded-lg p-6 overflow-hidden shadow-xl mb-8">
      {/* Background Gradient */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-20 pointer-events-none hidden md:block">
        <div className="w-full h-full bg-gradient-to-r from-[#17191F] via-transparent to-[#ffbb60]/20" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
        {/* Content */}
        <div className="lg:col-span-8 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-[#D97736]/20 text-[#D97736] text-[11px] uppercase tracking-wider font-semibold">
              {featuredArchive.subtitle}
            </span>
            <span className="text-[13px] text-[#C5C0B0]">• {featuredArchive.updateInfo}</span>
          </div>
          <h3 className="text-[36px] text-[#F8F5EE] font-serif">
            {featuredArchive.title}
          </h3>
          <p className="text-[15px] text-[#C5C0B0] max-w-2xl leading-relaxed">
            {featuredArchive.description}
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button 
              onClick={() => navigate('/collections/featured')}
              className="bg-[#e59e38] text-[#5c3900] px-6 py-2.5 rounded-lg text-[14px] hover:bg-[#e0a131] transition-all cursor-pointer flex items-center gap-2 shadow-md"
            >
              <span>Khám phá tuyển tập chuyên sâu</span>
              <Icon name="arrow_forward" />
            </button>
            <div className="flex items-center gap-3 text-[#C5C0B0] text-[13px]">
              <span className="flex items-center gap-1">
                <Icon name="science" className="text-[#ffbb60] text-base" />
                {featuredArchive.recipeCount} Công thức Lab
              </span>
              <span className="flex items-center gap-1">
                <Icon name="timer" className="text-[#D97736] text-base" />
                {featuredArchive.prepTime}
              </span>
            </div>
          </div>
        </div>

        {/* SVG Infographic */}
        <div className="lg:col-span-4 flex items-center justify-center">
          <div className="w-48 h-48 relative flex items-center justify-center bg-[#0F1115]/80 rounded-full shadow-inner p-4">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              {/* Background Circle */}
              <circle
                className="text-[#2A2E37]"
                cx="50"
                cy="50"
                fill="transparent"
                r="42"
                stroke="currentColor"
                strokeWidth="6"
              />
              {/* Progress Circle */}
              <circle
                className="text-[#e59e38]"
                cx="50"
                cy="50"
                fill="transparent"
                r="42"
                stroke="currentColor"
                strokeDasharray="264"
                strokeDashoffset={264 - (264 * featuredArchive.clarityPercent) / 100}
                strokeLinecap="round"
                strokeWidth="6"
              />
              {/* Inner Circle */}
              <circle
                className="text-[#D97736]"
                cx="50"
                cy="50"
                fill="transparent"
                r="32"
                stroke="currentColor"
                strokeDasharray="200"
                strokeDashoffset={200 - (200 * 70) / 100}
                strokeLinecap="round"
                strokeWidth="3"
              />
            </svg>
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-[24px] text-[#F8F5EE] font-bold">
                {featuredArchive.clarityPercent}%
              </span>
              <span className="text-[11px] text-[#C5C0B0] uppercase">
                Độ trong tinh khiết
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// SECTION HEADER COMPONENT
// ============================================================
function SectionHeader({ icon, title, subtitle, actionLabel, onAction }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-lg bg-[#17191F] flex items-center justify-center shadow-sm text-[#ffbb60]">
          <Icon name={icon} />
        </div>
        <div className="flex flex-col">
          <h2 className="text-[24px] text-[#F8F5EE] font-serif">{title}</h2>
          <span className="text-[13px] text-[#C5C0B0]">{subtitle}</span>
        </div>
      </div>
      {actionLabel && (
        <button
          onClick={onAction}
          className="text-[14px] text-[#ffbb60] hover:text-[#ffddaf] flex items-center gap-1 transition-colors"
        >
          <span>{actionLabel}</span>
          <Icon name="tune" />
        </button>
      )}
    </div>
  );
}

// ============================================================
// FILTER PANEL COMPONENT - SEARCH & FILTER
// ============================================================
function FilterPanel({ searchQuery, onSearchChange, selectedFilters, onFilterChange, resultCount }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleCheckboxChange = (category, itemId) => {
    const currentSelection = selectedFilters[category] || [];
    const newSelection = currentSelection.includes(itemId)
      ? currentSelection.filter((id) => id !== itemId)
      : [...currentSelection, itemId];
    onFilterChange({ ...selectedFilters, [category]: newSelection });
  };

  const clearAllFilters = () => {
    onFilterChange({});
    onSearchChange('');
  };

  const activeFilterCount = Object.values(selectedFilters).flat().length;

  return (
    <div className="bg-[#17191F] rounded-lg overflow-hidden shadow-md mb-8">
      {/* Search Bar */}
      <div className="p-4 border-b border-[#2A2E37]">
        <div className="relative">
          <Icon name="search" className="absolute left-4 top-1/2 -translate-y-1/2 text-[#C5C0B0]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Tìm kiếm bộ sưu tập..."
            className="w-full bg-[#0F1115] text-[#F8F5EE] text-[15px] pl-12 pr-4 py-3 rounded-lg placeholder:text-[#C5C0B0] focus:outline-none focus:ring-1 focus:ring-[#e59e38]"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#C5C0B0] hover:text-[#F8F5EE]"
            >
              <Icon name="close" className="text-lg" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full p-4 flex items-center justify-between hover:bg-[#2A2E37]/30 transition-colors"
      >
        <div className="flex items-center gap-2">
          <Icon name="tune" className="text-[#ffbb60]" />
          <span className="text-[14px] text-[#F8F5EE] font-medium">Bộ lọc nâng cao</span>
          {activeFilterCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-[#e59e38] text-[#5c3900] text-[11px] font-semibold">
              {activeFilterCount}
            </span>
          )}
        </div>
        <Icon name={isExpanded ? 'expand_less' : 'expand_more'} className="text-[#C5C0B0]" />
      </button>

      {/* Expanded Filter Options */}
      {isExpanded && (
        <div className="p-4 pt-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Chủ đề */}
          <div className="flex flex-col gap-2">
            <h4 className="text-[13px] text-[#ffbb60] font-semibold uppercase tracking-wider flex items-center gap-1">
              <Icon name="topic" className="text-sm" />
              Chủ đề
            </h4>
            <div className="flex flex-col gap-1.5 max-h-40 overflow-y-auto custom-scrollbar">
              {FILTER_OPTIONS.topics.map((item) => (
                <label
                  key={item.id}
                  className="flex items-center gap-2 p-2 rounded hover:bg-[#0F1115] cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={(selectedFilters.topics || []).includes(item.id)}
                    onChange={() => handleCheckboxChange('topics', item.id)}
                    className="w-4 h-4 rounded border-[#C5C0B0] text-[#e59e38] focus:ring-[#e59e38] focus:ring-offset-0 bg-[#0F1115]"
                  />
                  <span className="text-[13px] text-[#F8F5EE] flex-1">{item.label}</span>
                  <span className="text-[11px] text-[#C5C0B0]">({item.count})</span>
                </label>
              ))}
            </div>
          </div>

          {/* Danh mục */}
          <div className="flex flex-col gap-2">
            <h4 className="text-[13px] text-[#ffbb60] font-semibold uppercase tracking-wider flex items-center gap-1">
              <Icon name="category" className="text-sm" />
              Danh mục
            </h4>
            <div className="flex flex-col gap-1.5 max-h-40 overflow-y-auto custom-scrollbar">
              {FILTER_OPTIONS.categories.map((item) => (
                <label
                  key={item.id}
                  className="flex items-center gap-2 p-2 rounded hover:bg-[#0F1115] cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={(selectedFilters.categories || []).includes(item.id)}
                    onChange={() => handleCheckboxChange('categories', item.id)}
                    className="w-4 h-4 rounded border-[#C5C0B0] text-[#e59e38] focus:ring-[#e59e38] focus:ring-offset-0 bg-[#0F1115]"
                  />
                  <span className="text-[13px] text-[#F8F5EE] flex-1">{item.label}</span>
                  <span className="text-[11px] text-[#C5C0B0]">({item.count})</span>
                </label>
              ))}
            </div>
          </div>

          {/* Hương vị */}
          <div className="flex flex-col gap-2">
            <h4 className="text-[13px] text-[#ffbb60] font-semibold uppercase tracking-wider flex items-center gap-1">
              <Icon name="bubble_chart" className="text-sm" />
              Hương vị
            </h4>
            <div className="flex flex-col gap-1.5 max-h-40 overflow-y-auto custom-scrollbar">
              {FILTER_OPTIONS.flavors.map((item) => (
                <label
                  key={item.id}
                  className="flex items-center gap-2 p-2 rounded hover:bg-[#0F1115] cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={(selectedFilters.flavors || []).includes(item.id)}
                    onChange={() => handleCheckboxChange('flavors', item.id)}
                    className="w-4 h-4 rounded border-[#C5C0B0] text-[#e59e38] focus:ring-[#e59e38] focus:ring-offset-0 bg-[#0F1115]"
                  />
                  <span className="text-[13px] text-[#F8F5EE] flex-1">{item.label}</span>
                  <span className="text-[11px] text-[#C5C0B0]">({item.count})</span>
                </label>
              ))}
            </div>
          </div>

          {/* Độ khó */}
          <div className="flex flex-col gap-2">
            <h4 className="text-[13px] text-[#ffbb60] font-semibold uppercase tracking-wider flex items-center gap-1">
              <Icon name="speed" className="text-sm" />
              Độ khó
            </h4>
            <div className="flex flex-col gap-1.5 max-h-40 overflow-y-auto custom-scrollbar">
              {FILTER_OPTIONS.difficulty.map((item) => (
                <label
                  key={item.id}
                  className="flex items-center gap-2 p-2 rounded hover:bg-[#0F1115] cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={(selectedFilters.difficulty || []).includes(item.id)}
                    onChange={() => handleCheckboxChange('difficulty', item.id)}
                    className="w-4 h-4 rounded border-[#C5C0B0] text-[#e59e38] focus:ring-[#e59e38] focus:ring-offset-0 bg-[#0F1115]"
                  />
                  <span className="text-[13px] text-[#F8F5EE] flex-1">{item.label}</span>
                  <span className="text-[11px] text-[#C5C0B0]">({item.count})</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Filter Footer */}
      {isExpanded && (
        <div className="p-4 pt-2 border-t border-[#2A2E37] flex items-center justify-between">
          <span className="text-[13px] text-[#C5C0B0]">
            Tìm thấy <span className="text-[#ffbb60] font-semibold">{resultCount}</span> bộ sưu tập
          </span>
          {activeFilterCount > 0 && (
            <button
              onClick={clearAllFilters}
              className="text-[13px] text-[#D97736] hover:text-[#ffb68c] flex items-center gap-1 transition-colors"
            >
              <Icon name="clear_all" className="text-sm" />
              Xóa tất cả bộ lọc
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ============================================================
// MAIN COLLECTIONS PAGE
// ============================================================
export default function CollectionsPage() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const { notes } = useNotes();
  const { collections, addCollection } = useCollections();
  const {
    collections: backendCollections,
    myCollections: backendMyCollections,
    systemCollections: backendSystemCollections,
    isLoading,
    createCollection: createBackendCollection,
    deleteCollection: deleteBackendCollection,
    toggleBookmark,
  } = useCollectionsBackend();

  // State
  const [activeTab, setActiveTab] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilters, setSelectedFilters] = useState({});
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  
  // Use backend data if available, otherwise use mock data
  const [userCollections, setUserCollections] = useState(mockCollections);

  // Sync user collections with backend data
  useEffect(() => {
    if (backendMyCollections && backendMyCollections.length > 0) {
      // Map backend data to match mock format
      const mapped = backendMyCollections.map(c => ({
        id: c.id,
        name: c.title,
        title: c.title,
        description: c.description,
        cover_image: c.cover_image,
        imageUrl: c.cover_image,
        imageAlt: c.title,
        category: 'cocktail',
        privacy: c.is_public ? 'public' : 'private',
        is_public: c.is_public,
        recipeCount: c.recipeCount || 0,
        viewCount: 0,
        updatedAt: new Date(c.updated_at).toLocaleDateString('vi-VN'),
        author: {
          name: c.author_name || 'Minh Quân',
          avatar: 'https://via.placeholder.com/24',
        },
        tags: [],
        isBookmarked: false,
      }));
      setUserCollections(mapped);
    }
  }, [backendMyCollections]);

  // Computed values
  const totalRecipesAvailable = notes.length;
  const isOnline = true;

  // Filter collections based on active tab, search query, and filters
  const filteredUserCollections = useMemo(() => {
    let filtered = userCollections;

    // Filter by tab
    switch (activeTab) {
      case 'mine':
        filtered = filtered.filter((c) => c.author?.name === 'Minh Quân');
        break;
      case 'popular':
        filtered = [...filtered, ...mockSystemCollections].sort(
          (a, b) => (b.viewCount || b.savedCount || 0) - (a.viewCount || a.savedCount || 0)
        );
        break;
      default:
        break;
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (c) =>
          c.name?.toLowerCase().includes(query) ||
          c.title?.toLowerCase().includes(query) ||
          c.description?.toLowerCase().includes(query) ||
          c.tags?.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Filter by selected filters
    if (selectedFilters.categories?.length > 0) {
      filtered = filtered.filter((c) => selectedFilters.categories.includes(c.category));
    }
    if (selectedFilters.topics?.length > 0) {
      filtered = filtered.filter((c) =>
        c.tags?.some((tag) => {
          const tagLower = tag.toLowerCase();
          return selectedFilters.topics.some(
            (topic) =>
              (topic === 'classic' && (tagLower.includes('classic') || tagLower.includes('cổ điển'))) ||
              (topic === 'modern' && (tagLower.includes('modern') || tagLower.includes('hiện đại') || tagLower.includes('sáng tạo'))) ||
              (topic === 'tropical' && tagLower.includes('nhiệt đới')) ||
              (topic === 'party' && tagLower.includes('party'))
          );
        })
      );
    }

    return filtered;
  }, [activeTab, userCollections, searchQuery, selectedFilters]);

  // Pagination for user collections
  const paginatedUserCollections = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredUserCollections.slice(startIndex, endIndex);
  }, [filteredUserCollections, currentPage, itemsPerPage]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, searchQuery, selectedFilters]);

  // Combined collections with filters applied
  const allFilteredCollections = useMemo(() => {
    if (activeTab === 'popular') return filteredUserCollections;
    return filteredUserCollections;
  }, [filteredUserCollections, activeTab]);

  // Handlers
  const handleCreateCollection = useCallback(async (formData) => {
    // Try to create in backend
    try {
      if (createBackendCollection) {
        await createBackendCollection(formData);
      }
    } catch (err) {
      console.log('Backend collection creation failed, using local:', err);
    }

    // Also update local state for immediate feedback
    const newCollection = {
      id: `my-${Date.now()}`,
      name: formData.name,
      title: formData.name,
      description: formData.description,
      category: formData.category,
      privacy: formData.privacy,
      is_public: formData.privacy === 'public',
      recipeCount: 0,
      viewCount: 0,
      updatedAt: 'Vừa tạo',
      author: {
        name: 'Minh Quân',
        avatar: 'https://via.placeholder.com/24',
      },
      tags: [],
      isBookmarked: false,
      imageUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&q=80',
      imageAlt: formData.name,
    };
    setUserCollections((prev) => [newCollection, ...prev]);
  }, [createBackendCollection]);

  const handleBookmark = useCallback((collectionId) => {
    // Toggle bookmark locally
    setUserCollections((prev) =>
      prev.map((c) => (c.id === collectionId ? { ...c, isBookmarked: !c.isBookmarked } : c))
    );
    
    // Also toggle in mockSystemCollections
    const idx = mockSystemCollections.findIndex((c) => c.id === collectionId);
    if (idx !== -1) {
      mockSystemCollections[idx].isBookmarked = !mockSystemCollections[idx].isBookmarked;
    }
    
    // Try backend
    if (toggleBookmark) {
      toggleBookmark(collectionId).catch(console.error);
    }
  }, [toggleBookmark]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#e59e38] border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="w-full bg-[#0F1115] min-h-screen">
      {/* Subtle Ambient Glow Orbs */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute -top-32 left-1/4 w-96 h-96 bg-[#ffbb60]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-80 right-10 w-80 h-80 bg-[#D97736]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 py-10">
          {/* Top Editorial Banner & Controls */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-10">
            <div className="flex flex-col gap-2 max-w-2xl">
              <div className="flex items-center gap-3">
                <div className="w-8 h-[2px] bg-[#e59e38]" />
                <span className="text-[11px] uppercase tracking-widest text-[#ffbb60]">
                  Archival Dossier & Anthologies
                </span>
              </div>
              <h1 className="text-[56px] text-[#F8F5EE] tracking-tight font-serif leading-tight">
                Bộ Sưu Tập Hương Vị
              </h1>
              <p className="text-[18px] text-[#C5C0B0] leading-relaxed">
                Khám phá và lưu trữ các tuyển tập công thức độc bản theo chủ đề, cảm xúc và các mùa hương vị trong năm của
                Atelier Spirits & Brew.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center gap-2 bg-[#e59e38] text-[#5c3900] text-[14px] px-5 py-3 rounded-lg hover:bg-[#e0a131] shadow-[0_12px_24px_-6px_rgba(229,158,56,0.3)] transition-all cursor-pointer"
              >
                <Icon name="add_box" />
                <span>Tạo Bộ Sưu Tập Mới</span>
              </button>
              <button 
                onClick={() => window.print()} 
                className="flex items-center gap-2 bg-[#17191F] text-[#F8F5EE] text-[14px] px-4 py-3 rounded-lg hover:bg-[#2A2E37] shadow-sm transition-all cursor-pointer"
              >
                <Icon name="print" className="text-base text-[#ffbb60]" />
                <span className="hidden sm:inline">Xuất Sổ Trạm Bar</span>
              </button>
            </div>
          </div>

          {/* Filter Tabs & Meta Counters */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-2 mb-8">
            <div className="flex items-center gap-1.5 p-1 bg-[#17191F] rounded-lg overflow-x-auto">
              {FILTER_TABS.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-2 rounded-lg text-[14px] transition-all whitespace-nowrap cursor-pointer ${
                    activeTab === tab.key
                      ? 'bg-[#2A2E37] text-[#ffbb60]'
                      : 'text-[#C5C0B0] hover:text-[#F8F5EE]'
                  }`}
                >
                  {tab.label}
                  {tab.count && ` (${tab.count})`}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4 text-[#C5C0B0] text-[13px]">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#e59e38]" />
                <span>{totalRecipesAvailable} Bản phối khả dụng</span>
              </div>
              <span className="opacity-30">•</span>
              <div className="flex items-center gap-1.5">
                <Icon name="sync_saved_locally" className="text-sm text-[#D97736]" />
                <span>Đồng bộ trạm: {isOnline ? 'Trực tuyến' : 'Offline'}</span>
              </div>
            </div>
          </div>

          {/* FILTER PANEL - SEARCH & ADVANCED FILTERS */}
          <FilterPanel
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedFilters={selectedFilters}
            onFilterChange={setSelectedFilters}
            resultCount={filteredUserCollections.length}
          />

          {/* SECTION 1: BỘ SƯU TẬP CỦA TÔI */}
          <div className="flex flex-col gap-6 mb-8">
            <SectionHeader
              icon="folder_special"
              title="Bộ Sưu Tập Của Tôi"
              subtitle="Tuyển tập cá nhân đang biên soạn và thực hành pha chế"
              actionLabel="Sắp xếp lại"
              onAction={() => {}}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedUserCollections.map((collection) => (
                <CollectionCard
                  key={collection.id}
                  collection={collection}
                  onBookmark={handleBookmark}
                  onEdit={(c) => console.log('Edit:', c)}
                />
              ))}
            </div>

            {/* Pagination */}
            {filteredUserCollections.length > itemsPerPage && (
              <Pagination
                currentPage={currentPage}
                totalItems={filteredUserCollections.length}
                itemsPerPage={itemsPerPage}
                onPageChange={(page) => {
                  setCurrentPage(page);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="mt-8 border-t border-[#2A2E37] pt-6"
              />
            )}
          </div>

          {/* HIGHLIGHT FEATURED ARCHIVE STRIP */}
          <div className="mt-12">
            <FeaturedArchiveStrip />
          </div>

          {/* SECTION 2: BỘ SƯU TẬP TUYỂN CHỌN HỆ THỐNG */}
          <div className="flex flex-col gap-6">
            <SectionHeader
              icon="verified"
              title="Tuyển Chọn Hệ Thống & Atelier Curated"
              subtitle="Các bộ sưu tập quy chuẩn hóa từ ban cố vấn Mixology và Barista Trưởng"
            />

            <div className="hidden sm:flex items-center gap-2 text-[#C5C0B0] text-[11px] mb-2">
              <span>Tiêu chuẩn: IBA & SCA Global</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockSystemCollections.map((collection) => (
                <CollectionCard
                  key={collection.id}
                  collection={collection}
                  variant="system"
                  onBookmark={handleBookmark}
                />
              ))}
            </div>
          </div>

          {/* BOTTOM DISCOVERY & CURATION FOOTNOTE */}
          <div className="mt-8 p-6 bg-[#17191F] rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Icon name="auto_stories" className="text-3xl text-[#ffbb60]" />
              <div className="flex flex-col">
                <span className="text-[24px] text-[#F8F5EE] font-serif">
                  Bạn muốn xuất bản bộ sưu tập riêng vào hệ thống?
                </span>
                <span className="text-[13px] text-[#C5C0B0]">
                  Gửi tuyển tập của bạn tới hội đồng Atelier Spirits & Brew để được thẩm định và cấp chứng nhận Master.
                </span>
              </div>
            </div>
            <button 
              onClick={() => alert('Tính năng gửi đề xuất giám tuyển đang được phát triển!')}
              className="shrink-0 px-5 py-2.5 bg-[#2A2E37] text-[#F8F5EE] hover:text-[#ffbb60] text-[14px] rounded-lg transition-colors cursor-pointer flex items-center gap-2"
            >
              <span>Gửi đề xuất giám tuyển</span>
              <Icon name="outgoing_mail" className="text-sm" />
            </button>
          </div>
        </div>
      </div>

      {/* MODAL: TẠO BỘ SƯU TẬP MỚI */}
      <CreateCollectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleCreateCollection}
      />
    </div>
  );
}
