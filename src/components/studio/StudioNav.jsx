import { useState, useEffect } from 'react';
import { useI18n } from '../../i18n';
import { StudioIcon } from './StudioUtils';

// ─── Top Nav + Status Ledger ──────────────────────────────────────────────────
export default function StudioNav({ data, onAction }) {
  const { t } = useI18n();
  const [secondsAgo, setSecondsAgo] = useState(42);

  // Fake "auto-save" counter
  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsAgo((s) => Math.max(0, s + 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeSinceSave = secondsAgo < 60
    ? `${secondsAgo} ${t('studio.secondsAgo')}`
    : `${Math.floor(secondsAgo / 60)}m ${secondsAgo % 60}s ${t('studio.secondsAgo')}`;

  return (
    <section className="w-full bg-surface-obsidian">
      <div className="max-w-7xl mx-auto px-gutter py-space-md">
        {/* Breadcrumb + Status Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md mb-space-md">
          {/* Left: Breadcrumbs */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 font-label-sm text-label-sm text-copper-accent tracking-widest uppercase">
              <a className="text-on-surface-variant hover:text-cream-text transition-colors" href="#">Khám Phá</a>
              <span className="text-outline-variant">/</span>
              <a className="text-on-surface-variant hover:text-cream-text transition-colors" href="#">Studio Trạm Bar</a>
              <span className="text-outline-variant">/</span>
              <span className="text-primary">{t('studio.documentTag')} #{data.batchCode}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-slate text-cream-muted font-label-sm text-label-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-vibrant animate-pulse" />
                {t('studio.cloudSync')}
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                {t('studio.autoSaved')} {timeSinceSave}
              </span>
            </div>
          </div>

          {/* Right: Action Buttons */}
          <div className="flex flex-wrap items-center gap-space-sm">
            <StudioNavButton
              icon="bookmark_border"
              label={t('studio.saveDraft')}
              onClick={() => onAction('saveDraft')}
              variant="secondary"
            />
            <StudioNavButton
              icon="fullscreen"
              label={t('studio.barModeTrial')}
              onClick={() => onAction('barMode')}
              variant="outline"
              iconColor="text-copper-accent"
            />
            <StudioNavButton
              icon="verified"
              label={t('studio.publishAtelier')}
              onClick={() => onAction('publish')}
              variant="primary"
            />
          </div>
        </div>

        {/* Remix Lineage slot */}
        {/* (rendered by parent) */}
      </div>
    </section>
  );
}

// ─── Nav Button helper ─────────────────────────────────────────────────────────
function StudioNavButton({ icon, label, onClick, variant = 'secondary', iconColor = 'text-primary' }) {
  const variants = {
    primary: 'bg-primary-container hover:bg-tertiary-container text-on-primary-container shadow-md hover:shadow-lg',
    secondary: 'bg-surface-slate hover:bg-surface-smoke text-cream-text shadow-sm',
    outline: 'bg-surface-container-high hover:bg-surface-smoke text-cream-text border border-border-smoky',
  };
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-label-md text-label-md transition-all ${variants[variant]}`}
    >
      <StudioIcon name={icon} className={`${iconColor} text-base`} />
      <span>{label}</span>
    </button>
  );
}
