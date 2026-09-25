/**
 * ============================================================
 * useStash Hook - Quản lý Tủ Quầy Bar của người dùng
 * ============================================================
 * Cho phép người dùng lưu trữ các nguyên liệu họ có sẵn
 * và đề xuất công thức phù hợp
 */
import { useState, useEffect, useMemo } from 'react';
import { useNotes } from './useNotes';

// Danh sách nguyên liệu mẫu để chọn
export const COMMON_INGREDIENTS = [
    // Rượu mạnh (Spirits)
    { id: 'vodka', name: 'Vodka', category: 'spirit', icon: '🍶' },
    { id: 'gin', name: 'Gin', category: 'spirit', icon: '🍸' },
    { id: 'rum', name: 'Rum', category: 'spirit', icon: '🏴‍☠️' },
    { id: 'whiskey', name: 'Whiskey', category: 'spirit', icon: '🥃' },
    { id: 'bourbon', name: 'Bourbon', category: 'spirit', icon: '🥃' },
    { id: 'tequila', name: 'Tequila', category: 'spirit', icon: '🌵' },
    { id: 'brandy', name: 'Brandy', category: 'spirit', icon: '🍷' },
    { id: 'cognac', name: 'Cognac', category: 'spirit', icon: '🍷' },
    { id: 'scotch', name: 'Scotch', category: 'spirit', icon: '🥃' },
    { id: 'mezcal', name: 'Mezcal', category: 'spirit', icon: '💀' },
    
    // Liqueurs
    { id: 'triple_sec', name: 'Triple Sec', category: 'liqueur', icon: '🍊' },
    { id: 'cointreau', name: 'Cointreau', category: 'liqueur', icon: '🍊' },
    { id: 'kahlua', name: 'Kahlua', category: 'liqueur', icon: '☕' },
    { id: 'amaretto', name: 'Amaretto', category: 'liqueur', icon: '🥜' },
    { id: 'campari', name: 'Campari', category: 'liqueur', icon: '🍊' },
    { id: 'aperol', name: 'Aperol', category: 'liqueur', icon: '🍊' },
    { id: 'vermouth_red', name: 'Vermouth Đỏ', category: 'liqueur', icon: '🍷' },
    { id: 'vermouth_white', name: 'Vermouth Trắng', category: 'liqueur', icon: '🍾' },
    { id: 'sweet_vermouth', name: 'Sweet Vermouth', category: 'liqueur', icon: '🍷' },
    { id: 'dry_vermouth', name: 'Dry Vermouth', category: 'liqueur', icon: '🍾' },
    { id: 'blue_curacao', name: 'Blue Curaçao', category: 'liqueur', icon: '💙' },
    { id: 'midori', name: 'Midori', category: 'liqueur', icon: '💚' },
    { id: 'baileys', name: 'Baileys', category: 'liqueur', icon: '🍫' },
    { id: 'chartreuse', name: 'Chartreuse', category: 'liqueur', icon: '💚' },
    { id: 'st_germain', name: 'St-Germain', category: 'liqueur', icon: '🌸' },
    { id: 'maraschino', name: 'Maraschino', category: 'liqueur', icon: '🍒' },
    
    // Bitters
    { id: 'angostura', name: 'Angostura Bitters', category: 'bitters', icon: '🟤' },
    { id: 'orange_bitters', name: 'Orange Bitters', category: 'bitters', icon: '🍊' },
    { id: 'peychauds', name: 'Peychaud\'s Bitters', category: 'bitters', icon: '🟤' },
    
    // Syrups
    { id: 'simple_syrup', name: 'Syrup Đường', category: 'syrup', icon: '🍬' },
    { id: 'honey_syrup', name: 'Syrup Mật Ong', category: 'syrup', icon: '🍯' },
    { id: 'agave_syrup', name: 'Syrup Agave', category: 'syrup', icon: '🌵' },
    { id: 'grenadine', name: 'Grenadine', category: 'syrup', icon: '🍒' },
    { id: 'orgeat', name: 'Orgeat', category: 'syrup', icon: '🥜' },
    { id: 'vanilla_syrup', name: 'Syrup Vanilla', category: 'syrup', icon: '🍦' },
    
    // Juices
    { id: 'lime_juice', name: 'Nước Cốt Chanh', category: 'juice', icon: '🍋' },
    { id: 'lemon_juice', name: 'Nước Cốt Chanh Leo', category: 'juice', icon: '🍋' },
    { id: 'orange_juice', name: 'Nước Cam', category: 'juice', icon: '🍊' },
    { id: 'pineapple_juice', name: 'Nước Dứa', category: 'juice', icon: '🍍' },
    { id: 'cranberry_juice', name: 'Nước Cranberry', category: 'juice', icon: '🫐' },
    { id: 'grapefruit_juice', name: 'Nước Bưởi', category: 'juice', icon: '🍊' },
    { id: 'tomato_juice', name: 'Nước Cà Chua', category: 'juice', icon: '🍅' },
    
    // Sodas & Mixers
    { id: 'tonic', name: 'Nước Tonic', category: 'mixer', icon: '💧' },
    { id: 'soda_water', name: 'Soda', category: 'mixer', icon: '💧' },
    { id: 'ginger_beer', name: 'Ginger Beer', category: 'mixer', icon: '姜' },
    { id: 'ginger_ale', name: 'Ginger Ale', category: 'mixer', icon: '姜' },
    { id: 'coke', name: 'Coca Cola', category: 'mixer', icon: '🥤' },
    { id: 'sprite', name: 'Sprite', category: 'mixer', icon: '🥤' },
    { id: 'bitter_lemon', name: 'Bitter Lemon', category: 'mixer', icon: '🍋' },
    
    // Dairy & Eggs
    { id: 'heavy_cream', name: 'Kem Sữa', category: 'dairy', icon: '🥛' },
    { id: 'milk', name: 'Sữa', category: 'dairy', icon: '🥛' },
    { id: 'egg_white', name: 'Lòng Trắng Trứng', category: 'dairy', icon: '🥚' },
    { id: 'egg', name: 'Trứng', category: 'dairy', icon: '🥚' },
    
    // Coffee & Tea
    { id: 'coffee', name: 'Cà Phê', category: 'coffee', icon: '☕' },
    { id: 'espresso', name: 'Espresso', category: 'coffee', icon: '☕' },
    { id: 'cold_brew', name: 'Cold Brew', category: 'coffee', icon: '🧊' },
    { id: 'tea', name: 'Trà', category: 'coffee', icon: '🍵' },
    { id: 'earlgrey', name: 'Earl Grey', category: 'coffee', icon: '🍵' },
    
    // Fruits & Garnish
    { id: 'lime', name: 'Chanh Xanh', category: 'garnish', icon: '🍋' },
    { id: 'lemon', name: 'Chanh Vàng', category: 'garnish', icon: '🍋' },
    { id: 'orange', name: 'Cam', category: 'garnish', icon: '🍊' },
    { id: 'mint', name: 'Bạc Hà', category: 'garnish', icon: '🌿' },
    { id: 'basil', name: 'Húng Quế', category: 'garnish', icon: '🌿' },
    { id: 'cucumber', name: 'Dưa Leo', category: 'garnish', icon: '🥒' },
    { id: 'cherry', name: 'Anh Đào', category: 'garnish', icon: '🍒' },
    { id: 'olive', name: 'Ôliu', category: 'garnish', icon: '🫒' },
    { id: 'onion', name: 'Hành Tây', category: 'garnish', icon: '🧅' },
    
    // Other
    { id: 'salt', name: 'Muối', category: 'other', icon: '🧂' },
    { id: 'sugar', name: 'Đường', category: 'other', icon: '🍬' },
    { id: 'hot_sauce', name: 'Tương Ớt', category: 'other', icon: '🌶️' },
    { id: 'olive_oil', name: 'Dầu Ôliu', category: 'other', icon: '🫒' },
    { id: 'prosecco', name: 'Prosecco', category: 'spirit', icon: '🍾' },
    { id: 'champagne', name: 'Champagne', category: 'spirit', icon: '🍾' },
    { id: 'wine_red', name: 'Rượu Vang Đỏ', category: 'spirit', icon: '🍷' },
    { id: 'wine_white', name: 'Rượu Vang Trắng', category: 'spirit', icon: '🍾' },
];

export function useStash() {
    const { notes } = useNotes();
    const [stashIngredients, setStashIngredients] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    // Load stash từ localStorage khi mount
    useEffect(() => {
        const savedStash = localStorage.getItem('bar_stash_ingredients');
        if (savedStash) {
            try {
                setStashIngredients(JSON.parse(savedStash));
            } catch (e) {
                console.error('Error loading stash:', e);
            }
        }
        setIsLoading(false);
    }, []);
    
    // Lưu stash vào localStorage khi thay đổi
    useEffect(() => {
        if (!isLoading) {
            localStorage.setItem('bar_stash_ingredients', JSON.stringify(stashIngredients));
        }
    }, [stashIngredients, isLoading]);
    
    // Thêm nguyên liệu vào stash
    const addToStash = (ingredientId) => {
        if (!stashIngredients.includes(ingredientId)) {
            setStashIngredients(prev => [...prev, ingredientId]);
        }
    };
    
    // Xóa nguyên liệu khỏi stash
    const removeFromStash = (ingredientId) => {
        setStashIngredients(prev => prev.filter(id => id !== ingredientId));
    };
    
    // Toggle nguyên liệu trong stash
    const toggleStash = (ingredientId) => {
        if (stashIngredients.includes(ingredientId)) {
            removeFromStash(ingredientId);
        } else {
            addToStash(ingredientId);
        }
    };
    
    // Xóa tất cả nguyên liệu
    const clearStash = () => {
        setStashIngredients([]);
    };
    
    // Đề xuất công thức dựa trên nguyên liệu trong stash
    const suggestedRecipes = useMemo(() => {
        if (stashIngredients.length === 0) return [];
        
        const stashSet = new Set(stashIngredients);
        
        // Debug: log thông tin
        console.log('🔍 Debug Stash:', {
            stashIngredients: Array.from(stashSet),
            notesCount: notes.length,
            allNotes: notes.map(n => ({ title: n.title, ingredients: n.ingredients }))
        });
        
        // Tính điểm phù hợp cho mỗi công thức
        const scoredRecipes = notes.map(note => {
            if (!note.ingredients || note.ingredients.length === 0) {
                return { note, score: 0, matchCount: 0, missingCount: 0 };
            }
            
            let matchCount = 0;
            let missingCount = 0;
            
            // Keywords map cho các tên nguyên liệu khác nhau (tiếng Việt + tiếng Anh)
            const keywordsMap = {
                'vodka': ['vodka'],
                'gin': ['gin'],
                'rum': ['rum'],
                'whiskey': ['whiskey', 'whisky'],
                'bourbon': ['bourbon'],
                'tequila': ['tequila'],
                'brandy': ['brandy', 'cognac'],
                'scotch': ['scotch'],
                'lime': ['lime', 'chanh xanh', 'chanh'],
                'lemon': ['lemon', 'chanh vàng', 'chanh'],
                'orange': ['orange', 'cam'],
                'mint': ['mint', 'bạc hà'],
                'coffee': ['coffee', 'cà phê', 'café', 'ca phe'],
                'tea': ['tea', 'trà', 'tra'],
                'campari': ['campari'],
                'aperol': ['aperol'],
                'triple_sec': ['triple sec', 'cointreau', 'triple'],
                'sweet_vermouth': ['sweet vermouth', 'vermouth đỏ', 'vermouth ngọt', 'vermouth'],
                'dry_vermouth': ['dry vermouth', 'vermouth trắng', 'vermouth khô'],
                'cranberry': ['cranberry'],
                'pineapple': ['pineapple', 'dứa', 'nước dứa'],
                'grapefruit': ['grapefruit', 'bưởi', 'nước bưởi'],
                'sugar': ['sugar', 'đường', 'simple syrup', 'syrup đường'],
                'honey': ['honey', 'mật ong', 'syrup mật ong'],
                'milk': ['milk', 'sữa', 'sữa tươi', 'sữa đặc', 'condensed milk'],
                'heavy_cream': ['cream', 'whipping cream', 'kem tươi', 'kem'],
                'egg': ['egg', 'trứng'],
                'egg_white': ['egg white', 'lòng trắng', 'lòng trắng trứng'],
                'ginger_beer': ['ginger beer', 'ginger ale', 'bia gừng'],
                'tonic': ['tonic', 'nước tonic'],
                'soda_water': ['soda', 'soda water', 'nước soda'],
                'coke': ['coke', 'cola', 'coca cola', 'coca'],
                'sprite': ['sprite', '7-up', '7up'],
                'ice': ['ice', 'đá', 'da'],
                'syrup': ['syrup', 'xi rô'],
                'simple_syrup': ['simple syrup', 'đường syrup', 'syrup đường', 'đường'],
                'grenadine': ['grenadine'],
                'bitters': ['bitters', 'angostura bitters', 'orange bitters'],
            };
            
            note.ingredients.forEach(ingredient => {
                const ingredientLower = ingredient.toLowerCase().trim();
                let isMatched = false;
                
                // Kiểm tra match với COMMON_INGREDIENTS
                const matchedIngredient = COMMON_INGREDIENTS.find(ci => {
                    const ciNameLower = ci.name.toLowerCase();
                    return stashSet.has(ci.id) && (
                        ingredientLower.includes(ciNameLower) ||
                        ciNameLower.includes(ingredientLower)
                    );
                });
                
                if (matchedIngredient) {
                    isMatched = true;
                }
                
                // Kiểm tra match với keywords map
                if (!isMatched) {
                    for (const [key, values] of Object.entries(keywordsMap)) {
                        // Check if ingredient contains any keyword AND stash has that key or related
                        const hasKeyword = values.some(v => ingredientLower.includes(v.toLowerCase()));
                        if (hasKeyword) {
                            // Check if stash has the key or any related value
                            const hasInStash = stashSet.has(key) || values.some(v => stashSet.has(v));
                            if (hasInStash) {
                                isMatched = true;
                                break;
                            }
                        }
                    }
                }
                
                // Kiểm tra match với tên gốc (exact match với ingredient name)
                if (!isMatched) {
                    const directMatch = COMMON_INGREDIENTS.find(ci => 
                        stashSet.has(ci.id) && 
                        ci.name.toLowerCase() === ingredientLower
                    );
                    if (directMatch) {
                        isMatched = true;
                    }
                }
                
                if (isMatched) {
                    matchCount++;
                } else {
                    missingCount++;
                }
            });
            
            // Tính điểm: ưu tiên công thức có nhiều nguyên liệu phù hợp và ít nguyên liệu còn thiếu
            const totalIngredients = note.ingredients.length;
            const matchRatio = matchCount / totalIngredients;
            const score = matchCount > 0 ? (matchRatio * 100) + (matchCount * 10) - (missingCount * 5) : 0;
            
            return { note, score, matchCount, missingCount };
        });
        
        // Lọc và sắp xếp theo điểm
        return scoredRecipes
            .filter(r => r.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 6); // Lấy top 6 công thức phù hợp nhất
    }, [notes, stashIngredients]);
    
    return {
        stashIngredients,
        isLoading,
        addToStash,
        removeFromStash,
        toggleStash,
        clearStash,
        suggestedRecipes,
        COMMON_INGREDIENTS
    };
}
