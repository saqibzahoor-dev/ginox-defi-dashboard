import { StatusBadge, SkeletonTicker } from '@/shared/components';
import { useWebSocket } from '../hooks/useWebSocket';
import { TickerCard } from './TickerCard';

const DISPLAY_ORDER = ['BTC', 'ETH', 'BNB'];

export function PriceTicker() {
  const { tickers, directions, connectionStatus, retryCount, reconnect } = useWebSocket();
  const hasData = Object.keys(tickers).length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
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
            className="text-[11px] font-medium text-accent-green transition-colors hover:text-accent-green/80"
          >
            Reconnect
          </button>
        )}
        {connectionStatus === 'reconnecting' && (
          <span className="text-[11px] text-yellow-400/80">Retry {retryCount}/5</span>
        )}
      </div>
    </div>
  );
}
