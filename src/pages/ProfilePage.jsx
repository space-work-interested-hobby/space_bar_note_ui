/**
 * ============================================================
 * PROFILE PAGE
 * ============================================================
 * User profile page
 */
import { useAuth } from '../context/AuthContext';

export default function ProfilePage() {
  const { profile, user } = useAuth();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="font-serif text-3xl font-bold text-white mb-6">
        Hồ sơ
      </h1>
      
      <div className="bg-white/5 rounded-xl border border-white/10 p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold">
            {profile?.display_name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">
              {profile?.display_name || 'User'}
            </h2>
            <p className="text-gray-400">@{profile?.username || 'username'}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-white">{profile?.recipe_count || 0}</p>
            <p className="text-sm text-gray-400">Công thức</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-white">{profile?.follower_count || 0}</p>
            <p className="text-sm text-gray-400">Người theo dõi</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-white">{profile?.following_count || 0}</p>
            <p className="text-sm text-gray-400">Đang theo dõi</p>
          </div>
          <div className="bg-white/5 rounded-lg p-4 text-center">
            <p className="text-2xl font-bold text-white">{profile?.favorite_count || 0}</p>
            <p className="text-sm text-gray-400">Yêu thích</p>
          </div>
        </div>

        {profile?.bio && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-400 mb-2">Giới thiệu</h3>
            <p className="text-white">{profile.bio}</p>
          </div>
        )}
      </div>
    </div>
  );
}
