import type { ReactNode, HTMLAttributes } from 'react';
import { classNames } from '@/shared/utils/format';

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  glow?: boolean;
}

const paddingMap = {
  none: '',
  sm: 'p-4',
  md: 'p-5',
  lg: 'p-6',
};

export function GlassCard({
  children,
  className,
  hoverable = false,
  padding = 'md',
  glow: _glow,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={classNames(
        'rounded-xl border border-surface-border bg-surface',
        hoverable && 'cursor-pointer transition-all duration-200 hover:border-border-emphasis hover:bg-surface-hover',
        paddingMap[padding],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
