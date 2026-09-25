/**
 * Mutation Spec Analyzer — 3-column generational comparison
 */
export default function MutationAnalyzer({ generations }) {
  if (!generations || generations.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-gutter pb-16 w-full">
      {/* Section Header */}
      <div className="flex flex-col gap-2 mb-8">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-copper-accent">insights</span>
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary">
            Phân Tích Đột Biến Cấu Trúc (Mutation Spec Analyzer)
          </span>
        </div>
        <h2 className="font-headline-lg text-headline-lg text-cream-text">
          So Sánh Tỷ Lệ Đột Biến Qua 3 Thế Hệ
        </h2>
        <p className="font-body-md text-body-md text-cream-muted max-w-2xl">
          Quan sát sự chuyển dịch từ cấu trúc tối giản thế kỷ 19 tới giải pháp hương vị
          đa tầng trong phòng thí nghiệm trạm bar đương đại.
        </p>
      </div>

      {/* 3-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {generations.map((gen, idx) => (
          <GenerationColumn key={gen.id} gen={gen} idx={idx} />
        ))}
      </div>
    </section>
  );
}

function GenerationColumn({ gen, idx }) {
  const isModern = gen.highlight;
  const headerBg = isModern ? 'bg-surface-obsidian/60' : 'bg-surface-obsidian/40';
  const footerBg = isModern ? 'bg-surface-obsidian/80' : 'bg-surface-obsidian/60';
  const badgeColor = isModern ? 'bg-primary text-on-primary' : 'bg-surface-obsidian text-primary';

  const specRows = [
    { label: '1. Rượu Nền Cốt Lõi (Core Spirit)', key: 'spirit' },
    { label: '2. Tác Nhân Tạo Ngọt (Sweetener)', key: 'sweetener' },
    { label: '3. Tác Nhân Đắng & Thảo Mộc', key: 'bitter' },
    { label: '4. Tinh Dầu & Kỹ Thuật Chiết', key: 'garnish' },
  ];

  return (
    <div className="bg-surface-slate rounded-xl p-6 shadow-xl flex flex-col justify-between">
      {/* Header */}
      <div>
        <div
          className={`flex items-center justify-between pb-4 mb-4 -mx-6 -mt-6 p-6 rounded-t-xl ${headerBg}`}
        >
          <div>
            <span className="font-label-sm text-label-sm uppercase text-copper-accent tracking-wider block">
              {gen.period}
            </span>
            <h3 className="font-headline-md text-headline-md text-cream-text mt-0.5">{gen.name}</h3>
          </div>
          <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold font-label-md text-label-md ${badgeColor}`}>
            {gen.generation}
          </span>
        </div>

        {/* Parameters Ledger */}
        <div className="flex flex-col gap-4">
          {specRows.map((row) => (
            <div key={row.key}>
              <span className="font-label-sm text-label-sm text-cream-muted uppercase block">
                {row.label}
              </span>
              <span className="font-body-md text-body-md text-cream-text font-medium block">
                {gen.specs[row.key]?.amount}
              </span>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                {gen.specs[row.key]?.note}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer — ABV/Brix */}
      <div className={`mt-6 pt-4 -mx-6 -mb-6 p-6 rounded-b-xl flex items-center justify-between ${footerBg}`}>
        <span className="font-label-sm text-label-sm uppercase text-cream-muted">
          Độ Cân Bằng (Brix/ABV)
        </span>
        <span
          className={`font-label-md text-label-md font-bold ${
            isModern ? 'text-primary' : 'text-amber-vibrant'
          }`}
        >
          {gen.abv}
        </span>
      </div>
    </div>
  );
}
