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
            background: '#151722',
            color: '#ECEEF4',
            border: '1px solid #1E2236',
            fontSize: '13px',
            borderRadius: '10px',
            padding: '12px 16px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
          },
          success: { iconTheme: { primary: '#00E5A0', secondary: '#fff' } },
          error: { iconTheme: { primary: '#FF4757', secondary: '#fff' } },
        }}
      />

      <Header />

      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <div className="border-b border-surface-border py-4">
          <ErrorBoundary moduleName="Price Ticker">
            <PriceTicker />
          </ErrorBoundary>
        </div>

        <div className="grid grid-cols-1 gap-6 py-6 xl:grid-cols-[1fr_380px]">
          <div className="min-w-0">
            <ErrorBoundary moduleName="Leaderboard">
              <LeaderboardView />
            </ErrorBoundary>
          </div>

          <div className="space-y-5">
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
