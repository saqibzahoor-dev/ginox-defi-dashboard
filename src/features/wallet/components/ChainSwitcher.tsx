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
      <p className="mb-2.5 text-[11px] font-medium uppercase tracking-wider text-secondary">Networks</p>
      <div className="flex flex-wrap gap-2">
        {supportedChains.map((chain) => {
          const meta = chainMeta[chain.id];
          const isActive = currentChainId === chain.id;

          return (
            <button
              key={chain.id}
              onClick={() => onSwitch(chain.id)}
              disabled={isActive || isSwitching}
              className={`flex items-center gap-1.5 rounded-lg px-3 py-2 text-[12px] font-medium transition-all ${
                isActive
                  ? 'border border-accent-green/20 bg-accent-green/[0.08] text-accent-green shadow-[0_0_12px_-4px_rgba(10,196,136,0.2)]'
                  : 'border border-white/[0.04] bg-white/[0.02] text-secondary hover:border-white/[0.08] hover:bg-white/[0.04] hover:text-primary'
              } disabled:cursor-not-allowed disabled:opacity-50`}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: meta.color, boxShadow: isActive ? `0 0 6px ${meta.color}50` : 'none' }}
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
