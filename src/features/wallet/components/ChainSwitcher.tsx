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
      <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-secondary">Networks</p>
      <div className="flex flex-wrap gap-1.5">
        {supportedChains.map((chain) => {
          const meta = chainMeta[chain.id];
          const isActive = currentChainId === chain.id;

          return (
            <button
              key={chain.id}
              onClick={() => onSwitch(chain.id)}
              disabled={isActive || isSwitching}
              className={`flex items-center gap-1.5 rounded px-2.5 py-1.5 text-[12px] font-medium transition-colors ${
                isActive
                  ? 'border border-accent-green/20 bg-accent-green/[0.08] text-accent-green'
                  : 'border border-surface-border bg-page text-secondary hover:text-primary'
              } disabled:cursor-not-allowed disabled:opacity-50`}
            >
              <span
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: meta.color }}
              />
              {meta.label}
            </button>
          );
        })}
      </div>
      {error && (
        <p className={`mt-2 text-[11px] ${error.isUserRejection ? 'text-yellow-400/80' : 'text-bearish'}`}>
          {error.message}
        </p>
      )}
    </div>
  );
}
