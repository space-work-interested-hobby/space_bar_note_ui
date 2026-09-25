import { NODE_LEGEND } from '../../data/lineageTrees';

/**
 * Single tree node card
 */
function TreeNode({ node, isRoot = false }) {
  const isCrown = node.nodeType === 'crown';
  const isClassic = node.nodeType === 'classic';
  const isAtelier = node.nodeType === 'atelier';

  const cardClasses = isCrown
    ? 'bg-gradient-to-r from-surface-slate via-surface-container-high to-surface-slate p-7 rounded-2xl shadow-2xl'
    : isRoot
    ? 'bg-surface-slate p-6 rounded-xl shadow-lg'
    : 'bg-surface-slate p-5 rounded-xl shadow-md';

  const borderClass = isCrown
    ? 'ring-1 ring-primary/30'
    : '';

  return (
    <div className={`group relative transition-all duration-300 hover:shadow-2xl ${cardClasses} ${borderClass}`}>
      {/* Era Badge */}
      {node.eraLabel && (
        <div className={`absolute ${isRoot ? '-top-3.5 left-1/2 -translate-x-1/2' : '-top-2 left-4'} bg-primary text-on-primary font-label-sm text-label-sm uppercase px-4 py-0.5 rounded-full shadow-sm tracking-wider font-bold whitespace-nowrap`}>
          {node.eraLabel}
        </div>
      )}

      {/* Crown glow aura */}
      {isCrown && (
        <div className="absolute -right-16 -top-16 w-48 h-48 bg-primary-container/20 rounded-full blur-2xl pointer-events-none" />
      )}

      {/* Crown: full-width content */}
      {isCrown ? (
        <div className="relative z-10 flex flex-col md:flex-row gap-6 items-center">
          <CrownImage node={node} />
          <CrownContent node={node} />
        </div>
      ) : (
        <div className={isRoot ? 'flex flex-col md:flex-row gap-5 items-start md:items-center mt-2' : 'flex flex-col justify-between h-full'}>
          {isRoot && node.imageUrl ? (
            <RootImage node={node} />
          ) : null}
          <NodeContent node={node} isRoot={isRoot} isClassic={isClassic} isAtelier={isAtelier} />
        </div>
      )}
    </div>
  );
}

function RootImage({ node }) {
  return (
    <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-surface-obsidian shadow-inner">
      <img
        className="w-full h-full object-cover"
        src={node.imageUrl}
        alt={node.imageAlt || node.title}
      />
    </div>
  );
}

function CrownImage({ node }) {
  return (
    <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-surface-obsidian shadow-lg">
      <img
        className="w-full h-full object-cover"
        src={node.imageUrl}
        alt={node.imageAlt || node.title}
      />
    </div>
  );
}

function RootContent({ node }) {
  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-1">
        <h2 className="font-headline-lg text-headline-lg text-cream-text">{node.title}</h2>
        {node.abv && (
          <span className="font-label-sm text-label-sm px-2.5 py-1 rounded bg-surface-obsidian text-amber-vibrant">
            {node.abv}
          </span>
        )}
      </div>
      {node.origin && (
        <p className="font-body-sm text-body-sm text-copper-accent flex items-center gap-1 mb-2">
          <span className="material-symbols-outlined text-sm">location_on</span>
          {node.origin}
        </p>
      )}
      {node.baseRatio && (
        <div className="bg-surface-obsidian/70 p-2.5 rounded-lg flex items-center justify-between text-cream-muted font-body-sm text-body-sm">
          <span>
            <strong className="text-cream-text">Tỷ lệ gốc:</strong> {node.baseRatio}
          </span>
        </div>
      )}
    </div>
  );
}

function NodeContent({ node, isRoot, isClassic, isAtelier }) {
  return (
    <div className={isRoot ? 'flex-1' : 'flex flex-col justify-between h-full'}>
      <div>
        {/* Era & Branch Label */}
        <div className="flex items-center justify-between mb-2">
          {!isRoot && node.eraLabel && (
            <span className="px-2.5 py-0.5 rounded-full bg-surface-smoke font-label-sm text-label-sm text-copper-accent uppercase tracking-wider">
              {node.eraLabel}
            </span>
          )}
          {node.branchLabel && (
            <span className="font-label-sm text-label-sm text-cream-muted">{node.branchLabel}</span>
          )}
          {node.icon && (
            <span className="material-symbols-outlined text-copper-accent text-base">{node.icon}</span>
          )}
        </div>

        {/* Title */}
        {isRoot ? (
          <RootContent node={node} />
        ) : (
          <h3 className={`${isAtelier ? 'font-headline-md' : 'font-headline-md'} text-headline-md text-cream-text group-hover:text-primary transition-colors`}>
            {node.title}
          </h3>
        )}

        {/* Description */}
        {!isRoot && node.origin && (
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 mb-3">
            {node.origin}
          </p>
        )}
      </div>

      {/* Recipe / Ingredients */}
      {node.recipe && (
        <div className="bg-surface-obsidian/60 p-3 rounded-lg text-cream-muted font-body-sm text-body-sm">
          <div className="flex items-center gap-1.5 text-cream-text mb-1">
            <span className="material-symbols-outlined text-xs text-amber-vibrant">shuffle</span>
            <span className="font-label-sm text-label-sm uppercase">Đột biến hương vị:</span>
          </div>
          <p className="text-body-sm">{node.recipe}</p>
        </div>
      )}

      {/* Simple ingredient line for atelier nodes */}
      {!node.recipe && node.specs && (
        <div className="bg-surface-smoke/40 p-2.5 rounded-lg text-on-surface-variant font-body-sm text-body-sm mt-2">
          {node.specs.spirit}
        </div>
      )}
    </div>
  );
}

function CrownContent({ node }) {
  return (
    <div className="flex-1 text-center md:text-left">
      <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
        <span className="px-3 py-1 rounded-full bg-primary text-on-primary font-label-sm text-label-sm font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-surface-obsidian animate-ping" />
          {node.servingTag}
        </span>
        {node.code && (
          <span className="font-label-sm text-label-sm text-copper-accent">{node.code}</span>
        )}
      </div>
      <h3 className="font-headline-lg text-headline-lg text-cream-text">{node.title}</h3>
      <p className="font-body-md text-body-md text-on-surface-variant mt-1 mb-4 leading-relaxed">
        {node.origin}
      </p>
      <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
        {node.actions?.map((action, i) => (
          <button
            key={i}
            className={`px-5 py-2.5 rounded-lg font-label-md text-label-md flex items-center gap-2 shadow-md transition-all ${
              action.primary
                ? 'bg-primary-container text-on-primary-container hover:bg-tertiary-container'
                : 'bg-surface-smoke text-cream-text hover:bg-surface-bright'
            }`}
          >
            <span className="material-symbols-outlined text-base">{action.icon}</span>
            <span>{action.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * Vertical connector line between levels
 */
function Connector({ height = 'h-14', fromColor = 'from-primary', toColor = 'to-surface-smoke' }) {
  return <div className={`w-0.5 ${height} bg-gradient-to-b ${fromColor} ${toColor}`} />;
}

function HorizontalFork({ count = 3 }) {
  return (
    <div className={`w-[84%] h-0.5 bg-surface-smoke relative`}>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-copper-accent"
          style={{ left: count === 3 ? `${(i * 50)}%` : `${(i * (100 / (count - 1)))}%` }}
        />
      ))}
    </div>
  );
}

/**
 * Vertical stem from fork to each column
 */
function StemToColumn() {
  return <div className="w-0.5 h-6 bg-surface-smoke mb-2" />;
}

/**
 * Stem from a Level 2 node down to Level 3
 */
function StemToCrown() {
  return <div className="w-0.5 h-12 bg-gradient-to-b from-surface-smoke to-primary mt-2" />;
}

/**
 * The full interactive Lineage Tree canvas
 */
export default function LineageTree({ tree }) {
  const levels = tree.levels || [];

  return (
    <div className="relative bg-surface-obsidian rounded-2xl p-6 lg:p-10 shadow-xl overflow-x-auto">
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50"
        style={{
          backgroundImage:
            'radial-gradient(rgba(245,179,66,0.04)_1px,transparent_1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Canvas Header */}
      <div className="relative z-10 flex items-center justify-between pb-8 mb-6">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-amber-vibrant animate-ping" />
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary">
            Sơ Đồ Di Truyền Hương Vị (Phả Hệ Trực Quan)
          </span>
        </div>
        <TreeLegend />
      </div>

      {/* Node Hierarchy */}
      <div className="relative min-w-[960px] flex flex-col gap-16">
        {levels.map((level, levelIndex) => (
          <LevelRow
            key={level.id}
            level={level}
            levelIndex={levelIndex}
            totalLevels={levels.length}
            isFirst={levelIndex === 0}
            isLast={levelIndex === levels.length - 1}
            tree={tree}
          />
        ))}
      </div>
    </div>
  );
}

function LevelRow({ level, levelIndex, isFirst, isLast, tree }) {
  const nodes = level.nodes || [];
  const isRoot = level.level === 0;
  const isCrown = level.level === 3;

  if (isRoot) {
    return (
      <div className="flex flex-col items-center justify-center relative">
        {nodes.map((node) => (
          <TreeNode key={node.id} node={node} isRoot />
        ))}
        {/* Trunk + Fork */}
        <Connector height="h-14" fromColor="from-primary" toColor="to-copper-accent" />
        <HorizontalFork count={nodes.length > 0 && tree.levels[1] ? tree.levels[1].nodes.length : 3} />
      </div>
    );
  }

  if (isCrown) {
    // Crown node: full-width centered
    return (
      <div className="flex flex-col items-center relative">
        {nodes.map((node) => (
          <TreeNode key={node.id} node={node} />
        ))}
      </div>
    );
  }

  // Level 1 and Level 2: grid of columns
  const gridClass =
    nodes.length === 3 ? 'grid-cols-3' : nodes.length === 2 ? 'grid-cols-2' : 'grid-cols-1';

  return (
    <div className={`grid ${gridClass} gap-6 relative pt-2`}>
      {nodes.map((node, nodeIndex) => (
        <div key={node.id} className="flex flex-col items-center">
          {/* Stem from fork */}
          {levelIndex === 1 && <StemToColumn />}

          {/* Node card */}
          <TreeNode node={node} />

          {/* Stem to next level */}
          {isLast ? null : <StemToCrown />}
        </div>
      ))}
    </div>
  );
}

function TreeLegend({ legend = NODE_LEGEND }) {
  return (
    <div className="flex items-center gap-4 text-cream-muted font-body-sm text-body-sm">
      {legend.map((item) => (
        <span key={item.label} className="flex items-center gap-1.5">
          <span className={`w-3 h-3 rounded ${item.color} inline-block`} />
          {item.label}
        </span>
      ))}
    </div>
  );
}
