"use client"

import type React from "react"

import { createContext, useContext, useMemo, useState, useEffect } from "react"
import { ConnectionProvider, WalletProvider, useWallet } from "@solana/wallet-adapter-react"
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"
import { PhantomWalletAdapter, SolflareWalletAdapter } from "@solana/wallet-adapter-wallets"
import { clusterApiUrl } from "@solana/web3.js"

// Create context for wallet state
type WalletContextType = {
  connected: boolean
  publicKey: string | null
  balance: number
  connectWallet: () => void
  disconnectWallet: () => void
}

const WalletContext = createContext<WalletContextType>({
  connected: false,
  publicKey: null,
  balance: 0,
  connectWallet: () => {},
  disconnectWallet: () => {},
})

export const useWalletContext = () => useContext(WalletContext)

// Inner component that uses the wallet adapter
function WalletState({ children }: { children: React.ReactNode }) {
  const { connected, publicKey, disconnect, connect, select, wallets } = useWallet()
  const [balance, setBalance] = useState(0)

  // Format public key for display
  const formattedPublicKey = useMemo(() => {
    if (!publicKey) return null
    const pubKeyStr = publicKey.toString()
    return `${pubKeyStr.slice(0, 4)}...${pubKeyStr.slice(-3)}`
  }, [publicKey])

  // Connect wallet function
  const connectWallet = async (walletName = "phantom") => {
    try {
      const selectedWallet = wallets.find((w) => w.adapter.name.toLowerCase() === walletName.toLowerCase())
      if (selectedWallet) {
        select(selectedWallet.adapter.name)
        await connect()
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error)
    }
  }

  // Mock balance update
  useEffect(() => {
    if (connected) {
      // In a real app, we would fetch the actual balance
      setBalance(Math.random() * 10 + 1)
    } else {
      setBalance(0)
    }
  }, [connected])

  return (
    <WalletContext.Provider
      value={{
        connected,
        publicKey: formattedPublicKey,
        balance,
        connectWallet,
        disconnectWallet: disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

// Main provider component
export function WalletContextProvider({ children }: { children: React.ReactNode }) {
  // Set up wallet adapters
  const wallets = useMemo(() => [new PhantomWalletAdapter(), new SolflareWalletAdapter()], [])

  // Use devnet as specified
  const network = WalletAdapterNetwork.Devnet
  const endpoint = useMemo(() => clusterApiUrl(network), [network])

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletState>{children}</WalletState>
      </WalletProvider>
    </ConnectionProvider>
  )
}
