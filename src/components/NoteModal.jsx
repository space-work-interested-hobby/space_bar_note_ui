import { useState, useRef } from 'react';
import { useI18n } from '../i18n';
import { Upload, X, Image as ImageIcon, Link as LinkIcon, Plus } from 'lucide-react';

const CATEGORIES = ['cocktail', 'mocktail', 'coffee', 'tea', 'juice', 'beer', 'wine', 'dessert', 'other'];
const DIFFICULTIES = ['de', 'trung_binh', 'kho'];

export default function NoteModal({ isOpen, onClose, onSave, note, title }) {
  const { t } = useI18n();
  const fileInputRef = useRef(null);
  
  // Convert ingredients to string format for form (handle both string and object formats)
  const initialIngredients = note?.ingredients?.map(ing => 
    typeof ing === 'string' ? ing : (ing.name || '')
  ) || [''];
  
  // Convert images to form format
  const initialImages = note?.images?.map(img => ({
    id: img.id || Date.now() + Math.random(),
    url: img.url || img,
    name: img.name || 'Image',
    caption: img.caption || '',
    alt: img.alt || '',
  })) || [];
  
  const [formData, setFormData] = useState({
    title: note?.title || '',
    description: note?.description || '',
    category: note?.category || 'cocktail',
    difficulty: note?.difficulty || 'de',
    time_minutes: note?.time_minutes || '',
    servings: note?.servings || 1,
    ingredients: initialIngredients,
    steps: note?.steps || [''],
    images: initialImages,
    heroImageId: note?.heroImageId || initialImages[0]?.id || null,
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Convert ingredients from strings to objects format for database
    const formattedIngredients = formData.ingredients
      .filter(i => i.trim())
      .map(name => ({ name }));
    
    onSave({
      ...formData,
      ingredients: formattedIngredients,
      steps: formData.steps.filter(s => s.trim()),
    });
  };

  const updateIngredient = (index, value) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index] = value;
    setFormData({ ...formData, ingredients: newIngredients });
  };

  const addIngredient = () => {
    setFormData({ ...formData, ingredients: [...formData.ingredients, ''] });
  };

  const removeIngredient = (index) => {
    setFormData({
      ...formData,
      ingredients: formData.ingredients.filter((_, i) => i !== index),
    });
  };

  const updateStep = (index, value) => {
    const newSteps = [...formData.steps];
    newSteps[index] = value;
    setFormData({ ...formData, steps: newSteps });
  };

  const addStep = () => {
    setFormData({ ...formData, steps: [...formData.steps, ''] });
  };

  const removeStep = (index) => {
    setFormData({
      ...formData,
      steps: formData.steps.filter((_, i) => i !== index),
    });
  };

  // Image handling
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    files.forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setFormData(prev => ({
            ...prev,
            images: [...prev.images, {
              id: Date.now() + Math.random(),
              url: event.target.result,
              name: file.name,
              caption: '',
            }]
          }));
        };
        reader.readAsDataURL(file);
      }
    });
    e.target.value = '';
  };

  const removeImage = (id) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter(img => img.id !== id)
    }));
  };

  const updateImageCaption = (id, caption) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.map(img => 
        img.id === id ? { ...img, caption } : img
      )
    }));
  };

  const setHeroImage = (id) => {
    setFormData(prev => ({
      ...prev,
      heroImageId: id
    }));
  };

  return (
    <div className="fixed inset-0 bg-bar-mode-canvas/90 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-surface-slate rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden border border-border-smoky">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border-smoky">
          <h2 className="text-xl font-headline-md text-cream-text">{title}</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-surface-smoke rounded-lg transition-colors"
          >
            <span className="material-symbols-outlined text-cream-muted">close</span>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-4 overflow-y-auto max-h-[calc(90vh-130px)]">
          <div className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-label-md text-cream-muted mb-1 uppercase tracking-wider">
                {t('noteModal.recipeTitle')}
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder={t('noteModal.recipeTitlePlaceholder')}
                className="w-full px-4 py-3 bg-surface-obsidian border border-border-smoky rounded-lg text-cream-text placeholder:text-cream-muted focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-label-md text-cream-muted mb-1 uppercase tracking-wider">
                {t('noteModal.description')}
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder={t('noteModal.descriptionPlaceholder')}
                className="w-full px-4 py-3 bg-surface-obsidian border border-border-smoky rounded-lg text-cream-text placeholder:text-cream-muted focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all resize-none"
                rows={2}
              />
            </div>

            {/* Category & Difficulty */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-label-md text-cream-muted mb-1 uppercase tracking-wider">
                  {t('noteModal.category')}
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 bg-surface-obsidian border border-border-smoky rounded-lg text-cream-text focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all appearance-none cursor-pointer"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{t(`categories.${cat}`)}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-label-md text-cream-muted mb-1 uppercase tracking-wider">
                  {t('noteModal.difficulty')}
                </label>
                <select
                  value={formData.difficulty}
                  onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                  className="w-full px-4 py-3 bg-surface-obsidian border border-border-smoky rounded-lg text-cream-text focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all appearance-none cursor-pointer"
                >
                  {DIFFICULTIES.map(diff => (
                    <option key={diff} value={diff}>{t(`difficulty.${diff}`)}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Time & Servings */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-label-md text-cream-muted mb-1 uppercase tracking-wider">
                  {t('noteModal.time')} (phút)
                </label>
                <input
                  type="number"
                  value={formData.time_minutes}
                  onChange={(e) => setFormData({ ...formData, time_minutes: e.target.value })}
                  min="1"
                  className="w-full px-4 py-3 bg-surface-obsidian border border-border-smoky rounded-lg text-cream-text focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                />
              </div>
              
              <div>
                <label className="block text-sm font-label-md text-cream-muted mb-1 uppercase tracking-wider">
                  {t('noteModal.servings')}
                </label>
                <input
                  type="number"
                  value={formData.servings}
                  onChange={(e) => setFormData({ ...formData, servings: e.target.value })}
                  min="1"
                  className="w-full px-4 py-3 bg-surface-obsidian border border-border-smoky rounded-lg text-cream-text focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                />
              </div>
            </div>

            {/* Ingredients */}
            <div>
              <label className="block text-sm font-label-md text-cream-muted mb-2 uppercase tracking-wider flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">liquor</span>
                {t('noteModal.ingredients')}
              </label>
              <div className="space-y-2">
                {formData.ingredients.map((ingredient, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={ingredient}
                      onChange={(e) => updateIngredient(index, e.target.value)}
                      placeholder={t('noteModal.ingredientsPlaceholder')}
                      className="flex-1 px-4 py-2.5 bg-surface-obsidian border border-border-smoky rounded-lg text-cream-text placeholder:text-cream-muted focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                    />
                    {formData.ingredients.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeIngredient(index)}
                        className="px-3 py-2 text-error hover:bg-error-container/20 rounded-lg transition-colors"
                      >
                        <span className="material-symbols-outlined">close</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addIngredient}
                className="mt-2 text-sm text-primary hover:text-tertiary font-label-md flex items-center gap-1 transition-colors"
              >
                <span className="material-symbols-outlined text-sm">add</span>
                + {t('noteModal.addIngredient')}
              </button>
            </div>

            {/* Steps */}
            <div>
              <label className="block text-sm font-label-md text-cream-muted mb-2 uppercase tracking-wider flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">format_list_numbered</span>
                {t('noteModal.steps')}
              </label>
              <div className="space-y-3">
                {formData.steps.map((step, index) => (
                  <div key={index} className="flex gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-primary-container text-on-primary-container rounded-full flex items-center justify-center text-sm font-bold font-label-md mt-1">
                      {index + 1}
                    </span>
                    <textarea
                      value={step}
                      onChange={(e) => updateStep(index, e.target.value)}
                      placeholder={t('noteModal.stepPlaceholder')}
                      className="flex-1 px-4 py-2.5 bg-surface-obsidian border border-border-smoky rounded-lg text-cream-text placeholder:text-cream-muted focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all resize-none"
                      rows={2}
                    />
                    {formData.steps.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeStep(index)}
                        className="px-3 py-2 text-error hover:bg-error-container/20 rounded-lg transition-colors mt-1"
                      >
                        <span className="material-symbols-outlined">close</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addStep}
                className="mt-2 text-sm text-primary hover:text-tertiary font-label-md flex items-center gap-1 transition-colors"
              >
                <span className="material-symbols-outlined text-sm">add</span>
                + {t('noteModal.addStep')}
              </button>
            </div>

            {/* Images */}
            <div>
              <label className="block text-sm font-label-md text-cream-muted mb-2 uppercase tracking-wider flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">photo_camera</span>
                {t('noteModal.images')}
                <span className="text-label-xs text-cream-muted/60 normal-case tracking-normal">({t('noteModal.optional')})</span>
              </label>
              
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                className="hidden"
              />
              
              {/* Add Image Options */}
              <div className="flex flex-col gap-3">
                {/* URL Input + Add Button */}
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cream-muted/40" />
                    <input
                      type="url"
                      id="imageUrlInput"
                      placeholder={t('noteModal.imageUrlPlaceholder')}
                      className="w-full pl-10 pr-4 py-2.5 bg-surface-obsidian border border-border-smoky rounded-lg text-cream-text placeholder:text-cream-muted/40 focus:outline-none focus:ring-1 focus:ring-primary transition-all text-sm"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          const input = e.target;
                          if (input.value.trim()) {
                            setFormData(prev => ({
                              ...prev,
                              images: [...prev.images, {
                                id: Date.now() + Math.random(),
                                url: input.value.trim(),
                                name: 'URL Image',
                                caption: '',
                              }]
                            }));
                            input.value = '';
                          }
                        }
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const input = document.getElementById('imageUrlInput');
                      if (input.value.trim()) {
                        setFormData(prev => ({
                          ...prev,
                          images: [...prev.images, {
                            id: Date.now() + Math.random(),
                            url: input.value.trim(),
                            name: 'URL Image',
                            caption: '',
                          }]
                        }));
                        input.value = '';
                      }
                    }}
                    className="px-4 py-2.5 bg-primary-container text-on-primary-container rounded-lg hover:bg-tertiary-container transition-colors flex items-center gap-1.5 text-sm font-label-md"
                  >
                    <Plus className="w-4 h-4" />
                    <span>{t('noteModal.addByUrl')}</span>
                  </button>
                </div>
                
                {/* Divider with OR */}
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-px bg-border-smoky"></div>
                  <span className="text-xs text-cream-muted/40">{t('noteModal.or')}</span>
                  <div className="flex-1 h-px bg-border-smoky"></div>
                </div>
                
                {/* Upload button */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-3 border-2 border-dashed border-border-smoky hover:border-primary rounded-lg flex items-center justify-center gap-2 text-cream-muted hover:text-primary transition-colors"
                >
                  <Upload className="w-5 h-5" />
                  <span className="font-label-md">{t('noteModal.uploadImages')}</span>
                </button>
              </div>
              
              {/* Image preview grid */}
              {formData.images.length > 0 && (
                <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {formData.images.map((img, index) => (
                    <div 
                      key={img.id} 
                      className={`relative group rounded-lg overflow-hidden bg-surface-obsidian aspect-square ${
                        formData.heroImageId === img.id ? 'ring-2 ring-primary' : ''
                      }`}
                    >
                      <img
                        src={img.url}
                        alt={img.name || `Image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Overlay with actions */}
                      <div className="absolute inset-0 bg-surface-obsidian/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                        {/* Set as hero button */}
                        {formData.heroImageId !== img.id && (
                          <button
                            type="button"
                            onClick={() => setHeroImage(img.id)}
                            className="px-2 py-1 bg-primary-container text-on-primary-container rounded text-label-xs font-label-sm hover:bg-tertiary-container transition-colors"
                          >
                            {t('noteModal.setAsHero')}
                          </button>
                        )}
                        {formData.heroImageId === img.id && (
                          <span className="px-2 py-1 bg-primary text-on-primary rounded text-label-xs font-label-sm">
                            {t('noteModal.heroPhoto')}
                          </span>
                        )}
                        
                        {/* Remove button */}
                        <button
                          type="button"
                          onClick={() => removeImage(img.id)}
                          className="p-1.5 bg-error/80 hover:bg-error text-white rounded-full transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                      
                      {/* Hero badge */}
                      {formData.heroImageId === img.id && (
                        <div className="absolute top-2 left-2 px-2 py-0.5 bg-primary text-on-primary rounded text-label-xs font-label-sm">
                          {t('noteModal.coverPhoto')}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              
              {/* Image caption input */}
              {formData.images.length > 0 && (
                <div className="mt-3 space-y-2">
                  <label className="block text-xs text-cream-muted/60 font-label-sm">
                    {t('noteModal.imageCaption')}
                  </label>
                  {formData.images.map((img, index) => (
                    <div key={img.id} className="flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-cream-muted/40 shrink-0" />
                      <img src={img.url} alt="" className="w-10 h-10 object-cover rounded" />
                      <input
                        type="text"
                        value={img.caption}
                        onChange={(e) => updateImageCaption(img.id, e.target.value)}
                        placeholder={t('noteModal.captionPlaceholder')}
                        className="flex-1 px-3 py-1.5 bg-surface-obsidian border border-border-smoky rounded text-cream-text placeholder:text-cream-muted/40 focus:outline-none focus:ring-1 focus:ring-primary text-sm"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border-smoky">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-cream-muted hover:text-cream-text hover:bg-surface-smoke rounded-lg transition-colors font-label-md"
            >
              {t('noteModal.cancel')}
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-primary-container text-on-primary-container rounded-lg hover:bg-tertiary-container hover:text-on-tertiary-container transition-colors font-label-md font-semibold shadow-lg"
            >
              {t('noteModal.save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
