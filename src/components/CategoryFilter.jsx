import { useI18n } from '../i18n';

const CATEGORY_ICONS = {
  all: '✨',
  cocktail: '🍸',
  mocktail: '🍹',
  coffee: '☕',
  tea: '🍵',
  juice: '🧃',
  beer: '🍺',
  wine: '🍷',
  dessert: '🍰',
  smoothie: '🥤',
  milkshake: '🧋',
  iced_tea: '🧊',
  lemonade: '🍋',
  hot_chocolate: '☕',
  // Baking
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
  // Kitchen
  salad: '🥗',
  snack: '🍿',
  appetizer: '🥟',
  main_dish: '🍝',
  sauce: '🫙',
  other: '📝',
};

export default function CategoryFilter({ notes, selectedCategory, onSelectCategory }) {
  const { t } = useI18n();

  // Get category counts
  const categoryCounts = notes.reduce((acc, note) => {
    acc[note.category] = (acc[note.category] || 0) + 1;
    return acc;
  }, {});

  const categories = [
    { key: 'all', label: 'Tất Cả' },
    { key: 'cocktail', label: 'Cocktail' },
    { key: 'mocktail', label: 'Mocktail' },
    { key: 'coffee', label: 'Cà Phê' },
    { key: 'tea', label: 'Trà' },
    { key: 'juice', label: 'Nước Ép' },
    { key: 'smoothie', label: 'Sinh Tố' },
    { key: 'milkshake', label: 'Milkshake' },
    { key: 'iced_tea', label: 'Trà Đá' },
    { key: 'lemonade', label: 'Lemonade' },
    { key: 'hot_chocolate', label: 'Socola Nóng' },
    { key: 'beer', label: 'Bia' },
    { key: 'wine', label: 'Rượu Vang' },
    // Baking
    { key: 'cake', label: 'Bánh Kem' },
    { key: 'cupcake', label: 'Cupcake' },
    { key: 'muffin', label: 'Muffin' },
    { key: 'cookies', label: 'Bánh Quy' },
    { key: 'bread', label: 'Bánh Mì' },
    { key: 'pastry', label: 'Pastry' },
    { key: 'pie', label: 'Pie' },
    { key: 'pudding', label: 'Pudding' },
    { key: 'ice_cream', label: 'Kem' },
    { key: 'chocolate', label: 'Socola' },
    { key: 'dessert', label: 'Tráng Miệng' },
    // Kitchen
    { key: 'salad', label: 'Salad' },
    { key: 'snack', label: 'Snack' },
    { key: 'appetizer', label: 'Khai Vị' },
    { key: 'main_dish', label: 'Món Chính' },
    { key: 'sauce', label: 'Nước Sốt' },
    { key: 'other', label: 'Khác' },
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-thin scrollbar-track-surface-slate scrollbar-thumb-surface-smoke">
      {categories.map((cat) => {
        const count = cat.key === 'all' ? notes.length : categoryCounts[cat.key] || 0;
        const isSelected = selectedCategory === cat.key;
        
        return (
          <button
            key={cat.key}
            onClick={() => onSelectCategory(cat.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full whitespace-nowrap transition-all ${
              isSelected
                ? 'bg-primary-container text-on-primary-container shadow-md scale-105'
                : 'bg-surface-slate text-cream-text hover:bg-surface-smoke hover:shadow-sm'
            }`}
          >
            <span className="text-base">{CATEGORY_ICONS[cat.key] || '📝'}</span>
            <span className="font-label-sm text-label-sm">{cat.label}</span>
            {count > 0 && (
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                isSelected 
                  ? 'bg-surface-obsidian/20 text-on-primary-container' 
                  : 'bg-surface-smoke text-cream-muted'
              }`}>
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
