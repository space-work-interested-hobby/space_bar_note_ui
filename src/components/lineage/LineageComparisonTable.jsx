import { useI18n } from '../../i18n';

/* ============================================================
   LINEAGE COMPARISON TABLE COMPONENT
   Bảng so sánh 3 thế hệ: Tổ tiên → Cầu nối → Atelier
   ============================================================ */

function ComparisonRow({ label, gen1, gen2, gen3, labelNote }) {
  return (
    <div className="flex flex-col gap-4">
      {/* Mobile: Row Header */}
      <div className="lg:hidden">
        <span className="font-label-sm text-label-sm text-cream-muted uppercase block mb-2">
          {label}
        </span>
        <div className="grid grid-cols-1 gap-3">
          {gen1 && (
            <div className="bg-surface-obsidian/40 p-3 rounded-lg">
              <span className="font-body-sm text-cream-text font-medium block">{gen1}</span>
              {labelNote && (
                <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 block">{labelNote}</span>
              )}
            </div>
          )}
          {gen2 && (
            <div className="bg-surface-obsidian/40 p-3 rounded-lg">
              <span className="font-body-sm text-cream-text font-medium block">{gen2}</span>
              {labelNote && (
                <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 block">{labelNote}</span>
              )}
            </div>
          )}
          {gen3 && (
            <div className="bg-surface-obsidian/60 p-3 rounded-lg border border-primary/20">
              <span className="font-body-sm text-cream-text font-medium block">{gen3}</span>
              {labelNote && (
                <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 block">{labelNote}</span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Desktop: Column Layout */}
      <div className="hidden lg:flex flex-col gap-4">
        {/* Column Headers */}
        <div className="flex items-start">
          <div className="w-32 shrink-0"></div>
          <div className="flex-1 grid grid-cols-3 gap-6">
            <div className="font-label-sm text-label-sm text-cream-muted uppercase">{label}</div>
            <div className="font-label-sm text-label-sm text-cream-muted uppercase">{label}</div>
            <div className="font-label-sm text-label-sm text-cream-muted uppercase">{label}</div>
          </div>
        </div>

        {/* Values */}
        <div className="flex items-start">
          <div className="w-32 shrink-0"></div>
          <div className="flex-1 grid grid-cols-3 gap-6">
            <div>
              <span className="font-body-md text-body-md text-cream-text font-medium block">{gen1}</span>
              {labelNote && (
                <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 block">{labelNote}</span>
              )}
            </div>
            <div>
              <span className="font-body-md text-body-md text-cream-text font-medium block">{gen2}</span>
              {labelNote && (
                <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 block">{labelNote}</span>
              )}
            </div>
            <div>
              <span className="font-body-md text-body-md text-cream-text font-medium block">{gen3}</span>
              {labelNote && (
                <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 block">{labelNote}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GenerationColumn({ gen, index, isCrown }) {
  const { t } = useI18n();

  return (
    <div
      className={`rounded-xl p-6 shadow-md flex flex-col justify-between ${
        isCrown
          ? 'bg-surface-slate shadow-xl border border-primary/20'
          : 'bg-surface-slate'
      }`}
    >
      <div>
        {/* Column Header */}
        <div
          className={`flex items-center justify-between pb-4 mb-4 -mx-6 -mt-6 p-6 rounded-t-xl ${
            isCrown ? 'bg-surface-obsidian/60' : 'bg-surface-obsidian/40'
          }`}
        >
          <div>
            <span className={`font-label-sm text-label-sm uppercase tracking-wider block ${
              isCrown ? 'text-amber-vibrant' : 'text-copper-accent'
            }`}>
              {gen.era}
            </span>
            <h3 className={`font-headline-md text-headline-md mt-0.5 ${
              isCrown ? 'text-cream-text' : 'text-cream-text'
            }`}>
              {gen.title}
            </h3>
          </div>
          {/* Generation Number Badge */}
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold font-label-md text-label-md ${
              isCrown
                ? 'bg-primary text-on-primary'
                : 'bg-surface-obsidian text-primary'
            }`}
          >
            {gen.generation}
          </div>
        </div>

        {/* Parameters */}
        <div className="flex flex-col gap-4">
          {/* 1. Core Spirit */}
          <div>
            <span className="font-label-sm text-label-sm text-cream-muted uppercase block">
              1. {t('lineage.coreSpirit')}
            </span>
            <span className="font-body-md text-body-md text-cream-text font-medium block mt-1">
              {gen.spirit}
            </span>
            {gen.spiritNote && (
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                {gen.spiritNote}
              </p>
            )}
          </div>

          {/* 2. Sweetener */}
          <div>
            <span className="font-label-sm text-label-sm text-cream-muted uppercase block">
              2. {t('lineage.sweetener')}
            </span>
            <span className="font-body-md text-body-md text-cream-text font-medium block mt-1">
              {gen.sweetener}
            </span>
            {gen.sweetenerNote && (
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                {gen.sweetenerNote}
              </p>
            )}
          </div>

          {/* 3. Bitters/Herbs */}
          <div>
            <span className="font-label-sm text-label-sm text-cream-muted uppercase block">
              3. {t('lineage.bitterHerb')}
            </span>
            <span className="font-body-md text-body-md text-cream-text font-medium block mt-1">
              {gen.bitter}
            </span>
            {gen.bitterNote && (
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                {gen.bitterNote}
              </p>
            )}
          </div>

          {/* 4. Technique */}
          <div>
            <span className="font-label-sm text-label-sm text-cream-muted uppercase block">
              4. {t('lineage.technique')}
            </span>
            <span className="font-body-md text-body-md text-cream-text font-medium block mt-1">
              {gen.technique}
            </span>
            {gen.techniqueNote && (
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                {gen.techniqueNote}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Footer Stats */}
      <div
        className={`mt-6 pt-4 -mx-6 -mb-6 p-6 rounded-b-xl flex items-center justify-between ${
          isCrown ? 'bg-surface-obsidian/80' : 'bg-surface-obsidian/60'
        }`}
      >
        <span className="font-label-sm text-label-sm uppercase text-cream-muted">
          {t('lineage.balance')}
        </span>
        <span className={`font-label-md text-label-md font-bold ${
          isCrown ? 'text-primary' : 'text-amber-vibrant'
        }`}>
          {t('lineage.abv')} {gen.abv} · {t('lineage.brix')} {gen.brix}
        </span>
      </div>
    </div>
  );
}

export default function LineageComparisonTable({ tree }) {
  const { t } = useI18n();

  if (!tree || !tree.comparison || tree.comparison.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
        <span className="material-symbols-outlined text-5xl text-cream-muted mb-4">compare_arrows</span>
        <p className="font-body-md text-body-md text-cream-muted">
          {t('lineage.noComparisonData')}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {tree.comparison.map((gen, index) => (
        <GenerationColumn
          key={gen.generation}
          gen={gen}
          index={index}
          isCrown={index === tree.comparison.length - 1}
        />
      ))}
    </div>
  );
}
