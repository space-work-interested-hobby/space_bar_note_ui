import { useI18n } from '../../i18n';

/**
 * StashTabContent Component
 * Displays user's temporary stash/buffer storage
 */
export default function StashTabContent() {
  const { t } = useI18n();

  // Mock stash items data
  const stashItems = [
    {
      id: 'stash-001',
      name: 'Công thức Old Fashioned Biến Thể',
      nameEn: 'Old Fashioned Variation Draft',
      status: 'draft',
      lastModified: '2 giờ trước',
      category: 'Cocktail',
    },
    {
      id: 'stash-002',
      name: 'Siro Gừng Tự Nấu - Bản nháp v2',
      nameEn: 'Homemade Ginger Syrup - Draft v2',
      status: 'draft',
      lastModified: '5 giờ trước',
      category: 'Siro',
    },
    {
      id: 'stash-003',
      name: 'Bánh Mì Bơ Tỏi Ý',
      nameEn: 'Italian Garlic Bread',
      status: 'archived',
      lastModified: '1 ngày trước',
      category: 'Bánh Mì',
    },
    {
      id: 'stash-004',
      name: 'Cold Brew Yirgacheffe Notes',
      nameEn: 'Cold Brew Yirgacheffe Notes',
      status: 'draft',
      lastModified: '1 ngày trước',
      category: 'Cà Phê',
    },
    {
      id: 'stash-005',
      name: 'Fat-Washed Bourbon Experiment',
      nameEn: 'Fat-Washed Bourbon Experiment',
      status: 'archived',
      lastModified: '3 ngày trước',
      category: 'Kỹ Thuật',
    },
  ];

  const handleRestoreItem = (itemId) => {
    console.log('Restore stash item:', itemId);
    // TODO: Implement restore functionality
  };

  const handleDeleteItem = (itemId) => {
    console.log('Delete stash item:', itemId);
    // TODO: Implement delete with confirmation
  };

  const handleCreateNew = () => {
    console.log('Create new stash item');
    // TODO: Navigate to create page
  };

  const getStatusBadge = (status) => {
    if (status === 'draft') {
      return (
        <span className="px-2 py-0.5 bg-primary-container/20 text-primary text-xs font-medium rounded-full">
          Bản nháp
        </span>
      );
    }
    return (
      <span className="px-2 py-0.5 bg-surface-smoke text-on-surface-variant text-xs font-medium rounded-full">
        Đã lưu trữ
      </span>
    );
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Cocktail': 'liquor',
      'Siro': 'water_drop',
      'Bánh Mì': 'bakery_dining',
      'Cà Phê': 'local_cafe',
      'Kỹ Thuật': 'science',
    };
    return icons[category] || 'inventory_2';
  };

  return (
    <section className="flex flex-col gap-space-lg mt-space-md">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-copper-accent">
            {t('profile.stashTab.temporaryVault')}
          </span>
          <h2 className="font-headline-md text-headline-md text-cream-text">
            {t('profile.stashTab.stashBox')}
          </h2>
        </div>
        
        <button
          onClick={handleCreateNew}
          className="inline-flex items-center gap-2 bg-primary-container text-on-primary-container px-4 py-2 rounded-lg font-label-md text-label-md hover:bg-tertiary-container transition-all"
        >
          <span className="material-symbols-outlined text-base">add</span>
          <span>{t('profile.stashTab.createNew')}</span>
        </button>
      </div>

      {/* Stash Info */}
      <div className="bg-surface-slate rounded-xl p-space-lg shadow-lg">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-surface-smoke rounded-lg">
            <span className="material-symbols-outlined text-2xl text-primary">inventory_2</span>
          </div>
          <div>
            <p className="font-body-md text-body-md text-cream-text">
              {t('profile.stashTab.description')}
            </p>
            <p className="font-body-sm text-body-sm text-cream-muted mt-1">
              {t('profile.stashTab.subDescription')}
            </p>
          </div>
        </div>
      </div>

      {/* Stash Items List */}
      {stashItems.length > 0 ? (
        <div className="bg-surface-slate rounded-xl shadow-lg overflow-hidden">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-space-lg py-space-md bg-surface-smoke border-b border-border-smoky">
            <div className="col-span-5 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
              {t('profile.stashTab.name')}
            </div>
            <div className="col-span-2 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
              {t('profile.stashTab.category')}
            </div>
            <div className="col-span-2 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
              {t('profile.stashTab.status')}
            </div>
            <div className="col-span-2 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
              {t('profile.stashTab.lastModified')}
            </div>
            <div className="col-span-1"></div>
          </div>

          {/* Table Rows */}
          {stashItems.map((item, index) => (
            <div 
              key={item.id}
              className={`
                grid grid-cols-12 gap-4 px-space-lg py-space-md items-center
                ${index !== stashItems.length - 1 ? 'border-b border-border-smoky' : ''}
                hover:bg-surface-smoke/50 transition-colors
              `}
            >
              {/* Name */}
              <div className="col-span-5">
                <p className="font-body-md text-body-md text-cream-text truncate">
                  {item.name}
                </p>
                <p className="font-body-sm text-body-sm text-cream-muted truncate">
                  {item.nameEn}
                </p>
              </div>

              {/* Category */}
              <div className="col-span-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-sm text-on-surface-variant">
                  {getCategoryIcon(item.category)}
                </span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  {item.category}
                </span>
              </div>

              {/* Status */}
              <div className="col-span-2">
                {getStatusBadge(item.status)}
              </div>

              {/* Last Modified */}
              <div className="col-span-2">
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  {item.lastModified}
                </span>
              </div>

              {/* Actions */}
              <div className="col-span-1 flex items-center justify-end gap-1">
                {item.status === 'draft' ? (
                  <button
                    onClick={() => handleRestoreItem(item.id)}
                    className="p-1.5 rounded-lg hover:bg-primary-container/20 text-on-surface-variant hover:text-primary transition-colors"
                    title={t('profile.stashTab.restore')}
                  >
                    <span className="material-symbols-outlined text-base">restore_from_trash</span>
                  </button>
                ) : (
                  <button
                    onClick={() => handleRestoreItem(item.id)}
                    className="p-1.5 rounded-lg hover:bg-surface-smoke text-on-surface-variant hover:text-cream-text transition-colors"
                    title={t('profile.stashTab.unarchive')}
                  >
                    <span className="material-symbols-outlined text-base">unarchive</span>
                  </button>
                )}
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="p-1.5 rounded-lg hover:bg-error/10 text-on-surface-variant hover:text-error transition-colors"
                  title={t('profile.stashTab.delete')}
                >
                  <span className="material-symbols-outlined text-base">delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-surface-slate rounded-xl">
          <div className="text-6xl mb-4">📦</div>
          <h3 className="text-xl font-semibold text-cream-text mb-2">
            {t('profile.stashTab.empty')}
          </h3>
          <p className="text-cream-muted">
            {t('profile.stashTab.emptyDesc')}
          </p>
        </div>
      )}
    </section>
  );
}
