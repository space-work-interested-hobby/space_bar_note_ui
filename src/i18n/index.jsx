/**
 * ============================================================
 * i18n SETUP
 * ============================================================
 * Internationalization for Vietnamese/English
 */
import { createContext, useContext, useState, useCallback } from 'react';
import viTranslations from './vi';
import enTranslations from './en';

// Deep merge translations
const deepMerge = (target, source) => {
  const result = { ...target };
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      result[key] = deepMerge(result[key] || {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
};

// Combined translations object with all translation keys
const translations = {
  vi: deepMerge(
    {
      // Auth
      'auth.login': 'Đăng nhập',
      'auth.register': 'Đăng ký',
      'auth.logout': 'Đăng xuất',
      'auth.email': 'Email',
      'auth.password': 'Mật khẩu',
      'auth.confirmPassword': 'Xác nhận mật khẩu',
      'auth.forgotPassword': 'Quên mật khẩu?',
      'auth.noAccount': 'Chưa có tài khoản?',
      'auth.hasAccount': 'Đã có tài khoản?',
      'auth.signUpNow': 'Đăng ký ngay',
      'auth.signInNow': 'Đăng nhập ngay',
      'auth.orContinueWith': 'Hoặc tiếp tục với',
      'auth.continueAsGuest': 'Tiếp tục làm khách',
      'auth.welcomeBack': 'Chào mừng trở lại!',
      'auth.createAccount': 'Tạo tài khoản mới',
      'auth.displayName': 'Tên hiển thị',
      'auth.username': 'Tên người dùng',
      'auth.emailRequired': 'Vui lòng nhập email',
      'auth.emailInvalid': 'Email không hợp lệ',
      'auth.passwordRequired': 'Vui lòng nhập mật khẩu',
      'auth.passwordMin': 'Mật khẩu phải có ít nhất 6 ký tự',
      'auth.passwordMatch': 'Mật khẩu không khớp',
      'auth.usernameRequired': 'Vui lòng nhập tên người dùng',
      'auth.displayNameRequired': 'Vui lòng nhập tên hiển thị',
      'auth.loginFailed': 'Đăng nhập thất bại',
      'auth.registerFailed': 'Đăng ký thất bại',
      'auth.networkError': 'Lỗi kết nối mạng',
      'auth.registerSuccess': 'Đăng ký thành công! Vui lòng kiểm tra email.',
      'auth.checkEmail': 'Kiểm tra email để xác thực',
      'auth.emailVerified': 'Email đã được xác thực',
      'common.loading': 'Đang tải...',
      'common.error': 'Lỗi',
      'common.success': 'Thành công',
      'common.or': 'hoặc',
    },
    viTranslations
  ),
  en: deepMerge(
    {
      'auth.login': 'Sign In',
      'auth.register': 'Sign Up',
      'auth.logout': 'Sign Out',
      'auth.email': 'Email',
      'auth.password': 'Password',
      'auth.confirmPassword': 'Confirm Password',
      'auth.forgotPassword': 'Forgot password?',
      'auth.noAccount': "Don't have an account?",
      'auth.hasAccount': 'Already have an account?',
      'auth.signUpNow': 'Sign Up Now',
      'auth.signInNow': 'Sign In Now',
      'auth.orContinueWith': 'Or continue with',
      'auth.continueAsGuest': 'Continue as Guest',
      'auth.welcomeBack': 'Welcome Back!',
      'auth.createAccount': 'Create New Account',
      'auth.displayName': 'Display Name',
      'auth.username': 'Username',
      'auth.emailRequired': 'Please enter your email',
      'auth.emailInvalid': 'Invalid email address',
      'auth.passwordRequired': 'Please enter your password',
      'auth.passwordMin': 'Password must be at least 6 characters',
      'auth.passwordMatch': 'Passwords do not match',
      'auth.usernameRequired': 'Please enter a username',
      'auth.displayNameRequired': 'Please enter your display name',
      'auth.loginFailed': 'Login failed',
      'auth.registerFailed': 'Registration failed',
      'auth.networkError': 'Network error',
      'auth.registerSuccess': 'Registration successful! Please check your email.',
      'auth.checkEmail': 'Check your email to verify',
      'auth.emailVerified': 'Email verified',
      'common.loading': 'Loading...',
      'common.error': 'Error',
      'common.success': 'Success',
      'common.or': 'or',
    },
    enTranslations
  ),
};

const I18nContext = createContext(null);

export function I18nProvider({ children, initialLanguage = 'vi' }) {
  const [language, setLanguage] = useState(initialLanguage);

  const t = useCallback((key, params = {}) => {
    let text = translations[language]?.[key] || translations['vi'][key] || key;
    
    // Replace params like {name} with values
    Object.entries(params).forEach(([paramKey, value]) => {
      text = text.replace(new RegExp(`{${paramKey}}`, 'g'), value);
    });
    
    return text;
  }, [language]);

  const changeLanguage = useCallback((lang) => {
    if (translations[lang]) {
      setLanguage(lang);
    }
  }, []);

  const value = {
    language,
    setLanguage: changeLanguage,
    t,
    languages: [
      { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
      { code: 'en', name: 'English', flag: '🇺🇸' }
    ]
  };

  return (
    <I18nContext.Provider value={value}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}

export { translations };
