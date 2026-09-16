import { useState } from 'react';
import { useI18n } from '../i18n';

export default function LanguageSwitcher({ className = '' }) {
  const { language, setLanguage, currentLang, languages } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageChange = (langCode) => {
    setLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-smoke hover:bg-surface-container-high transition-colors text-cream-text border border-border-smoky"
        aria-label="Change language"
      >
        <span className="material-symbols-outlined text-base text-primary">translate</span>
        <span className="text-sm font-label-md">{currentLang.flag}</span>
        <span className="material-symbols-outlined text-sm transition-transform" style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}>
          expand_more
        </span>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-48 bg-surface-slate rounded-lg shadow-xl border border-border-smoky py-1 z-20 overflow-hidden">
            {Object.values(languages).map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full px-4 py-2.5 text-left flex items-center gap-3 hover:bg-surface-smoke transition-colors ${
                  language === lang.code 
                    ? 'bg-primary-container/20 text-primary' 
                    : 'text-cream-text'
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="font-label-md">{lang.name}</span>
                {language === lang.code && (
                  <span className="material-symbols-outlined text-primary ml-auto text-sm">check</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
