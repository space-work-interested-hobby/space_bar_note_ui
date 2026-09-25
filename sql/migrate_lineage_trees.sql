-- ============================================================
-- LINEAGE TREES DATA - Cây Phả Hệ Cocktail Kinh Điển
-- ============================================================
-- 4 dòng cocktail chính: Old Fashioned, Negroni, Sour, Highball
-- Mỗi dòng gồm: Root → Riffs → Modern → Crown
-- ============================================================

-- ============================================================
-- OLD FASHIONED FAMILY
-- ============================================================

-- Root: Classic Old Fashioned (1884)
INSERT INTO public.notes (id, category, difficulty, time_minutes, servings, author_id, author_name, is_published, rating, review_count, tags, flavor_bitter, flavor_sweet, flavor_sour, flavor_salty, flavor_umami, flavor_strength, abv, story_json)
VALUES (
  '50000000-0000-0000-0000-000000000001', 
  'cocktail', 'easy', 5, 1, 
  '00000000-0000-0000-0000-000000000001', 
  'Head Bartender Alex', 
  true, 5, 89, 
  ARRAY['classic', 'whiskey', 'spirit-forward', 'old-fashioned'],
  3, 4, 1, 0, 1, 4, 34,
  '{"origin": "Pendennis Club, Louisville & Jerry Thomas Compendium", "year": 1884, "ratio": "60ml Rye/Bourbon, 1 viên đường mía, 2 dashes Angostura Bitters, tinh dầu cam"}'::jsonb
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.note_translations (note_id, language, title, description, author_story)
VALUES (
  '50000000-0000-0000-0000-000000000001', 
  'vi', 
  'Classic Whiskey Old Fashioned',
  'Công thức gốc từ Pendennis Club, Louisville năm 1884. Được ghi nhận trong Jerry Thomas Compendium như "whiskey cock-tail" đầu tiên.',
  'Câu chuyện bắt đầu tại Pendennis Club, Louisville, Kentucky năm 1884 khi một vị khách yêu cầu bartender pha một cocktail "old fashioned" (theo cách cũ). Đây là khởi nguồn của tên gọi Old Fashioned.'
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.note_ingredients (note_id, name, amount, amount_value, unit, sort_order, amount_ml)
VALUES 
  ('50000000-0000-0000-0000-000000000001', 'Rye hoặc Bourbon', '60ml', 60, 'ml', 1, 60),
  ('50000000-0000-0000-0000-000000000001', 'Đường mía viên', '1 viên', 1, 'viên', 2, NULL),
  ('50000000-0000-0000-0000-000000000001', 'Angostura Bitters', '2 dashes', 2, 'dashes', 3, 2),
  ('50000000-0000-0000-0000-000000000001', 'Vỏ cam tươi', '1 miếng', NULL, NULL, 4, NULL)
ON CONFLICT (id) DO NOTHING;

-- Riff 1: Boulevardier (1927)
INSERT INTO public.notes (id, category, difficulty, time_minutes, servings, author_id, author_name, is_published, rating, review_count, tags, parent_recipe_id, parent_recipe_name, flavor_bitter, flavor_sweet, flavor_sour, flavor_salty, flavor_umami, flavor_strength, abv, is_remix, remix_note, story_json)
VALUES (
  '50000000-0000-0000-0000-000000000002', 
  'cocktail', 'medium', 5, 1, 
  '00000000-0000-0000-0000-000000000001', 
  'Head Bartender Alex', 
  true, 4.8, 45, 
  ARRAY['classic', 'bourbon', 'bitter', 'paris'],
  '50000000-0000-0000-0000-000000000001',
  'Classic Whiskey Old Fashioned',
  4, 3, 1, 0, 1, 4, 30,
  true,
  'Hoán vị cấu trúc Old Fashioned bằng việc phối trộn Sweet Vermouth & Campari',
  '{"origin": "Harry''s New York Bar, Paris", "year": 1927, "era": "Cấm Rượu", "branch": "Nhánh Paris Riff", "ratio": "45ml Bourbon + 30ml Sweet Vermouth + 30ml Campari"}'::jsonb
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.note_translations (note_id, language, title, description, author_story)
VALUES (
  '50000000-0000-0000-0000-000000000002', 
  'vi', 
  'Boulevardier',
  'Erskine Gwynne sáng tạo tại Harry''s New York Bar, Paris năm 1927. Hoán vị cấu trúc Old Fashioned bằng việc phối trộn Sweet Vermouth & Campari.',
  'Erskine Gwynne, một quý tộc Mỹ sống ở Paris, muốn uống một phiên bản mạnh mẽ hơn của Negroni. Anh thay thế gin bằng bourbon và đặt tên theo tên tạp chí của mình - Boulevardier.'
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.note_ingredients (note_id, name, amount, amount_value, unit, sort_order, amount_ml)
VALUES 
  ('50000000-0000-0000-0000-000000000002', 'Bourbon', '45ml', 45, 'ml', 1, 45),
  ('50000000-0000-0000-0000-000000000002', 'Sweet Vermouth', '30ml', 30, 'ml', 2, 30),
  ('50000000-0000-0000-0000-000000000002', 'Campari', '30ml', 30, 'ml', 3, 30),
  ('50000000-0000-0000-0000-000000000002', 'Vỏ cam', '1 miếng', NULL, NULL, 4, NULL)
ON CONFLICT (id) DO NOTHING;

-- Riff 2: Vieux Carré (1938)
INSERT INTO public.notes (id, category, difficulty, time_minutes, servings, author_id, author_name, is_published, rating, review_count, tags, parent_recipe_id, parent_recipe_name, flavor_bitter, flavor_sweet, flavor_sour, flavor_salty, flavor_umami, flavor_strength, abv, is_remix, story_json)
VALUES (
  '50000000-0000-0000-0000-000000000003', 
  'cocktail', 'medium', 7, 1, 
  '00000000-0000-0000-0000-000000000001', 
  'Head Bartender Alex', 
  true, 4.6, 28, 
  ARRAY['classic', 'creole', 'complex', 'new-orleans'],
  '50000000-0000-0000-0000-000000000001',
  'Classic Whiskey Old Fashioned',
  3, 4, 1, 0, 2, 4, 32,
  true,
  '{"origin": "Hotel Monteleone, New Orleans", "year": 1938, "era": "Hậu Cấm Rượu", "branch": "Nhánh Creole", "ratio": "30ml Rye + 30ml Cognac + 30ml Sweet Vermouth + Barspoon Bénédictine"}'::jsonb
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.note_translations (note_id, language, title, description, author_story)
VALUES (
  '50000000-0000-0000-0000-000000000003', 
  'vi', 
  'Vieux Carré',
  'Walter Bergeron sáng tạo tại Hotel Monteleone, New Orleans năm 1938. Cấu trúc phức hợp kết hợp Rye Whiskey với Cognac và rượu thảo mộc Bénédictine.',
  'Tên "Vieux Carré" (quảng trường cũ) đặt theo một khu phố Pháp ở New Orleans. Đây là cocktail kỷ niệm sự giao thoa văn hóa Pháp-Mỹ tại thành phố này.'
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.note_ingredients (note_id, name, amount, amount_value, unit, sort_order, amount_ml)
VALUES 
  ('50000000-0000-0000-0000-000000000003', 'Rye Whiskey', '30ml', 30, 'ml', 1, 30),
  ('50000000-0000-0000-0000-000000000003', 'Cognac', '30ml', 30, 'ml', 2, 30),
  ('50000000-0000-0000-0000-000000000003', 'Sweet Vermouth', '30ml', 30, 'ml', 3, 30),
  ('50000000-0000-0000-0000-000000000003', 'Bénédictine', '1 barspoon', 1, 'barspoon', 4, 5),
  ('50000000-0000-0000-0000-000000000003', 'Angostura Bitters', '1 dash', 1, 'dash', 5, 1),
  ('50000000-0000-0000-0000-000000000003', 'Peychaud''s Bitters', '1 dash', 1, 'dash', 6, 1)
ON CONFLICT (id) DO NOTHING;

-- Riff 3: Sazerac (1890)
INSERT INTO public.notes (id, category, difficulty, time_minutes, servings, author_id, author_name, is_published, rating, review_count, tags, parent_recipe_id, parent_recipe_name, flavor_bitter, flavor_sweet, flavor_sour, flavor_salty, flavor_umami, flavor_strength, abv, is_remix, story_json)
VALUES (
  '50000000-0000-0000-0000-000000000004', 
  'cocktail', 'medium', 5, 1, 
  '00000000-0000-0000-0000-000000000001', 
  'Head Bartender Alex', 
  true, 4.9, 62, 
  ARRAY['classic', 'absinthe', 'new-orleans', 'herbal'],
  '50000000-0000-0000-0000-000000000001',
  'Classic Whiskey Old Fashioned',
  3, 3, 1, 0, 2, 5, 36,
  true,
  '{"origin": "Sazerac House, New Orleans", "year": 1890, "era": "Tiền Cấm Rượu", "branch": "Nhánh Absinthe", "ratio": "60ml Rye + Tráng ly Absinthe + Đường viên + Peychaud''s Bitters"}'::jsonb
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.note_translations (note_id, language, title, description, author_story)
VALUES (
  '50000000-0000-0000-0000-000000000004', 
  'vi', 
  'Sazerac',
  'Biểu tượng huyền thoại New Orleans: Thay thế ly ướp lạnh tráng rượu Absinthe Herbsaint sắc sảo kết hợp Peychaud''s Bitters.',
  'Sazerac được coi là cocktail lâu đời nhất nước Mỹ. Antoine Amédée Peychaud phục vụ cocktail trong chén phễu (coquetier) - từ đó phát sinh từ "cocktail".'
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.note_ingredients (note_id, name, amount, amount_value, unit, sort_order, amount_ml)
VALUES 
  ('50000000-0000-0000-0000-000000000004', 'Rye Whiskey', '60ml', 60, 'ml', 1, 60),
  ('50000000-0000-0000-0000-000000000004', 'Absinthe ( Herbsaint)', 'Tráng ly', NULL, NULL, 2, 5),
  ('50000000-0000-0000-0000-000000000004', 'Đường viên', '1 viên', 1, 'viên', 3, NULL),
  ('50000000-0000-0000-0000-000000000004', 'Peychaud''s Bitters', '3 dashes', 3, 'dashes', 4, 3)
ON CONFLICT (id) DO NOTHING;

-- Modern 1: Left Hand Cocktail (2008)
INSERT INTO public.notes (id, category, difficulty, time_minutes, servings, author_id, author_name, is_published, rating, review_count, tags, parent_recipe_id, parent_recipe_name, flavor_bitter, flavor_sweet, flavor_sour, flavor_salty, flavor_umami, flavor_strength, abv, is_remix, story_json)
VALUES (
  '50000000-0000-0000-0000-000000000005', 
  'cocktail', 'medium', 5, 1, 
  '00000000-0000-0000-0000-000000000001', 
  'Head Bartender Alex', 
  true, 4.7, 34, 
  ARRAY['modern', 'boulevardier', 'chocolate', 'nyc-craft'],
  '50000000-0000-0000-0000-000000000002',
  'Boulevardier',
  5, 3, 1, 0, 1, 4, 31,
  true,
  '{"origin": "Milk & Honey, NYC", "year": 2008, "era": "NYC Craft", "branch": "Boulevardier →", "description": "Sam Ross đột biến thêm nốt đắng béo của Chocolate Mole Bitters"}'::jsonb
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.note_translations (note_id, language, title, description, author_story)
VALUES (
  '50000000-0000-0000-0000-000000000005', 
  'vi', 
  'Left Hand Cocktail',
  'Sam Ross (Milk & Honey, NYC) đột biến thêm nốt đắng béo của Chocolate Mole Bitters vào bộ khung Boulevardier cổ điển.',
  'Tên gọi "Left Hand" bắt nguồn từ thành phố Milwaukee - thủ phủ của Miller Brewing. Phiên bản này được đặt tên theo "Left Hand" Kolsch-style beer.'
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.note_ingredients (note_id, name, amount, amount_value, unit, sort_order, amount_ml)
VALUES 
  ('50000000-0000-0000-0000-000000000005', 'Bourbon', '45ml', 45, 'ml', 1, 45),
  ('50000000-0000-0000-0000-000000000005', 'Campari', '30ml', 30, 'ml', 2, 30),
  ('50000000-0000-0000-0000-000000000005', 'Sweet Vermouth', '30ml', 30, 'ml', 3, 30),
  ('50000000-0000-0000-0000-000000000005', 'Xocolatl Mole Bitters', '3 dashes', 3, 'dashes', 4, 3)
ON CONFLICT (id) DO NOTHING;

-- Modern 2: Oaxaca Old Fashioned (2007)
INSERT INTO public.notes (id, category, difficulty, time_minutes, servings, author_id, author_name, is_published, rating, review_count, tags, parent_recipe_id, parent_recipe_name, flavor_bitter, flavor_sweet, flavor_sour, flavor_salty, flavor_umami, flavor_strength, abv, is_remix, story_json)
VALUES (
  '50000000-0000-0000-0000-000000000006', 
  'cocktail', 'medium', 5, 1, 
  '00000000-0000-0000-0000-000000000001', 
  'Head Bartender Alex', 
  true, 4.9, 78, 
  ARRAY['modern', 'tequila', 'mezcal', 'agave', 'death-and-co'],
  '50000000-0000-0000-0000-000000000001',
  'Classic Whiskey Old Fashioned',
  2, 4, 1, 0, 1, 5, 32,
  true,
  '{"origin": "Death & Co, NYC", "year": 2007, "era": "Craft Revival", "branch": "Root →", "description": "Phil Ward cách mạng Agave thay thế Whiskey"}'::jsonb
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.note_translations (note_id, language, title, description, author_story)
VALUES (
  '50000000-0000-0000-0000-000000000006', 
  'vi', 
  'Oaxaca Old Fashioned',
  'Phil Ward (Death & Co, NYC) cách mạng Agave thay thế Whiskey: Cân bằng Reposado Tequila kết hợp Mezcal khói và Agave Nectar.',
  'Phil Ward muốn tạo một Old Fashioned phù hợp với văn hóa Mexico. Anh thay thế whiskey bằng mezcal - loại rượu từ agave - và thêm agave nectar thay vì đường.'
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.note_ingredients (note_id, name, amount, amount_value, unit, sort_order, amount_ml)
VALUES 
  ('50000000-0000-0000-0000-000000000006', 'Reposado Tequila', '45ml', 45, 'ml', 1, 45),
  ('50000000-0000-0000-0000-000000000006', 'Mezcal', '15ml', 15, 'ml', 2, 15),
  ('50000000-0000-0000-0000-000000000006', 'Agave Nectar', '1 barspoon', 1, 'barspoon', 3, 5),
  ('50000000-0000-0000-0000-000000000006', 'Angostura Bitters', '2 dashes', 2, 'dashes', 4, 2),
  ('50000000-0000-0000-0000-000000000006', 'Vỏ cam', '1 miếng', NULL, NULL, 5, NULL)
ON CONFLICT (id) DO NOTHING;

-- Crown: Midnight Saffron Boulevardier (2025)
INSERT INTO public.notes (id, category, difficulty, time_minutes, servings, author_id, author_name, is_published, is_featured, rating, review_count, tags, parent_recipe_id, parent_recipe_name, flavor_bitter, flavor_sweet, flavor_sour, flavor_salty, flavor_umami, flavor_strength, abv, is_remix, story_json)
VALUES (
  '50000000-0000-0000-0000-000000000007', 
  'cocktail', 'hard', 15, 1, 
  '00000000-0000-0000-0000-000000000001', 
  'Head Bartender Alex', 
  true, true, 5, 12, 
  ARRAY['atelier', 'saffron', 'fat-wash', 'premium'],
  '50000000-0000-0000-0000-000000000002',
  'Boulevardier',
  5, 4, 1, 0, 1, 5, 27.5,
  true,
  '{"code": "#ARC-8942", "era": "Atelier Đương Đại", "year": 2025, "description": "Kỹ thuật Saffron Fat-wash trên nền Rye 100 Proof, kết hợp Campari xông gỗ táo và Sweet Vermouth ủ thảo mộc vùng Turin."}'::jsonb
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.note_translations (note_id, language, title, description, author_story)
VALUES (
  '50000000-0000-0000-0000-000000000007', 
  'vi', 
  'Midnight Saffron Boulevardier',
  'Sáng tạo độc quyền tại trạm bar: Kỹ thuật Saffron Fat-wash trên nền Rye 100 Proof, kết hợp Campari xông gỗ táo và Sweet Vermouth ủ thảo mộc vùng Turin.',
  'Mùa thu 2025, trong phòng thí nghiệm cocktail của Head Bartender Alex, một công thức đột phá ra đời: kết hợp kỹ thuật fat-wash với saffron nhụy nghệ tây cao cấp Iran, tạo nên một ly cocktail như bức tranh hoàng hôn.'
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.note_ingredients (note_id, name, amount, amount_value, unit, sort_order, amount_ml)
VALUES 
  ('50000000-0000-0000-0000-000000000007', 'Saffron Washed Rye 100°', '40ml', 40, 'ml', 1, 40),
  ('50000000-0000-0000-0000-000000000007', 'Sweet Vermouth Torino', '30ml', 30, 'ml', 2, 30),
  ('50000000-0000-0000-0000-000000000007', 'Campari Applewood Infused', '30ml', 30, 'ml', 3, 30),
  ('50000000-0000-0000-0000-000000000007', 'Saffron strands', '2 sợi', NULL, NULL, 4, NULL),
  ('50000000-0000-0000-0000-000000000007', 'Khối đá tinh khiết 50mm', '1 viên', NULL, NULL, 5, NULL)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- NEGRONI FAMILY
-- ============================================================

-- Root: Classic Negroni (1919)
INSERT INTO public.notes (id, category, difficulty, time_minutes, servings, author_id, author_name, is_published, rating, review_count, tags, flavor_bitter, flavor_sweet, flavor_sour, flavor_salty, flavor_umami, flavor_strength, abv, story_json)
VALUES (
  '50000001-0000-0000-0000-000000000001', 
  'cocktail', 'easy', 3, 1, 
  '00000000-0000-0000-0000-000000000001', 
  'Head Bartender Alex', 
  true, 5, 124, 
  ARRAY['classic', 'italian', 'bitter', 'gin'],
  5, 2, 1, 0, 1, 5, 28,
  '{"origin": "Caffè Casoni, Florence", "year": 1919, "ratio": "30ml Gin + 30ml Sweet Vermouth + 30ml Campari"}'::jsonb
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.note_translations (note_id, language, title, description, author_story)
VALUES (
  '50000001-0000-0000-0000-000000000001', 
  'vi', 
  'Classic Negroni',
  'Count Camillo Negroni yêu cầu bartender pha thêm gin vào Americano tại Caffè Casoni, Florence năm 1919. Một thế kỷ sau, Negroni vẫn là một trong những cocktail được yêu thích nhất thế giới.',
  'Count Camillo Negroni, một quý tộc Ý từ Florence, thường xuyên uống Americano (Campari + Vermouth + soda) tại Caffè Casoni. Một ngày, ông yêu cầu bartender thay soda bằng gin để được "mạnh hơn".'
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.note_ingredients (note_id, name, amount, amount_value, unit, sort_order, amount_ml)
VALUES 
  ('50000001-0000-0000-0000-000000000001', 'Gin', '30ml', 30, 'ml', 1, 30),
  ('50000001-0000-0000-0000-000000000001', 'Campari', '30ml', 30, 'ml', 2, 30),
  ('50000001-0000-0000-0000-000000000001', 'Sweet Vermouth', '30ml', 30, 'ml', 3, 30)
ON CONFLICT (id) DO NOTHING;

-- Riff: Negroni Sbagliato (1972)
INSERT INTO public.notes (id, category, difficulty, time_minutes, servings, author_id, author_name, is_published, rating, review_count, tags, parent_recipe_id, parent_recipe_name, flavor_bitter, flavor_sweet, flavor_sour, flavor_salty, flavor_umami, flavor_strength, abv, is_remix, story_json)
VALUES (
  '50000001-0000-0000-0000-000000000002', 
  'cocktail', 'easy', 3, 1, 
  '00000000-0000-0000-0000-000000000001', 
  'Head Bartender Alex', 
  true, 4.7, 89, 
  ARRAY['classic', 'italian', 'sparkling', 'viral'],
  '50000001-0000-0000-0000-000000000001',
  'Classic Negroni',
  3, 4, 2, 0, 1, 3, 12,
  true,
  '{"origin": "B Checker Bar, Milan", "year": 1972, "era": "Hậu Negroni", "branch": "Nhánh Ý", "ratio": "30ml Prosecco + 30ml Sweet Vermouth + 30ml Campari"}'::jsonb
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.note_translations (note_id, language, title, description, author_story)
VALUES (
  '50000001-0000-0000-0000-000000000002', 
  'vi', 
  'Negroni Sbagliato',
  'Mario Mihajlov (B Checker, Milan) nhầm lẫn thần kỳ: Prosecco thay Gin tạo nên phiên bản long mình, effervescent. Viral sensation 2022.',
  'Sbagliato nghĩa là "sai lầm" trong tiếng Ý. Năm 2022, Negroni Sbagliato bất ngờ viral trên mạng xã hội sau khi một bartender đăng video pha chế, thu hút hàng triệu lượt xem.'
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.note_ingredients (note_id, name, amount, amount_value, unit, sort_order, amount_ml)
VALUES 
  ('50000001-0000-0000-0000-000000000002', 'Prosecco', '30ml', 30, 'ml', 1, 30),
  ('50000001-0000-0000-0000-000000000002', 'Sweet Vermouth', '30ml', 30, 'ml', 2, 30),
  ('50000001-0000-0000-0000-000000000002', 'Campari', '30ml', 30, 'ml', 3, 30),
  ('50000001-0000-0000-0000-000000000002', 'Vỏ cam', '1 miếng', NULL, NULL, 4, NULL)
ON CONFLICT (id) DO NOTHING;

-- Modern: White Negroni (2001)
INSERT INTO public.notes (id, category, difficulty, time_minutes, servings, author_id, author_name, is_published, rating, review_count, tags, parent_recipe_id, parent_recipe_name, flavor_bitter, flavor_sweet, flavor_sour, flavor_salty, flavor_umami, flavor_strength, abv, is_remix, story_json)
VALUES (
  '50000001-0000-0000-0000-000000000003', 
  'cocktail', 'easy', 3, 1, 
  '00000000-0000-0000-0000-000000000001', 
  'Head Bartender Alex', 
  true, 4.5, 34, 
  ARRAY['modern', 'bitter', 'herbal', 'light'],
  '50000001-0000-0000-0000-000000000001',
  'Classic Negroni',
  3, 2, 1, 0, 2, 3, 22,
  true,
  '{"origin": '''' Torino', "year": 2001, "era": "Modern", "branch": "Nhánh Trắng", "ratio": "Gin + Lillet Blanc + Suze + Vỏ chanh"}'::jsonb
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.note_translations (note_id, language, title, description, author_story)
VALUES (
  '50000001-0000-0000-0000-000000000003', 
  'vi', 
  'White Negroni',
  'Antonio Sperone (Turin) bitter mềm hơn: Lillet Blanc thay Sweet Vermouth, Suze thay Campari tạo nốt thảo mộc đất.',
  'White Negroni là phiên bản "nhẹ" của Negroni, với màu sắc trong veo và hương vị thảo mộc đặc trưng từ Suze - một loại rượu bitter từ rễ cây gentian.'
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.note_ingredients (note_id, name, amount, amount_value, unit, sort_order, amount_ml)
VALUES 
  ('50000001-0000-0000-0000-000000000003', 'London Dry Gin', '30ml', 30, 'ml', 1, 30),
  ('50000001-0000-0000-0000-000000000003', 'Lillet Blanc', '30ml', 30, 'ml', 2, 30),
  ('50000001-0000-0000-0000-000000000003', 'Suze', '30ml', 30, 'ml', 3, 30),
  ('50000001-0000-0000-0000-000000000003', 'Vỏ chanh', '1 miếng', NULL, NULL, 4, NULL)
ON CONFLICT (id) DO NOTHING;

-- Crown: Charred Cedar Negroni (2025)
INSERT INTO public.notes (id, category, difficulty, time_minutes, servings, author_id, author_name, is_published, is_featured, rating, review_count, tags, parent_recipe_id, parent_recipe_name, flavor_bitter, flavor_sweet, flavor_sour, flavor_salty, flavor_umami, flavor_strength, abv, is_remix, story_json)
VALUES (
  '50000001-0000-0000-0000-000000000004', 
  'cocktail', 'hard', 10, 1, 
  '00000000-0000-0000-0000-000000000001', 
  'Head Bartender Alex', 
  true, true, 5, 8, 
  ARRAY['atelier', 'smoky', 'cedar', 'premium'],
  '50000001-0000-0000-0000-000000000001',
  'Classic Negroni',
  5, 2, 1, 0, 1, 5, 30,
  true,
  '{"code": "#ARC-7741", "era": "Atelier Đương Đại", "year": 2025, "description": "Charred Cedar fat-wash trên Gin London Dry, Campari smoked trên vỏ cam nướng, với thanh chocolate đắng 85%."}'::jsonb
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.note_translations (note_id, language, title, description, author_story)
VALUES (
  '50000001-0000-0000-0000-000000000004', 
  'vi', 
  'Charred Cedar Negroni',
  'Sáng tạo độc quyền: Charred Cedar fat-wash trên Gin London Dry, Campari smoked trên vỏ cam nướng, với thanh chocolate đắng 85% đặt trên đá.',
  'Sự kết hợp giữa gỗ tuyết tùng nướng (charred cedar) và chocolate đắng tạo nên một trải nghiệm sensory độc đáo: khói, đắng, ngọt hòa quyện trong một ly Negroni.'
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.note_ingredients (note_id, name, amount, amount_value, unit, sort_order, amount_ml)
VALUES 
  ('50000001-0000-0000-0000-000000000004', 'Cedar Washed Gin', '35ml', 35, 'ml', 1, 35),
  ('50000001-0000-0000-0000-000000000004', 'Sweet Vermouth', '30ml', 30, 'ml', 2, 30),
  ('50000001-0000-0000-0000-000000000004', 'Smoked Campari', '30ml', 30, 'ml', 3, 30),
  ('50000001-0000-0000-0000-000000000004', 'Dark Chocolate 85%', '1 miếng nhỏ', NULL, NULL, 4, NULL),
  ('50000001-0000-0000-0000-000000000004', 'Khối đá whiskey', '1 viên', NULL, NULL, 5, NULL)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- SOUR FAMILY
-- ============================================================

-- Root: Whiskey Sour (1872)
INSERT INTO public.notes (id, category, difficulty, time_minutes, servings, author_id, author_name, is_published, rating, review_count, tags, flavor_bitter, flavor_sweet, flavor_sour, flavor_salty, flavor_umami, flavor_strength, abv, story_json)
VALUES (
  '50000002-0000-0000-0000-000000000001', 
  'cocktail', 'medium', 5, 1, 
  '00000000-0000-0000-0000-000000000001', 
  'Head Bartender Alex', 
  true, 4.7, 67, 
  ARRAY['classic', 'sour', 'citrus', 'egg-white'],
  2, 4, 5, 0, 1, 3, 30,
  '{"origin": "Jerry Thomas, How to Mix Drinks", "year": 1872, "era": "Post-Civil War", "ratio": "60ml Whiskey + 30ml Lemon juice + 15ml Simple syrup + 1 Egg white (tùy chọn)"}'::jsonb
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.note_translations (note_id, language, title, description, author_story)
VALUES (
  '50000002-0000-0000-0000-000000000001', 
  'vi', 
  'Whiskey Sour',
  'Jerry Thomas ghi nhận năm 1872 trong How to Mix Drinks. Phiên bản gốc có cả lòng trắng trứng tạo foam mịn.',
  'Jerry Thomas, "Father of American Mixology", sáng tạo Whiskey Sour như một cách để làm whiskey dễ uống hơn. Ông sử dụng lemon và sugar để cân bằng vị whiskey.'
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.note_ingredients (note_id, name, amount, amount_value, unit, sort_order, amount_ml)
VALUES 
  ('50000002-0000-0000-0000-000000000001', 'Bourbon', '60ml', 60, 'ml', 1, 60),
  ('50000002-0000-0000-0000-000000000001', 'Nước cốt chanh tươi', '30ml', 30, 'ml', 2, 30),
  ('50000002-0000-0000-0000-000000000001', 'Simple syrup 2:1', '15ml', 15, 'ml', 3, 15),
  ('50000002-0000-0000-0000-000000000001', 'Lòng trắng trứng', '1 cái', NULL, NULL, 4, NULL),
  ('50000002-0000-0000-0000-000000000001', 'Angostura Bitters', '2 dashes', 2, 'dashes', 5, 2)
ON CONFLICT (id) DO NOTHING;

-- Riff: Daiquiri (1896)
INSERT INTO public.notes (id, category, difficulty, time_minutes, servings, author_id, author_name, is_published, rating, review_count, tags, parent_recipe_id, parent_recipe_name, flavor_bitter, flavor_sweet, flavor_sour, flavor_salty, flavor_umami, flavor_strength, abv, is_remix, story_json)
VALUES (
  '50000002-0000-0000-0000-000000000002', 
  'cocktail', 'easy', 3, 1, 
  '00000000-0000-0000-0000-000000000001', 
  'Head Bartender Alex', 
  true, 4.8, 98, 
  ARRAY['classic', 'cuban', 'rum', 'citrus'],
  '50000002-0000-0000-0000-000000000001',
  'Whiskey Sour',
  1, 4, 4, 0, 1, 3, 32,
  true,
  '{"origin": "Daiquiri, Cuba", "year": 1896, "era": "Tiền Cấm Rượu", "branch": "Nhánh Cuba", "ratio": "60ml White Rum + 30ml Lime juice + 20ml Simple syrup 2:1"}'::jsonb
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.note_translations (note_id, language, title, description, author_story)
VALUES (
  '50000002-0000-0000-0000-000000000002', 
  'vi', 
  'Daiquiri',
  'Jennings Cox sáng tạo tại Daiquiri, Cuba năm 1896. Biến tấu Rum với lime tươi và đường nghiền — nền tảng của tất cả Sour.',
  'Jennings Cox, một kỹ sư Mỹ làm việc tại mỏ sắt Daiquiri, Cuba, sáng tạo cocktail này để giải khát trong thời tiết nhiệt đới. Ông sử dụng lime thay vì lemon vì lime phổ biến hơn ở Cuba.'
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.note_ingredients (note_id, name, amount, amount_value, unit, sort_order, amount_ml)
VALUES 
  ('50000002-0000-0000-0000-000000000002', 'White Rum', '60ml', 60, 'ml', 1, 60),
  ('50000002-0000-0000-0000-000000000002', 'Nước cốt lime tươi', '30ml', 30, 'ml', 2, 30),
  ('50000002-0000-0000-0000-000000000002', 'Simple syrup 2:1', '20ml', 20, 'ml', 3, 20)
ON CONFLICT (id) DO NOTHING;

-- Modern: Clarified Milk Punch (2013)
INSERT INTO public.notes (id, category, difficulty, time_minutes, servings, author_id, author_name, is_published, rating, review_count, tags, parent_recipe_id, parent_recipe_name, flavor_bitter, flavor_sweet, flavor_sour, flavor_salty, flavor_umami, flavor_strength, abv, is_remix, story_json)
VALUES (
  '50000002-0000-0000-0000-000000000003', 
  'cocktail', 'hard', 60, 4, 
  '00000000-0000-0000-0000-000000000001', 
  'Head Bartender Alex', 
  true, 4.9, 45, 
  ARRAY['modern', 'clarified', 'milk-punch', 'laboratory'],
  '50000002-0000-0000-0000-000000000002',
  'Daiquiri',
  1, 5, 2, 0, 1, 3, 18,
  true,
  '{"origin": "Booker & Dax, NYC", "year": 2013, "era": "Modern", "branch": "Daiquiri →", "description": "Dave Arnold sáng tạo kỹ thuật đục sữa và lọc trong - tạo màu sữa mịn nhưng vị trong vắt"}'::jsonb
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.note_translations (note_id, language, title, description, author_story)
VALUES (
  '50000002-0000-0000-0000-000000000003', 
  'vi', 
  'Clarified Milk Punch',
  'Dave Arnold (Booker & Dax, NYC) đục sữa và lọc trong — tạo màu sữa mịn đục nhưng vị trong vắt, không foam. Cần chuẩn bị 24-48 giờ.',
  'Dave Arnold sử dụng kiến thức hóa học để giải thích hiện tượng: sữa đông (curdle) khi gặp axit citric, tạo cặn protein hấp thụ màu và hương. Lọc bỏ cặn = trong vắt nhưng giữ hương vị.'
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.note_ingredients (note_id, name, amount, amount_value, unit, sort_order, amount_ml)
VALUES 
  ('50000002-0000-0000-0000-000000000003', 'Rhum Clément', '180ml', 180, 'ml', 1, 180),
  ('50000002-0000-0000-0000-000000000003', 'Nước cốt chanh tươi', '90ml', 90, 'ml', 2, 90),
  ('50000002-0000-0000-0000-000000000003', 'Demerara syrup', '60ml', 60, 'ml', 3, 60),
  ('50000002-0000-0000-0000-000000000003', 'Sữa tươi nguyên chất', '120ml', 120, 'ml', 4, 120)
ON CONFLICT (id) DO NOTHING;

-- Crown: Yuzu Cloud Sour (2025)
INSERT INTO public.notes (id, category, difficulty, time_minutes, servings, author_id, author_name, is_published, is_featured, rating, review_count, tags, parent_recipe_id, parent_recipe_name, flavor_bitter, flavor_sweet, flavor_sour, flavor_salty, flavor_umami, flavor_strength, abv, is_remix, story_json)
VALUES (
  '50000002-0000-0000-0000-000000000004', 
  'cocktail', 'hard', 20, 1, 
  '00000000-0000-0000-0000-000000000001', 
  'Head Bartender Alex', 
  true, true, 5, 15, 
  ARRAY['atelier', 'yuzu', 'japanese', 'cloud'],
  '50000002-0000-0000-0000-000000000001',
  'Whiskey Sour',
  1, 4, 5, 0, 1, 3, 22,
  true,
  '{"code": "#ARC-6612", "era": "Atelier Đương Đại", "year": 2025, "description": "Gelatin foam Yuzu với texture cloud-mousse, Whiskey bourbon giảm ABV còn 22% bằng citrus sparkling water, hoa elderflower essence."}'::jsonb
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.note_translations (note_id, language, title, description, author_story)
VALUES (
  '50000002-0000-0000-0000-000000000004', 
  'vi', 
  'Yuzu Cloud Sour',
  'Gelatin foam Yuzu với texture cloud-mousse, Whiskey bourbon giảm ABV còn 22% bằng citrus sparkling water, hoa elderflower essence.',
  'Sự kết hợp giữa bourbon Mỹ và yuzu Nhật Bản tạo nên một ly cocktail mang đậm dấu ấn Á-Âu: ấm áp của whiskey, tươi mát của citrus Nhật, và mịn màng của foam.'
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.note_ingredients (note_id, name, amount, amount_value, unit, sort_order, amount_ml)
VALUES 
  ('50000002-0000-0000-0000-000000000004', 'Bourbon Whiskey', '35ml', 35, 'ml', 1, 35),
  ('50000002-0000-0000-0000-000000000004', 'Yuzu juice', '20ml', 20, 'ml', 2, 20),
  ('50000002-0000-0000-0000-000000000004', 'Elderflower syrup', '10ml', 10, 'ml', 3, 10),
  ('50000002-0000-0000-0000-000000000004', 'Citrus sparkling water', '40ml', 40, 'ml', 4, 40),
  ('50000002-0000-0000-0000-000000000004', 'Yuzu foam', '1 lớp', NULL, NULL, 5, NULL)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- HIGHBALL FAMILY
-- ============================================================

-- Root: Whisky Highball (1900)
INSERT INTO public.notes (id, category, difficulty, time_minutes, servings, author_id, author_name, is_published, rating, review_count, tags, flavor_bitter, flavor_sweet, flavor_sour, flavor_salty, flavor_umami, flavor_strength, abv, story_json)
VALUES (
  '50000003-0000-0000-0000-000000000001', 
  'cocktail', 'easy', 2, 1, 
  '00000000-0000-0000-0000-000000000001', 
  'Head Bartender Alex', 
  true, 4.2, 43, 
  ARRAY['classic', 'highball', 'refreshing', 'japanese'],
  1, 2, 1, 1, 1, 2, 10,
  '{"origin": "Japan - Suntory", "year": 1900, "era": "Meiji Era", "ratio": "45ml Whisky + Tonic/Soda + Đá"}'::jsonb
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.note_translations (note_id, language, title, description, author_story)
VALUES (
  '50000003-0000-0000-0000-000000000001', 
  'vi', 
  'Whisky Highball',
  'Suntory phổ biến whisky highball để phục vụ trong các yakitori bar Nhật Bản từ đầu thế kỷ 20. Thức uống nhẹ nhàng, sảng khoái.',
  'Tại Nhật Bản, highball được phục vụ trong hầu hết các quán rượu (izakaya) như một cách để kéo dài thời gian thưởng thức whisky mà không bị say nhanh.'
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.note_ingredients (note_id, name, amount, amount_value, unit, sort_order, amount_ml)
VALUES 
  ('50000003-0000-0000-0000-000000000001', 'Japanese Whisky', '45ml', 45, 'ml', 1, 45),
  ('50000003-0000-0000-0000-000000000001', 'Soda lạnh', '150ml', 150, 'ml', 2, 150),
  ('50000003-0000-0000-0000-000000000001', 'Đá viên lớn', '4-5 viên', NULL, NULL, 3, NULL),
  ('50000003-0000-0000-0000-000000000001', 'Vỏ chanh', '1 miếng', NULL, NULL, 4, NULL)
ON CONFLICT (id) DO NOTHING;

-- Riff: Gin & Tonic (1783)
INSERT INTO public.notes (id, category, difficulty, time_minutes, servings, author_id, author_name, is_published, rating, review_count, tags, flavor_bitter, flavor_sweet, flavor_sour, flavor_salty, flavor_umami, flavor_strength, abv, is_remix, story_json)
VALUES (
  '50000003-0000-0000-0000-000000000002', 
  'cocktail', 'easy', 2, 1, 
  '00000000-0000-0000-0000-000000000001', 
  'Head Bartender Alex', 
  true, 4.5, 87, 
  ARRAY['classic', 'refreshing', 'bitter', 'medicinal'],
  5, 2, 2, 1, 1, 2, 14,
  true,
  '{"origin": "British India", "year": 1783, "era": "Colonial", "branch": "Nhánh Y Tế", "ratio": "45ml London Dry Gin + 120ml Tonic water + Lime wedge"}'::jsonb
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.note_translations (note_id, language, title, description, author_story)
VALUES (
  '50000003-0000-0000-0000-000000000002', 
  'vi', 
  'Gin & Tonic',
  'Quân đội Anh tại Ấn Độ pha Quinine (Tonic) với Gin để uống thuốc bổ hàng ngày. Điều kiện thời tiết nhiệt đới thúc đẩy sáng tạo này.',
  'Tonic water chứa Quinine - thuốc chống sốt rét. Quân đội Anh thêm gin để uống dễ hơn (vì quinine rất đắng). Đây là cách Gin & Tonic ra đời từ nhu cầu y tế.'
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.note_ingredients (note_id, name, amount, amount_value, unit, sort_order, amount_ml)
VALUES 
  ('50000003-0000-0000-0000-000000000002', 'London Dry Gin', '45ml', 45, 'ml', 1, 45),
  ('50000003-0000-0000-0000-000000000002', 'Tonic water', '120ml', 120, 'ml', 2, 120),
  ('50000003-0000-0000-0000-000000000002', 'Lime wedge', '1 miếng', NULL, NULL, 3, NULL)
ON CONFLICT (id) DO NOTHING;

-- Riff: Espresso Martini (1983)
INSERT INTO public.notes (id, category, difficulty, time_minutes, servings, author_id, author_name, is_published, rating, review_count, tags, flavor_bitter, flavor_sweet, flavor_sour, flavor_salty, flavor_umami, flavor_strength, abv, is_remix, story_json)
VALUES (
  '50000003-0000-0000-0000-000000000003', 
  'cocktail', 'medium', 5, 1, 
  '00000000-0000-0000-0000-000000000001', 
  'Head Bartender Alex', 
  true, 4.9, 156, 
  ARRAY['classic', 'coffee', 'espresso', 'caffeinated'],
  3, 4, 2, 0, 3, 5, 35,
  true,
  '{"origin": "Soho Brasserie, London", "year": 1983, "era": "London Scene", "branch": "Vodka Soda →", "ratio": "50ml Vodka + 30ml Fresh espresso + 10ml Coffee liqueur"}'::jsonb
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.note_translations (note_id, language, title, description, author_story)
VALUES (
  '50000003-0000-0000-0000-000000000003', 
  'vi', 
  'Espresso Martini',
  'Dick Bradsell sáng tạo tại Soho Brasserie, London năm 1983 cho nữ khách muốn "wake me up then f*** me up".',
  'Dick Bradsell kể lại: "Một cô gái ngồi ở quầy bar nói với tôi: ''Tôi muốn một ly cocktail để đánh thức tôi, rồi sau đó...'' Tôi pha ly Martini với espresso và đặt tên là Espresso Martini."'
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.note_ingredients (note_id, name, amount, amount_value, unit, sort_order, amount_ml)
VALUES 
  ('50000003-0000-0000-0000-000000000003', 'Vodka', '50ml', 50, 'ml', 1, 50),
  ('50000003-0000-0000-0000-000000000003', 'Espresso tươi', '30ml', 30, 'ml', 2, 30),
  ('50000003-0000-0000-0000-000000000003', 'Kahlúa', '10ml', 10, 'ml', 3, 10),
  ('50000003-0000-0000-0000-000000000003', 'Vanilla syrup', '5ml', 5, 'ml', 4, 5)
ON CONFLICT (id) DO NOTHING;

-- Crown: Kyoto Fizz (2025)
INSERT INTO public.notes (id, category, difficulty, time_minutes, servings, author_id, author_name, is_published, is_featured, rating, review_count, tags, parent_recipe_id, parent_recipe_name, flavor_bitter, flavor_sweet, flavor_sour, flavor_salty, flavor_umami, flavor_strength, abv, is_remix, story_json)
VALUES (
  '50000003-0000-0000-0000-000000000004', 
  'cocktail', 'hard', 15, 1, 
  '00000000-0000-0000-0000-000000000001', 
  'Head Bartender Alex', 
  true, true, 5, 10, 
  ARRAY['atelier', 'japanese', 'kombu', 'sakura'],
  '50000003-0000-0000-0000-000000000001',
  'Whisky Highball',
  1, 2, 3, 1, 2, 2, 15,
  true,
  '{"code": "#ARC-5503", "era": "Atelier Đương Đại", "year": 2025, "description": "Kombu (tảo) dashi-washed Gin, yuzu juice, hime uchinoco shochu giảm ABV, sparkling water từ Hokkaido, hoa sakura salt rim."}'::jsonb
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.note_translations (note_id, language, title, description, author_story)
VALUES (
  '50000003-0000-0000-0000-000000000004', 
  'vi', 
  'Kyoto Fizz',
  'Kombu (tảo) dashi-washed Gin, yuzu juice, hime uchinoco shochu giảm ABV, sparkling water từ Hokkaido, hoa sakura salt rim.',
  'Mùa xuân Kyoto, khi hoa anh đào nở rộ, Head Bartender Alex sáng tạo Kyoto Fizz như một tác phẩm tri ân văn hóa Nhật Bản: từ kombu dashi đến sakura, mỗi thành phần đều mang một câu chuyện.'
)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.note_ingredients (note_id, name, amount, amount_value, unit, sort_order, amount_ml)
VALUES 
  ('50000003-0000-0000-0000-000000000004', 'Kombu Dashi Gin', '30ml', 30, 'ml', 1, 30),
  ('50000003-0000-0000-0000-000000000004', 'Hime Uchinoco Shochu', '15ml', 15, 'ml', 2, 15),
  ('50000003-0000-0000-0000-000000000004', 'Yuzu juice', '20ml', 20, 'ml', 3, 20),
  ('50000003-0000-0000-0000-000000000004', 'Sparkling water Hokkaido', '80ml', 80, 'ml', 4, 80),
  ('50000003-0000-0000-0000-000000000004', 'Sakura salt rim', '1 lớp', NULL, NULL, 5, NULL)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- ADD ALL LINEAGE NOTES TO CLASSIC COCKTAILS COLLECTION
-- ============================================================

INSERT INTO public.collection_notes (collection_id, note_id)
VALUES 
  -- Old Fashioned Family
  ('30000000-0000-0000-0000-000000000001', '50000000-0000-0000-0000-000000000001'),  -- Root
  ('30000000-0000-0000-0000-000000000001', '50000000-0000-0000-0000-000000000002'),  -- Boulevardier
  ('30000000-0000-0000-0000-000000000001', '50000000-0000-0000-0000-000000000003'),  -- Vieux Carré
  ('30000000-0000-0000-0000-000000000001', '50000000-0000-0000-0000-000000000004'),  -- Sazerac
  ('30000000-0000-0000-0000-000000000001', '50000000-0000-0000-0000-000000000005'),  -- Left Hand
  ('30000000-0000-0000-0000-000000000001', '50000000-0000-0000-0000-000000000006'),  -- Oaxaca
  ('30000000-0000-0000-0000-000000000001', '50000000-0000-0000-0000-000000000007'),  -- Crown
  
  -- Negroni Family
  ('30000000-0000-0000-0000-000000000001', '50000001-0000-0000-0000-000000000001'),  -- Root
  ('30000000-0000-0000-0000-000000000001', '50000001-0000-0000-0000-000000000002'),  -- Sbagliato
  ('30000000-0000-0000-0000-000000000001', '50000001-0000-0000-0000-000000000003'),  -- White Negroni
  ('30000000-0000-0000-0000-000000000001', '50000001-0000-0000-0000-000000000004'),  -- Crown
  
  -- Sour Family
  ('30000000-0000-0000-0000-000000000001', '50000002-0000-0000-0000-000000000001'),  -- Root
  ('30000000-0000-0000-0000-000000000001', '50000002-0000-0000-0000-000000000002'),  -- Daiquiri
  ('30000000-0000-0000-0000-000000000001', '50000002-0000-0000-0000-000000000003'),  -- Clarified Milk Punch
  ('30000000-0000-0000-0000-000000000001', '50000002-0000-0000-0000-000000000004'),  -- Crown
  
  -- Highball Family
  ('30000000-0000-0000-0000-000000000001', '50000003-0000-0000-0000-000000000001'),  -- Root
  ('30000000-0000-0000-0000-000000000001', '50000003-0000-0000-0000-000000000002'),  -- Gin & Tonic
  ('30000000-0000-0000-0000-000000000001', '50000003-0000-0000-0000-000000000003'),  -- Espresso Martini
  ('30000000-0000-0000-0000-000000000001', '50000003-0000-0000-0000-000000000004')   -- Crown
ON CONFLICT DO NOTHING;

-- ============================================================
-- VERIFY LINEAGE DATA
-- ============================================================

-- SELECT 'Lineage Notes inserted:' as info, COUNT(*) as count FROM public.notes WHERE id LIKE '500%';
-- SELECT 'Lineage Crowns (featured):' as info, COUNT(*) as count FROM public.notes WHERE is_featured = true AND id LIKE '500%';
