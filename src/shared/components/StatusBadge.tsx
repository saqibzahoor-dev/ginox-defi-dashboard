import { classNames } from '@/shared/utils/format';

interface StatusBadgeProps {
  status: 'connected' | 'reconnecting' | 'disconnected';
  label?: string;
}

const statusConfig = {
  connected: {
    dot: 'bg-bullish',
    text: 'text-bullish',
    label: 'Live',
  },
  reconnecting: {
    dot: 'bg-yellow-400 animate-pulse-subtle',
    text: 'text-yellow-400',
    label: 'Reconnecting',
  },
  disconnected: {
    dot: 'bg-bearish',
    text: 'text-bearish',
    label: 'Disconnected',
  },
};

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <div
      className={classNames(
        'inline-flex items-center gap-1.5 text-[11px] font-medium',
        config.text,
      )}
    >
      <span className={classNames('h-1.5 w-1.5 rounded-full', config.dot)} />
      {label || config.label}
    </div>
  );
}
