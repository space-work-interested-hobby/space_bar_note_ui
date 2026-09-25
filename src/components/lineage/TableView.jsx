/**
 * Table View — side-by-side comparison table for a lineage tree
 * Shows all nodes in a flat table format with era, specs, ABV
 */
export default function TableView({ tree }) {
  // Flatten all nodes from all levels
  const allNodes = (tree.levels || [])
    .flatMap((level) => level.nodes || [])
    .map((node) => ({
      ...node,
      level: node.nodeType === 'root' ? 'Cội Nguồn' : node.nodeType === 'crown' ? 'Atelier Đương Đại' : 'Phái Sinh',
    }));

  if (allNodes.length === 0) {
    return (
      <div className="text-center py-20 text-cream-muted">
        <span className="material-symbols-outlined text-5xl mb-4 block">table_chart</span>
        <p>Dữ liệu cây phả hệ đang được cập nhật.</p>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-gutter pb-16 w-full">
      {/* Header */}
      <div className="flex flex-col gap-2 mb-8">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-copper-accent">compare_arrows</span>
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary">
            Bảng So Sánh Phả Hệ
          </span>
        </div>
        <h2 className="font-headline-lg text-headline-lg text-cream-text">
          Toàn Bộ Công Thức Trong Dòng Dõi
        </h2>
        <p className="font-body-md text-body-md text-cream-muted max-w-2xl">
          Xem tất cả các biến thể cùng tỷ lệ, nguồn gốc và chỉ số cân bằng ở định dạng bảng.
        </p>
      </div>

      {/* Table */}
      <div className="bg-surface-slate rounded-xl shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-surface-obsidian">
                <th className="px-4 py-3 text-left font-label-sm text-label-sm uppercase tracking-wider text-copper-accent w-32">
                  Thế Hệ
                </th>
                <th className="px-4 py-3 text-left font-label-sm text-label-sm uppercase tracking-wider text-copper-accent">
                  Tên Công Thức
                </th>
                <th className="px-4 py-3 text-left font-label-sm text-label-sm uppercase tracking-wider text-copper-accent w-24">
                  Thời Kỳ
                </th>
                <th className="px-4 py-3 text-left font-label-sm text-label-sm uppercase tracking-wider text-copper-accent">
                  Nguồn Gốc
                </th>
                <th className="px-4 py-3 text-left font-label-sm text-label-sm uppercase tracking-wider text-copper-accent w-40">
                  Cấu Trúc
                </th>
                <th className="px-4 py-3 text-right font-label-sm text-label-sm uppercase tracking-wider text-copper-accent w-28">
                  ABV
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-smoke">
              {allNodes.map((node, idx) => (
                <tr
                  key={node.id}
                  className={`hover:bg-surface-smoke/40 transition-colors ${
                    node.nodeType === 'root'
                      ? 'bg-amber-vibrant/5'
                      : node.nodeType === 'crown'
                      ? 'bg-primary/5'
                      : ''
                  }`}
                >
                  {/* Level badge */}
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex px-2 py-1 rounded text-xs font-label-sm font-bold ${
                        node.nodeType === 'root'
                          ? 'bg-amber-vibrant/20 text-amber-vibrant'
                          : node.nodeType === 'crown'
                          ? 'bg-primary/20 text-primary'
                          : 'bg-surface-smoke text-cream-muted'
                      }`}
                    >
                      {node.level}
                    </span>
                  </td>

                  {/* Name */}
                  <td className="px-4 py-3">
                    <div className="flex flex-col">
                      <span className="font-body-md text-body-md text-cream-text font-medium">
                        {node.title}
                      </span>
                      {node.specs?.spirit && (
                        <span className="font-body-sm text-body-sm text-cream-muted mt-0.5 line-clamp-1">
                          {node.specs.spirit}
                        </span>
                      )}
                      {node.baseRatio && (
                        <span className="font-body-sm text-body-sm text-cream-muted mt-0.5 line-clamp-1">
                          {node.baseRatio}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Era */}
                  <td className="px-4 py-3">
                    <span className="font-body-sm text-body-sm text-copper-accent">{node.era || node.eraLabel}</span>
                  </td>

                  {/* Origin */}
                  <td className="px-4 py-3">
                    <span className="font-body-sm text-body-sm text-cream-muted line-clamp-2">
                      {node.origin || node.branchLabel || '—'}
                    </span>
                  </td>

                  {/* Recipe / Structure */}
                  <td className="px-4 py-3">
                    {node.recipe ? (
                      <span className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                        {node.recipe}
                      </span>
                    ) : node.specs?.sweetener ? (
                      <span className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2">
                        {node.specs.sweetener}
                      </span>
                    ) : (
                      <span className="text-cream-muted">—</span>
                    )}
                  </td>

                  {/* ABV */}
                  <td className="px-4 py-3 text-right">
                    <span
                      className={`font-label-md text-label-md font-bold ${
                        node.nodeType === 'root' || node.nodeType === 'crown'
                          ? 'text-amber-vibrant'
                          : 'text-primary'
                      }`}
                    >
                      {node.abv || node.specs?.abv?.split('•')[0] || '—'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
