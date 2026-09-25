import { useI18n } from '../../i18n';
import {
  StudioCard, StudioIcon, FlavorBar, IngredientRow,
  StudioButton,
} from './StudioUtils';

// ─── Matrix Card (Ingredients + Sensory Matrix) ────────────────────────────────
export default function StudioMatrixCard({ data, onChange }) {
  const { t } = useI18n();

  const unitOptions = [
    { value: 'ml',  label: 'ml' },
    { value: 'oz',  label: 'oz' },
    { value: 'dash', label: 'dash' },
  ];

  const scaleOptions = [1, 2, 4, 10];

  const flavorBarDefs = [
    { key: 'spirit_backbone',  colorClass: 'bg-primary' },
    { key: 'sweetness',         colorClass: 'bg-copper-accent' },
    { key: 'bitter_botanicals', colorClass: 'bg-amber-vibrant' },
    { key: 'smoky_exotic',      colorClass: 'bg-primary-container' },
  ];

  const getFlavor = (key) => {
    const bar = data.flavorBars?.find((b) => b.key === key);
    return bar ? bar.value : 0;
  };

  return (
    <StudioCard icon="tune" iconColor="text-primary" title={t('studio.matrixTitle')}>
      {/* Unit System Switcher */}
      <div className="flex items-center gap-1 bg-surface-obsidian p-1 rounded-lg mb-space-md self-start">
        {unitOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange({ unitSystem: opt.value })}
            className={`px-2 py-0.5 rounded font-label-sm text-label-sm transition-colors ${
              data.unitSystem === opt.value
                ? 'bg-surface-smoke text-primary font-semibold'
                : 'text-on-surface-variant hover:text-cream-text'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Batch Scale Stepper */}
      <div className="flex items-center justify-between p-3 rounded-lg bg-surface-obsidian mb-space-md">
        <div className="flex flex-col">
          <span className="font-label-sm text-label-sm text-cream-muted uppercase">
            {t('studio.scaleLabel')}
          </span>
          <span className="font-headline-md text-headline-md text-cream-text">
            {t('studio.scaleSingle')}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {scaleOptions.map((s) => (
            <button
              key={s}
              onClick={() => onChange({ scale: s })}
              className={`w-8 h-8 rounded font-label-sm text-label-sm font-bold transition-colors ${
                data.scale === s
                  ? 'bg-primary-container text-on-primary-container'
                  : 'bg-surface-smoke text-cream-muted hover:text-cream-text'
              }`}
            >
              {s === 10 ? '10x' : `${s}x`}
            </button>
          ))}
        </div>
      </div>

      {/* Ingredient Rows */}
      <div className="flex flex-col gap-2.5 mb-space-md">
        {(data.ingredients || []).map((ing) => (
          <IngredientRow key={ing.id} ingredient={ing} />
        ))}
        <StudioButton
          icon="add_circle_outline"
          label={t('studio.addIngredient')}
          variant="ghost"
          onClick={() => {/* TODO: open add ingredient modal */}}
          className="w-full justify-center"
        />
      </div>

      {/* Flavor Balance Bars */}
      <div className="p-4 rounded-lg bg-surface-obsidian flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-label-sm text-copper-accent uppercase tracking-widest">
            {t('studio.flavorMatrix')}
          </span>
          <span className="font-label-sm text-label-sm text-cream-muted">
            {t('studio.flavorAuto')}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          {flavorBarDefs.map(({ key, colorClass }) => (
            <div key={key} className="pt-1">
              <FlavorBar
                label={t(`studio.flavorBars.${key}`)}
                value={getFlavor(key)}
                colorClass={colorClass}
              />
            </div>
          ))}
        </div>
      </div>
    </StudioCard>
  );
}
