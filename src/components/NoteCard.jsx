import { useI18n } from '../i18n';
import { useFavoritesContext } from '../context/FavoritesContext';
import { useNavigate } from 'react-router-dom';
import { Image as ImageIcon } from 'lucide-react';

const DIFFICULTY_COLORS = {
  // Mapped values
  de: 'bg-primary-container/20 text-primary',
  trung_binh: 'bg-tertiary-container/20 text-tertiary',
  kho: 'bg-error-container/20 text-error',
  // Raw DB values (English)
  easy: 'bg-primary-container/20 text-primary',
  medium: 'bg-tertiary-container/20 text-tertiary',
  hard: 'bg-error-container/20 text-error',
};

// Get difficulty display label
const getDifficultyLabel = (difficulty, t) => {
  if (!difficulty) return null;
  
  const difficultyMap = {
    // Vietnamese keys
    'de': { vi: 'Dễ', en: 'Easy' },
    'trung_binh': { vi: 'Trung Bình', en: 'Medium' },
    'kho': { vi: 'Khó', en: 'Hard' },
    // English DB values
    'easy': { vi: 'Dễ', en: 'Easy' },
    'medium': { vi: 'Trung Bình', en: 'Medium' },
    'hard': { vi: 'Khó', en: 'Hard' },
    // Vietnamese text values
    'dễ': { vi: 'Dễ', en: 'Easy' },
    'trung bình': { vi: 'Trung Bình', en: 'Medium' },
    'khó': { vi: 'Khó', en: 'Hard' },
  };
  
  const lang = localStorage.getItem('language') || 'vi';
  const map = difficultyMap[difficulty.toLowerCase()];
  
  if (map) {
    return map[lang] || map.vi;
  }
  
  // If not found, capitalize first letter
  return difficulty.charAt(0).toUpperCase() + difficulty.slice(1);
};

const CATEGORY_ICONS = {
  coffee: '☕',
  tea: '🍵',
  juice: '🧃',
  beer: '🍺',
  wine: '🍷',
  dessert: '🍰',
  cocktail: '🍸',
  mocktail: '🍹',
  smoothie: '🥤',
  milkshake: '🧋',
  iced_tea: '🧊',
  lemonade: '🍋',
  hot_chocolate: '☕',
  cake: '🎂',
  cupcake: '🧁',
  muffin: '🧇',
  cookies: '🍪',
  bread: '🍞',
  pastry: '🥐',
  pie: '🥧',
  pudding: '🍮',
  ice_cream: '🍦',
  chocolate: '🍫',
  salad: '🥗',
  snack: '🍿',
  appetizer: '🥟',
  main_dish: '🍝',
  sauce: '🫙',
  other: '📝',
};

const CATEGORY_BADGES = {
  cocktail: 'Cocktail Cổ Điển',
  mocktail: 'Mocktail Tươi Mát',
  coffee: 'Specialty Coffee',
  tea: 'Trà Thủ Công',
  bread: 'Bánh Men Sống',
  pastry: 'Pastry Thủ Công',
  dessert: 'Tráng Miệng',
  cake: 'Bánh Ngọt',
  other: 'Công Thức Đặc Biệt',
};

// Get image URL from note (supports multiple image formats)
const getNoteImageUrl = (note) => {
  // Priority 1: Hero image from images array
  if (note.images?.length > 0) {
    const heroImage = note.images.find(img => img.isHero);
    if (heroImage?.url) return heroImage.url;
    if (note.images[0]?.url) return note.images[0].url;
  }
  // Priority 2: Direct image_url field
  if (note.image_url) return note.image_url;
  // Priority 3: hero_image field
  if (note.hero_image) return note.hero_image;
  // Priority 4: First image URL from any array
  if (Array.isArray(note.images)) {
    const firstImg = note.images[0];
    if (typeof firstImg === 'string') return firstImg;
    if (firstImg?.url) return firstImg.url;
  }
  return null;
};

// Get time from note (supports multiple field names)
const getNoteTime = (note) => {
  return note.time_minutes || note.prep_time || note.time || null;
};

// Get ingredients count
const getIngredientsCount = (note) => {
  if (Array.isArray(note.ingredients)) {
    return note.ingredients.length;
  }
  if (note.ingredients_count) return note.ingredients_count;
  return 0;
};

// Simple Star Rating Component
function StarRating({ rating, size = 'sm' }) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`material-symbols-outlined text-sm ${
            star <= fullStars 
              ? 'text-amber-vibrant' 
              : star === fullStars + 1 && hasHalf
              ? 'text-amber-vibrant opacity-50'
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

// Safe translation helper - returns key as fallback if translation not found
const safeT = (t, key, fallback) => {
  const result = t(key);
  // If result equals the key, translation wasn't found, use fallback
  return result === key ? fallback : result;
};

export default function NoteCard({ note, onEdit, onDelete }) {
  const { t } = useI18n();
  const { toggleFavorite, isFavorite } = useFavoritesContext();
  const navigate = useNavigate();
  
  const isLiked = isFavorite(note.id);
  const badgeText = CATEGORY_BADGES[note.category] || t(`categories.${note.category}`) || 'Công Thức';
  const categoryIcon = CATEGORY_ICONS[note.category] || '📝';
  const imageUrl = getNoteImageUrl(note);
  const noteTime = getNoteTime(note);
  const ingredientsCount = getIngredientsCount(note);
  
  // Safe translations with fallbacks
  const minutesLabel = safeT(t, 'noteCard.minutes', 'phút');
  const servingsLabel = safeT(t, 'noteCard.servings', 'người');
  const ingredientsLabel = safeT(t, 'noteCard.ingredients', 'nguyên liệu');
  const editLabel = safeT(t, 'noteCard.edit', 'Sửa');
  const deleteLabel = safeT(t, 'noteCard.delete', 'Xóa');
  const difficultyLabel = getDifficultyLabel(note.difficulty, t);
  
  // Safe title with fallback
  const noteTitle = note.title || 'Công Thức Không Tên';

  const handleClick = () => {
    navigate(`/note/${note.id}`);
  };

  return (
    <div 
      className="group relative bg-surface-slate rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
      onClick={handleClick}
    >
      {/* Card Header with Gradient Background or Image */}
      <div className="relative h-48 overflow-hidden">
        {imageUrl ? (
          <>
            <img 
              src={imageUrl} 
              alt={note.title || 'Recipe image'}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              onError={(e) => {
                // Fallback to gradient if image fails to load
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            {/* Fallback gradient (hidden by default, shown on error) */}
            <div className="absolute inset-0 bg-gradient-to-br from-surface-container via-surface-smoke to-surface-obsidian hidden items-center justify-center">
              <span className="text-7xl opacity-20">{categoryIcon}</span>
            </div>
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-br from-surface-container via-surface-smoke to-surface-obsidian"></div>
            
            {/* Decorative Pattern Overlay */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-4 right-4 w-20 h-20 border border-primary rounded-full"></div>
              <div className="absolute bottom-8 left-4 w-12 h-12 border border-copper-accent rounded-lg rotate-45"></div>
            </div>
            
            {/* Category Icon (only show if no image) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-7xl transform group-hover:scale-110 transition-transform duration-500">
                {categoryIcon}
              </span>
            </div>
          </>
        )}
        
        {/* Gradient Overlay (always on top of image) */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface-slate via-surface-slate/40 to-transparent"></div>
        
        {/* Category Badge */}
        <div className="absolute top-3 left-3 bg-surface-obsidian/80 backdrop-blur-md px-3 py-1.5 rounded-lg">
          <span className="font-label-sm text-label-sm text-copper-accent uppercase tracking-wider">
            {badgeText}
          </span>
        </div>
        
        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(note.id);
          }}
          className={`absolute top-3 right-3 w-10 h-10 rounded-full bg-surface-obsidian/70 backdrop-blur-md flex items-center justify-center transition-all hover:scale-110 ${
            isLiked ? 'text-error' : 'text-cream-muted hover:text-error'
          }`}
        >
          <span 
            className="material-symbols-outlined text-xl"
            style={{ fontVariationSettings: isLiked ? "'FILL' 1" : "'FILL' 0" }}
          >
            favorite
          </span>
        </button>
        
        {/* Difficulty Badge */}
        {difficultyLabel && (
          <div className={`absolute bottom-3 left-3 ${DIFFICULTY_COLORS[note.difficulty]} px-2.5 py-1 rounded-full font-label-sm text-label-sm`}>
            {difficultyLabel}
          </div>
        )}
        
        {/* Rating Badge */}
        {(note.avg_rating || note.rating) && (
          <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-surface-obsidian/80 backdrop-blur-md px-2 py-1 rounded-lg text-amber-vibrant font-label-md text-label-md">
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
            <span>{(note.avg_rating || note.rating).toFixed(1)}</span>
            <span className="text-cream-muted text-xs">({note.rating_count || note.review_count || 0})</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-space-lg flex flex-col gap-space-sm">
        {/* Title */}
        <h3 className="font-headline-md text-headline-md text-cream-text leading-tight group-hover:text-primary transition-colors line-clamp-2">
          {noteTitle}
        </h3>
        
        {/* Description */}
        {note.description && (
          <p className="text-sm text-on-surface-variant line-clamp-2">
            {note.description}
          </p>
        )}
        
        {/* Meta Info Bar */}
        <div className="flex items-center justify-between pt-3 border-t border-border-smoky mt-auto">
          <div className="flex items-center gap-4 text-cream-muted">
            {noteTime && (
              <span className="flex items-center gap-1.5 text-sm">
                <span className="material-symbols-outlined text-base text-copper-accent">schedule</span>
                {noteTime} {minutesLabel}
              </span>
            )}
            {note.servings && (
              <span className="flex items-center gap-1.5 text-sm">
                <span className="material-symbols-outlined text-base text-primary">local_bar</span>
                {note.servings} {servingsLabel}
              </span>
            )}
            {ingredientsCount > 0 && (
              <span className="flex items-center gap-1.5 text-sm">
                <span className="material-symbols-outlined text-base text-tertiary">list</span>
                {ingredientsCount} {ingredientsLabel}
              </span>
            )}
          </div>
        </div>
        
        {/* Author & Actions */}
        <div className="flex items-center justify-between pt-3 bg-surface-container-low px-3 py-2 rounded-lg -mx-space-lg mb-space-sm">
          {note.author_name ? (
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-surface-smoke flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-sm">person</span>
              </div>
              <span className="font-label-md text-label-md text-cream-text">{note.author_name}</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-surface-smoke flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-sm">person</span>
              </div>
              <span className="font-label-md text-label-md text-cream-text">Bartender</span>
            </div>
          )}
          
          {/* Action Buttons */}
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.(note);
              }}
              className="p-2 text-cream-muted hover:text-primary rounded-lg hover:bg-surface-smoke transition-colors"
              title={editLabel}
            >
              <span className="material-symbols-outlined text-lg">edit</span>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(note.id);
              }}
              className="p-2 text-cream-muted hover:text-error rounded-lg hover:bg-error-container/20 transition-colors"
              title={deleteLabel}
            >
              <span className="material-symbols-outlined text-lg">delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
