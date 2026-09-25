import { useI18n } from '../../i18n';

// ─── Icon helper: renders a Material Symbols icon ───────────────────────────
export function StudioIcon({ name, className = '' }) {
  return (
    <span className={`material-symbols-outlined ${className}`}>
      {name}
    </span>
  );
}

// ─── Difficulty stars ───────────────────────────────────────────────────────
export function DifficultyStars({ value = 3, max = 5 }) {
  const { t } = useI18n();
  return (
    <div className="flex items-center gap-1 text-primary">
      {Array.from({ length: max }, (_, i) => (
        <StudioIcon
          key={i}
          name="star"
          className={`text-sm ${i < value ? 'text-primary' : 'text-surface-smoke'}`}
        />
      ))}
      <span className="font-label-md text-label-md font-medium text-cream-text ml-1">
        {t(`studio.difficultyLevels.${value}`)}
      </span>
    </div>
  );
}

// ─── Flavor Bar ──────────────────────────────────────────────────────────────
export function FlavorBar({ label, value, colorClass = 'bg-primary' }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between font-label-sm text-label-sm">
        <span className="text-cream-text">{label}</span>
        <span className="text-amber-vibrant font-semibold">{value}%</span>
      </div>
      <div className="w-full h-1.5 rounded-full bg-surface-smoke overflow-hidden">
        <div className={`h-full rounded-full ${colorClass}`} style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

// ─── Glass Icon ─────────────────────────────────────────────────────────────
export function GlassIcon({ name, className = '' }) {
  return <StudioIcon name={name} className={`text-primary text-xl ${className}`} />;
}

// ─── Card wrapper ───────────────────────────────────────────────────────────
export function StudioCard({ icon, iconColor = 'text-primary', title, badge, badgeColor, children, className = '' }) {
  return (
    <div className={`p-space-lg rounded-xl bg-surface-slate shadow-sm ${className}`}>
      <div className="flex items-center justify-between pb-space-sm">
        <div className="flex items-center gap-2">
          <StudioIcon name={icon} className={`${iconColor} text-lg`} />
          <span className={`font-label-sm text-label-sm uppercase tracking-widest ${iconColor}`}>
            {title}
          </span>
        </div>
        {badge && (
          <span className="font-label-sm text-label-sm text-cream-muted">{badge}</span>
        )}
      </div>
      <div className="pt-space-xs">
        {children}
      </div>
    </div>
  );
}

// ─── Form field wrappers ────────────────────────────────────────────────────
export function StudioField({ label, className = '', children }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label className="font-label-sm text-label-sm text-cream-muted uppercase tracking-wider">
          {label}
        </label>
      )}
      {children}
    </div>
  );
}

export function StudioInput({ value, onChange, placeholder, className = '', type = 'text' }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full bg-surface-obsidian text-cream-text font-body-md text-body-md px-4 py-2 rounded-lg placeholder:text-outline-variant focus:outline-none focus:ring-1 focus:ring-primary-container transition-all ${className}`}
    />
  );
}

export function StudioTextarea({ value, onChange, placeholder, rows = 3, className = '' }) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      className={`w-full bg-surface-obsidian text-cream-text font-headline-md text-headline-md italic px-4 py-3 rounded-lg placeholder:text-outline-variant focus:outline-none focus:ring-1 focus:ring-primary-container transition-all resize-none ${className}`}
    />
  );
}

export function StudioSelect({ value, onChange, options, icon, className = '' }) {
  return (
    <div className="flex items-center gap-2 p-2.5 rounded-lg bg-surface-obsidian">
      {icon && <GlassIcon name={icon} />}
      <select
        value={value}
        onChange={onChange}
        className={`w-full bg-transparent text-cream-text font-body-md text-body-md focus:outline-none ${className}`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-surface-slate text-cream-text">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// ─── Category Pill Buttons ───────────────────────────────────────────────────
export function CategoryPills({ options, selected, onSelect }) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onSelect(opt.value)}
          className={`px-3.5 py-1.5 rounded-full font-label-md text-label-md font-medium transition-colors ${
            selected === opt.value
              ? 'bg-primary-container text-on-primary-container shadow-sm'
              : 'bg-surface-smoke hover:bg-surface-container-high text-on-surface-variant'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

// ─── Metric Grid Item ───────────────────────────────────────────────────────
export function MetricCell({ label, value, icon }) {
  return (
    <div className="p-3 rounded-lg bg-surface-obsidian flex flex-col gap-1">
      <span className="font-label-sm text-label-sm text-cream-muted uppercase">{label}</span>
      <div className="flex items-center gap-1">
        {icon && <StudioIcon name={icon} className="text-sm text-primary" />}
        <span className="font-label-md text-label-md text-cream-text">{value}</span>
      </div>
    </div>
  );
}

// ─── Studio Button ───────────────────────────────────────────────────────────
export function StudioButton({ icon, label, variant = 'secondary', onClick, className = '', type = 'button' }) {
  const variants = {
    primary: 'bg-primary-container hover:bg-tertiary-container text-on-primary-container font-semibold shadow-md',
    secondary: 'bg-surface-slate hover:bg-surface-smoke text-cream-text shadow-sm',
    ghost: 'bg-surface-smoke hover:bg-surface-container-high text-primary',
    outline: 'bg-transparent border border-outline-variant hover:border-primary-container text-cream-text',
  };
  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg font-label-md text-label-md transition-all shadow-sm hover:shadow-md active:scale-95 ${variants[variant]} ${className}`}
    >
      {icon && <StudioIcon name={icon} className="text-base" />}
      <span>{label}</span>
    </button>
  );
}

// ─── Equipment Chip ─────────────────────────────────────────────────────────
export function EquipmentChip({ name, icon }) {
  return (
    <div className="p-2.5 rounded-lg bg-surface-obsidian flex items-center gap-2">
      <StudioIcon name={icon} className="text-primary text-base" />
      <span className="font-label-sm text-label-sm text-cream-text">{name}</span>
    </div>
  );
}

// ─── Step Card ───────────────────────────────────────────────────────────────
export function StepCard({ step, isHighlighted, children }) {
  return (
    <div
      className={`p-3 rounded-lg flex flex-col gap-1.5 ${
        isHighlighted ? 'bg-surface-container-high' : 'bg-surface-obsidian'
      }`}
    >
      {children}
    </div>
  );
}

// ─── Timer Trigger ──────────────────────────────────────────────────────────
export function TimerTrigger({ seconds, isActive, onStart }) {
  const { t } = useI18n();
  return (
    <div className="ml-8 p-3 rounded-lg bg-surface-obsidian flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bar-mode-step text-base">
          {seconds}s
        </div>
        <div className="flex flex-col">
          <span className="font-label-sm text-label-sm text-cream-text">
            {t('studio.stepTimerDesc')}
          </span>
          <span className="font-body-sm text-body-sm text-amber-vibrant">
            {t('studio.stepTimerHint')}
          </span>
        </div>
      </div>
      <button
        onClick={onStart}
        className="px-3 py-1.5 rounded-lg bg-primary-container text-on-primary-container font-label-sm text-label-sm font-semibold hover:bg-tertiary-container transition-colors"
      >
        {isActive ? '■ ' : ''}{t('studio.startTimer')}
      </button>
    </div>
  );
}

// ─── Ingredient Row ─────────────────────────────────────────────────────────
export function IngredientRow({ ingredient, onChange, onRemove }) {
  return (
    <div className="p-3 rounded-lg bg-surface-obsidian flex items-center justify-between gap-2">
      <div className="flex items-center gap-2.5 min-w-0">
        <StudioIcon name="drag_indicator" className="text-copper-accent text-lg shrink-0" />
        <div className="flex flex-col min-w-0">
          <span className="font-label-md text-label-md text-cream-text truncate font-semibold">
            {ingredient.name}
          </span>
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            {ingredient.role} • {ingredient.subLabel}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <span className="font-headline-md text-headline-md text-primary font-bold">
          {ingredient.amount}
        </span>
        <span className="font-label-sm text-label-sm text-cream-muted">{ingredient.unit}</span>
      </div>
    </div>
  );
}
