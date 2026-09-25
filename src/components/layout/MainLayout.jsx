/**
 * ============================================================
 * MAIN LAYOUT
 * ============================================================
 * Main application layout with navigation
 */
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useI18n } from '../../i18n';
import {
  Home,
  Compass,
  ChefHat,
  Heart,
  Bookmark,
  FolderOpen,
  Microscope,
  User,
  LogOut,
  Plus,
  Menu,
  X,
  Wine,
  Scale,
  Sparkles
} from 'lucide-react';

export default function MainLayout() {
  const { t } = useI18n();
  const location = useLocation();
  const navigate = useNavigate();
  const { user, profile, isAuthenticated, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
    setUserMenuOpen(false);
  };

  const navItems = [
    { path: '/', icon: Home, label: 'Trang chủ' },
    { path: '/explore', icon: Compass, label: 'Khám phá' },
    { path: '/equipment', icon: Scale, label: 'Dụng cụ' },
    { path: '/collections', icon: FolderOpen, label: 'Bộ sưu tập' },
  ];

  const userNavItems = [
    { path: '/studio', icon: Sparkles, label: 'Tạo công thức' },
    { path: '/my-recipes', icon: ChefHat, label: 'Công thức của tôi' },
    { path: '/favorites', icon: Heart, label: 'Yêu thích' },
    { path: '/stash', icon: Bookmark, label: 'Đã lưu' },
    { path: '/my-bar', icon: Wine, label: 'Tủ đồ của tôi' },
    { path: '/profile', icon: User, label: 'Hồ sơ' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="min-h-screen bg-[#0F1115]">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl">🍸</span>
              <span className="font-serif text-xl font-semibold text-white">
                Atelier
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive(item.path)
                      ? 'bg-white/10 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon className="w-4 h-4 inline mr-2" />
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              {/* Create Button (for logged in users) */}
              {isAuthenticated && (
                <Link
                  to="/studio"
                  className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium hover:from-purple-600 hover:to-pink-600 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  Tạo mới
                </Link>
              )}

              {/* User Menu */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white/10 transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-medium">
                      {profile?.display_name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
                    </div>
                  </button>

                  {/* Dropdown */}
                  {userMenuOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40"
                        onClick={() => setUserMenuOpen(false)}
                      />
                      <div className="absolute right-0 mt-2 w-64 py-2 rounded-xl glass border border-white/10 z-50 animate-fade-in">
                        {/* User Info */}
                        <div className="px-4 py-3 border-b border-white/10">
                          <p className="font-medium text-white">
                            {profile?.display_name || 'User'}
                          </p>
                          <p className="text-sm text-gray-400 truncate">
                            {user?.email}
                          </p>
                        </div>

                        {/* User Nav Items */}
                        <div className="py-2">
                          {userNavItems.slice(0, 3).map((item) => (
                            <Link
                              key={item.path}
                              to={item.path}
                              onClick={() => setUserMenuOpen(false)}
                              className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                                isActive(item.path)
                                  ? 'text-white bg-white/10'
                                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                              }`}
                            >
                              <item.icon className="w-4 h-4" />
                              {item.label}
                            </Link>
                          ))}
                        </div>

                        {/* More Items */}
                        <div className="border-t border-white/10 py-2">
                          {userNavItems.slice(3).map((item) => (
                            <Link
                              key={item.path}
                              to={item.path}
                              onClick={() => setUserMenuOpen(false)}
                              className={`flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                                isActive(item.path)
                                  ? 'text-white bg-white/10'
                                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                              }`}
                            >
                              <item.icon className="w-4 h-4" />
                              {item.label}
                            </Link>
                          ))}
                        </div>

                        {/* Sign Out */}
                        <div className="border-t border-white/10 pt-2">
                          <button
                            onClick={handleSignOut}
                            className="flex items-center gap-3 w-full px-4 py-2 text-sm text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                          >
                            <LogOut className="w-4 h-4" />
                            Đăng xuất
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/auth/login"
                    className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    to="/auth/register"
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-medium hover:from-purple-600 hover:to-pink-600 transition-all"
                  >
                    Đăng ký
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-white" />
                ) : (
                  <Menu className="w-6 h-6 text-white" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/10 animate-fade-in">
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                    isActive(item.path)
                      ? 'bg-white/10 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              ))}

              {isAuthenticated && (
                <>
                  <div className="border-t border-white/10 my-3" />
                  {userNavItems.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                        isActive(item.path)
                          ? 'bg-white/10 text-white'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.label}
                    </Link>
                  ))}
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="min-h-[calc(100vh-64px)]">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🍸</span>
              <span className="font-serif text-lg font-semibold text-white">
                Atelier Spirits & Brew
              </span>
            </div>
            <p className="text-sm text-gray-500">
              © 2026 Atelier. Sổ tay pha chế truyền đời.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
