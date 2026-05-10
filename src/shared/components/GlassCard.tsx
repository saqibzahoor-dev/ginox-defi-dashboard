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
  sm: 'p-3',
  md: 'p-4',
  lg: 'p-5',
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
        'rounded-lg border border-surface-border bg-surface',
        hoverable && 'cursor-pointer transition-colors hover:bg-surface-hover',
        paddingMap[padding],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
