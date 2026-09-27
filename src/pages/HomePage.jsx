import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import CategoryFilter from '../components/CategoryFilter';
import NoteCard from '../components/NoteCard';
import NoteModal from '../components/NoteModal';
import { useNotes } from '../hooks/useNotes';
import { useI18n } from '../i18n';

export default function HomePage() {
  const { notes, loading, addNote, updateNote, deleteNote } = useNotes();
  const { t } = useI18n();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const filteredNotes = notes.filter(note => {
    const matchesCategory = selectedCategory === 'all' || note.category === selectedCategory;
    const matchesSearch = !searchTerm || 
      note.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (note.description?.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (note.ingredients && note.ingredients.some(i => {
        // Handle both string and object formats
        const name = typeof i === 'string' ? i : i?.name;
        return name?.toLowerCase().includes(searchTerm.toLowerCase());
      }));
    return matchesCategory && matchesSearch;
  });

  // Get trending notes (sorted by rating)
  const trendingNotes = [...notes]
    .sort((a, b) => (b.rating || b.avg_rating || 0) - (a.rating || a.avg_rating || 0))
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
      try {
        await deleteNote(id);
        // Show success message
        const msg = t('messages.deleted');
        console.log(msg);
      } catch (err) {
        console.error('Error deleting note:', err);
        alert('Không thể xóa công thức. Bạn cần đăng nhập hoặc không có quyền xóa công thức này.');
      }
    }
  };

  return (
    <div className="flex flex-col w-full">
      {/* Subtle Ambient Glow Orbs */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute -top-32 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-96 right-10 w-80 h-80 bg-copper-accent/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-gutter py-space-xl">
          {/* Editorial Header Block */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-xl">
            <div className="flex flex-col gap-space-xs max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary">
                  Sổ Tay Lưu Giữ Công Thức & Nghệ Thuật Chế Tác
                </span>
              </div>
              <h1 className="font-headline-display text-headline-display text-cream-text tracking-tight">
                Khám Phá Vũ Trụ <span className="italic font-headline-display text-primary">Pha Chế & Làm Bánh</span>
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
                Tuyển tập tỷ lệ chuẩn xác từ speakeasy underground danh tiếng, trạm cà phê specialty wave 3 và xưởng bánh men sống thủ công cổ điển.
              </p>
            </div>
            
            {/* Quick Live Stats Pill */}
            <div className="flex items-center gap-space-md p-3 bg-surface-slate rounded-lg shadow-md shrink-0">
              <div className="flex flex-col text-right">
                <span className="font-label-sm text-label-sm uppercase text-cream-muted">Kho Dữ Liệu Bar</span>
                <span className="font-label-md text-label-md text-cream-text">1,420+ Tỷ Lệ Đã Kiểm Duyệt</span>
              </div>
              <div className="w-10 h-10 rounded-lg bg-surface-smoke flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-xl">auto_stories</span>
              </div>
            </div>
          </div>

          {/* Search & Smart Filter Module */}
          <div className="bg-surface-slate rounded-xl p-space-md md:p-space-lg shadow-xl mb-space-2xl relative">
            <div className="relative flex items-center mb-space-md">
              <span className="material-symbols-outlined absolute left-4 text-primary text-2xl pointer-events-none">manage_search</span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-surface-obsidian text-cream-text font-body-lg text-body-lg pl-14 pr-32 py-4 rounded-lg placeholder:text-cream-muted focus:outline-none focus:shadow-[0_0_0_2px_rgba(229,158,56,0.5)] transition-all"
                placeholder="Tìm theo rượu nền (Bourbon, Mezcal), hạt cà phê, men bánh Sourdough, hương vị..."
              />
              <button className="absolute right-2.5 bg-primary-container text-on-primary-container px-5 py-2.5 rounded-lg font-label-md text-label-md hover:bg-tertiary-container hover:text-on-tertiary-container transition-all flex items-center gap-1.5 shadow-md">
                <span>Tra Cứu</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
            
            {/* Trending Search Keywords Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-cream-muted flex items-center gap-1 mr-1">
                <span className="material-symbols-outlined text-sm text-copper-accent">trending_up</span> 
                Xu Hướng:
              </span>
              {['Mojito Chanh Bạc Hà', 'Bánh Mì Sourdough & Pastry', 'Cold Brew Geisha', 'Old Fashioned Khói Sồi', 'Matcha Uji & Panna Cotta', 'Cocktail Cà Phê'].map((trend) => (
                <button
                  key={trend}
                  onClick={() => setSearchTerm(trend)}
                  className="px-3 py-1.5 bg-surface-smoke hover:bg-primary/20 text-cream-text hover:text-primary rounded-full font-label-sm text-label-sm transition-all flex items-center gap-1.5"
                >
                  <span>{trend}</span>
                  <span className="material-symbols-outlined text-xs text-cream-muted">north_east</span>
                </button>
              ))}
            </div>

            {/* Navigation Tabs for Fast Classification */}
            <div className="flex items-center gap-2 overflow-x-auto pt-space-md mt-space-md border-t border-border-smoky scrollbar-none">
              {[
                { key: 'all', label: 'Tất Cả Danh Mục', active: true },
                { key: 'cocktail', label: '🍸 Đồ Uống & Cocktail' },
                { key: 'coffee', label: '☕ Trà & Cà Phê Đặc Sản' },
                { key: 'dessert', label: '🥐 Bánh & Tráng Miệng Thủ Công' },
                { key: 'appetizer', label: '🍯 Món Khai Vị & Housemade Syrup' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setSelectedCategory(tab.key)}
                  className={`px-4 py-2 font-label-md text-label-md rounded-lg whitespace-nowrap transition-all ${
                    selectedCategory === tab.key || (tab.active && selectedCategory === 'all')
                      ? 'bg-primary text-on-primary shadow-sm'
                      : 'bg-surface-obsidian text-on-surface-variant hover:text-cream-text'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* SECTION 1: TRENDING LEADERBOARD */}
          <section className="mb-space-2xl">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-space-lg gap-2">
              <div>
                <div className="flex items-center gap-2 text-primary font-label-sm text-label-sm uppercase tracking-widest">
                  <span className="material-symbols-outlined text-base">local_fire_department</span>
                  <span>Bảng Xếp Hạng Tuần Này</span>
                </div>
                <h2 className="font-headline-lg text-headline-lg text-cream-text mt-1">Đang Thịnh Hành Tại Quầy</h2>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-label-sm text-label-sm text-cream-muted">Cập nhật mỗi 24 giờ</span>
                <button className="w-8 h-8 rounded-lg bg-surface-slate flex items-center justify-center text-primary hover:bg-surface-smoke transition-colors">
                  <span className="material-symbols-outlined text-sm">refresh</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-lg">
              {/* Featured Rank 01 - Dynamic */}
              {trendingNotes[0] ? (
                <div 
                  className="group relative bg-surface-slate rounded-xl overflow-hidden shadow-lg transition-transform hover:-translate-y-1 lg:col-span-1 lg:row-span-2 cursor-pointer"
                  onClick={() => navigate(`/note/${trendingNotes[0].id}`)}
                >
                  <div className="relative h-72 lg:h-full min-h-[400px] w-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-copper-accent/30 via-surface-slate to-surface-obsidian"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-slate via-transparent to-transparent"></div>
                    
                    {/* Rank Number Badge */}
                    <div className="absolute top-4 left-4 bg-primary text-on-primary font-bar-mode-metric text-headline-md px-3.5 py-1 rounded-lg shadow-xl flex items-center gap-1">
                      <span className="font-label-sm text-label-sm font-bold uppercase">#</span>01
                    </div>
                    
                    {/* Top Action Heart */}
                    <button 
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-surface-obsidian/70 backdrop-blur-md text-cream-text hover:text-error flex items-center justify-center transition-colors shadow-md"
                      onClick={(e) => { e.stopPropagation(); }}
                    >
                      <span className="material-symbols-outlined text-lg">favorite</span>
                    </button>
                    
                    <div className="absolute bottom-4 left-4 right-4">
                      <span className="inline-block px-3 py-1 bg-surface-smoke/90 backdrop-blur-md text-copper-accent font-label-sm text-label-sm uppercase rounded-full mb-2">
                        {trendingNotes[0].category || 'Cocktail Cổ Điển'}
                      </span>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1 bg-surface-obsidian/80 px-2 py-0.5 rounded-lg text-amber-vibrant font-label-md text-label-md">
                          <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                          <span>{trendingNotes[0].avg_rating || '5.0'}</span>
                          <span className="text-cream-muted text-xs font-normal">(420 đánh giá)</span>
                        </div>
                      </div>
                      <h3 className="font-headline-md text-headline-md text-cream-text group-hover:text-primary transition-colors mb-2">
                        {trendingNotes[0].title}
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mb-4">
                        {trendingNotes[0].description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-cream-muted font-body-sm text-body-sm">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-base text-primary">schedule</span> {trendingNotes[0].prep_time || '4'} phút
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-base text-primary">sync</span> 1.8k remix
                          </span>
                        </div>
                        <button 
                          className="bg-primary-container text-on-primary-container px-3.5 py-1.5 rounded-lg font-label-md text-label-md hover:bg-tertiary-container hover:text-on-tertiary-container transition-all flex items-center gap-1"
                          onClick={(e) => { e.stopPropagation(); navigate(`/note/${trendingNotes[0].id}`); }}
                        >
                          <span>Pha Ngay</span>
                          <span className="material-symbols-outlined text-sm">tune</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Placeholder when no trending notes */
                <div className="group relative bg-surface-slate rounded-xl overflow-hidden shadow-lg lg:col-span-1 lg:row-span-2 opacity-60">
                  <div className="relative h-72 lg:h-full min-h-[400px] w-full overflow-hidden bg-gradient-to-br from-surface-smoke to-surface-obsidian flex items-center justify-center">
                    <div className="text-center">
                      <span className="material-symbols-outlined text-6xl text-primary/30">local_fire_department</span>
                      <p className="text-cream-muted mt-4">Thêm công thức để xuất hiện ở đây</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Rank 02 */}
              {trendingNotes[1] ? (
                <div 
                  className="group relative bg-surface-slate rounded-xl overflow-hidden shadow-lg transition-transform hover:-translate-y-1 cursor-pointer"
                  onClick={() => navigate(`/note/${trendingNotes[1].id}`)}
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-surface-slate to-surface-obsidian"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-slate via-surface-slate/30 to-transparent"></div>
                    
                    <div className="absolute top-4 left-4 bg-surface-smoke text-cream-text font-bar-mode-metric text-headline-md px-3.5 py-1 rounded-lg shadow-xl flex items-center gap-1">
                      <span className="font-label-sm text-label-sm font-bold uppercase">#</span>02
                    </div>
                    
                    <button 
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-surface-obsidian/70 backdrop-blur-md text-cream-text hover:text-error flex items-center justify-center transition-colors shadow-md"
                      onClick={(e) => { e.stopPropagation(); }}
                    >
                      <span className="material-symbols-outlined text-lg">favorite</span>
                    </button>
                    
                    <div className="absolute bottom-3 left-4 right-4">
                      <span className="px-2.5 py-1 bg-surface-smoke/90 backdrop-blur-md text-copper-accent font-label-sm text-label-sm uppercase rounded-full">
                        {trendingNotes[1].category || 'Bánh Mì Men Sống'}
                      </span>
                    </div>
                  </div>
                  <div className="p-space-lg">
                    <h3 className="font-headline-md text-headline-md text-cream-text group-hover:text-primary transition-colors">
                      {trendingNotes[1].title}
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 line-clamp-2">
                      {trendingNotes[1].description}
                    </p>
                    <div className="mt-space-md flex items-center justify-between">
                      <div className="flex items-center gap-4 text-cream-muted font-body-sm text-body-sm">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-base text-primary">timer</span> {trendingNotes[1].prep_time || '36h'} ủ
                        </span>
                      </div>
                      <button 
                        className="bg-surface-smoke text-cream-text px-3.5 py-1.5 rounded-lg font-label-md text-label-md hover:bg-primary hover:text-on-primary transition-all flex items-center gap-1"
                        onClick={(e) => { e.stopPropagation(); navigate(`/note/${trendingNotes[1].id}`); }}
                      >
                        <span>Công Thức</span>
                        <span className="material-symbols-outlined text-sm">visibility</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-surface-slate rounded-xl p-space-lg shadow-lg opacity-40 flex items-center justify-center">
                  <span className="text-cream-muted">#02 - Đang trống</span>
                </div>
              )}

              {/* Rank 03 */}
              {trendingNotes[2] ? (
                <div 
                  className="group relative bg-surface-slate rounded-xl overflow-hidden shadow-lg transition-transform hover:-translate-y-1 cursor-pointer"
                  onClick={() => navigate(`/note/${trendingNotes[2].id}`)}
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-tertiary/20 via-surface-slate to-surface-obsidian"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-slate via-surface-slate/30 to-transparent"></div>
                    
                    <div className="absolute top-4 left-4 bg-surface-smoke text-cream-text font-bar-mode-metric text-headline-md px-3.5 py-1 rounded-lg shadow-xl flex items-center gap-1">
                      <span className="font-label-sm text-label-sm font-bold uppercase">#</span>03
                    </div>
                    
                    <button 
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-surface-obsidian/70 backdrop-blur-md text-cream-text hover:text-error flex items-center justify-center transition-colors shadow-md"
                      onClick={(e) => { e.stopPropagation(); }}
                    >
                      <span className="material-symbols-outlined text-lg">favorite</span>
                    </button>
                    
                    <div className="absolute bottom-3 left-4 right-4">
                      <span className="px-2.5 py-1 bg-surface-smoke/90 backdrop-blur-md text-copper-accent font-label-sm text-label-sm uppercase rounded-full">
                        {trendingNotes[2].category || 'Specialty Coffee'}
                      </span>
                    </div>
                  </div>
                  <div className="p-space-lg">
                    <h3 className="font-headline-md text-headline-md text-cream-text group-hover:text-primary transition-colors">
                      {trendingNotes[2].title}
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 line-clamp-2">
                      {trendingNotes[2].description}
                    </p>
                    <div className="mt-space-md flex items-center justify-between">
                      <div className="flex items-center gap-4 text-cream-muted font-body-sm text-body-sm">
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-base text-primary">schedule</span> {trendingNotes[2].prep_time || '12h'} chiết
                        </span>
                      </div>
                      <button 
                        className="bg-surface-smoke text-cream-text px-3.5 py-1.5 rounded-lg font-label-md text-label-md hover:bg-primary hover:text-on-primary transition-all flex items-center gap-1"
                        onClick={(e) => { e.stopPropagation(); navigate(`/note/${trendingNotes[2].id}`); }}
                      >
                        <span>Công Thức</span>
                        <span className="material-symbols-outlined text-sm">visibility</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-surface-slate rounded-xl p-space-lg shadow-lg opacity-40 flex items-center justify-center">
                  <span className="text-cream-muted">#03 - Đang trống</span>
                </div>
              )}
            </div>
          </section>

          {/* SECTION 2: Featured Master Creators */}
          <section className="mb-space-2xl">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-space-lg gap-2">
              <div>
                <div className="flex items-center gap-2 text-primary font-label-sm text-label-sm uppercase tracking-widest">
                  <span className="material-symbols-outlined text-base">stars</span>
                  <span>Cộng Đồng Nghệ Nhân Tinh Hoa</span>
                </div>
                <h2 className="font-headline-lg text-headline-lg text-cream-text mt-1">Bậc Thầy Pha Chế & Thợ Làm Bánh Tiêu Biểu</h2>
              </div>
              <button 
                onClick={() => navigate('/profile')} 
                className="font-label-md text-label-md text-primary hover:text-copper-accent flex items-center gap-1 transition-colors"
              >
                <span>Xem tất cả nghệ nhân</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
              {[
                { id: 'arthur-vance', name: 'Arthur Vance', role: 'Master Bartender', handle: '@arthur.vance', bio: 'Chuyên gia chế tác thức uống thảo mộc lên men hoang dã và phương pháp fat-washing bơ hạt dẻ vào rượu Bourbon.', recipes: 48, trials: '24.5k', verified: true },
                { id: 'elena-baker', name: 'Elena Baker', role: 'Artisan Baker', handle: '@elena.baker', bio: 'Lưu giữ 12 chủng men hoang dã từ lúa mạch hữu cơ, tái định hình kỹ thuật cán nghìn lớp Croissant bơ Normandy.', recipes: 35, trials: '18.2k', verified: true },
                { id: 'kenji-brew', name: 'Kenji Brew', role: 'Head Roaster', handle: '@kenji.brew', bio: 'Nghiên cứu áp suất nước, chỉ số TDS và biểu đồ trích xuất pour-over tối ưu cho từng vùng thổ nhưỡng Ethiopia & Yirgacheffe.', recipes: 52, trials: '31.0k', verified: true },
              ].map((creator, index) => (
                <div key={creator.id} className="bg-surface-slate rounded-xl p-space-lg shadow-lg relative flex flex-col justify-between hover:bg-surface-smoke transition-colors cursor-pointer" onClick={() => navigate(`/profile/${creator.id}`)}>
                  <div className="flex items-start justify-between mb-space-md">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-surface-smoke flex items-center justify-center shadow-md">
                        <span className="material-symbols-outlined text-primary text-3xl">person</span>
                      </div>
                      {creator.verified && (
                        <span className="absolute -bottom-1 -right-1 bg-primary text-on-primary rounded-full p-0.5" title="Xác minh Atelier">
                          <span className="material-symbols-outlined text-xs block">verified</span>
                        </span>
                      )}
                    </div>
                    <button 
                      onClick={(e) => { e.stopPropagation(); }} 
                      className="px-4 py-1.5 rounded-lg bg-surface-smoke hover:bg-primary hover:text-on-primary text-cream-text font-label-sm text-label-sm transition-all flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-xs">add</span>
                      <span>Theo Dõi</span>
                    </button>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-headline-md text-headline-md text-cream-text">{creator.name}</h4>
                      <span className={`px-2 py-0.5 rounded font-label-sm text-label-sm ${index === 0 ? 'bg-primary/10 text-primary' : 'bg-copper-accent/20 text-copper-accent'}`}>
                        {creator.role}
                      </span>
                    </div>
                    <p className="font-label-sm text-label-sm text-copper-accent mt-0.5">{creator.handle}</p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant mt-3">
                      {creator.bio}
                    </p>
                  </div>
                  <div className="mt-space-md pt-space-sm bg-surface-obsidian/50 rounded-lg p-3 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-label-sm text-label-sm text-cream-muted uppercase">Sổ Lưu Trữ</span>
                      <span className="font-label-md text-label-md text-cream-text font-bold">{creator.recipes} Công thức</span>
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="font-label-sm text-label-sm text-cream-muted uppercase">Lượt Thử Nghiệm</span>
                      <span className="font-label-md text-label-md text-primary font-bold">{creator.trials} lượt</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 3: BARCRAFT & CULINARY ARTICLES */}
          <section className="mb-space-xl">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-space-lg gap-2">
              <div>
                <div className="flex items-center gap-2 text-primary font-label-sm text-label-sm uppercase tracking-widest">
                  <span className="material-symbols-outlined text-base">menu_book</span>
                  <span>Kiến Thức Nền Tảng Chuyên Sâu</span>
                </div>
                <h2 className="font-headline-lg text-headline-lg text-cream-text mt-1">Bí Quyết Trạm Bar & Mẹo Vặt Từ Chuyên Gia</h2>
              </div>
              <span className="font-label-sm text-label-sm text-cream-muted">Tuyển chọn số ấn bản #28</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
              {[
                { id: 'smoking-technique', tag: 'Kỹ Thuật Xông Khói', author: 'Arthur Vance', time: '6 phút đọc', title: 'Kỹ thuật xông khói gỗ sồi không làm đắng rượu nền', desc: 'Hướng dẫn chi tiết chọn dăm gỗ sồi mộc không tẩm hóa chất, điểm bắt nhiệt và thời gian tiếp xúc 20 giây vàng giữ trọn vanillin thơm ngọt.', tagColor: 'text-primary' },
                { id: 'acid-balance', tag: 'Khoa Học Tỷ Lệ', author: 'Ban Biên Tập Atelier', time: '8 phút đọc', title: 'Bí quyết cân bằng độ chua Acid & Đường trong Cocktail hiện đại', desc: 'Tận dụng Acid Solution (Citric & Malic ratio 9:1) để thay thế chanh tươi khi cần giữ nguyên màu trong suốt tuyệt đối của thức uống.', tagColor: 'text-copper-accent' },
                { id: 'sourdough-temp', tag: 'Bánh Men Hoang Dã', author: 'Elena Baker', time: '10 phút đọc', title: 'Kiểm soát nhiệt độ ủ bột bánh Sourdough chuẩn ẩm thực', desc: 'Phương pháp duy trì 24-26°C trong quá trình Bulk Fermentation để vi khuẩn axit lactic tạo hậu vị chua thanh, không gắt họng.', tagColor: 'text-tertiary' },
              ].map((article, index) => (
                <article 
                  key={article.id} 
                  className="bg-surface-slate rounded-xl overflow-hidden shadow-lg flex flex-col group cursor-pointer hover:-translate-y-1 transition-all duration-300"
                  onClick={() => navigate(`/lineage/${article.id}`)}
                >
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-surface-smoke to-surface-obsidian">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="material-symbols-outlined text-6xl text-primary/30 group-hover:text-primary/50 transition-colors">auto_stories</span>
                    </div>
                    <span className={`absolute top-3 left-3 bg-surface-obsidian/80 backdrop-blur-md px-2.5 py-1 rounded font-label-sm text-label-sm uppercase ${article.tagColor}`}>
                      {article.tag}
                    </span>
                  </div>
                  <div className="p-space-lg flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-cream-muted font-label-sm text-label-sm mb-2">
                        <span>{article.time}</span>
                        <span>•</span>
                        <span>Bởi {article.author}</span>
                      </div>
                      <h3 className="font-headline-md text-headline-md text-cream-text group-hover:text-primary transition-colors leading-snug">
                        {article.title}
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
                        {article.desc}
                      </p>
                    </div>
                    <div className="mt-space-md pt-3 flex items-center text-primary font-label-md text-label-md gap-1">
                      <span>Đọc bài luận chuyên đề</span>
                      <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">east</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* All Recipes Section */}
          <section className="mb-space-2xl">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-headline-lg text-headline-lg text-cream-text">
                  Tất Cả Công Thức
                  {selectedCategory !== 'all' && (
                    <span className="text-primary ml-2">· {t(`categories.${selectedCategory}`)}</span>
                  )}
                </h2>
                <p className="text-cream-muted mt-1">{filteredNotes.length} công thức có sẵn</p>
              </div>
              <span className="font-body-sm text-cream-muted">
                {filteredNotes.length} công thức
              </span>
            </div>

            {/* Category Pills for All Recipes */}
            <CategoryFilter
              notes={notes}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />

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
                  className="bg-primary-container text-on-primary-container px-6 py-3 rounded-lg font-label-md inline-flex items-center gap-2 hover:bg-tertiary-container transition-all"
                >
                  <span className="material-symbols-outlined">add</span>
                  Thêm Công Thức Mới
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
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

          {/* Bottom Interactive Newsletter / Atelier Digest Banner */}
          <div className="bg-gradient-to-r from-surface-slate via-surface-smoke to-surface-slate rounded-2xl p-space-xl shadow-xl flex flex-col lg:flex-row items-center justify-between gap-space-lg">
            <div className="flex items-center gap-space-md">
              <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-3xl">local_cafe</span>
              </div>
              <div className="flex flex-col">
                <h3 className="font-headline-md text-headline-md text-cream-text">Nhận Bản Tin Bí Quyết Hàng Tuần</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant">
                  Tỷ lệ công thức bí mật, biểu đồ hương vị theo mùa và tài liệu PDF dành riêng cho các thành viên Atelier.
                </p>
              </div>
            </div>
            <div className="flex w-full lg:w-auto items-center gap-2 max-w-md">
              <input 
                className="bg-surface-obsidian text-cream-text font-body-sm text-body-sm px-4 py-3 rounded-lg flex-1 placeholder:text-cream-muted focus:outline-none focus:ring-1 focus:ring-primary" 
                placeholder="Địa chỉ email cá nhân..." 
                type="email"
              />
              <button className="bg-primary text-on-primary px-5 py-3 rounded-lg font-label-md text-label-md hover:bg-primary-container transition-all shrink-0">
                Đăng Ký
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-surface-slate mt-space-2xl">
        <div className="max-w-7xl mx-auto px-gutter py-space-2xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-space-xl mb-space-2xl">
            <div className="md:col-span-1 flex flex-col gap-space-sm">
              <div className="flex items-center gap-2">
                <span className="font-headline-md text-headline-md text-cream-text">Space Bar Note</span>
                <span className="font-label-sm text-label-sm tracking-widest uppercase text-copper-accent">Atelier Spirits & Brew</span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Sổ tay chế tác kinh điển dành cho Bartender nghệ thuật & Barista chiết xuất chính xác. Nơi lưu giữ tỷ lệ hoàn mỹ và tinh thần thức uống thủ công.
              </p>
            </div>
            <div className="flex flex-col gap-space-sm">
              <span className="font-label-md text-label-md text-primary tracking-wider uppercase">Mục Lục Kinh Điển</span>
              <ul className="flex flex-col gap-2 font-body-sm text-body-sm text-on-surface-variant">
                <li className="hover:text-on-surface transition-colors cursor-pointer">Signature Cocktails & Highballs</li>
                <li className="hover:text-on-surface transition-colors cursor-pointer">Single Origin Pour-Over (V60, Chemex)</li>
                <li className="hover:text-on-surface transition-colors cursor-pointer">Bản Đồ Cân Bằng Sweet & Sour</li>
                <li className="hover:text-on-surface transition-colors cursor-pointer">Siro & Bitters Tự Nấu (Housemade)</li>
              </ul>
            </div>
            <div className="flex flex-col gap-space-sm">
              <span className="font-label-md text-label-md text-primary tracking-wider uppercase">Công Cụ Trạm Pha</span>
              <ul className="flex flex-col gap-2 font-body-sm text-body-sm text-on-surface-variant">
                <li className="hover:text-on-surface transition-colors cursor-pointer">Bản In Trạm Bar Khổ A4/A5</li>
                <li className="hover:text-on-surface transition-colors cursor-pointer">Quy Đổi Đơn Vị (ml, oz, g, ratio)</li>
                <li className="hover:text-on-surface transition-colors cursor-pointer">Đồng Hồ Chiết Xuất & Khuấy Lạnh</li>
                <li className="hover:text-on-surface transition-colors cursor-pointer">Sổ Tay Kiểm Kê Tủ Rượu & Hạt</li>
              </ul>
            </div>
            <div className="flex flex-col gap-space-sm">
              <span className="font-label-md text-label-md text-copper-accent tracking-wider uppercase">Thưởng Thức Có Trách Nhiệm</span>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Tôn vinh tinh hoa thủ công, hương vị chiều sâu và nghệ thuật ẩm thực. Xin hãy thưởng thức đồ uống có cồn có trách nhiệm và không lái xe sau khi sử dụng.
              </p>
            </div>
          </div>
          <div className="pt-space-lg flex flex-col sm:flex-row items-center justify-between gap-4 font-body-sm text-body-sm text-on-surface-variant border-t border-border-smoky pt-6">
            <p>© 2025 Space Bar Note (Atelier Spirits & Brew). Bảo lưu mọi bản quyền nghệ thuật pha chế.</p>
            <div className="flex items-center gap-space-md">
              <span className="hover:text-on-surface transition-colors cursor-pointer">Quy Chuẩn Thao Tác Bar</span>
              <span className="hover:text-on-surface transition-colors cursor-pointer">Chính Sách Bảo Mật Công Thức</span>
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
