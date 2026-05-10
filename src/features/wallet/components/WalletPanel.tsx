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
      <GlassCard className="py-8 text-center">
        <p className="mb-1 text-sm font-medium text-white">Connect Wallet</p>
        <p className="mb-5 text-[12px] text-secondary">
          Connect your wallet to access on-chain data
        </p>
        <div className="flex justify-center">
          <ConnectButton />
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard>
      <div className="mb-4 flex items-start justify-between">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <button
              onClick={() => address && copy(address)}
              className="font-mono text-[13px] font-medium text-white transition-colors hover:text-accent-green"
              title={address}
            >
              {formattedAddress}
            </button>
            {copied && (
              <span className="animate-fade-in text-[10px] text-accent-green">Copied</span>
            )}
          </div>
          {networkInfo && <NetworkBadge label={networkInfo.label} color={networkInfo.color} />}
        </div>
        <button
          onClick={() => disconnect()}
          className="rounded border border-bearish/20 px-2.5 py-1 text-[11px] font-medium text-bearish transition-colors hover:bg-bearish/[0.06]"
        >
          Disconnect
        </button>
      </div>

      <div className="mb-4 grid grid-cols-2 gap-2.5">
        <div className="rounded-lg border border-surface-border bg-page px-3 py-2.5">
          <p className="mb-0.5 text-[10px] font-medium uppercase tracking-wider text-secondary">Native</p>
          {isNativeBalanceLoading ? (
            <Skeleton className="h-4 w-16" />
          ) : (
            <p className="font-mono text-[14px] font-semibold text-white">
              {formattedNativeBalance} <span className="text-[10px] text-secondary">{nativeSymbol}</span>
            </p>
          )}
        </div>
        <div className="rounded-lg border border-surface-border bg-page px-3 py-2.5">
          <p className="mb-0.5 text-[10px] font-medium uppercase tracking-wider text-secondary">USDC</p>
          <p className="font-mono text-[14px] font-semibold text-white">
            {usdcBalance} <span className="text-[10px] text-secondary">USDC</span>
          </p>
        </div>
      </div>

      <div className="mb-4">
        <ChainSwitcher
          currentChainId={chain?.id}
          onSwitch={handleSwitchChain}
          isSwitching={isSwitching}
          error={switchError}
        />
      </div>

      <div className="border-t border-surface-border pt-4">
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
