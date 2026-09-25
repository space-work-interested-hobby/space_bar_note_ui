/**
 * ============================================================
 * useFavorites Hook - Quản lý công thức yêu thích
 * ============================================================
 */
import { useState, useEffect, useCallback } from 'react';

export function useFavorites() {
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

    // Get favorites count
    const count = favorites.length;

    return {
        favorites,
        isLoading,
        toggleFavorite,
        isFavorite,
        count
    };
}
