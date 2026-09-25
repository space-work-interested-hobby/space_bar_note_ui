import { useI18n } from '../../i18n';
import { StudioIcon, StudioButton } from './StudioUtils';

// ─── Sticky Action Bar ────────────────────────────────────────────────────────
export default function StudioStickyBar({ data, onAction }) {
  const { t } = useI18n();

  return (
    <div className="mt-space-xl p-space-md rounded-xl bg-surface-slate shadow-xl flex flex-col sm:flex-row items-center justify-between gap-space-md">
      {/* Left: Recipe info */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-lg bg-surface-obsidian flex items-center justify-center text-primary">
          <StudioIcon name="local_bar" className="text-2xl" />
        </div>
        <div className="flex flex-col">
          <span className="font-label-md text-label-md text-cream-text font-semibold">
            {data.signatureName || t('studio.signatureNamePlaceholder')}
          </span>
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            {t('studio.stickyReady')}
          </span>
        </div>
      </div>

      {/* Right: Action Buttons */}
      <div className="flex items-center gap-space-sm w-full sm:w-auto">
        <StudioButton
          label={t('studio.printCard')}
          variant="secondary"
          icon="print"
          onClick={() => onAction('print')}
          className="flex-1 sm:flex-initial"
        />
        <StudioButton
          label={t('studio.confirmPublish')}
          variant="primary"
          icon="send"
          onClick={() => onAction('publish')}
          className="flex-1 sm:flex-initial px-6"
        />
      </div>
    </div>
  );
}
