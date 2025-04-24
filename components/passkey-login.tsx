"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Fingerprint, Key, LogIn, LogOut, UserPlus, Loader2, Shield } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { usePasskey } from "@/context/passkey-context"
import { truncateAddress } from "@/lib/utils"
import { signMessageWithPasskey } from "@/lib/lazorkit"
import { verifySignatureOnChain } from "@/lib/secp256r1"
import { Connection } from "@solana/web3.js"

export default function PasskeyLogin() {
  const { toast } = useToast()
  const { isAuthenticated, publicKey, isRegistered, isLoading, register, login, logout } = usePasskey()
  const [isVerifying, setIsVerifying] = useState(false)

  const handleRegister = async () => {
    try {
      await register()
      toast({
        title: "Registration successful",
        description: "Your passkey has been registered successfully.",
      })
    } catch (error) {
      console.error("Registration error:", error)
      toast({
        title: "Registration failed",
        description: "There was an error registering your passkey.",
        variant: "destructive",
      })
    }
  }

  const handleLogin = async () => {
    try {
      await login()
      toast({
        title: "Login successful",
        description: "You've been authenticated with your passkey.",
      })
    } catch (error) {
      console.error("Login error:", error)
      toast({
        title: "Login failed",
        description: "There was an error authenticating with your passkey.",
        variant: "destructive",
      })
    }
  }

  const handleLogout = () => {
    logout()
    toast({
      title: "Logged out",
      description: "You've been logged out successfully.",
    })
  }

  const handleVerifySignature = async () => {
    if (!publicKey) {
      toast({
        title: "Authentication required",
        description: "Please login with your passkey first.",
        variant: "destructive",
      })
      return
    }

    setIsVerifying(true)
    try {
      // Create a login message
      const message = "Login request"

      // Sign the message with the passkey
      const signature = await signMessageWithPasskey(message)

      // Verify the signature on-chain
      const connection = new Connection("https://api.mainnet-beta.solana.com")
      await verifySignatureOnChain(connection, publicKey, message, signature)

      toast({
        title: "Signature verified",
        description: "Your Secp256r1 signature was successfully verified on-chain.",
      })
    } catch (error) {
      console.error("Verification error:", error)
      toast({
        title: "Verification failed",
        description: "There was an error verifying your signature on-chain.",
        variant: "destructive",
      })
    } finally {
      setIsVerifying(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="mt-2 text-sm text-muted-foreground">Loading passkey status...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="bg-zinc-800/50 border-zinc-700">
        <CardContent className="pt-6">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="h-24 w-24 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
              <Fingerprint className="h-12 w-12 text-white" />
            </div>
            <div className="text-center">
              <h3 className="text-xl font-bold">{isAuthenticated ? "Authenticated" : "Not Authenticated"}</h3>
              {publicKey && <p className="text-sm text-zinc-400 mt-1">{truncateAddress(publicKey)}</p>}
              {isRegistered && !isAuthenticated && (
                <p className="text-xs text-amber-400 mt-1">You have a registered passkey. Please login.</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4">
        {!isAuthenticated ? (
          <>
            {!isRegistered && (
              <Button onClick={handleRegister} className="w-full" variant="outline">
                <UserPlus className="mr-2 h-4 w-4" />
                Register Passkey
              </Button>
            )}
            <Button onClick={handleLogin} className="w-full" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LogIn className="mr-2 h-4 w-4" />}
              Login with Passkey
            </Button>
          </>
        ) : (
          <>
            <Button onClick={handleVerifySignature} className="w-full" variant="outline" disabled={isVerifying}>
              {isVerifying ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Shield className="mr-2 h-4 w-4" />}
              Verify Signature On-Chain
            </Button>
            <Button onClick={handleLogout} variant="destructive" className="w-full">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </>
        )}
      </div>

      <div className="rounded-lg bg-zinc-900 p-4 text-sm">
        <h4 className="font-medium mb-2 flex items-center">
          <Key className="h-4 w-4 mr-2 text-purple-500" />
          How it works
        </h4>
        <p className="text-zinc-400">
          This dApp uses WebAuthn (Passkeys) for authentication via Lazor.kit. Your device's biometrics or PIN creates a
          secure keypair. The public key is stored on-chain, and the private key never leaves your device. Transactions
          are signed using Secp256r1 and verified by Solana's native program.
        </p>
      </div>
    </div>
  )
}
