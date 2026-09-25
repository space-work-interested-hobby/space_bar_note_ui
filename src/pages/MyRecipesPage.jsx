/**
 * ============================================================
 * MY RECIPES PAGE
 * ============================================================
 * User's own recipes
 */
import { useAuth } from '../context/AuthContext';

export default function MyRecipesPage() {
  const { profile } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-serif text-3xl font-bold text-white mb-6">
        Công thức của tôi
      </h1>
      <p className="text-gray-400">
        Chào {profile?.display_name || 'bạn'}! Đây là nơi hiển thị các công thức bạn đã tạo.
      </p>
      <div className="mt-8 text-center py-12">
        <p className="text-gray-500">Chưa có công thức nào.</p>
      </div>
    </div>
  );
}
