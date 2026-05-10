import { GlassCard, EmptyState } from '@/shared/components';
import { formatCurrency, formatPercent } from '@/shared/utils/format';
import { usePortfolio } from '../hooks/usePortfolio';
import { AllocationChart } from './AllocationChart';
import { TokenRow } from './TokenRow';
import { AddTokenForm } from './AddTokenForm';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export function PortfolioView() {
  const {
    isConnected,
    allTokens,
    summary,
    allocations,
    addManualToken,
    removeManualToken,
  } = usePortfolio();

  if (!isConnected) {
    return (
      <GlassCard>
        <EmptyState
          title="Wallet Not Connected"
          description="Connect your wallet to view your on-chain portfolio and track P&L performance."
          icon={
            <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
            </svg>
          }
        />
        <div className="mt-2 flex justify-center">
          <ConnectButton />
        </div>
      </GlassCard>
    );
  }

  return (
    <div className="space-y-5">
      <GlassCard>
        <h2 className="mb-5 text-[15px] font-semibold text-white">Portfolio</h2>

        <div className="mb-5 grid grid-cols-3 gap-3">
          <div className="rounded-xl border border-white/[0.04] bg-white/[0.02] px-3 py-3">
            <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-secondary">Total Value</p>
            <p className="font-mono text-[16px] font-bold text-white">
              {formatCurrency(summary.totalValue)}
            </p>
          </div>
          <div className="rounded-xl border border-white/[0.04] bg-white/[0.02] px-3 py-3">
            <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-secondary">Total P&L</p>
            <p className={`font-mono text-[16px] font-bold ${summary.totalPnl >= 0 ? 'text-bullish' : 'text-bearish'}`}>
              {formatCurrency(summary.totalPnl)}
            </p>
          </div>
          <div className="rounded-xl border border-white/[0.04] bg-white/[0.02] px-3 py-3">
            <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-secondary">P&L %</p>
            <p className={`font-mono text-[16px] font-bold ${summary.totalPnlPercent >= 0 ? 'text-bullish' : 'text-bearish'}`}>
              {formatPercent(summary.totalPnlPercent)}
            </p>
          </div>
        </div>

        <AllocationChart data={allocations} />
      </GlassCard>

      <GlassCard>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-[15px] font-semibold text-white">Holdings</h2>
          <span className="rounded-md bg-white/[0.04] px-2 py-[2px] text-[11px] font-medium text-secondary">
            {allTokens.length} tokens
          </span>
        </div>

        <div className="space-y-1.5">
          {allTokens.map((token) => (
            <TokenRow
              key={token.address}
              token={token}
              onRemove={token.isManual ? removeManualToken : undefined}
            />
          ))}
        </div>

        <div className="mt-4">
          <AddTokenForm onAdd={addManualToken} />
        </div>
      </GlassCard>
    </div>
  );
}
