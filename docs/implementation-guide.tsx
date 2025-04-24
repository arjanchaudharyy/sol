"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, AlertTriangle, Info } from "lucide-react"

export default function ImplementationGuide() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Implementation Guide</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="setup">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="setup">Setup</TabsTrigger>
              <TabsTrigger value="integration">Integration</TabsTrigger>
              <TabsTrigger value="testing">Testing</TabsTrigger>
              <TabsTrigger value="deployment">Deployment</TabsTrigger>
            </TabsList>
            <TabsContent value="setup" className="mt-4 space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">1. Install Dependencies</h3>
                <div className="rounded-lg bg-zinc-900 p-3">
                  <pre className="text-xs text-zinc-300 overflow-x-auto">
                    {`npm install @lazorkit/auth @solana/web3.js`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">2. Get API Keys</h3>
                <p className="text-sm text-zinc-400 mb-2">
                  Sign up for Lazor.kit and obtain your API keys from the dashboard.
                </p>
                <div className="flex items-start rounded-lg bg-amber-950/20 border border-amber-900/50 p-3">
                  <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-amber-200">
                    Keep your API keys secure and never commit them to your repository. Use environment variables to
                    store sensitive information.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">3. Configure Environment</h3>
                <p className="text-sm text-zinc-400 mb-2">Create a .env.local file with your API keys:</p>
                <div className="rounded-lg bg-zinc-900 p-3">
                  <pre className="text-xs text-zinc-300 overflow-x-auto">
                    {`NEXT_PUBLIC_SOLANA_NETWORK=mainnet
LAZORKIT_API_KEY=your_api_key_here`}
                  </pre>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="integration" className="mt-4 space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">1. Initialize Lazor.kit</h3>
                <p className="text-sm text-zinc-400 mb-2">Create a utility file to initialize Lazor.kit:</p>
                <div className="rounded-lg bg-zinc-900 p-3">
                  <pre className="text-xs text-zinc-300 overflow-x-auto">
                    {`// lib/lazorkit.ts
import { LazorKit } from '@lazorkit/auth';

export const lazorKit = new LazorKit({
  apiKey: process.env.LAZORKIT_API_KEY,
  network: process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'mainnet',
});`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">2. Create Authentication Context</h3>
                <p className="text-sm text-zinc-400 mb-2">Set up a React context to manage authentication state:</p>
                <div className="rounded-lg bg-zinc-900 p-3">
                  <pre className="text-xs text-zinc-300 overflow-x-auto">
                    {`// context/passkey-context.tsx
"use client"

import { createContext, useState, useContext } from 'react';
import { lazorKit } from '@/lib/lazorkit';

export const PasskeyContext = createContext(null);

export function PasskeyProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [publicKey, setPublicKey] = useState(null);
  
  // Authentication methods...
  
  return (
    <PasskeyContext.Provider value={{
      isAuthenticated,
      publicKey,
      register,
      login,
      logout,
      // ...other methods
    }}>
      {children}
    </PasskeyContext.Provider>
  );
}`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">3. Implement Secp256r1 Verification</h3>
                <p className="text-sm text-zinc-400 mb-2">Create a utility for on-chain verification:</p>
                <div className="rounded-lg bg-zinc-900 p-3">
                  <pre className="text-xs text-zinc-300 overflow-x-auto">
                    {`// lib/secp256r1.ts
import { Connection, PublicKey, Transaction } from '@solana/web3.js';

// Initialize the Secp256r1 program
const SECP256R1_PROGRAM_ID = new PublicKey('KeccakSecp256k1VerifierXXXXXXXXXXXXXXXX');

export class Secp256r1Program {
  constructor(private connection: Connection) {}
  
  verify(params) {
    // Create verification instruction
    // ...
  }
}

export async function verifySignatureOnChain(connection, publicKey, message, signature) {
  // Implementation...
}`}
                  </pre>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="testing" className="mt-4 space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">1. Test Environment Setup</h3>
                <p className="text-sm text-zinc-400 mb-2">Use Solana devnet for testing before deploying to mainnet:</p>
                <div className="rounded-lg bg-zinc-900 p-3">
                  <pre className="text-xs text-zinc-300 overflow-x-auto">
                    {`// .env.development
NEXT_PUBLIC_SOLANA_NETWORK=devnet
LAZORKIT_API_KEY=your_test_api_key`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">2. Test Registration and Authentication</h3>
                <p className="text-sm text-zinc-400 mb-2">Create test functions to verify the flow:</p>
                <div className="rounded-lg bg-zinc-900 p-3">
                  <pre className="text-xs text-zinc-300 overflow-x-auto">
                    {`// tests/auth.test.js
import { lazorKit } from '@/lib/lazorkit';

describe('Authentication Flow', () => {
  it('should register a new passkey', async () => {
    // Test registration
  });
  
  it('should authenticate with a passkey', async () => {
    // Test authentication
  });
  
  it('should verify a signature on-chain', async () => {
    // Test verification
  });
});`}
                  </pre>
                </div>
              </div>

              <div className="flex items-start rounded-lg bg-blue-950/20 border border-blue-900/50 p-3">
                <Info className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-blue-200">
                  Testing WebAuthn in automated tests can be challenging. Consider using mock implementations for CI/CD
                  pipelines and manual testing for the actual WebAuthn flow.
                </p>
              </div>
            </TabsContent>
            <TabsContent value="deployment" className="mt-4 space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-2">1. Production Environment</h3>
                <p className="text-sm text-zinc-400 mb-2">Set up your production environment variables:</p>
                <div className="rounded-lg bg-zinc-900 p-3">
                  <pre className="text-xs text-zinc-300 overflow-x-auto">
                    {`# In your Vercel project settings
NEXT_PUBLIC_SOLANA_NETWORK=mainnet
LAZORKIT_API_KEY=your_production_api_key`}
                  </pre>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">2. Security Considerations</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-zinc-400">
                      Ensure your site uses HTTPS, which is required for WebAuthn.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-zinc-400">
                      Implement proper error handling for users with devices that don't support WebAuthn.
                    </p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-zinc-400">
                      Consider offering a fallback authentication method for compatibility.
                    </p>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-2">3. Deploy to Vercel</h3>
                <p className="text-sm text-zinc-400 mb-2">Deploy your application to Vercel:</p>
                <div className="rounded-lg bg-zinc-900 p-3">
                  <pre className="text-xs text-zinc-300 overflow-x-auto">
                    {`# Deploy with Vercel CLI
vercel --prod`}
                  </pre>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
