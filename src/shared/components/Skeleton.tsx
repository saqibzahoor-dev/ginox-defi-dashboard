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
    rectangular: 'rounded-lg',
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
    <div className="rounded-2xl border border-white/[0.04] bg-[rgba(12,16,36,0.65)] p-5">
      <div className="mb-4 flex items-center gap-3">
        <Skeleton variant="circular" width={36} height={36} />
        <div className="flex-1">
          <Skeleton className="mb-2 h-4 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      </div>
      <Skeleton className="mb-4 h-[44px] w-full rounded-lg" />
      <div className="grid grid-cols-2 gap-3">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    </div>
  );
}

export function SkeletonTicker() {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-white/[0.04] bg-white/[0.02] px-4 py-3.5">
      <Skeleton variant="circular" width={40} height={40} />
      <div className="flex-1">
        <Skeleton className="mb-1.5 h-3.5 w-14" />
        <Skeleton className="h-5 w-24" />
      </div>
      <div className="flex flex-col items-end gap-1.5">
        <Skeleton className="h-5 w-16 rounded-md" />
        <Skeleton className="h-3 w-14" />
      </div>
    </div>
  );
}
