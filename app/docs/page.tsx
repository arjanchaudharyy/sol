import AuthenticationFlow from "@/docs/authentication-flow"
import CodeExamples from "@/docs/code-examples"
import ImplementationGuide from "@/docs/implementation-guide"

export default function DocsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
          Passkey Authentication with Secp256r1 Verification
        </h1>

        <p className="text-xl text-zinc-300 mb-12">
          A comprehensive guide to implementing secure, passwordless authentication on Solana
        </p>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-6">Authentication Flow</h2>
            <AuthenticationFlow />
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">Code Examples</h2>
            <CodeExamples />
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">Implementation Guide</h2>
            <ImplementationGuide />
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-6">Key Benefits</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-zinc-800/50 p-6 rounded-xl border border-zinc-700">
                <h3 className="text-xl font-bold mb-4">For Users</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>No seed phrases to remember or store securely</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Simple biometric authentication (fingerprint, face)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Protection against phishing attacks</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Seamless cross-device experience</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Familiar authentication pattern (similar to Apple/Google sign-in)</span>
                  </li>
                </ul>
              </div>

              <div className="bg-zinc-800/50 p-6 rounded-xl border border-zinc-700">
                <h3 className="text-xl font-bold mb-4">For Developers</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Reduced support burden from lost seed phrases</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Improved security with on-chain verification</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Better user onboarding experience</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Compliance with FIDO2 standards</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    <span>Future-proof authentication method</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="bg-zinc-800/30 p-8 rounded-xl border border-zinc-700">
            <h2 className="text-2xl font-bold mb-4">Ready to Implement?</h2>
            <p className="text-lg text-zinc-300 mb-6">
              Follow our step-by-step guide to integrate Passkey authentication with Secp256r1 verification in your
              Solana dApp.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://github.com/your-username/solana-passkey-dapp"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-zinc-700 hover:bg-zinc-600 text-white py-2 px-4 rounded-lg text-center"
              >
                View on GitHub
              </a>
              <a
                href="https://lazorkit.io/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-purple-600 hover:bg-purple-500 text-white py-2 px-4 rounded-lg text-center"
              >
                Lazor.kit Documentation
              </a>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
