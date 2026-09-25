import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../i18n';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header({ onSearch, onAddNote }) {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch?.(value);
  };

  const handleAddClick = () => {
    if (onAddNote) {
      onAddNote();
    } else {
      navigate('/my-recipes');
    }
  };

  return (
    <header className="relative w-full overflow-hidden">
      {/* Subtle Ambient Glow Orbs */}
      <div className="absolute -top-32 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-copper-accent/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="relative max-w-7xl mx-auto px-gutter py-space-xl">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-space-md">
          {/* Left: Title */}
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary">
                Sổ Tay Lưu Giữ Công Thức & Nghệ Thuật Chế Tác
              </span>
            </div>
            <h1 className="font-headline-display text-headline-display text-cream-text tracking-tight">
              Khám Phá Vũ Trụ <span className="italic text-primary">Pha Chế & Làm Bánh</span>
            </h1>
            <p className="font-body-lg text-body-lg text-cream-muted mt-space-sm leading-relaxed">
              Tuyển tập tỷ lệ chuẩn xác từ speakeasy underground danh tiếng, trạm cà phê specialty wave 3 và xưởng bánh men sống thủ công cổ điển.
            </p>
          </div>

          {/* Right: Quick Live Stats Pill */}
          <div className="flex items-center gap-space-md p-3 bg-surface-slate rounded-xl shadow-lg shrink-0">
            <div className="flex flex-col text-right">
              <span className="font-label-sm text-label-sm uppercase text-cream-muted">Kho Dữ Liệu Bar</span>
              <span className="font-label-md text-label-md text-cream-text">1,420+ Tỷ Lệ</span>
            </div>
            <div className="w-10 h-10 rounded-lg bg-surface-smoke flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-xl">auto_stories</span>
            </div>
          </div>
        </div>

        {/* Search & Actions Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-space-md mt-space-lg">
          {/* Search Input */}
          <div className="relative flex-1">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary text-xl pointer-events-none">
              search
            </span>
            <input
              type="text"
              placeholder={t('header.search')}
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full bg-surface-slate text-cream-text font-body-md pl-12 pr-4 py-4 rounded-xl placeholder:text-cream-muted focus:outline-none focus:ring-1 focus:ring-primary-container focus:shadow-[0_0_0_2px_rgba(229,158,56,0.3)] transition-all shadow-lg"
            />
          </div>

          {/* Add Recipe Button */}
          <button
            onClick={handleAddClick}
            className="flex items-center justify-center gap-2 bg-primary-container text-on-primary-container px-6 py-4 rounded-xl font-label-md text-label-md transition-all hover:bg-tertiary-container hover:text-on-tertiary-container shadow-lg"
          >
            <span className="material-symbols-outlined text-lg">add</span>
            <span>{t('header.add')}</span>
          </button>

          {/* Language Switcher */}
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
