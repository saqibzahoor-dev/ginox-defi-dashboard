import { classNames } from '@/shared/utils/format';

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

export function Skeleton({ className, variant = 'rectangular', width, height }: SkeletonProps) {
  const baseClasses =
    'bg-gradient-to-r from-white/[0.03] via-white/[0.06] to-white/[0.03] bg-[length:200%_100%] animate-skeleton';

  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded',
  };

  return (
    <div
      className={classNames(baseClasses, variantClasses[variant], className)}
      style={{ width, height }}
    />
  );
}

export function SkeletonCard() {
  return (
    <div className="rounded-lg border border-surface-border bg-surface p-4">
      <div className="mb-3 flex items-center gap-3">
        <Skeleton variant="circular" width={28} height={28} />
        <div className="flex-1">
          <Skeleton className="mb-1.5 h-3.5 w-20" />
          <Skeleton className="h-3 w-12" />
        </div>
      </div>
      <Skeleton className="mb-3 h-6 w-full" />
      <div className="grid grid-cols-2 gap-2">
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-full" />
      </div>
    </div>
  );
}

export function SkeletonTicker() {
  return (
    <div className="flex items-center gap-3 px-3 py-1.5">
      <Skeleton className="h-3.5 w-10" />
      <Skeleton className="h-3.5 w-20" />
      <Skeleton className="h-3.5 w-14" />
    </div>
  );
}
