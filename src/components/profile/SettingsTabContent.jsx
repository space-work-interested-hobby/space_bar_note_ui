import { useState } from 'react';
import { useI18n } from '../../i18n';

/**
 * SettingsTabContent Component
 * Displays station setup and experience settings
 */
export default function SettingsTabContent() {
  const { t } = useI18n();
  const [activeUnit, setActiveUnit] = useState('metric');
  const [activeLang, setActiveLang] = useState('vi');
  const [toggles, setToggles] = useState({
    timerSound: true,
    alwaysOn: true,
    ultraContrast: true,
    remixNotification: true,
    masterComment: true,
  });
  const [showSaveToast, setShowSaveToast] = useState(false);

  const handleToggle = (key) => {
    setToggles(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSaveAll = () => {
    setShowSaveToast(true);
    setTimeout(() => setShowSaveToast(false), 2200);
  };

  const handleExportJSON = () => {
    const data = {
      recipes: [],
      collections: [],
      stash: [],
      equipment: [],
      settings: toggles,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `space-bar-note-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePrintBinder = () => {
    window.print();
  };

  return (
    <section className="flex flex-col gap-space-lg mt-space-2xl">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-copper-accent">
            {t('profile.settingsTab.stationSetup')}
          </span>
          <h2 className="font-headline-lg text-headline-lg text-cream-text">
            {t('profile.settingsTab.stationExperience')}
          </h2>
        </div>
        <button
          onClick={handleSaveAll}
          className={`
            inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-label-md text-label-md 
            transition-all shadow-md
            ${showSaveToast 
              ? 'bg-tertiary-container text-on-tertiary-container' 
              : 'bg-primary-container text-on-primary-container hover:bg-tertiary-container hover:text-on-tertiary-container'
            }
          `}
          id="btn-save-all-settings"
        >
          {showSaveToast ? (
            <>
              <span className="material-symbols-outlined text-base">check_circle</span>
              <span>{t('profile.settingsTab.saved')}</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-base">save</span>
              <span>{t('profile.settingsTab.saveAll')}</span>
            </>
          )}
        </button>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-space-lg">
        {/* Module 1: Đo Lường & Ngôn Ngữ */}
        <div className="bg-surface-slate rounded-xl p-space-lg shadow-lg flex flex-col gap-space-md">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-lg bg-surface-smoke text-primary material-symbols-outlined">straighten</span>
            <div>
              <h3 className="font-headline-md text-headline-md text-cream-text">
                {t('profile.settingsTab.measurementLang')}
              </h3>
              <p className="font-body-sm text-body-sm text-cream-muted">
                {t('profile.settingsTab.measurementLangDesc')}
              </p>
            </div>
          </div>

          {/* Unit Switcher */}
          <div className="bg-surface-obsidian p-space-md rounded-lg flex flex-col gap-2">
            <span className="font-label-md text-label-md text-cream-text">
              {t('profile.settingsTab.unitSystem')}
            </span>
            <div className="grid grid-cols-2 gap-2 bg-surface-smoke p-1 rounded-lg" id="unit-toggle-group">
              <button
                onClick={() => setActiveUnit('metric')}
                className={`
                  py-2 rounded-md font-label-md text-label-md transition-all flex items-center justify-center gap-2
                  ${activeUnit === 'metric'
                    ? 'bg-primary-container text-on-primary-container'
                    : 'text-on-surface-variant hover:text-cream-text'
                  }
                `}
                data-unit="metric"
              >
                <span className="material-symbols-outlined text-sm">scale</span>
                <span>ml / gram (Quốc Tế)</span>
              </button>
              <button
                onClick={() => setActiveUnit('imperial')}
                className={`
                  py-2 rounded-md font-label-md text-label-md transition-all flex items-center justify-center gap-2
                  ${activeUnit === 'imperial'
                    ? 'bg-primary-container text-on-primary-container'
                    : 'text-on-surface-variant hover:text-cream-text'
                  }
                `}
                data-unit="imperial"
              >
                <span className="material-symbols-outlined text-sm">local_bar</span>
                <span>oz / dash / cup (Mỹ)</span>
              </button>
            </div>
          </div>

          {/* Language Select */}
          <div className="bg-surface-obsidian p-space-md rounded-lg flex flex-col gap-2">
            <span className="font-label-md text-label-md text-cream-text">
              {t('profile.settingsTab.interfaceLang')}
            </span>
            <div className="grid grid-cols-2 gap-2 bg-surface-smoke p-1 rounded-lg" id="lang-toggle-group">
              <button
                onClick={() => setActiveLang('vi')}
                className={`
                  py-2 rounded-md font-label-md text-label-md transition-all
                  ${activeLang === 'vi'
                    ? 'bg-primary-container text-on-primary-container'
                    : 'text-on-surface-variant hover:text-cream-text'
                  }
                `}
                data-lang="vi"
              >
                Tiếng Việt (Mặc định)
              </button>
              <button
                onClick={() => setActiveLang('en')}
                className={`
                  py-2 rounded-md font-label-md text-label-md transition-all
                  ${activeLang === 'en'
                    ? 'bg-primary-container text-on-primary-container'
                    : 'text-on-surface-variant hover:text-cream-text'
                  }
                `}
                data-lang="en"
              >
                English (International)
              </button>
            </div>
          </div>
        </div>

        {/* Module 2: Chế Độ Quầy Bar */}
        <div className="bg-surface-slate rounded-xl p-space-lg shadow-lg flex flex-col gap-space-md">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-lg bg-surface-smoke text-primary material-symbols-outlined">timer</span>
            <div>
              <h3 className="font-headline-md text-headline-md text-cream-text">
                {t('profile.settingsTab.barBakingMode')}
              </h3>
              <p className="font-body-sm text-body-sm text-cream-muted">
                {t('profile.settingsTab.barBakingModeDesc')}
              </p>
            </div>
          </div>

          {/* Settings Toggles */}
          <div className="bg-surface-obsidian p-space-md rounded-lg flex flex-col gap-space-sm">
            {/* Toggle 1: Timer Sound */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-label-md text-label-md text-cream-text">
                  {t('profile.settingsTab.timerSound')}
                </span>
                <span className="font-body-sm text-body-sm text-cream-muted">
                  {t('profile.settingsTab.timerSoundDesc')}
                </span>
              </div>
              <button
                onClick={() => handleToggle('timerSound')}
                className={`
                  toggle-switch w-12 h-6 rounded-full p-0.5 transition-colors relative
                  ${toggles.timerSound ? 'bg-primary-container' : 'bg-surface-smoke'}
                `}
                data-state={toggles.timerSound}
              >
                <div className={`
                  w-5 h-5 rounded-full transition-transform
                  ${toggles.timerSound 
                    ? 'translate-x-6 bg-on-primary-container' 
                    : 'translate-x-0 bg-cream-muted'
                  }
                `}></div>
              </button>
            </div>

            {/* Toggle 2: Always-on Screen */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex flex-col">
                <span className="font-label-md text-label-md text-cream-text">
                  {t('profile.settingsTab.alwaysOn')}
                </span>
                <span className="font-body-sm text-body-sm text-cream-muted">
                  {t('profile.settingsTab.alwaysOnDesc')}
                </span>
              </div>
              <button
                onClick={() => handleToggle('alwaysOn')}
                className={`
                  toggle-switch w-12 h-6 rounded-full p-0.5 transition-colors relative
                  ${toggles.alwaysOn ? 'bg-primary-container' : 'bg-surface-smoke'}
                `}
                data-state={toggles.alwaysOn}
              >
                <div className={`
                  w-5 h-5 rounded-full transition-transform
                  ${toggles.alwaysOn 
                    ? 'translate-x-6 bg-on-primary-container' 
                    : 'translate-x-0 bg-cream-muted'
                  }
                `}></div>
              </button>
            </div>

            {/* Toggle 3: Ultra Contrast */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex flex-col">
                <span className="font-label-md text-label-md text-cream-text">
                  {t('profile.settingsTab.ultraContrast')}
                </span>
                <span className="font-body-sm text-body-sm text-cream-muted">
                  {t('profile.settingsTab.ultraContrastDesc')}
                </span>
              </div>
              <button
                onClick={() => handleToggle('ultraContrast')}
                className={`
                  toggle-switch w-12 h-6 rounded-full p-0.5 transition-colors relative
                  ${toggles.ultraContrast ? 'bg-primary-container' : 'bg-surface-smoke'}
                `}
                data-state={toggles.ultraContrast}
              >
                <div className={`
                  w-5 h-5 rounded-full transition-transform
                  ${toggles.ultraContrast 
                    ? 'translate-x-6 bg-on-primary-container' 
                    : 'translate-x-0 bg-cream-muted'
                  }
                `}></div>
              </button>
            </div>
          </div>
        </div>

        {/* Module 3: Thông Báo */}
        <div className="bg-surface-slate rounded-xl p-space-lg shadow-lg flex flex-col gap-space-md">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-lg bg-surface-smoke text-primary material-symbols-outlined">notifications_active</span>
            <div>
              <h3 className="font-headline-md text-headline-md text-cream-text">
                {t('profile.settingsTab.notifications')}
              </h3>
              <p className="font-body-sm text-body-sm text-cream-muted">
                {t('profile.settingsTab.notificationsDesc')}
              </p>
            </div>
          </div>

          <div className="bg-surface-obsidian p-space-md rounded-lg flex flex-col gap-space-sm">
            {/* Toggle: Remix Notification */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-label-md text-label-md text-cream-text">
                  {t('profile.settingsTab.remixNotification')}
                </span>
                <span className="font-body-sm text-body-sm text-cream-muted">
                  {t('profile.settingsTab.remixNotificationDesc')}
                </span>
              </div>
              <button
                onClick={() => handleToggle('remixNotification')}
                className={`
                  toggle-switch w-12 h-6 rounded-full p-0.5 transition-colors relative
                  ${toggles.remixNotification ? 'bg-primary-container' : 'bg-surface-smoke'}
                `}
                data-state={toggles.remixNotification}
              >
                <div className={`
                  w-5 h-5 rounded-full transition-transform
                  ${toggles.remixNotification 
                    ? 'translate-x-6 bg-on-primary-container' 
                    : 'translate-x-0 bg-cream-muted'
                  }
                `}></div>
              </button>
            </div>

            {/* Toggle: Master Comment */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex flex-col">
                <span className="font-label-md text-label-md text-cream-text">
                  {t('profile.settingsTab.masterComment')}
                </span>
                <span className="font-body-sm text-body-sm text-cream-muted">
                  {t('profile.settingsTab.masterCommentDesc')}
                </span>
              </div>
              <button
                onClick={() => handleToggle('masterComment')}
                className={`
                  toggle-switch w-12 h-6 rounded-full p-0.5 transition-colors relative
                  ${toggles.masterComment ? 'bg-primary-container' : 'bg-surface-smoke'}
                `}
                data-state={toggles.masterComment}
              >
                <div className={`
                  w-5 h-5 rounded-full transition-transform
                  ${toggles.masterComment 
                    ? 'translate-x-6 bg-on-primary-container' 
                    : 'translate-x-0 bg-cream-muted'
                  }
                `}></div>
              </button>
            </div>
          </div>
        </div>

        {/* Module 4: Bảo Mật & Đồng Bộ */}
        <div className="bg-surface-slate rounded-xl p-space-lg shadow-lg flex flex-col gap-space-md">
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-lg bg-surface-smoke text-copper-accent material-symbols-outlined">cloud_sync</span>
            <div>
              <h3 className="font-headline-md text-headline-md text-cream-text">
                {t('profile.settingsTab.securitySync')}
              </h3>
              <p className="font-body-sm text-body-sm text-cream-muted">
                {t('profile.settingsTab.securitySyncDesc')}
              </p>
            </div>
          </div>

          <div className="bg-surface-obsidian p-space-md rounded-lg flex flex-col gap-3">
            {/* Sync Status */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse"></span>
                <span className="font-body-sm text-body-sm text-cream-text">
                  {t('profile.settingsTab.supabaseSync')}: <span className="text-primary font-mono font-medium">{t('profile.settingsTab.active')}</span>
                </span>
              </div>
              <span className="font-label-sm text-label-sm text-on-surface-variant font-mono">
                2 {t('profile.settingsTab.minutesAgo')}
              </span>
            </div>

            {/* Export Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={handleExportJSON}
                className="inline-flex items-center justify-center gap-2 bg-surface-smoke hover:bg-surface-bright text-cream-text px-3 py-2 rounded-lg font-label-md text-label-md transition-colors"
                id="btn-export-json"
              >
                <span className="material-symbols-outlined text-base">code</span>
                <span>{t('profile.settingsTab.exportJSON')}</span>
              </button>
              <button
                onClick={handlePrintBinder}
                className="inline-flex items-center justify-center gap-2 bg-surface-smoke hover:bg-surface-bright text-cream-text px-3 py-2 rounded-lg font-label-md text-label-md transition-colors"
                id="btn-export-binder"
              >
                <span className="material-symbols-outlined text-base">print</span>
                <span>{t('profile.settingsTab.printBinder')}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
