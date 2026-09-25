import { useI18n } from '../../i18n';

/**
 * ProfileHeader Component
 * Displays user profile banner, avatar, bio, metrics, and action buttons
 */
export default function ProfileHeader({ user }) {
  const { t } = useI18n();

  const handleEditProfile = () => {
    console.log('Edit profile clicked');
    // TODO: Open edit profile modal
  };

  const handleShareProfile = () => {
    console.log('Share profile clicked');
    // TODO: Implement share functionality
  };

  const handleExportPortfolio = () => {
    console.log('Export portfolio clicked');
    // TODO: Generate and download PDF portfolio
  };

  return (
    <section className="relative bg-surface-slate rounded-xl p-space-lg lg:p-space-xl shadow-xl">
      <div className="flex flex-col lg:flex-row items-start lg:items-center gap-space-xl">
        {/* Portrait Avatar with Verification Seal */}
        <div className="relative shrink-0 mx-auto lg:mx-0">
          <div className="relative w-36 h-36 lg:w-44 lg:h-44 rounded-xl overflow-hidden shadow-2xl bg-surface-obsidian">
            <img
              alt={`${user.name} - ${user.title}`}
              className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
              src={user.avatar}
            />
          </div>
          
          {/* Verification Seal */}
          <div className="absolute -bottom-3 -right-3 bg-gradient-to-br from-primary-container via-tertiary-container to-copper-accent p-0.5 rounded-lg shadow-lg">
            <div className="bg-surface-obsidian px-2.5 py-1 rounded-md flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-base" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified
              </span>
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary">
                {user.verificationLevel}
              </span>
            </div>
          </div>
        </div>

        {/* Master Profile Bio & Details */}
        <div className="flex-1 flex flex-col gap-space-sm min-w-0">
          {/* Name & Badges */}
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-headline-lg text-headline-lg text-cream-text tracking-tight">
              {user.name}
            </h1>
            <span className="font-body-sm text-body-sm text-on-surface-variant font-mono">
              @{user.username}
            </span>
            {user.isVerified && (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-smoke rounded-full">
                <span className="material-symbols-outlined text-copper-accent text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                  workspace_premium
                </span>
                <span className="font-label-sm text-label-sm uppercase text-copper-accent tracking-wider">
                  Atelier Verified Master
                </span>
              </div>
            )}
          </div>

          {/* Title */}
          <p className="font-label-md text-label-md text-primary tracking-wide">
            {user.title}
          </p>

          {/* Bio */}
          <p className="font-body-md text-body-md text-cream-muted leading-relaxed max-w-3xl">
            {user.bio}
          </p>

          {/* Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-space-xs max-w-2xl">
            {/* Recipes */}
            <div className="bg-surface-obsidian/70 rounded-lg p-3 flex flex-col">
              <span className="font-bar-mode-metric text-headline-md text-primary font-bold">
                {user.metrics.recipes}
              </span>
              <span className="font-label-sm text-label-sm uppercase text-on-surface-variant tracking-wider">
                {t('profile.metrics.recipes')}
              </span>
            </div>

            {/* Saves */}
            <div className="bg-surface-obsidian/70 rounded-lg p-3 flex flex-col">
              <span className="font-bar-mode-metric text-headline-md text-cream-text font-bold">
                {user.metrics.saves}
              </span>
              <span className="font-label-sm text-label-sm uppercase text-on-surface-variant tracking-wider">
                {t('profile.metrics.saves')}
              </span>
            </div>

            {/* Followers */}
            <div className="bg-surface-obsidian/70 rounded-lg p-3 flex flex-col">
              <span className="font-bar-mode-metric text-headline-md text-cream-text font-bold">
                {user.metrics.followers}
              </span>
              <span className="font-label-sm text-label-sm uppercase text-on-surface-variant tracking-wider">
                {t('profile.metrics.followers')}
              </span>
            </div>

            {/* Following */}
            <div className="bg-surface-obsidian/70 rounded-lg p-3 flex flex-col">
              <span className="font-bar-mode-metric text-headline-md text-cream-text font-bold">
                {user.metrics.following}
              </span>
              <span className="font-label-sm text-label-sm uppercase text-on-surface-variant tracking-wider">
                {t('profile.metrics.following')}
              </span>
            </div>

            {/* Completion Rate */}
            <div className="bg-surface-obsidian/70 rounded-lg p-3 flex flex-col col-span-2 sm:col-span-1">
              <div className="flex items-baseline justify-between">
                <span className="font-bar-mode-metric text-headline-md text-copper-accent font-bold">
                  {user.metrics.completionRate}%
                </span>
                <span className="material-symbols-outlined text-copper-accent text-sm">
                  tune
                </span>
              </div>
              <span className="font-label-sm text-label-sm uppercase text-on-surface-variant tracking-wider">
                {t('profile.metrics.completion')}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons Deck */}
        <div className="flex flex-row lg:flex-col gap-2.5 w-full lg:w-auto shrink-0 self-stretch lg:self-center justify-end">
          <button
            onClick={handleEditProfile}
            className="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 bg-primary-container text-on-primary-container px-4 py-2.5 rounded-lg font-label-md text-label-md hover:bg-tertiary-container hover:text-on-tertiary-container shadow-md transition-all active:scale-95"
            id="btn-edit-profile"
          >
            <span className="material-symbols-outlined text-base">edit</span>
            <span>{t('profile.actions.editProfile')}</span>
          </button>

          <button
            onClick={handleShareProfile}
            className="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 bg-surface-smoke text-cream-text px-4 py-2.5 rounded-lg font-label-md text-label-md hover:bg-surface-bright transition-all active:scale-95"
            id="btn-share-profile"
          >
            <span className="material-symbols-outlined text-base">share</span>
            <span>{t('profile.actions.sharePage')}</span>
          </button>

          <button
            onClick={handleExportPortfolio}
            className="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 bg-transparent text-copper-accent hover:bg-copper-accent/10 px-4 py-2 rounded-lg font-label-md text-label-md transition-all"
            id="btn-export-cv"
          >
            <span className="material-symbols-outlined text-base">picture_as_pdf</span>
            <span>{t('profile.actions.exportPortfolio')}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
