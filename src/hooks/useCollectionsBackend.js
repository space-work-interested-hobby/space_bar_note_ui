import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';

export function useCollectionsBackend() {
  const [collections, setCollections] = useState([]);
  const [myCollections, setMyCollections] = useState([]);
  const [systemCollections, setSystemCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCollections = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('collections')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      const publicCollections = data?.filter(c => c.is_public) || [];
      const userCollections = data?.filter(c => !c.is_public) || [];
      
      setCollections(publicCollections);
      setMyCollections(userCollections);
    } catch (err) {
      console.error('Error fetching collections:', err);
      setError(err);
      // Use empty arrays, will fallback to mock data
      setCollections([]);
      setMyCollections([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createCollection = useCallback(async (formData) => {
    try {
      const { data, error } = await supabase
        .from('collections')
        .insert([{
          title: formData.name,
          description: formData.description,
          category: formData.category,
          is_public: formData.privacy === 'public',
          created_at: new Date().toISOString(),
        }])
        .select();

      if (error) throw error;
      return data;
    } catch (err) {
      console.error('Error creating collection:', err);
      throw err;
    }
  }, []);

  const deleteCollection = useCallback(async (id) => {
    try {
      const { error } = await supabase
        .from('collections')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (err) {
      console.error('Error deleting collection:', err);
      throw err;
    }
  }, []);

  const toggleBookmark = useCallback(async (collectionId) => {
    // Optimistic update
    setCollections(prev => prev.map(c => 
      c.id === collectionId ? { ...c, isBookmarked: !c.isBookmarked } : c
    ));
  }, []);

  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  return {
    collections,
    myCollections,
    systemCollections,
    isLoading,
    error,
    createCollection,
    deleteCollection,
    toggleBookmark,
    refetch: fetchCollections,
  };
}
