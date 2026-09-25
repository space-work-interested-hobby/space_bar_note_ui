import { useI18n } from '../../i18n';

/**
 * CollectionsTabContent Component
 * Displays user's recipe collections
 */
export default function CollectionsTabContent() {
  const { t } = useI18n();

  // Mock collections data
  const collections = [
    {
      id: 'col-001',
      name: 'Cocktails Mùa Hè',
      nameEn: 'Summer Cocktails',
      count: 12,
      coverImage: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400',
      isPublic: true,
    },
    {
      id: 'col-002',
      name: 'Bánh Mì Thủ Công',
      nameEn: 'Artisan Bread',
      count: 8,
      coverImage: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400',
      isPublic: true,
    },
    {
      id: 'col-003',
      name: 'Cold Brew Recipes',
      nameEn: 'Cold Brew Recipes',
      count: 6,
      coverImage: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400',
      isPublic: false,
    },
    {
      id: 'col-004',
      name: 'Whisky Sour Biến Thể',
      nameEn: 'Whisky Sour Variations',
      count: 15,
      coverImage: 'https://images.unsplash.com/photo-1518398046578-8cca57782e17?w=400',
      isPublic: true,
    },
    {
      id: 'col-005',
      name: 'Siro & Cordial Tự Nấu',
      nameEn: 'Homemade Syrups & Cordials',
      count: 9,
      coverImage: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400',
      isPublic: true,
    },
    {
      id: 'col-006',
      name: 'Tráng Miệng Phong Cách Bar',
      nameEn: 'Bar-Style Desserts',
      count: 7,
      coverImage: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400',
      isPublic: false,
    },
  ];

  const handleCreateCollection = () => {
    console.log('Create new collection');
    // TODO: Open create collection modal
  };

  const handleEditCollection = (collectionId) => {
    console.log('Edit collection:', collectionId);
    // TODO: Open edit modal
  };

  return (
    <section className="flex flex-col gap-space-lg mt-space-md">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-copper-accent">
            {t('profile.collectionsTab.curatedSets')}
          </span>
          <h2 className="font-headline-md text-headline-md text-cream-text">
            {t('profile.collectionsTab.myCollections')}
          </h2>
        </div>
        
        <button
          onClick={handleCreateCollection}
          className="inline-flex items-center gap-2 bg-primary-container text-on-primary-container px-4 py-2 rounded-lg font-label-md text-label-md hover:bg-tertiary-container transition-all"
        >
          <span className="material-symbols-outlined text-base">add</span>
          <span>{t('profile.actions.createCollection')}</span>
        </button>
      </div>

      {/* Collections Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-lg">
        {collections.map((collection) => (
          <div
            key={collection.id}
            className="group bg-surface-slate rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
            onClick={() => handleEditCollection(collection.id)}
          >
            {/* Cover Image */}
            <div className="relative h-40 overflow-hidden">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt={collection.name}
                src={collection.coverImage}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface-slate/80 to-transparent"></div>
              
              {/* Privacy Badge */}
              {!collection.isPublic && (
                <span className="absolute top-3 right-3 bg-surface-obsidian/85 backdrop-blur-md px-2 py-1 rounded-full">
                  <span className="material-symbols-outlined text-sm text-on-surface-variant">
                    lock
                  </span>
                </span>
              )}
            </div>

            {/* Content */}
            <div className="p-space-md">
              <h3 className="font-headline-md text-headline-md text-cream-text group-hover:text-primary transition-colors">
                {collection.name}
              </h3>
              <div className="flex items-center gap-2 mt-2">
                <span className="material-symbols-outlined text-sm text-on-surface-variant">
                  menu_book
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  {collection.count} {t('profile.collectionsTab.recipes')}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
