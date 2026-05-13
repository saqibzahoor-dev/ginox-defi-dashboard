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
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-surface-border py-3 text-[13px] font-medium text-secondary transition-all hover:border-accent-green/30 hover:bg-accent-green/[0.03] hover:text-primary"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Add Token
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="animate-fade-in rounded-xl border border-surface-border bg-surface-elevated p-4">
      <div className="mb-3 flex gap-3">
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          placeholder="Symbol"
          className="flex-1 rounded-lg border border-surface-border bg-surface px-3.5 py-2.5 text-[13px] text-primary placeholder-tertiary transition-colors focus:border-accent-green/30"
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
          className="w-28 rounded-lg border border-surface-border bg-surface px-3.5 py-2.5 text-[13px] text-primary placeholder-tertiary transition-colors focus:border-accent-green/30"
        />
      </div>
      <div className="flex gap-3">
        <button
          type="submit"
          className="flex-1 rounded-lg bg-accent-green py-2.5 text-[13px] font-semibold text-page transition-all hover:brightness-110"
        >
          Add
        </button>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="rounded-lg border border-surface-border px-4 py-2.5 text-[13px] font-medium text-secondary transition-colors hover:text-primary"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
