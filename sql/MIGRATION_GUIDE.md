# Hướng Dẫn Chạy Migration

## ⚠️ QUAN TRỌNG: Thứ tự chạy

**Phải chạy theo đúng thứ tự:**

1. **`sql/fix_enum_types.sql`** ← CHẠY ĐẦU TIÊN
2. `sql/migrate_mock_data.sql`
3. `sql/migrate_lineage_trees.sql`

---

## Các File SQL

| File | Mô tả | Thứ tự |
|------|--------|--------|
| `fix_enum_types.sql` | Thêm các giá trị enum thiếu (easy, medium, hard, coffee, tea...) | **1** |
| `migrate_mock_data.sql` | Profiles, Notes, Collections cơ bản | **2** |
| `migrate_lineage_trees.sql` | Cây phả hệ cocktail đầy đủ | **3** |

---

## Lỗi Thường Gặp

### Lỗi "unsafe use of new value"
```
ERROR: unsafe use of new value "medium" of enum type difficulty
```
→ **Nguyên nhân:** Chưa thêm giá trị enum vào database
→ **Cách fix:** Chạy `fix_enum_types.sql` TRƯỚC

1. **Truy cập Supabase Dashboard**
   - Mở: https://supabase.com/dashboard
   - Chọn project `qwfpbrskynoefqwigedc`

2. **Mở SQL Editor**
   - Menu bên trái → **SQL Editor**
   - Tạo query mới (+ New Query)

3. **Copy & Paste nội dung**
   - Copy toàn bộ nội dung file `sql/migrate_mock_data.sql`
   - Paste vào SQL Editor

4. **Chạy SQL**
   - Click **Run** (hoặc phím tắt `Ctrl + Enter`)

5. **Kiểm tra kết quả**
   - Chạy các câu query kiểm tra ở cuối file

---

## Cách 2: Sử dụng Supabase CLI

```bash
# Cài đặt Supabase CLI nếu chưa có
npm install -g supabase

# Login vào Supabase
supabase login

# Link project
supabase link --project-ref qwfpbrskynoefqwigedc

# Chạy migration
supabase db push
```

---

## Kiểm Tra Sau Khi Migration

Chạy các câu query sau để xác nhận dữ liệu đã được insert:

```sql
-- Kiểm tra số lượng records
SELECT 'Profiles' as table_name, COUNT(*) as count FROM public.profiles
UNION ALL
SELECT 'Notes', COUNT(*) FROM public.notes
UNION ALL
SELECT 'Collections', COUNT(*) FROM public.collections
UNION ALL
SELECT 'Collection Notes', COUNT(*) FROM public.collection_notes;

-- Xem chi tiết notes
SELECT n.id, nt.title, n.category 
FROM public.notes n
LEFT JOIN public.note_translations nt ON n.id = nt.note_id
ORDER BY n.created_at DESC;

-- Xem collections
SELECT c.id, ct.title, c.is_system, c.is_public
FROM public.collections c
LEFT JOIN public.collection_translations ct ON c.id = ct.collection_id;
```

---

## Dữ Liệu Đã Được Insert

### 1. migrate_mock_data.sql

| Bảng | Số lượng |
|------|----------|
| **Profiles** | 4 người dùng (Alex, Hélène, Thảo Nhi, Minh Quân) |
| **Notes** | 11 công thức (Negroni, Old Fashioned, Coffee...) |
| **Collections** | 6 bộ sưu tập |
| **Collection Notes** | 12 liên kết |
| **Note Translations** | Tiêu đề & mô tả tiếng Việt |
| **Note Ingredients** | Nguyên liệu cho từng công thức |

### 2. migrate_lineage_trees.sql (Cây Phả Hệ Đầy Đủ)

| Dòng Cocktail | Root | Riffs | Modern | Crown |
|--------------|------|-------|--------|-------|
| **Old Fashioned** | Classic OF (1884) | Boulevardier, Vieux Carré, Sazerac | Left Hand, Oaxaca OF | Midnight Saffron (2025) |
| **Negroni** | Classic Negroni (1919) | Sbagliato, White Negroni | - | Charred Cedar (2025) |
| **Sour** | Whiskey Sour (1872) | Daiquiri | Clarified Milk Punch | Yuzu Cloud (2025) |
| **Highball** | Whisky Highball (1900) | Gin & Tonic, Espresso Martini | - | Kyoto Fizz (2025) |

**Tổng cộng:** 18 notes lineage với đầy đủ thông tin story, ratio, và metadata.

---

## Sau Khi Migration Thành Công

1. **Refresh lại ứng dụng web** - Dữ liệu thật sẽ được load thay vì mock data
2. **Kiểm tra các trang**:
   - Trang Notes: Hiển thị 11 công thức thật
   - Trang Collections: Hiển thị 6 bộ sưu tập
   - Trang Lineage: Hiển thị cây phả hệ cocktail

---

## Xử Lý Lỗi Thường Gặp

### Lỗi: "duplicate key"
→ Bình thường, script dùng `ON CONFLICT DO NOTHING` để skip các records đã tồn tại

### Lỗi: "foreign key constraint"
→ Kiểm tra thứ tự insert - profiles phải insert trước notes

### Lỗi: "permission denied"
→ Cần quyền admin hoặcRLS policy cho phép insert

---

## Rollback (Xóa dữ liệu test)

```sql
-- Xóa theo thứ tự ngược lại (foreign keys)
DELETE FROM public.collection_notes;
DELETE FROM public.note_ingredients;
DELETE FROM public.note_translations;
DELETE FROM public.collections;
DELETE FROM public.collection_translations;
DELETE FROM public.notes;
DELETE FROM public.profiles;
```
