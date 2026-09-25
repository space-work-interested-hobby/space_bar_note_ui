import { useState } from 'react';
import { useI18n } from '../i18n';
import { lineageTrees, ERAS } from '../lib/lineageData';
import LineageTree from '../components/lineage/LineageTree';
import LineageComparisonTable from '../components/lineage/LineageComparisonTable';

/* ============================================================
   LINEAGE TREE PAGE
   Cây Phả Hệ Biến Tấu Công Thức
   ============================================================ */

const VIEW_MODES = {
  TREE: 'tree',
  TABLE: 'table',
};

export default function LineageTreePage() {
  const { t } = useI18n();

  // Active state
  const [activeFamily, setActiveFamily] = useState('old_fashioned');
  const [viewMode, setViewMode] = useState(VIEW_MODES.TREE);
  const [activeEra, setActiveEra] = useState('all');

  // Get current tree data
  const currentTree = lineageTrees[activeFamily];
  const families = Object.values(lineageTrees);

  return (
    <div className="flex flex-col w-full">
      {/* ===== AMBIENT GLOW BACKDROP ===== */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute -top-32 left-1/4 w-96 h-96 bg-primary-container/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-48 right-10 w-[30rem] h-[30rem] bg-copper-accent/10 rounded-full blur-[100px] pointer-events-none"></div>

        {/* ===== SECTION 1: EDITORIAL HEADER & CONTROLS ===== */}
        <section className="max-w-7xl mx-auto px-gutter pt-8 pb-12 w-full relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 font-label-sm text-label-sm uppercase tracking-widest text-cream-muted mb-4">
            <a className="hover:text-primary transition-colors" href="#">
              {t('nav.explore')}
            </a>
            <span className="text-copper-accent/60">/</span>
            <a className="hover:text-primary transition-colors" href="#">
              {t('lineage.heritageBreadcrumb')}
            </a>
            <span className="text-copper-accent/60">/</span>
            <span className="text-amber-vibrant">
              {currentTree?.name}
            </span>
          </div>

          {/* Title & Archival Introduction */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-10">
            <div className="lg:col-span-8 flex flex-col gap-2">
              {/* Family Tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-slate w-fit shadow-sm">
                <span
                  className="material-symbols-outlined text-amber-vibrant text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  account_tree
                </span>
                <span className="font-label-sm text-label-sm tracking-wider uppercase text-cream-text">
                  {t('lineage.heritageTag')}
                </span>
              </div>

              <h1 className="font-headline-display text-headline-display text-cream-text tracking-tight">
                {t('lineage.title')}
                <span className="italic text-primary font-headline-display">
                  {' '}{t('lineage.titleMutations')}
                </span>
              </h1>

              <p className="font-body-lg text-body-lg text-cream-muted max-w-2xl mt-1 leading-relaxed">
                {t('lineage.subtitle')}
              </p>
            </div>

            {/* Archival Ledger Metadata Card */}
            <div className="lg:col-span-4 flex flex-col justify-end">
              <div className="bg-surface-slate p-4 rounded-xl shadow-md flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-surface-obsidian flex items-center justify-center text-primary shadow-inner">
                    <span className="material-symbols-outlined text-xl">auto_stories</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm uppercase tracking-widest text-copper-accent">
                      {t('lineage.archiveLib')}
                    </span>
                    <span className="font-headline-md text-headline-md text-cream-text">
                      {t('lineage.genMapTome')} #04
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-label-sm text-label-sm text-cream-muted block">
                    {t('lineage.updatedBy')}
                  </span>
                  <span className="font-body-sm text-body-sm text-primary font-medium">
                    {t('lineage.headBartender')}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ===== CONTROL BAR ===== */}
          <div className="bg-surface-slate p-2 rounded-xl shadow-md flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4">
            {/* Family Selectors */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 xl:pb-0 scrollbar-none">
              {families.map((family) => (
                <button
                  key={family.id}
                  onClick={() => setActiveFamily(family.id)}
                  className={`px-4 py-2.5 rounded-lg font-label-md text-label-md flex items-center gap-2 shrink-0 transition-all ${
                    activeFamily === family.id
                      ? 'bg-primary-container text-on-primary-container shadow-sm'
                      : 'bg-surface-obsidian/60 text-on-surface-variant hover:text-cream-text hover:bg-surface-smoke'
                  }`}
                >
                  <span className="material-symbols-outlined text-base">
                    {family.icon}
                  </span>
                  <span>{family.name}</span>
                </button>
              ))}
            </div>

            {/* Right Side: View Mode & Era Filter */}
            <div className="flex flex-wrap items-center gap-3 shrink-0">
              {/* View Toggle */}
              <div className="bg-surface-obsidian p-1 rounded-lg flex items-center shadow-inner">
                <button
                  onClick={() => setViewMode(VIEW_MODES.TREE)}
                  className={`px-3 py-1.5 rounded-md font-label-sm text-label-sm flex items-center gap-1.5 transition-all ${
                    viewMode === VIEW_MODES.TREE
                      ? 'bg-surface-smoke text-primary'
                      : 'text-on-surface-variant hover:text-cream-text'
                  }`}
                  id="btn-tree-view"
                >
                  <span className="material-symbols-outlined text-sm">hub</span>
                  <span>{t('lineage.treeView')}</span>
                </button>
                <button
                  onClick={() => setViewMode(VIEW_MODES.TABLE)}
                  className={`px-3 py-1.5 rounded-md font-label-sm text-label-sm flex items-center gap-1.5 transition-all ${
                    viewMode === VIEW_MODES.TABLE
                      ? 'bg-surface-smoke text-primary'
                      : 'text-on-surface-variant hover:text-cream-text'
                  }`}
                  id="btn-table-view"
                >
                  <span className="material-symbols-outlined text-sm">compare_arrows</span>
                  <span>{t('lineage.tableView')}</span>
                </button>
              </div>

              {/* Era Selector */}
              <div className="relative flex items-center bg-surface-obsidian rounded-lg px-3 py-1.5 text-cream-text font-label-sm text-label-sm shadow-inner">
                <span className="material-symbols-outlined text-copper-accent text-sm mr-2">history</span>
                <select
                  value={activeEra}
                  onChange={(e) => setActiveEra(e.target.value)}
                  className="bg-transparent text-cream-text focus:outline-none cursor-pointer pr-4 font-body-sm text-body-sm"
                >
                  {ERAS.map((era) => (
                    <option
                      key={era.key}
                      value={era.key}
                      className="bg-surface-slate text-cream-text"
                    >
                      {era.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ===== SECTION 2: INTERACTIVE LINEAGE TREE CANVAS ===== */}
      <section className="max-w-7xl mx-auto px-gutter pb-16 w-full">
        <div className="relative bg-surface-obsidian rounded-2xl p-6 lg:p-10 shadow-xl overflow-x-auto">
          {/* Background Archival Watermark Grid */}
          <div
            className="absolute inset-0 bg-[radial-gradient(rgba(245,179,66,0.04)_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-50"
          ></div>

          {viewMode === VIEW_MODES.TREE ? (
            <LineageTree tree={currentTree} />
          ) : (
            <LineageComparisonTable tree={currentTree} />
          )}
        </div>
      </section>

      {/* ===== SECTION 3: MUTATION SPEC ANALYZER ===== */}
      {viewMode === VIEW_MODES.TREE && (
        <section className="max-w-7xl mx-auto px-gutter pb-16 w-full">
          <div className="flex flex-col gap-2 mb-8">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-copper-accent">insights</span>
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary">
                {t('lineage.mutationAnalyzer')}
              </span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-cream-text">
              {t('lineage.mutationTitle')}
            </h2>
            <p className="font-body-md text-body-md text-cream-muted max-w-2xl">
              {t('lineage.mutationSubtitle')}
            </p>
          </div>

          {/* Comparative 3-Column Grid */}
          <LineageComparisonTable tree={currentTree} />
        </section>
      )}

      {/* ===== SECTION 4: LINEAGE LEGEND & STATION METRICS ===== */}
      <section className="max-w-7xl mx-auto px-gutter pb-16 w-full">
        <div className="bg-surface-slate rounded-2xl p-8 shadow-lg">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Station Lineage Stats */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined text-copper-accent text-sm">workspace_premium</span>
                  <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary">
                    {t('lineage.stationMetrics')}
                  </span>
                </div>
                <h3 className="font-headline-md text-headline-md text-cream-text">
                  {t('lineage.flavorMap')}
                </h3>
                <p className="font-body-sm text-body-sm text-cream-muted mt-1 leading-relaxed">
                  {t('lineage.flavorMapDesc')}
                </p>
              </div>

              {/* 3 Stat Metrics */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-surface-obsidian p-4 rounded-xl shadow-inner">
                  <span className="font-bar-mode-metric text-bar-mode-metric text-primary block">
                    {currentTree?.stats?.derivatives || 0}
                  </span>
                  <span className="font-label-sm text-label-sm text-cream-muted uppercase tracking-wider block mt-1">
                    {t('lineage.statDerivatives')}
                  </span>
                </div>
                <div className="bg-surface-obsidian p-4 rounded-xl shadow-inner">
                  <span className="font-bar-mode-metric text-bar-mode-metric text-copper-accent block">
                    {currentTree?.stats?.techniques || 0}
                  </span>
                  <span className="font-label-sm text-label-sm text-cream-muted uppercase tracking-wider block mt-1">
                    {t('lineage.statTechniques')}
                  </span>
                </div>
                <div className="bg-surface-obsidian p-4 rounded-xl shadow-inner">
                  <span className="font-bar-mode-metric text-bar-mode-metric text-cream-text block">
                    {currentTree?.stats?.artisans || 0}
                  </span>
                  <span className="font-label-sm text-label-sm text-cream-muted uppercase tracking-wider block mt-1">
                    {t('lineage.statArtisans')}
                  </span>
                </div>
              </div>
            </div>

            {/* Remix Contribution CTA Box */}
            <div className="lg:col-span-5 bg-surface-obsidian p-6 rounded-xl shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-amber-vibrant text-base">psychology_alt</span>
                  <span className="font-label-sm text-label-sm uppercase text-copper-accent tracking-widest font-semibold">
                    {t('lineage.createNewVariant')}
                  </span>
                </div>
                <h4 className="font-headline-md text-headline-md text-cream-text">
                  {t('lineage.ctaTitle')}
                </h4>
                <p className="font-body-sm text-body-sm text-cream-muted mt-1 mb-6 leading-relaxed">
                  {t('lineage.ctaDesc')}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button className="w-full bg-primary-container text-on-primary-container hover:bg-tertiary-container px-4 py-3 rounded-lg font-label-md text-label-md flex items-center justify-center gap-2 shadow-md transition-all font-semibold">
                  <span className="material-symbols-outlined text-lg">call_split</span>
                  <span>{t('lineage.createFromTree')}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="w-full bg-surface-slate mt-space-2xl">
        <div className="max-w-7xl mx-auto px-gutter py-space-2xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-space-xl mb-space-2xl">
            <div className="md:col-span-1 flex flex-col gap-space-sm">
              <div className="flex items-center gap-2">
                <span className="font-headline-md text-headline-md text-cream-text">
                  {t('lineage.footerBrand')}
                </span>
                <span className="font-label-sm text-label-sm tracking-widest uppercase text-copper-accent">
                  Atelier Spirits &amp; Brew
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                {t('lineage.footerDesc')}
              </p>
            </div>
            <div className="flex flex-col gap-space-sm">
              <span className="font-label-md text-label-md text-primary tracking-wider uppercase">
                {t('lineage.footerNav1')}
              </span>
              <ul className="flex flex-col gap-2 font-body-sm text-body-sm text-on-surface-variant">
                <li className="hover:text-on-surface transition-colors cursor-pointer">
                  {t('lineage.footerLink1a')}
                </li>
                <li className="hover:text-on-surface transition-colors cursor-pointer">
                  {t('lineage.footerLink1b')}
                </li>
                <li className="hover:text-on-surface transition-colors cursor-pointer">
                  {t('lineage.footerLink1c')}
                </li>
                <li className="hover:text-on-surface transition-colors cursor-pointer">
                  {t('lineage.footerLink1d')}
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-space-sm">
              <span className="font-label-md text-label-md text-primary tracking-wider uppercase">
                {t('lineage.footerNav2')}
              </span>
              <ul className="flex flex-col gap-2 font-body-sm text-body-sm text-on-surface-variant">
                <li className="hover:text-on-surface transition-colors cursor-pointer">
                  {t('lineage.footerLink2a')}
                </li>
                <li className="hover:text-on-surface transition-colors cursor-pointer">
                  {t('lineage.footerLink2b')}
                </li>
                <li className="hover:text-on-surface transition-colors cursor-pointer">
                  {t('lineage.footerLink2c')}
                </li>
                <li className="hover:text-on-surface transition-colors cursor-pointer">
                  {t('lineage.footerLink2d')}
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-space-sm">
              <span className="font-label-md text-label-md text-copper-accent tracking-wider uppercase">
                {t('lineage.footerResponsibility')}
              </span>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                {t('lineage.footerResponsibilityText')}
              </p>
            </div>
          </div>

          <div className="pt-space-lg flex flex-col sm:flex-row items-center justify-between gap-4 font-body-sm text-body-sm text-on-surface-variant border-t border-border-smoky pt-6">
            <p>{t('lineage.footerCopyright')}</p>
            <div className="flex items-center gap-space-md">
              <span className="hover:text-on-surface transition-colors cursor-pointer">
                {t('lineage.footerLink3a')}
              </span>
              <span className="hover:text-on-surface transition-colors cursor-pointer">
                {t('lineage.footerLink3b')}
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
