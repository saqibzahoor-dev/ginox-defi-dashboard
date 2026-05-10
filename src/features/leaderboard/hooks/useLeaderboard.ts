import { useEffect, useCallback } from 'react';
import { useLeaderboardStore } from '@/stores/leaderboardStore';
import { COINGECKO_BASE_URL } from '@/config/constants';
import { transformCoinToTrader } from '../utils/transform';
import type { CoinGeckoMarket } from '../types';
import type { TraderCard, Timeframe } from '@/shared/types';

const PAGE_SIZE = 20;

async function fetchMarkets(page: number, _timeframe: Timeframe): Promise<CoinGeckoMarket[]> {
  const params = new URLSearchParams({
    vs_currency: 'usd',
    order: 'market_cap_desc',
    per_page: PAGE_SIZE.toString(),
    page: page.toString(),
    sparkline: 'true',
    price_change_percentage: '7d,30d',
    locale: 'en',
  });

  const response = await fetch(`${COINGECKO_BASE_URL}/coins/markets?${params}`);

  if (response.status === 429) {
    throw new Error('Rate limited by CoinGecko. Please wait a moment.');
  }

  if (!response.ok) {
    throw new Error(`CoinGecko API error: ${response.status}`);
  }

  return response.json();
}

function sortTraders(
  traders: TraderCard[],
  field: 'roi' | 'pnl' | 'volume',
  direction: 'asc' | 'desc',
): TraderCard[] {
  return [...traders].sort((a, b) => {
    const aVal = a[field];
    const bVal = b[field];
    return direction === 'desc' ? bVal - aVal : aVal - bVal;
  });
}

function filterTraders(traders: TraderCard[], query: string): TraderCard[] {
  if (!query.trim()) return traders;
  const lower = query.toLowerCase();
  return traders.filter(
    (t) =>
      t.name.toLowerCase().includes(lower) ||
      t.symbol.toLowerCase().includes(lower) ||
      t.address.toLowerCase().includes(lower),
  );
}

export function useLeaderboard() {
  const {
    traders,
    sortField,
    sortDirection,
    timeframe,
    searchQuery,
    page,
    hasMore,
    setTraders,
    appendTraders,
    setSortField,
    toggleSortDirection,
    setTimeframe,
    setSearchQuery,
    incrementPage,
    resetPage,
    setHasMore,
  } = useLeaderboardStore();

  const loadTraders = useCallback(
    async (pageNum: number, append = false) => {
      if (!append) {
        setTraders({ status: 'loading' });
      }

      try {
        const data = await fetchMarkets(pageNum, timeframe);
        const transformed = data.map(transformCoinToTrader);

        if (append) {
          appendTraders(transformed);
        } else {
          setTraders({ status: 'success', data: transformed });
        }

        setHasMore(data.length === PAGE_SIZE);
      } catch (err) {
        if (!append) {
          setTraders({
            status: 'error',
            error: err instanceof Error ? err.message : 'Failed to load data',
          });
        }
      }
    },
    [timeframe, setTraders, appendTraders, setHasMore],
  );

  useEffect(() => {
    resetPage();
    loadTraders(1);
  }, [timeframe, loadTraders, resetPage]);

  const loadMore = useCallback(() => {
    if (!hasMore || traders.status !== 'success') return;
    const nextPage = page + 1;
    incrementPage();
    loadTraders(nextPage, true);
  }, [hasMore, traders.status, page, incrementPage, loadTraders]);

  const processedTraders = (() => {
    if (traders.status !== 'success') return [];
    let result = filterTraders(traders.data, searchQuery);
    result = sortTraders(result, sortField, sortDirection);
    return result;
  })();

  const handleSort = useCallback(
    (field: 'roi' | 'pnl' | 'volume') => {
      if (field === sortField) {
        toggleSortDirection();
      } else {
        setSortField(field);
      }
    },
    [sortField, setSortField, toggleSortDirection],
  );

  return {
    traders: processedTraders,
    status: traders.status,
    error: traders.status === 'error' ? traders.error : null,
    sortField,
    sortDirection,
    timeframe,
    searchQuery,
    hasMore,
    handleSort,
    setTimeframe,
    setSearchQuery,
    loadMore,
    reload: () => loadTraders(1),
  };
}
