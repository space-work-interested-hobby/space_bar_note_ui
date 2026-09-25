import { useI18n } from '../../i18n';
import { StudioCard, StudioIcon, EquipmentChip, StudioButton } from './StudioUtils';

// ─── Equipment Card ─────────────────────────────────────────────────────────
export default function StudioEquipmentCard({ data, onChange }) {
  const { t } = useI18n();

  return (
    <StudioCard icon="science" iconColor="text-copper-accent" title={t('studio.equipmentTitle')}>
      <div className="grid grid-cols-2 gap-2">
        {(data.equipment || []).map((eq) => (
          <EquipmentChip key={eq.id} name={eq.name} icon={eq.icon} />
        ))}
        {(!data.equipment || data.equipment.length === 0) && (
          <p className="col-span-2 text-center text-cream-muted font-body-sm py-4">
            Chưa có dụng cụ nào được chọn
          </p>
        )}
      </div>
      <div className="mt-space-sm">
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); /* TODO: open equipment vault */ }}
          className="font-label-sm text-label-sm text-primary hover:underline"
        >
          {t('studio.openEquipmentVault')}
        </a>
      </div>
    </StudioCard>
  );
}
