"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useWalletContext } from "@/components/wallet-provider"
import { ArrowRight, DollarSign, Umbrella, Users } from "lucide-react"
import BorrowerModal from "@/components/borrower-modal"

export default function HomePage() {
  const { connected } = useWalletContext()
  const [stats, setStats] = useState({ funded: 0, borrowers: 0 })
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  // Animate stats counter
  useEffect(() => {
    const interval = setInterval(() => {
      setStats((prev) => ({
        funded: Math.min(prev.funded + 1000, 500000),
        borrowers: Math.min(prev.borrowers + 2, 1250),
      }))
    }, 100)

    return () => clearInterval(interval)
  }, [])

  const howItWorksCards = [
    {
      id: "borrow",
      title: "Borrow",
      icon: <DollarSign className="h-8 w-8 text-primary" />,
      description: "Access affordable microloans for your small business or farm",
      expanded:
        "Create a loan request with your story, amount needed, and term. Choose insurance options to protect against climate events. Receive funds directly to your Solana wallet once fully funded.",
    },
    {
      id: "insure",
      title: "Insure",
      icon: <Umbrella className="h-8 w-8 text-primary" />,
      description: "Get protection against climate risks with parametric insurance",
      expanded:
        "Select from drought, flood, or cyclone coverage based on your location and needs. Insurance payouts are automatic when Pyth weather oracles detect trigger events. No claims process needed.",
    },
    {
      id: "fund",
      title: "Fund",
      icon: <Users className="h-8 w-8 text-primary" />,
      description: "Invest in real-world impact while earning competitive returns",
      expanded:
        "Browse the marketplace to find borrowers that match your impact goals. Fund loans partially or fully with just a few clicks. Earn interest plus $SEED tokens as additional rewards. Track your portfolio and reinvest returns.",
    },
  ]

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-gradient-to-b from-primary/10 to-background">
        <div className="container flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Empowering Global Entrepreneurs with Solana
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mb-8">
            SeedFlow connects small-scale farmers and entrepreneurs with global capital and climate insurance on Solana.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="bg-background rounded-lg p-4 shadow-sm">
              <p className="text-sm text-muted-foreground">Total Funded</p>
              <p className="text-3xl font-bold">${stats.funded.toLocaleString()}</p>
            </div>
            <div className="bg-background rounded-lg p-4 shadow-sm">
              <p className="text-sm text-muted-foreground">Borrowers Protected</p>
              <p className="text-3xl font-bold">{stats.borrowers.toLocaleString()}</p>
            </div>
          </div>
          <Button asChild size="lg" className="rounded-full">
            <Link href="/marketplace">
              Browse Opportunities
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {howItWorksCards.map((card) => (
              <Card
                key={card.id}
                className={`transition-all duration-300 ${expandedCard === card.id ? "md:scale-105" : ""}`}
                onMouseEnter={() => setExpandedCard(card.id)}
                onMouseLeave={() => setExpandedCard(null)}
              >
                <CardHeader>
                  <div className="mb-2">{card.icon}</div>
                  <CardTitle>{card.title}</CardTitle>
                  <CardDescription>{card.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      expandedCard === card.id ? "max-h-40" : "max-h-0"
                    }`}
                  >
                    <p className="text-sm text-muted-foreground">{card.expanded}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">Ready to get started?</h2>
            <p className="text-primary-foreground/80">
              Join our community of borrowers and lenders making a difference.
            </p>
          </div>
          {connected ? (
            <Button variant="secondary" size="lg" onClick={() => setIsModalOpen(true)}>
              Post Loan Request
            </Button>
          ) : (
            <Button variant="secondary" size="lg" asChild>
              <Link href="/marketplace">Explore Marketplace</Link>
            </Button>
          )}
        </div>
      </section>

      {/* Borrower Modal */}
      <BorrowerModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  )
}
