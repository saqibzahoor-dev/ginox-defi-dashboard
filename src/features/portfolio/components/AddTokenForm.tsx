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
        className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-white/[0.06] bg-transparent py-2.5 text-[12px] font-medium text-secondary transition-all hover:border-white/[0.12] hover:bg-white/[0.02] hover:text-primary"
      >
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Add Token Manually
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="animate-fade-in rounded-xl border border-white/[0.06] bg-white/[0.02] p-3.5">
      <div className="mb-3 flex gap-2">
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value.toUpperCase())}
          placeholder="Symbol (e.g. LINK)"
          className="flex-1 rounded-lg border border-white/[0.04] bg-page/60 px-3 py-2 text-[13px] text-primary placeholder-secondary/40 transition-all focus:border-accent-green/30"
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
          className="w-28 rounded-lg border border-white/[0.04] bg-page/60 px-3 py-2 text-[13px] text-primary placeholder-secondary/40 transition-all focus:border-accent-green/30"
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 rounded-lg bg-accent-green/[0.1] py-2 text-[12px] font-semibold text-accent-green transition-all hover:bg-accent-green/[0.18]"
        >
          Add Token
        </button>
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="rounded-lg border border-white/[0.04] bg-white/[0.02] px-4 py-2 text-[12px] text-secondary transition-all hover:bg-white/[0.04] hover:text-primary"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
