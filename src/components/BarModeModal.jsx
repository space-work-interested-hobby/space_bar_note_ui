import { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, Mic, ChevronLeft, ChevronRight, Thermometer, Snowflake, Check, Circle } from 'lucide-react';

// Audio beep helper
const playBeep = (freq = 880, duration = 0.2) => {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {}
};

const triggerHaptic = () => {
  if ('vibrate' in navigator) navigator.vibrate([200, 100, 200]);
};

// Circular Timer Component
function CircularTimer({ seconds, totalSeconds = 30, isRunning }) {
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const progress = ((totalSeconds - seconds) / totalSeconds) * circumference;
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;

  return (
    <div className="relative w-36 h-36 md:w-44 md:h-44 flex items-center justify-center">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="currentColor" strokeWidth="5" className="text-surface-smoke" />
        <circle
          cx="50" cy="50" r={radius} fill="none"
          stroke="currentColor" strokeWidth="5" strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={circumference - progress}
          className="text-amber-vibrant transition-all duration-300"
          style={{ filter: 'drop-shadow(0 0 16px rgba(245, 179, 66, 0.6))' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-bar-mode-metric text-bar-mode-metric text-cream-text font-black tracking-tight leading-none">
          {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
        </span>
        <span className="text-label-sm text-amber-vibrant uppercase tracking-widest mt-1">Stir Target</span>
      </div>
    </div>
  );
}

// Step Navigator
function StepNavigator({ steps, currentStep, onStepClick }) {
  return (
    <div className="flex items-center justify-between gap-2 overflow-x-auto py-2">
      {steps.map((step, idx) => {
        const isCompleted = idx < currentStep;
        const isCurrent = idx === currentStep;
        const isPending = idx > currentStep;
        return (
          <div key={idx} className="flex items-center gap-2 shrink-0">
            <div
              onClick={() => !isPending && onStepClick(idx)}
              className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all cursor-pointer
                ${isCompleted ? 'bg-primary text-on-primary' : ''}
                ${isCurrent ? 'bg-amber-vibrant text-surface-obsidian ring-4 ring-amber-vibrant/20' : ''}
                ${isPending ? 'bg-surface-obsidian text-cream-muted cursor-not-allowed' : ''}
              `}
            >
              {isCompleted ? <Check className="w-4 h-4" /> : idx + 1}
            </div>
            {idx < steps.length - 1 && <span className="text-surface-smoke mx-1">——</span>}
          </div>
        );
      })}
    </div>
  );
}

// Ingredient Checklist
function IngredientChecklist({ ingredients }) {
  return (
    <div className="space-y-2">
      {ingredients.map((ing, idx) => (
        <div
          key={idx}
          className={`p-3 rounded-lg flex items-center justify-between gap-3 transition-all ${
            ing.completed ? 'bg-surface-obsidian/70 opacity-60' : ing.active ? 'bg-surface-smoke ring-1 ring-amber-vibrant/40' : 'bg-surface-obsidian'
          }`}
        >
          <div className="flex items-center gap-3">
            {ing.completed ? (
              <Check className={`w-5 h-5 ${ing.active ? 'text-amber-vibrant' : 'text-primary'}`} />
            ) : ing.active ? (
              <Circle className="w-5 h-5 text-amber-vibrant fill-amber-vibrant/30" />
            ) : (
              <Circle className="w-5 h-5 text-cream-muted" />
            )}
            <div>
              <div className={`text-body-md ${ing.completed ? 'line-through text-cream-muted' : 'text-cream-text font-bold'}`}>
                {ing.name}
              </div>
              {ing.note && (
                <span className={`text-label-sm ${ing.active ? 'text-amber-vibrant' : 'text-cream-muted'}`}>
                  {ing.note}
                </span>
              )}
            </div>
          </div>
          <span className={`text-body-md font-bold ${ing.active ? 'text-amber-vibrant' : 'text-cream-muted'}`}>
            {ing.amount}
          </span>
        </div>
      ))}
    </div>
  );
}

// Main Bar Mode Modal
export default function BarModeModal({ recipe, isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(30);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [voiceActive, setVoiceActive] = useState(false);
  const [timerStatus, setTimerStatus] = useState('SẴN SÀNG');

  const steps = recipe?.steps || [];
  const currentStepData = steps[currentStep];

  // Timer effect
  useEffect(() => {
    let interval;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => {
          if (prev <= 1) {
            setIsTimerRunning(false);
            setTimerStatus('HOÀN TẤT ĐỘ LẠNH!');
            triggerHaptic();
            playBeep(880, 0.4);
            setTimeout(() => playBeep(1174, 0.6), 250);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  // Keyboard shortcuts for voice mode
  useEffect(() => {
    if (!voiceActive) return;
    const handleKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        playBeep(659, 0.15);
        handleNextStep();
      } else if (e.key === 'ArrowLeft') {
        playBeep(440, 0.15);
        handlePrevStep();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [voiceActive, currentStep]);

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      setTimerSeconds(30);
      setIsTimerRunning(false);
      setTimerStatus('SẴN SÀNG');
    } else {
      playBeep(1174, 0.6);
      if (confirm('Tuyệt vời! Ly cocktail đã sẵn sàng!')) onClose();
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      setTimerSeconds(30);
      setIsTimerRunning(false);
      setTimerStatus('SẴN SÀNG');
    }
  };

  if (!isOpen || !recipe) return null;

  // Mock ingredients based on current step
  const mockIngredients = [
    { name: 'Dăm gỗ sồi Pháp', amount: '1 Shot', note: 'Đã xông khói', completed: true, active: false },
    { name: 'Bourbon Whiskey', amount: '60 ml', note: 'Trong Mixing Glass', completed: currentStep >= 1, active: currentStep === 1 },
    { name: 'Syrup Mật Ong Khói', amount: '15 ml', note: 'Tỷ lệ 2:1', completed: currentStep >= 1, active: currentStep === 1 },
    { name: 'Angostura Bitters', amount: '2 Dashes', note: 'Chuẩn bị nhỏ', completed: currentStep >= 2, active: currentStep === 2 },
    { name: 'Vỏ Cam Vàng sấy', amount: '1 Dải', note: 'Twist tinh dầu', completed: currentStep >= 3, active: currentStep === 3 },
  ];

  const getStatusClass = () => {
    if (timerStatus === 'HOÀN TẤT ĐỘ LẠNH!') return 'bg-amber-vibrant text-surface-obsidian shadow-[0_0_15px_rgba(245,179,66,0.9)]';
    if (timerStatus === 'ĐANG KHUẤY LẠNH') return 'bg-primary-container text-on-primary-container animate-pulse';
    if (timerStatus === 'TẠM DỪNG') return 'bg-surface-smoke text-cream-text';
    return 'bg-surface-obsidian text-cream-muted';
  };

  return (
    <div className="fixed inset-0 z-50 bg-bar-mode-canvas flex flex-col overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-bar-mode-surface/95 backdrop-blur-xl px-margin-mobile md:px-margin py-4 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-3.5 h-3.5 rounded-full bg-amber-vibrant animate-pulse shrink-0" style={{ boxShadow: '0 0 12px rgba(245,179,66,0.8)' }} />
          <div>
            <span className="text-label-sm text-primary uppercase tracking-widest font-bold">Chế Độ Quầy Bar Độc Bản</span>
            <h1 className="font-headline-lg text-cream-text truncate">{recipe.name}</h1>
          </div>
        </div>
        <div className="flex items-center gap-4 shrink-0">
          <div className="hidden sm:flex items-center gap-2 bg-surface-slate px-4 py-2 rounded-lg">
            <span className="text-label-md text-copper-accent">Bước</span>
            <span className="font-bar-mode-step text-headline-md text-amber-vibrant font-bold">
              {String(currentStep + 1).padStart(2, '0')}
            </span>
            <span className="text-body-md text-cream-muted">/ {String(steps.length).padStart(2, '0')}</span>
          </div>
          <button
            onClick={onClose}
            className="w-14 h-14 rounded-xl bg-surface-smoke hover:bg-error-container text-cream-text hover:text-on-error-container flex items-center justify-center transition-all"
            aria-label="Thoát"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Content - Bento Grid */}
      <div className="flex-1 max-w-7xl mx-auto px-margin-mobile md:px-margin py-space-xl w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
          {/* Left Column (8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-space-lg">
            {/* Step Instruction */}
            <div className="bg-surface-slate rounded-xl p-space-lg md:p-space-xl shadow-2xl relative overflow-hidden">
              <div className="absolute -right-20 -top-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
              <div className="flex items-center justify-between gap-4 mb-space-md">
                <div className="inline-flex items-center gap-2 bg-surface-obsidian px-3.5 py-1.5 rounded-full">
                  <span className="material-symbols-outlined text-amber-vibrant text-lg">liquor</span>
                  <span className="text-label-md text-amber-vibrant uppercase tracking-wider">Thao Tác Số {currentStep + 1}</span>
                </div>
                <div className="flex items-center gap-2 text-cream-muted text-body-sm">
                  <span className="material-symbols-outlined text-primary text-base">timer</span>
                  <span>Chuẩn hóa 30 giây</span>
                </div>
              </div>

              {/* Specs Pill */}
              <div className="bg-surface-obsidian rounded-xl p-space-md mb-space-lg flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-lg bg-surface-smoke flex items-center justify-center text-amber-vibrant shrink-0">
                    <span className="material-symbols-outlined text-3xl">science</span>
                  </div>
                  <div>
                    <div className="text-label-sm text-copper-accent uppercase tracking-widest">Định lượng tức thời</div>
                    <div className="font-bar-mode-step text-headline-md md:text-bar-mode-step text-cream-text font-bold">
                      60ml Bourbon <span className="text-amber-vibrant">+</span> 15ml Honey Syrup
                    </div>
                  </div>
                </div>
                <div className="bg-surface-slate px-4 py-2.5 rounded-lg flex items-center gap-3 shrink-0">
                  <span className="material-symbols-outlined text-tertiary text-2xl">ac_unit</span>
                  <div>
                    <div className="text-label-sm text-cream-muted uppercase">Dụng cụ</div>
                    <div className="text-body-md font-semibold text-cream-text">Mixing Glass + Đá Tảng</div>
                  </div>
                </div>
              </div>

              {/* Master Instructions */}
              <div className="space-y-3">
                <h2 className="font-bar-mode-step text-headline-md md:text-bar-mode-step text-amber-vibrant tracking-tight">
                  {currentStepData}
                </h2>
              </div>
            </div>

            {/* Timer Widget */}
            <div className="bg-surface-slate rounded-xl p-space-lg md:p-space-xl shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-label-md uppercase tracking-wider text-copper-accent font-semibold flex items-center gap-2">
                  <span className="material-symbols-outlined text-amber-vibrant">hourglass_top</span>
                  Đồng Hồ Khuấy Lạnh
                </span>
                <span className={`px-3 py-1 rounded-full text-label-sm font-bold transition-all ${getStatusClass()}`}>
                  {timerStatus}
                </span>
              </div>

              <div className="flex flex-col items-center">
                <CircularTimer seconds={timerSeconds} totalSeconds={30} isRunning={isTimerRunning} />
              </div>

              {/* Timer Controls */}
              <div className="w-full grid grid-cols-1 sm:grid-cols-3 gap-space-md mt-6">
                <button
                  onClick={() => { if (!isTimerRunning) { setIsTimerRunning(true); setTimerStatus('ĐANG KHUẤY LẠNH'); playBeep(440, 0.1); } }}
                  className="h-14 px-5 rounded-xl bg-primary-container hover:bg-tertiary-container text-on-primary-container font-label-md font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                  style={{ boxShadow: '0 4px 20px rgba(229,158,56,0.35)' }}
                >
                  <Play className="w-6 h-6" /><span>Bắt Đầu</span>
                </button>
                <button
                  onClick={() => { if (isTimerRunning) { setIsTimerRunning(false); setTimerStatus('TẠM DỪNG'); playBeep(330, 0.1); } }}
                  className="h-14 px-5 rounded-xl bg-surface-smoke hover:bg-surface-bright text-cream-text font-label-md font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                >
                  <Pause className="w-6 h-6" /><span>Tạm Dừng</span>
                </button>
                <button
                  onClick={() => { setIsTimerRunning(false); setTimerSeconds(30); setTimerStatus('SẴN SÀNG'); }}
                  className="h-14 px-5 rounded-xl bg-surface-obsidian hover:bg-surface-smoke text-cream-muted hover:text-cream-text font-label-md font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                >
                  <RotateCcw className="w-5 h-5" /><span>Đặt Lại</span>
                </button>
              </div>
            </div>

            {/* Step Navigator */}
            <div className="bg-surface-slate rounded-xl p-space-md">
              <StepNavigator steps={steps} currentStep={currentStep} onStepClick={setCurrentStep} />
            </div>
          </div>

          {/* Right Column (4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-space-lg">
            {/* Temperature Card */}
            <div className="bg-surface-slate rounded-xl p-space-lg shadow-xl">
              <div className="flex items-center justify-between mb-space-sm">
                <span className="text-label-md uppercase tracking-wider text-copper-accent font-semibold flex items-center gap-2">
                  <Thermometer className="w-5 h-5 text-tertiary" />
                  Nhiệt Độ Ly
                </span>
                <span className="px-2 py-0.5 rounded bg-surface-smoke text-primary text-label-sm font-semibold">CHUẨN</span>
              </div>
              <div className="bg-surface-obsidian rounded-lg p-space-md flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-surface-smoke flex items-center justify-center text-primary">
                    <Snowflake className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-label-sm text-cream-muted">Nhiệt độ ly</div>
                    <div className="text-headline-md text-cream-text font-bold">-4.5 °C</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-label-sm text-amber-vibrant font-semibold">ĐÁ TẢNG</span>
                  <p className="text-body-sm text-cream-muted">Clear Ice</p>
                </div>
              </div>
            </div>

            {/* Checklist */}
            <div className="bg-surface-slate rounded-xl p-space-lg shadow-xl flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <span className="text-label-md uppercase tracking-wider text-copper-accent font-semibold flex items-center gap-2">
                  <span className="material-symbols-outlined text-amber-vibrant">checklist</span>
                  Checklist
                </span>
                <span className="text-body-sm text-cream-muted">
                  {mockIngredients.filter(i => i.completed).length} / {mockIngredients.length}
                </span>
              </div>
              <IngredientChecklist ingredients={mockIngredients} />
            </div>

            {/* Notes */}
            <div className="bg-surface-slate rounded-xl p-space-lg shadow-xl flex flex-col gap-3">
              <span className="text-label-md uppercase tracking-wider text-copper-accent font-semibold flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">bookmark</span>
                Ghi Chú
              </span>
              <div className="text-body-sm text-cream-muted space-y-1">
                <p>• Mùi khói sồi + mật ong = caramel ấm áp.</p>
                <p>• Độ loãng cần đạt <strong className="text-amber-vibrant">22% - 25%</strong>.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="sticky bottom-0 z-50 bg-bar-mode-canvas/95 backdrop-blur-2xl py-4 px-margin-mobile md:px-margin shadow-[0_-10px_30px_rgba(0,0,0,0.8)]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          {/* Voice Control */}
          <button
            onClick={() => setVoiceActive(!voiceActive)}
            className={`h-14 px-5 rounded-xl flex items-center gap-3 transition-all shrink-0 ${
              voiceActive ? 'bg-surface-smoke ring-2 ring-amber-vibrant/60' : 'bg-surface-slate hover:bg-surface-smoke'
            }`}
          >
            <Mic className={`w-6 h-6 ${voiceActive ? 'text-amber-vibrant animate-pulse' : 'text-primary'}`} />
            <div className="text-left hidden sm:block">
              <div className="text-label-sm uppercase tracking-wider text-copper-accent">Rảnh Tay</div>
              <div className="text-label-md font-bold text-cream-text">
                {voiceActive ? 'Đang lắng nghe...' : 'Bật giọng nói'}
              </div>
            </div>
          </button>

          {/* Navigation */}
          <div className="flex-1 grid grid-cols-2 gap-space-md">
            <button
              onClick={handlePrevStep}
              disabled={currentStep === 0}
              className="h-14 px-5 rounded-xl bg-surface-slate hover:bg-surface-smoke text-cream-text font-bar-mode-step-mobile md:font-bar-mode-step text-headline-md font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-7 h-7" /><span className="truncate">Trước</span>
            </button>
            <button
              onClick={handleNextStep}
              className="h-14 px-5 rounded-xl bg-primary-container hover:bg-tertiary-container text-on-primary-container font-bar-mode-step-mobile md:font-bar-mode-step text-headline-md font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
              style={{ boxShadow: '0 0 24px rgba(229,158,56,0.4)' }}
            >
              <span className="truncate">{currentStep === steps.length - 1 ? 'Hoàn Tất' : `Tiếp Bước ${currentStep + 2}`}</span>
              <ChevronRight className="w-7 h-7" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
