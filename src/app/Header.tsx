import { ConnectButton } from '@rainbow-me/rainbowkit';

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-[rgba(1,5,16,0.85)] backdrop-blur-2xl">
      <div className="mx-auto flex h-[60px] max-w-[1440px] items-center justify-between px-5 sm:px-8">
        <div className="flex items-center gap-3">
          <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-accent-gradient shadow-[0_0_20px_-4px_rgba(10,196,136,0.4)]">
            <span className="text-sm font-bold text-white">G</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="text-[15px] font-semibold tracking-tight text-white">Ginox</span>
            <span className="hidden rounded-md bg-white/[0.06] px-2 py-[3px] text-[10px] font-medium uppercase tracking-wider text-secondary sm:inline-block">
              Dashboard
            </span>
          </div>
        </div>

        <ConnectButton
          chainStatus="icon"
          showBalance={false}
          accountStatus={{
            smallScreen: 'avatar',
            largeScreen: 'full',
          }}
        />
      </div>
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </header>
  );
}
