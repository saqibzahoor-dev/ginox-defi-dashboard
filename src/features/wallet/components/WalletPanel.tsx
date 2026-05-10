import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useDisconnect } from 'wagmi';
import { GlassCard, Skeleton } from '@/shared/components';
import { useWalletData } from '../hooks/useWalletData';
import { NetworkBadge } from './NetworkBadge';
import { ChainSwitcher } from './ChainSwitcher';
import { SignMessage } from './SignMessage';
import { useClipboard } from '@/shared/hooks/useClipboard';

export function WalletPanel() {
  const {
    isConnected,
    formattedAddress,
    formattedNativeBalance,
    nativeSymbol,
    usdcBalance,
    isNativeBalanceLoading,
    networkInfo,
    chain,
    isSwitching,
    switchError,
    handleSwitchChain,
    isSigning,
    signatureResult,
    signError,
    handleSignMessage,
    clearSignature,
    address,
  } = useWalletData();

  const { disconnect } = useDisconnect();
  const { copied, copy } = useClipboard();

  if (!isConnected) {
    return (
      <GlassCard className="flex h-full flex-col items-center justify-center py-12">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-green/[0.08] shadow-[0_0_30px_-8px_rgba(10,196,136,0.15)]">
          <svg className="h-7 w-7 text-accent-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3" />
          </svg>
        </div>
        <p className="mb-1 text-sm font-semibold text-white">Connect Your Wallet</p>
        <p className="mb-6 text-xs text-secondary">Link your wallet to access on-chain data</p>
        <ConnectButton />
      </GlassCard>
    );
  }

  return (
    <GlassCard className="h-full">
      <div className="mb-5 flex items-start justify-between">
        <div>
          <div className="mb-1.5 flex items-center gap-2">
            <button
              onClick={() => address && copy(address)}
              className="font-mono text-[13px] font-semibold text-white transition-colors hover:text-accent-green"
              title={address}
            >
              {formattedAddress}
            </button>
            {copied && (
              <span className="animate-fade-in rounded bg-accent-green/10 px-1.5 py-0.5 text-[10px] font-medium text-accent-green">
                Copied
              </span>
            )}
          </div>
          {networkInfo && <NetworkBadge label={networkInfo.label} color={networkInfo.color} />}
        </div>
        <button
          onClick={() => disconnect()}
          className="rounded-lg border border-bearish/20 bg-bearish/[0.06] px-3 py-1.5 text-[11px] font-medium text-bearish transition-all hover:bg-bearish/[0.12]"
        >
          Disconnect
        </button>
      </div>

      <div className="mb-5 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-white/[0.04] bg-white/[0.02] px-3.5 py-3">
          <p className="mb-1 text-[11px] font-medium uppercase tracking-wider text-secondary">Native</p>
          {isNativeBalanceLoading ? (
            <Skeleton className="h-5 w-20" />
          ) : (
            <p className="font-mono text-[15px] font-bold text-white">
              {formattedNativeBalance} <span className="text-[11px] font-medium text-secondary">{nativeSymbol}</span>
            </p>
          )}
        </div>
        <div className="rounded-xl border border-white/[0.04] bg-white/[0.02] px-3.5 py-3">
          <p className="mb-1 text-[11px] font-medium uppercase tracking-wider text-secondary">USDC</p>
          <p className="font-mono text-[15px] font-bold text-white">
            {usdcBalance} <span className="text-[11px] font-medium text-secondary">USDC</span>
          </p>
        </div>
      </div>

      <div className="mb-5">
        <ChainSwitcher
          currentChainId={chain?.id}
          onSwitch={handleSwitchChain}
          isSwitching={isSwitching}
          error={switchError}
        />
      </div>

      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="mt-5">
        <SignMessage
          onSign={handleSignMessage}
          isSigning={isSigning}
          result={signatureResult}
          error={signError}
          onClear={clearSignature}
        />
      </div>
    </GlassCard>
  );
}
