"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Copy, Check, Fingerprint, Key, Shield } from "lucide-react"

export default function LazorKitIntegration() {
  const [copiedTab, setCopiedTab] = useState<string | null>(null)

  const handleCopy = (code: string, tab: string) => {
    navigator.clipboard.writeText(code)
    setCopiedTab(tab)
    setTimeout(() => setCopiedTab(null), 2000)
  }

  const installationCode = `# Install Lazor Kit SDK
npm install @lazorkit/wallet

# If building for browser, install buffer for compatibility
npm install buffer

# If needed, install process polyfill
npm install process`

  const polyfillCode = `// Add to your entry file (e.g., main.tsx or index.js)
import { Buffer } from 'buffer';
window.Buffer = Buffer;

// If needed, add process polyfill
import process from 'process';
window.process = process;`

  const initializationCode = `import { LazorKit } from '@lazorkit/auth';

// Initialize Lazor.kit with your API key
const lazorKit = new LazorKit({
  apiKey: process.env.LAZORKIT_API_KEY || 'YOUR_API_KEY',
  network: process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'mainnet', // or 'devnet' for testing
});

export default lazorKit;`

  const authenticationCode = `// Register a new passkey
async function registerPasskey() {
  try {
    // Generate a username or use an existing one
    const username = \`user_\${Math.floor(Math.random() * 1000000)}\`;
    
    // Register a new passkey
    const { publicKey } = await lazorKit.registerPasskey({
      username,
      displayName: username, // You can customize this
    });
    
    console.log('Registration successful!');
    console.log('Public key:', publicKey);
    
    return { publicKey };
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}

// Authenticate with an existing passkey
async function authenticateWithPasskey() {
  try {
    // Authenticate with an existing passkey
    const wallet = await lazorKit.signIn();
    
    console.log('Authentication successful!');
    console.log('Wallet address:', wallet.address);
    
    return { publicKey: wallet.address };
  } catch (error) {
    console.error('Authentication error:', error);
    throw error;
  }
}`

  const signingCode = `// Sign a message with passkey
async function signMessageWithPasskey(message) {
  try {
    // Sign in to get the wallet
    const wallet = await lazorKit.signIn();
    
    // Sign the message
    const { signature } = await wallet.signMessage(message);
    
    return signature;
  } catch (error) {
    console.error('Error signing message with passkey:', error);
    throw error;
  }
}

// Sign and send a transaction with passkey
async function signAndSendTransactionWithPasskey(transaction) {
  try {
    // Sign in to get the wallet
    const wallet = await lazorKit.signIn();
    
    // Sign and send the transaction
    const { signature } = await wallet.sendTransaction({
      transaction,
    });
    
    return signature;
  } catch (error) {
    console.error('Error signing and sending transaction with passkey:', error);
    throw error;
  }
}`

  const reactHookCode = `"use client"

import { createContext, useContext, useState, useEffect } from "react"
import lazorKit from "@/lib/lazorkit"

const PasskeyContext = createContext(undefined)

export function PasskeyProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [publicKey, setPublicKey] = useState(null)
  const [isRegistered, setIsRegistered] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Check for existing passkey on mount
  useEffect(() => {
    const checkPasskey = async () => {
      try {
        // Check if user has a registered passkey
        const hasPasskey = await lazorKit.hasRegisteredPasskey()
        setIsRegistered(hasPasskey)

        // Try to get the current public key
        const pubkey = await lazorKit.getPublicKey()

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
      const { publicKey: pubkey } = await lazorKit.registerPasskey({
        username: \`user_\${Math.floor(Math.random() * 1000000)}\`,
        displayName: "User",
      })
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
      const wallet = await lazorKit.signIn()
      setPublicKey(wallet.address)
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
}`

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4 mb-6">
        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center">
          <Key className="h-6 w-6 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Lazor Kit Integration Guide</h2>
          <p className="text-zinc-400">Implement Passkey authentication with Secp256r1 verification</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-zinc-800/50 p-6 rounded-xl border border-zinc-700 flex flex-col items-center text-center">
          <div className="rounded-full bg-purple-500/10 p-3 mb-3">
            <Fingerprint className="h-6 w-6 text-purple-500" />
          </div>
          <h3 className="font-medium mb-2">Passwordless Auth</h3>
          <p className="text-sm text-zinc-400">
            Authenticate users with biometrics or device PIN instead of seed phrases
          </p>
        </div>
        <div className="bg-zinc-800/50 p-6 rounded-xl border border-zinc-700 flex flex-col items-center text-center">
          <div className="rounded-full bg-blue-500/10 p-3 mb-3">
            <Key className="h-6 w-6 text-blue-500" />
          </div>
          <h3 className="font-medium mb-2">Secp256r1 Keys</h3>
          <p className="text-sm text-zinc-400">
            Generate and use Secp256r1 keypairs compatible with Solana's native program
          </p>
        </div>
        <div className="bg-zinc-800/50 p-6 rounded-xl border border-zinc-700 flex flex-col items-center text-center">
          <div className="rounded-full bg-green-500/10 p-3 mb-3">
            <Shield className="h-6 w-6 text-green-500" />
          </div>
          <h3 className="font-medium mb-2">On-chain Verification</h3>
          <p className="text-sm text-zinc-400">
            Verify signatures on-chain using Solana's Secp256r1 verification program
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Implementation Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="installation">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="installation">Installation</TabsTrigger>
              <TabsTrigger value="initialization">Initialization</TabsTrigger>
              <TabsTrigger value="authentication">Authentication</TabsTrigger>
              <TabsTrigger value="signing">Signing</TabsTrigger>
              <TabsTrigger value="react">React Integration</TabsTrigger>
            </TabsList>
            <TabsContent value="installation" className="mt-4 space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">1. Install Dependencies</h3>
                <div className="relative rounded-lg bg-zinc-900 p-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2"
                    onClick={() => handleCopy(installationCode, "installation")}
                  >
                    {copiedTab === "installation" ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  <pre className="text-xs text-zinc-300 overflow-x-auto">{installationCode}</pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">2. Add Polyfills (if needed)</h3>
                <div className="relative rounded-lg bg-zinc-900 p-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2"
                    onClick={() => handleCopy(polyfillCode, "polyfill")}
                  >
                    {copiedTab === "polyfill" ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  <pre className="text-xs text-zinc-300 overflow-x-auto">{polyfillCode}</pre>
                </div>
              </div>

              <div className="rounded-lg bg-blue-950/20 border border-blue-900/50 p-4 text-sm text-blue-200">
                <h4 className="font-medium mb-1">Important Notes</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Some bundlers (like Vite, Webpack 5) auto-polyfill Buffer</li>
                  <li>Add polyfills only if you see errors about Buffer or process not being defined</li>
                  <li>Make sure your domain is whitelisted with Lazor Kit for production use</li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="initialization" className="mt-4 space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Initialize Lazor Kit</h3>
                <p className="text-sm text-zinc-400 mb-2">
                  Create a utility file (e.g., <code>lib/lazorkit.ts</code>) to initialize Lazor Kit:
                </p>
                <div className="relative rounded-lg bg-zinc-900 p-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2"
                    onClick={() => handleCopy(initializationCode, "initialization")}
                  >
                    {copiedTab === "initialization" ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  <pre className="text-xs text-zinc-300 overflow-x-auto">{initializationCode}</pre>
                </div>
              </div>

              <div className="rounded-lg bg-zinc-800 p-4 text-sm">
                <h4 className="font-medium mb-1">Environment Variables</h4>
                <p className="text-zinc-400 mb-2">
                  Set up your environment variables in <code>.env.local</code>:
                </p>
                <pre className="text-xs text-zinc-300 bg-zinc-900 p-2 rounded">
                  {`LAZORKIT_API_KEY=your_api_key_here
NEXT_PUBLIC_SOLANA_NETWORK=mainnet # or devnet for testing`}
                </pre>
              </div>
            </TabsContent>
            <TabsContent value="authentication" className="mt-4 space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Authentication Methods</h3>
                <p className="text-sm text-zinc-400 mb-2">
                  Implement registration and authentication functions using Lazor Kit:
                </p>
                <div className="relative rounded-lg bg-zinc-900 p-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2"
                    onClick={() => handleCopy(authenticationCode, "authentication")}
                  >
                    {copiedTab === "authentication" ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  <pre className="text-xs text-zinc-300 overflow-x-auto">{authenticationCode}</pre>
                </div>
              </div>

              <div className="rounded-lg bg-zinc-800 p-4 text-sm">
                <h4 className="font-medium mb-1">Authentication Flow</h4>
                <ol className="list-decimal list-inside space-y-1 text-zinc-400">
                  <li>
                    <strong>Registration</strong>: User creates a passkey using their device's biometrics or PIN
                  </li>
                  <li>
                    <strong>Authentication</strong>: User authenticates with their passkey to get a wallet object
                  </li>
                  <li>
                    <strong>Public Key</strong>: The wallet object contains the user's public key (address)
                  </li>
                </ol>
              </div>
            </TabsContent>
            <TabsContent value="signing" className="mt-4 space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Signing Methods</h3>
                <p className="text-sm text-zinc-400 mb-2">
                  Implement message and transaction signing functions using Lazor Kit:
                </p>
                <div className="relative rounded-lg bg-zinc-900 p-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2"
                    onClick={() => handleCopy(signingCode, "signing")}
                  >
                    {copiedTab === "signing" ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  <pre className="text-xs text-zinc-300 overflow-x-auto">{signingCode}</pre>
                </div>
              </div>

              <div className="rounded-lg bg-zinc-800 p-4 text-sm">
                <h4 className="font-medium mb-1">Signing Flow</h4>
                <ol className="list-decimal list-inside space-y-1 text-zinc-400">
                  <li>
                    <strong>Authentication</strong>: User authenticates with their passkey
                  </li>
                  <li>
                    <strong>Signing</strong>: The device signs the message or transaction with the private key
                  </li>
                  <li>
                    <strong>Verification</strong>: The signature can be verified on-chain using Solana's Secp256r1
                    program
                  </li>
                </ol>
              </div>
            </TabsContent>
            <TabsContent value="react" className="mt-4 space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">React Integration</h3>
                <p className="text-sm text-zinc-400 mb-2">
                  Create a React context to manage passkey authentication state:
                </p>
                <div className="relative rounded-lg bg-zinc-900 p-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-2"
                    onClick={() => handleCopy(reactHookCode, "react")}
                  >
                    {copiedTab === "react" ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  <pre className="text-xs text-zinc-300 overflow-x-auto">{reactHookCode}</pre>
                </div>
              </div>

              <div className="rounded-lg bg-zinc-800 p-4 text-sm">
                <h4 className="font-medium mb-1">Usage in Components</h4>
                <p className="text-zinc-400 mb-2">Use the context in your components:</p>
                <pre className="text-xs text-zinc-300 bg-zinc-900 p-2 rounded">
                  {`"use client"
import { usePasskey } from "@/context/passkey-context"

export default function LoginButton() {
  const { isAuthenticated, login, logout } = usePasskey()
  
  return (
    <button onClick={isAuthenticated ? logout : login}>
      {isAuthenticated ? "Logout" : "Login with Passkey"}
    </button>
  )
}`}
                </pre>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="rounded-lg bg-zinc-800/50 p-6 border border-zinc-700">
        <h3 className="text-xl font-bold mb-4">Additional Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="https://lazorkit.io/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors"
          >
            <h4 className="font-medium mb-1">Lazor Kit Documentation</h4>
            <p className="text-sm text-zinc-400">Official documentation for the Lazor Kit SDK</p>
          </a>
          <a
            href="https://solana.com/docs/programs/secp256r1"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors"
          >
            <h4 className="font-medium mb-1">Solana Secp256r1 Program</h4>
            <p className="text-sm text-zinc-400">Learn about Solana's native Secp256r1 verification program</p>
          </a>
          <a
            href="https://webauthn.guide/"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors"
          >
            <h4 className="font-medium mb-1">WebAuthn Guide</h4>
            <p className="text-sm text-zinc-400">Understand the WebAuthn standard that powers passkeys</p>
          </a>
          <a
            href="https://github.com/your-username/solana-passkey-dapp"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors"
          >
            <h4 className="font-medium mb-1">Example Repository</h4>
            <p className="text-sm text-zinc-400">Full source code for the Solana Passkey dApp</p>
          </a>
        </div>
      </div>
    </div>
  )
}
