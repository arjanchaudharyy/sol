"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CodeExamples() {
  const [copiedTab, setCopiedTab] = useState<string | null>(null)

  const handleCopy = (code: string, tab: string) => {
    navigator.clipboard.writeText(code)
    setCopiedTab(tab)
    setTimeout(() => setCopiedTab(null), 2000)
  }

  const registrationCode = `// Initialize Lazor.kit
import { LazorKit } from '@lazorkit/auth';

const lazorKit = new LazorKit({
  apiKey: 'your_api_key',
  network: 'mainnet' // or 'devnet' for testing
});

// Register a new passkey
async function registerUser() {
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
    
    return publicKey;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
}`

  const authenticationCode = `// Authenticate with passkey
async function authenticateUser() {
  try {
    // Authenticate with an existing passkey
    const wallet = await lazorKit.signIn();
    
    console.log('Authentication successful!');
    console.log('Wallet address:', wallet.address);
    
    return wallet;
  } catch (error) {
    console.error('Authentication error:', error);
    throw error;
  }
}`

  const signatureCode = `// Sign a message with passkey
async function signMessage(message) {
  try {
    // Get the wallet
    const wallet = await lazorKit.signIn();
    
    // Sign the message
    const { signature } = await wallet.signMessage(message);
    
    console.log('Message signed successfully!');
    console.log('Signature:', signature);
    
    return signature;
  } catch (error) {
    console.error('Signing error:', error);
    throw error;
  }
}`

  const verificationCode = `import { Connection, PublicKey, Transaction } from '@solana/web3.js';

// Verify a signature on-chain
async function verifySignature(publicKey, message, signature) {
  try {
    // Initialize Solana connection
    const connection = new Connection('https://api.mainnet-beta.solana.com');
    
    // Create a transaction to verify the signature
    const tx = new Transaction();
    tx.add(
      secpProgram.verify({
        pubkey: new PublicKey(publicKey),
        message: Buffer.from(message),
        signature,
      })
    );
    
    // Send the transaction
    const txSignature = await sendAndConfirmTransaction(
      connection,
      tx,
      [] // No signers needed for verification
    );
    
    console.log('Signature verified on-chain!');
    console.log('Transaction signature:', txSignature);
    
    return txSignature;
  } catch (error) {
    console.error('Verification error:', error);
    throw error;
  }
}`

  const transactionCode = `// Send a transaction with passkey
async function sendTransaction(destination, amount) {
  try {
    // Get the wallet
    const wallet = await lazorKit.signIn();
    
    // Send the transaction
    const { signature } = await wallet.sendTransaction({
      to: destination,
      amount, // in SOL
    });
    
    console.log('Transaction sent successfully!');
    console.log('Transaction signature:', signature);
    
    return signature;
  } catch (error) {
    console.error('Transaction error:', error);
    throw error;
  }
}`

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Code Examples</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="registration">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="registration">Registration</TabsTrigger>
              <TabsTrigger value="authentication">Authentication</TabsTrigger>
              <TabsTrigger value="signing">Signing</TabsTrigger>
              <TabsTrigger value="verification">Verification</TabsTrigger>
              <TabsTrigger value="transaction">Transaction</TabsTrigger>
            </TabsList>
            <TabsContent value="registration" className="mt-4">
              <div className="relative rounded-lg bg-zinc-900 p-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={() => handleCopy(registrationCode, "registration")}
                >
                  {copiedTab === "registration" ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
                <pre className="text-xs text-zinc-300 overflow-x-auto">{registrationCode}</pre>
              </div>
            </TabsContent>
            <TabsContent value="authentication" className="mt-4">
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
            </TabsContent>
            <TabsContent value="signing" className="mt-4">
              <div className="relative rounded-lg bg-zinc-900 p-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={() => handleCopy(signatureCode, "signing")}
                >
                  {copiedTab === "signing" ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
                <pre className="text-xs text-zinc-300 overflow-x-auto">{signatureCode}</pre>
              </div>
            </TabsContent>
            <TabsContent value="verification" className="mt-4">
              <div className="relative rounded-lg bg-zinc-900 p-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={() => handleCopy(verificationCode, "verification")}
                >
                  {copiedTab === "verification" ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
                <pre className="text-xs text-zinc-300 overflow-x-auto">{verificationCode}</pre>
              </div>
            </TabsContent>
            <TabsContent value="transaction" className="mt-4">
              <div className="relative rounded-lg bg-zinc-900 p-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2"
                  onClick={() => handleCopy(transactionCode, "transaction")}
                >
                  {copiedTab === "transaction" ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
                <pre className="text-xs text-zinc-300 overflow-x-auto">{transactionCode}</pre>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
