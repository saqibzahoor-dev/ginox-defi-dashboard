export const APP_NAME = 'Ginox';

export const BINANCE_WS_URL = 'wss://stream.binance.com:9443/ws';

export const BINANCE_STREAMS = ['btcusdt@ticker', 'ethusdt@ticker', 'bnbusdt@ticker'] as const;

export const COINGECKO_BASE_URL = 'https://api.coingecko.com/api/v3';

export const USDC_ADDRESSES: Record<number, `0x${string}`> = {
  1: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  56: '0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d',
  11155111: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238',
};

export const USDT_ADDRESSES: Record<number, `0x${string}`> = {
  1: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  56: '0x55d398326f99059fF775485246999027B3197955',
  11155111: '0xaA8E23Fb1079EA71e0a56F48a2aA51851D8433D0',
};

export const ERC20_ABI = [
  {
    type: 'function',
    name: 'balanceOf',
    stateMutability: 'view',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ name: '', type: 'uint256' }],
  },
  {
    type: 'function',
    name: 'decimals',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'uint8' }],
  },
  {
    type: 'function',
    name: 'symbol',
    stateMutability: 'view',
    inputs: [],
    outputs: [{ name: '', type: 'string' }],
  },
] as const;

export const SEARCH_DEBOUNCE_MS = 300;

export const WS_RECONNECT_MAX_RETRIES = 5;

export const WS_RECONNECT_BASE_DELAY = 1000;

export const TICKER_SYMBOLS: Record<string, string> = {
  btcusdt: 'BTC',
  ethusdt: 'ETH',
  bnbusdt: 'BNB',
};

export const TIMEFRAMES = ['7D', '30D', '90D', 'ALL'] as const;
export type Timeframe = (typeof TIMEFRAMES)[number];

export const TIMEFRAME_DAYS: Record<Timeframe, number> = {
  '7D': 7,
  '30D': 30,
  '90D': 90,
  ALL: 365,
};
