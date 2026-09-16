/**
 * Mock data for development when Supabase is not connected
 */
export const mockNotes = [
    {
        id: '1',
        title: 'Cocktail Negroni',
        category: 'cocktail',
        ingredients: ['Gin', 'Campari', 'Sweet Vermouth'],
        instructions: 'Stir all ingredients with ice. Strain into rocks glass.',
        rating: 5,
        created_at: new Date().toISOString()
    },
    {
        id: '2',
        title: 'Cà Phê Sữa Đá',
        category: 'coffee',
        ingredients: ['Cà phê', 'Sữa đặc', 'Đá'],
        instructions: 'Pha cà phê, thêm sữa đặc, cho đá vào.',
        rating: 4,
        created_at: new Date().toISOString()
    },
    {
        id: '3',
        title: 'Trà Đá',
        category: 'drink',
        ingredients: ['Trà', 'Đá'],
        instructions: 'Hãm trà, cho đá vào.',
        rating: 3,
        created_at: new Date().toISOString()
    }
];

export const mockCategories = [
    { id: 'all', name: 'Tất cả', icon: '🍹' },
    { id: 'cocktail', name: 'Cocktail', icon: '🍸' },
    { id: 'coffee', name: 'Cà phê', icon: '☕' },
    { id: 'tea', name: 'Trà', icon: '🍵' },
    { id: 'juice', name: 'Nước ép', icon: '🧃' }
];
