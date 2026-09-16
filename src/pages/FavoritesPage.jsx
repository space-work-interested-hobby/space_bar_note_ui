import { useI18n } from '../i18n';

export default function FavoritesPage() {
  const { t } = useI18n();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">❤️ {t('nav.favorites')}</h1>
      <div className="text-center py-20">
        <div className="text-6xl mb-4">❤️</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">{t('empty.noFavorites')}</h3>
      </div>
    </div>
  );
}
