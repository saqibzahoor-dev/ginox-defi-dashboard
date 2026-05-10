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
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <h2 className="text-[15px] font-semibold text-white">Leaderboard</h2>

        <div className="flex items-center gap-0.5 rounded border border-surface-border bg-page p-0.5">
          {TIMEFRAMES.map((tf) => (
            <button
              key={tf}
              onClick={() => onTimeframeChange(tf)}
              className={`rounded px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                timeframe === tf
                  ? 'bg-accent-green text-white'
                  : 'text-secondary hover:text-primary'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>

        <div className="hidden items-center gap-0.5 sm:flex">
          {SORT_OPTIONS.map(({ field, label }) => (
            <button
              key={field}
              onClick={() => onSort(field)}
              className={`flex items-center gap-1 rounded px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                sortField === field
                  ? 'text-accent-green'
                  : 'text-secondary hover:text-primary'
              }`}
            >
              {label}
              {sortField === field && (
                <svg
                  className={`h-2.5 w-2.5 transition-transform ${sortDirection === 'asc' ? 'rotate-180' : ''}`}
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
          className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-secondary"
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
          className="w-full rounded border border-surface-border bg-page py-1.5 pl-9 pr-3 text-[12px] text-primary placeholder-secondary/50 transition-colors focus:border-accent-green/30 sm:w-52"
        />
      </div>
    </div>
  );
}
