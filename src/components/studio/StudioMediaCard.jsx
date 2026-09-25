import { useState, useRef } from 'react';
import { useI18n } from '../../i18n';
import { StudioCard, StudioIcon, StudioButton } from './StudioUtils';
import { Upload, X, Edit3, Check, Image as ImageIcon, Link as LinkIcon, Plus } from 'lucide-react';

// ─── Image Edit Modal ──────────────────────────────────────────────────────────
function ImageEditModal({ isOpen, onClose, image, onSave }) {
  const { t } = useI18n();
  const [editedUrl, setEditedUrl] = useState(image?.url || '');
  const [editedAlt, setEditedAlt] = useState(image?.alt || '');

  if (!isOpen || !image) return null;

  const handleSave = () => {
    onSave({ ...image, url: editedUrl, alt: editedAlt });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-surface-obsidian/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-surface-slate rounded-xl shadow-2xl w-full max-w-lg border border-border-smoky">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border-smoky">
          <h3 className="text-lg font-headline-md text-cream-text flex items-center gap-2">
            <Edit3 className="w-5 h-5 text-primary" />
            {t('studio.editImage')}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-surface-smoke rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-cream-muted" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Preview */}
          <div className="relative aspect-video rounded-lg overflow-hidden bg-surface-obsidian">
            {editedUrl ? (
              <img
                src={editedUrl}
                alt={editedAlt || 'Preview'}
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-cream-muted">
                <ImageIcon className="w-12 h-12" />
              </div>
            )}
          </div>

          {/* URL Input */}
          <div>
            <label className="block text-sm font-label-md text-cream-muted mb-1.5 uppercase tracking-wider">
              {t('studio.imageUrl')}
            </label>
            <input
              type="url"
              value={editedUrl}
              onChange={(e) => setEditedUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-4 py-2.5 bg-surface-obsidian border border-border-smoky rounded-lg text-cream-text placeholder:text-cream-muted/40 focus:outline-none focus:ring-1 focus:ring-primary transition-all"
            />
          </div>

          {/* Alt Text Input */}
          <div>
            <label className="block text-sm font-label-md text-cream-muted mb-1.5 uppercase tracking-wider">
              {t('studio.imageAlt')}
            </label>
            <input
              type="text"
              value={editedAlt}
              onChange={(e) => setEditedAlt(e.target.value)}
              placeholder={t('studio.imageAltPlaceholder')}
              className="w-full px-4 py-2.5 bg-surface-obsidian border border-border-smoky rounded-lg text-cream-text placeholder:text-cream-muted/40 focus:outline-none focus:ring-1 focus:ring-primary transition-all"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-4 border-t border-border-smoky">
          <button
            onClick={onClose}
            className="px-4 py-2 text-cream-muted hover:text-cream-text hover:bg-surface-smoke rounded-lg transition-colors font-label-md"
          >
            {t('noteModal.cancel')}
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-primary-container text-on-primary-container rounded-lg hover:bg-tertiary-container transition-colors font-label-md font-semibold flex items-center gap-2"
          >
            <Check className="w-4 h-4" />
            {t('noteModal.save')}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── URL Input Component ───────────────────────────────────────────────────────
function UrlImageInput({ onAdd, placeholder }) {
  const { t } = useI18n();
  const inputRef = useRef(null);

  const handleAdd = () => {
    const url = inputRef.current?.value.trim();
    if (url) {
      onAdd({
        id: Date.now() + Math.random(),
        url,
        name: 'URL Image',
        alt: '',
      });
      inputRef.current.value = '';
    }
  };

  return (
    <div className="flex gap-2">
      <div className="relative flex-1">
        <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-muted/40" />
        <input
          ref={inputRef}
          type="url"
          placeholder={placeholder || t('noteModal.imageUrlPlaceholder')}
          className="w-full pl-10 pr-4 py-2 bg-surface-obsidian border border-border-smoky rounded-lg text-cream-text placeholder:text-cream-muted/40 focus:outline-none focus:ring-1 focus:ring-primary transition-all text-sm"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAdd();
            }
          }}
        />
      </div>
      <button
        type="button"
        onClick={handleAdd}
        className="px-3 py-2 bg-primary-container text-on-primary-container rounded-lg hover:bg-tertiary-container transition-colors flex items-center gap-1.5 text-sm font-label-md"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  );
}

// ─── File Upload Component ─────────────────────────────────────────────────────
function ImageUploader({ onUpload, accept = "image/*", label, fullWidth = false }) {
  const { t } = useI18n();
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          onUpload({
            id: Date.now() + Math.random(),
            url: event.target.result,
            name: file.name,
            alt: '',
          });
        };
        reader.readAsDataURL(file);
      }
    });
    e.target.value = '';
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className={`py-2 rounded-lg border-2 border-dashed border-border-smoky hover:border-primary text-cream-muted hover:text-primary transition-colors text-sm font-label-md flex items-center justify-center gap-2 ${
          fullWidth ? 'w-full' : 'px-4'
        }`}
      >
        <Upload className="w-4 h-4" />
        {label || t('noteModal.uploadImages')}
      </button>
    </>
  );
}

// ─── Image Gallery Item ────────────────────────────────────────────────────────
function GalleryItem({ image, isSelected, onSelect, onEdit, onRemove }) {
  return (
    <div
      className={`relative group rounded-lg overflow-hidden bg-surface-obsidian cursor-pointer transition-all ${
        isSelected ? 'ring-2 ring-primary' : 'hover:ring-1 hover:ring-primary/50'
      }`}
      onClick={() => onSelect(image.id)}
    >
      <div className="aspect-square">
        <img
          src={image.url}
          alt={image.alt || image.name}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-surface-obsidian/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
        <button
          onClick={(e) => { e.stopPropagation(); onEdit(image); }}
          className="p-2 bg-primary-container text-on-primary-container rounded-lg hover:bg-tertiary-container transition-colors"
          title="Edit"
        >
          <Edit3 className="w-4 h-4" />
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); onRemove(image.id); }}
          className="p-2 bg-error/80 text-white rounded-lg hover:bg-error transition-colors"
          title="Remove"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      
      {/* Selected badge */}
      {isSelected && (
        <div className="absolute top-2 left-2 px-2 py-0.5 bg-primary text-on-primary rounded text-xs font-label-sm">
          Cover
        </div>
      )}
    </div>
  );
}

// ─── Media Card ────────────────────────────────────────────────────────────────
export default function StudioMediaCard({ data, onChange }) {
  const { t } = useI18n();
  const [editingImage, setEditingImage] = useState(null);
  const [showGallery, setShowGallery] = useState(false);

  // Gallery images from data or empty array
  const galleryImages = data.galleryImages || [];

  // Handle hero image upload from file
  const handleHeroImageUpload = (image) => {
    onChange({ heroImageUrl: image.url, heroImageAlt: image.alt });
  };

  // Handle hero image update from URL
  const handleHeroImageUrl = (url) => {
    onChange({ heroImageUrl: url, heroImageAlt: '' });
  };

  // Handle video upload
  const handleVideoUpload = (e) => {
    const file = e.target.files[0];
    if (file && (file.type.startsWith('video/') || file.type === 'video/mp4' || file.type === 'video/webm')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        onChange({
          techniqueVideoUrl: event.target.result,
          techniqueVideoName: file.name,
        });
      };
      reader.readAsDataURL(file);
    }
    e.target.value = '';
  };

  // Handle macro image upload from file
  const handleMacroImageUpload = (image) => {
    onChange({ macroImageUrl: image.url, macroImageAlt: image.alt });
  };

  // Handle macro image update from URL
  const handleMacroImageUrl = (url) => {
    onChange({ macroImageUrl: url, macroImageAlt: '' });
  };

  // Gallery handlers
  const handleGalleryImageUpload = (image) => {
    onChange({
      galleryImages: [...galleryImages, image]
    });
  };

  const handleGalleryImageSelect = (imageId) => {
    const selectedImage = galleryImages.find(img => img.id === imageId);
    if (selectedImage) {
      onChange({
        heroImageUrl: selectedImage.url,
        heroImageAlt: selectedImage.alt,
        heroImageId: imageId,
      });
    }
  };

  const handleGalleryImageEdit = (image) => {
    setEditingImage(image);
  };

  const handleGalleryImageSave = (editedImage) => {
    onChange({
      galleryImages: galleryImages.map(img => 
        img.id === editedImage.id ? editedImage : img
      ),
      // Also update hero if this was the hero image
      ...(data.heroImageId === editedImage.id ? {
        heroImageUrl: editedImage.url,
        heroImageAlt: editedImage.alt,
      } : {}),
    });
  };

  const handleGalleryImageRemove = (imageId) => {
    const newGallery = galleryImages.filter(img => img.id !== imageId);
    onChange({
      galleryImages: newGallery,
      // Clear hero if removed image was hero
      ...(data.heroImageId === imageId ? {
        heroImageUrl: '',
        heroImageAlt: '',
        heroImageId: null,
      } : {}),
    });
  };

  return (
    <>
      <StudioCard
        icon="photo_camera"
        iconColor="text-primary"
        title={t('studio.mediaTitle')}
        badge={t('studio.mediaOptimal')}
        action={
          <button
            onClick={() => setShowGallery(!showGallery)}
            className="px-3 py-1.5 rounded-lg bg-surface-obsidian hover:bg-surface-smoke text-cream-muted hover:text-cream-text text-sm font-label-sm transition-colors flex items-center gap-1.5"
          >
            <ImageIcon className="w-4 h-4" />
            {showGallery ? t('studio.hideGallery') : t('studio.showGallery')}
          </button>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-space-md">
          {/* Hero Showcase Image */}
          <div className="md:col-span-7 relative group rounded-lg overflow-hidden bg-surface-obsidian aspect-[4/5] shadow-md">
            {data.heroImageUrl ? (
              <>
                <img
                  src={data.heroImageUrl}
                  alt={data.heroImageAlt || ''}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-obsidian via-transparent to-transparent opacity-80" />
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-surface-slate/80 backdrop-blur-md text-amber-vibrant font-label-sm text-label-sm">
                    {t('studio.heroImageLabel')}
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-surface-slate/80 backdrop-blur-md text-cream-text font-label-sm text-label-sm">
                    {t('studio.heroImageRaw')}
                  </span>
                </div>
                <div className="absolute bottom-3 inset-x-3 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-cream-text font-semibold">
                      {t('studio.heroImageCaption')}
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      {t('studio.heroImageLight')}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {/* Edit hero button */}
                    <button
                      onClick={() => {
                        setEditingImage({
                          id: 'hero',
                          url: data.heroImageUrl,
                          alt: data.heroImageAlt || '',
                          name: 'Hero Image',
                        });
                      }}
                      className="p-2 rounded-lg bg-surface-smoke/90 hover:bg-primary-container text-cream-text hover:text-on-primary-container transition-colors"
                      title={t('studio.editImage')}
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    {/* Change hero - show URL input and upload */}
                    <div className="flex gap-1">
                      <button
                        onClick={() => {
                          const url = prompt(t('studio.enterImageUrl'));
                          if (url) handleHeroImageUrl(url);
                        }}
                        className="p-2 rounded-lg bg-surface-smoke/90 hover:bg-primary-container text-cream-text hover:text-on-primary-container transition-colors"
                        title={t('studio.addByUrl')}
                      >
                        <LinkIcon className="w-4 h-4" />
                      </button>
                      <ImageUploader
                        onUpload={handleHeroImageUpload}
                        label={<StudioIcon name="crop_rotate" className="text-base" />}
                      />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-surface-smoke p-4">
                <ImageIcon className="w-12 h-12 text-cream-muted mb-3" />
                <span className="font-label-sm text-label-sm text-cream-muted mb-4">{t('noteModal.noImages')}</span>
                
                {/* URL Input */}
                <div className="w-full max-w-[280px] mb-2">
                  <UrlImageInput
                    onAdd={handleHeroImageUpload}
                    placeholder={t('studio.enterImageUrl')}
                  />
                </div>
                
                {/* Divider */}
                <div className="flex items-center gap-2 w-full max-w-[280px] my-2">
                  <div className="flex-1 h-px bg-border-smoky"></div>
                  <span className="text-xs text-cream-muted/40">{t('noteModal.or')}</span>
                  <div className="flex-1 h-px bg-border-smoky"></div>
                </div>
                
                {/* Upload Button */}
                <ImageUploader
                  onUpload={handleHeroImageUpload}
                  label={t('studio.uploadCover')}
                  fullWidth
                />
              </div>
            )}
          </div>

          {/* Media Uplink Panels */}
          <div className="md:col-span-5 flex flex-col gap-space-sm justify-between">
            {/* Technique Video Clip */}
            <div className="p-4 rounded-lg bg-surface-obsidian flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-cream-muted uppercase">
                  {t('studio.videoClip')}
                </span>
                <StudioIcon name="slow_motion_video" className="text-amber-vibrant text-base" />
              </div>
              <div className="relative h-28 rounded bg-surface-smoke overflow-hidden flex items-center justify-center group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-surface-smoke to-surface-obsidian" />
                {data.techniqueVideoUrl ? (
                  <video
                    src={data.techniqueVideoUrl}
                    className="relative z-10 w-full h-full object-cover"
                    controls
                  />
                ) : (
                  <div className="relative z-10 flex flex-col items-center gap-1">
                    <div className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container shadow-sm group-hover:scale-110 transition-transform">
                      <StudioIcon name="play_arrow" className="text-base" />
                    </div>
                    <span className="font-label-sm text-label-sm text-cream-text">
                      {data.techniqueVideoName || t('noteModal.noImages')}
                    </span>
                    {data.techniqueVideoName && (
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        {t('studio.videoDuration')} • {t('studio.videoFps')}
                      </span>
                    )}
                  </div>
                )}
              </div>
              <label className="w-full py-1.5 rounded bg-surface-slate hover:bg-surface-smoke text-cream-muted hover:text-cream-text font-label-sm text-label-sm transition-colors text-center cursor-pointer">
                {t('studio.uploadClip')}
                <input
                  type="file"
                  accept="video/mp4,video/webm"
                  onChange={handleVideoUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Macro Image */}
            <div className="p-4 rounded-lg bg-surface-obsidian flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-label-sm text-cream-muted uppercase">
                  {t('studio.macroImage')}
                </span>
              </div>
              <div className="relative h-28 rounded bg-surface-smoke overflow-hidden">
                {data.macroImageUrl ? (
                  <>
                    <img
                      src={data.macroImageUrl}
                      alt={data.macroImageAlt || ''}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2 flex gap-1">
                      <button
                        onClick={() => {
                          const url = prompt(t('studio.enterImageUrl'));
                          if (url) handleMacroImageUrl(url);
                        }}
                        className="p-1 rounded bg-surface-slate/80 hover:bg-primary-container text-cream-text hover:text-on-primary-container transition-colors"
                        title={t('studio.addByUrl')}
                      >
                        <LinkIcon className="w-3 h-3" />
                      </button>
                      <ImageUploader
                        onUpload={handleMacroImageUpload}
                        label={<StudioIcon name="add_photo_alternate" className="text-lg" />}
                      />
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                    <ImageIcon className="text-cream-muted text-2xl" />
                    <div className="w-full px-2">
                      <UrlImageInput
                        onAdd={handleMacroImageUpload}
                        placeholder={t('studio.enterImageUrl')}
                      />
                    </div>
                  </div>
                )}
                <div className="absolute top-2 left-2 px-1.5 py-0.5 rounded bg-surface-obsidian/70 text-cream-text font-label-sm text-label-sm">
                  {t('studio.macroLabel')}
                </div>
                {data.macroImageUrl && (
                  <button
                    onClick={() => setEditingImage({
                      id: 'macro',
                      url: data.macroImageUrl,
                      alt: data.macroImageAlt || '',
                      name: 'Macro Image',
                    })}
                    className="absolute bottom-2 right-2 p-1.5 rounded bg-surface-slate/80 hover:bg-primary-container text-cream-text hover:text-on-primary-container transition-colors"
                  >
                    <Edit3 className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        {showGallery && (
          <div className="mt-space-md pt-space-md border-t border-border-smoky">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-label-md text-cream-muted font-semibold flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                {t('studio.imageGallery')}
              </h4>
              <span className="text-label-sm text-cream-muted/60">
                {galleryImages.length} {t('studio.images')}
              </span>
            </div>
            
            {/* Add Image Options */}
            <div className="flex flex-col gap-2 mb-3">
              <UrlImageInput
                onAdd={handleGalleryImageUpload}
                placeholder={t('studio.enterImageUrl')}
              />
              <div className="flex items-center gap-2">
                <div className="flex-1 h-px bg-border-smoky"></div>
                <span className="text-xs text-cream-muted/40">{t('noteModal.or')}</span>
                <div className="flex-1 h-px bg-border-smoky"></div>
              </div>
              <ImageUploader
                onUpload={handleGalleryImageUpload}
                label={t('noteModal.uploadImages')}
                fullWidth
              />
            </div>
            
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
              {/* Existing images */}
              {galleryImages.map((image) => (
                <GalleryItem
                  key={image.id}
                  image={image}
                  isSelected={data.heroImageId === image.id}
                  onSelect={handleGalleryImageSelect}
                  onEdit={handleGalleryImageEdit}
                  onRemove={handleGalleryImageRemove}
                />
              ))}
            </div>
          </div>
        )}
      </StudioCard>

      {/* Image Edit Modal */}
      <ImageEditModal
        isOpen={!!editingImage}
        onClose={() => setEditingImage(null)}
        image={editingImage}
        onSave={handleGalleryImageSave}
      />
    </>
  );
}

// Export helper components for reuse
export { ImageEditModal, ImageUploader, GalleryItem, UrlImageInput };
