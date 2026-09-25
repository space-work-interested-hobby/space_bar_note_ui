/**
 * ============================================================
 * AUTH CALLBACK PAGE
 * ============================================================
 * Handles OAuth callback from Supabase
 */
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function AuthCallback() {
  const navigate = useNavigate();
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    // The AuthContext will handle the callback automatically
    // This component just shows a loading state
    
    if (!loading && isAuthenticated) {
      navigate('/', { replace: true });
    } else if (!loading && !isAuthenticated) {
      navigate('/auth/login', { replace: true });
    }
  }, [loading, isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-[#0F1115] flex items-center justify-center">
      <div className="text-center animate-fade-in">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 mb-6">
          <Loader2 className="w-10 h-10 text-purple-400 animate-spin" />
        </div>
        <h1 className="font-serif text-2xl font-bold text-white mb-2">
          Đang xác thực...
        </h1>
        <p className="text-gray-400">
          Vui lòng chờ trong giây lát
        </p>
      </div>
    </div>
  );
}
