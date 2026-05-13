import { useState, useEffect, useMemo } from 'react';
import { TIMEFRAMES, SEARCH_DEBOUNCE_MS } from '@/config/constants';
import { debounce } from '@/shared/utils/debounce';
import type { SortField, SortDirection, Timeframe } from '@/shared/types';

interface LeaderboardFiltersProps {
  sortField: SortField;
  sortDirection: SortDirection;
  timeframe: Timeframe;
  onSort: (field: SortField) => void;
  onTimeframeChange: (tf: Timeframe) => void;
  onSearch: (query: string) => void;
}

const SORT_OPTIONS: { field: SortField; label: string }[] = [
  { field: 'roi', label: 'ROI' },
  { field: 'pnl', label: 'PNL' },
  { field: 'volume', label: 'Volume' },
];

export function LeaderboardFilters({
  sortField,
  sortDirection,
  timeframe,
  onSort,
  onTimeframeChange,
  onSearch,
}: LeaderboardFiltersProps) {
  const [inputValue, setInputValue] = useState('');

  const debouncedSearch = useMemo(
    () => debounce((value: string) => onSearch(value), SEARCH_DEBOUNCE_MS),
    [onSearch],
  );

  useEffect(() => {
    debouncedSearch(inputValue);
  }, [inputValue, debouncedSearch]);

  return (
    <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <h2 className="font-display text-[16px] font-semibold text-primary">Leaderboard</h2>

        <div className="flex items-center rounded-lg border border-surface-border bg-surface-elevated p-1">
          {TIMEFRAMES.map((tf) => (
            <button
              key={tf}
              onClick={() => onTimeframeChange(tf)}
              className={`rounded-md px-3 py-1.5 text-[12px] font-semibold transition-all ${
                timeframe === tf
                  ? 'bg-accent-green text-page shadow-sm'
                  : 'text-secondary hover:text-primary'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>

        <div className="hidden items-center gap-1 sm:flex">
          {SORT_OPTIONS.map(({ field, label }) => (
            <button
              key={field}
              onClick={() => onSort(field)}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[12px] font-semibold transition-colors ${
                sortField === field
                  ? 'bg-accent-green/[0.08] text-accent-green'
                  : 'text-secondary hover:bg-surface-hover hover:text-primary'
              }`}
            >
              {label}
              {sortField === field && (
                <svg
                  className={`h-3 w-3 transition-transform ${sortDirection === 'asc' ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="relative">
        <svg
          className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-tertiary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search token..."
          className="w-full rounded-lg border border-surface-border bg-surface-elevated py-2 pl-10 pr-4 text-[13px] text-primary placeholder-tertiary transition-colors focus:border-accent-green/30 sm:w-56"
        />
      </div>
    </div>
  );
}
