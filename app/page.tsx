import { Suspense } from "react"
import Hero from "@/components/hero"
import PasskeyLogin from "@/components/passkey-login"
import SwapInterface from "@/components/swap-interface"
import { Toaster } from "@/components/ui/toaster"
import LoadingUI from "@/components/loading-ui"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white">
      <Toaster />
      <Hero />
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-zinc-800/50 p-6 rounded-xl border border-zinc-700">
            <h2 className="text-2xl font-bold mb-6">Passkey Authentication</h2>
            <Suspense fallback={<LoadingUI />}>
              <PasskeyLogin />
            </Suspense>
          </div>
          <div className="bg-zinc-800/50 p-6 rounded-xl border border-zinc-700">
            <h2 className="text-2xl font-bold mb-6">Jupiter Swap</h2>
            <Suspense fallback={<LoadingUI />}>
              <SwapInterface />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  )
}
