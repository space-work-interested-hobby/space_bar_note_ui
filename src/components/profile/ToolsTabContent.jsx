import { useI18n } from '../../i18n';

/**
 * ToolsTabContent Component
 * Displays user's available bar/equipment tools
 */
export default function ToolsTabContent() {
  const { t } = useI18n();

  // Mock tools data
  const tools = [
    {
      id: 'tool-001',
      name: 'Cocktail Shaker Boston',
      nameEn: 'Boston Cocktail Shaker',
      category: 'Shaker',
      status: 'available',
      condition: 'Tốt',
      lastUsed: 'Hôm nay',
      image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?w=200',
    },
    {
      id: 'tool-002',
      name: 'Jigger Nhựa 2 Thước',
      nameEn: 'Plastic 2-Sided Jigger',
      category: 'Measuring',
      status: 'available',
      condition: 'Tốt',
      lastUsed: 'Hôm nay',
      image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=200',
    },
    {
      id: 'tool-003',
      name: 'Strainer Hawthorne',
      nameEn: 'Hawthorne Strainer',
      category: 'Strainer',
      status: 'available',
      condition: 'Trung bình',
      lastUsed: '2 ngày trước',
      image: null,
    },
    {
      id: 'tool-004',
      name: 'Muddlerr Gỗ',
      nameEn: 'Wooden Muddler',
      category: 'Muddler',
      status: 'in_use',
      condition: 'Tốt',
      lastUsed: 'Hôm nay',
      image: null,
    },
    {
      id: 'tool-005',
      name: 'Bar Spoon Dài',
      nameEn: 'Long Bar Spoon',
      category: 'Stirring',
      status: 'available',
      condition: 'Tốt',
      lastUsed: '1 ngày trước',
      image: null,
    },
    {
      id: 'tool-006',
      name: 'Chiller Glass Đôi',
      nameEn: 'Double Glass Chiller',
      category: 'Glassware',
      status: 'maintenance',
      condition: 'Cần bảo trì',
      lastUsed: '1 tuần trước',
      image: null,
    },
  ];

  const handleAddTool = () => {
    console.log('Add new tool');
    // TODO: Open add tool modal
  };

  const handleEditTool = (toolId) => {
    console.log('Edit tool:', toolId);
    // TODO: Open edit tool modal
  };

  const getStatusBadge = (status) => {
    const styles = {
      'available': 'bg-primary-container/20 text-primary',
      'in_use': 'bg-tertiary-container/20 text-tertiary',
      'maintenance': 'bg-error/20 text-error',
      'retired': 'bg-surface-smoke text-on-surface-variant',
    };
    const labels = {
      'available': t('profile.toolsTab.available'),
      'in_use': t('profile.toolsTab.inUse'),
      'maintenance': t('profile.toolsTab.maintenance'),
      'retired': t('profile.toolsTab.retired'),
    };
    return (
      <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${styles[status]}`}>
        {labels[status]}
      </span>
    );
  };

  const getConditionColor = (condition) => {
    if (condition === 'Tốt') return 'text-primary';
    if (condition === 'Trung bình') return 'text-tertiary';
    return 'text-error';
  };

  const getCategoryIcon = (category) => {
    const icons = {
      'Shaker': 'shaker',
      'Measuring': 'straighten',
      'Strainer': 'filter_alt',
      'Muddler': 'forest',
      'Stirring': 'loop',
      'Glassware': 'local_bar',
    };
    return icons[category] || 'build_circle';
  };

  // Group tools by category
  const toolsByCategory = tools.reduce((acc, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = [];
    }
    acc[tool.category].push(tool);
    return acc;
  }, {});

  return (
    <section className="flex flex-col gap-space-lg mt-space-md">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-copper-accent">
            {t('profile.toolsTab.stationInventory')}
          </span>
          <h2 className="font-headline-md text-headline-md text-cream-text">
            {t('profile.toolsTab.availableTools')}
          </h2>
        </div>
        
        <button
          onClick={handleAddTool}
          className="inline-flex items-center gap-2 bg-primary-container text-on-primary-container px-4 py-2 rounded-lg font-label-md text-label-md hover:bg-tertiary-container transition-all"
        >
          <span className="material-symbols-outlined text-base">add</span>
          <span>{t('profile.toolsTab.addTool')}</span>
        </button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-surface-slate rounded-xl p-space-md shadow-lg">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-primary-container/20 rounded-lg">
              <span className="material-symbols-outlined text-primary">inventory_2</span>
            </span>
            <div>
              <p className="font-bar-mode-metric text-headline-md text-primary font-bold">{tools.length}</p>
              <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                {t('profile.toolsTab.total')}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-surface-slate rounded-xl p-space-md shadow-lg">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-primary-container/20 rounded-lg">
              <span className="material-symbols-outlined text-primary">check_circle</span>
            </span>
            <div>
              <p className="font-bar-mode-metric text-headline-md text-primary font-bold">
                {tools.filter(t => t.status === 'available').length}
              </p>
              <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                {t('profile.toolsTab.available')}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-surface-slate rounded-xl p-space-md shadow-lg">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-tertiary-container/20 rounded-lg">
              <span className="material-symbols-outlined text-tertiary">schedule</span>
            </span>
            <div>
              <p className="font-bar-mode-metric text-headline-md text-tertiary font-bold">
                {tools.filter(t => t.status === 'in_use').length}
              </p>
              <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                {t('profile.toolsTab.inUse')}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-surface-slate rounded-xl p-space-md shadow-lg">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-error/10 rounded-lg">
              <span className="material-symbols-outlined text-error">build</span>
            </span>
            <div>
              <p className="font-bar-mode-metric text-headline-md text-error font-bold">
                {tools.filter(t => t.status === 'maintenance').length}
              </p>
              <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                {t('profile.toolsTab.needsMaintenance')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tools Grid by Category */}
      {Object.entries(toolsByCategory).map(([category, categoryTools]) => (
        <div key={category} className="flex flex-col gap-4">
          {/* Category Header */}
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-xl text-primary">
              {getCategoryIcon(category)}
            </span>
            <h3 className="font-headline-md text-headline-md text-cream-text">
              {category}
            </h3>
            <span className="px-2 py-0.5 bg-surface-smoke text-on-surface-variant text-xs font-medium rounded-full">
              {categoryTools.length} {t('profile.toolsTab.items')}
            </span>
          </div>

          {/* Category Tools */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categoryTools.map((tool) => (
              <div
                key={tool.id}
                className="group bg-surface-slate rounded-xl p-space-md shadow-lg hover:shadow-xl transition-all cursor-pointer"
                onClick={() => handleEditTool(tool.id)}
              >
                <div className="flex items-start gap-4">
                  {/* Tool Icon/Image */}
                  <div className="relative w-14 h-14 bg-surface-obsidian rounded-lg overflow-hidden shrink-0 flex items-center justify-center">
                    {tool.image ? (
                      <img 
                        src={tool.image} 
                        alt={tool.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="material-symbols-outlined text-2xl text-primary">
                        {getCategoryIcon(tool.category)}
                      </span>
                    )}
                    {/* Status Indicator */}
                    <div className={`
                      absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-surface-slate
                      ${tool.status === 'available' ? 'bg-primary' : ''}
                      ${tool.status === 'in_use' ? 'bg-tertiary' : ''}
                      ${tool.status === 'maintenance' ? 'bg-error' : ''}
                    `}></div>
                  </div>

                  {/* Tool Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="font-body-md text-body-md text-cream-text group-hover:text-primary transition-colors truncate">
                        {tool.name}
                      </h4>
                      {getStatusBadge(tool.status)}
                    </div>
                    <p className="font-body-sm text-body-sm text-cream-muted truncate mt-1">
                      {tool.nameEn}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className={`font-label-sm text-label-sm ${getConditionColor(tool.condition)}`}>
                        {tool.condition}
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        {t('profile.toolsTab.used')}: {tool.lastUsed}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Empty State */}
      {tools.length === 0 && (
        <div className="text-center py-20 bg-surface-slate rounded-xl">
          <div className="text-6xl mb-4">🔧</div>
          <h3 className="text-xl font-semibold text-cream-text mb-2">
            {t('profile.toolsTab.empty')}
          </h3>
          <p className="text-cream-muted">
            {t('profile.toolsTab.emptyDesc')}
          </p>
        </div>
      )}
    </section>
  );
}
