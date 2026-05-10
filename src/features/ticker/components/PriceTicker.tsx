import { GlassCard, StatusBadge, SkeletonTicker } from '@/shared/components';
import { useWebSocket } from '../hooks/useWebSocket';
import { TickerCard } from './TickerCard';

const DISPLAY_ORDER = ['BTC', 'ETH', 'BNB'];

export function PriceTicker() {
  const { tickers, directions, connectionStatus, retryCount, reconnect } = useWebSocket();

  const hasData = Object.keys(tickers).length > 0;

  return (
    <GlassCard className="h-full">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-[15px] font-semibold text-white">Live Prices</h2>
          <StatusBadge status={connectionStatus} />
        </div>
        {connectionStatus === 'disconnected' && (
          <button
            onClick={reconnect}
            className="rounded-lg bg-accent-green/[0.08] px-3 py-1.5 text-xs font-medium text-accent-green transition-all hover:bg-accent-green/[0.15]"
          >
            Reconnect
          </button>
        )}
      </div>

      {connectionStatus === 'reconnecting' && (
        <p className="mb-4 text-xs text-yellow-400/80">
          Reconnecting... attempt {retryCount}/5
        </p>
      )}

      <div className="flex flex-col gap-2.5">
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
    </GlassCard>
  );
}
