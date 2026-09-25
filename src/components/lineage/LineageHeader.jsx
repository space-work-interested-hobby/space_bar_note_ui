import { NODE_LEGEND } from '../../data/lineageTrees';

/**
 * Breadcrumb + Title Header + Archival Metadata Card
 */
export default function LineageHeader({ familyName }) {
  return (
    <>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 font-label-sm text-label-sm uppercase tracking-widest text-cream-muted mb-4">
        <a className="hover:text-primary transition-colors" href="#">
          Khám Phá
        </a>
        <span className="text-copper-accent/60">/</span>
        <a className="hover:text-primary transition-colors" href="#">
          Di Sản &amp; Phả Hệ Pha Chế
        </a>
        <span className="text-copper-accent/60">/</span>
        <span className="text-amber-vibrant">{familyName}</span>
      </div>

      {/* Title & Archival Introduction */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end mb-10">
        <div className="lg:col-span-8 flex flex-col gap-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-slate w-fit shadow-sm">
            <span
              className="material-symbols-outlined text-amber-vibrant text-sm"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              account_tree
            </span>
            <span className="font-label-sm text-label-sm tracking-wider uppercase text-cream-text">
              Atelier Heritage &amp; Remix Lineage Tree
            </span>
          </div>
          <h1 className="font-headline-display text-headline-display text-cream-text tracking-tight">
            Cây Phả Hệ{' '}
            <span className="italic text-primary font-headline-display">Biến Tấu</span> Công Thức
          </h1>
          <p className="font-body-lg text-body-lg text-cream-muted max-w-2xl mt-1 leading-relaxed">
            Truy vết nguồn gốc và sự tiến hóa của các dòng cocktail kinh điển qua từng
            thời kỳ lịch sử, từ nguyên bản 1884 đến các sáng tạo độc bản tại trạm bar hiện
            đại.
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
                  Lưu Trữ Thư Viện
                </span>
                <span className="font-headline-md text-headline-md text-cream-text">
                  Tập Bản Đồ Gen #04
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="font-label-sm text-label-sm text-cream-muted block">Cập nhật bởi</span>
              <span className="font-body-sm text-body-sm text-primary font-medium">Head Bartender</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/**
 * Family Switcher, View Toggle, and Era Filter
 */
export function LineageControls({
  families,
  activeFamily,
  onFamilyChange,
  viewMode,
  onViewModeChange,
  eraFilter,
  onEraChange,
}) {
  return (
    <div className="bg-surface-slate p-2 rounded-xl shadow-md flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4">
      {/* Family Selectors */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 xl:pb-0 scrollbar-none">
        {families.map((family) => (
          <button
            key={family.id}
            onClick={() => onFamilyChange(family.id)}
            className={`px-4 py-2.5 rounded-lg font-label-md text-label-md flex items-center gap-2 shrink-0 transition-all ${
              activeFamily === family.id
                ? 'bg-primary-container text-on-primary-container shadow-sm'
                : 'bg-surface-obsidian/60 text-on-surface-variant hover:text-cream-text hover:bg-surface-smoke'
            }`}
          >
            <span
              className="material-symbols-outlined text-base"
              style={
                activeFamily === family.id
                  ? { fontVariationSettings: "'FILL' 1" }
                  : {}
              }
            >
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
            onClick={() => onViewModeChange('tree')}
            className={`px-3 py-1.5 rounded-md font-label-sm text-label-sm flex items-center gap-1.5 transition-all ${
              viewMode === 'tree'
                ? 'bg-surface-smoke text-primary'
                : 'text-on-surface-variant hover:text-cream-text'
            }`}
          >
            <span className="material-symbols-outlined text-sm">hub</span>
            <span>Sơ Đồ Phả Hệ</span>
          </button>
          <button
            onClick={() => onViewModeChange('table')}
            className={`px-3 py-1.5 rounded-md font-label-sm text-label-sm flex items-center gap-1.5 transition-all ${
              viewMode === 'table'
                ? 'bg-surface-smoke text-primary'
                : 'text-on-surface-variant hover:text-cream-text'
            }`}
          >
            <span className="material-symbols-outlined text-sm">compare_arrows</span>
            <span>Bảng So Sánh</span>
          </button>
        </div>

        {/* Era Selector */}
        <div className="relative flex items-center bg-surface-obsidian rounded-lg px-3 py-1.5 text-cream-text shadow-inner">
          <span className="material-symbols-outlined text-copper-accent text-sm mr-2">history</span>
          <select
            value={eraFilter}
            onChange={(e) => onEraChange(e.target.value)}
            className="bg-transparent text-cream-text focus:outline-none cursor-pointer pr-4 font-body-sm text-body-sm"
          >
            <option className="bg-surface-slate text-cream-text" value="all">
              Tất Cả Thời Kỳ
            </option>
            <option className="bg-surface-slate text-cream-text" value="golden">
              Kỷ Nguyên Vàng (1880 - 1920)
            </option>
            <option className="bg-surface-slate text-cream-text" value="prohibition">
              Thời Kỳ Cấm Rượu (1920 - 1933)
            </option>
            <option className="bg-surface-slate text-cream-text" value="modern">
              Phục Hưng Hiện Đại (2000 - Nay)
            </option>
          </select>
        </div>
      </div>
    </div>
  );
}

/**
 * Legend strip shown above the tree canvas
 */
export function TreeLegend({ legend = NODE_LEGEND }) {
  return (
    <div className="flex items-center gap-4 text-cream-muted font-body-sm text-body-sm">
      {legend.map((item) => (
        <span key={item.label} className="flex items-center gap-1.5">
          <span className={`w-3 h-3 rounded ${item.color} inline-block`} />
          {item.label}
        </span>
      ))}
    </div>
  );
}
