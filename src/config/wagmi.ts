import { connectorsForWallets } from '@rainbow-me/rainbowkit';
import {
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
  rainbowWallet,
  trustWallet,
  phantomWallet,
  safeWallet,
  ledgerWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { createConfig, http } from 'wagmi';
import { mainnet, polygon, arbitrum, optimism, base, bsc, avalanche, sepolia } from 'wagmi/chains';
import { APP_NAME } from './constants';

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || '';

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [
        metaMaskWallet,
        coinbaseWallet,
        walletConnectWallet,
        rainbowWallet,
      ],
    },
    {
      groupName: 'More Wallets',
      wallets: [
        trustWallet,
        phantomWallet,
        ledgerWallet,
        safeWallet,
      ],
    },
  ],
  {
    appName: APP_NAME,
    projectId,
  },
);

export const wagmiConfig = createConfig({
  connectors,
  chains: [mainnet, polygon, arbitrum, optimism, base, bsc, avalanche, sepolia],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
    [optimism.id]: http(),
    [base.id]: http(),
    [bsc.id]: http(),
    [avalanche.id]: http(),
    [sepolia.id]: http(),
  },
  ssr: false,
});
