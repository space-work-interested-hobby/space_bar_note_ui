-- ============================================================
-- MIGRATION SCRIPT: Mock Data → Supabase Database
-- ============================================================
-- Chạy script này trong Supabase SQL Editor để insert dữ liệu thật
-- ============================================================

-- ============================================================
-- 0. SCHEMA FIXES - Add missing columns to support mock data
-- ============================================================

-- Add flavor profile columns to notes table
ALTER TABLE public.notes ADD COLUMN IF NOT EXISTS flavor_bitter integer DEFAULT 0;
ALTER TABLE public.notes ADD COLUMN IF NOT EXISTS flavor_sweet integer DEFAULT 0;
ALTER TABLE public.notes ADD COLUMN IF NOT EXISTS flavor_sour integer DEFAULT 0;
ALTER TABLE public.notes ADD COLUMN IF NOT EXISTS flavor_salty integer DEFAULT 0;
ALTER TABLE public.notes ADD COLUMN IF NOT EXISTS flavor_umami integer DEFAULT 0;
ALTER TABLE public.notes ADD COLUMN IF NOT EXISTS flavor_strength integer DEFAULT 0;

-- Add ABV (alcohol by volume) for cocktails
ALTER TABLE public.notes ADD COLUMN IF NOT EXISTS abv numeric(4,1) DEFAULT 0;

-- Add parent recipe info for lineage trees
ALTER TABLE public.notes ADD COLUMN IF NOT EXISTS parent_recipe_id uuid REFERENCES notes(id);
ALTER TABLE public.notes ADD COLUMN IF NOT EXISTS parent_recipe_name text;

-- Add amount_ml to note_ingredients
ALTER TABLE public.note_ingredients ADD COLUMN IF NOT EXISTS amount_ml numeric;

-- Create note_images table
CREATE TABLE IF NOT EXISTS public.note_images (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  note_id       uuid NOT NULL REFERENCES notes(id) ON DELETE CASCADE,
  image_url     text NOT NULL,
  caption       text,
  alt_text      text,
  is_hero       boolean DEFAULT false,
  sort_order    integer NOT NULL DEFAULT 0,
  created_at    timestamp with time zone DEFAULT now()
);

-- Add RLS policies for note_images
DO $$
BEGIN
  ALTER TABLE public.note_images ENABLE ROW LEVEL SECURITY;
EXCEPTION WHEN others THEN NULL;
END $$;

DROP POLICY IF EXISTS "images_select_all" ON public.note_images;
CREATE POLICY "images_select_all"  ON public.note_images FOR SELECT USING (true);

DROP POLICY IF EXISTS "images_insert_all" ON public.note_images;
CREATE POLICY "images_insert_all" ON public.note_images FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "images_update_all" ON public.note_images;
CREATE POLICY "images_update_all" ON public.note_images FOR UPDATE USING (true);

DROP POLICY IF EXISTS "images_delete_all" ON public.note_images;
CREATE POLICY "images_delete_all" ON public.note_images FOR DELETE USING (true);

-- Create category_groups table if not exists (required by category_mappings)
CREATE TABLE IF NOT EXISTS public.category_groups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  label text NOT NULL,
  icon text,
  description text,
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Check if default group exists, if not insert
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.category_groups WHERE id = '00000000-0000-0000-0000-000000000001') THEN
    INSERT INTO public.category_groups (id, slug, label, sort_order)
    VALUES ('00000000-0000-0000-0000-000000000001', 'beverages', 'Beverages', 1);
  END IF;
END $$;

-- Create category_mappings table if not exists
CREATE TABLE IF NOT EXISTS public.category_mappings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL UNIQUE,
  group_id uuid NOT NULL REFERENCES category_groups(id),
  icon text,
  sort_order integer default 0,
  is_active boolean DEFAULT true
);

-- ============================================================
-- 1. INSERT PROFILES (Người dùng hệ thống)
-- ============================================================

INSERT INTO public.profiles (id, username, display_name, avatar_url, bio, role, recipe_count)
VALUES 
  ('00000000-0000-0000-0000-000000000001', 'head_bartender_alex', 'Head Bartender Alex', 
   'https://lh3.googleusercontent.com/aida-public/AB6AXuDPgNYQSLULNF2jm4QnS1VBpDNETRf7TTSJeCsr_fp78IKw5w6_aIAHRBVdmewTOPu8iYo9caBdzhV7krqu9nkFs_S-YZt-8oUEoDgeve54meGp7nMyV_RjkpQtQrH_l80dj_nzSY0k_R__FhW_e6XWBAWB4TON8vgImFQQAbpVPHezeK-00Bz15jp_8K9u-gKy2G8zmsTijexubKB7oeAWAqS35IYthD6Iz7T5GfOFaDJPXnoQPS0l',
   'Bartender chuyên nghiệp 15 năm kinh nghiệm tại các speakeasy bar châu Âu. Chuyên gia về cocktail cổ điển và kỹ thuật hiện đại.', 'admin', 25),
  
  ('00000000-0000-0000-0000-000000000002', 'chef_helene', 'Chef Hélène Vũ', 
   'https://lh3.googleusercontent.com/aida-public/AB6AXuCl1TiliqLCVNsowioThf-YN-DsoWPgV3i7neUcyUfUE1BzbkxdmLNm6-FuKwenqXhTxHNmYk6CWPsX_yynlf1piUgTSsxfDhZv6pB9DglNyntzU4eLwC6GncXjdYlvTYxuvN5cHPZlmydHZwMQQRgTgS52dmwjGjKQKUFZreVw85hpWsXmbgXdlA3DtYfi44CkfE1w48_x2WnfIRzTXuAyzYLttbMv9vhjVyN0zXC3TV5fZcejtNvn',
   'Pastry Chef tốt nghiệp Le Cordon Bleu Paris. Chuyên về bánh mì sourdough và tráng miệng Pháp.', 'admin', 18),
  
  ('00000000-0000-0000-0000-000000000003', 'dr_thao_nhi', 'Bác sĩ Thảo Nhi', 
   'https://lh3.googleusercontent.com/aida-public/AB6AXuAARbJocmeW1koyZW0klV8MhKEMvRpvlrMTEs9FOcCozPwZk4eM8K-n-YQg68heM5OOglQgE4YG-I4a6NM1_vFhc37D-K73BZFmfn8ukyQ2gtXQa9lnR9PV26ABBVy5DMl7pYhxGKqWo8snMRp8hez09g8AvqbcjL8_NjeBIBpdkmbCjT2AvuUd9ZDq30Eq9GcgG0Nu0t1x608zpD8WgkquiFbX5QIDtXjmLt04MDAD0iUCXC5Ekdlw',
   'Bác sĩ dinh dưỡng và chuyên gia Kombucha. Kết hợp y học với nghệ thuật pha chế đồ uống lành mạnh.', 'admin', 14),
  
  ('00000000-0000-0000-0000-000000000004', 'minh_quan', 'Minh Quân', 
   'https://lh3.googleusercontent.com/aida-public/AB6AXuB_sc6Y2pz-bkmHShIQW2MWKZwQrjOLeBqThhKfXNrjxC1HUM9vno5e5sROi5_u0GXwbeLwowwjeu_cmp_mL4CypLNQK41Egmm4o0urBNndiKEl48rwDwtXQal-Hq9NtZljLBT-zkPIqntobZwD3PHc1i32GUHPk20JKG_j1K9ginuP9TkgbHnO-JwEGYgLaXM547MI4bezSXIeyVKwrK0mhuNCdcJeF-uobuF1ST37CH6E9r15R77H',
   'Home bartender và coffee enthusiast. Đam mê khám phá hương vị từ khắp thế giới.', 'user', 12)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- 2. INSERT NOTES (Công thức mẫu từ mockData.js)
-- ============================================================

-- Note 1: Cocktail Negroni
INSERT INTO public.notes (id, category, difficulty, time_minutes, servings, image_url, author_id, author_name, is_published, rating, review_count, tags, flavor_bitter, flavor_sweet, flavor_sour, flavor_salty, flavor_umami, flavor_strength)
VALUES ('10000000-0000-0000-0000-000000000001', 'cocktail', 'medium', 5, 1, NULL, '00000000-0000-0000-0000-000000000001', 'Head Bartender Alex', true, 5, 24, ARRAY['classic', 'italian', 'spirit-forward'], 5, 2, 1, 0, 1, 5)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.note_translations (note_id, language, title, description, author_story)
VALUES ('10000000-0000-0000-0000-000000000001', 'vi', 'Cocktail Negroni', 
        'Cocktail kinh điển Ý với sự cân bằng hoàn hảo giữa đắng, ngọt và thảo mộc.',
        'Count Camillo Negroni yêu cầu bartender pha thêm gin vào Americano tại Caffè Casoni, Florence năm 1919. Một thế kỷ sau, Negroni vẫn là một trong những cocktail được yêu thích nhất thế giới.')
ON CONFLICT (note_id, language) DO UPDATE SET 
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  author_story = EXCLUDED.author_story;

INSERT INTO public.note_ingredients (note_id, name, amount, amount_value, unit, sort_order, amount_ml)
VALUES 
  ('10000000-0000-0000-0000-000000000001', 'Gin', '30ml', 30, 'ml', 1, 30),
  ('10000000-0000-0000-0000-000000000001', 'Campari', '30ml', 30, 'ml', 2, 30),
  ('10000000-0000-0000-0000-000000000001', 'Sweet Vermouth', '30ml', 30, 'ml', 3, 30)
ON CONFLICT (id) DO NOTHING;

-- Note 2: Cà Phê Sữa Đá
INSERT INTO public.notes (id, category, difficulty, time_minutes, servings, image_url, author_id, author_name, is_published, rating, review_count, tags, flavor_bitter, flavor_sweet, flavor_sour, flavor_salty, flavor_umami, flavor_strength)
VALUES ('10000000-0000-0000-0000-000000000002', 'coffee', 'easy', 10, 1, NULL, '00000000-0000-0000-0000-000000000004', 'Minh Quân', true, 4.5, 18, ARRAY['vietnamese', 'cold', 'sweet'], 3, 5, 2, 0, 2, 3)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.note_translations (note_id, language, title, description, author_story)
VALUES ('10000000-0000-0000-0000-000000000002', 'vi', 'Cà Phê Sữa Đá', 
        'Cà phê Việt Nam đậm đà pha với sữa đặc có đường, uống lạnh với đá.',
        'Cà phê sữa đá là biểu tượng ẩm thực Việt Nam, phổ biến từ Hà Nội đến Sài Gòn. Nghệ thuật pha cà phê drip truyền thống tạo nên hương vị đặc trưng.')
ON CONFLICT (note_id, language) DO UPDATE SET 
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  author_story = EXCLUDED.author_story;

INSERT INTO public.note_ingredients (note_id, name, amount, amount_value, unit, sort_order)
VALUES 
  ('10000000-0000-0000-0000-000000000002', 'Cà phê rang mộc', '25g', 25, 'g', 1),
  ('10000000-0000-0000-0000-000000000002', 'Sữa đặc', '30ml', 30, 'ml', 2),
  ('10000000-0000-0000-0000-000000000002', 'Đá viên', '1 tách', NULL, NULL, 3)
ON CONFLICT (id) DO NOTHING;

-- Note 3: Trà Đá
INSERT INTO public.notes (id, category, difficulty, time_minutes, servings, image_url, author_id, author_name, is_published, rating, review_count, tags, flavor_bitter, flavor_sweet, flavor_sour, flavor_salty, flavor_umami, flavor_strength)
VALUES ('10000000-0000-0000-0000-000000000003', 'tea', 'easy', 5, 1, NULL, '00000000-0000-0000-0000-000000000004', 'Minh Quân', true, 3.5, 8, ARRAY['vietnamese', 'refreshing'], 2, 1, 1, 0, 1, 1)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.note_translations (note_id, language, title, description, author_story)
VALUES ('10000000-0000-0000-0000-000000000003', 'vi', 'Trà Đá', 
        'Trà nóng hãm trong nước sôi, để nguội và cho đá. Thức uống giải khát giản dị của người Việt.',
        'Trà đá - thức uống đường phố quen thuộc, đại diện cho lối sống giản dị của người Việt.')
ON CONFLICT (note_id, language) DO UPDATE SET 
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  author_story = EXCLUDED.author_story;

INSERT INTO public.note_ingredients (note_id, name, amount, amount_value, unit, sort_order)
VALUES 
  ('10000000-0000-0000-0000-000000000003', 'Trà khô', '5g', 5, 'g', 1),
  ('10000000-0000-0000-0000-000000000003', 'Nước sôi', '200ml', 200, 'ml', 2),
  ('10000000-0000-0000-0000-000000000003', 'Đá viên', '5-6 viên', NULL, NULL, 3)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- 3. INSERT COLLECTIONS (Bộ sưu tập từ collectionsData.js)
-- ============================================================

-- User Collections (của Minh Quân)
INSERT INTO public.collections (id, title, description, cover_image, is_public, is_system, user_id)
VALUES 
  ('20000000-0000-0000-0000-000000000001', 'Cocktail Speakeasy Đêm Đông', 
   'Bản hòa tấu của Bourbon ủ sồi, siro quế hồi tự nấu và khói gỗ sồi nướng ấm nồng cho những tối mùa đông Hà Nội.',
   'https://lh3.googleusercontent.com/aida-public/AB6AXuBFJ7-9Z2yaBb5pDN2s1PRat1U3sQHAEm0oZcPAcn4TtCDgLKtCKddKTIi_HNeuclCtmlHsxhCh0LWpmFM7FcnTQrfFSKCaEwiIqigv4PjnRU5piE1TlU-pb8P4TbFT65uu84sGbOS7-xwqT5d0fBJQDNsPOK5BbznXjOhFxfEu73DAgijDGd2ADWHPbd-vCwI3TEn6RVwvgkg0HMhN12vr5k3r42SszhElGUaHNcD-FbkrTVpZkTMC',
   true, false, '00000000-0000-0000-0000-000000000004')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.collection_translations (collection_id, language, title, description)
VALUES ('20000000-0000-0000-0000-000000000001', 'vi', 'Cocktail Speakeasy Đêm Đông', 
        'Bản hòa tấu của Bourbon ủ sồi, siro quế hồi tự nấu và khói gỗ sồi nướng ấm nồng cho những tối mùa đông Hà Nội.')
ON CONFLICT (collection_id, language) DO UPDATE SET 
  title = EXCLUDED.title,
  description = EXCLUDED.description;

-- User Collection 2: Bánh Mì Nướng
INSERT INTO public.collections (id, title, description, cover_image, is_public, is_system, user_id)
VALUES 
  ('20000000-0000-0000-0000-000000000002', 'Bánh Mì Nướng & Tráng Miệng Cuối Tuần', 
   'Công thức bánh tart bơ nâu, canelé giòn caramel cùng bánh mì sourdough lên men chậm kết hợp cùng mứt quả đỏ.',
   'https://lh3.googleusercontent.com/aida-public/AB6AXuDl22ucUXyIUvE4F7s11MiReOO_BCu61gfbMXSP_U4OnVTTqP66t_lwFEhD5Hjau6XzD5vreeAfI2vmrjQHhrmvq2sZisHBq3bOpA95XH2e4CnGMu8nbUgDKy8-l2iRlt_m3uIfDFjVpeDC56AeKDwWvKm0e7gfKABn0ACho6fmnIkDp2jVUUCvkhyIJgAw3PCr6WEN34kvpMWq3A98JC5_AB3dePnIMiLg0iTKyctpQLJPo6HFxrqn',
   false, false, '00000000-0000-0000-0000-000000000004')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.collection_translations (collection_id, language, title, description)
VALUES ('20000000-0000-0000-0000-000000000002', 'vi', 'Bánh Mì Nướng & Tráng Miệng Cuối Tuần', 
        'Công thức bánh tart bơ nâu, canelé giòn caramel cùng bánh mì sourdough lên men chậm kết hợp cùng mứt quả đỏ.')
ON CONFLICT (collection_id, language) DO UPDATE SET 
  title = EXCLUDED.title,
  description = EXCLUDED.description;

-- User Collection 3: Cold Brew
INSERT INTO public.collections (id, title, description, cover_image, is_public, is_system, user_id)
VALUES 
  ('20000000-0000-0000-0000-000000000003', 'Cà Phê Cold Brew & Biến Tấu Giải Nhiệt', 
   'Tuyển tập chiết xuất chậm 16 giờ từ hạt Ethiopia Yirgacheffe, kết hợp vỏ cam chanh, hoa đậu biếc và tonic thủ công.',
   'https://lh3.googleusercontent.com/aida-public/AB6AXuBq9UvC95n1yJAel-zra73nyaF4WwzXpcNIHk8FUBW2Y7hy2aymQGjmWZu7NJ_kBkCbDwTQ-h0PyIY29BS8YB8RFvN-hHbdRAABbYfgZ0K0JBp7g9RmE-a3b9fKiuAhDm721qRC_UJd_v-ZwI9kYf_BbklS4bFdgzjCy_xy017fMRUBcxjXLoQUxuNVVyBFA-1vtJTXabA39svb-svp4S7U2q_gHnvUz2WFqU0lnJSM_URTt1H29yau',
   true, false, '00000000-0000-0000-0000-000000000004')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.collection_translations (collection_id, language, title, description)
VALUES ('20000000-0000-0000-0000-000000000003', 'vi', 'Cà Phê Cold Brew & Biến Tấu Giải Nhiệt', 
        'Tuyển tập chiết xuất chậm 16 giờ từ hạt Ethiopia Yirgacheffe, kết hợp vỏ cam chanh, hoa đậu biếc và tonic thủ công.')
ON CONFLICT (collection_id, language) DO UPDATE SET 
  title = EXCLUDED.title,
  description = EXCLUDED.description;

-- System Collections
INSERT INTO public.collections (id, title, description, cover_image, is_public, is_system, user_id)
VALUES 
  ('30000000-0000-0000-0000-000000000001', '10 Ly Cocktail Kinh Điển Thế Kỷ 20', 
   'Quy chuẩn tỷ lệ vàng của Martini, Negroni, Old Fashioned, Sazerac và Sidecar. Tái hiện chuẩn xác phong vị Speakeasy New York & Paris.',
   'https://lh3.googleusercontent.com/aida-public/AB6AXuA_PQ4Dh6_bmjuoekirDRSbltQt2hSN8EoQMaY8MXVyVRKtThYrJZeSVvqs6IGKn2-WVH5qot2LfivoEfT-YARPTf6F6Ed-IObXvvHR7zePI8YmNAHmAz_RCTi1w8TxpWLnCYzt77s5bo_NkbxSjmJXQBHl1za6nwx64mJ1zn5_y-emNyXwwfBPXZxG2WodqXMFwGDSE1C8BobT2Vtd7iIZGFo6llZafBkiFrTX7ZqSLyM-OTR2h2ob',
   true, true, '00000000-0000-0000-0000-000000000001')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.collection_translations (collection_id, language, title, description)
VALUES ('30000000-0000-0000-0000-000000000001', 'vi', '10 Ly Cocktail Kinh Điển Thế Kỷ 20', 
        'Quy chuẩn tỷ lệ vàng của Martini, Negroni, Old Fashioned, Sazerac và Sidecar. Tái hiện chuẩn xác phong vị Speakeasy New York & Paris.')
ON CONFLICT (collection_id, language) DO UPDATE SET 
  title = EXCLUDED.title,
  description = EXCLUDED.description;

-- System Collection 2: Sourdough
INSERT INTO public.collections (id, title, description, cover_image, is_public, is_system, user_id)
VALUES 
  ('30000000-0000-0000-0000-000000000002', 'Bánh Tráng Miệng Men Tự Nhiên & Sourdough Chuẩn Pháp', 
   'Bộ bí kíp nuôi men Levain 100% tự nhiên kết hợp kỹ thuật thủy phân (autolyse) và nướng nhiệt cao cho vỏ bánh giòn xốp hoàn mỹ.',
   'https://lh3.googleusercontent.com/aida-public/AB6AXuD9UcVBfUIISwPOSm--6K-z-k542wuODfdZRiOMSNgbUxPZJhzok7nC1fA33Da5VmjpLZXTfAn_LyMmeQQQbZxgW_0yXQIn56fq20aybE79cBLH_i4MJnM2hOqvZU7CduAnNs2FVA-OWPZTFr9kRO_dFuGZY6Rr5xa9kD1rgv-AAAxjKz8j2OtKGE47bibKeOcoDmXy2StFD6MRaKrHU1AQcLUxePcc7RbKWBeNHPFITOvcz-YRPQlo',
   true, true, '00000000-0000-0000-0000-000000000002')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.collection_translations (collection_id, language, title, description)
VALUES ('30000000-0000-0000-0000-000000000002', 'vi', 'Bánh Tráng Miệng Men Tự Nhiên & Sourdough Chuẩn Pháp', 
        'Bộ bí kíp nuôi men Levain 100% tự nhiên kết hợp kỹ thuật thủy phân (autolyse) và nướng nhiệt cao cho vỏ bánh giòn xốp hoàn mỹ.')
ON CONFLICT (collection_id, language) DO UPDATE SET 
  title = EXCLUDED.title,
  description = EXCLUDED.description;

-- System Collection 3: Healthy Drinks
INSERT INTO public.collections (id, title, description, cover_image, is_public, is_system, user_id)
VALUES 
  ('30000000-0000-0000-0000-000000000003', 'Đồ Uống Lành Mạnh & Low-Sugar Mùa Hè', 
   'Công thức Trà Kombucha thảo mộc, Shrubs giấm trái cây lên men, và mocktail bổ sung chất điện giải không sử dụng đường tinh luyện.',
   'https://lh3.googleusercontent.com/aida-public/AB6AXuCAIgsi6-qFa89tfGpLokni7UKoDg_KcugOrjbEvkjoOC2dnlk18-0IFda_K1qw3piCu2QrO2sPJir9DGKdgVWn_RjVY0rHWNmHnLKhkW7k3bI6khJ4WWYnGXmk_S8RqbBRMyNAra52CPvMCCoy2nHK93XPQTiMuBGMsnGTvYuONwojVqWww17OiL3VqtH38ruNQUJf8HQiGE5bMblRi8nawMlkawupl2QEdaZUlj0pMM-0C5f75g1v',
   true, true, '00000000-0000-0000-0000-000000000003')
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.collection_translations (collection_id, language, title, description)
VALUES ('30000000-0000-0000-0000-000000000003', 'vi', 'Đồ Uống Lành Mạnh & Low-Sugar Mùa Hè', 
        'Công thức Trà Kombucha thảo mộc, Shrubs giấm trái cây lên men, và mocktail bổ sung chất điện giải không sử dụng đường tinh luyện.')
ON CONFLICT (collection_id, language) DO UPDATE SET 
  title = EXCLUDED.title,
  description = EXCLUDED.description;

-- ============================================================
-- 4. INSERT LINEAGE TREES DATA (Cây phả hệ cocktail)
-- ============================================================

-- Tạo notes cho Old Fashioned family
INSERT INTO public.notes (id, category, difficulty, time_minutes, servings, image_url, author_id, author_name, is_published, rating, review_count, tags, flavor_bitter, flavor_sweet, flavor_sour, flavor_salty, flavor_umami, flavor_strength, abv)
VALUES 
  ('40000000-0000-0000-0000-000000000001', 'cocktail', 'easy', 5, 1, NULL, '00000000-0000-0000-0000-000000000001', 'Head Bartender Alex', true, 5, 45, ARRAY['classic', 'whiskey', 'old-fashioned'], 3, 4, 1, 0, 1, 4, 34)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.note_translations (note_id, language, title, description)
VALUES 
  ('40000000-0000-0000-0000-000000000001', 'vi', 'Classic Whiskey Old Fashioned', 
   'Công thức gốc từ Pendennis Club, Louisville năm 1884. Cocktail được ghi nhận trong Jerry Thomas Compendium.')
ON CONFLICT (note_id, language) DO UPDATE SET 
  title = EXCLUDED.title,
  description = EXCLUDED.description;

INSERT INTO public.note_ingredients (note_id, name, amount, amount_value, unit, sort_order, amount_ml)
VALUES 
  ('40000000-0000-0000-0000-000000000001', 'Rye hoặc Bourbon', '60ml', 60, 'ml', 1, 60),
  ('40000000-0000-0000-0000-000000000001', 'Đường mía viên', '1 viên', 1, 'viên', 2, NULL),
  ('40000000-0000-0000-0000-000000000001', 'Angostura Bitters', '2 dashes', 2, 'dashes', 3, 2),
  ('40000000-0000-0000-0000-000000000001', 'Vỏ cam tươi', '1 miếng', NULL, NULL, 4, NULL)
ON CONFLICT (id) DO NOTHING;

-- Boulevardier (riff của Old Fashioned)
INSERT INTO public.notes (id, category, difficulty, time_minutes, servings, image_url, author_id, author_name, is_published, rating, review_count, tags, parent_recipe_id, parent_recipe_name, flavor_bitter, flavor_sweet, flavor_sour, flavor_salty, flavor_umami, flavor_strength, abv)
VALUES 
  ('40000000-0000-0000-0000-000000000002', 'cocktail', 'medium', 5, 1, NULL, '00000000-0000-0000-0000-000000000001', 'Head Bartender Alex', true, 4.8, 32, ARRAY['classic', 'bourbon', 'bitter'], '40000000-0000-0000-0000-000000000001', 'Classic Whiskey Old Fashioned', 4, 3, 1, 0, 1, 4, 30)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.note_translations (note_id, language, title, description)
VALUES 
  ('40000000-0000-0000-0000-000000000002', 'vi', 'Boulevardier', 
   'Erskine Gwynne sáng tạo tại Harry''s New York Bar, Paris năm 1927. Hoán vị cấu trúc Old Fashioned bằng việc phối trộn Sweet Vermouth & Campari.')
ON CONFLICT (note_id, language) DO UPDATE SET 
  title = EXCLUDED.title,
  description = EXCLUDED.description;

INSERT INTO public.note_ingredients (note_id, name, amount, amount_value, unit, sort_order, amount_ml)
VALUES 
  ('40000000-0000-0000-0000-000000000002', 'Bourbon', '45ml', 45, 'ml', 1, 45),
  ('40000000-0000-0000-0000-000000000002', 'Sweet Vermouth', '30ml', 30, 'ml', 2, 30),
  ('40000000-0000-0000-0000-000000000002', 'Campari', '30ml', 30, 'ml', 3, 30)
ON CONFLICT (id) DO NOTHING;

-- Classic Negroni
INSERT INTO public.notes (id, category, difficulty, time_minutes, servings, image_url, author_id, author_name, is_published, rating, review_count, tags, flavor_bitter, flavor_sweet, flavor_sour, flavor_salty, flavor_umami, flavor_strength, abv)
VALUES 
  ('40000000-0000-0000-0000-000000000003', 'cocktail', 'easy', 3, 1, NULL, '00000000-0000-0000-0000-000000000001', 'Head Bartender Alex', true, 5, 68, ARRAY['classic', 'italian', 'bitter'], 5, 2, 1, 0, 1, 5, 28)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.note_translations (note_id, language, title, description)
VALUES 
  ('40000000-0000-0000-0000-000000000003', 'vi', 'Classic Negroni', 
   'Count Camillo Negroni yêu cầu bartender pha thêm gin vào Americano tại Caffè Casoni, Florence năm 1919.')
ON CONFLICT (note_id, language) DO UPDATE SET 
  title = EXCLUDED.title,
  description = EXCLUDED.description;

INSERT INTO public.note_ingredients (note_id, name, amount, amount_value, unit, sort_order, amount_ml)
VALUES 
  ('40000000-0000-0000-0000-000000000003', 'Gin', '30ml', 30, 'ml', 1, 30),
  ('40000000-0000-0000-0000-000000000003', 'Campari', '30ml', 30, 'ml', 2, 30),
  ('40000000-0000-0000-0000-000000000003', 'Sweet Vermouth', '30ml', 30, 'ml', 3, 30)
ON CONFLICT (id) DO NOTHING;

-- Negroni Sbagliato
INSERT INTO public.notes (id, category, difficulty, time_minutes, servings, image_url, author_id, author_name, is_published, rating, review_count, tags, parent_recipe_id, parent_recipe_name, flavor_bitter, flavor_sweet, flavor_sour, flavor_salty, flavor_umami, flavor_strength, abv)
VALUES 
  ('40000000-0000-0000-0000-000000000004', 'cocktail', 'easy', 3, 1, NULL, '00000000-0000-0000-0000-000000000001', 'Head Bartender Alex', true, 4.5, 28, ARRAY['classic', 'italian', 'sparkling'], '40000000-0000-0000-0000-000000000003', 'Classic Negroni', 3, 3, 2, 0, 1, 3, 12)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.note_translations (note_id, language, title, description)
VALUES 
  ('40000000-0000-0000-0000-000000000004', 'vi', 'Negroni Sbagliato', 
   'Mario Mihajlov (B Checker), Milan nhầm lẫn thần kỳ: Prosecco thay Gin tạo nên phiên bản long mình, effervescent. Viral sensation 2022.')
ON CONFLICT (note_id, language) DO UPDATE SET 
  title = EXCLUDED.title,
  description = EXCLUDED.description;

INSERT INTO public.note_ingredients (note_id, name, amount, amount_value, unit, sort_order, amount_ml)
VALUES 
  ('40000000-0000-0000-0000-000000000004', 'Prosecco', '30ml', 30, 'ml', 1, 30),
  ('40000000-0000-0000-0000-000000000004', 'Sweet Vermouth', '30ml', 30, 'ml', 2, 30),
  ('40000000-0000-0000-0000-000000000004', 'Campari', '30ml', 30, 'ml', 3, 30)
ON CONFLICT (id) DO NOTHING;

-- Whiskey Sour (Sour family root)
INSERT INTO public.notes (id, category, difficulty, time_minutes, servings, image_url, author_id, author_name, is_published, rating, review_count, tags, flavor_bitter, flavor_sweet, flavor_sour, flavor_salty, flavor_umami, flavor_strength, abv)
VALUES 
  ('40000000-0000-0000-0000-000000000005', 'cocktail', 'medium', 5, 1, NULL, '00000000-0000-0000-0000-000000000001', 'Head Bartender Alex', true, 4.7, 38, ARRAY['classic', 'sour', 'citrus'], 2, 4, 5, 0, 1, 3, 30)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.note_translations (note_id, language, title, description)
VALUES 
  ('40000000-0000-0000-0000-000000000005', 'vi', 'Whiskey Sour', 
   'Jerry Thomas ghi nhận năm 1872 trong How to Mix Drinks. Phiên bản gốc có cả lòng trắng trứng tạo foam mịn.')
ON CONFLICT (note_id, language) DO UPDATE SET 
  title = EXCLUDED.title,
  description = EXCLUDED.description;

INSERT INTO public.note_ingredients (note_id, name, amount, amount_value, unit, sort_order, amount_ml)
VALUES 
  ('40000000-0000-0000-0000-000000000005', 'Whiskey', '60ml', 60, 'ml', 1, 60),
  ('40000000-0000-0000-0000-000000000005', 'Nước cốt chanh', '30ml', 30, 'ml', 2, 30),
  ('40000000-0000-0000-0000-000000000005', 'Simple syrup', '15ml', 15, 'ml', 3, 15),
  ('40000000-0000-0000-0000-000000000005', 'Lòng trắng trứng', '1 cái', NULL, NULL, 4, NULL)
ON CONFLICT (id) DO NOTHING;

-- Daiquiri (riff của Sour)
INSERT INTO public.notes (id, category, difficulty, time_minutes, servings, image_url, author_id, author_name, is_published, rating, review_count, tags, parent_recipe_id, parent_recipe_name, flavor_bitter, flavor_sweet, flavor_sour, flavor_salty, flavor_umami, flavor_strength, abv)
VALUES 
  ('40000000-0000-0000-0000-000000000006', 'cocktail', 'easy', 3, 1, NULL, '00000000-0000-0000-0000-000000000001', 'Head Bartender Alex', true, 4.8, 52, ARRAY['classic', 'cuban', 'citrus'], '40000000-0000-0000-0000-000000000005', 'Whiskey Sour', 2, 4, 4, 0, 1, 3, 32)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.note_translations (note_id, language, title, description)
VALUES 
  ('40000000-0000-0000-0000-000000000006', 'vi', 'Daiquiri', 
   'Jennings Cox sáng tạo tại Daiquiri, Cuba năm 1896. Biến tấu Rum với lime tươi và đường nghiền — nền tảng của tất cả Sour.')
ON CONFLICT (note_id, language) DO UPDATE SET 
  title = EXCLUDED.title,
  description = EXCLUDED.description;

INSERT INTO public.note_ingredients (note_id, name, amount, amount_value, unit, sort_order, amount_ml)
VALUES 
  ('40000000-0000-0000-0000-000000000006', 'White Rum', '60ml', 60, 'ml', 1, 60),
  ('40000000-0000-0000-0000-000000000006', 'Nước cốt lime', '30ml', 30, 'ml', 2, 30),
  ('40000000-0000-0000-0000-000000000006', 'Simple syrup 2:1', '20ml', 20, 'ml', 3, 20)
ON CONFLICT (id) DO NOTHING;

-- Gin & Tonic (Highball family)
INSERT INTO public.notes (id, category, difficulty, time_minutes, servings, image_url, author_id, author_name, is_published, rating, review_count, tags, flavor_bitter, flavor_sweet, flavor_sour, flavor_salty, flavor_umami, flavor_strength, abv)
VALUES 
  ('40000000-0000-0000-0000-000000000007', 'cocktail', 'easy', 2, 1, NULL, '00000000-0000-0000-0000-000000000001', 'Head Bartender Alex', true, 4.3, 41, ARRAY['classic', 'refreshing', 'tonic'], 4, 2, 2, 1, 1, 2, 12)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.note_translations (note_id, language, title, description)
VALUES 
  ('40000000-0000-0000-0000-000000000007', 'vi', 'Gin & Tonic', 
   'Quân đội Anh tại Ấn Độ pha Quinine (Tonic) với Gin để uống thuốc bổ hàng ngày từ năm 1783. Điều kiện thời tiết nhiệt đới thúc đẩy sáng tạo này.')
ON CONFLICT (note_id, language) DO UPDATE SET 
  title = EXCLUDED.title,
  description = EXCLUDED.description;

INSERT INTO public.note_ingredients (note_id, name, amount, amount_value, unit, sort_order, amount_ml)
VALUES 
  ('40000000-0000-0000-0000-000000000007', 'London Dry Gin', '45ml', 45, 'ml', 1, 45),
  ('40000000-0000-0000-0000-000000000007', 'Tonic water', '120ml', 120, 'ml', 2, 120),
  ('40000000-0000-0000-0000-000000000007', 'Lime wedge', '1 miếng', NULL, NULL, 3, NULL)
ON CONFLICT (id) DO NOTHING;

-- Espresso Martini (Modern Highball)
INSERT INTO public.notes (id, category, difficulty, time_minutes, servings, image_url, author_id, author_name, is_published, rating, review_count, tags, flavor_bitter, flavor_sweet, flavor_sour, flavor_salty, flavor_umami, flavor_strength, abv)
VALUES 
  ('40000000-0000-0000-0000-000000000008', 'cocktail', 'medium', 5, 1, NULL, '00000000-0000-0000-0000-000000000001', 'Head Bartender Alex', true, 4.9, 76, ARRAY['modern', 'coffee', 'espresso'], 3, 4, 2, 0, 3, 5, 35)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.note_translations (note_id, language, title, description)
VALUES 
  ('40000000-0000-0000-0000-000000000008', 'vi', 'Espresso Martini', 
   'Dick Bradsell sáng tạo tại Soho Brasserie, London năm 1983 cho nữ khách muốn "wake me up then f*** me up".')
ON CONFLICT (note_id, language) DO UPDATE SET 
  title = EXCLUDED.title,
  description = EXCLUDED.description;

INSERT INTO public.note_ingredients (note_id, name, amount, amount_value, unit, sort_order, amount_ml)
VALUES 
  ('40000000-0000-0000-0000-000000000008', 'Vodka', '50ml', 50, 'ml', 1, 50),
  ('40000000-0000-0000-0000-000000000008', 'Espresso tươi', '30ml', 30, 'ml', 2, 30),
  ('40000000-0000-0000-0000-000000000008', 'Coffee liqueur', '10ml', 10, 'ml', 3, 10)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- 5. ADD COLLECTION NOTES (Link notes vào collections)
-- ============================================================

-- Link Classic Cocktails collection với các notes
INSERT INTO public.collection_notes (collection_id, note_id)
VALUES 
  ('30000000-0000-0000-0000-000000000001', '40000000-0000-0000-0000-000000000001'),  -- Old Fashioned
  ('30000000-0000-0000-0000-000000000001', '40000000-0000-0000-0000-000000000002'),  -- Boulevardier
  ('30000000-0000-0000-0000-000000000001', '40000000-0000-0000-0000-000000000003'),  -- Negroni
  ('30000000-0000-0000-0000-000000000001', '40000000-0000-0000-0000-000000000004'),  -- Negroni Sbagliato
  ('30000000-0000-0000-0000-000000000001', '40000000-0000-0000-0000-000000000005'),  -- Whiskey Sour
  ('30000000-0000-0000-0000-000000000001', '40000000-0000-0000-0000-000000000006'),  -- Daiquiri
  ('30000000-0000-0000-0000-000000000001', '40000000-0000-0000-0000-000000000007'),  -- Gin & Tonic
  ('30000000-0000-0000-0000-000000000001', '40000000-0000-0000-0000-000000000008')   -- Espresso Martini
ON CONFLICT DO NOTHING;

-- Link user collection với notes
INSERT INTO public.collection_notes (collection_id, note_id)
VALUES 
  ('20000000-0000-0000-0000-000000000001', '40000000-0000-0000-0000-000000000001'),  -- Old Fashioned → Cocktail Speakeasy
  ('20000000-0000-0000-0000-000000000001', '40000000-0000-0000-0000-000000000002'),  -- Boulevardier → Cocktail Speakeasy
  ('20000000-0000-0000-0000-000000000003', '40000000-0000-0000-0000-000000000003'),  -- Negroni → Cold Brew
  ('20000000-0000-0000-0000-000000000003', '40000000-0000-0000-0000-000000000004')   -- Negroni Sbagliato → Cold Brew
ON CONFLICT DO NOTHING;

-- ============================================================
-- 6. INSERT CATEGORY MAPPINGS (Danh mục)
-- ============================================================

INSERT INTO public.category_mappings (category, group_id, icon, sort_order)
VALUES 
  ('cocktail', '00000000-0000-0000-0000-000000000001', '🍸', 1),
  ('coffee', '00000000-0000-0000-0000-000000000001', '☕', 2),
  ('tea', '00000000-0000-0000-0000-000000000001', '🍵', 3),
  ('juice', '00000000-0000-0000-0000-000000000001', '🧃', 4),
  ('baking', '00000000-0000-0000-0000-000000000001', '🥐', 5)
ON CONFLICT (category) DO NOTHING;
