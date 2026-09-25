import { useState } from 'react';

export default function RemixLineage({
  parentRecipe = {
    name: 'Smoked Oak & Honey Old Fashioned (Rev. 1928)',
    author: 'Master Nguyễn Hoàng',
  },
  onParentChange,
  onUnlink,
}) {
  const [searchValue, setSearchValue] = useState(parentRecipe.name);

  return (
    <div className="mt-space-md p-space-md rounded-lg bg-surface-slate">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-surface-container-high flex items-center justify-center shrink-0 text-amber-vibrant">
            <span className="material-symbols-outlined text-xl">alt_route</span>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-label-md text-label-md text-cream-text">
                Biến tấu phái sinh (Recipe Remix Engine)
              </span>
              <span className="px-2 py-0.5 rounded-full bg-secondary-container/40 text-secondary font-label-sm text-label-sm uppercase">
                Atelier Lineage
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Phát triển từ công thức lưu trữ:{' '}
              <span className="text-primary font-medium">{parentRecipe.name}</span>
              {' '}bởi {parentRecipe.author}.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative min-w-[240px]">
            <span className="material-symbols-outlined absolute left-2.5 top-2 text-on-surface-variant text-sm">
              search
            </span>
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onBlur={() => onParentChange?.(searchValue)}
              className="w-full bg-surface-obsidian text-cream-text font-body-sm text-body-sm pl-8 pr-3 py-1.5 rounded-lg placeholder:text-cream-muted focus:outline-none"
              placeholder="Đổi công thức gốc..."
            />
          </div>
          <button
            onClick={onUnlink}
            className="px-3 py-1.5 rounded-lg bg-surface-smoke text-cream-text font-label-sm text-label-sm hover:text-primary transition-colors"
          >
            Gỡ Liên Kết
          </button>
        </div>
      </div>
    </div>
  );
}
