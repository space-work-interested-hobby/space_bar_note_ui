/**
 * Station metrics strip + Remix CTA box
 */
export default function LineageStats({ metrics, title, subtitle }) {
  return (
    <section className="max-w-7xl mx-auto px-gutter pb-16 w-full">
      <div className="bg-surface-slate rounded-2xl p-8 shadow-lg">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Station Lineage Stats */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-copper-accent text-sm">workspace_premium</span>
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary">
                  Chỉ Số Lưu Trữ Trạm Bar
                </span>
              </div>
              <h3 className="font-headline-md text-headline-md text-cream-text">
                {title || 'Bản Đồ Gen Hương Vị Tại Quầy Space Bar Note'}
              </h3>
              <p className="font-body-sm text-body-sm text-cream-muted mt-1 leading-relaxed">
                {subtitle ||
                  'Mỗi công thức biến tấu tại trạm bar đều được ghi nhận dấu ấn phả hệ, tôn vinh tinh thần người sáng lập và sự tiếp biến của văn hóa thưởng thức.'}
              </p>
            </div>

            {/* 3 Stat Metrics */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-surface-obsidian p-4 rounded-xl shadow-inner">
                <span className="font-bar-mode-metric text-bar-mode-metric text-primary block">
                  {metrics?.derivedRecipes ?? 12}
                </span>
                <span className="font-label-sm text-label-sm text-cream-muted uppercase tracking-wider block mt-1">
                  Công Thức Phái Sinh
                </span>
              </div>
              <div className="bg-surface-obsidian p-4 rounded-xl shadow-inner">
                <span className="font-bar-mode-metric text-bar-mode-metric text-copper-accent block">
                  {metrics?.heritageTechniques ?? 3}
                </span>
                <span className="font-label-sm text-label-sm text-cream-muted uppercase tracking-wider block mt-1">
                  Kỹ Thuật Truyền Đời
                </span>
              </div>
              <div className="bg-surface-obsidian p-4 rounded-xl shadow-inner">
                <span className="font-bar-mode-metric text-bar-mode-metric text-cream-text block">
                  {metrics?.contributingArtisans ?? 4}
                </span>
                <span className="font-label-sm text-label-sm text-cream-muted uppercase tracking-wider block mt-1">
                  Nghệ Nhân Đóng Góp
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
                  Khởi Tạo Biến Thể Mới
                </span>
              </div>
              <h4 className="font-headline-md text-headline-md text-cream-text">Bạn Muốn Rẽ Nhánh Một Tác Phẩm?</h4>
              <p className="font-body-sm text-body-sm text-cream-muted mt-1 mb-6 leading-relaxed">
                Kế thừa bộ khung tỷ lệ từ Old Fashioned hoặc Boulevardier để phát triển một
                công thức Signature mang đậm cá tính pha chế của riêng bạn.
              </p>
            </div>
            <div className="flex flex-col gap-3">
              <button className="w-full bg-primary-container text-on-primary-container hover:bg-tertiary-container px-4 py-3 rounded-lg font-label-md text-label-md flex items-center justify-center gap-2 shadow-md transition-all font-semibold">
                <span className="material-symbols-outlined text-lg">call_split</span>
                <span>Tạo Bản Biến Tấu Mới Từ Cây Này</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
