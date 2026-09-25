import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '../../i18n';
import RecipeCard from './RecipeCard';

/**
 * RecipesTabContent Component
 * Displays user's created recipes with filtering
 */
export default function RecipesTabContent({ recipes }) {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');

  const handleCardClick = (recipe) => {
    navigate(`/note/${recipe.id}`);
  };

  const handleEditRecipe = (recipeId) => {
    console.log('Edit recipe:', recipeId);
    // TODO: Open edit modal
  };

  const handleViewStats = (recipeId) => {
    console.log('View stats:', recipeId);
    // TODO: Open stats modal
  };

  const handleOpenMode = (recipe) => {
    navigate(`/note/${recipe.id}`);
  };

  return (
    <section className="flex flex-col gap-space-lg mt-space-md">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-copper-accent">
            {t('profile.recipesTab.exclusiveCrafting')}
          </span>
          <h2 className="font-headline-md text-headline-md text-cream-text">
            {t('profile.recipesTab.featuredRecipes')}
          </h2>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="font-body-sm text-body-sm text-cream-muted hidden sm:inline">
            {t('profile.recipesTab.filterAll')}
          </span>
          <button className="p-2 rounded-lg bg-surface-slate text-on-surface-variant hover:text-cream-text transition-colors">
            <span className="material-symbols-outlined text-lg">filter_list</span>
          </button>
        </div>
      </div>

      {/* Recipe Cards Grid */}
      {recipes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
          {recipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={handleCardClick}
              onEdit={handleEditRecipe}
              onViewStats={handleViewStats}
              onOpenMode={handleOpenMode}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-surface-slate rounded-xl">
          <div className="text-6xl mb-4">🍸</div>
          <h3 className="text-xl font-semibold text-cream-text mb-2">
            {t('profile.recipesTab.noRecipes')}
          </h3>
          <p className="text-cream-muted">
            {t('profile.recipesTab.startCreating')}
          </p>
        </div>
      )}
    </section>
  );
}
