import { useState } from 'react';

interface AddTokenFormProps {
  onAdd: (symbol: string, balance: number) => void;
}

export function AddTokenForm({ onAdd }: AddTokenFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [symbol, setSymbol] = useState('');
  const [balance, setBalance] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!symbol.trim() || !balance.trim()) return;
    const bal = parseFloat(balance);
    if (isNaN(bal) || bal <= 0) return;

    onAdd(symbol.trim(), bal);
    setSymbol('');
    setBalance('');
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex w-full items-center justify-center gap-1.5 rounded border border-dashed border-surface-border py-2 text-[11px] font-medium text-secondary transition-colors hover:border-accent-green/30 hover:text-primary"
      >
        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Add Token
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="animate-fade-in rounded-lg border border-surface-border bg-page p-3">
      <div className="mb-2 flex gap-2">
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          placeholder="Symbol"
          className="flex-1 rounded border border-surface-border bg-surface px-2.5 py-1.5 text-[12px] text-primary placeholder-secondary/40 focus:border-accent-green/30"
          maxLength={10}
          autoFocus
        />
        <input
          type="number"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
          placeholder="Balance"
          step="any"
          min="0"
          className="w-24 rounded border border-surface-border bg-surface px-2.5 py-1.5 text-[12px] text-primary placeholder-secondary/40 focus:border-accent-green/30"
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 rounded bg-accent-green/[0.1] py-1.5 text-[11px] font-medium text-accent-green transition-colors hover:bg-accent-green/[0.18]"
        >
          Add
        </button>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="rounded border border-surface-border px-3 py-1.5 text-[11px] text-secondary transition-colors hover:text-primary"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
