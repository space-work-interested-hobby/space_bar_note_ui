import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, Users, Star, Heart, Archive, Play, Loader2, Image as ImageIcon } from 'lucide-react';
import { useI18n } from '../i18n';
import BarModeModal from '../components/BarModeModal';
import { supabase } from '../lib/supabase';
import { MOCK_NOTES } from '../hooks/useNotes';

export default function NoteDetailPage() {
  const { id } = useParams();
  const { t } = useI18n();
  const [isBarModeOpen, setIsBarModeOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isStashed, setIsStashed] = useState(false);
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch recipe data from Supabase
  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true);

        // Check if this is a mock ID
        const mockNote = MOCK_NOTES.find(m => m.id === id);

        if (mockNote) {
          // Use mock data for mock IDs
          setRecipe({
            id: mockNote.id,
            name: mockNote.title,
            description: mockNote.description,
            category: mockNote.category,
            difficulty: 'medium',
            time_minutes: 15,
            servings: 1,
            rating: mockNote.avg_rating || 0,
            abv: null,
            author_story: null,
            ingredients: mockNote.ingredients?.map((name, idx) => ({
              name,
              amount: '1',
              unit: 'oz'
            })) || [],
            steps: ['Add all ingredients to a mixing glass', 'Stir well', 'Strain into a glass', 'Serve immediately'],
            stepsWithImages: [],
            images: [],
            heroImage: null,
          });
          setLoading(false);
          return;
        }

        // Fetch note from Supabase
        const { data: noteData, error: noteError } = await supabase
          .from('notes')
          .select('*')
          .eq('id', id)
          .single();

        if (noteError) throw noteError;
        if (!noteData) {
          setError('Recipe not found');
          setLoading(false);
          return;
        }

        // Fetch translations (Vietnamese)
        const { data: transData } = await supabase
          .from('note_translations')
          .select('*')
          .eq('note_id', id)
          .eq('language', 'vi')
          .single();

        // Fetch ingredients
        const { data: ingredientsData } = await supabase
          .from('note_ingredients')
          .select('*')
          .eq('note_id', id)
          .order('sort_order', { ascending: true });

        // Fetch steps
        const { data: stepsData } = await supabase
          .from('note_steps')
          .select('*')
          .eq('note_id', id)
          .order('step_number', { ascending: true });

        // Fetch images
        const { data: imagesData } = await supabase
          .from('note_images')
          .select('*')
          .eq('note_id', id)
          .order('sort_order', { ascending: true });

        // Build recipe object
        const recipeData = {
          id: noteData.id,
          name: transData?.title || noteData.title || 'Untitled',
          description: transData?.description || noteData.description || '',
          category: noteData.category,
          difficulty: noteData.difficulty,
          time_minutes: noteData.time_minutes,
          servings: noteData.servings,
          rating: noteData.rating || 0,
          abv: noteData.abv,
          author_story: transData?.author_story,
          ingredients: ingredientsData?.map(ing => ({
            name: ing.name,
            amount: ing.amount,
            unit: ing.unit
          })) || [],
          steps: stepsData?.map(step => step.content) || [],
          stepsWithImages: stepsData || [],
          images: imagesData?.map(img => ({
            id: img.id,
            url: img.image_url,
            caption: img.caption,
            alt: img.alt_text,
            isHero: img.is_hero
          })) || [],
          heroImage: imagesData?.find(img => img.is_hero)?.image_url 
            || imagesData?.[0]?.image_url 
            || noteData.image_url
            || null,
        };

        setRecipe(recipeData);
      } catch (err) {
        console.error('Error fetching recipe:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRecipe();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="text-cream-muted">{t('messages.loading') || 'Đang tải...'}</span>
        </div>
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <span className="text-6xl">😕</span>
        <h2 className="text-xl font-headline-md text-cream-text">
          {error || 'Không tìm thấy công thức'}
        </h2>
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary-container text-on-primary-container rounded-lg hover:bg-tertiary-container transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại trang chủ
        </Link>
      </div>
    );
  }

  // Get category badge
  const getCategoryBadge = (category) => {
    const badges = {
      cocktail: '🍸 Cocktail',
      mocktail: '🥂 Mocktail',
      coffee: '☕ Cà Phê',
      tea: '🍵 Trà',
      juice: '🍹 Nước Ép',
      beer: '🍺 Bia',
      wine: '🍷 Rượu Vang',
      dessert: '🍰 Tráng Miệng',
      cake: '🎂 Bánh Ngọt',
      drink: '🥤 Đồ Uống',
    };
    return badges[category] || category;
  };

  return (
    <div className="flex flex-col w-full">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-gutter py-4 w-full">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-cream-muted hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-label-md">{t('nav.home') || 'Trang Chủ'}</span>
          </Link>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsFavorite(!isFavorite)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                isFavorite 
                  ? 'bg-primary-container text-on-primary-container' 
                  : 'bg-surface-slate text-cream-muted hover:text-cream-text'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
              <span className="text-label-md hidden sm:inline">{isFavorite ? 'Đã Lưu' : 'Lưu'}</span>
            </button>
            <button 
              onClick={() => setIsStashed(!isStashed)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                isStashed 
                  ? 'bg-secondary-container text-on-secondary-container' 
                  : 'bg-surface-slate text-cream-muted hover:text-cream-text'
              }`}
            >
              <Archive className="w-4 h-4" />
              <span className="text-label-md hidden sm:inline">{isStashed ? 'Đã Tủ' : 'Vào Tủ'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative w-full overflow-hidden bg-surface-obsidian">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[720px] h-[340px] bg-primary-container/10 blur-[130px] pointer-events-none rounded-full"></div>
        
        <div className="max-w-7xl mx-auto px-gutter py-space-xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center rounded-xl bg-surface-slate p-space-lg lg:p-space-xl relative overflow-hidden shadow-xl">
            {/* Left */}
            <div className="lg:col-span-7 flex flex-col gap-space-md z-10">
              <span className="bg-surface-smoke text-copper-accent px-3 py-1 rounded-full text-label-sm tracking-widest uppercase w-fit">
                {getCategoryBadge(recipe.category)}
              </span>
              
              <h1 className="font-headline-display text-cream-text tracking-tight leading-tight">
                {recipe.name}
              </h1>
              
              <p className="text-body-lg text-cream-muted max-w-2xl leading-relaxed">
                {recipe.description}
              </p>
              
              {/* Meta */}
              <div className="flex flex-wrap items-center gap-6 pt-2">
                <div className="flex items-center gap-2">
                  <div className="flex text-tertiary">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className={`w-5 h-5 ${i <= Math.round(recipe.rating) ? 'fill-current' : ''}`} />
                    ))}
                  </div>
                  <span className="text-headline-md text-cream-text font-bold">{recipe.rating?.toFixed(1) || '0.0'}</span>
                </div>
                {recipe.time_minutes && (
                  <div className="bg-surface-obsidian px-4 py-2 rounded-lg flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span className="text-label-sm text-cream-muted uppercase">Thời Gian</span>
                    <span className="text-label-md text-cream-text font-semibold">{recipe.time_minutes} Phút</span>
                  </div>
                )}
                {recipe.servings && (
                  <div className="bg-surface-obsidian px-4 py-2 rounded-lg flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    <span className="text-label-sm text-cream-muted uppercase">Khẩu Phần</span>
                    <span className="text-label-md text-cream-text font-semibold">{recipe.servings} Người</span>
                  </div>
                )}
                {recipe.abv && (
                  <div className="bg-surface-obsidian px-4 py-2 rounded-lg">
                    <span className="text-label-sm text-cream-muted uppercase">ABV</span>
                    <span className="text-label-md text-cream-text font-semibold ml-2">{recipe.abv}%</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Right - Hero Image */}
            <div className="lg:col-span-5 relative">
              <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden shadow-2xl bg-surface-obsidian">
                {recipe.heroImage ? (
                  <img 
                    src={recipe.heroImage} 
                    alt={recipe.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-cream-muted">
                    <ImageIcon className="w-16 h-16 mb-2 opacity-40" />
                    <span className="text-label-md">Chưa có ảnh</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-surface-obsidian via-transparent to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bar Mode CTA */}
      {recipe.ingredients?.length > 0 && (
        <div className="max-w-7xl mx-auto px-gutter -mt-space-lg relative z-20 w-full">
          <button
            onClick={() => setIsBarModeOpen(true)}
            className="w-full lg:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-primary-container via-amber-vibrant to-tertiary-container hover:shadow-[0_0_28px_rgba(245,179,66,0.35)] text-on-primary-container text-label-md uppercase tracking-wider px-6 py-3.5 rounded-lg font-bold transition-all"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>BẮT ĐẦU PHA CHẾ (BAR MODE)</span>
          </button>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-gutter w-full pb-space-2xl mt-space-xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
          {/* Left Column - Ingredients */}
          <div className="lg:col-span-5 flex flex-col gap-space-xl">
            {/* Ingredients */}
            <div className="bg-surface-slate rounded-xl p-space-lg shadow-lg">
              <div className="flex items-center justify-between pb-3 border-b border-border-smoky">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-xl">liquor</span>
                  <h2 className="text-headline-md text-cream-text">Nguyên Liệu</h2>
                </div>
                <span className="bg-surface-smoke text-primary px-3 py-1 rounded-full text-label-sm">
                  {recipe.ingredients?.length || 0} Món
                </span>
              </div>
              
              <div className="flex flex-col gap-2.5 mt-space-md">
                {recipe.ingredients?.map((ing, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3.5 bg-surface-obsidian rounded-lg hover:bg-surface-container transition-colors group">
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 rounded-full bg-copper-accent group-hover:scale-125 transition-transform"></div>
                      <span className="text-label-md text-cream-text font-medium">{ing.name}</span>
                    </div>
                    <span className="text-headline-md font-bold text-primary">
                      {ing.amount} {ing.unit || ''}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Author Story */}
            {recipe.author_story && (
              <div className="bg-surface-slate rounded-xl p-space-lg shadow-lg">
                <div className="flex items-center gap-2 mb-space-md">
                  <span className="material-symbols-outlined text-primary text-xl">auto_stories</span>
                  <h2 className="text-headline-md text-cream-text">Câu Chuyện</h2>
                </div>
                <p className="text-body-md text-cream-muted leading-relaxed italic">
                  "{recipe.author_story}"
                </p>
              </div>
            )}

            {/* Images Gallery */}
            {recipe.images?.length > 0 && (
              <div className="bg-surface-slate rounded-xl p-space-lg shadow-lg">
                <div className="flex items-center justify-between pb-3 border-b border-border-smoky">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-xl">photo_library</span>
                    <h2 className="text-headline-md text-cream-text">Hình Ảnh</h2>
                  </div>
                  <span className="bg-surface-smoke text-primary px-3 py-1 rounded-full text-label-sm">
                    {recipe.images.length} Ảnh
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-3 mt-space-md">
                  {recipe.images.map((img, idx) => (
                    <div key={img.id || idx} className="relative aspect-square rounded-lg overflow-hidden group">
                      <img 
                        src={img.url} 
                        alt={img.alt || `Image ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                      {img.isHero && (
                        <div className="absolute top-2 left-2 px-2 py-0.5 bg-primary text-on-primary rounded text-xs font-label-sm">
                          Ảnh Bìa
                        </div>
                      )}
                      {img.caption && (
                        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-surface-obsidian/90 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="text-xs text-cream-text">{img.caption}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Pro Tips */}
            <div className="bg-surface-slate rounded-xl p-space-lg shadow-lg">
              <div className="flex items-center gap-2 mb-space-md">
                <span className="material-symbols-outlined text-primary text-xl">lightbulb</span>
                <h2 className="text-headline-md text-cream-text">Mẹo Bartender</h2>
              </div>
              <p className="text-body-md text-cream-muted leading-relaxed">
                {recipe.category === 'cocktail' 
                  ? 'Khi nhân số lượng ly cho tiệc (4-6 ly), chuẩn bị hỗn hợp rượu nền và syrup trong bình chứa lớn trước, giữ lạnh ở 2-4°C để kiểm soát độ tan đá lý tưởng.'
                  : 'Đảm bảo dụng cụ sạch sẽ và nguyên liệu được chuẩn bị sẵn trước khi bắt đầu.'
                }
              </p>
            </div>
          </div>
          
          {/* Right Column - Steps */}
          <div className="lg:col-span-7 flex flex-col gap-space-lg">
            <div className="bg-surface-slate rounded-xl p-space-lg shadow-lg">
              <div className="flex items-center justify-between pb-3 border-b border-border-smoky">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-xl">format_list_numbered</span>
                  <h2 className="text-headline-md text-cream-text">Các Bước Thực Hiện</h2>
                </div>
                <span className="text-label-md text-tertiary font-bold">{recipe.steps?.length || 0} Giai Đoạn</span>
              </div>
              
              <div className="flex flex-col gap-4 mt-space-md">
                {recipe.steps?.map((step, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row gap-4 p-space-md rounded-xl bg-surface-obsidian hover:bg-surface-container transition-all group">
                    <div className="w-12 h-12 rounded-lg bg-surface-smoke flex items-center justify-center text-headline-md text-primary shrink-0 group-hover:bg-primary group-hover:text-on-primary transition-colors">
                      {String(idx + 1).padStart(2, '0')}
                    </div>
                    <div className="flex flex-col gap-2 flex-1">
                      <p className="text-body-md text-cream-muted leading-relaxed">{step}</p>
                      {/* Step image if exists */}
                      {recipe.stepsWithImages?.[idx]?.image_url && (
                        <img 
                          src={recipe.stepsWithImages[idx].image_url} 
                          alt={`Bước ${idx + 1}`}
                          className="w-full max-h-48 object-cover rounded-lg mt-2"
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bar Mode Modal */}
      <BarModeModal 
        recipe={recipe} 
        isOpen={isBarModeOpen} 
        onClose={() => setIsBarModeOpen(false)} 
      />
    </div>
  );
}
