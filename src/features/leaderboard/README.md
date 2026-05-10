# Leaderboard Module

Fetches and displays crypto trader/token data from CoinGecko with sorting, filtering, and detail views.

## Components

- **LeaderboardView** -- Main view with filters, card grid, and infinite scroll.
- **TraderCard** -- Individual trader card with sparkline chart and key metrics.
- **LeaderboardFilters** -- Search bar, timeframe selector, and sort controls.
- **TraderDetailModal** -- Expanded view with full stats and larger chart.
- **Sparkline** -- Custom SVG sparkline chart with gradient fill.

## Hooks

- **useLeaderboard** -- Data fetching, sorting, filtering, and pagination logic.

## Data Pipeline

CoinGecko `/coins/markets` response is transformed into trader-like metrics:
- ROI is derived from price change percentage
- PNL is calculated from price * volume * change
- Win rate and max drawdown are deterministically generated from coin metadata

This approach ensures consistent data across page refreshes while simulating realistic trading metrics.
