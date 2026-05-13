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
        <p className="text-[11px] font-semibold uppercase tracking-wider text-secondary">
          EIP-712 Signature
        </p>
        {result && (
          <button
            onClick={onClear}
            className="text-[12px] font-medium text-secondary transition-colors hover:text-primary"
          >
            Clear
          </button>
        )}
      </div>

      {!result && !error && (
        <button
          onClick={onSign}
          disabled={isSigning}
          className="w-full rounded-lg bg-accent-green py-2.5 text-[13px] font-semibold text-page transition-all hover:brightness-110 disabled:opacity-50"
        >
          {isSigning ? 'Waiting for wallet...' : 'Sign Typed Message'}
        </button>
      )}

      {result && (
        <div className="animate-fade-in rounded-xl border border-surface-border bg-surface-elevated p-4">
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-secondary">
            Signature
          </p>
          <div className="flex items-center gap-3">
            <code className="flex-1 truncate font-mono text-[12px] text-accent-green">
              {result.signature}
            </code>
            <button
              onClick={() => copy(result.signature)}
              className="shrink-0 rounded-lg border border-surface-border bg-surface px-3 py-1.5 text-[12px] font-semibold text-secondary transition-colors hover:text-primary"
            >
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="animate-fade-in rounded-xl border border-bearish/15 bg-bearish/[0.04] px-4 py-3.5">
          <p className={`text-[13px] ${error.isUserRejection ? 'text-warning' : 'text-bearish'}`}>
            {error.message}
          </p>
          <button
            onClick={onSign}
            className="mt-2 text-[13px] font-semibold text-accent-green transition-colors hover:text-accent-green/80"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
