import { useRef, useState } from 'react';

export default function MediaLab({
  heroImage = '',
  heroImageAlt = 'A moody, high-end artisanal cocktail in a crystal glass under speakeasy spotlight',
  videoClip = {
    name: 'Flamed_Peel_Technique.mp4',
    duration: '00:12',
    fps: '60 FPS',
  },
  macroImage = '',
  macroImageAlt = 'Macro close-up shot of Persian saffron threads infusing in amber bourbon whiskey',
  onHeroImageChange,
  onVideoUpload,
  onMacroImageChange,
}) {
  const heroInputRef = useRef(null);
  const videoInputRef = useRef(null);
  const macroInputRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleHeroClick = () => heroInputRef.current?.click();
  const handleVideoClick = () => videoInputRef.current?.click();
  const handleMacroClick = () => macroInputRef.current?.click();

  return (
    <div className="p-space-lg rounded-xl bg-surface-slate shadow-sm">
      {/* Card Header */}
      <div className="flex items-center justify-between pb-space-sm">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-lg">photo_camera</span>
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary">
            Tài Nguyên Hình Ảnh &amp; Kỹ Thuật Thị Giác
          </span>
        </div>
        <span className="font-label-sm text-label-sm text-on-surface-variant">
          Tỷ Lệ Tối Ưu: 4:5 Portrait &amp; 9:16 Reel
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-space-md pt-space-xs">
        {/* Primary Hero Showcase Image */}
        <div
          className="md:col-span-7 relative group rounded-lg overflow-hidden bg-surface-obsidian aspect-[4/5] shadow-md cursor-pointer"
          onClick={handleHeroClick}
        >
          {heroImage ? (
            <>
              <img
                src={heroImage}
                alt={heroImageAlt}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-obsidian via-transparent to-transparent opacity-80"></div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-surface-smoke">
              <div className="flex flex-col items-center gap-3 text-cream-muted">
                <span className="material-symbols-outlined text-5xl">add_photo_alternate</span>
                <span className="font-label-md text-label-md">Tải Lên Ảnh Bìa</span>
              </div>
            </div>
          )}

          {heroImage && (
            <>
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-surface-slate/80 backdrop-blur-md text-amber-vibrant font-label-sm text-label-sm">
                  Ảnh Bìa Thư Viện
                </span>
                <span className="px-2.5 py-1 rounded-full bg-surface-slate/80 backdrop-blur-md text-cream-text font-label-sm text-label-sm">
                  RAW 4K
                </span>
              </div>
              <div className="absolute bottom-3 inset-x-3 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-cream-text font-semibold">
                    Chụp Trực Tiếp Tại Quầy
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Ánh sáng 2700K Warm Speakeasy</span>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleHeroClick();
                  }}
                  className="p-2 rounded-lg bg-surface-smoke/90 hover:bg-primary-container text-cream-text hover:text-on-primary-container transition-colors"
                >
                  <span className="material-symbols-outlined text-base">crop_rotate</span>
                </button>
              </div>
            </>
          )}
        </div>

        {/* Hidden file inputs */}
        <input
          ref={heroInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onHeroImageChange?.(URL.createObjectURL(file));
          }}
        />

        {/* Media Uplink Panels */}
        <div className="md:col-span-5 flex flex-col gap-space-sm justify-between">
          {/* Short Technique Video Clip */}
          <div className="p-4 rounded-lg bg-surface-obsidian flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-cream-muted uppercase">
                Clip Thao Tác Kỹ Thuật (5-15s)
              </span>
              <span className="material-symbols-outlined text-amber-vibrant text-base">slow_motion_video</span>
            </div>

            <div
              className="relative h-28 rounded bg-surface-smoke overflow-hidden flex items-center justify-center group cursor-pointer"
              onClick={handleVideoClick}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-surface-smoke to-surface-obsidian"></div>
              <div className="relative z-10 flex flex-col items-center gap-1">
                <div
                  className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container shadow-sm group-hover:scale-110 transition-transform"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPlaying(!isPlaying);
                  }}
                >
                  <span className="material-symbols-outlined text-base">
                    {isPlaying ? 'pause' : 'play_arrow'}
                  </span>
                </div>
                <span className="font-label-sm text-label-sm text-cream-text">{videoClip.name}</span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  {videoClip.duration} • {videoClip.fps} Looping
                </span>
              </div>
            </div>

            <input
              ref={videoInputRef}
              type="file"
              accept="video/mp4,video/webm"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) onVideoUpload?.(file);
              }}
            />

            <button
              onClick={handleVideoClick}
              className="w-full py-1.5 rounded bg-surface-slate hover:bg-surface-smoke text-cream-muted hover:text-cream-text font-label-sm text-label-sm transition-colors"
            >
              Tải Lên Clip Mới (MP4 / WebM)
            </button>
          </div>

          {/* Secondary Visual Angle Placeholder */}
          <div className="p-4 rounded-lg bg-surface-obsidian flex flex-col gap-2">
            <span className="font-label-sm text-label-sm text-cream-muted uppercase">
              Ảnh Chi Tiết Nguyên Liệu Maceration
            </span>
            <div
              className="relative h-28 rounded bg-surface-smoke overflow-hidden cursor-pointer"
              onClick={handleMacroClick}
            >
              {macroImage ? (
                <>
                  <img src={macroImage} alt={macroImageAlt} className="w-full h-full object-cover" />
                  <div className="absolute top-2 right-2 px-1.5 py-0.5 rounded bg-surface-obsidian/70 text-cream-text font-label-sm text-label-sm">
                    Macro Infusion
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-cream-muted">
                  <span className="material-symbols-outlined text-3xl">image</span>
                </div>
              )}
            </div>

            <input
              ref={macroInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) onMacroImageChange?.(URL.createObjectURL(file));
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
