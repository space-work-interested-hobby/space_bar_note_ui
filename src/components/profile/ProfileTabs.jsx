import { useI18n } from '../../i18n';

/**
 * ProfileTabs Component
 * Tab navigation for profile content sections
 */
export default function ProfileTabs({ tabs, activeTab, onTabChange }) {
  const { t } = useI18n();

  return (
    <nav className="flex items-center gap-2 overflow-x-auto py-space-md mt-space-lg scrollbar-none">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-label-md text-label-md 
            transition-all whitespace-nowrap shadow-sm
            ${activeTab === tab.id
              ? 'bg-surface-smoke text-primary'
              : 'text-on-surface-variant hover:text-cream-text hover:bg-surface-slate'
            }
          `}
          data-tab={tab.id}
        >
          <span className="material-symbols-outlined text-base">
            {tab.icon}
          </span>
          <span>
            {tab.label}
            {tab.count !== undefined && ` (${tab.count})`}
          </span>
        </button>
      ))}
    </nav>
  );
}
