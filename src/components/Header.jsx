import { useState } from 'react';
import { useI18n } from '../i18n';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header({ onSearch, onAddNote }) {
  const { t } = useI18n();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    onSearch?.(e.target.value);
  };

  return (
    <header className="bg-surface-slate border-b border-border-smoky">
      <div className="max-w-7xl mx-auto px-gutter py-space-xl">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-space-lg">
          {/* Left: Title */}
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary">
                Atelier Inventory Algorithm
              </span>
            </div>
            <h1 className="font-headline-display text-headline-display text-cream-text tracking-tight">
              {t('app.name')}
            </h1>
            <p className="font-body-lg text-body-lg text-cream-muted mt-space-sm leading-relaxed">
              {t('app.tagline')}
            </p>
          </div>

          {/* Right: Search & Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-space-md w-full lg:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 lg:flex-initial lg:w-80">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-cream-muted pointer-events-none text-lg">
                search
              </span>
              <input
                type="text"
                placeholder={t('header.search')}
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full bg-surface-obsidian text-cream-text font-body-sm pl-10 pr-4 py-3 rounded-lg placeholder:text-cream-muted focus:outline-none focus:ring-1 focus:ring-primary-container transition-all shadow-inner"
              />
            </div>

            {/* Add Recipe Button */}
            <button
              onClick={onAddNote}
              className="flex items-center justify-center gap-2 bg-primary-container text-on-primary-container px-6 py-3 rounded-lg font-label-md text-label-md transition-all hover:bg-tertiary-container hover:text-on-tertiary-container shadow-lg"
            >
              <span className="material-symbols-outlined text-lg">add</span>
              <span>{t('header.add')}</span>
            </button>

            {/* Language Switcher */}
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}
