/**
 * ============================================================
 * STUDIO RECIPE CREATOR PAGE
 * ============================================================
 * Page for creating new recipes
 */
import { useAuth } from '../context/AuthContext';

export default function StudioRecipeCreator() {
  const { profile } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-serif text-3xl font-bold text-white mb-6">
        Tạo công thức mới
      </h1>
      <p className="text-gray-400">
        Chia sẻ công thức yêu thích của bạn với cộng đồng.
      </p>
      <div className="mt-8 text-center py-12">
        <p className="text-gray-500">Trình tạo công thức đang được phát triển.</p>
      </div>
    </div>
  );
}
