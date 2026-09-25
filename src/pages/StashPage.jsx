/**
 * ============================================================
 * STASH PAGE
 * ============================================================
 * User's saved recipes (stash)
 */
import { useAuth } from '../context/AuthContext';

export default function StashPage() {
  const { profile } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-serif text-3xl font-bold text-white mb-6">
        Đã lưu
      </h1>
      <p className="text-gray-400">
        Các công thức bạn đã lưu lại để tham khảo sau.
      </p>
      <div className="mt-8 text-center py-12">
        <p className="text-gray-500">Chưa có công thức nào được lưu.</p>
      </div>
    </div>
  );
}
