import LazorKitIntegration from "@/docs/lazorkit-integration"

export default function LazorKitPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
          Lazor Kit Integration Guide
        </h1>
        <p className="text-xl text-zinc-300 mb-12">
          A comprehensive guide to implementing Lazor Kit for Passkey authentication on Solana
        </p>

        <LazorKitIntegration />
      </div>
    </main>
  )
}
