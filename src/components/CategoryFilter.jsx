import { useI18n } from '../i18n';

const CATEGORY_ICONS = {
  all: 'star',
  cocktail: 'local_bar',
  mocktail: 'local_cafe',
  coffee: 'coffee',
  tea: 'emoji_food_beverage',
  juice: 'water_drop',
  beer: 'sports_bar',
  wine: 'wine_bar',
  dessert: 'cake',
  other: 'notes',
};

export default function CategoryFilter({ notes, selectedCategory, onSelectCategory }) {
  const { t } = useI18n();

  // Get category counts
  const categoryCounts = notes.reduce((acc, note) => {
    acc[note.category] = (acc[note.category] || 0) + 1;
    return acc;
  }, {});

  const categories = [
    { key: 'all', count: notes.length },
    { key: 'cocktail' },
    { key: 'mocktail' },
    { key: 'coffee' },
    { key: 'tea' },
    { key: 'juice' },
    { key: 'beer' },
    { key: 'wine' },
    { key: 'dessert' },
    { key: 'other' },
  ];

  // Add counts to categories
  categories.forEach(cat => {
    if (cat.key !== 'all') {
      cat.count = categoryCounts[cat.key] || 0;
    }
  });

  return (
    <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
      <span className="font-label-sm text-label-sm uppercase tracking-wider text-cream-muted shrink-0 mr-1">
        Lọc Nhanh:
      </span>
      {categories.map(({ key, count }) => (
        <button
          key={key}
          onClick={() => onSelectCategory(key)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all shrink-0 ${
            selectedCategory === key
              ? 'bg-primary-container text-on-primary-container shadow-md'
              : 'bg-surface-slate text-cream-text hover:bg-surface-smoke shadow-sm'
          }`}
        >
          <span className="material-symbols-outlined text-base">{CATEGORY_ICONS[key]}</span>
          <span>{t(`categories.${key}`)}</span>
          {count > 0 && (
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              selectedCategory === key 
                ? 'bg-surface-obsidian/20' 
                : 'bg-surface-smoke'
            }`}>
              {count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
