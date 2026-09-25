import { useState, useEffect, useRef } from 'react';

export default function ExecutionSteps({
  steps = [],
  onStepsChange,
}) {
  const [activeTimer, setActiveTimer] = useState(null);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const timerRef = useRef(null);

  // Default steps
  const defaultSteps = [
    {
      id: 1,
      name: 'Ướp Lạnh Ly & Chuẩn Bị Khối Đá',
      type: 'static',
      description:
        'Đặt ly Nick & Nora vào tủ đông sâu -18°C trước 10 phút. Lấy khối đá Clear Ice 5x5cm đặt sẵn vào ly để hạ nhiệt bề mặt thủy tinh.',
    },
    {
      id: 2,
      name: 'Kỹ Thuật Khuấy Lạnh (Stirring Protocol)',
      type: 'timer',
      duration: 30,
      description:
        'Rót Rye Whiskey, Sweet Vermouth và Amaro vào mixing glass ngập đá khối. Dùng muỗng bar xoắn đều 45 vòng nhịp nhàng để đạt độ loãng Dilution chuẩn 20% mà không vỡ bọt khí.',
    },
    {
      id: 3,
      name: 'Rót Lọc Tinh Khiết (Strain & Pour)',
      type: 'strain',
      description:
        'Dùng strainer Julep chặn đá trong mixing glass, rót dòng rượu mượt mà như lụa vào ly Nick & Nora đã ướp lạnh tuyệt đối.',
    },
    {
      id: 4,
      name: 'Hương Thơm Hoàn Thiện & Garnish',
      type: 'flame',
      description:
        'Hơ nhẹ vỏ cam qua ngọn lửa torch, bóp nhẹ tinh dầu (flamed orange peel) phủ lên vành ly. Thả 2 nhánh saffron vàng óng lên mặt rượu.',
    },
  ];

  const stepsList = steps.length > 0 ? steps : defaultSteps;

  // Timer effect
  useEffect(() => {
    if (activeTimer !== null && timerSeconds > 0) {
      timerRef.current = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setActiveTimer(null);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeTimer, timerSeconds > 0]);

  const startTimer = (stepId, duration) => {
    setActiveTimer(stepId);
    setTimerSeconds(duration);
  };

  const stopTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setActiveTimer(null);
    setTimerSeconds(0);
  };

  const getStepTypeLabel = (type) => {
    const labels = {
      static: 'Thao tác tĩnh',
      timer: 'Timer Khuấy',
      strain: 'Lọc Julep',
      flame: 'Tinh Dầu Nướng',
    };
    return labels[type] || type;
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return mins > 0 ? `${mins}:${secs.toString().padStart(2, '0')}` : `${secs}s`;
  };

  return (
    <div className="p-space-lg rounded-xl bg-surface-slate shadow-sm">
      {/* Card Header */}
      <div className="flex items-center justify-between pb-space-sm">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-lg">format_list_numbered</span>
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary">
            Thao Tác Từng Bước &amp; Timer Tích Hợp
          </span>
        </div>
        <span className="font-label-sm text-label-sm text-cream-muted">
          {stepsList.length} Thao Tác Chuẩn
        </span>
      </div>

      {/* Steps */}
      <div className="flex flex-col gap-space-md pt-space-xs">
        {stepsList.map((step, index) => (
          <div
            key={step.id || index}
            className={`p-3 rounded-lg flex flex-col gap-1.5 transition-colors ${
              activeTimer === step.id
                ? 'bg-surface-container-high'
                : 'bg-surface-obsidian'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className={`w-6 h-6 rounded-full font-label-sm text-label-sm flex items-center justify-center font-bold ${
                    activeTimer === step.id
                      ? 'bg-primary text-on-primary'
                      : 'bg-surface-smoke text-cream-text'
                  }`}
                >
                  {index + 1}
                </span>
                <span className="font-label-md text-label-md text-cream-text font-semibold">
                  {step.name}
                </span>
              </div>

              {step.type === 'timer' && (
                <div className="flex items-center gap-1 text-primary">
                  <span className="material-symbols-outlined text-sm">timer</span>
                  <span className="font-label-sm text-label-sm font-bold">
                    {step.duration} GIÂY TIMER
                  </span>
                </div>
              )}
              <span className="px-2 py-0.5 rounded bg-surface-smoke text-cream-muted font-label-sm text-label-sm">
                {getStepTypeLabel(step.type)}
              </span>
            </div>

            <p className="font-body-sm text-body-sm text-on-surface-variant pl-8">
              {step.description}
            </p>

            {/* Timer Component for timer-type steps */}
            {step.type === 'timer' && (
              <div className="ml-8 p-3 rounded-lg bg-surface-obsidian flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bar-mode-step text-bar-mode-step text-base transition-all ${
                      activeTimer === step.id
                        ? 'bg-primary text-on-primary animate-pulse'
                        : 'bg-primary/10 text-primary'
                    }`}
                  >
                    {activeTimer === step.id ? formatTime(timerSeconds) : `${step.duration}s`}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm text-cream-text">
                      Đồng Hồ Khuấy Chuẩn Dilution
                    </span>
                    <span className="font-body-sm text-body-sm text-amber-vibrant">
                      {activeTimer === step.id ? 'Đang khuấy...' : 'Chạm để kích hoạt khi bắt đầu khuấy'}
                    </span>
                  </div>
                </div>
                {activeTimer === step.id ? (
                  <button
                    onClick={stopTimer}
                    className="px-3 py-1.5 rounded-lg bg-error-container text-on-error-container font-label-sm text-label-sm font-semibold hover:bg-error transition-colors"
                  >
                    Dừng Lại
                  </button>
                ) : (
                  <button
                    onClick={() => startTimer(step.id, step.duration)}
                    className="px-3 py-1.5 rounded-lg bg-primary-container text-on-primary-container font-label-sm text-label-sm font-semibold hover:bg-tertiary-container transition-colors"
                  >
                    Bắt Đầu
                  </button>
                )}
              </div>
            )}
          </div>
        ))}

        {/* Add Step Button */}
        <button
          onClick={() => {
            const newStep = {
              id: Date.now(),
              name: 'Bước Thao Tác Mới',
              type: 'static',
              description: 'Mô tả bước thực hiện...',
            };
            onStepsChange?.([...stepsList, newStep]);
          }}
          className="w-full py-2.5 rounded-lg bg-surface-smoke hover:bg-surface-container-high text-primary font-label-md text-label-md flex items-center justify-center gap-2 transition-colors"
        >
          <span className="material-symbols-outlined text-lg">playlist_add</span>
          <span>Thêm Bước Thao Tác Mới</span>
        </button>
      </div>
    </div>
  );
}
