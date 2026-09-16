import { useState } from 'react';
import { useI18n } from '../i18n';

const CATEGORIES = ['cocktail', 'mocktail', 'coffee', 'tea', 'juice', 'beer', 'wine', 'dessert', 'other'];
const DIFFICULTIES = ['de', 'trung_binh', 'kho'];

export default function NoteModal({ isOpen, onClose, onSave, note, title }) {
  const { t } = useI18n();
  
  const [formData, setFormData] = useState({
    title: note?.title || '',
    description: note?.description || '',
    category: note?.category || 'cocktail',
    difficulty: note?.difficulty || 'de',
    time_minutes: note?.time_minutes || '',
    servings: note?.servings || 1,
    ingredients: note?.ingredients || [''],
    steps: note?.steps || [''],
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      ingredients: formData.ingredients.filter(i => i.trim()),
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
