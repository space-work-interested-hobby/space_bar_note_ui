import { useI18n } from '../../i18n';
import { StudioIcon, StudioButton } from './StudioUtils';

// ─── Remix Lineage Banner ────────────────────────────────────────────────────
export default function StudioRemixLineage({ data, onChange }) {
  const { t } = useI18n();

  return (
    <div className="mt-space-md p-space-md rounded-lg bg-surface-slate">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
        {/* Left: Info */}
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center shrink-0 text-amber-vibrant">
            <StudioIcon name="alt_route" className="text-xl" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-label-md text-label-md text-cream-text">
                {t('studio.remixTitle')}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-secondary-container/40 text-secondary font-label-sm text-label-sm uppercase">
                {t('studio.remixBadge')}
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              {t('studio.remixFrom')}:{' '}
              <span className="text-primary font-medium">
                {data.remixParentName || '—'}
              </span>
              {data.remixParentAuthor && (
                <>
                  {' '}{t('studio.remixBy')}{' '}
                  <span className="text-cream-muted">{data.remixParentAuthor}</span>
                </>
              )}
            </p>
          </div>
        </div>

        {/* Right: Search + Unlink */}
        <div className="flex items-center gap-2">
          <div className="relative min-w-[240px]">
            <StudioIcon name="search" className="absolute left-2.5 top-2 text-on-surface-variant text-sm" />
            <input
              type="text"
              value={data.remixParentName || ''}
              onChange={(e) => onChange({ remixParentName: e.target.value })}
              placeholder={t('studio.remixSearchPlaceholder')}
              className="w-full bg-surface-obsidian text-cream-text font-body-sm text-body-sm pl-8 pr-3 py-1.5 rounded-lg placeholder:text-cream-muted focus:outline-none"
            />
          </div>
          <StudioButton
            label={t('studio.remixUnlink')}
            variant="secondary"
            onClick={() => onChange({ remixParentId: undefined, remixParentName: undefined, remixParentAuthor: undefined })}
            className="px-3 py-1.5"
          />
        </div>
      </div>
    </div>
  );
}
