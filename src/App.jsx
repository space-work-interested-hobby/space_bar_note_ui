import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { I18nProvider } from './i18n';
import { AuthProvider } from './context/AuthContext';

// Import pages
import ExplorePage from './pages/ExplorePage';
import MyRecipesPage from './pages/MyRecipesPage';
import FavoritesPage from './pages/FavoritesPage';
import StashPage from './pages/StashPage';
import CollectionsPage from './pages/CollectionsPage';
import EquipmentPage from './pages/EquipmentPage';
import ProfilePage from './pages/ProfilePage';
import NoteDetailPage from './pages/NoteDetailPage';
import StudioRecipeCreator from './pages/StudioRecipeCreator';
import MyBarPage from './pages/MyBarPage';
import LineagePage from './pages/LineagePage';
import BakerPage from './pages/BakerPage';

// Auth pages
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import ResetPasswordPage from './pages/auth/ResetPasswordPage';
import AuthCallback from './pages/auth/AuthCallback';

// Layout
import MainLayout from './components/layout/MainLayout';
import AuthLayout from './components/auth/AuthLayout';

// Context for favorites
import { FavoritesProvider } from './context/FavoritesContext';

// Route components
import ProtectedRoute from './components/auth/ProtectedRoute';
import AuthGuard from './components/auth/AuthGuard';

function AppContent() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes - No layout */}
        <Route element={<AuthLayout />}>
          <Route
            path="/auth/login"
            element={
              <AuthGuard>
                <LoginPage />
              </AuthGuard>
            }
          />
          <Route
            path="/auth/register"
            element={
              <AuthGuard>
                <RegisterPage />
              </AuthGuard>
            }
          />
          <Route
            path="/auth/reset-password"
            element={
              <AuthGuard>
                <ResetPasswordPage />
              </AuthGuard>
            }
          />
          <Route path="/auth/callback" element={<AuthCallback />} />
        </Route>

        {/* Main Routes - With MainLayout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<ExplorePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/note/:id" element={<NoteDetailPage />} />
          
          {/* Protected Routes */}
          <Route
            path="/studio"
            element={
              <ProtectedRoute>
                <StudioRecipeCreator />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-recipes"
            element={
              <ProtectedRoute>
                <MyRecipesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <FavoritesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/stash"
            element={
              <ProtectedRoute>
                <StashPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/collections"
            element={
              <ProtectedRoute>
                <CollectionsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-bar"
            element={
              <ProtectedRoute>
                <MyBarPage />
              </ProtectedRoute>
            }
          />
          <Route path="/equipment" element={<EquipmentPage />} />
          <Route path="/lineage" element={<LineagePage />} />
          <Route path="/baker" element={<BakerPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <I18nProvider initialLanguage="vi">
      <AuthProvider>
        <FavoritesProvider>
          <AppContent />
        </FavoritesProvider>
      </AuthProvider>
    </I18nProvider>
  );
}
