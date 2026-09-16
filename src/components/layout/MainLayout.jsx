import { Link, Outlet } from 'react-router-dom';
import { useI18n } from '../../i18n';
import LanguageSwitcher from '../LanguageSwitcher';

const navItems = [
  { path: '/', icon: 'home', labelKey: 'nav.home' },
  { path: '/explore', icon: 'explore', labelKey: 'nav.explore' },
  { path: '/my-recipes', icon: 'menu_book', labelKey: 'nav.myRecipes' },
  { path: '/favorites', icon: 'favorite', labelKey: 'nav.favorites' },
  { path: '/stash', icon: 'inventory_2', labelKey: 'nav.stash' },
  { path: '/collections', icon: 'folder', labelKey: 'nav.collections' },
  { path: '/equipment', icon: 'construction', labelKey: 'nav.equipment' },
  { path: '/profile', icon: 'person', labelKey: 'nav.profile' },
];

export default function MainLayout() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-surface-obsidian">
      {/* Top Navigation - Fixed Header */}
      <header className="fixed top-0 inset-x-0 z-50 bg-surface-obsidian/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-20 max-w-7xl mx-auto px-gutter flex items-center justify-between gap-space-md">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-space-lg shrink-0 group">
            <div className="flex flex-col">
              <span className="font-headline-md text-headline-md tracking-tight text-cream-text group-hover:text-primary transition-colors">
                Atelier
              </span>
              <span className="font-label-sm text-label-sm tracking-widest uppercase text-copper-accent -mt-1">
                Spirits & Brew
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 p-1 bg-surface-slate rounded-lg">
            {navItems.map(({ path, icon, labelKey }) => (
              <Link
                key={path}
                to={path}
                className="px-3.5 py-2 font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors rounded-lg hover:bg-surface-smoke"
              >
                <span className="material-symbols-outlined text-lg mr-1.5 align-middle">{icon}</span>
                {t(labelKey)}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-space-md shrink-0">
            <Link
              to="/my-recipes"
              className="hidden sm:inline-flex items-center gap-2 bg-primary-container text-on-primary-container px-4 py-2 rounded-lg font-label-md text-label-md transition-all hover:bg-tertiary-container hover:text-on-tertiary-container shadow-md"
            >
              <span className="material-symbols-outlined text-base">add</span>
              <span>{t('header.add')}</span>
            </Link>
            <LanguageSwitcher />
            <button className="p-0.5 rounded-full hover:ring-2 hover:ring-primary-container transition-all">
              <div className="w-8 h-8 rounded-full bg-surface-smoke flex items-center justify-center">
                <span className="material-symbols-outlined text-cream-muted text-lg">person</span>
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full pt-20 bg-surface-obsidian min-h-screen">
        <Outlet />
      </main>
    </div>
  );
}
