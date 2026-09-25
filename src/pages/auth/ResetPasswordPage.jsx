/**
 * ============================================================
 * RESET PASSWORD PAGE
 * ============================================================
 * Request password reset via email
 */
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useI18n } from '../../i18n';
import { Loader2, AlertCircle, CheckCircle, Mail } from 'lucide-react';

export default function ResetPasswordPage() {
  const { t, language } = useI18n();
  const { resetPassword } = useAuth();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      setError(t('auth.emailRequired'));
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError(t('auth.emailInvalid'));
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    const { error } = await resetPassword(email);

    if (error) {
      setError(error.message);
    } else {
      setSuccess(language === 'vi' 
        ? 'Đã gửi email đặt lại mật khẩu. Vui lòng kiểm tra hộp thư.'
        : 'Password reset email sent. Please check your inbox.'
      );
      setEmail('');
    }

    setLoading(false);
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 mb-4">
          <Mail className="w-8 h-8 text-purple-400" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-white mb-2">
          {t('auth.forgotPassword')}
        </h1>
        <p className="text-gray-400">
          {language === 'vi'
            ? 'Nhập email của bạn để nhận liên kết đặt lại mật khẩu'
            : 'Enter your email to receive a password reset link'
          }
        </p>
      </div>

      {/* Success Message */}
      {success && (
        <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/30 flex items-center gap-3">
          <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
          <p className="text-green-300 text-sm">{success}</p>
        </div>
      )}

      {/* Error Alert */}
      {error && (
        <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      )}

      {/* Form */}
      {!success && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {t('auth.email')}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@example.com"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-4 mt-6 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {t('common.loading')}
              </>
            ) : (
              language === 'vi' ? 'Gửi email đặt lại' : 'Send Reset Email'
            )}
          </button>
        </form>
      )}

      {/* Back to Login */}
      <div className="mt-6 text-center">
        <Link
          to="/auth/login"
          className="text-gray-400 hover:text-white transition-colors text-sm"
        >
          {language === 'vi' ? '← Quay lại đăng nhập' : '← Back to login'}
        </Link>
      </div>
    </div>
  );
}
