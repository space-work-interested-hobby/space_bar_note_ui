import { useState, useCallback } from 'react';

export function useCollections() {
  const [collections, setCollections] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const addCollection = useCallback((collection) => {
    setCollections(prev => [{
      ...collection,
      id: `my-${Date.now()}`,
      createdAt: new Date().toISOString(),
    }, ...prev]);
  }, []);

  const removeCollection = useCallback((id) => {
    setCollections(prev => prev.filter(c => c.id !== id));
  }, []);

  return { collections, addCollection, removeCollection, isLoading };
}
