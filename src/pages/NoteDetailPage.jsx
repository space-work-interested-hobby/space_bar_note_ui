import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Users, Star, Heart, Archive } from 'lucide-react';
import { useI18n } from '../i18n';

export default function NoteDetailPage() {
  const { id } = useParams();
  const { t } = useI18n();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link 
        to="/" 
        className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        {t('actions.close')}
      </Link>

      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-48 flex items-center justify-center">
          <span className="text-8xl">🍹</span>
        </div>

        {/* Content */}
        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Recipe Title
          </h1>

          <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              5 {t('noteCard.minutes')}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              1 {t('noteCard.servings')}
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4" />
              4.5
            </span>
          </div>

          <p className="text-gray-600 mb-6">
            Recipe description goes here...
          </p>

          {/* Ingredients */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              🥬 {t('noteModal.ingredients')}
            </h2>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                White Rum - 60ml
              </li>
            </ul>
          </div>

          {/* Steps */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">
              📋 {t('noteModal.steps')}
            </h2>
            <ol className="space-y-4">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-sm font-medium">
                  1
                </span>
                <span className="text-gray-600">Step content...</span>
              </li>
            </ol>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t">
            <button className="flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-600 rounded-lg hover:bg-amber-200">
              <Heart className="w-4 h-4" />
              {t('nav.favorites')}
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-600 rounded-lg hover:bg-amber-200">
              <Archive className="w-4 h-4" />
              {t('nav.stash')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
