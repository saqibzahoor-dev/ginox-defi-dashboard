import { Toaster } from 'react-hot-toast';
import { ErrorBoundary } from '@/shared/components';
import { WalletPanel } from '@/features/wallet/components';
import { PriceTicker } from '@/features/ticker/components';
import { LeaderboardView } from '@/features/leaderboard/components';
import { PortfolioView } from '@/features/portfolio/components';
import { Header } from '@/app/Header';

export function App() {
  return (
    <div className="relative min-h-screen bg-page">
      <div className="ambient-glow left-[-10%] top-[5%] h-[500px] w-[500px] bg-accent-green/[0.03]" />
      <div className="ambient-glow right-[-5%] top-[40%] h-[400px] w-[400px] bg-accent-blue/[0.04]" />
      <div className="ambient-glow left-[30%] bottom-[10%] h-[350px] w-[350px] bg-accent-green/[0.02]" />
      <div className="noise-overlay" />

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'rgba(12, 16, 36, 0.95)',
            color: '#E0E7FF',
            border: '1px solid rgba(255,255,255,0.08)',
            fontSize: '13px',
            backdropFilter: 'blur(20px)',
            borderRadius: '12px',
            padding: '12px 16px',
          },
          success: { iconTheme: { primary: '#0AC488', secondary: '#fff' } },
          error: { iconTheme: { primary: '#FF5757', secondary: '#fff' } },
        }}
      />

      <div className="relative z-10">
        <Header />

        <main className="mx-auto max-w-[1440px] px-5 pb-16 pt-8 sm:px-8">
          <div className="mb-8 grid grid-cols-1 gap-5 lg:grid-cols-3">
            <div className="lg:col-span-1">
              <ErrorBoundary moduleName="Wallet">
                <WalletPanel />
              </ErrorBoundary>
            </div>

            <div className="lg:col-span-2">
              <ErrorBoundary moduleName="Price Ticker">
                <PriceTicker />
              </ErrorBoundary>
            </div>
          </div>

          <div className="h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />

          <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-4">
            <div className="xl:col-span-3">
              <ErrorBoundary moduleName="Leaderboard">
                <LeaderboardView />
              </ErrorBoundary>
            </div>

            <div className="xl:col-span-1">
              <ErrorBoundary moduleName="Portfolio">
                <PortfolioView />
              </ErrorBoundary>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
