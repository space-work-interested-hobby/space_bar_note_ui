import { useI18n } from '../../i18n';

/**
 * RecipeCard Component
 * Individual recipe card with image, details, and actions
 */
export default function RecipeCard({ recipe, onEdit, onViewStats, onOpenMode, onClick }) {
  const { t } = useI18n();

  const getCategoryBadgeColor = (category) => {
    const colors = {
      'Cocktail Cổ Điển': 'text-primary',
      'Cà phê Specialty': 'text-copper-accent',
      'Bánh Mì Men Hoang': 'text-primary',
    };
    return colors[category] || 'text-primary';
  };

  const getSubInfo = () => {
    if (recipe.remixCount) {
      return (
        <>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">sync_alt</span>
            {recipe.remixCount} Remix
          </span>
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">local_cafe</span>
            {recipe.prepTime}
          </span>
        </>
      );
    }
    return (
      <>
        <span className="flex items-center gap-1">
          <span className="material-symbols-outlined text-sm">schedule</span>
          {recipe.prepTime}
        </span>
        {recipe.reviewCount && (
          <span className="flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">equalizer</span>
            {recipe.reviewCount} {t('profile.recipesTab.reviews')}
          </span>
        )}
      </>
    );
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick(recipe);
    }
  };

  return (
    <div 
      className="group bg-surface-slate rounded-lg overflow-hidden flex flex-col justify-between shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Image Section */}
      <div className="relative h-60 overflow-hidden">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          alt={recipe.title}
          src={recipe.image}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface-slate via-surface-slate/30 to-transparent"></div>
        
        {/* Category Badge */}
        <span className={`absolute top-3 left-3 bg-surface-obsidian/85 backdrop-blur-md px-3 py-1 rounded-full font-label-sm text-label-sm uppercase tracking-widest ${getCategoryBadgeColor(recipe.category)}`}>
          {recipe.category}
        </span>
        
        {/* Rating Badge */}
        <span className="absolute top-3 right-3 bg-surface-obsidian/85 backdrop-blur-md px-2.5 py-1 rounded-full font-body-sm text-body-sm text-primary flex items-center gap-1">
          <span className="material-symbols-outlined text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>
            star
          </span>
          {recipe.rating}
        </span>
      </div>

      {/* Content Section */}
      <div className="p-space-md flex-1 flex flex-col justify-between gap-space-md -mt-4 relative z-10">
        <div>
          {/* Title */}
          <h3 className="font-headline-md text-headline-md text-cream-text group-hover:text-primary transition-colors">
            {recipe.title}
          </h3>
          
          {/* Description */}
          <p className="font-body-sm text-body-sm text-cream-muted mt-1.5 line-clamp-2">
            {recipe.description}
          </p>
          
          {/* Sub Info */}
          <div className="flex items-center gap-4 mt-3 font-label-sm text-label-sm text-on-surface-variant">
            {getSubInfo()}
          </div>
        </div>

        {/* Card Actions */}
        <div className="pt-space-sm flex items-center justify-between gap-2">
          <button
            onClick={() => onEdit?.(recipe.id)}
            className="p-2 bg-surface-smoke hover:bg-surface-bright text-cream-text rounded-lg transition-colors"
            title={t('profile.actions.editRecipe')}
          >
            <span className="material-symbols-outlined text-base">edit_note</span>
          </button>
          
          <button
            onClick={() => onViewStats?.(recipe.id)}
            className="p-2 bg-surface-smoke hover:bg-surface-bright text-on-surface-variant hover:text-primary transition-colors"
            title={t('profile.actions.viewStats')}
          >
            <span className="material-symbols-outlined text-base">query_stats</span>
          </button>
          
          <button
            onClick={() => onOpenMode?.(recipe)}
            className="flex-1 inline-flex items-center justify-center gap-1.5 bg-primary-container text-on-primary-container px-3 py-2 rounded-lg font-label-md text-label-md hover:bg-tertiary-container transition-all"
          >
            <span className="material-symbols-outlined text-base">mode_night</span>
            <span>{recipe.mode}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
