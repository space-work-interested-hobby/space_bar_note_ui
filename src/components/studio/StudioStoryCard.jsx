import { useI18n } from '../../i18n';
import { StudioCard, StudioIcon, StudioTextarea } from './StudioUtils';

// ─── Story Card ──────────────────────────────────────────────────────────────
export default function StudioStoryCard({ data, onChange }) {
  const { t } = useI18n();

  const field = (key) => ({
    value: data[key] ?? '',
    onChange: (e) => onChange({ [key]: e.target.value }),
  });

  return (
    <StudioCard
      icon="auto_stories"
      iconColor="text-copper-accent"
      title={t('studio.storyTitle')}
      badge={t('studio.storyJournal')}
    >
      {/* Inspiration */}
      <div className="flex flex-col gap-1.5 mb-space-md">
        <label className="font-label-sm text-label-sm text-cream-muted uppercase tracking-wider">
          {t('studio.inspirationLabel')}
        </label>
        <StudioTextarea
          {...field('inspiration')}
          placeholder={t('studio.inspirationPlaceholder')}
          rows={3}
        />
      </div>

      {/* Two-col: Perfect Moment + Storage */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
        <div className="p-3 rounded-lg bg-surface-obsidian flex flex-col gap-1">
          <span className="font-label-sm text-label-sm text-copper-accent uppercase">
            {t('studio.perfectMoment')}
          </span>
          <p className="font-body-sm text-body-sm text-cream-text">
            {data.perfectMoment || '—'}
          </p>
        </div>
        <div className="p-3 rounded-lg bg-surface-obsidian flex flex-col gap-1">
          <span className="font-label-sm text-label-sm text-copper-accent uppercase">
            {t('studio.storageLabel')}
          </span>
          <p className="font-body-sm text-body-sm text-cream-text">
            {data.storageNote || '—'}
          </p>
        </div>
      </div>
    </StudioCard>
  );
}
