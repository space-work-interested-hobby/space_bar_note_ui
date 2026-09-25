import { useState } from 'react';
import { useI18n } from '../../i18n';
import {
  StudioCard, StudioIcon, StudioButton, StepCard, TimerTrigger,
} from './StudioUtils';

// ─── Steps Card ──────────────────────────────────────────────────────────────
export default function StudioStepsCard({ data, onChange }) {
  const { t } = useI18n();
  const [activeTimerStep, setActiveTimerStep] = useState(null);

  return (
    <StudioCard
      icon="format_list_numbered"
      iconColor="text-primary"
      title={t('studio.stepsTitle')}
      badge={`${data.steps?.length || 0} ${t('studio.stepsCount')}`}
    >
      <div className="flex flex-col gap-space-md">
        {(data.steps || []).map((step, idx) => {
          const isHighlighted = step.hasTimer;
          return (
            <StepCard key={step.id} step={step} isHighlighted={isHighlighted}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 rounded-full font-label-sm text-label-sm flex items-center justify-center font-bold ${
                    isHighlighted
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-smoke text-cream-text'
                  }`}>
                    {step.number}
                  </span>
                  <span className="font-label-md text-label-md text-cream-text font-semibold">
                    {step.title}
                  </span>
                </div>
                {step.hasTimer && (
                  <div className="flex items-center gap-1 text-primary">
                    <StudioIcon name="timer" className="text-sm" />
                    <span className="font-label-sm text-label-sm font-bold">
                      {step.timerSeconds} {t('studio.stepTimer')}
                    </span>
                  </div>
                )}
                {!step.hasTimer && step.tag && (
                  <span className="px-2 py-0.5 rounded bg-surface-smoke text-cream-muted font-label-sm text-label-sm">
                    {step.tag}
                  </span>
                )}
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant pl-8">
                {step.description}
              </p>
              {step.hasTimer && (
                <TimerTrigger
                  seconds={step.timerSeconds || 30}
                  isActive={activeTimerStep === step.id}
                  onStart={() => setActiveTimerStep(activeTimerStep === step.id ? null : step.id)}
                />
              )}
            </StepCard>
          );
        })}

        {(!data.steps || data.steps.length === 0) && (
          <p className="text-center text-cream-muted font-body-sm py-4">
            Chưa có bước nào được thêm
          </p>
        )}

        <StudioButton
          icon="playlist_add"
          label={t('studio.addStep')}
          variant="ghost"
          onClick={() => {/* TODO: open add step modal */}}
          className="w-full justify-center"
        />
      </div>
    </StudioCard>
  );
}
