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
  md: 'p-4 sm:p-5',
  lg: 'p-5 sm:p-6',
};

export function GlassCard({
  children,
  className,
  hoverable = false,
  padding = 'md',
  glow = false,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={classNames(
        'relative rounded-2xl',
        'bg-[rgba(12,16,36,0.65)] backdrop-blur-xl',
        'border border-white/[0.06]',
        'shadow-[0_4px_24px_-1px_rgba(0,0,0,0.3)]',
        hoverable && [
          'transition-all duration-300 ease-out cursor-pointer',
          'hover:bg-[rgba(14,19,42,0.8)]',
          'hover:border-white/[0.1]',
          'hover:shadow-[0_8px_32px_-4px_rgba(0,0,0,0.4)]',
          'hover:-translate-y-[1px]',
        ].join(' '),
        glow && 'shadow-[0_0_40px_-12px_rgba(10,196,136,0.15)]',
        paddingMap[padding],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
