"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useWalletContext } from "./wallet-provider"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ChevronDown, Copy, LogOut, SwitchCamera } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"

export default function Header() {
  const { connected, publicKey, balance, connectWallet, disconnectWallet } = useWalletContext()
  const [walletMenuOpen, setWalletMenuOpen] = useState(false)
  const { toast } = useToast()
  const pathname = usePathname()

  const navItems = [
    { name: "Marketplace", path: "/marketplace" },
    { name: "My Portfolio", path: "/portfolio" },
    { name: "Impact Stats", path: "/impact" },
    { name: "Docs", path: "/docs" },
  ]

  const handleCopyAddress = () => {
    if (publicKey) {
      navigator.clipboard.writeText(publicKey)
      toast({
        title: "Address copied",
        description: "Wallet address copied to clipboard",
      })
    }
  }

  const handleConnectWallet = (wallet: string) => {
    connectWallet(wallet)
    setWalletMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/home" className="flex items-center space-x-2">
          <div className="relative h-8 w-8">
            <Image src="/placeholder.svg?height=32&width=32" alt="SeedFlow Logo" fill className="rounded-md" />
          </div>
          <span className="font-bold text-xl">SeedFlow</span>
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === item.path ? "text-primary" : "text-muted-foreground",
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Wallet Connection */}
        {connected ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2">
                <span>◎ {balance.toFixed(2)}</span>
                <span>{publicKey}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={handleCopyAddress}>
                <Copy className="mr-2 h-4 w-4" />
                <span>Copy Address</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <SwitchCamera className="mr-2 h-4 w-4" />
                <span>Switch Wallet</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={disconnectWallet}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Disconnect</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <DropdownMenu open={walletMenuOpen} onOpenChange={setWalletMenuOpen}>
            <DropdownMenuTrigger asChild>
              <Button>Connect Wallet</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleConnectWallet("phantom")}>
                <Image
                  src="/placeholder.svg?height=16&width=16"
                  alt="Phantom"
                  width={16}
                  height={16}
                  className="mr-2"
                />
                <span>Phantom</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleConnectWallet("solflare")}>
                <Image
                  src="/placeholder.svg?height=16&width=16"
                  alt="Solflare"
                  width={16}
                  height={16}
                  className="mr-2"
                />
                <span>Solflare</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  )
}
