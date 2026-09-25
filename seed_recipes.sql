-- ============================================================
-- SEED DATA - Sample Recipes for Atelier Bar App
-- Run this in Supabase SQL Editor
-- ============================================================

-- ============================================================
-- COCKTAILS - Classic Cocktails
-- ============================================================

-- Negroni
INSERT INTO notes (id, category, difficulty, prep_time, servings, rating, avg_rating, is_published, device_id, created_at, updated_at)
VALUES ('cocktail-001', 'cocktail', 'de', 5, 1, 5, 4.8, true, 'seed-data', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO note_translations (note_id, language, title, description, author_story)
VALUES 
  ('cocktail-001', 'vi', 'Negroni', 'Cocktail cu dien Ý voi vi dang thanh, hoa quen tu Gin, Campari va Vermouth do.', 'Duoc phat minh tai Florence, Ý nam 1919 boi Count Camillo Negroni.'),
  ('cocktail-001', 'en', 'Negroni', 'Classic Italian cocktail with bitter-sweet balance of Gin, Campari and Red Vermouth.', 'Invented in Florence, Italy in 1919 by Count Camillo Negroni.')
ON CONFLICT (note_id, language) DO NOTHING;

INSERT INTO note_ingredients (note_id, ingredient_name, amount, unit, sort_order) VALUES
  ('cocktail-001', 'Gin', 30, 'ml', 1),
  ('cocktail-001', 'Campari', 30, 'ml', 2),
  ('cocktail-001', 'Sweet Vermouth', 30, 'ml', 3),
  ('cocktail-001', 'Orange peel', '1 strip', NULL, 4);

INSERT INTO note_steps (note_id, step_number, instruction) VALUES
  ('cocktail-001', 1, 'Add Gin, Campari and Vermouth to mixing glass with ice.'),
  ('cocktail-001', 2, 'Stir for 30 seconds to chill.'),
  ('cocktail-001', 3, 'Strain into chilled rocks glass.'),
  ('cocktail-001', 4, 'Garnish with orange peel.');

-- Old Fashioned
INSERT INTO notes (id, category, difficulty, prep_time, servings, rating, avg_rating, is_published, device_id, created_at, updated_at)
VALUES ('cocktail-002', 'cocktail', 'de', 5, 1, 5, 4.9, true, 'seed-data', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO note_translations (note_id, language, title, description, author_story)
VALUES 
  ('cocktail-002', 'vi', 'Old Fashioned', 'Cocktail bourbon cu dien voi vi ngot nhe va dang dac trung.', 'Duoc cho la ra doi tai Pendennis Club, Louisville vao cuoi the ky 19.'),
  ('cocktail-002', 'en', 'Old Fashioned', 'Classic bourbon cocktail with subtle sweetness and bitter notes.', 'Believed to have originated at the Pendennis Club, Louisville in the late 19th century.')
ON CONFLICT (note_id, language) DO NOTHING;

INSERT INTO note_ingredients (note_id, ingredient_name, amount, unit, sort_order) VALUES
  ('cocktail-002', 'Bourbon', 60, 'ml', 1),
  ('cocktail-002', 'Simple syrup', 10, 'ml', 2),
  ('cocktail-002', 'Angostura bitters', 2, 'dash', 3),
  ('cocktail-002', 'Large ice cube', '1 pc', NULL, 4);

INSERT INTO note_steps (note_id, step_number, instruction) VALUES
  ('cocktail-002', 1, 'Place large ice cube in rocks glass.'),
  ('cocktail-002', 2, 'Add syrup and bitters.'),
  ('cocktail-002', 3, 'Pour bourbon and stir gently.'),
  ('cocktail-002', 4, 'Garnish with orange peel and cherry.');

-- Margarita
INSERT INTO notes (id, category, difficulty, prep_time, servings, rating, avg_rating, is_published, device_id, created_at, updated_at)
VALUES ('cocktail-003', 'cocktail', 'trung_binh', 5, 1, 5, 4.7, true, 'seed-data', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO note_translations (note_id, language, title, description, author_story)
VALUES 
  ('cocktail-003', 'vi', 'Margarita', 'Cocktail tequila voi vi chua ngot tuoi mat.', 'Duoc phat minh tai Mexico vao nhung nam 1940.'),
  ('cocktail-003', 'en', 'Margarita', 'Refreshing tequila cocktail with sweet-sour taste.', 'Invented in Mexico in the 1940s.')
ON CONFLICT (note_id, language) DO NOTHING;

INSERT INTO note_ingredients (note_id, ingredient_name, amount, unit, sort_order) VALUES
  ('cocktail-003', 'Tequila', 45, 'ml', 1),
  ('cocktail-003', 'Triple sec', 20, 'ml', 2),
  ('cocktail-003', 'Lime juice', 25, 'ml', 3),
  ('cocktail-003', 'Salt', '1 pinch', NULL, 4);

INSERT INTO note_steps (note_id, step_number, instruction) VALUES
  ('cocktail-003', 1, 'Chill margarita glass with ice.'),
  ('cocktail-003', 2, 'Add tequila, triple sec and lime juice to shaker with ice.'),
  ('cocktail-003', 3, 'Shake vigorously for 15 seconds.'),
  ('cocktail-003', 4, 'Strain into rimmed glass. Garnish with lime wheel.');

-- Mojito
INSERT INTO notes (id, category, difficulty, prep_time, servings, rating, avg_rating, is_published, device_id, created_at, updated_at)
VALUES ('cocktail-004', 'cocktail', 'de', 7, 1, 5, 4.6, true, 'seed-data', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO note_translations (note_id, language, title, description, author_story)
VALUES 
  ('cocktail-004', 'vi', 'Mojito', 'Cocktail rum Cuba voi vi tuoi mat cua bac ha va chanh.', 'Duoc cho la co nguon goc tu Havana vao the ky 16.'),
  ('cocktail-004', 'en', 'Mojito', 'Cuban rum cocktail with refreshing mint and lime.', 'Believed to have originated in Havana in the 16th century.')
ON CONFLICT (note_id, language) DO NOTHING;

INSERT INTO note_ingredients (note_id, ingredient_name, amount, unit, sort_order) VALUES
  ('cocktail-004', 'White rum', 45, 'ml', 1),
  ('cocktail-004', 'Lime', '1/2 pc', NULL, 2),
  ('cocktail-004', 'Mint', '8-10 leaves', NULL, 3),
  ('cocktail-004', 'Simple syrup', 20, 'ml', 4),
  ('cocktail-004', 'Soda water', 'top up', NULL, 5);

INSERT INTO note_steps (note_id, step_number, instruction) VALUES
  ('cocktail-004', 1, 'Add mint and lime to highball glass.'),
  ('cocktail-004', 2, 'Add syrup and muddle gently.'),
  ('cocktail-004', 3, 'Pour rum and add ice.'),
  ('cocktail-004', 4, 'Top with soda and stir. Garnish with mint sprig.');

-- Espresso Martini
INSERT INTO notes (id, category, difficulty, prep_time, servings, rating, avg_rating, is_published, device_id, created_at, updated_at)
VALUES ('cocktail-005', 'cocktail', 'trung_binh', 5, 1, 5, 4.8, true, 'seed-data', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO note_translations (note_id, language, title, description, author_story)
VALUES 
  ('cocktail-005', 'vi', 'Espresso Martini', 'Cocktail vodka ket hop voi espresso.', 'Duoc tao boi bartender Dick Bradsell nam 1983.'),
  ('cocktail-005', 'en', 'Espresso Martini', 'Vodka cocktail combined with espresso for a wake-up drink.', 'Created by British bartender Dick Bradsell in 1983.')
ON CONFLICT (note_id, language) DO NOTHING;

INSERT INTO note_ingredients (note_id, ingredient_name, amount, unit, sort_order) VALUES
  ('cocktail-005', 'Vodka', 50, 'ml', 1),
  ('cocktail-005', 'Kahlua', 20, 'ml', 2),
  ('cocktail-005', 'Espresso', 30, 'ml', 3),
  ('cocktail-005', 'Simple syrup', 10, 'ml', 4);

INSERT INTO note_steps (note_id, step_number, instruction) VALUES
  ('cocktail-005', 1, 'Brew espresso and let cool slightly.'),
  ('cocktail-005', 2, 'Add vodka, Kahlua, espresso and syrup to shaker with ice.'),
  ('cocktail-005', 3, 'Shake vigorously for 20 seconds to create foam.'),
  ('cocktail-005', 4, 'Strain into chilled martini glass. Garnish with 3 coffee beans.');

-- Daiquiri
INSERT INTO notes (id, category, difficulty, prep_time, servings, rating, avg_rating, is_published, device_id, created_at, updated_at)
VALUES ('cocktail-006', 'cocktail', 'de', 3, 1, 5, 4.5, true, 'seed-data', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO note_translations (note_id, language, title, description, author_story)
VALUES 
  ('cocktail-006', 'vi', 'Daiquiri', 'Cocktail rum cu dien voi vi chua ngot thanh tao.'),
  ('cocktail-006', 'en', 'Daiquiri', 'Classic rum cocktail with elegant sweet-sour taste.', 'Named after a mining town near Santiago de Cuba.')
ON CONFLICT (note_id, language) DO NOTHING;

INSERT INTO note_ingredients (note_id, ingredient_name, amount, unit, sort_order) VALUES
  ('cocktail-006', 'White rum', 60, 'ml', 1),
  ('cocktail-006', 'Lime juice', 25, 'ml', 2),
  ('cocktail-006', 'Simple syrup', 15, 'ml', 3);

INSERT INTO note_steps (note_id, step_number, instruction) VALUES
  ('cocktail-006', 1, 'Add all ingredients to shaker with ice.'),
  ('cocktail-006', 2, 'Shake vigorously for 15 seconds.'),
  ('cocktail-006', 3, 'Strain into chilled coupe glass.');

-- Whiskey Sour
INSERT INTO notes (id, category, difficulty, prep_time, servings, rating, avg_rating, is_published, device_id, created_at, updated_at)
VALUES ('cocktail-007', 'cocktail', 'trung_binh', 5, 1, 5, 4.6, true, 'seed-data', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO note_translations (note_id, language, title, description, author_story)
VALUES 
  ('cocktail-007', 'vi', 'Whiskey Sour', 'Cocktail bourbon voi vi chua ngot can bang.'),
  ('cocktail-007', 'en', 'Whiskey Sour', 'Bourbon cocktail with balanced sweet-sour taste.', 'One of the classic cocktails served on the Titanic.')
ON CONFLICT (note_id, language) DO NOTHING;

INSERT INTO note_ingredients (note_id, ingredient_name, amount, unit, sort_order) VALUES
  ('cocktail-007', 'Bourbon', 60, 'ml', 1),
  ('cocktail-007', 'Lemon juice', 30, 'ml', 2),
  ('cocktail-007', 'Simple syrup', 15, 'ml', 3),
  ('cocktail-007', 'Egg white', '1 pc', NULL, 4);

INSERT INTO note_steps (note_id, step_number, instruction) VALUES
  ('cocktail-007', 1, 'Add all to shaker WITHOUT ice (dry shake).'),
  ('cocktail-007', 2, 'Shake vigorously for 15 seconds.'),
  ('cocktail-007', 3, 'Add ice and shake for 10 more seconds.'),
  ('cocktail-007', 4, 'Strain into chilled rocks glass. Garnish with cherry and orange.');

-- ============================================================
-- MOCKTAILS - Non-alcoholic drinks
-- ============================================================

-- Virgin Mojito
INSERT INTO notes (id, category, difficulty, prep_time, servings, rating, avg_rating, is_published, device_id, created_at, updated_at)
VALUES ('mocktail-001', 'mocktail', 'de', 5, 1, 5, 4.5, true, 'seed-data', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO note_translations (note_id, language, title, description, author_story)
VALUES 
  ('mocktail-001', 'vi', 'Virgin Mojito', 'Phien ban khong con cua Mojito, tuoi mat cho moi lua tuoi.'),
  ('mocktail-001', 'en', 'Virgin Mojito', 'Non-alcoholic version of Mojito, refreshing for all ages.')
ON CONFLICT (note_id, language) DO NOTHING;

INSERT INTO note_ingredients (note_id, ingredient_name, amount, unit, sort_order) VALUES
  ('mocktail-001', 'Lime', '1/2 pc', NULL, 1),
  ('mocktail-001', 'Mint', '8-10 leaves', NULL, 2),
  ('mocktail-001', 'Simple syrup', 30, 'ml', 3),
  ('mocktail-001', 'Soda water', 150, 'ml', 4),
  ('mocktail-001', 'Crushed ice', '1 glass', NULL, 5);

INSERT INTO note_steps (note_id, step_number, instruction) VALUES
  ('mocktail-001', 1, 'Muddle mint and lime with syrup in glass.'),
  ('mocktail-001', 2, 'Add crushed ice and soda.'),
  ('mocktail-001', 3, 'Stir gently and garnish with mint.');

-- No-Tequila Sunrise
INSERT INTO notes (id, category, difficulty, prep_time, servings, rating, avg_rating, is_published, device_id, created_at, updated_at)
VALUES ('mocktail-002', 'mocktail', 'de', 5, 1, 5, 4.4, true, 'seed-data', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO note_translations (note_id, language, title, description, author_story)
VALUES 
  ('mocktail-002', 'vi', 'No-Tequila Sunrise', 'Do uong voi mau sac dep nhu anh binh minh.'),
  ('mocktail-002', 'en', 'No-Tequila Sunrise', 'Drink with beautiful sunrise-like colors.')
ON CONFLICT (note_id, language) DO NOTHING;

INSERT INTO note_ingredients (note_id, ingredient_name, amount, unit, sort_order) VALUES
  ('mocktail-002', 'Orange juice', 120, 'ml', 1),
  ('mocktail-002', 'Pineapple juice', 60, 'ml', 2),
  ('mocktail-002', 'Grenadine', 20, 'ml', 3),
  ('mocktail-002', 'Ice', '4-5 pcs', NULL, 4);

INSERT INTO note_steps (note_id, step_number, instruction) VALUES
  ('mocktail-002', 1, 'Add ice to highball glass.'),
  ('mocktail-002', 2, 'Pour orange and pineapple juice, stir.'),
  ('mocktail-002', 3, 'Slowly pour grenadine down the side (let it sink).'),
  ('mocktail-002', 4, 'Garnish with cherry and orange wheel.');

-- ============================================================
-- COFFEE - Coffee drinks
-- ============================================================

-- Vietnamese Iced Coffee
INSERT INTO notes (id, category, difficulty, prep_time, servings, rating, avg_rating, is_published, device_id, created_at, updated_at)
VALUES ('coffee-001', 'coffee', 'de', 10, 1, 5, 4.9, true, 'seed-data', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO note_translations (note_id, language, title, description, author_story)
VALUES 
  ('coffee-001', 'vi', 'Ca Phe Sua Da', 'Ca phe Viet Nam dac trung voi vi dang nhe va beo ngay cua sua dac.'),
  ('coffee-001', 'en', 'Vietnamese Iced Coffee', 'Signature Vietnamese coffee with light bitterness and rich condensed milk.')
ON CONFLICT (note_id, language) DO NOTHING;

INSERT INTO note_ingredients (note_id, ingredient_name, amount, unit, sort_order) VALUES
  ('coffee-001', 'Vietnamese coffee (phin)', 30, 'g', 1),
  ('coffee-001', 'Condensed milk', 40, 'ml', 2),
  ('coffee-001', 'Crushed ice', '1 glass', NULL, 3),
  ('coffee-001', 'Hot water', 150, 'ml', 4);

INSERT INTO note_steps (note_id, step_number, instruction) VALUES
  ('coffee-001', 1, 'Add condensed milk to bottom of glass.'),
  ('coffee-001', 2, 'Brew coffee with phin and hot water.'),
  ('coffee-001', 3, 'Pour coffee into glass, stir with milk.'),
  ('coffee-001', 4, 'Add crushed ice and enjoy through straw.');

-- Cappuccino
INSERT INTO notes (id, category, difficulty, prep_time, servings, rating, avg_rating, is_published, device_id, created_at, updated_at)
VALUES ('coffee-002', 'coffee', 'trung_binh', 5, 1, 5, 4.6, true, 'seed-data', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO note_translations (note_id, language, title, description, author_story)
VALUES 
  ('coffee-002', 'vi', 'Cappuccino', 'Ca phe Ý voi lop foam sua min mang.'),
  ('coffee-002', 'en', 'Cappuccino', 'Italian coffee with velvety milk foam.')
ON CONFLICT (note_id, language) DO NOTHING;

INSERT INTO note_ingredients (note_id, ingredient_name, amount, unit, sort_order) VALUES
  ('coffee-002', 'Espresso', 30, 'ml', 1),
  ('coffee-002', 'Steamed milk', 120, 'ml', 2),
  ('coffee-002', 'Milk foam', '30ml', NULL, 3),
  ('coffee-002', 'Cocoa powder', '1 pinch', NULL, 4);

INSERT INTO note_steps (note_id, step_number, instruction) VALUES
  ('coffee-002', 1, 'Pour espresso into 180ml cappuccino cup.'),
  ('coffee-002', 2, 'Steam milk to create fine foam.'),
  ('coffee-002', 3, 'Pour steamed milk and foam into cup.'),
  ('coffee-002', 4, 'Dust cocoa powder on top and serve immediately.');

-- Latte
INSERT INTO notes (id, category, difficulty, prep_time, servings, rating, avg_rating, is_published, device_id, created_at, updated_at)
VALUES ('coffee-003', 'coffee', 'trung_binh', 5, 1, 5, 4.5, true, 'seed-data', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO note_translations (note_id, language, title, description, author_story)
VALUES 
  ('coffee-003', 'vi', 'Cafe Latte', 'Ca phe sua mem mai voi nhieu sua hon cappuccino.'),
  ('coffee-003', 'en', 'Latte', 'Creamy milk coffee with more milk than cappuccino.')
ON CONFLICT (note_id, language) DO NOTHING;

INSERT INTO note_ingredients (note_id, ingredient_name, amount, unit, sort_order) VALUES
  ('coffee-003', 'Espresso', 30, 'ml', 1),
  ('coffee-003', 'Steamed milk', 180, 'ml', 2),
  ('coffee-003', 'Milk foam', '1 layer', NULL, 3);

INSERT INTO note_steps (note_id, step_number, instruction) VALUES
  ('coffee-003', 1, 'Pour espresso into 240ml cup.'),
  ('coffee-003', 2, 'Steam milk with less foam than Latte.'),
  ('coffee-003', 3, 'Pour milk in, keeping foam on top.'),
  ('coffee-003', 4, 'Can draw simple latte art on top.');

-- Cold Brew
INSERT INTO notes (id, category, difficulty, prep_time, servings, rating, avg_rating, is_published, device_id, created_at, updated_at)
VALUES ('coffee-004', 'coffee', 'de', 5, 2, 5, 4.7, true, 'seed-data', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO note_translations (note_id, language, title, description, author_story)
VALUES 
  ('coffee-004', 'vi', 'Cold Brew', 'Ca phe pha lanh trong thoi gian dai, vi dang muot mat.'),
  ('coffee-004', 'en', 'Cold Brew', 'Cold-brewed coffee for smooth bitter taste and less acidity.', 'Requires 12-24 hours steeping.')
ON CONFLICT (note_id, language) DO NOTHING;

INSERT INTO note_ingredients (note_id, ingredient_name, amount, unit, sort_order) VALUES
  ('coffee-004', 'Coarse ground coffee', 100, 'g', 1),
  ('coffee-004', 'Cold filtered water', 700, 'ml', 2),
  ('coffee-004', 'Ice', 'as needed', NULL, 3),
  ('coffee-004', 'Milk or syrup', 'optional', NULL, 4);

INSERT INTO note_steps (note_id, step_number, instruction) VALUES
  ('coffee-004', 1, 'Mix coffee and cold water in container.'),
  ('coffee-004', 2, 'Cover and refrigerate for 12-24 hours.'),
  ('coffee-004', 3, 'Filter coffee through filter or cloth.'),
  ('coffee-004', 4, 'Serve over ice with milk or syrup if desired.');

-- ============================================================
-- TEA - Tea drinks
-- ============================================================

-- Ginger Lemon Tea
INSERT INTO notes (id, category, difficulty, prep_time, servings, rating, avg_rating, is_published, device_id, created_at, updated_at)
VALUES ('tea-001', 'tea', 'de', 10, 1, 5, 4.5, true, 'seed-data', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO note_translations (note_id, language, title, description, author_story)
VALUES 
  ('tea-001', 'vi', 'Tra Chanh Gung', 'Do uong am nong voi vi chua cua chanh va cay nhe cua gung.'),
  ('tea-001', 'en', 'Ginger Lemon Tea', 'Warm drink with sour lemon and mild spicy ginger.')
ON CONFLICT (note_id, language) DO NOTHING;

INSERT INTO note_ingredients (note_id, ingredient_name, amount, unit, sort_order) VALUES
  ('tea-001', 'Fresh ginger', 20, 'g', 1),
  ('tea-001', 'Lemon', '1/2 pc', NULL, 2),
  ('tea-001', 'Honey', 20, 'ml', 3),
  ('tea-001', 'Black tea', 5, 'g', 4),
  ('tea-001', 'Boiling water', 300, 'ml', 5);

INSERT INTO note_steps (note_id, step_number, instruction) VALUES
  ('tea-001', 1, 'Slice ginger thinly and bruise.'),
  ('tea-001', 2, 'Brew tea with boiling water for 3-5 minutes.'),
  ('tea-001', 3, 'Add ginger and lemon juice.'),
  ('tea-001', 4, 'Let cool slightly then add honey. Enjoy warm.');

-- Vietnamese Iced Tea
INSERT INTO notes (id, category, difficulty, prep_time, servings, rating, avg_rating, is_published, device_id, created_at, updated_at)
VALUES ('tea-002', 'tea', 'de', 5, 1, 4, 4.2, true, 'seed-data', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO note_translations (note_id, language, title, description, author_story)
VALUES 
  ('tea-002', 'vi', 'Tra Da', 'Do uong giai khat truyen thong cua nguoi Viet.'),
  ('tea-002', 'en', 'Vietnamese Iced Tea', 'Traditional Vietnamese refreshing drink.')
ON CONFLICT (note_id, language) DO NOTHING;

INSERT INTO note_ingredients (note_id, ingredient_name, amount, unit, sort_order) VALUES
  ('tea-002', 'Green tea leaves', 20, 'g', 1),
  ('tea-002', 'Sugar', 30, 'g', 2),
  ('tea-002', 'Ice cubes', '1 glass', NULL, 3),
  ('tea-002', 'Boiling water', 500, 'ml', 4);

INSERT INTO note_steps (note_id, step_number, instruction) VALUES
  ('tea-002', 1, 'Brew tea with boiling water for 15-20 minutes.'),
  ('tea-002', 2, 'Add sugar and stir to dissolve.'),
  ('tea-002', 3, 'Let cool and refrigerate.'),
  ('tea-002', 4, 'Serve with ice and plenty of sugar.');

-- Matcha Latte
INSERT INTO notes (id, category, difficulty, prep_time, servings, rating, avg_rating, is_published, device_id, created_at, updated_at)
VALUES ('tea-003', 'tea', 'trung_binh', 10, 1, 5, 4.8, true, 'seed-data', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO note_translations (note_id, language, title, description, author_story)
VALUES 
  ('tea-003', 'vi', 'Matcha Latte', 'Tra xanh Nhat Ban matcha ket hop voi sua.'),
  ('tea-003', 'en', 'Matcha Latte', 'Japanese green tea matcha combined with milk.')
ON CONFLICT (note_id, language) DO NOTHING;

INSERT INTO note_ingredients (note_id, ingredient_name, amount, unit, sort_order) VALUES
  ('tea-003', 'Matcha powder', 2, 'g', 1),
  ('tea-003', 'Hot water', 30, 'ml', 2),
  ('tea-003', 'Fresh milk', 180, 'ml', 3),
  ('tea-003', 'Honey/Syrup', 15, 'ml', 4);

INSERT INTO note_steps (note_id, step_number, instruction) VALUES
  ('tea-003', 1, 'Whisk matcha with hot water (80C) until dissolved.'),
  ('tea-003', 2, 'Steam milk to create foam.'),
  ('tea-003', 3, 'Pour milk into glass, then add matcha.'),
  ('tea-003', 4, 'Add honey if you like sweet. Can dust matcha on top.');

-- ============================================================
-- SMOOTHIES - Fruit smoothies
-- ============================================================

-- Avocado Smoothie
INSERT INTO notes (id, category, difficulty, prep_time, servings, rating, avg_rating, is_published, device_id, created_at, updated_at)
VALUES ('smoothie-001', 'smoothie', 'de', 5, 1, 5, 4.7, true, 'seed-data', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO note_translations (note_id, language, title, description, author_story)
VALUES 
  ('smoothie-001', 'vi', 'Sinh To Bo', 'Sinh to bo beo ngay, giàu dinh duong.'),
  ('smoothie-001', 'en', 'Avocado Smoothie', 'Creamy avocado smoothie, rich in nutrients.')
ON CONFLICT (note_id, language) DO NOTHING;

INSERT INTO note_ingredients (note_id, ingredient_name, amount, unit, sort_order) VALUES
  ('smoothie-001', 'Ripe avocado', '1/2 pc', NULL, 1),
  ('smoothie-001', 'Fresh milk', 200, 'ml', 2),
  ('smoothie-001', 'Condensed milk', 30, 'ml', 3),
  ('smoothie-001', 'Sugar', 20, 'g', 4),
  ('smoothie-001', 'Ice', '1/2 glass', NULL, 5);

INSERT INTO note_steps (note_id, step_number, instruction) VALUES
  ('smoothie-001', 1, 'Scoop avocado and remove pit.'),
  ('smoothie-001', 2, 'Add all to blender.'),
  ('smoothie-001', 3, 'Blend smooth for 2-3 minutes.'),
  ('smoothie-001', 4, 'Pour into glass and garnish with avocado slice.');

-- Strawberry Smoothie
INSERT INTO notes (id, category, difficulty, prep_time, servings, rating, avg_rating, is_published, device_id, created_at, updated_at)
VALUES ('smoothie-002', 'smoothie', 'de', 5, 1, 5, 4.6, true, 'seed-data', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO note_translations (note_id, language, title, description, author_story)
VALUES 
  ('smoothie-002', 'vi', 'Sinh To Dau', 'Sinh to dau tuoi voi vi ngot chua hài hoa.'),
  ('smoothie-002', 'en', 'Strawberry Smoothie', 'Fresh strawberry smoothie with harmonious sweet-sour taste.')
ON CONFLICT (note_id, language) DO NOTHING;

INSERT INTO note_ingredients (note_id, ingredient_name, amount, unit, sort_order) VALUES
  ('smoothie-002', 'Fresh strawberries', 150, 'g', 1),
  ('smoothie-002', 'Yogurt', 150, 'ml', 2),
  ('smoothie-002', 'Honey', 20, 'ml', 3),
  ('smoothie-002', 'Fresh milk', 100, 'ml', 4),
  ('smoothie-002', 'Ice', '1/2 glass', NULL, 5);

INSERT INTO note_steps (note_id, step_number, instruction) VALUES
  ('smoothie-002', 1, 'Wash strawberries and remove stems.'),
  ('smoothie-002', 2, 'Add strawberries, yogurt, honey, milk to blender.'),
  ('smoothie-002', 3, 'Blend smooth for 2 minutes.'),
  ('smoothie-002', 4, 'Pour into glass and garnish with few strawberries.');

-- Mango Smoothie
INSERT INTO notes (id, category, difficulty, prep_time, servings, rating, avg_rating, is_published, device_id, created_at, updated_at)
VALUES ('smoothie-003', 'smoothie', 'de', 5, 1, 5, 4.8, true, 'seed-data', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO note_translations (note_id, language, title, description, author_story)
VALUES 
  ('smoothie-003', 'vi', 'Sinh To Xoai', 'Sinh to xoai chin muy, ngot thom, huong vi nhiet doi.'),
  ('smoothie-003', 'en', 'Mango Smoothie', 'Ripe mango smoothie, sweet and fragrant with tropical flavor.')
ON CONFLICT (note_id, language) DO NOTHING;

INSERT INTO note_ingredients (note_id, ingredient_name, amount, unit, sort_order) VALUES
  ('smoothie-003', 'Ripe mango', '1 pc', NULL, 1),
  ('smoothie-003', 'Coconut milk', 100, 'ml', 2),
  ('smoothie-003', 'Fresh milk', 100, 'ml', 3),
  ('smoothie-003', 'Honey', 15, 'ml', 4),
  ('smoothie-003', 'Ice', '1/2 glass', NULL, 5);

INSERT INTO note_steps (note_id, step_number, instruction) VALUES
  ('smoothie-003', 1, 'Peel mango and cut into pieces.'),
  ('smoothie-003', 2, 'Add mango, coconut milk, fresh milk to blender.'),
  ('smoothie-003', 3, 'Blend smooth, add honey if needed.'),
  ('smoothie-003', 4, 'Pour into glass and serve cold. Can garnish with mango piece.');

-- ============================================================
-- MILKSHAKES
-- ============================================================

-- Chocolate Milkshake
INSERT INTO notes (id, category, difficulty, prep_time, servings, rating, avg_rating, is_published, device_id, created_at, updated_at)
VALUES ('milkshake-001', 'milkshake', 'de', 5, 1, 5, 4.8, true, 'seed-data', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO note_translations (note_id, language, title, description, author_story)
VALUES 
  ('milkshake-001', 'vi', 'Sua Lac Socola', 'Sua lac socola ngay beo, mat lanh.'),
  ('milkshake-001', 'en', 'Chocolate Milkshake', 'Rich creamy chocolate milkshake, cool and delightful.')
ON CONFLICT (note_id, language) DO NOTHING;

INSERT INTO note_ingredients (note_id, ingredient_name, amount, unit, sort_order) VALUES
  ('milkshake-001', 'Vanilla ice cream', 3, 'scoops', 1),
  ('milkshake-001', 'Fresh milk', 250, 'ml', 2),
  ('milkshake-001', 'Chocolate syrup', 45, 'ml', 3),
  ('milkshake-001', 'Crushed ice', '1/2 glass', NULL, 4),
  ('milkshake-001', 'Whipped cream', '1 dollop', NULL, 5);

INSERT INTO note_steps (note_id, step_number, instruction) VALUES
  ('milkshake-001', 1, 'Add ice cream, milk, chocolate syrup to blender.'),
  ('milkshake-001', 2, 'Add crushed ice and blend until smooth.'),
  ('milkshake-001', 3, 'Pour into tall glass.'),
  ('milkshake-001', 4, 'Top with whipped cream and chocolate chips.');

-- Strawberry Milkshake
INSERT INTO notes (id, category, difficulty, prep_time, servings, rating, avg_rating, is_published, device_id, created_at, updated_at)
VALUES ('milkshake-002', 'milkshake', 'de', 5, 1, 5, 4.6, true, 'seed-data', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO note_translations (note_id, language, title, description, author_story)
VALUES 
  ('milkshake-002', 'vi', 'Sua Lac Dau', 'Sua lac dau tuoi voi vi ngot thanh.'),
  ('milkshake-002', 'en', 'Strawberry Milkshake', 'Fresh strawberry milkshake with sweet taste.')
ON CONFLICT (note_id, language) DO NOTHING;

INSERT INTO note_ingredients (note_id, ingredient_name, amount, unit, sort_order) VALUES
  ('milkshake-002', 'Vanilla ice cream', 3, 'scoops', 1),
  ('milkshake-002', 'Fresh milk', 250, 'ml', 2),
  ('milkshake-002', 'Fresh strawberries', 100, 'g', 3),
  ('milkshake-002', 'Strawberry syrup', 30, 'ml', 4),
  ('milkshake-002', 'Crushed ice', '1/2 glass', NULL, 5);

INSERT INTO note_steps (note_id, step_number, instruction) VALUES
  ('milkshake-002', 1, 'Add ice cream, milk, strawberries and strawberry syrup to blender.'),
  ('milkshake-002', 2, 'Blend smooth with crushed ice.'),
  ('milkshake-002', 3, 'Pour into glass and garnish with strawberry.');

-- ============================================================
-- JUICES - Fresh juices
-- ============================================================

-- Fresh Orange Juice
INSERT INTO notes (id, category, difficulty, prep_time, servings, rating, avg_rating, is_published, device_id, created_at, updated_at)
VALUES ('juice-001', 'juice', 'de', 5, 1, 5, 4.5, true, 'seed-data', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO note_translations (note_id, language, title, description, author_story)
VALUES 
  ('juice-001', 'vi', 'Nuoc Ep Cam', 'Nuoc cam tuoi vắt, giàu vitamin C.'),
  ('juice-001', 'en', 'Fresh Orange Juice', 'Fresh squeezed orange juice, rich in Vitamin C.')
ON CONFLICT (note_id, language) DO NOTHING;

INSERT INTO note_ingredients (note_id, ingredient_name, amount, unit, sort_order) VALUES
  ('juice-001', 'Ripe oranges', 4, 'pcs', 1),
  ('juice-001', 'Sugar (optional)', 10, 'g', 2),
  ('juice-001', 'Ice', '1/2 glass', NULL, 3);

INSERT INTO note_steps (note_id, step_number, instruction) VALUES
  ('juice-001', 1, 'Wash oranges and peel.'),
  ('juice-001', 2, 'Juice oranges with juicer or by hand.'),
  ('juice-001', 3, 'Strain pulp and add sugar if desired.'),
  ('juice-001', 4, 'Add ice and enjoy immediately.');

-- Pineapple Mint Juice
INSERT INTO notes (id, category, difficulty, prep_time, servings, rating, avg_rating, is_published, device_id, created_at, updated_at)
VALUES ('juice-002', 'juice', 'de', 5, 1, 5, 4.7, true, 'seed-data', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO note_translations (note_id, language, title, description, author_story)
VALUES 
  ('juice-002', 'vi', 'Nuoc Ep Dứa Bac Ha', 'Nuoc dứa tuoi mat ket hop voi bac ha.'),
  ('juice-002', 'en', 'Pineapple Mint Juice', 'Refreshing fresh pineapple juice combined with mint.')
ON CONFLICT (note_id, language) DO NOTHING;

INSERT INTO note_ingredients (note_id, ingredient_name, amount, unit, sort_order) VALUES
  ('juice-002', 'Ripe pineapple', '1/2 pc', NULL, 1),
  ('juice-002', 'Fresh mint', 10, 'leaves', 2),
  ('juice-002', 'Filtered water', 100, 'ml', 3),
  ('juice-002', 'Honey', 15, 'ml', 4),
  ('juice-002', 'Ice', '1/2 glass', NULL, 5);

INSERT INTO note_steps (note_id, step_number, instruction) VALUES
  ('juice-002', 1, 'Peel pineapple and cut small.'),
  ('juice-002', 2, 'Add pineapple, mint, water to blender.'),
  ('juice-002', 3, 'Blend smooth and strain if desired.'),
  ('juice-002', 4, 'Add honey and ice, stir well.');

-- ============================================================
-- LEMONADE
-- ============================================================

-- Passion Fruit Lemonade
INSERT INTO notes (id, category, difficulty, prep_time, servings, rating, avg_rating, is_published, device_id, created_at, updated_at)
VALUES ('lemonade-001', 'lemonade', 'de', 5, 1, 5, 4.6, true, 'seed-data', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO note_translations (note_id, language, title, description, author_story)
VALUES 
  ('lemonade-001', 'vi', 'Chanh Day Da', 'Nuoc chanh day chua ngot, mat lanh.'),
  ('lemonade-001', 'en', 'Passion Fruit Lemonade', 'Sweet-sour passion fruit lemonade, cool and refreshing.')
ON CONFLICT (note_id, language) DO NOTHING;

INSERT INTO note_ingredients (note_id, ingredient_name, amount, unit, sort_order) VALUES
  ('lemonade-001', 'Passion fruit', 3, 'pcs', 1),
  ('lemonade-001', 'Sugar', 50, 'g', 2),
  ('lemonade-001', 'Filtered water', 300, 'ml', 3),
  ('lemonade-001', 'Ice', '1 glass', NULL, 4);

INSERT INTO note_steps (note_id, step_number, instruction) VALUES
  ('lemonade-001', 1, 'Cut passion fruit in half and scoop pulp into glass.'),
  ('lemonade-001', 2, 'Make sugar syrup with hot water, stir to dissolve.'),
  ('lemonade-001', 3, 'Pour syrup and water into passion fruit glass.'),
  ('lemonade-001', 4, 'Add ice and stir. Can strain out seeds.');

-- ============================================================
-- ICED TEA
-- ============================================================

-- Peach Iced Tea
INSERT INTO notes (id, category, difficulty, prep_time, servings, rating, avg_rating, is_published, device_id, created_at, updated_at)
VALUES ('iced_tea-001', 'iced_tea', 'de', 10, 1, 5, 4.8, true, 'seed-data', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO note_translations (note_id, language, title, description, author_story)
VALUES 
  ('iced_tea-001', 'vi', 'Tra Dao', 'Tra da voi mieng dao ngam, vi tra thom hoa voi ngot cua dao.'),
  ('iced_tea-001', 'en', 'Peach Iced Tea', 'Iced tea with soaked peach slices.')
ON CONFLICT (note_id, language) DO NOTHING;

INSERT INTO note_ingredients (note_id, ingredient_name, amount, unit, sort_order) VALUES
  ('iced_tea-001', 'Black tea bags', 3, 'bags', 1),
  ('iced_tea-001', 'Canned peaches', '2-3 slices', NULL, 2),
  ('iced_tea-001', 'Sugar', 40, 'g', 3),
  ('iced_tea-001', 'Boiling water', 500, 'ml', 4),
  ('iced_tea-001', 'Ice', '1 glass', NULL, 5);

INSERT INTO note_steps (note_id, step_number, instruction) VALUES
  ('iced_tea-001', 1, 'Brew tea with boiling water for 5-10 minutes.'),
  ('iced_tea-001', 2, 'Add sugar and stir to dissolve.'),
  ('iced_tea-001', 3, 'Let cool and refrigerate.'),
  ('iced_tea-001', 4, 'Serve with ice and peach slices.');

-- ============================================================
-- HOT CHOCOLATE
-- ============================================================

-- Hot Chocolate
INSERT INTO notes (id, category, difficulty, prep_time, servings, rating, avg_rating, is_published, device_id, created_at, updated_at)
VALUES ('hot_chocolate-001', 'hot_chocolate', 'de', 10, 1, 5, 4.7, true, 'seed-data', NOW(), NOW())
ON CONFLICT (id) DO NOTHING;

INSERT INTO note_translations (note_id, language, title, description, author_story)
VALUES 
  ('hot_chocolate-001', 'vi', 'Socola Nong', 'Do uong nong voi socola ngay beo.'),
  ('hot_chocolate-001', 'en', 'Hot Chocolate', 'Warm drink with rich creamy chocolate.')
ON CONFLICT (note_id, language) DO NOTHING;

INSERT INTO note_ingredients (note_id, ingredient_name, amount, unit, sort_order) VALUES
  ('hot_chocolate-001', 'Dark chocolate (chopped)', 50, 'g', 1),
  ('hot_chocolate-001', 'Fresh milk', 250, 'ml', 2),
  ('hot_chocolate-001', 'Cream', 50, 'ml', 3),
  ('hot_chocolate-001', 'Sugar', 20, 'g', 4),
  ('hot_chocolate-001', 'Cocoa powder', '1 pinch', NULL, 5);

INSERT INTO note_steps (note_id, step_number, instruction) VALUES
  ('hot_chocolate-001', 1, 'Heat milk in small saucepan.'),
  ('hot_chocolate-001', 2, 'Add chopped chocolate and sugar, stir until dissolved.'),
  ('hot_chocolate-001', 3, 'Pour into mug and add cream.'),
  ('hot_chocolate-001', 4, 'Dust cocoa powder on top and serve hot.');

-- ============================================================
-- Verify inserted data
-- ============================================================

-- Check total recipes by category
SELECT 
  n.category,
  COUNT(*) as recipe_count
FROM notes n
WHERE n.is_published = true
GROUP BY n.category
ORDER BY n.category;

-- Total recipe count
SELECT COUNT(*) as total_recipes FROM notes WHERE is_published = true;
