import { useState } from 'react';
import { useI18n } from '../i18n';
import { useNotes } from '../hooks/useNotes';
import NoteCard from '../components/NoteCard';
import NoteModal from '../components/NoteModal';

export default function MyRecipesPage() {
  const { t } = useI18n();
  const { notes, loading, addNote, updateNote, deleteNote } = useNotes();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  // Filter user's own notes
  const myNotes = notes.filter(note => note.isOwner);

  const handleAddNote = () => {
    setEditingNote(null);
    setIsModalOpen(true);
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setIsModalOpen(true);
  };

  const handleSaveNote = async (noteData) => {
    if (editingNote) {
      await updateNote(editingNote.id, noteData);
    } else {
      await addNote(noteData);
    }
    setIsModalOpen(false);
    setEditingNote(null);
  };

  const handleDeleteNote = async (id) => {
    if (confirm(t('messages.confirmDelete'))) {
      await deleteNote(id);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">📝 {t('nav.myRecipes')}</h1>
        <button
          onClick={handleAddNote}
          className="bg-amber-600 text-white px-4 py-2 rounded-lg hover:bg-amber-700 transition-colors"
        >
          + {t('actions.add')}
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent"></div>
        </div>
      ) : myNotes.length === 0 ? (
        <div className="text-center py-20">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">{t('messages.noNotes')}</h3>
          <p className="text-gray-500">{t('messages.startAdding')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {myNotes.map(note => (
            <NoteCard
              key={note.id}
              note={note}
              onEdit={handleEditNote}
              onDelete={handleDeleteNote}
            />
          ))}
        </div>
      )}

      <NoteModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingNote(null);
        }}
        onSave={handleSaveNote}
        note={editingNote}
        title={editingNote ? t('noteModal.editTitle') : t('noteModal.addTitle')}
      />
    </div>
  );
}
