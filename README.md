# otc-sdk

[![https://img.shields.io/npm/v/@sentre/otc-sdk](https://img.shields.io/npm/v/@sentre/otc-sdk)](https://www.npmjs.com/package/@sentre/otc-sdk)
[![https://img.shields.io/npm/dw/@sentre/otc-sdk](https://img.shields.io/npm/dm/@sentre/otc-sdk)](https://www.npmjs.com/package/@sentre/otc-sdk)
[![https://img.shields.io/bundlephobia/min/@sentre/otc-sdk](https://img.shields.io/bundlephobia/min/@sentre/otc-sdk)](https://www.npmjs.com/package/@sentre/otc-sdk)
[![https://img.shields.io/github/issues-raw/descartesnetwork/otc-sdk](https://img.shields.io/github/issues-raw/descartesnetwork/otc-sdk)](https://github.com/DescartesNetwork/otc-sdk)
[![https://img.shields.io/github/license/descartesnetwork/otc-sdk](https://img.shields.io/github/license/descartesnetwork/otc-sdk)](https://github.com/DescartesNetwork/otc-sdk)

[![https://img.shields.io/twitter/follow/SentreProtocol?style=social](https://img.shields.io/twitter/follow/SentreProtocol?style=social)](https://twitter.com/SentreProtocol)

Solana OTC Service SDK. Users can exchange SPL tokens for SOL even with SOL for transaction fees. Currently, the service is available on **mainnet ONLY**

## Installation

```bash
npm i @sentre/otc-sdk
```

or,

```bash
yarn add @sentre/otc-sdk
```

## Prototypes

1. [Any Arts](https://hub.sentre.io/app/any_arts?autoInstall=true) - Buy NFTs on [Magic Eden](https://magiceden.io/) by youe SPL tokens.

## Usage

```ts
import { OTC } from '@sentre/otc-sdk'

const otc = new OTC()

/**
 * Get whitelisted spl tokens
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
