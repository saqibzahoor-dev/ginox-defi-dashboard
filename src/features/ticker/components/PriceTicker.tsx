import { StatusBadge, SkeletonTicker } from '@/shared/components';
import { useWebSocket } from '../hooks/useWebSocket';
import { TickerCard } from './TickerCard';

const DISPLAY_ORDER = ['BTC', 'ETH', 'BNB'];

export function PriceTicker() {
  const { tickers, directions, connectionStatus, retryCount, reconnect } = useWebSocket();
  const hasData = Object.keys(tickers).length > 0;

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        {!hasData
          ? Array.from({ length: 3 }).map((_, i) => <SkeletonTicker key={i} />)
          : DISPLAY_ORDER.map((symbol) => {
              const ticker = tickers[symbol];
              if (!ticker) return null;
              return (
                <TickerCard
                  key={symbol}
                  data={ticker}
                  direction={directions[symbol] ?? 'neutral'}
                />
              );
            })}
      </div>
      <div className="flex items-center gap-3">
        <StatusBadge status={connectionStatus} />
        {connectionStatus === 'disconnected' && (
          <button
            onClick={reconnect}
            className="rounded-lg bg-accent-green/[0.08] px-3 py-1.5 text-[12px] font-semibold text-accent-green transition-colors hover:bg-accent-green/[0.15]"
          >
            Reconnect
          </button>
        )}
        {connectionStatus === 'reconnecting' && (
          <span className="text-[12px] font-medium text-warning">Retry {retryCount}/5</span>
        )}
      </div>
    </div>
  );
}
