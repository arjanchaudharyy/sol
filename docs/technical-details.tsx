"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function TechnicalDetails() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Technical Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="webauthn">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="webauthn">WebAuthn</TabsTrigger>
              <TabsTrigger value="secp256r1">Secp256r1</TabsTrigger>
              <TabsTrigger value="solana">Solana Integration</TabsTrigger>
            </TabsList>
            <TabsContent value="webauthn" className="mt-4 space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">WebAuthn Overview</h3>
                <p className="text-sm text-zinc-400">
                  Web Authentication (WebAuthn) is a web standard published by the World Wide Web Consortium (W3C). It
                  allows servers to register and authenticate users using public key cryptography instead of passwords.
                </p>
              </div>

              <div className="rounded-lg bg-zinc-800 p-4">
                <h4 className="font-medium mb-2">How WebAuthn Works</h4>
                <ol className="list-decimal list-inside space-y-2 text-sm text-zinc-400">
                  <li>
                    <strong>Registration</strong>: The server sends a challenge to the client. The client's
                    authenticator (like a security key or built-in platform authenticator) creates a new key pair and
                    returns the public key and a signed challenge.
                  </li>
                  <li>
                    <strong>Authentication</strong>: The server sends a new challenge to the client. The client's
                    authenticator signs the challenge with the private key and returns the signature.
                  </li>
                  <li>
                    <strong>Verification</strong>: The server verifies the signature using the stored public key.
                  </li>
                </ol>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Passkeys</h3>
                <p className="text-sm text-zinc-400">
                  Passkeys are an implementation of WebAuthn that allows for cross-device authentication. They are
                  synchronized across a user's devices via iCloud Keychain (Apple), Google Password Manager, or other
                  password managers. Passkeys provide a more user-friendly experience than traditional WebAuthn
                  implementations.
                </p>
              </div>

              <div className="rounded-lg bg-zinc-800 p-4">
                <h4 className="font-medium mb-2">Benefits of Passkeys</h4>
                <ul className="list-disc list-inside space-y-2 text-sm text-zinc-400">
                  <li>
                    <strong>Phishing Resistance</strong>: Passkeys are bound to specific websites, making them resistant
                    to phishing attacks.
                  </li>
                  <li>
                    <strong>No Passwords</strong>: Users don't need to remember or manage passwords.
                  </li>
                  <li>
                    <strong>Biometric Authentication</strong>: Users can authenticate using their device's biometrics
                    (fingerprint, face, etc.).
                  </li>
                  <li>
                    <strong>Cross-Device</strong>: Passkeys can be synchronized across a user's devices.
                  </li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="secp256r1" className="mt-4 space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Secp256r1 Overview</h3>
                <p className="text-sm text-zinc-400">
                  Secp256r1 (also known as NIST P-256 or prime256v1) is an elliptic curve used for digital signatures
                  and key exchange. It's widely used in traditional web security and is the default curve used by
                  WebAuthn.
                </p>
              </div>

              <div className="rounded-lg bg-zinc-800 p-4">
                <h4 className="font-medium mb-2">Secp256r1 vs. Secp256k1</h4>
                <p className="text-sm text-zinc-400 mb-2">
                  Solana and many other blockchains typically use Secp256k1 for their native accounts, but Secp256r1 is
                  used by WebAuthn. The key differences are:
                </p>
                <table className="w-full text-sm text-zinc-400">
                  <thead>
                    <tr className="border-b border-zinc-700">
                      <th className="text-left py-2">Feature</th>
                      <th className="text-left py-2">Secp256r1</th>
                      <th className="text-left py-2">Secp256k1</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-zinc-700">
                      <td className="py-2">Origin</td>
                      <td className="py-2">NIST (National Institute of Standards and Technology)</td>
                      <td className="py-2">Koblitz curve, used by Bitcoin</td>
                    </tr>
                    <tr className="border-b border-zinc-700">
                      <td className="py-2">Usage</td>
                      <td className="py-2">WebAuthn, TLS, traditional web security</td>
                      <td className="py-2">Bitcoin, Ethereum, most blockchains</td>
                    </tr>
                    <tr className="border-b border-zinc-700">
                      <td className="py-2">Hardware Support</td>
                      <td className="py-2">Widely supported in secure enclaves, TPMs</td>
                      <td className="py-2">Less hardware support, more software implementations</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Signature Verification</h3>
                <p className="text-sm text-zinc-400">
                  Secp256r1 signatures can be verified using the ECDSA (Elliptic Curve Digital Signature Algorithm)
                  verification algorithm. The signature consists of two values (r and s) that can be verified against
                  the public key and the message.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="solana" className="mt-4 space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">Solana Secp256r1 Program</h3>
                <p className="text-sm text-zinc-400">
                  Solana has a native program for verifying Secp256r1 signatures. This allows WebAuthn signatures to be
                  verified on-chain, enabling a seamless integration between WebAuthn and Solana.
                </p>
              </div>

              <div className="rounded-lg bg-zinc-800 p-4">
                <h4 className="font-medium mb-2">On-chain Verification</h4>
                <p className="text-sm text-zinc-400 mb-2">The verification process works as follows:</p>
                <ol className="list-decimal list-inside space-y-2 text-sm text-zinc-400">
                  <li>
                    <strong>User Authentication</strong>: The user authenticates with their passkey, which generates a
                    signature using the Secp256r1 private key.
                  </li>
                  <li>
                    <strong>Signature Submission</strong>: The signature is submitted to the Solana network as part of a
                    transaction.
                  </li>
                  <li>
                    <strong>On-chain Verification</strong>: The Solana Secp256r1 program verifies the signature against
                    the public key and message.
                  </li>
                  <li>
                    <strong>Transaction Execution</strong>: If the signature is valid, the transaction is executed.
                  </li>
                </ol>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">Lazor Kit Integration</h3>
                <p className="text-sm text-zinc-400">
                  Lazor Kit provides a seamless integration between WebAuthn and Solana. It handles the WebAuthn
                  registration and authentication process, as well as the on-chain verification of Secp256r1 signatures.
                </p>
              </div>

              <div className="rounded-lg bg-zinc-800 p-4">
                <h4 className="font-medium mb-2">Architecture</h4>
                <p className="text-sm text-zinc-400 mb-2">The Lazor Kit architecture consists of:</p>
                <ul className="list-disc list-inside space-y-2 text-sm text-zinc-400">
                  <li>
                    <strong>Client SDK</strong>: Handles WebAuthn registration and authentication, as well as
                    transaction signing.
                  </li>
                  <li>
                    <strong>Backend Service</strong>: Manages user accounts, passkey registrations, and provides APIs
                    for client-server communication.
                  </li>
                  <li>
                    <strong>On-chain Program</strong>: Verifies Secp256r1 signatures on the Solana blockchain.
                  </li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
