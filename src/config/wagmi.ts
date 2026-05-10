import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { supportedChains } from './chains';
import { APP_NAME } from './constants';

const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID || '';

export const wagmiConfig = getDefaultConfig({
  appName: APP_NAME,
  projectId,
  chains: supportedChains,
  ssr: false,
});
