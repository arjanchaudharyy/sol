"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import {
  registerPasskey,
  authenticateWithPasskey,
  getPasskeyPublicKey,
  hasRegisteredPasskey,
  signAndSendTransactionWithPasskey,
} from "@/lib/lazorkit"
import type { Transaction, VersionedTransaction } from "@solana/web3.js"

interface PasskeyContextType {
  isAuthenticated: boolean
  publicKey: string | null
  isRegistered: boolean
  isLoading: boolean
  register: () => Promise<void>
  login: () => Promise<void>
  logout: () => void
  signAndSendTransaction: (transaction: Transaction | VersionedTransaction) => Promise<string>
}

const PasskeyContext = createContext<PasskeyContextType | undefined>(undefined)

export function PasskeyProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [publicKey, setPublicKey] = useState<string | null>(null)
  const [isRegistered, setIsRegistered] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing passkey on mount
  useEffect(() => {
    const checkPasskey = async () => {
      try {
        // Check if user has a registered passkey
        const hasPasskey = await hasRegisteredPasskey()
        setIsRegistered(hasPasskey)

        // Try to get the current public key
        const pubkey = await getPasskeyPublicKey()

        if (pubkey) {
          setPublicKey(pubkey.toString())
          setIsAuthenticated(true)
        }
      } catch (error) {
        console.error("Error checking passkey status:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkPasskey()
  }, [])

  const register = async () => {
    try {
      setIsLoading(true)
      const { publicKey: pubkey } = await registerPasskey()
      setPublicKey(pubkey)
      setIsAuthenticated(true)
      setIsRegistered(true)
      return
    } catch (error) {
      console.error("Error registering passkey:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const login = async () => {
    try {
      setIsLoading(true)
      const { publicKey: pubkey } = await authenticateWithPasskey()
      setPublicKey(pubkey)
      setIsAuthenticated(true)
      return
    } catch (error) {
      console.error("Error authenticating with passkey:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setIsAuthenticated(false)
    setPublicKey(null)
  }

  const signAndSendTransaction = async (transaction: Transaction | VersionedTransaction): Promise<string> => {
    try {
      return await signAndSendTransactionWithPasskey(transaction)
    } catch (error) {
      console.error("Error signing and sending transaction:", error)
      throw error
    }
  }

  return (
    <PasskeyContext.Provider
      value={{
        isAuthenticated,
        publicKey,
        isRegistered,
        isLoading,
        register,
        login,
        logout,
        signAndSendTransaction,
      }}
    >
      {children}
    </PasskeyContext.Provider>
  )
}

export function usePasskey() {
  const context = useContext(PasskeyContext)
  if (context === undefined) {
    throw new Error("usePasskey must be used within a PasskeyProvider")
  }
  return context
}
