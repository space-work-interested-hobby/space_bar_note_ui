/**
 * ============================================================
 * AUTH LAYOUT
 * ============================================================
 * Layout for authentication pages (login, register, forgot password)
 */
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useI18n } from '../../i18n';

export default function AuthLayout() {
  const { t, language, setLanguage, languages } = useI18n();
  const location = useLocation();
  
  const isLogin = location.pathname === '/auth/login' || location.pathname === '/auth';
  const isRegister = location.pathname === '/auth/register';
  const isResetPassword = location.pathname === '/auth/reset-password';
  const isCallback = location.pathname === '/auth/callback';

  return (
    <div className="min-h-screen bg-[#0F1115] flex flex-col">
      {/* Header */}
      <header className="p-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-3xl">🍸</span>
          <span className="font-serif text-xl font-semibold text-white">
            Atelier
          </span>
        </Link>
        
        {/* Language Switcher */}
        <div className="flex items-center gap-1 bg-white/5 rounded-full p-1">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => setLanguage(lang.code)}
              className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                language === lang.code
                  ? 'bg-white/20 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <span className="mr-1">{lang.flag}</span>
              <span className="hidden sm:inline">{lang.name}</span>
            </button>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </main>

      {/* Footer */}
      {!isCallback && (
        <footer className="p-4 text-center text-gray-500 text-sm">
          {isLogin || isResetPassword ? (
            <p>
              {t('auth.noAccount')}{' '}
              <Link
                to="/auth/register"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                {t('auth.signUpNow')}
              </Link>
            </p>
          ) : isRegister ? (
            <p>
              {t('auth.hasAccount')}{' '}
              <Link
                to="/auth/login"
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                {t('auth.signInNow')}
              </Link>
            </p>
          ) : null}
        </footer>
      )}
    </div>
  );
}
