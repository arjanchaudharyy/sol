import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { WalletContextProvider } from "@/context/wallet-context"
import { PasskeyProvider } from "@/context/passkey-context"
import NavBar from "@/components/nav-bar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Solana Passkey dApp",
  description: "A Solana dApp with Passkey authentication and Jupiter integration",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <PasskeyProvider>
            <WalletContextProvider>
              <NavBar />
              {children}
            </WalletContextProvider>
          </PasskeyProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
