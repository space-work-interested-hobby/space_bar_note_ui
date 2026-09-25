export default function EquipmentStation({
  equipment = [],
  onOpenEquipmentLibrary,
}) {
  // Default equipment list
  const defaultEquipment = [
    { name: 'Mixing Glass Pha Lê 550ml', icon: 'countertops' },
    { name: 'Muỗng Bar Spoon Xoắn 40cm', icon: 'architecture' },
    { name: 'Strainer Julep Đồng Cổ', icon: 'filter_alt' },
    { name: 'Đèn Khò Mini Gas Torch', icon: 'local_fire_department' },
  ];

  const equipmentList = equipment.length > 0 ? equipment : defaultEquipment;

  return (
    <div className="p-space-lg rounded-xl bg-surface-slate shadow-sm">
      {/* Card Header */}
      <div className="flex items-center justify-between pb-space-sm">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-copper-accent text-lg">science</span>
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-copper-accent">
            Khí Tài Trạm Bar (Station Equipment)
          </span>
        </div>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onOpenEquipmentLibrary?.();
          }}
          className="font-label-sm text-label-sm text-primary hover:underline"
        >
          Mở Kho Khí Tài
        </a>
      </div>

      {/* Equipment Grid */}
      <div className="grid grid-cols-2 gap-2 pt-space-xs">
        {equipmentList.map((item, index) => (
          <div
            key={item.id || index}
            className="p-2.5 rounded-lg bg-surface-obsidian flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-primary text-base">
              {item.icon || 'build'}
            </span>
            <span className="font-label-sm text-label-sm text-cream-text truncate">
              {item.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
