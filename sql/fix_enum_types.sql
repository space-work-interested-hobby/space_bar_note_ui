-- ============================================================
-- FIX ENUM TYPES - Thêm các giá trị thiếu vào enum types
-- ============================================================

-- ============================================================
-- 1. Thêm difficulty values
-- ============================================================
DO $$
BEGIN
    ALTER TYPE difficulty ADD VALUE 'easy';
EXCEPTION 
    WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
    ALTER TYPE difficulty ADD VALUE 'medium';
EXCEPTION 
    WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
    ALTER TYPE difficulty ADD VALUE 'hard';
EXCEPTION 
    WHEN duplicate_object THEN NULL;
END $$;

-- ============================================================
-- 2. Thêm note_category values
-- ============================================================
DO $$
BEGIN
    ALTER TYPE note_category ADD VALUE 'coffee';
EXCEPTION 
    WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
    ALTER TYPE note_category ADD VALUE 'tea';
EXCEPTION 
    WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
    ALTER TYPE note_category ADD VALUE 'juice';
EXCEPTION 
    WHEN duplicate_object THEN NULL;
END $$;

DO $$
BEGIN
    ALTER TYPE note_category ADD VALUE 'baking';
EXCEPTION 
    WHEN duplicate_object THEN NULL;
END $$;

-- ============================================================
-- 3. Thêm serving_unit values (BỘ ĐẦY ĐỦ)
-- ============================================================

-- English units
DO $$
BEGIN ALTER TYPE serving_unit ADD VALUE 'dashes'; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$
BEGIN ALTER TYPE serving_unit ADD VALUE 'drops'; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$
BEGIN ALTER TYPE serving_unit ADD VALUE 'splash'; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$
BEGIN ALTER TYPE serving_unit ADD VALUE 'pinch'; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$
BEGIN ALTER TYPE serving_unit ADD VALUE 'tsp'; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$
BEGIN ALTER TYPE serving_unit ADD VALUE 'tbsp'; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$
BEGIN ALTER TYPE serving_unit ADD VALUE 'barspoon'; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$
BEGIN ALTER TYPE serving_unit ADD VALUE 'slice'; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$
BEGIN ALTER TYPE serving_unit ADD VALUE 'piece'; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$
BEGIN ALTER TYPE serving_unit ADD VALUE 'wedge'; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$
BEGIN ALTER TYPE serving_unit ADD VALUE 'sprig'; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$
BEGIN ALTER TYPE serving_unit ADD VALUE 'leaf'; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$
BEGIN ALTER TYPE serving_unit ADD VALUE 'strip'; EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Vietnamese units
DO $$
BEGIN ALTER TYPE serving_unit ADD VALUE 'viên'; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$
BEGIN ALTER TYPE serving_unit ADD VALUE 'lát'; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$
BEGIN ALTER TYPE serving_unit ADD VALUE 'miếng'; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$
BEGIN ALTER TYPE serving_unit ADD VALUE 'sợi'; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$
BEGIN ALTER TYPE serving_unit ADD VALUE 'lớp'; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$
BEGIN ALTER TYPE serving_unit ADD VALUE 'cái'; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$
BEGIN ALTER TYPE serving_unit ADD VALUE 'quả'; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$
BEGIN ALTER TYPE serving_unit ADD VALUE 'nhánh'; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$
BEGIN ALTER TYPE serving_unit ADD VALUE 'lá'; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$
BEGIN ALTER TYPE serving_unit ADD VALUE 'que'; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$
BEGIN ALTER TYPE serving_unit ADD VALUE 'cuốn'; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$
BEGIN ALTER TYPE serving_unit ADD VALUE 'tán'; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$
BEGIN ALTER TYPE serving_unit ADD VALUE 'nửa'; EXCEPTION WHEN duplicate_object THEN NULL; END $$;
DO $$
BEGIN ALTER TYPE serving_unit ADD VALUE 'đôi'; EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- ============================================================
-- Xác nhận
-- ============================================================
SELECT '✓ Enum Fix Complete!' as status;
