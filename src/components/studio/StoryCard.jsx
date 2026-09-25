export default function StoryCard({
  inspiration = '',
  perfectMoment = '',
  storageNote = '',
  onChange,
}) {
  const handleChange = (field, value) => {
    onChange?.({ [field]: value });
  };

  return (
    <div className="p-space-lg rounded-xl bg-surface-slate shadow-sm">
      {/* Card Header */}
      <div className="flex items-center justify-between pb-space-sm">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-copper-accent text-lg">auto_stories</span>
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-copper-accent">
            Câu Chuyện Cảm Hứng &amp; Ghi Chú Nghệ Nhân
          </span>
        </div>
        <span className="font-label-sm text-label-sm text-cream-muted">Nhật Ký Quầy Đêm</span>
      </div>

      <div className="flex flex-col gap-space-md pt-space-xs">
        {/* Inspiration Textarea */}
        <div className="flex flex-col gap-1.5">
          <label className="font-label-sm text-label-sm text-cream-muted uppercase tracking-wider">
            Xuất Thân &amp; Cảm Hứng Hương Vị
          </label>
          <textarea
            value={inspiration}
            onChange={(e) => handleChange('inspiration', e.target.value)}
            rows={3}
            className="w-full bg-surface-obsidian text-cream-text font-headline-md text-headline-md italic px-4 py-3 rounded-lg placeholder:text-outline-variant focus:outline-none resize-none"
            placeholder='"Lấy cảm hứng từ những đêm Paris sương lạnh thập niên 1920 giao thoa với gia vị phương Đông..."'
          />
        </div>

        {/* Perfect Moment & Storage Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
          {/* Perfect Moment */}
          <div className="p-3 rounded-lg bg-surface-obsidian flex flex-col gap-1">
            <span className="font-label-sm text-label-sm text-copper-accent uppercase">
              Thời Điểm Thưởng Thức Hoàn Mỹ
            </span>
            <textarea
              value={perfectMoment}
              onChange={(e) => handleChange('perfectMoment', e.target.value)}
              rows={2}
              className="w-full bg-transparent text-cream-text font-body-sm text-body-sm focus:outline-none resize-none"
              placeholder="Đêm muộn (Late Night Digestif), sau 22:00..."
            />
          </div>

          {/* Storage Note */}
          <div className="p-3 rounded-lg bg-surface-obsidian flex flex-col gap-1">
            <span className="font-label-sm text-label-sm text-copper-accent uppercase">
              Bảo Quản Chuẩn Atelier
            </span>
            <textarea
              value={storageNote}
              onChange={(e) => handleChange('storageNote', e.target.value)}
              rows={2}
              className="w-full bg-transparent text-cream-text font-body-sm text-body-sm focus:outline-none resize-none"
              placeholder="Mẻ ngâm trích xuất bảo quản chai hổ phách kín khí ở 16°C..."
            />
          </div>
        </div>
      </div>
    </div>
  );
}
