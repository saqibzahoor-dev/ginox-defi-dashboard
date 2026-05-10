# Ginox DeFi Trading Dashboard

A production-grade DeFi trading dashboard built with React 18, TypeScript, and wagmi v2. Features real wallet connectivity, live on-chain data, real-time price feeds from Binance, and a professional trading UI.

## Tech Stack

| Layer            | Technology                                |
|------------------|-------------------------------------------|
| Framework        | React 18 + TypeScript (strict mode)       |
| Build Tool       | Vite 5                                    |
| Styling          | Tailwind CSS (custom only, no UI libs)    |
| Web3             | wagmi v2 + viem + RainbowKit              |
| State Management | Zustand                                   |
| Charts           | Recharts + Custom SVG Sparklines          |
| Linting          | ESLint + Prettier                         |
| Deployment       | Vercel                                    |

## Architecture

### Why Zustand over Redux Toolkit

Zustand was chosen for several reasons specific to this project:

1. **Minimal boilerplate** -- DeFi dashboards have many small, independent state slices (ticker data, wallet state, portfolio). Zustand lets each slice live in its own file without action creators or dispatch wrappers.

2. **Built-in persistence middleware** -- The portfolio store uses `persist` to sync manual token additions to localStorage. With Redux, this requires `redux-persist` as an additional dependency.

3. **Bundle size** -- Zustand is ~1KB gzipped vs ~11KB for RTK. In a Web3 app where wagmi, viem, and RainbowKit already add significant weight, keeping state management lean matters.

4. **Industry alignment** -- Major DeFi protocols (Uniswap, SushiSwap) use Zustand. It's the de facto standard in Web3 frontend.

### Module Architecture

The app follows a feature-based architecture where each module is self-contained:

```
src/
  app/                     # App shell (providers, header)
  features/
    wallet/                # Module 1 -- Wallet Connect & On-Chain Data
    leaderboard/           # Module 2 -- Trader Leaderboard
    ticker/                # Module 3 -- Real-Time Price Ticker
    portfolio/             # Module 4 -- On-Chain Portfolio Tracker
  shared/                  # Shared components, hooks, types, utils
  stores/                  # Zustand stores (one per domain)
  config/                  # Chain config, constants, wagmi setup
```

Each feature module contains:
- `components/` -- React components (UI layer)
- `hooks/` -- Custom hooks (business logic)
- `types/` -- TypeScript interfaces and type guards
- `utils/` -- Pure utility functions

### Custom Hooks

All business logic is extracted from components into custom hooks:

- **`useWalletData`** -- Wallet connection state, balances, chain switching, EIP-712 signing
- **`useWebSocket`** -- Binance WebSocket with auto-reconnect and exponential backoff
- **`useLeaderboard`** -- CoinGecko data fetching, sorting, filtering, pagination
- **`usePortfolio`** -- Portfolio aggregation, P&L calculation, manual token management

### Error Handling Strategy

- Each module is wrapped in an independent `ErrorBoundary` -- one module crashing won't affect others
- All async operations use discriminated union types (`idle | loading | success | error`)
- Wallet interactions handle user rejection separately from network errors
- WebSocket reconnects with exponential backoff (1s, 2s, 4s, 8s, 16s), max 5 retries
- CoinGecko rate limiting is detected and surfaced with retry UI

### State Flow

```
Binance WebSocket --> tickerStore --> PriceTicker (Module 3)
                                 --> PortfolioView (Module 4, live prices for P&L)

Wallet (wagmi)    --> useWalletData --> WalletPanel (Module 1)
                                   --> usePortfolio (Module 4, token balances)

CoinGecko API     --> leaderboardStore --> LeaderboardView (Module 2)

localStorage      --> portfolioStore (persist middleware) --> PortfolioView (Module 4)
```

## Getting Started

### Prerequisites

- Node.js 18+
- A Web3 wallet (MetaMask, Coinbase Wallet, etc.)
- WalletConnect Project ID (free at https://cloud.walletconnect.com)

### Installation

```bash
git clone <repo-url>
cd ginox-defi-dashboard
npm install
```

### Environment Setup

```bash
cp .env.example .env
```

Edit `.env` and add your WalletConnect Project ID:

```
VITE_WALLETCONNECT_PROJECT_ID=your_project_id_here
```

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
npm run preview
```

## Modules

### Module 1: Wallet Connect & On-Chain Data
- Multi-wallet support via RainbowKit (MetaMask, WalletConnect, Coinbase)
- Connection persists across page refresh
- Displays truncated address, native balance (ETH/BNB), and USDC balance
- Network badge with chain detection
- Chain switching with graceful rejection handling
- EIP-712 typed message signing with signature display
- No real transactions -- signing only

### Module 2: Live Trader Leaderboard
- Data sourced from CoinGecko public API (no key required)
- Responsive card grid with custom SVG sparkline charts
- Sort by ROI%, PNL, Volume (ascending/descending toggle)
- Timeframe filter: 7D / 30D / 90D / ALL
- Debounced search (300ms) by name or address
- Detail modal with expanded stats and chart
- Infinite scroll via IntersectionObserver
- Skeleton loaders, error states, empty states

### Module 3: Real-Time Price Ticker
- Live BTC, ETH, BNB prices via Binance WebSocket
- Price, 24h change %, 24h volume
- Green/red flash animations on price movement
- Auto-reconnect with exponential backoff (max 5 retries)
- Connection status indicator (connected / reconnecting / disconnected)
- Clean WebSocket teardown on unmount

### Module 4: On-Chain Portfolio Tracker
- Auto-loads native token balance from connected wallet
- P&L per token (mock entry price vs live price from Module 3)
- Donut chart for portfolio allocation (Recharts)
- Total portfolio value and overall P&L (absolute + percentage)
- Manual token addition for tokens not auto-detected
- Persists manual additions to localStorage
- Empty state prompts wallet connection

## Design System

- **Dark mode only** with page background `#010510`
- **Glassmorphism cards** with `backdrop-filter: blur(20px)` and inset shadows
- **No UI libraries** -- Tailwind CSS with custom configuration only
- Color system: `#0AC488` (bullish), `#FF5757` (bearish), `#E0E7FF` (primary text)
- Accent gradient: `#0AC488` to `#33A0EA`
- Skeleton loaders on all async operations
- Fully responsive (mobile, tablet, desktop)
- Custom scrollbar styling
- Inter + JetBrains Mono typography

## Known Limitations

- CoinGecko free API has rate limits (~10-30 requests/minute). The leaderboard may show rate limit errors under heavy usage -- the UI provides retry functionality.
- Portfolio P&L uses mock entry prices since actual trade history would require indexer integration.
- ERC-20 token detection is limited to USDC on supported chains. A production implementation would use an indexer like Alchemy's token API.
- Binance WebSocket may be blocked in certain regions -- the connection status indicator reflects this.

## Performance

- `useMemo` / `useCallback` applied to expensive computations and event handlers
- WebSocket message processing avoids unnecessary re-renders via Zustand's selector pattern
- Skeleton loaders prevent layout shift during data loading
- Lazy-loaded images with native `loading="lazy"`
