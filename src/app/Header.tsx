import { ConnectButton } from '@rainbow-me/rainbowkit';

const NAV_ITEMS = ['Dashboard', 'Trade', 'Portfolio', 'Markets', 'Leaderboard'];

export function Header() {
  return (
    <header className="border-b border-surface-border bg-surface">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-6 sm:gap-8">
          <span className="text-lg font-bold tracking-tight text-white">
            GI<span className="text-accent-green">N</span>OX
          </span>
          <nav className="hidden items-center gap-0.5 md:flex">
            {NAV_ITEMS.map((item, i) => (
              <span
                key={item}
                className={`rounded px-3 py-1.5 text-[13px] font-medium transition-colors ${
                  i === 0
                    ? 'text-accent-green'
                    : 'cursor-default text-secondary hover:text-primary'
                }`}
              >
                {item}
              </span>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden items-center gap-1.5 text-[13px] sm:flex">
            <span className="text-secondary">Total value</span>
            <span className="font-mono text-white">-</span>
            <span className="text-[11px] text-secondary">USDC</span>
          </div>
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
