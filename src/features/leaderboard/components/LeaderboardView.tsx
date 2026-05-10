import { useState, useRef, useEffect, useCallback } from 'react';
import { GlassCard, SkeletonCard, EmptyState } from '@/shared/components';
import { useLeaderboard } from '../hooks/useLeaderboard';
import { LeaderboardFilters } from './LeaderboardFilters';
import { TraderCard } from './TraderCard';
import { TraderDetailModal } from './TraderDetailModal';
import type { TraderCard as TraderCardType } from '@/shared/types';

export function LeaderboardView() {
  const {
    traders,
    status,
    error,
    sortField,
    sortDirection,
    timeframe,
    hasMore,
    handleSort,
    setTimeframe,
    setSearchQuery,
    loadMore,
    reload,
  } = useLeaderboard();

  const [selectedTrader, setSelectedTrader] = useState<TraderCardType | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);

  const handleTraderClick = useCallback((trader: TraderCardType) => {
    setSelectedTrader(trader);
    setIsModalOpen(true);
  }, []);

  useEffect(() => {
    const el = observerRef.current;
    if (!el || !hasMore || status !== 'success') return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: '200px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, status, loadMore]);

  return (
    <div>
      <div className="mb-5 flex items-baseline justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-[17px] font-semibold text-white">Trader Leaderboard</h2>
          <span className="rounded-md bg-white/[0.04] px-2 py-[2px] text-[11px] font-medium text-secondary">
            {traders.length} results
          </span>
        </div>
      </div>

      <LeaderboardFilters
        sortField={sortField}
        sortDirection={sortDirection}
        timeframe={timeframe}
        onSort={handleSort}
        onTimeframeChange={setTimeframe}
        onSearch={setSearchQuery}
      />

      {status === 'loading' && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      )}

      {status === 'error' && (
        <GlassCard className="text-center">
          <p className="mb-3 text-sm text-bearish">{error}</p>
          <button
            onClick={reload}
            className="rounded-lg bg-accent-green/[0.08] px-5 py-2 text-xs font-medium text-accent-green transition-all hover:bg-accent-green/[0.15]"
          >
            Retry
          </button>
        </GlassCard>
      )}

      {status === 'success' && traders.length === 0 && (
        <EmptyState
          title="No results found"
          description="Try adjusting your search or filters to find what you're looking for."
          icon={
            <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          }
        />
      )}

      {status === 'success' && traders.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {traders.map((trader) => (
            <TraderCard key={trader.id} trader={trader} onClick={handleTraderClick} />
          ))}
        </div>
      )}

      <div ref={observerRef} className="h-4" />

      <TraderDetailModal
        trader={selectedTrader}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
