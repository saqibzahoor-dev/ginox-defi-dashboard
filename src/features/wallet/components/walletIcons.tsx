/**
 * Wallet brand icons used by the custom Connect Wallet modal.
 *
 * Each icon is a self-contained SVG rendered at the requested `size`. Paths
 * are drawn from the wallet's published brand assets so the logos read
 * correctly at any scale — no PNG bundles, no third-party icon library.
 */

interface IconProps {
  size?: number;
}

/**
 * MetaMask — orange fox silhouette on a white tile. Uses the brand's
 * canonical multi-shape construction so the fox is recognisable rather
 * than the fragmented triangles a single-path simplification produces.
 */
export function MetaMaskIcon({ size = 40 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect width="40" height="40" rx="10" fill="#FFFFFF" />
      <g transform="translate(4 6)">
        {/* Outer shell */}
        <path d="M30.6 0 17 9.6l2.5-5.9L30.6 0Z" fill="#E17726" stroke="#E17726" strokeWidth=".25" strokeLinejoin="round" />
        <path d="m1.4 0 11.4 9.7-2.4-6L1.4 0Zm24.8 19.7-3.6 5.5 7.7 2.1 2.2-7.5-6.3-.1Zm-23.6 0L4.8 27.3l7.7-2.1-3.6-5.5-6.3.1Z" fill="#E27625" stroke="#E27625" strokeWidth=".25" strokeLinejoin="round" />
        {/* Inner */}
        <path d="M12.1 13.5 9.9 16.8l7.6.35-.25-8.2L12.1 13.5Zm7.8 0-5.3-4.7-.2 8.3 7.7-.35-2.2-3.25Zm-7.4 11.8 4.6-2.25-4-3.1-.6 5.35Zm6 -2.25 4.6 2.25-.6-5.35-4 3.1Z" fill="#E27625" stroke="#E27625" strokeWidth=".25" strokeLinejoin="round" />
        {/* Highlights */}
        <path d="m18.5 23.05 4.6 2.25-.45 3.6-.05 1.5-4.1-2.1.05-2.3-.05-2.95Zm-5 0-.05 2.95-.04 2.3-4.1 2.1.05-1.5-.46-3.6 4.6-2.25Z" fill="#D5BFB2" stroke="#D5BFB2" strokeWidth=".25" strokeLinejoin="round" />
        <path d="m14.9 16.95-2.5-1.4 2.85-1.3.75 2.7Zm2.2 0 .75-2.7 2.85 1.3-2.5 1.4Z" fill="#233447" stroke="#233447" strokeWidth=".25" strokeLinejoin="round" />
        {/* Forehead */}
        <path d="M11.8 25.3 9.5 30l4.4-2.4-2.1-2.3Zm9.4 0-2.1 2.3 4.4 2.4-2.3-4.7Z" fill="#CC6228" stroke="#CC6228" strokeWidth=".25" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

/** Coinbase — blue square with the trademark circle-in-circle mark. */
export function CoinbaseIcon({ size = 40 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect width="40" height="40" rx="10" fill="#0052FF" />
      <circle cx="20" cy="20" r="11" fill="none" stroke="#FFFFFF" strokeWidth="3" />
      <rect x="15.5" y="15.5" width="9" height="9" rx="1.2" fill="#FFFFFF" />
    </svg>
  );
}

/** WalletConnect — sky-blue tile with the signature double-arc waves. */
export function WalletConnectIcon({ size = 40 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect width="40" height="40" rx="10" fill="#3B99FC" />
      <path
        d="M11.5 16c4.7-4.6 12.3-4.6 17 0l.6.5a.6.6 0 0 1 0 .85l-1.95 1.9a.3.3 0 0 1-.4 0l-.78-.76c-3.27-3.2-8.6-3.2-11.87 0l-.83.82a.3.3 0 0 1-.42 0L10.9 17.4a.6.6 0 0 1 0-.85l.6-.55Zm21 3.95 1.74 1.7a.6.6 0 0 1 0 .85l-7.85 7.7a.6.6 0 0 1-.85 0l-5.55-5.45a.15.15 0 0 0-.2 0l-5.55 5.45a.6.6 0 0 1-.85 0l-7.85-7.7a.6.6 0 0 1 0-.85l1.74-1.7a.6.6 0 0 1 .85 0l5.55 5.45a.15.15 0 0 0 .2 0l5.55-5.45a.6.6 0 0 1 .85 0l5.55 5.45a.15.15 0 0 0 .2 0l5.55-5.45a.6.6 0 0 1 .85 0Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

/** Trust Wallet — deep-blue shield with a brand-blue inner shield. */
export function TrustWalletIcon({ size = 40 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect width="40" height="40" rx="10" fill="#0500FF" />
      <path
        d="M20 7.5 9 11v8.7c0 6 4.7 11.4 11 13.3 6.3-1.9 11-7.3 11-13.3V11L20 7.5Z"
        fill="#FFFFFF"
      />
      <path
        d="M20 10.8v18.4c4.7-1.65 8-5.95 8-10.5V13L20 10.8Z"
        fill="#0500FF"
      />
    </svg>
  );
}

/** Phantom — purple gradient tile with the brand ghost. */
export function PhantomIcon({ size = 40 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="ph-bg" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#534BB1" />
          <stop offset="1" stopColor="#551BF9" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="10" fill="url(#ph-bg)" />
      <path
        d="M32.5 19.1c0-6.3-5.1-11.4-11.5-11.4S9.5 12.8 9.5 19.1v9.1c0 .9.7 1.6 1.6 1.6h.4c.7 0 1.3-.5 1.4-1.2.3-1.5 1.6-2.6 3.1-2.6 1.6 0 3 1.2 3 2.6v.55c0 .9.7 1.65 1.65 1.65h.7c.9 0 1.65-.75 1.65-1.65v-.55c0-1.4 1.4-2.6 3-2.6 1.55 0 2.85 1.1 3.1 2.6.1.7.75 1.2 1.45 1.2h.35c.9 0 1.65-.7 1.65-1.6v-9.1Zm-12.9 2.7c-1.2 0-2.15-1.05-2.15-2.4v-2.4c0-1.35.95-2.45 2.15-2.45 1.2 0 2.15 1.1 2.15 2.45v2.4c0 1.35-.95 2.4-2.15 2.4Zm7.3 0c-1.2 0-2.15-1.05-2.15-2.4v-2.4c0-1.35.95-2.45 2.15-2.45 1.2 0 2.15 1.1 2.15 2.45v2.4c0 1.35-.95 2.4-2.15 2.4Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

/** Rainbow — deep-blue tile with the brand multi-colour arc cascade. */
export function RainbowIcon({ size = 40 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="rb-1" x1="20" y1="6" x2="20" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FF4000" />
          <stop offset="1" stopColor="#8754C9" />
        </linearGradient>
        <linearGradient id="rb-2" x1="20" y1="10" x2="20" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFB800" />
          <stop offset="1" stopColor="#FF4000" />
        </linearGradient>
        <linearGradient id="rb-3" x1="20" y1="14" x2="20" y2="34" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00AAFF" />
          <stop offset="1" stopColor="#01DA40" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="10" fill="url(#rb-bg)" />
      <defs>
        <linearGradient id="rb-bg" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#174299" />
          <stop offset="1" stopColor="#001E59" />
        </linearGradient>
      </defs>
      <path d="M7 7.5h3a23 23 0 0 1 23 23v3h-4.5v-3A18.5 18.5 0 0 0 10 12H7v-4.5Z" fill="url(#rb-1)" />
      <path d="M7 14h3a16.5 16.5 0 0 1 16.5 16.5v3H22v-3A12 12 0 0 0 10 18.5H7V14Z" fill="url(#rb-2)" />
      <path d="M7 20.5h3A10 10 0 0 1 20 30.5v3H7v-13Z" fill="url(#rb-3)" />
      <circle cx="10" cy="30.5" r="3" fill="#0094FF" />
    </svg>
  );
}

/** Ledger — black tile with the corner-bracket cube wireframe. */
export function LedgerIcon({ size = 40 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect width="40" height="40" rx="10" fill="#000000" />
      <path
        d="M11 10h6v2.4h-3.6V16H11v-6Zm12 0h6v6h-2.4v-3.6H23V10Zm-12 14h2.4v3.6H17V30h-6v-6Zm15.6 0H29v6h-6v-2.4h3.6V24Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

/** Safe — green tile with the brand "S" mark on a circular vault. */
export function SafeIcon({ size = 40 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <rect width="40" height="40" rx="10" fill="#12FF80" />
      <path
        d="M14 13.5h7.2a3.6 3.6 0 0 1 3.6 3.6v.4h-3.1v-.4a.5.5 0 0 0-.5-.5H14v-3.1ZM26 22.4h-7.2a3.6 3.6 0 0 0-3.6 3.6v.4h3.1v-.4a.5.5 0 0 1 .5-.5H26v-3.1Z"
        fill="#000000"
      />
      <circle cx="20" cy="20" r="2.7" stroke="#000000" strokeWidth="1.6" fill="none" />
    </svg>
  );
}

export const WALLET_ICONS: Record<string, (props: IconProps) => React.ReactElement> = {
  metaMask: MetaMaskIcon,
  coinbase: CoinbaseIcon,
  walletConnect: WalletConnectIcon,
  trust: TrustWalletIcon,
  phantom: PhantomIcon,
  rainbow: RainbowIcon,
  ledger: LedgerIcon,
  safe: SafeIcon,
};
