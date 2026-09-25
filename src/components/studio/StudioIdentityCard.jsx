import { useI18n } from '../../i18n';
import {
  StudioCard, StudioField, StudioInput, StudioTextarea,
  StudioSelect, StudioIcon, CategoryPills, DifficultyStars,
  MetricCell, StudioButton,
} from './StudioUtils';

// ─── Identity Card ─────────────────────────────────────────────────────────────
export default function StudioIdentityCard({ data, onChange }) {
  const { t } = useI18n();

  const categories = [
    { value: 'signature_speakeasy', label: t('studio.categories.signature_speakeasy') },
    { value: 'classic_riff',        label: t('studio.categories.classic_riff') },
    { value: 'highball_fizz',       label: t('studio.categories.highball_fizz') },
    { value: 'zero_proof',          label: t('studio.categories.zero_proof') },
    { value: 'specialty_coffee',    label: t('studio.categories.specialty_coffee') },
  ];

  const glasswareOptions = [
    { value: 'nick_nora',       label: t('studio.glassware.nick_nora') },
    { value: 'coupe',          label: t('studio.glassware.coupe') },
    { value: 'old_fashioned',  label: t('studio.glassware.old_fashioned') },
    { value: 'highball',       label: t('studio.glassware.highball') },
  ];

  const iceOptions = [
    { value: 'clear_ice', label: t('studio.ice.clear_ice') },
    { value: 'sphere',    label: t('studio.ice.sphere') },
    { value: 'crushed',   label: t('studio.ice.crushed') },
    { value: 'neat',     label: t('studio.ice.neat') },
  ];

  const field = (key) => ({
    value: data[key] ?? '',
    onChange: (e) => onChange({ [key]: e.target.value }),
  });

  return (
    <StudioCard icon="liquor" iconColor="text-copper-accent" title={t('studio.identityTitle')} badge={`${t('studio.batchCode')}: ${data.batchCode}`}>
      {/* Signature Name */}
      <div className="flex flex-col gap-1.5 mb-space-md">
        <label className="font-label-sm text-label-sm text-cream-muted uppercase tracking-wider">
          {t('studio.signatureName')}
        </label>
        <input
          {...field('signatureName')}
          placeholder={t('studio.signatureNamePlaceholder')}
          className="w-full bg-surface-obsidian text-cream-text font-headline-lg text-headline-lg px-4 py-2.5 rounded-lg placeholder:text-outline-variant focus:outline-none focus:ring-1 focus:ring-primary-container transition-all"
        />
      </div>

      {/* Aroma Profile */}
      <div className="flex flex-col gap-1.5 mb-space-md">
        <label className="font-label-sm text-label-sm text-cream-muted uppercase tracking-wider">
          {t('studio.aromaProfile')}
        </label>
        <input
          {...field('aromaProfile')}
          placeholder={t('studio.aromaProfilePlaceholder')}
          className="w-full bg-surface-obsidian text-cream-text font-body-md text-body-md px-4 py-2 rounded-lg placeholder:text-outline-variant focus:outline-none focus:ring-1 focus:ring-primary-container transition-all"
        />
      </div>

      {/* Category Pills */}
      <div className="flex flex-col gap-2 mb-space-md">
        <label className="font-label-sm text-label-sm text-cream-muted uppercase tracking-wider">
          {t('studio.categoryLabel')}
        </label>
        <CategoryPills
          options={categories}
          selected={data.category}
          onSelect={(val) => onChange({ category: val })}
        />
      </div>

      {/* Quick Metrics 4-Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm mb-space-md">
        <div className="p-3 rounded-lg bg-surface-obsidian flex flex-col gap-1">
          <span className="font-label-sm text-label-sm text-cream-muted uppercase">
            {t('studio.difficultyLabel')}
          </span>
          <DifficultyStars value={data.difficulty} />
        </div>
        <MetricCell
          label={t('studio.timeLabel')}
          value={data.totalTime || '—'}
        />
        <MetricCell
          label={t('studio.abvLabel')}
          value={data.estimatedABV || '—'}
          icon="local_bar"
        />
        <MetricCell
          label={t('studio.tempLabel')}
          value={data.servingTemp || '—'}
          icon="thermostat"
        />
      </div>

      {/* Glassware & Ice */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
        <StudioField label={t('studio.glasswareLabel')}>
          <StudioSelect
            value={data.glassware}
            onChange={(e) => onChange({ glassware: e.target.value })}
            options={glasswareOptions}
            icon="local_bar"
          />
        </StudioField>
        <StudioField label={t('studio.iceLabel')}>
          <StudioSelect
            value={data.iceArchitecture}
            onChange={(e) => onChange({ iceArchitecture: e.target.value })}
            options={iceOptions}
            icon="ac_unit"
          />
        </StudioField>
      </div>
    </StudioCard>
  );
}
