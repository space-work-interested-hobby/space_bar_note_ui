export default function StudioFooter({
  recipeName = 'Midnight Saffron Boulevardier',
  revision = 'Rev. Studio 1.0',
  onPrintCard,
  onPublish,
}) {
  return (
    <div className="mt-space-xl p-space-md rounded-xl bg-surface-slate shadow-xl flex flex-col sm:flex-row items-center justify-between gap-space-md">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-lg bg-surface-obsidian flex items-center justify-center text-primary">
          <span className="material-symbols-outlined text-2xl">local_bar</span>
        </div>
        <div className="flex flex-col">
          <span className="font-label-md text-label-md text-cream-text font-semibold">
            {recipeName} ({revision})
          </span>
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            Sẵn sàng xuất bản lên Thư Viện Speakeasy & Atelier Đồng Nghiệp
          </span>
        </div>
      </div>

      <div className="flex items-center gap-space-sm w-full sm:w-auto">
        <button
          onClick={onPrintCard}
          className="flex-1 sm:flex-initial px-4 py-2.5 rounded-lg bg-surface-smoke hover:bg-surface-container-high text-cream-text font-label-md text-label-md transition-colors"
        >
          In Thẻ Trạm Bar (A5 Card)
        </button>
        <button
          onClick={onPublish}
          className="flex-1 sm:flex-initial px-6 py-2.5 rounded-lg bg-primary-container hover:bg-tertiary-container text-on-primary-container font-label-md text-label-md font-bold transition-all shadow-md"
        >
          Xác Nhận Đăng Công Thức
        </button>
      </div>
    </div>
  );
}
