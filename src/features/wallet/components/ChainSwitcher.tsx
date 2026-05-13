import { supportedChains } from '@/config/chains';
import { chainMeta } from '@/config/chains';
import type { WalletError } from '../types';

interface ChainSwitcherProps {
  currentChainId: number | undefined;
  onSwitch: (chainId: number) => void;
  isSwitching: boolean;
  error: WalletError | null;
}

export function ChainSwitcher({ currentChainId, onSwitch, isSwitching, error }: ChainSwitcherProps) {
  return (
    <div>
      <p className="mb-2.5 text-[11px] font-semibold uppercase tracking-wider text-secondary">
        Networks
      </p>
      <div className="flex flex-wrap gap-2">
        {supportedChains.map((chain) => {
          const meta = chainMeta[chain.id];
          const isActive = currentChainId === chain.id;

          return (
            <button
              key={chain.id}
              onClick={() => onSwitch(chain.id)}
              disabled={isActive || isSwitching}
              className={`flex items-center gap-2 rounded-lg px-3.5 py-2 text-[13px] font-medium transition-all ${
                isActive
                  ? 'border border-accent-green/25 bg-accent-green/[0.08] text-accent-green'
                  : 'border border-surface-border bg-surface-elevated text-secondary hover:border-border-emphasis hover:text-primary'
              } disabled:cursor-not-allowed disabled:opacity-50`}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: meta.color }}
              />
              {meta.label}
            </button>
          );
        })}
      </div>
      {error && (
        <p className={`mt-2.5 text-[12px] ${error.isUserRejection ? 'text-warning' : 'text-bearish'}`}>
          {error.message}
        </p>
      )}
    </div>
  );
}
