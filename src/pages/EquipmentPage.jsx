import { useI18n } from '../i18n';

export default function EquipmentPage() {
  const { t } = useI18n();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">🔧 {t('nav.equipment')}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Categories */}
        {Object.entries(t('equipment.categories', {})).map(([key, label]) => (
          <div key={key} className="bg-white rounded-xl shadow-md p-4">
            <h3 className="font-semibold text-gray-800 mb-3">{label}</h3>
            <p className="text-sm text-gray-500">Equipment list coming soon...</p>
          </div>
        ))}
      </div>
    </div>
  );
}
