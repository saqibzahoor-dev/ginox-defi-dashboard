import { mainnet, bsc, sepolia } from 'wagmi/chains';

export const supportedChains = [mainnet, bsc, sepolia] as const;

export const defaultChain = mainnet;

export const chainMeta: Record<number, { label: string; color: string; icon: string }> = {
  [mainnet.id]: {
    label: 'Ethereum',
    color: '#627EEA',
    icon: 'ETH',
  },
  [bsc.id]: {
    label: 'BNB Chain',
    color: '#F0B90B',
    icon: 'BNB',
  },
  [sepolia.id]: {
    label: 'Sepolia',
    color: '#627EEA',
    icon: 'ETH',
  },
};
