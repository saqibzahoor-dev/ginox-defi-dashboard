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
    <div className="mb-6 space-y-3">
      <div className="relative">
        <svg
          className="absolute left-3.5 top-1/2 h-[14px] w-[14px] -translate-y-1/2 text-secondary"
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
          placeholder="Search by name or symbol..."
          className="w-full rounded-xl border border-white/[0.06] bg-white/[0.02] py-2.5 pl-10 pr-4 text-[13px] text-primary placeholder-secondary/50 transition-all focus:border-accent-green/30 focus:bg-white/[0.04] focus:shadow-[0_0_0_3px_rgba(10,196,136,0.06)]"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-0.5 rounded-lg border border-white/[0.04] bg-white/[0.02] p-[3px]">
          {TIMEFRAMES.map((tf) => (
            <button
              key={tf}
              onClick={() => onTimeframeChange(tf)}
              className={`rounded-md px-3 py-[5px] text-[11px] font-semibold transition-all ${
                timeframe === tf
                  ? 'bg-accent-green/[0.12] text-accent-green shadow-[0_0_8px_-3px_rgba(10,196,136,0.2)]'
                  : 'text-secondary hover:text-primary'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-1">
          {SORT_OPTIONS.map(({ field, label }) => (
            <button
              key={field}
              onClick={() => onSort(field)}
              className={`flex items-center gap-1 rounded-lg px-3 py-[6px] text-[11px] font-semibold transition-all ${
                sortField === field
                  ? 'bg-accent-green/[0.12] text-accent-green'
                  : 'text-secondary hover:bg-white/[0.03] hover:text-primary'
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
    </div>
  );
}
