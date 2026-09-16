import { useI18n } from '../i18n';

export default function ExplorePage() {
  const { t } = useI18n();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">🔍 {t('nav.explore')}</h1>
      <p className="text-gray-600">Trang khám phá đang được phát triển...</p>
    </div>
  );
}
