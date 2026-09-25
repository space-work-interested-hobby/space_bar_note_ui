import { useState } from 'react';

export default function IngredientMatrix({
  ingredients = [],
  scale = 1,
  flavorProfile = {
    spiritBackbone: 82,
    sweetness: 45,
    bitterBotanicals: 68,
    smokyExotic: 75,
  },
  unitSystem = 'ml',
  onIngredientsChange,
  onScaleChange,
  onFlavorProfileChange,
  onUnitSystemChange,
}) {
  const [isEditing, setIsEditing] = useState(false);

  // Convert ml to oz if needed
  const convertUnit = (mlValue, unit) => {
    if (unit === 'oz') return (mlValue / 29.5735).toFixed(1);
    if (unit === 'dash') return Math.round(mlValue / 0.625);
    return mlValue;
  };

  const getUnitLabel = (unit, baseUnit) => {
    if (unit === 'oz') return 'oz';
    if (unit === 'dash') return 'dash';
    return baseUnit || 'ml';
  };

  return (
    <div className="p-space-lg rounded-xl bg-surface-slate shadow-sm">
      {/* Card Header */}
      <div className="flex items-center justify-between pb-space-sm">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-lg">tune</span>
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary">
            Nguyên Liệu &amp; Tỷ Lệ Chiết Xuất
          </span>
        </div>

        {/* Unit Toggle */}
        <div className="flex items-center gap-1 bg-surface-obsidian p-1 rounded-lg">
          {['ml', 'oz', 'dash'].map((unit) => (
            <button
              key={unit}
              onClick={() => onUnitSystemChange?.(unit)}
              className={`px-2 py-0.5 rounded font-label-sm text-label-sm transition-colors ${
                unitSystem === unit
                  ? 'bg-surface-smoke text-primary font-semibold'
                  : 'text-on-surface-variant hover:text-cream-text'
              }`}
            >
              {unit}
            </button>
          ))}
        </div>
      </div>

      {/* Serving Scale Stepper */}
      <div className="flex items-center justify-between p-3 rounded-lg bg-surface-obsidian mb-space-md">
        <div className="flex flex-col">
          <span className="font-label-sm text-label-sm text-cream-muted uppercase">
            Quy Mô Phục Vụ (Batch Scale)
          </span>
          <span className="font-headline-md text-headline-md text-cream-text">
            {scale === 1 ? 'Chuẩn 1 Ly Phục Vụ (Single Pour)' : `${scale}x Multi-Pour`}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          {[1, 2, 4].map((n) => (
            <button
              key={n}
              onClick={() => onScaleChange?.(n)}
              className={`w-8 h-8 rounded font-label-sm text-label-sm font-bold transition-colors ${
                scale === n
                  ? 'bg-primary-container text-on-primary-container'
                  : 'bg-surface-smoke text-cream-muted hover:text-cream-text'
              }`}
            >
              {n}x
            </button>
          ))}
          <button
            onClick={() => onScaleChange?.(10)}
            className={`px-2 h-8 rounded font-label-sm text-label-sm transition-colors ${
              scale === 10
                ? 'bg-primary-container text-on-primary-container'
                : 'bg-surface-smoke text-cream-muted hover:text-cream-text'
            }`}
          >
            Batch 10x
          </button>
        </div>
      </div>

      {/* Ingredient Rows */}
      <div className="flex flex-col gap-2.5">
        {ingredients.map((ingredient, index) => (
          <div
            key={ingredient.id || index}
            className="p-3 rounded-lg bg-surface-obsidian flex items-center justify-between gap-2"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="material-symbols-outlined text-copper-accent text-lg shrink-0 cursor-grab">
                drag_indicator
              </span>
              <div className="flex flex-col min-w-0">
                <span className="font-label-md text-label-md text-cream-text truncate font-semibold">
                  {ingredient.name}
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  {ingredient.role}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="font-headline-md text-headline-md text-primary font-bold">
                {convertUnit(ingredient.amount * scale, unitSystem)}
              </span>
              <span className="font-label-sm text-label-sm text-cream-muted">
                {ingredient.unit ? getUnitLabel(unitSystem, ingredient.unit) : getUnitLabel(unitSystem)}
              </span>
            </div>
          </div>
        ))}

        {/* Add Ingredient Button */}
        <button
          onClick={() => {
            const newIngredient = {
              id: Date.now(),
              name: 'Nguyên Liệu Mới',
              amount: 30,
              unit: 'ml',
              role: 'Thành phần bổ sung',
            };
            onIngredientsChange?.([...ingredients, newIngredient]);
          }}
          className="w-full py-2.5 rounded-lg bg-surface-smoke hover:bg-surface-container-high text-primary font-label-md text-label-md flex items-center justify-center gap-2 transition-colors"
        >
          <span className="material-symbols-outlined text-lg">add_circle_outline</span>
          <span>Thêm Nguyên Liệu / Tinh Dầu Mới</span>
        </button>
      </div>

      {/* Flavor Balance Bars */}
      <div className="mt-space-md p-4 rounded-lg bg-surface-obsidian flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="font-label-sm text-label-sm text-copper-accent uppercase tracking-widest">
            Ma Trận Cân Bằng Hương Vị (Sensory Matrix)
          </span>
          <span className="font-label-sm text-label-sm text-cream-muted">Tự Động Phân Tích</span>
        </div>

        <div className="flex flex-col gap-2">
          {/* Spirit Backbone */}
          <div className="flex items-center justify-between font-label-sm text-label-sm">
            <span className="text-cream-text">Độ Mạnh Cồn (Spirit Backbone)</span>
            <span className="text-amber-vibrant font-semibold">{flavorProfile.spiritBackbone}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-surface-smoke overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${flavorProfile.spiritBackbone}%` }}
            ></div>
          </div>

          {/* Sweetness */}
          <div className="flex items-center justify-between font-label-sm text-label-sm pt-1">
            <span className="text-cream-text">Độ Ngọt Hậu (Sweetness / Vermouth)</span>
            <span className="text-amber-vibrant font-semibold">{flavorProfile.sweetness}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-surface-smoke overflow-hidden">
            <div
              className="h-full bg-copper-accent rounded-full transition-all duration-500"
              style={{ width: `${flavorProfile.sweetness}%` }}
            ></div>
          </div>

          {/* Bitter / Botanicals */}
          <div className="flex items-center justify-between font-label-sm text-label-sm pt-1">
            <span className="text-cream-text">Độ Đắng &amp; Thảo Mộc (Bitter / Botanicals)</span>
            <span className="text-amber-vibrant font-semibold">{flavorProfile.bitterBotanicals}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-surface-smoke overflow-hidden">
            <div
              className="h-full bg-amber-vibrant rounded-full transition-all duration-500"
              style={{ width: `${flavorProfile.bitterBotanicals}%` }}
            ></div>
          </div>

          {/* Smoky / Exotic Spice */}
          <div className="flex items-center justify-between font-label-sm text-label-sm pt-1">
            <span className="text-cream-text">Hương Khói &amp; Saffron (Smoky / Exotic Spice)</span>
            <span className="text-amber-vibrant font-semibold">{flavorProfile.smokyExotic}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-surface-smoke overflow-hidden">
            <div
              className="h-full bg-primary-container rounded-full transition-all duration-500"
              style={{ width: `${flavorProfile.smokyExotic}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
