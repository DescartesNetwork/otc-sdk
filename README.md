# OTC SDK

[![https://img.shields.io/npm/v/@sentre/otc-sdk](https://img.shields.io/npm/v/@sentre/otc-sdk)](https://www.npmjs.com/package/@sentre/otc-sdk)
[![https://img.shields.io/npm/dw/@sentre/otc-sdk](https://img.shields.io/npm/dm/@sentre/otc-sdk)](https://www.npmjs.com/package/@sentre/otc-sdk)
[![https://img.shields.io/bundlephobia/min/@sentre/otc-sdk](https://img.shields.io/bundlephobia/min/@sentre/otc-sdk)](https://www.npmjs.com/package/@sentre/otc-sdk)
[![https://img.shields.io/github/issues-raw/descartesnetwork/otc-sdk](https://img.shields.io/github/issues-raw/descartesnetwork/otc-sdk)](https://github.com/DescartesNetwork/otc-sdk)
[![https://img.shields.io/github/license/descartesnetwork/otc-sdk](https://img.shields.io/github/license/descartesnetwork/otc-sdk)](https://github.com/DescartesNetwork/otc-sdk)

[![https://img.shields.io/twitter/follow/SentreProtocol?style=social](https://img.shields.io/twitter/follow/SentreProtocol?style=social)](https://twitter.com/SentreProtocol)

Solana OTC Service SDK. Users can exchange SPL tokens for SOL even with no SOL for transaction fees. Currently, the service is available on **mainnet ONLY**.

✨ Receive exactly desired amount of SOL. No slippage. No price impact.

✨ Never care about transaction fees.

✨ Zero down time.

## Installation

```bash
npm i @sentre/otc-sdk
```

or,

```bash
yarn add @sentre/otc-sdk
```

## Who are using?

1. [Any Arts](https://hub.sentre.io/app/any_arts?autoInstall=true) - Buy NFTs on [Magic Eden](https://magiceden.io/) by your SPL tokens.
2. [Sen Assets](https://hub.sentre.io/app/sen_assets?autoInstall=true) - Feel annoying to withdraw SOL from [Binance](https://www.binance.com/) for transaction fees on [Solana](https://solana.com/)? This app will let you exchange SPL tokens to SOL with no transaction fees.

## Usage

```ts
import { OTC } from '@sentre/otc-sdk'

const otc = new OTC()

/**
 * Get whitelisted spl tokens
 * You can quick review whitelist by: https://cors.sentre.io/otc/whitelist
 */
const whitelist = await otc.getWhitelist()
// {
//   usdc: {
//     address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
//     symbol: 'USDC',
//     decimals: 6,
//     url: 'https://www.circle.com/en/usdc',
//   },
//   uxd: {
//     address: '7kbnvuGBxxj8AG9qp8Scn56muWGaRaFqxg1FsRp3PaFT',
//     symbol: 'UXD',
//     decimals: 6,
//     url: 'https://uxd.fi/',
//   }
// }

/**
 * Get SOL price based on USDC or UXD
 */
const solPriceBasedOnUSDC = await otc.getSolPrice({ tokenSymbol: 'usdc' })
// {
//   data: {
//     id: 'So11111111111111111111111111111111111111112',
//     mintSymbol: 'SOL',
//     vsToken: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
//     vsTokenSymbol: 'USDC',
//     price: 34.968693228,
//   },
//   timeTaken: 0.047694273001980036,
// }
const solPriceBasedOnUXD = await otc.getSolPrice({ tokenSymbol: 'uxd' })
// {
//   data: {
//     id: 'So11111111111111111111111111111111111111112',
//     mintSymbol: 'SOL',
//     vsToken: '7kbnvuGBxxj8AG9qp8Scn56muWGaRaFqxg1FsRp3PaFT',
//     vsTokenSymbol: 'UXD',
//     price: 34.972632341,
//   },
//   timeTaken: 0.010716108001361135,
// }

/**
 * Get exchange tx of usdc for 1 sol
 */
const wallet = <Your_Wallet_Instance_Here>
const tx = await otc.exchange({
  walletAddress: wallet.publicKey.toBase58(),
  tokenSymbol: 'usdc',
  solAmount: 1
})
const signedTx = await wallet.signTransaction(tx)
const txId = await sendTransaction(signedTx) // This function is just a pseudo-code and should replaced it by yours.
```

## Whitelist

👉 Current whitelist: [https://cors.sentre.io/otc/whitelist](https://cors.sentre.io/otc/whitelist)

👉 Wanna support more SPL tokens? Let's create a proposal here: [https://github.com/DescartesNetwork/otc-sdk](https://github.com/DescartesNetwork/otc-sdk/issues)
