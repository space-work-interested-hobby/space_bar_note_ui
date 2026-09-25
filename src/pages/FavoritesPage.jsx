/**
 * ============================================================
 * FAVORITES PAGE
 * ============================================================
 * User's favorite recipes
 */
import { useAuth } from '../context/AuthContext';

export default function FavoritesPage() {
  const { profile } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-serif text-3xl font-bold text-white mb-6">
        Yêu thích
      </h1>
      <p className="text-gray-400">
        Các công thức bạn đã yêu thích.
      </p>
      <div className="mt-8 text-center py-12">
        <p className="text-gray-500">Chưa có công thức yêu thích nào.</p>
      </div>
    </div>
  );
}
