import { useState, useRef, useEffect } from 'react';

export default function StudioHeader({
  recipeName = 'Bản Ghi Công Thức Mới #ARC-8942',
  batchCode = '#STU-2025-09',
  lastSaved = 42,
  onSaveDraft,
  onBarMode,
  onPublish,
}) {
  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto px-gutter py-space-md">
        {/* Breadcrumbs & Status */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 font-label-sm text-label-sm text-copper-accent tracking-widest uppercase">
              <a className="text-on-surface-variant hover:text-cream-text transition-colors" href="#">Khám Phá</a>
              <span className="text-outline-variant">/</span>
              <a className="text-on-surface-variant hover:text-cream-text transition-colors" href="#">Studio Trạm Bar</a>
              <span className="text-outline-variant">/</span>
              <span className="text-primary">{recipeName}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-slate text-cream-muted font-label-sm text-label-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-vibrant animate-pulse"></span>
                Đang lưu đám mây (Cloud Sync)
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Tự động lưu {lastSaved} giây trước
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-space-sm">
            <button
              onClick={onSaveDraft}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface-slate hover:bg-surface-smoke text-cream-text font-label-md text-label-md transition-all shadow-sm"
            >
              <span className="material-symbols-outlined text-base text-primary">bookmark_border</span>
              <span>Lưu Bản Nháp</span>
            </button>
            <button
              onClick={onBarMode}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-surface-container-high hover:bg-surface-smoke text-cream-text font-label-md text-label-md transition-all shadow-sm"
            >
              <span className="material-symbols-outlined text-base text-copper-accent">fullscreen</span>
              <span>Bar Mode Thử Nghiệm</span>
            </button>
            <button
              onClick={onPublish}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary-container hover:bg-tertiary-container text-on-primary-container font-label-md text-label-md font-semibold transition-all shadow-md"
            >
              <span className="material-symbols-outlined text-base">verified</span>
              <span>Xuất Bản Atelier</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
