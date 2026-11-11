import React, { useState, useRef, useEffect } from 'react';
import { PhoneCall, Globe } from 'lucide-react';

interface DraggableDockProps {
  onOpenPhone: () => void;
  onOpenSendDocument?: () => void;
  onOpenQuickActions?: () => void;
  onShareApp: () => void;
  dockOrder: string[];
  onReorder: (newOrder: string[]) => void;
  className?: string;
}

export const DraggableDock: React.FC<DraggableDockProps> = ({
  onOpenPhone,
  onOpenSendDocument,
  onOpenQuickActions,
  onShareApp,
  dockOrder,
  onReorder,
  className = 'mb-2'
}) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isReorderingActive, setIsReorderingActive] = useState(false);

  const startPosRef = useRef<{ x: number; y: number } | null>(null);
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);
  const hasMovedRef = useRef<boolean>(false);
  const activeIdRef = useRef<string | null>(null);
  activeIdRef.current = activeId;
  const isReorderingRef = useRef<boolean>(false);
  isReorderingRef.current = isReorderingActive;
  const dockOrderRef = useRef<string[]>(dockOrder);
  dockOrderRef.current = dockOrder;

  // Pointer Events (Mouse + Touch Unified)
  const handlePointerDown = (id: string, e: React.PointerEvent) => {
    if (e.button !== 0) return;
    startPosRef.current = { x: e.clientX, y: e.clientY };
    hasMovedRef.current = false;

    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
    }

    holdTimerRef.current = setTimeout(() => {
      setActiveId(id);
      setIsReorderingActive(true);
      if (typeof navigator !== 'undefined' && navigator.vibrate) {
        try { navigator.vibrate(30); } catch {}
      }
    }, 250);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!startPosRef.current) return;
    const dist = Math.hypot(
      e.clientX - startPosRef.current.x,
      e.clientY - startPosRef.current.y
    );

    if (!isReorderingRef.current) {
      if (dist > 12 && holdTimerRef.current) {
        clearTimeout(holdTimerRef.current);
        holdTimerRef.current = null;
      }
      return;
    }

    hasMovedRef.current = true;
    if (e.cancelable) e.preventDefault();
  };

  const handlePointerUp = () => {
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
    startPosRef.current = null;
    setActiveId(null);
    setIsReorderingActive(false);
    setTimeout(() => {
      hasMovedRef.current = false;
    }, 150);
  };

  useEffect(() => {
    const onWinMove = (e: PointerEvent) => {
      if (!isReorderingRef.current || !activeIdRef.current) return;
      hasMovedRef.current = true;
      const currActive = activeIdRef.current;

      const elements = typeof document.elementsFromPoint === 'function'
        ? document.elementsFromPoint(e.clientX, e.clientY)
        : [document.elementFromPoint(e.clientX, e.clientY)].filter(Boolean) as Element[];

      for (const el of elements) {
        const targetButton = (el as Element).closest?.('[data-dock-id]');
        if (targetButton) {
          const targetId = targetButton.getAttribute('data-dock-id');
          if (targetId && targetId !== currActive) {
            const rect = targetButton.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const distToCenter = Math.hypot(e.clientX - centerX, e.clientY - centerY);

            if (distToCenter < Math.max(rect.width, rect.height) * 0.75) {
              const current = [...dockOrderRef.current];
              const dragIdx = current.indexOf(currActive);
              const targetIdx = current.indexOf(targetId);

              if (dragIdx !== -1 && targetIdx !== -1) {
                current.splice(dragIdx, 1);
                current.splice(targetIdx, 0, currActive);
                onReorder(current);
                if (typeof navigator !== 'undefined' && navigator.vibrate) {
                  try { navigator.vibrate(25); } catch {}
                }
                break;
              }
            }
          }
        }
      }
    };

    const onWinUp = () => {
      if (holdTimerRef.current) {
        clearTimeout(holdTimerRef.current);
        holdTimerRef.current = null;
      }
      startPosRef.current = null;
      setActiveId(null);
      setIsReorderingActive(false);
      setTimeout(() => {
        hasMovedRef.current = false;
      }, 150);
    };

    window.addEventListener('pointermove', onWinMove);
    window.addEventListener('pointerup', onWinUp);
    window.addEventListener('pointercancel', onWinUp);
    return () => {
      window.removeEventListener('pointermove', onWinMove);
      window.removeEventListener('pointerup', onWinUp);
      window.removeEventListener('pointercancel', onWinUp);
    };
  }, [onReorder]);

  const handleClick = (id: string, e: React.MouseEvent) => {
    if (hasMovedRef.current || isReorderingActive) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    if (id === 'phone') {
      onOpenPhone();
    } else if (id === 'send_document') {
      onOpenSendDocument?.();
    } else if (id === 'share') {
      onShareApp();
    } else if (id === 'web') {
      window.open('https://santralbayi.com', '_blank');
    } else if (id === 'whatsapp' || id === 'quick_action') {
      onOpenQuickActions?.();
    }
  };

  const renderIcon = (id: string) => {
    switch (id) {
      case 'phone':
        return (
          <div className="w-10 h-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-md shadow-emerald-950/40 pointer-events-none">
            <PhoneCall className="w-5 h-5" />
          </div>
        );
      case 'send_document':
        return (
          <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-teal-950/80 via-slate-900 to-slate-950 border border-teal-500/60 shadow-md shadow-teal-500/20 flex items-center justify-center pointer-events-none">
            <span className="text-xl leading-none filter drop-shadow">📤</span>
          </div>
        );
      case 'web':
        return (
          <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-300 shadow-sm pointer-events-none">
            <Globe className="w-5 h-5 text-slate-300" />
          </div>
        );
      case 'whatsapp':
      case 'quick_action':
        return (
          <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-cyan-950/80 via-slate-900 to-slate-950 border border-cyan-500/60 shadow-md shadow-cyan-500/20 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-sm leading-none filter drop-shadow">⚡</span>
            <span className="text-[7px] font-black text-cyan-300 leading-none mt-0.5">Hızlı İşlem</span>
          </div>
        );
      case 'share':
        return (
          <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-amber-950/80 via-slate-900 to-slate-950 border border-amber-500/60 shadow-md shadow-amber-500/20 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-sm leading-none filter drop-shadow">📢</span>
            <span className="text-[7.5px] font-black text-amber-300 leading-none mt-0.5">Dağıt</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div
        className="bg-slate-950/80 p-2.5 rounded-3xl border border-slate-800/80 flex justify-around items-center select-none touch-none shadow-lg"
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {dockOrder.map((id) => {
          const isBeingDragged = activeId === id && isReorderingActive;

          return (
            <div
              key={id}
              data-dock-id={id}
              onPointerDown={(e) => handlePointerDown(id, e)}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              onClick={(e) => handleClick(id, e)}
              className={`relative flex items-center justify-center transition-all select-none touch-none rounded-xl ${
                isBeingDragged
                  ? 'scale-115 opacity-80 ring-2 ring-emerald-400 p-0.5 bg-emerald-950/50 z-20 shadow-xl shadow-emerald-500/30 cursor-grabbing'
                  : 'active:scale-90 cursor-pointer'
              }`}
              title="Açmak için dokunun, yerini değiştirmek için 250ms basılı tutup sürükleyin"
            >
              {renderIcon(id)}
            </div>
          );
        })}
      </div>
    </div>
  );
};
