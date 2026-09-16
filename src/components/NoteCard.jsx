import { useI18n } from '../i18n';

const DIFFICULTY_COLORS = {
  de: 'bg-primary-container/20 text-primary',
  trung_binh: 'bg-tertiary-container/20 text-tertiary',
  kho: 'bg-error-container/20 text-error',
};

const CATEGORY_ICONS = {
  coffee: '☕',
  tea: '🍵',
  juice: '🧃',
  beer: '🍺',
  wine: '🍷',
  dessert: '🍰',
  cocktail: '🍹',
  mocktail: '🍹',
  other: '📝',
};

// Simple Star Rating Component
function StarRating({ rating, size = 'sm' }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const sizeClass = size === 'sm' ? 'w-3 h-3' : 'w-4 h-4';
  
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`material-symbols-outlined text-sm ${
            star <= fullStars 
              ? 'text-primary' 
              : star === fullStars + 1 && hasHalf
              ? 'text-primary opacity-50'
              : 'text-surface-smoke'
          }`}
          style={{ fontVariationSettings: star <= fullStars ? "'FILL' 1" : "'FILL' 0" }}
        >
          star
        </span>
      ))}
    </div>
  );
}

export default function NoteCard({ note, onEdit, onDelete, onToggleFavorite, isFavorite }) {
  const { t } = useI18n();

  return (
    <div className="bg-surface-slate rounded-xl overflow-hidden flex flex-col transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 group">
      {/* Image */}
      <div className="relative aspect-[4/5] bg-surface-smoke overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-surface-container to-surface-obsidian flex items-center justify-center">
          <span className="text-7xl group-hover:scale-110 transition-transform duration-500">
            {CATEGORY_ICONS[note.category] || '🍹'}
          </span>
        </div>
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface-obsidian via-transparent to-transparent"></div>
        
        {/* Spirit Badge */}
        <div className="absolute top-3 left-3 bg-surface-obsidian/80 backdrop-blur-md px-3 py-1 rounded-full">
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider">
            {t(`categories.${note.category}`)}
          </span>
        </div>
        
        {/* Favorite Button */}
        <button
          onClick={() => onToggleFavorite?.(note.id)}
          className={`absolute top-3 right-3 w-10 h-10 rounded-full bg-surface-obsidian/80 backdrop-blur-md flex items-center justify-center transition-all hover:scale-110 ${
            isFavorite ? 'text-error' : 'text-cream-muted hover:text-error'
          }`}
        >
          <span 
            className="material-symbols-outlined text-xl"
            style={{ fontVariationSettings: isFavorite ? "'FILL' 1" : "'FILL' 0" }}
          >
            favorite
          </span>
        </button>

        {/* Card Title at Bottom */}
        <div className="absolute bottom-3 left-3 right-3">
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-copper-accent">
            {note.difficulty && t(`difficulty.${note.difficulty}`)}
          </span>
          <h3 className="font-headline-md text-headline-md text-cream-text leading-tight mt-1 line-clamp-2">
            {note.title || 'Untitled'}
          </h3>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between flex-1 gap-4">
        {/* Description */}
        {note.description && (
          <p className="text-sm text-cream-muted line-clamp-2">
            {note.description}
          </p>
        )}

        {/* Meta Info */}
        <div className="flex items-center justify-between text-body-sm text-cream-muted">
          {/* Rating */}
          {note.avg_rating && (
            <div className="flex items-center gap-1.5">
              <StarRating rating={note.avg_rating} />
              <span className="font-label-md text-label-md text-cream-text">{note.avg_rating}</span>
              <span className="text-cream-muted">({note.rating_count || 0})</span>
            </div>
          )}

          {/* Time & Servings */}
          <div className="flex items-center gap-3">
            {note.time_minutes && (
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-base text-copper-accent">schedule</span>
                {note.time_minutes} {t('noteCard.minutes')}
              </span>
            )}
            {note.servings && (
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-base text-primary">local_bar</span>
                {note.servings}
              </span>
            )}
          </div>
        </div>

        {/* Author Strip */}
        {note.author_name && (
          <div className="flex items-center justify-between pt-3 bg-surface-container-low px-3 py-2 rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-surface-smoke flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-sm">person</span>
              </div>
              <span className="font-label-md text-label-md text-cream-text">{note.author_name}</span>
            </div>
            <span className="font-label-sm text-label-sm bg-primary-container/20 text-primary px-2 py-0.5 rounded uppercase">
              Bartender
            </span>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-border-smoky">
          <button
            onClick={() => onEdit(note)}
            className="flex items-center gap-2 text-primary hover:text-tertiary text-sm font-medium transition-colors"
          >
            <span className="material-symbols-outlined text-base">edit</span>
            {t('noteCard.edit')}
          </button>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => onDelete?.(note.id)}
              className="p-2 text-cream-muted hover:text-error rounded-lg hover:bg-error-container/20 transition-colors"
              title={t('noteCard.delete')}
            >
              <span className="material-symbols-outlined text-lg">delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
