import { useClipboard } from '@/shared/hooks/useClipboard';
import type { SignatureResult, WalletError } from '../types';

interface SignMessageProps {
  onSign: () => void;
  isSigning: boolean;
  result: SignatureResult | null;
  error: WalletError | null;
  onClear: () => void;
}

export function SignMessage({ onSign, isSigning, result, error, onClear }: SignMessageProps) {
  const { copied, copy } = useClipboard();

  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <p className="text-[11px] font-medium uppercase tracking-wider text-secondary">EIP-712 Signature</p>
        {result && (
          <button
            onClick={onClear}
            className="text-[11px] text-secondary transition-colors hover:text-primary"
          >
            Clear
          </button>
        )}
      </div>

      {!result && !error && (
        <button
          onClick={onSign}
          disabled={isSigning}
          className="w-full rounded-xl bg-accent-gradient px-4 py-2.5 text-[13px] font-semibold text-white shadow-[0_0_20px_-6px_rgba(10,196,136,0.3)] transition-all hover:shadow-[0_0_24px_-4px_rgba(10,196,136,0.4)] disabled:opacity-50 disabled:shadow-none"
        >
          {isSigning ? 'Waiting for wallet...' : 'Sign Typed Message'}
        </button>
      )}

      {result && (
        <div className="animate-fade-in rounded-xl border border-white/[0.04] bg-white/[0.02] p-3">
          <p className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-secondary">Signature</p>
          <div className="flex items-center gap-2">
            <code className="flex-1 truncate rounded-lg bg-page/60 px-2.5 py-1.5 font-mono text-[11px] text-accent-green">
              {result.signature}
            </code>
            <button
              onClick={() => copy(result.signature)}
              className="shrink-0 rounded-lg border border-white/[0.06] bg-white/[0.03] px-2.5 py-1.5 text-[11px] font-medium text-secondary transition-all hover:bg-white/[0.06] hover:text-primary"
            >
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="animate-fade-in rounded-xl border border-bearish/10 bg-bearish/[0.04] px-3.5 py-3">
          <p className={`text-[12px] ${error.isUserRejection ? 'text-yellow-400/80' : 'text-bearish'}`}>
            {error.message}
          </p>
          <button
            onClick={onSign}
            className="mt-2 text-[12px] font-medium text-accent-green transition-colors hover:text-accent-blue"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
