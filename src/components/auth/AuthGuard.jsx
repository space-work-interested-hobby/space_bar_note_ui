/**
 * ============================================================
 * AUTH GUARD
 * ============================================================
 * Higher-order component that redirects authenticated users away from auth pages
 */
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Loader2 } from 'lucide-react';

export default function AuthGuard({ children, redirectTo = '/' }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F1115] flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-purple-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-400">Đang tải...</p>
        </div>
      </div>
    );
  }

  // Redirect to home if already authenticated
  if (isAuthenticated) {
    // If trying to access auth pages, redirect to previous location or home
    return (
      <Navigate
        to={redirectTo}
        replace
      />
    );
  }

  // Render children if not authenticated
  return children;
}
