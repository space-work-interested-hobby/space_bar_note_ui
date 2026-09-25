import { useState } from 'react';

const BEVERAGE_CATEGORIES = [
  'Signature Speakeasy',
  'Classic Riff',
  'Highball & Fizz',
  'Zero-Proof / Mocktail',
  'Specialty Coffee Cold Drip',
];

const GLASSWARE_OPTIONS = [
  'Nick & Nora Pha Lê 160ml',
  'Coupe Cổ Điển Chân Cao',
  'Old Fashioned / Double Rocks',
  'Highball Pha Lê Cắt Facet',
];

const ICE_OPTIONS = [
  'Đá Khối Clear Ice Cắt Tay 5x5cm',
  'Đá Điêu Khắc Sphere 60mm',
  'Đá Đập Tay Crushed Ice',
  'Rót Thẳng Khỏi Đá (Up / Neat)',
];

const DIFFICULTY_LEVELS = ['Dễ', 'Trung Bình', 'Khó', 'Artisan'];

export default function IdentityCard({
  recipeName,
  subtitle,
  category,
  difficulty,
  timeMinutes,
  timeExtra,
  abv,
  temperature,
  glassware,
  iceType,
  batchCode = '#STU-2025-09',
  onChange,
}) {
  const [selectedCategory, setSelectedCategory] = useState(category || 'Signature Speakeasy');
  const [selectedGlassware, setSelectedGlassware] = useState(glassware || GLASSWARE_OPTIONS[0]);
  const [selectedIce, setSelectedIce] = useState(iceType || ICE_OPTIONS[0]);
  const [selectedDifficulty, setSelectedDifficulty] = useState('Artisan');

  const handleChange = (field, value) => {
    onChange?.({ [field]: value });
  };

  return (
    <div className="p-space-lg rounded-xl bg-surface-slate shadow-sm">
      {/* Card Header */}
      <div className="flex items-center justify-between pb-space-sm">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-copper-accent text-lg">liquor</span>
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-copper-accent">
            Định Danh Đồ Uống
          </span>
        </div>
        <span className="font-label-sm text-label-sm text-cream-muted">Mã Lô: {batchCode}</span>
      </div>

      {/* Recipe Title Inputs */}
      <div className="flex flex-col gap-space-md pt-space-xs">
        {/* Signature Name */}
        <div className="flex flex-col gap-1.5">
          <label className="font-label-sm text-label-sm text-cream-muted uppercase tracking-wider">
            Tên Thức Uống Độc Bản (Signature Name)
          </label>
          <input
            type="text"
            value={recipeName || ''}
            onChange={(e) => handleChange('name', e.target.value)}
            className="w-full bg-surface-obsidian text-cream-text font-headline-lg text-headline-lg px-4 py-2.5 rounded-lg placeholder:text-outline-variant focus:outline-none focus:ring-1 focus:ring-primary-container transition-all"
            placeholder="VD: Midnight Saffron Boulevardier"
          />
        </div>

        {/* Subtitle / Aroma Profile */}
        <div className="flex flex-col gap-1.5">
          <label className="font-label-sm text-label-sm text-cream-muted uppercase tracking-wider">
            Hồ Sơ Hương Vị &amp; Khái Niệm Phụ (Aroma Profile &amp; Subtitle)
          </label>
          <input
            type="text"
            value={subtitle || ''}
            onChange={(e) => handleChange('subtitle', e.target.value)}
            className="w-full bg-surface-obsidian text-cream-text font-body-md text-body-md px-4 py-2 rounded-lg placeholder:text-outline-variant focus:outline-none"
            placeholder="VD: Rye Whiskey ủ nhụy hoa nghệ tây Ba Tư, thảo mộc Amaro..."
          />
        </div>

        {/* Beverage Category Selector Pills */}
        <div className="flex flex-col gap-2 pt-space-xs">
          <label className="font-label-sm text-label-sm text-cream-muted uppercase tracking-wider">
            Phân Loại Dòng Thức Uống (Category)
          </label>
          <div className="flex flex-wrap gap-2">
            {BEVERAGE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  handleChange('category', cat);
                }}
                className={`px-3.5 py-1.5 rounded-full font-label-md text-label-md font-medium transition-colors ${
                  selectedCategory === cat
                    ? 'bg-primary-container text-on-primary-container shadow-sm'
                    : 'bg-surface-smoke hover:bg-surface-container-high text-on-surface-variant'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Metrics 4-Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm pt-space-sm">
          {/* Difficulty */}
          <div className="p-3 rounded-lg bg-surface-obsidian flex flex-col gap-1">
            <span className="font-label-sm text-label-sm text-cream-muted uppercase">Độ Khó</span>
            <div className="flex items-center gap-1 text-primary">
              <span className="material-symbols-outlined text-sm">star</span>
              <span className="material-symbols-outlined text-sm">star</span>
              <span className="material-symbols-outlined text-sm">star</span>
              <span className="font-label-md text-label-md font-medium text-cream-text ml-1">
                {selectedDifficulty}
              </span>
            </div>
          </div>

          {/* Total Time */}
          <div className="p-3 rounded-lg bg-surface-obsidian flex flex-col gap-1">
            <span className="font-label-sm text-label-sm text-cream-muted uppercase">Tổng Thời Gian</span>
            <span className="font-label-md text-label-md text-cream-text">
              {timeMinutes || 5}p{timeExtra ? ` + ${timeExtra}` : ''}
            </span>
          </div>

          {/* ABV */}
          <div className="p-3 rounded-lg bg-surface-obsidian flex flex-col gap-1">
            <span className="font-label-sm text-label-sm text-cream-muted uppercase">Nồng Độ Cồn Ước Tính</span>
            <span className="font-label-md text-label-md text-amber-vibrant">~{abv || 24.8}% ABV</span>
          </div>

          {/* Temperature */}
          <div className="p-3 rounded-lg bg-surface-obsidian flex flex-col gap-1">
            <span className="font-label-sm text-label-sm text-cream-muted uppercase">Nhiệt Độ Rót</span>
            <span className="font-label-md text-label-md text-cream-text">{temperature || '-2°C đến 0°C'}</span>
          </div>
        </div>

        {/* Glassware & Ice Selections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md pt-space-xs">
          {/* Glassware */}
          <div className="flex flex-col gap-1.5">
            <label className="font-label-sm text-label-sm text-cream-muted uppercase tracking-wider">
              Ly Phục Vụ Chuẩn (Glassware)
            </label>
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-surface-obsidian">
              <span className="material-symbols-outlined text-primary text-xl">local_bar</span>
              <select
                value={selectedGlassware}
                onChange={(e) => {
                  setSelectedGlassware(e.target.value);
                  handleChange('glassware', e.target.value);
                }}
                className="w-full bg-transparent text-cream-text font-body-md text-body-md focus:outline-none cursor-pointer"
              >
                {GLASSWARE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt} className="bg-surface-slate text-cream-text">
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Ice Architecture */}
          <div className="flex flex-col gap-1.5">
            <label className="font-label-sm text-label-sm text-cream-muted uppercase tracking-wider">
              Cấu Trúc Đá (Ice Architecture)
            </label>
            <div className="flex items-center gap-2 p-2.5 rounded-lg bg-surface-obsidian">
              <span className="material-symbols-outlined text-copper-accent text-xl">ac_unit</span>
              <select
                value={selectedIce}
                onChange={(e) => {
                  setSelectedIce(e.target.value);
                  handleChange('iceType', e.target.value);
                }}
                className="w-full bg-transparent text-cream-text font-body-md text-body-md focus:outline-none cursor-pointer"
              >
                {ICE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt} className="bg-surface-slate text-cream-text">
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
