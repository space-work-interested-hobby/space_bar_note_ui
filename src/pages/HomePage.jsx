import { useState } from 'react';
import Header from '../components/Header';
import CategoryFilter from '../components/CategoryFilter';
import NoteCard from '../components/NoteCard';
import NoteModal from '../components/NoteModal';
import { useNotes } from '../hooks/useNotes';
import { useI18n } from '../i18n';

export default function HomePage() {
  const { notes, loading, addNote, updateNote, deleteNote } = useNotes();
  const { t } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const filteredNotes = notes.filter(note => {
    const matchesCategory = selectedCategory === 'all' || note.category === selectedCategory;
    const matchesSearch = !searchTerm || 
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (note.ingredients && note.ingredients.some(i => i.toLowerCase().includes(searchTerm.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  // Get trending notes (sorted by rating)
  const trendingNotes = [...notes]
    .sort((a, b) => (b.avg_rating || 0) - (a.avg_rating || 0))
    .slice(0, 4);

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
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-surface-obsidian pt-12 pb-20">
        {/* Ambient Luminous Background Orbs */}
        <div className="absolute -top-32 left-1/4 w-96 h-96 rounded-full bg-primary-container/10 blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/3 right-10 w-80 h-80 rounded-full bg-copper-accent/10 blur-3xl pointer-events-none"></div>
        
        <div className="relative max-w-7xl mx-auto px-gutter">
          {/* Tagline */}
          <div className="flex items-center gap-3 mb-6">
            <span className="w-8 h-[2px] bg-copper-accent"></span>
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-copper-accent">
              Atelier Compendium · Ấn Bản Lưu Trữ
            </span>
            <span className="w-8 h-[2px] bg-copper-accent"></span>
          </div>
          
          {/* Headline */}
          <h1 className="font-headline-display text-headline-display text-cream-text max-w-4xl tracking-tight mb-8">
            Sổ Tay Pha Chế Truyền Đời — Nơi Hội Tụ Nghệ Thuật Cocktail & Craft Coffee
          </h1>
          <p className="font-body-lg text-body-lg text-cream-muted max-w-2xl mb-12">
            Hệ thống quy chuẩn tỉ lệ vàng, hương sắc cân bằng và chỉ dẫn chiết xuất chính xác đến từng giọt dành cho Bartender nghệ thuật & Barista sành sỏi.
          </p>

          {/* Advanced Search Command Deck */}
          <div className="bg-surface-slate rounded-xl p-3 shadow-xl max-w-4xl relative mb-8">
            <div className="flex flex-col md:flex-row items-stretch gap-3">
              <div className="relative flex-1 flex items-center">
                <span className="material-symbols-outlined absolute left-4 text-cream-muted">search</span>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-surface-obsidian text-cream-text font-body-md pl-12 pr-4 py-4 rounded-lg placeholder:text-cream-muted focus:outline-none focus:ring-1 focus:ring-primary-container"
                  placeholder="Tìm theo nguyên liệu, tên món, hoặc nốt vị..."
                />
              </div>
              <button
                onClick={handleAddNote}
                className="bg-primary-container hover:bg-tertiary-container text-on-primary-container font-label-md px-8 py-4 rounded-lg transition-all flex items-center justify-center gap-2 shrink-0"
              >
                <span className="material-symbols-outlined text-base">add</span>
                <span>Thêm Công Thức</span>
              </button>
            </div>
          </div>

          {/* Quick Filter Chips */}
          <CategoryFilter
            notes={notes}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </div>
      </section>

      {/* My Bar Cabinet Teaser Ribbon */}
      <section className="w-full bg-surface-container-low py-10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-gutter flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-xl bg-surface-smoke flex items-center justify-center shrink-0 shadow-md">
              <span className="material-symbols-outlined text-primary text-3xl">liquor</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary">Sáng Kiến Quầy Bar Tại Gia</span>
                <span className="px-2 py-0.5 rounded-full bg-copper-accent/20 text-copper-accent font-label-sm text-label-sm">Tiện Ích Độc Bản</span>
              </div>
              <h2 className="font-headline-md text-headline-md text-cream-text mt-1">
                Khám phá công thức từ nguyên liệu sẵn có trong tủ
              </h2>
              <p className="font-body-sm text-body-sm text-cream-muted mt-1">
                Đánh dấu 4-5 chai rượu hoặc gói hạt bạn đang có, hệ thống sẽ đề xuất ngay các ly chuẩn vị.
              </p>
            </div>
          </div>
          <button className="w-full lg:w-auto bg-primary text-on-primary font-label-md px-6 py-3.5 rounded-lg transition-all shadow-md flex items-center justify-center gap-2 hover:bg-primary-fixed-dim">
            <span className="material-symbols-outlined text-lg">inventory_2</span>
            <span>Thử Tính Năng Tủ Quầy Của Tôi</span>
          </button>
        </div>
      </section>

      {/* Trending Recipes Section */}
      {trendingNotes.length > 0 && (
        <section className="max-w-7xl mx-auto px-gutter py-20 w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-copper-accent text-lg">local_fire_department</span>
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-copper-accent">Bảng Xếp Hạng</span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-cream-text">Đang Được Yêu Thích</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingNotes.map((note, index) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={handleEditNote}
                onDelete={handleDeleteNote}
              />
            ))}
          </div>
        </section>
      )}

      {/* All Recipes Section */}
      <section className="max-w-7xl mx-auto px-gutter py-12 w-full">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-headline-lg text-headline-lg text-cream-text">
            Tất Cả Công Thức
            {selectedCategory !== 'all' && (
              <span className="text-primary ml-2">· {t(`categories.${selectedCategory}`)}</span>
            )}
          </h2>
          <span className="font-body-sm text-cream-muted">
            {filteredNotes.length} công thức
          </span>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
          </div>
        ) : filteredNotes.length === 0 ? (
          <div className="text-center py-20 bg-surface-slate rounded-xl">
            <span className="text-7xl mb-6 block">🍹</span>
            <h3 className="font-headline-md text-headline-md text-cream-text mb-3">
              {notes.length === 0 ? 'Chưa có công thức nào' : 'Không tìm thấy công thức'}
            </h3>
            <p className="font-body-md text-cream-muted mb-6">
              {notes.length === 0 
                ? 'Bắt đầu thêm công thức đầu tiên của bạn!'
                : 'Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm'}
            </p>
            <button
              onClick={handleAddNote}
              className="bg-primary-container text-on-primary-container px-6 py-3 rounded-lg font-label-md inline-flex items-center gap-2 hover:bg-tertiary-container"
            >
              <span className="material-symbols-outlined">add</span>
              Thêm Công Thức Mới
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note, index) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={handleEditNote}
                onDelete={handleDeleteNote}
              />
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="w-full bg-surface-slate mt-space-2xl">
        <div className="max-w-7xl mx-auto px-gutter py-space-2xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-space-xl mb-space-2xl">
            <div className="md:col-span-1 flex flex-col gap-space-sm">
              <div className="flex items-center gap-2">
                <span className="font-headline-md text-headline-md text-cream-text">Atelier</span>
                <span className="font-label-sm text-label-sm tracking-widest uppercase text-copper-accent">Spirits & Brew</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Sổ tay chế tác kinh điển dành cho Bartender nghệ thuật & Barista chiết xuất chính xác.
              </p>
            </div>
            <div className="flex flex-col gap-space-sm">
              <span className="font-label-md text-label-md text-primary tracking-wider uppercase">Mục Lục</span>
              <ul className="flex flex-col gap-2 font-body-sm text-body-sm text-on-surface-variant">
                <li className="hover:text-on-surface transition-colors cursor-pointer">Cocktails & Highballs</li>
                <li className="hover:text-on-surface transition-colors cursor-pointer">Cà Phê Thủ Công</li>
                <li className="hover:text-on-surface transition-colors cursor-pointer">Mocktails</li>
              </ul>
            </div>
            <div className="flex flex-col gap-space-sm">
              <span className="font-label-md text-label-md text-primary tracking-wider uppercase">Công Cụ</span>
              <ul className="flex flex-col gap-2 font-body-sm text-body-sm text-on-surface-variant">
                <li className="hover:text-on-surface transition-colors cursor-pointer">Bản In A4/A5</li>
                <li className="hover:text-on-surface transition-colors cursor-pointer">Quy Đổi Đơn Vị</li>
                <li className="hover:text-on-surface transition-colors cursor-pointer">Đồng Hồ Pha Chế</li>
              </ul>
            </div>
            <div className="flex flex-col gap-space-sm">
              <span className="font-label-md text-label-md text-copper-accent tracking-wider uppercase">Thưởng Thức Có Trách Nhiệm</span>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Xin hãy thưởng thức đồ uống có cồn có trách nhiệm và không lái xe sau khi sử dụng.
              </p>
            </div>
          </div>
          <div className="pt-space-lg flex flex-col sm:flex-row items-center justify-between gap-4 font-body-sm text-body-sm text-on-surface-variant border-t border-border-smoky pt-6">
            <p>© 2025 Atelier Spirits & Brew. Bảo lưu mọi bản quyền.</p>
            <div className="flex items-center gap-space-md">
              <span className="hover:text-on-surface transition-colors cursor-pointer">Quy Chuẩn Bar</span>
              <span className="hover:text-on-surface transition-colors cursor-pointer">Chính Sách Bảo Mật</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Note Modal */}
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
