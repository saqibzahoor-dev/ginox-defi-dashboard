import { useState, useRef, useEffect, useCallback } from 'react';
import { GlassCard, Skeleton, EmptyState } from '@/shared/components';
import { useLeaderboard } from '../hooks/useLeaderboard';
import { LeaderboardFilters } from './LeaderboardFilters';
import { TraderCard } from './TraderCard';
import { TraderDetailModal } from './TraderDetailModal';
import type { TraderCard as TraderCardType } from '@/shared/types';

const TABLE_HEADERS = [
  { label: '#', align: 'left' as const, width: 'w-12' },
  { label: 'Token', align: 'left' as const, width: '' },
  { label: 'Price', align: 'right' as const, width: '' },
  { label: '7D Chart', align: 'center' as const, width: 'w-28' },
  { label: 'ROI', align: 'right' as const, width: '' },
  { label: 'PNL', align: 'right' as const, width: '' },
  { label: 'Volume', align: 'right' as const, width: '' },
];

function TableHead() {
  return (
    <thead>
      <tr className="border-b border-surface-border">
        {TABLE_HEADERS.map((h) => (
          <th
            key={h.label}
            className={`px-4 py-3 text-[11px] font-medium uppercase tracking-wider text-secondary ${h.width} text-${h.align}`}
          >
            {h.label}
          </th>
        ))}
      </tr>
    </thead>
  );
}

function SkeletonRows() {
  return (
    <>
      {Array.from({ length: 10 }).map((_, i) => (
        <tr key={i} className="border-b border-surface-border/50">
          <td className="px-4 py-3"><Skeleton className="h-4 w-5" /></td>
          <td className="px-4 py-3">
            <div className="flex items-center gap-2.5">
              <Skeleton variant="circular" width={28} height={28} />
              <div>
                <Skeleton className="mb-1 h-3.5 w-20" />
                <Skeleton className="h-3 w-10" />
              </div>
            </div>
          </td>
          <td className="px-4 py-3"><div className="flex justify-end"><Skeleton className="h-4 w-16" /></div></td>
          <td className="px-4 py-3"><div className="flex justify-center"><Skeleton className="h-4 w-20" /></div></td>
          <td className="px-4 py-3"><div className="flex justify-end"><Skeleton className="h-4 w-14" /></div></td>
          <td className="px-4 py-3"><div className="flex justify-end"><Skeleton className="h-4 w-14" /></div></td>
          <td className="px-4 py-3"><div className="flex justify-end"><Skeleton className="h-4 w-14" /></div></td>
        </tr>
      ))}
    </>
  );
}

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
        if (entries[0].isIntersecting) loadMore();
      },
      { rootMargin: '200px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, status, loadMore]);

  return (
    <div>
      <LeaderboardFilters
        sortField={sortField}
        sortDirection={sortDirection}
        timeframe={timeframe}
        onSort={handleSort}
        onTimeframeChange={setTimeframe}
        onSearch={setSearchQuery}
      />

      {status === 'loading' && (
        <GlassCard padding="none">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <TableHead />
              <tbody>
                <SkeletonRows />
              </tbody>
            </table>
          </div>
        </GlassCard>
      )}

      {status === 'error' && (
        <GlassCard className="py-8 text-center">
          <p className="mb-3 text-sm text-bearish">{error}</p>
          <button
            onClick={reload}
            className="text-[12px] font-medium text-accent-green transition-colors hover:text-accent-green/80"
          >
            Retry
          </button>
        </GlassCard>
      )}

      {status === 'success' && traders.length === 0 && (
        <GlassCard>
          <EmptyState
            title="No results found"
            description="Try adjusting your search or filters."
            icon={
              <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
            }
          />
        </GlassCard>
      )}

      {status === 'success' && traders.length > 0 && (
        <GlassCard padding="none">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <TableHead />
              <tbody>
                {traders.map((trader, index) => (
                  <TraderCard
                    key={trader.id}
                    trader={trader}
                    rank={index + 1}
                    onClick={handleTraderClick}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
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
