import { classNames } from '@/shared/utils/format';

interface StatusBadgeProps {
  status: 'connected' | 'reconnecting' | 'disconnected';
  label?: string;
}

const statusConfig = {
  connected: {
    dot: 'bg-bullish shadow-[0_0_6px_rgba(10,196,136,0.4)]',
    text: 'text-bullish',
    bg: 'bg-bullish/[0.08]',
    label: 'Live',
  },
  reconnecting: {
    dot: 'bg-yellow-400 animate-pulse-subtle',
    text: 'text-yellow-400',
    bg: 'bg-yellow-400/[0.08]',
    label: 'Reconnecting',
  },
  disconnected: {
    dot: 'bg-bearish',
    text: 'text-bearish',
    bg: 'bg-bearish/[0.08]',
    label: 'Disconnected',
  },
};

export function StatusBadge({ status, label }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <div
      className={classNames(
        'inline-flex items-center gap-1.5 rounded-md px-2 py-[3px] text-[10px] font-semibold uppercase tracking-wider',
        config.bg,
        config.text,
      )}
    >
      <span className={classNames('h-[5px] w-[5px] rounded-full', config.dot)} />
      {label || config.label}
    </div>
  );
}
