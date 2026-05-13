import { classNames } from '@/shared/utils/format';

interface StatusBadgeProps {
  status: 'connected' | 'reconnecting' | 'disconnected';
  label?: string;
}

const statusConfig = {
  connected: {
    dot: 'bg-bullish',
    text: 'text-bullish',
    bg: 'bg-bullish/[0.08]',
    label: 'Live',
  },
  reconnecting: {
    dot: 'bg-warning animate-pulse-subtle',
    text: 'text-warning',
    bg: 'bg-warning/[0.08]',
    label: 'Reconnecting',
  },
  disconnected: {
    dot: 'bg-bearish',
    text: 'text-bearish',
    bg: 'bg-bearish/[0.08]',
    label: 'Offline',
  },
};

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <div
      className={classNames(
        'inline-flex items-center gap-2 rounded-full px-3 py-1',
        config.bg,
      )}
    >
      <span className={classNames('h-2 w-2 rounded-full', config.dot)} />
      <span className={classNames('text-[12px] font-medium', config.text)}>
        {label || config.label}
      </span>
    </div>
  );
}
