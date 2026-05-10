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
      <div className="mb-2 flex items-center justify-between">
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
          className="w-full rounded bg-accent-green py-2 text-[12px] font-medium text-white transition-colors hover:bg-accent-green/90 disabled:opacity-50"
        >
          {isSigning ? 'Waiting for wallet...' : 'Sign Typed Message'}
        </button>
      )}

      {result && (
        <div className="animate-fade-in rounded-lg border border-surface-border bg-page p-3">
          <p className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-secondary">Signature</p>
          <div className="flex items-center gap-2">
            <code className="flex-1 truncate font-mono text-[11px] text-accent-green">
              {result.signature}
            </code>
            <button
              onClick={() => copy(result.signature)}
              className="shrink-0 rounded border border-surface-border px-2 py-1 text-[11px] font-medium text-secondary transition-colors hover:text-primary"
            >
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="animate-fade-in rounded-lg border border-bearish/10 bg-bearish/[0.04] px-3 py-2.5">
          <p className={`text-[12px] ${error.isUserRejection ? 'text-yellow-400/80' : 'text-bearish'}`}>
            {error.message}
          </p>
          <button
            onClick={onSign}
            className="mt-1.5 text-[12px] font-medium text-accent-green transition-colors hover:text-accent-green/80"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
