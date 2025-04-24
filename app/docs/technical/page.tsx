import TechnicalDetails from "@/docs/technical-details"

export default function TechnicalPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-900 to-black text-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
          Technical Deep Dive
        </h1>
        <p className="text-xl text-zinc-300 mb-12">
          Understanding the technical details of Passkey authentication with Secp256r1 verification
        </p>

        <TechnicalDetails />
      </div>
    </main>
  )
}
