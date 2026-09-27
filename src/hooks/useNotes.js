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
      ),
      note_steps (
        id,
        step_number,
        content
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
    // Debug: log raw data structure
    console.log('[useNotes] ===== RAW DATA DEBUG =====');
    console.log('[useNotes] First note keys:', Object.keys(data[0]));
    console.log('[useNotes] First note id:', data[0].id);
    console.log('[useNotes] First note category:', data[0].category);
    console.log('[useNotes] note_translations:', JSON.stringify(data[0].note_translations));
    console.log('[useNotes] note_ingredients count:', data[0].note_ingredients?.length);
    console.log('[useNotes] note_steps count:', data[0].note_steps?.length);
    console.log('[useNotes] ===== END DEBUG =====');
    
    // Additional debug: try direct query to note_translations
    const noteId = data[0].id;
    const { data: directTranslations, error: transError } = await supabase
      .from('note_translations')
      .select('*')
      .eq('note_id', noteId);
    
    console.log('[useNotes] Direct query note_translations for', noteId + ':', directTranslations, transError);
  }

  if (!data || data.length === 0) return [];

  // Process notes and merge with translations
  const processedNotes = data.map(note => {
    // Find translation for user's language, fallback to Vietnamese, then first available
    const allTranslations = note.note_translations || [];
    const translation = allTranslations.find(t => t.language === language) 
      || allTranslations.find(t => t.language === 'vi')
      || allTranslations[0]
      || null;

    console.log('[useNotes] Processing note:', note.id);
    console.log('[useNotes] - All translations:', JSON.stringify(allTranslations));
    console.log('[useNotes] - Selected translation:', translation);

    // Title only exists in translations table (notes table has no title column)
    const title = translation?.title || 'Công Thức Không Tên';
    const description = translation?.description || note.description || '';

    // Process ingredients
    const ingredients = (note.note_ingredients || [])
      .sort((a, b) => a.sort_order - b.sort_order)
      .map(ing => ing.name || `${ing.amount || ''} ${ing.unit || ''}`.trim());

    // Process steps - note: column is 'content' not 'instruction', sort by 'step_number' not 'sort_order'
    const steps = (note.note_steps || [])
      .sort((a, b) => (a.step_number || 0) - (b.step_number || 0))
      .map(step => step.content || step.instruction || '');

    // Use cached rating from notes table, or 0 if not available
    const avgRating = note.rating || 0;
    const ratingCount = note.review_count || 0;

    return {
      id: note.id,
      title: title,
      description: description,
      category: note.category || 'other',
      difficulty: note.difficulty || 'easy',
      time_minutes: note.time_minutes || note.prep_time_minutes || null,
      servings: note.servings || 1,
      ingredients: ingredients,
      ingredients_count: ingredients.length,
      steps: steps,
      avg_rating: avgRating,
      rating_count: ratingCount,
      image_url: note.image_url || null,
      author_name: note.author_name || null,
      author_id: note.author_id || null,
      created_at: note.created_at,
      is_published: note.is_published,
      // Store raw data for edit
      raw_note: note,
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

  // ============================================================
  // CRUD OPERATIONS
  // ============================================================

  /**
   * Add a new note
   * @param {Object} noteData - { title, description, category, difficulty, time_minutes, servings, ingredients, steps, images }
   */
  const addNote = useCallback(async (noteData) => {
    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData?.session?.user?.id;
    const deviceId = localStorage.getItem('bar_note_device_id');
    
    // Get hero image if available
    const heroImage = noteData.images?.find(img => img.id === noteData.heroImageId);
    const imageUrl = heroImage?.url || noteData.images?.[0]?.url || null;

    try {
      // Insert the note
      const { data: noteResult, error: noteError } = await supabase
        .from('notes')
        .insert({
          category: noteData.category || 'other',
          difficulty: noteData.difficulty || 'de',
          time_minutes: noteData.time_minutes ? parseInt(noteData.time_minutes) : null,
          servings: noteData.servings || 1,
          image_url: imageUrl,
          author_id: userId || null,
          author_name: userId ? null : 'Guest',
          is_published: true,
        })
        .select()
        .single();

      if (noteError) {
        console.error('[useNotes] Error adding note:', noteError);
        throw noteError;
      }

      const noteId = noteResult.id;

      // Insert translations (default to Vietnamese and English)
      const translations = [
        { note_id: noteId, language: 'vi', title: noteData.title, description: noteData.description || '' },
        { note_id: noteId, language: 'en', title: noteData.title, description: noteData.description || '' },
      ];

      const { error: transError } = await supabase
        .from('note_translations')
        .insert(translations);

      if (transError) {
        console.error('[useNotes] Error adding translations:', transError);
      }

      // Insert ingredients
      if (noteData.ingredients && noteData.ingredients.length > 0) {
        const ingredients = noteData.ingredients
          .filter(ing => ing.name || (typeof ing === 'string' && ing.trim()))
          .map((ing, index) => ({
            note_id: noteId,
            name: typeof ing === 'string' ? ing : (ing.name || ''),
            amount: typeof ing === 'string' ? '' : (ing.amount || ''),
            amount_value: typeof ing === 'object' && ing.amount_value ? parseFloat(ing.amount_value) : null,
            unit: typeof ing === 'object' && ing.unit ? ing.unit : null,
            sort_order: index,
          }));

        if (ingredients.length > 0) {
          const { error: ingError } = await supabase
            .from('note_ingredients')
            .insert(ingredients);

          if (ingError) {
            console.error('[useNotes] Error adding ingredients:', ingError);
          }
        }
      }

      // Insert steps
      if (noteData.steps && noteData.steps.length > 0) {
        const steps = noteData.steps
          .filter(step => step && step.trim())
          .map((step, index) => ({
            note_id: noteId,
            step_number: index + 1,
            content: typeof step === 'string' ? step : (step.content || ''),
            image_url: typeof step === 'object' && step.image_url ? step.image_url : null,
          }));

        if (steps.length > 0) {
          const { error: stepsError } = await supabase
            .from('note_steps')
            .insert(steps);

          if (stepsError) {
            console.error('[useNotes] Error adding steps:', stepsError);
          }
        }
      }

      // Insert images
      if (noteData.images && noteData.images.length > 0) {
        const images = noteData.images.map((img, index) => ({
          note_id: noteId,
          image_url: img.url || img,
          caption: img.caption || '',
          alt_text: img.alt || img.name || '',
          is_hero: img.id === noteData.heroImageId || index === 0,
          sort_order: index,
        }));

        const { error: imgError } = await supabase
          .from('note_images')
          .insert(images);

        if (imgError) {
          console.error('[useNotes] Error adding images:', imgError);
        }
      }

      console.log('[useNotes] Note added successfully:', noteId);
      
      // Refresh notes list
      fetchNotes();
      
      return { id: noteId, success: true };
    } catch (err) {
      console.error('[useNotes] Error in addNote:', err);
      throw err;
    }
  }, [fetchNotes]);

  /**
   * Update an existing note
   * @param {string} noteId - The note ID to update
   * @param {Object} noteData - { title, description, category, difficulty, time_minutes, servings, ingredients, steps, images }
   */
  const updateNote = useCallback(async (noteId, noteData) => {
    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData?.session?.user?.id;

    try {
      // Get hero image if available
      const heroImage = noteData.images?.find(img => img.id === noteData.heroImageId);
      const imageUrl = heroImage?.url || noteData.images?.[0]?.url || null;

      // Update the note
      const { error: noteError } = await supabase
        .from('notes')
        .update({
          category: noteData.category || 'other',
          difficulty: noteData.difficulty || 'de',
          time_minutes: noteData.time_minutes ? parseInt(noteData.time_minutes) : null,
          servings: noteData.servings || 1,
          image_url: imageUrl,
          updated_at: new Date().toISOString(),
        })
        .eq('id', noteId);

      if (noteError) {
        console.error('[useNotes] Error updating note:', noteError);
        throw noteError;
      }

      // Update translations
      if (noteData.title) {
        // Try to update existing translation, or insert if not exists
        const languages = ['vi', 'en'];
        
        for (const lang of languages) {
          const { data: existingTrans } = await supabase
            .from('note_translations')
            .select('id')
            .eq('note_id', noteId)
            .eq('language', lang)
            .single();

          if (existingTrans) {
            await supabase
              .from('note_translations')
              .update({
                title: noteData.title,
                description: noteData.description || '',
              })
              .eq('id', existingTrans.id);
          } else {
            await supabase
              .from('note_translations')
              .insert({
                note_id: noteId,
                language: lang,
                title: noteData.title,
                description: noteData.description || '',
              });
          }
        }
      }

      // Update ingredients - delete old and insert new
      if (noteData.ingredients) {
        // Delete existing ingredients
        await supabase
          .from('note_ingredients')
          .delete()
          .eq('note_id', noteId);

        // Insert new ingredients
        const ingredients = noteData.ingredients
          .filter(ing => ing.name || (typeof ing === 'string' && ing.trim()))
          .map((ing, index) => ({
            note_id: noteId,
            name: typeof ing === 'string' ? ing : (ing.name || ''),
            amount: typeof ing === 'string' ? '' : (ing.amount || ''),
            amount_value: typeof ing === 'object' && ing.amount_value ? parseFloat(ing.amount_value) : null,
            unit: typeof ing === 'object' && ing.unit ? ing.unit : null,
            sort_order: index,
          }));

        if (ingredients.length > 0) {
          await supabase
            .from('note_ingredients')
            .insert(ingredients);
        }
      }

      // Update steps - delete old and insert new
      if (noteData.steps) {
        // Delete existing steps
        await supabase
          .from('note_steps')
          .delete()
          .eq('note_id', noteId);

        // Insert new steps
        const steps = noteData.steps
          .filter(step => step && step.trim())
          .map((step, index) => ({
            note_id: noteId,
            step_number: index + 1,
            content: typeof step === 'string' ? step : (step.content || ''),
            image_url: typeof step === 'object' && step.image_url ? step.image_url : null,
          }));

        if (steps.length > 0) {
          await supabase
            .from('note_steps')
            .insert(steps);
        }
      }

      // Update images if provided
      if (noteData.images) {
        // Delete existing images
        await supabase
          .from('note_images')
          .delete()
          .eq('note_id', noteId);

        // Insert new images
        const images = noteData.images.map((img, index) => ({
          note_id: noteId,
          image_url: img.url || img,
          caption: img.caption || '',
          alt_text: img.alt || img.name || '',
          is_hero: img.id === noteData.heroImageId || index === 0,
          sort_order: index,
        }));

        if (images.length > 0) {
          await supabase
            .from('note_images')
            .insert(images);
        }
      }

      console.log('[useNotes] Note updated successfully:', noteId);
      
      // Refresh notes list
      fetchNotes();
      
      return { success: true };
    } catch (err) {
      console.error('[useNotes] Error in updateNote:', err);
      throw err;
    }
  }, [fetchNotes]);

  /**
   * Delete a note
   * @param {string} noteId - The note ID to delete
   */
  const deleteNote = useCallback(async (noteId) => {
    try {
      const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', noteId);

      if (error) {
        console.error('[useNotes] Error deleting note:', error);
        throw error;
      }

      console.log('[useNotes] Note deleted successfully:', noteId);
      
      // Refresh notes list
      fetchNotes();
      
      return { success: true };
    } catch (err) {
      console.error('[useNotes] Error in deleteNote:', err);
      throw err;
    }
  }, [fetchNotes]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return { notes, loading, error, refetch: fetchNotes, addNote, updateNote, deleteNote };
}
