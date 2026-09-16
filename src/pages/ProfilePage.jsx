import { useI18n } from '../i18n';

export default function ProfilePage() {
  const { t } = useI18n();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">👤 {t('nav.profile')}</h1>
      
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center text-3xl">
            🍸
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800">User Name</h2>
            <p className="text-gray-500">@username</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">0</div>
            <div className="text-sm text-gray-500">{t('profile.recipes')}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">0</div>
            <div className="text-sm text-gray-500">{t('profile.followers')}</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">0</div>
            <div className="text-sm text-gray-500">{t('profile.following')}</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="font-semibold text-gray-800 mb-4">{t('profile.settings')}</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('profile.preferredUnit')}
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
              <option value="ml">ml</option>
              <option value="oz">oz</option>
              <option value="g">g</option>
              <option value="cup">cup</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t('profile.preferredLanguage')}
            </label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
              <option value="vi">🇻🇳 Tiếng Việt</option>
              <option value="en">🇺🇸 English</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
