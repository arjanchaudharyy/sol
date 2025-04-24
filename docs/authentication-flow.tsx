"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Fingerprint, Shield, Key, Lock, CheckCircle2 } from "lucide-react"

export default function AuthenticationFlow() {
  const [activeStep, setActiveStep] = useState(0)
  const [activeTab, setActiveTab] = useState("overview")

  const steps = [
    {
      title: "User Registration",
      description: "User registers a passkey using WebAuthn",
      icon: <Fingerprint className="h-6 w-6 text-purple-500" />,
    },
    {
      title: "Passkey Creation",
      description: "Device creates a Secp256r1 keypair",
      icon: <Key className="h-6 w-6 text-blue-500" />,
    },
    {
      title: "Authentication",
      description: "User authenticates with biometrics",
      icon: <Lock className="h-6 w-6 text-green-500" />,
    },
    {
      title: "Signature Creation",
      description: "Device signs message with private key",
      icon: <Shield className="h-6 w-6 text-amber-500" />,
    },
    {
      title: "On-chain Verification",
      description: "Solana verifies signature with Secp256r1 program",
      icon: <CheckCircle2 className="h-6 w-6 text-emerald-500" />,
    },
  ]

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1)
    } else {
      setActiveStep(0)
    }
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="technical">Technical Details</TabsTrigger>
          <TabsTrigger value="security">Security Benefits</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Passkey Authentication Flow</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <div className="absolute left-4 top-0 h-full w-0.5 bg-zinc-700" />
                <div className="space-y-8">
                  {steps.map((step, index) => (
                    <div
                      key={index}
                      className={`relative pl-10 ${index === activeStep ? "opacity-100" : "opacity-60"}`}
                    >
                      <div
                        className={`absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full ${
                          index === activeStep ? "bg-primary" : "bg-zinc-800"
                        }`}
                      >
                        {step.icon}
                      </div>
                      <h3 className="text-lg font-semibold">{step.title}</h3>
                      <p className="text-sm text-zinc-400">{step.description}</p>
                    </div>
                  ))}
                </div>
              </div>
              <Button onClick={handleNext} className="mt-6 w-full">
                {activeStep < steps.length - 1 ? "Next Step" : "Restart Flow"}
              </Button>
            </CardContent>
          </Card>
          <div className="rounded-lg bg-zinc-800/50 border border-zinc-700 p-4">
            <h3 className="text-lg font-semibold mb-2">What are Passkeys?</h3>
            <p className="text-sm text-zinc-400">
              Passkeys are a replacement for passwords that provide stronger authentication. They use public key
              cryptography and biometrics (like your fingerprint or face) to protect against phishing, credential
              stuffing, and other security threats. Passkeys are based on the WebAuthn standard and are supported by
              major platforms including Apple, Google, and Microsoft.
            </p>
          </div>
        </TabsContent>
        <TabsContent value="technical" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Technical Implementation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">1. Passkey Registration</h3>
                <div className="rounded-lg bg-zinc-900 p-3 text-sm font-mono">
                  <pre className="text-xs text-zinc-300 overflow-x-auto">
                    {`// Register a new passkey
const { publicKey } = await lazorKit.registerPasskey({
  username: "user123",
  displayName: "User's Display Name",
});`}
                  </pre>
                </div>
                <p className="text-sm text-zinc-400 mt-2">
                  The browser prompts the user to create a passkey using their device's biometrics or PIN. This
                  generates a Secp256r1 keypair where the private key never leaves the device.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">2. Authentication</h3>
                <div className="rounded-lg bg-zinc-900 p-3 text-sm font-mono">
                  <pre className="text-xs text-zinc-300 overflow-x-auto">
                    {`// Authenticate with passkey
const wallet = await lazorKit.signIn();
console.log("User authenticated with address:", wallet.address);`}
                  </pre>
                </div>
                <p className="text-sm text-zinc-400 mt-2">
                  The user authenticates with their biometrics, and the device uses the private key to prove identity
                  without revealing the key itself.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">3. Signature Verification</h3>
                <div className="rounded-lg bg-zinc-900 p-3 text-sm font-mono">
                  <pre className="text-xs text-zinc-300 overflow-x-auto">
                    {`// Verify signature on-chain
const tx = new Transaction();
tx.add(
  secpProgram.verify({
    pubkey: userPubkey,
    message: Buffer.from("Login request"),
    signature: userSignature,
  })
);
const result = await sendAndConfirmTransaction(connection, tx, []);`}
                  </pre>
                </div>
                <p className="text-sm text-zinc-400 mt-2">
                  The Solana Secp256r1 native program verifies the signature on-chain, ensuring the user controls the
                  private key without revealing it.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Benefits</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="mr-3 mt-0.5 rounded-full bg-green-500/10 p-1">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">No Seed Phrases</h3>
                    <p className="text-sm text-zinc-400">
                      Users don't need to manage or remember seed phrases, eliminating the risk of them being stolen or
                      lost.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-0.5 rounded-full bg-green-500/10 p-1">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">Phishing Resistance</h3>
                    <p className="text-sm text-zinc-400">
                      Passkeys are bound to specific websites, making them resistant to phishing attacks.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-0.5 rounded-full bg-green-500/10 p-1">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">Biometric Protection</h3>
                    <p className="text-sm text-zinc-400">
                      Access requires biometric verification (fingerprint, face, etc.), adding an extra layer of
                      security.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-0.5 rounded-full bg-green-500/10 p-1">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">Private Key Security</h3>
                    <p className="text-sm text-zinc-400">
                      Private keys never leave the user's device and are protected by the device's secure enclave.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-0.5 rounded-full bg-green-500/10 p-1">
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <h3 className="font-medium">On-chain Verification</h3>
                    <p className="text-sm text-zinc-400">
                      Signatures are verified by Solana's native Secp256r1 program, ensuring cryptographic security.
                    </p>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
