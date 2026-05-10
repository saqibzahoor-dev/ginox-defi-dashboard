import { Toaster } from 'react-hot-toast';
import { ErrorBoundary } from '@/shared/components';
import { WalletPanel } from '@/features/wallet/components';
import { PriceTicker } from '@/features/ticker/components';
import { LeaderboardView } from '@/features/leaderboard/components';
import { PortfolioView } from '@/features/portfolio/components';
import { Header } from '@/app/Header';

export function App() {
  return (
    <div className="min-h-screen bg-page">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#0c1020',
            color: '#E0E7FF',
            border: '1px solid #1a1f35',
            fontSize: '13px',
            borderRadius: '8px',
            padding: '10px 14px',
          },
          success: { iconTheme: { primary: '#0AC488', secondary: '#fff' } },
          error: { iconTheme: { primary: '#FF5757', secondary: '#fff' } },
        }}
      />

      <Header />

      <div className="mx-auto max-w-[1440px] px-4 sm:px-6">
        <div className="border-b border-surface-border py-3">
          <ErrorBoundary moduleName="Price Ticker">
            <PriceTicker />
          </ErrorBoundary>
        </div>

        <div className="grid grid-cols-1 gap-5 py-5 xl:grid-cols-[1fr_340px]">
          <div className="min-w-0">
            <ErrorBoundary moduleName="Leaderboard">
              <LeaderboardView />
            </ErrorBoundary>
          </div>

          <div className="space-y-4">
            <ErrorBoundary moduleName="Wallet">
              <WalletPanel />
            </ErrorBoundary>
            <ErrorBoundary moduleName="Portfolio">
              <PortfolioView />
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </div>
  );
}
