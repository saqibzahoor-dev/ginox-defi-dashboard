import { ConnectButton } from '@rainbow-me/rainbowkit';

const NAV_ITEMS = ['Dashboard', 'Trade', 'Portfolio', 'Markets', 'Leaderboard'];

export function Header() {
  return (
    <header className="border-b border-surface-border bg-surface">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 sm:px-8">
        <div className="flex items-center gap-8 sm:gap-10">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-green/10">
              <span className="font-display text-sm font-bold text-accent-green">G</span>
            </div>
            <span className="font-display text-[17px] font-bold tracking-tight text-primary">
              GINOX
            </span>
          </div>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV_ITEMS.map((item, i) => (
              <span
                key={item}
                className={`rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors ${
                  i === 0
                    ? 'bg-accent-green/[0.08] text-accent-green'
                    : 'text-secondary hover:bg-surface-hover hover:text-primary'
                }`}
              >
                {item}
              </span>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-5">
          <div className="hidden items-center gap-2 sm:flex">
            <span className="text-[13px] text-secondary">Portfolio</span>
            <span className="font-mono text-[14px] font-semibold text-primary">--</span>
            <span className="rounded bg-surface-elevated px-1.5 py-0.5 text-[11px] font-medium text-secondary">USD</span>
          </div>
          <div className="h-6 w-px bg-surface-border hidden sm:block" />
          <ConnectButton
            chainStatus="icon"
            showBalance={false}
            accountStatus={{ smallScreen: 'avatar', largeScreen: 'full' }}
          />
        </div>
      </div>
    </header>
  );
}
