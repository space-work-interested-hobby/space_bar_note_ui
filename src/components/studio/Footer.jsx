import { useI18n } from '../../i18n';

// ─── Site Footer ─────────────────────────────────────────────────────────────
export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="w-full bg-surface-slate mt-space-2xl">
      <div className="max-w-7xl mx-auto px-gutter py-space-2xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-space-xl mb-space-2xl">
          {/* Col 1: Brand */}
          <div className="md:col-span-1 flex flex-col gap-space-sm">
            <div className="flex items-center gap-2">
              <span className="font-headline-md text-headline-md text-cream-text">Space Bar Note</span>
              <span className="font-label-sm text-label-sm tracking-widest uppercase text-copper-accent">Atelier Spirits &amp; Brew</span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Sổ tay chế tác kinh điển dành cho Bartender nghệ thuật &amp; Barista chiết xuất chính xác. Nơi lưu giữ tỷ lệ hoàn mỹ và tinh thần thức uống thủ công.
            </p>
          </div>

          {/* Col 2: Index */}
          <div className="flex flex-col gap-space-sm">
            <span className="font-label-md text-label-md text-primary tracking-wider uppercase">Mục Lục Kinh Điển</span>
            <ul className="flex flex-col gap-2 font-body-sm text-body-sm text-on-surface-variant">
              <li className="hover:text-on-surface transition-colors cursor-pointer">Signature Cocktails &amp; Highballs</li>
              <li className="hover:text-on-surface transition-colors cursor-pointer">Single Origin Pour-Over (V60, Chemex)</li>
              <li className="hover:text-on-surface transition-colors cursor-pointer">Bản Đồ Cân Bằng Sweet &amp; Sour</li>
              <li className="hover:text-on-surface transition-colors cursor-pointer">Siro &amp; Bitters Tự Nấu (Housemade)</li>
            </ul>
          </div>

          {/* Col 3: Tools */}
          <div className="flex flex-col gap-space-sm">
            <span className="font-label-md text-label-md text-primary tracking-wider uppercase">Công Cụ Trạm Pha</span>
            <ul className="flex flex-col gap-2 font-body-sm text-body-sm text-on-surface-variant">
              <li className="hover:text-on-surface transition-colors cursor-pointer">Bản In Trạm Bar Khổ A4/A5</li>
              <li className="hover:text-on-surface transition-colors cursor-pointer">Quy Đổi Đơn Vị (ml, oz, g, ratio)</li>
              <li className="hover:text-on-surface transition-colors cursor-pointer">Đồng Hồ Chiết Xuất &amp; Khuấy Lạnh</li>
              <li className="hover:text-on-surface transition-colors cursor-pointer">Sổ Tay Kiểm Kê Tủ Rượu &amp; Hạt</li>
            </ul>
          </div>

          {/* Col 4: Responsible */}
          <div className="flex flex-col gap-space-sm">
            <span className="font-label-md text-label-md text-copper-accent tracking-wider uppercase">Thưởng Thức Có Trách Nhiệm</span>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Tôn vinh tinh hoa thủ công, hương vị chiều sâu và nghệ thuật ẩm thực. Xin hãy thưởng thức đồ uống có cồn có trách nhiệm và không lái xe sau khi sử dụng.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-space-lg flex flex-col sm:flex-row items-center justify-between gap-4 font-body-sm text-body-sm text-on-surface-variant border-t border-border-smoky">
          <p>{t('footer.copyright')}</p>
          <div className="flex items-center gap-space-md">
            <span className="hover:text-on-surface transition-colors cursor-pointer">Quy Chuẩn Thao Tác Bar</span>
            <span className="hover:text-on-surface transition-colors cursor-pointer">Chính Sách Bảo Mật Công Thức</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
