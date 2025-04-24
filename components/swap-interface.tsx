"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowDownUp, Loader2, RefreshCw } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { usePasskey } from "@/context/passkey-context"
import { fetchTokenList, simulateSwap, executeSwap } from "@/lib/jupiter"

export default function SwapInterface() {
  const { toast } = useToast()
  const { isAuthenticated, isLoading: isPasskeyLoading } = usePasskey()

  const [fromToken, setFromToken] = useState("So11111111111111111111111111111111111111112") // SOL
  const [toToken, setToToken] = useState("EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v") // USDC
  const [amount, setAmount] = useState("1")
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingTokens, setIsLoadingTokens] = useState(true)
  const [quote, setQuote] = useState(null)
  const [tokens, setTokens] = useState([])
  const [popularTokens, setPopularTokens] = useState([])

  useEffect(() => {
    const getTokens = async () => {
      try {
        setIsLoadingTokens(true)
        const tokenList = await fetchTokenList()
        if (tokenList && tokenList.length > 0) {
          // Sort tokens by market cap or popularity
          const sortedTokens = tokenList.sort((a, b) => {
            // If tokens have marketCap, sort by that
            if (a.marketCap && b.marketCap) {
              return b.marketCap - a.marketCap
            }
            // Otherwise sort alphabetically
            return a.symbol.localeCompare(b.symbol)
          })

          setTokens(sortedTokens)

          // Set popular tokens (top 10)
          setPopularTokens(sortedTokens.slice(0, 10))
        }
      } catch (error) {
        console.error("Error fetching token list:", error)
        toast({
          title: "Error fetching tokens",
          description: "Could not load the token list. Using default tokens instead.",
          variant: "destructive",
        })
      } finally {
        setIsLoadingTokens(false)
      }
    }

    getTokens()
  }, [toast])

  const handleSwapTokens = () => {
    const temp = fromToken
    setFromToken(toToken)
    setToToken(temp)
    setQuote(null)
  }

  const handleGetQuote = async () => {
    if (!amount || Number.parseFloat(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to swap.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const quoteResult = await simulateSwap(fromToken, toToken, amount)
      setQuote(quoteResult)
      toast({
        title: "Quote received",
        description: `You'll receive approximately ${quoteResult.outAmount} ${getTokenSymbol(toToken)}`,
      })
    } catch (error) {
      console.error("Error getting quote:", error)
      toast({
        title: "Error getting quote",
        description: error.message || "There was an error fetching the swap quote.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleExecuteSwap = async () => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please login with your passkey first.",
        variant: "destructive",
      })
      return
    }

    if (!quote) {
      toast({
        title: "Quote required",
        description: "Please get a quote first before executing the swap.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    try {
      const result = await executeSwap(quote)
      toast({
        title: "Swap successful",
        description: `Successfully swapped ${amount} ${getTokenSymbol(fromToken)} to ${result.outputAmount} ${getTokenSymbol(toToken)}. Transaction ID: ${result.txid.slice(0, 8)}...`,
      })
      setQuote(null)
    } catch (error) {
      console.error("Error executing swap:", error)
      toast({
        title: "Swap failed",
        description: error.message || "There was an error executing the swap transaction.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getTokenSymbol = (mint) => {
    const token = tokens.find((t) => t.address === mint)
    return token ? token.symbol : "Unknown"
  }

  const getTokenLogo = (mint) => {
    const token = tokens.find((t) => t.address === mint)
    return token && token.logoURI ? token.logoURI : "/placeholder.svg?height=32&width=32"
  }

  return (
    <div className="space-y-6">
      <Card className="bg-zinc-800/50 border-zinc-700">
        <CardContent className="pt-6 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="from-token">From</Label>
            <div className="flex space-x-2">
              <Select value={fromToken} onValueChange={setFromToken} disabled={isLoadingTokens}>
                <SelectTrigger className="w-[180px]">
                  {isLoadingTokens ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <SelectValue>
                      <div className="flex items-center">
                        <img
                          src={getTokenLogo(fromToken) || "/placeholder.svg"}
                          alt={getTokenSymbol(fromToken)}
                          className="w-5 h-5 mr-2 rounded-full"
                        />
                        {getTokenSymbol(fromToken)}
                      </div>
                    </SelectValue>
                  )}
                </SelectTrigger>
                <SelectContent>
                  {popularTokens.map((token) => (
                    <SelectItem key={token.address} value={token.address}>
                      <div className="flex items-center">
                        <img
                          src={token.logoURI || "/placeholder.svg?height=32&width=32"}
                          alt={token.symbol}
                          className="w-5 h-5 mr-2 rounded-full"
                        />
                        {token.symbol}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                id="amount"
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value)
                  setQuote(null)
                }}
              />
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleSwapTokens}
              className="rounded-full bg-zinc-700/50 hover:bg-zinc-700"
              disabled={isLoading}
            >
              <ArrowDownUp className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="to-token">To</Label>
            <div className="flex space-x-2">
              <Select value={toToken} onValueChange={setToToken} disabled={isLoadingTokens}>
                <SelectTrigger className="w-[180px]">
                  {isLoadingTokens ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <SelectValue>
                      <div className="flex items-center">
                        <img
                          src={getTokenLogo(toToken) || "/placeholder.svg"}
                          alt={getTokenSymbol(toToken)}
                          className="w-5 h-5 mr-2 rounded-full"
                        />
                        {getTokenSymbol(toToken)}
                      </div>
                    </SelectValue>
                  )}
                </SelectTrigger>
                <SelectContent>
                  {popularTokens.map((token) => (
                    <SelectItem key={token.address} value={token.address}>
                      <div className="flex items-center">
                        <img
                          src={token.logoURI || "/placeholder.svg?height=32&width=32"}
                          alt={token.symbol}
                          className="w-5 h-5 mr-2 rounded-full"
                        />
                        {token.symbol}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Input
                id="to-amount"
                type="text"
                placeholder="0.00"
                value={quote ? quote.outAmount : ""}
                readOnly
                className="bg-zinc-700/30"
              />
            </div>
          </div>

          {quote && (
            <div className="text-xs text-zinc-400 p-2 bg-zinc-800 rounded">
              <div className="flex justify-between">
                <span>Rate:</span>
                <span>
                  1 {getTokenSymbol(fromToken)} ≈{" "}
                  {(Number.parseFloat(quote.outAmount) / Number.parseFloat(amount)).toFixed(6)}{" "}
                  {getTokenSymbol(toToken)}
                </span>
              </div>
              <div className="flex justify-between mt-1">
                <span>Price Impact:</span>
                <span>
                  {quote.priceImpactPct ? (Number.parseFloat(quote.priceImpactPct) * 100).toFixed(2) : "0.00"}%
                </span>
              </div>
              <div className="flex justify-between mt-1">
                <span>Route:</span>
                <span>{quote.routePlan ? quote.routePlan.length : 1} hop(s)</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4">
        <Button
          onClick={handleGetQuote}
          disabled={isLoading || isLoadingTokens || !amount || Number.parseFloat(amount) <= 0}
          variant="outline"
          className="w-full"
        >
          {isLoading && !quote ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="mr-2 h-4 w-4" />
          )}
          Get Quote
        </Button>
        <Button
          onClick={handleExecuteSwap}
          disabled={isLoading || !quote || !isAuthenticated || isPasskeyLoading}
          className="w-full"
        >
          {isLoading && quote ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
          {isAuthenticated ? "Swap with Passkey" : "Login to Swap"}
        </Button>
      </div>

      {!isAuthenticated && !isPasskeyLoading && (
        <div className="rounded-lg bg-amber-950/20 border border-amber-900/50 p-4 text-sm text-amber-200">
          <p>Please login with your passkey to perform swaps.</p>
        </div>
      )}
    </div>
  )
}
