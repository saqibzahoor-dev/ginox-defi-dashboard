import { useCallback, useState } from 'react';
import { useConnectModal } from '@rainbow-me/rainbowkit';

const MOBILE_BREAKPOINT_PX = 600;

/**
 * Picks the right Connect Wallet modal based on viewport width.
 *
 * - Desktop (>600px): opens RainbowKit's native modal (rich layout, "What is
 *   a wallet?" panel, official wallet logos, recent connectors, QR pairing).
 * - Mobile (≤600px): opens our custom bottom-sheet modal — RainbowKit's
 *   mobile sheet doesn't fit the dashboard's design language and clips
 *   wallet icons off the right edge on narrow phones.
 *
 * `customOpen` + `setCustomOpen` are the state for the mobile sheet — the
 * caller is responsible for mounting `<ConnectWalletModal isOpen={customOpen} … />`.
 */
export function useConnectWallet() {
  const { openConnectModal } = useConnectModal();
  const [customOpen, setCustomOpen] = useState(false);

  const open = useCallback(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= MOBILE_BREAKPOINT_PX;
    if (isMobile) {
      setCustomOpen(true);
    } else {
      openConnectModal?.();
    }
  }, [openConnectModal]);

  const closeCustom = useCallback(() => setCustomOpen(false), []);

  return { open, customOpen, closeCustom };
}
