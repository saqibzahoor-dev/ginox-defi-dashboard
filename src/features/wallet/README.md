# Wallet Module

Handles wallet connectivity, on-chain data reading, chain management, and message signing.

## Components

- **WalletPanel** -- Main wallet UI. Shows connect prompt or connected state with balance/network info.
- **NetworkBadge** -- Colored badge displaying the current chain name.
- **ChainSwitcher** -- Row of buttons to switch between supported chains.
- **SignMessage** -- EIP-712 typed data signing with signature display.

## Hooks

- **useWalletData** -- Aggregates all wallet state: connection, balances, chain switching, signing.

## Key Decisions

- Uses wagmi v2 hooks directly rather than wrapping ethers.js -- better type safety and tree-shaking.
- ERC-20 balance reading uses `useReadContract` with the standard ERC-20 ABI.
- User rejection errors are detected via message pattern matching and shown differently from network errors.
