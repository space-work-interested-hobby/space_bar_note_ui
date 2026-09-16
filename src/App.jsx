import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { I18nProvider } from './i18n';

// Import pages
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import MyRecipesPage from './pages/MyRecipesPage';
import FavoritesPage from './pages/FavoritesPage';
import StashPage from './pages/StashPage';
import CollectionsPage from './pages/CollectionsPage';
import EquipmentPage from './pages/EquipmentPage';
import ProfilePage from './pages/ProfilePage';
import NoteDetailPage from './pages/NoteDetailPage';

// Layout
import MainLayout from './components/layout/MainLayout';

function AppContent() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/my-recipes" element={<MyRecipesPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/stash" element={<StashPage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/equipment" element={<EquipmentPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/note/:id" element={<NoteDetailPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <I18nProvider initialLanguage="vi">
      <AppContent />
    </I18nProvider>
  );
}
