import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    // Load favorites từ localStorage
    useEffect(() => {
        const savedFavorites = localStorage.getItem('bar_favorites');
        if (savedFavorites) {
            try {
                setFavorites(JSON.parse(savedFavorites));
            } catch (e) {
                console.error('Error loading favorites:', e);
            }
        }
        setIsLoading(false);
    }, []);

    // Lưu vào localStorage khi thay đổi
    useEffect(() => {
        if (!isLoading) {
            localStorage.setItem('bar_favorites', JSON.stringify(favorites));
        }
    }, [favorites, isLoading]);

    // Toggle favorite
    const toggleFavorite = useCallback((noteId) => {
        setFavorites(prev => {
            if (prev.includes(noteId)) {
                return prev.filter(id => id !== noteId);
            }
            return [...prev, noteId];
        });
    }, []);

    // Check if note is favorite
    const isFavorite = useCallback((noteId) => {
        return favorites.includes(noteId);
    }, [favorites]);

    const value = {
        favorites,
        isLoading,
        toggleFavorite,
        isFavorite,
        count: favorites.length
    };

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavoritesContext() {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavoritesContext must be used within FavoritesProvider');
    }
    return context;
}
