"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { PublicKey } from "@solana/web3.js"

interface WalletContextType {
  connected: boolean
  publicKey: PublicKey | null
  balance: number
  connect: () => Promise<void>
  disconnect: () => void
  signAndSendTransaction: (transaction: any) => Promise<string>
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export function WalletContextProvider({ children }: { children: ReactNode }) {
  const [connected, setConnected] = useState(false)
  const [publicKey, setPublicKey] = useState<PublicKey | null>(null)
  const [balance, setBalance] = useState(0)

  // This would normally connect to a real wallet adapter
  // For this demo, we're simulating the connection
  const connect = async () => {
    try {
      // In a real implementation, this would connect to a wallet adapter
      const mockPublicKey = new PublicKey("11111111111111111111111111111111")
      setPublicKey(mockPublicKey)
      setConnected(true)
      setBalance(5) // Mock SOL balance
      return
    } catch (error) {
      console.error("Error connecting wallet:", error)
      throw error
    }
  }

  const disconnect = () => {
    setConnected(false)
    setPublicKey(null)
    setBalance(0)
  }

  const signAndSendTransaction = async (transaction: any): Promise<string> => {
    try {
      // In a real implementation, this would sign and send the transaction
      // For this demo, we're returning a mock transaction signature
      return "5KtPn1LGuxhFLKqDV7d4DMNNgnQqmYJQ9mH3nKwHdrK7QfJkVs2cTSRJGLGfPVnpzAHm"
    } catch (error) {
      console.error("Error signing and sending transaction:", error)
      throw error
    }
  }

  return (
    <WalletContext.Provider
      value={{
        connected,
        publicKey,
        balance,
        connect,
        disconnect,
        signAndSendTransaction,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export function useWallet() {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletContextProvider")
  }
  return context
}
