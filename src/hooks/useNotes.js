import { useState, useEffect } from 'react';
import { supabase, getDeviceId } from '../lib/supabase';
import { mockNotes } from '../lib/mockData';

export function useNotes() {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            // Query notes
            const { data: notesData, error: notesError } = await supabase
                .from('notes')
                .select('*')
                .eq('is_published', true)
                .order('created_at', { ascending: false });

            if (notesError) throw notesError;
            
            if (!notesData || notesData.length === 0) {
                setNotes(mockNotes);
                return;
            }
            
            // Query translations cho tiếng Việt
            const noteIds = notesData.map(n => n.id);
            const { data: translationsData } = await supabase
                .from('note_translations')
                .select('note_id, title, description')
                .in('note_id', noteIds)
                .eq('language', 'vi');

            // Merge notes với translations
            const translationsMap = {};
            translationsData?.forEach(t => {
                translationsMap[t.note_id] = t;
            });

            const transformedData = notesData.map(note => ({
                ...note,
                title: translationsMap[note.id]?.title || 'Untitled',
                description: translationsMap[note.id]?.description || ''
            }));
            
            setNotes(transformedData);
        } catch (err) {
            console.log('Using mock data:', err.message);
            setNotes(mockNotes);
        } finally {
            setLoading(false);
        }
    };

    const addNote = async (note) => {
        try {
            const newNote = {
                ...note,
                device_id: getDeviceId(),
                created_at: new Date().toISOString()
            };

            const { data, error } = await supabase
                .from('notes')
                .insert([newNote])
                .select()
                .single();

            if (error) throw error;
            
            setNotes(prev => [data, ...prev]);
            return data;
        } catch (err) {
            console.error('Add note error:', err);
            // Fallback: add locally
            const localNote = { ...note, id: Date.now().toString(), created_at: new Date().toISOString() };
            setNotes(prev => [localNote, ...prev]);
            return localNote;
        }
    };

    const updateNote = async (id, updates) => {
        try {
            const { data, error } = await supabase
                .from('notes')
                .update(updates)
                .eq('id', id)
                .select()
                .single();

            if (error) throw error;
            
            setNotes(prev => prev.map(n => n.id === id ? data : n));
            return data;
        } catch (err) {
            console.error('Update note error:', err);
            setNotes(prev => prev.map(n => n.id === id ? { ...n, ...updates } : n));
            return { id, ...updates };
        }
    };

    const deleteNote = async (id) => {
        try {
            const { error } = await supabase
                .from('notes')
                .delete()
                .eq('id', id);

            if (error) throw error;
            
            setNotes(prev => prev.filter(n => n.id !== id));
        } catch (err) {
            console.error('Delete note error:', err);
            setNotes(prev => prev.filter(n => n.id !== id));
        }
    };

    return { notes, loading, error, addNote, updateNote, deleteNote, refetch: fetchNotes };
}
