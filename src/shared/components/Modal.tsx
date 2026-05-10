import { useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  maxWidth?: string;
}

export function Modal({ isOpen, onClose, title, children, maxWidth = 'max-w-2xl' }: ModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-[rgba(4,6,14,0.85)]" onClick={onClose} />
      <div
        className={`relative w-full ${maxWidth} animate-slide-up rounded-lg border border-surface-border bg-surface p-5`}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        {title && (
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-[15px] font-semibold text-white">{title}</h2>
            <button
              onClick={onClose}
              className="flex h-7 w-7 items-center justify-center rounded text-secondary transition-colors hover:bg-white/[0.04] hover:text-primary"
              aria-label="Close"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
