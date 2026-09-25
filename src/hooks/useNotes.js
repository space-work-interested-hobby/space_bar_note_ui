import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

// Mock data for fallback when API fails (using valid UUIDs for consistency)
const MOCK_NOTES = [
  {
    id: '00000000-0000-0000-0000-000000000001',
    title: 'Old Fashioned Classic',
    description: 'Classic whiskey cocktail recipe with bitters',
    category: 'cocktail',
    ingredients: ['Bourbon', 'Bitters', 'Sugar', 'Water'],
    avg_rating: 4.8,
    created_at: new Date().toISOString(),
  },
  {
    id: '00000000-0000-0000-0000-000000000002',
    title: 'Espresso Martini',
    description: 'Coffee cocktail with vodka and Kahlúa',
    category: 'cocktail',
    ingredients: ['Vodka', 'Kahlúa', 'Espresso', 'Sugar'],
    avg_rating: 4.9,
    created_at: new Date().toISOString(),
  },
  {
    id: '00000000-0000-0000-0000-000000000003',
    title: 'Sourdough Bread',
    description: 'Artisan sourdough with 36h fermentation',
    category: 'bread',
    ingredients: ['Flour', 'Water', 'Salt', 'Starter'],
    avg_rating: 4.7,
    created_at: new Date().toISOString(),
  },
  {
    id: '00000000-0000-0000-0000-000000000004',
    title: 'Cold Brew Coffee',
    description: 'Smooth cold brew with Ethiopian beans',
    category: 'coffee',
    ingredients: ['Coffee beans', 'Water', 'Time'],
    avg_rating: 4.6,
    created_at: new Date().toISOString(),
  },
];

// Export mock notes for use in NoteDetailPage
export { MOCK_NOTES };

// Get user's preferred language (default to Vietnamese)
const getUserLanguage = () => {
  // Check localStorage for saved language preference
  const saved = localStorage.getItem('language');
  if (saved) return saved;
  
  // Check browser language
  const browserLang = navigator.language?.toLowerCase();
  if (browserLang?.startsWith('vi')) return 'vi';
  if (browserLang?.startsWith('en')) return 'en';
  
  // Default to Vietnamese
  return 'vi';
};

// Fetch notes with translations joined
const fetchNotesWithTranslations = async (language) => {
  console.log('[useNotes] Fetching notes with language:', language);
  
  const { data, error } = await supabase
    .from('notes')
    .select(`
      *,
      note_translations (
        title,
        description,
        language
      ),
      note_ingredients (
        id,
        name,
        amount,
        amount_value,
        unit,
        sort_order
      )
    `)
    .eq('is_published', true)
    .eq('is_hidden', false)
    .order('created_at', { ascending: false })
    .limit(100);

  if (error) {
    console.error('[useNotes] Error fetching notes:', error);
    throw error;
  }

  console.log('[useNotes] Raw data received:', data?.length, 'notes');
  if (data && data.length > 0) {
    console.log('[useNotes] Sample note with translations:', JSON.stringify({
      id: data[0].id,
      title: data[0].title,
      hasTranslations: !!data[0].note_translations,
      translations: data[0].note_translations
    }, null, 2));
  }

  if (!data || data.length === 0) return [];

  // Process notes and merge with translations
  const processedNotes = data.map(note => {
    // Find translation for user's language, fallback to Vietnamese, then first available
    const translation = note.note_translations?.find(t => t.language === language) 
      || note.note_translations?.find(t => t.language === 'vi')
      || note.note_translations?.[0]
      || {};

    // Process ingredients
    const ingredients = (note.note_ingredients || [])
      .sort((a, b) => a.sort_order - b.sort_order)
      .map(ing => ing.name || `${ing.amount || ''} ${ing.unit || ''}`.trim());

    // Use cached rating from notes table, or 0 if not available
    const avgRating = note.rating || 0;
    const ratingCount = note.review_count || 0;

    return {
      id: note.id,
      title: translation.title || note.title || 'Công Thức Không Tên',
      description: translation.description || note.description || '',
      category: note.category || 'other',
      difficulty: note.difficulty || 'easy',
      time_minutes: note.time_minutes || note.prep_time_minutes || null,
      servings: note.servings || 1,
      ingredients: ingredients,
      ingredients_count: ingredients.length,
      avg_rating: avgRating,
      rating_count: ratingCount,
      image_url: note.image_url || null,
      author_name: note.author_name || null,
      author_id: note.author_id || null,
      created_at: note.created_at,
      is_published: note.is_published,
    };
  });

  console.log('[useNotes] Processed notes sample:', processedNotes[0]?.title);
  return processedNotes;
};

export function useNotes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const language = getUserLanguage();

  const fetchNotes = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Fetch from DB with translations joined
      const data = await fetchNotesWithTranslations(language);
      setNotes(data);
    } catch (err) {
      console.warn('Error fetching notes from DB, trying basic query:', err.message);
      
      // Fallback: try basic query without joins
      try {
        const { data: basicData, error: basicError } = await supabase
          .from('notes')
          .select('*')
          .eq('is_published', true)
          .order('created_at', { ascending: false })
          .limit(100);

        if (basicError) throw basicError;
        
        // Process basic data with fallback translations
        const processedBasicData = (basicData || []).map(note => ({
          id: note.id,
          title: note.title || 'Công Thức Không Tên',
          description: note.description || '',
          category: note.category || 'other',
          difficulty: note.difficulty || 'easy',
          time_minutes: note.time_minutes || note.prep_time_minutes || null,
          servings: note.servings || 1,
          ingredients: [],
          ingredients_count: 0,
          avg_rating: note.rating || 0,
          rating_count: note.review_count || 0,
          image_url: note.image_url || null,
          author_name: note.author_name || null,
          author_id: note.author_id || null,
          created_at: note.created_at,
          is_published: note.is_published,
        }));
        
        setNotes(processedBasicData);
      } catch (fallbackErr) {
        console.warn('Using mock data due to API error:', fallbackErr.message);
        setError(fallbackErr);
        // Final fallback to mock data
        setNotes(MOCK_NOTES);
      }
    } finally {
      setLoading(false);
    }
  }, [language]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return { notes, loading, error, refetch: fetchNotes };
}
