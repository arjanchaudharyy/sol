import { Button } from "@/components/ui/button"
import { ArrowRight, Key, ShieldCheck } from "lucide-react"
import Link from "next/link"

export default function Hero() {
  return (
    <div className="relative isolate overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
            Solana Passkey dApp
          </h1>
          <p className="mt-6 text-lg leading-8 text-zinc-300">
            Experience the future of Web3 authentication with Passkeys. No seed phrases, just secure biometric login
            with Secp256r1 signature verification on Solana.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button className="group">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Link
              href="https://github.com/your-username/solana-passkey-dapp"
              target="_blank"
              className="text-sm font-semibold leading-6 text-zinc-300 hover:text-white"
            >
              View on GitHub <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-8">
        <div className="flex flex-col items-center">
          <div className="rounded-full bg-purple-500/10 p-3 mb-3">
            <Key className="h-6 w-6 text-purple-500" />
          </div>
          <h3 className="text-sm font-medium">Passkey Login</h3>
        </div>
        <div className="flex flex-col items-center">
          <div className="rounded-full bg-blue-500/10 p-3 mb-3">
            <ShieldCheck className="h-6 w-6 text-blue-500" />
          </div>
          <h3 className="text-sm font-medium">Secp256r1 Verification</h3>
        </div>
        <div className="flex flex-col items-center">
          <div className="rounded-full bg-indigo-500/10 p-3 mb-3">
            <svg className="h-6 w-6 text-indigo-500" viewBox="0 0 98 98" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M48.9961 0L60.9551 11.959L36.9922 35.9219L25.0332 24.0039L48.9961 0Z" fill="currentColor" />
              <path
                d="M72.9141 23.918L84.873 35.877L36.9922 83.7578L25.0332 71.8398L72.9141 23.918Z"
                fill="currentColor"
              />
              <path
                d="M13.0742 36.0039L25.0332 47.9629L1.07031 71.9258L-10e-5 70.8555V48.0273L13.0742 36.0039Z"
                fill="currentColor"
              />
              <path
                d="M13.0742 59.9219L25.0332 71.8809L13.0742 83.8398L1.11523 71.8809L13.0742 59.9219Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <h3 className="text-sm font-medium">Jupiter Swap</h3>
        </div>
      </div>
    </div>
  )
}
