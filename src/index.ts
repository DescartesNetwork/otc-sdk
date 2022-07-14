import axios from 'axios'
import { Transaction, PublicKey } from '@solana/web3.js'

export type AcceptedPaymentMetadata = {
  address: string
  symbol: string
  decimals: number
  url: string
}
export type AcceptedPayment = Record<string, AcceptedPaymentMetadata>
export type SolPrice = {
  data: {
    id: string
    mintSymbol: string
    vsToken: string
    vsTokenSymbol: string
    price: string
  }
  timeTaken: number
}

export default class OTC {
  constructor(public readonly service: string = 'https://cors.sentre.io/otc') {}

  /**
   * Validate the address
   * @param address solana wallet/account address
   * @returns
   */
  static isAddress = (address: string): boolean => {
    try {
      new PublicKey(address)
      return true
    } catch (er) {
      return false
    }
  }

  /**
   * Get whitelise. The list of payable tokens.
   * @returns
   */
  getWhitelist = async () => {
    const url = `${this.service}/whitelist`
    const { data } = await axios.get(url)
    return data as AcceptedPayment
  }

  /**
   * Get SOL price based on spl token.
   * @param tokenSymbol The spl token symbol, e.g., usdc, uxd.
   * @returns
   */
  getSolPrice = async ({ tokenSymbol }: { tokenSymbol: string }) => {
    const url = `${this.service}/otc/get-sol-price/${tokenSymbol}`
    const { data } = await axios.get(url)
    return data as SolPrice
  }

  /**
   * Exchange spl tokens for a specific amount of sol.
   * @param walletAddress User wallet address.
   * @param tokenSymbol The spl token symbol, e.g., usdc, uxd.
   * @param solAmount The desired amount of sol.
   * @returns
   */
  exchange = async ({
    walletAddress,
    tokenSymbol,
    solAmount,
  }: {
    walletAddress: string
    tokenSymbol: string
    solAmount: number
  }) => {
    if (!OTC.isAddress(walletAddress)) throw new Error('Invalid wallet address')
    if (solAmount <= 0) throw new Error('SOL amount must be greater than zero')

    const whitelist = await this.getWhitelist()
    tokenSymbol = tokenSymbol.toLowerCase()
    if (!Object.keys(whitelist).includes(tokenSymbol))
      throw new Error('Unsupported token symbol')

    const url = `${this.service}/exchange/${walletAddress}/${tokenSymbol}/${solAmount}`
    const {
      data: { signedTx },
    } = await axios.get(url)
    if (!signedTx) throw new Error('Cannot build the exchange transaction')
    const buf = Buffer.from(signedTx)
    return Transaction.from(buf)
  }
}
