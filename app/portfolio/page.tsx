"use client"

import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useWalletContext } from "@/components/wallet-provider"
import { Info, Award } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function PortfolioPage() {
  const { connected } = useWalletContext()
  const { toast } = useToast()
  const [isClaimingRewards, setIsClaimingRewards] = useState(false)

  // Mock data
  const activeLoans = [
    {
      id: "loan1",
      borrower: "Maria's Farm",
      amount: 200,
      funded: 200,
      apr: 12,
      term: 6,
      nextPayment: new Date(2025, 5, 20),
      paymentAmount: 35,
      status: "current",
    },
    {
      id: "loan2",
      borrower: "John's Retail Shop",
      amount: 350,
      funded: 350,
      apr: 10,
      term: 12,
      nextPayment: new Date(2025, 5, 15),
      paymentAmount: 32,
      status: "current",
    },
    {
      id: "loan3",
      borrower: "Village Cooperative",
      amount: 500,
      funded: 500,
      apr: 8,
      term: 9,
      nextPayment: new Date(2025, 5, 10),
      paymentAmount: 60,
      status: "due",
    },
  ]

  const insurancePayouts = [
    {
      id: "payout1",
      loanId: "loan4",
      borrower: "Rice Farmers Group",
      event: "drought",
      amount: 75,
      date: new Date(2025, 4, 30),
      status: "paid",
    },
    {
      id: "payout2",
      loanId: "loan5",
      borrower: "Coastal Fishery",
      event: "cyclone",
      amount: 120,
      date: new Date(2025, 5, 5),
      status: "pending",
    },
  ]

  const seedRewards = {
    available: 250,
    staked: 500,
    apr: 8,
    boost: 2.5,
    level: 3,
    progress: 65,
  }

  const handleClaimPayment = (loanId: string, amount: number) => {
    toast({
      title: "Payment claimed",
      description: `You've successfully claimed $${amount} from loan #${loanId}`,
    })
  }

  const handleClaimRewards = async () => {
    setIsClaimingRewards(true)

    // Simulate transaction
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Rewards claimed",
      description: `You've successfully claimed ${seedRewards.available} $SEED tokens`,
    })

    setIsClaimingRewards(false)
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  if (!connected) {
    return (
      <div className="container py-12">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">My Portfolio</h1>
          <p className="text-muted-foreground mb-6">
            Connect your wallet to view your portfolio and track your investments.
          </p>
          <Button>Connect Wallet</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">My Portfolio</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Active Investments</CardTitle>
            <CardDescription>Your current loan portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">${activeLoans.reduce((sum, loan) => sum + loan.funded, 0)}</div>
            <div className="text-sm text-muted-foreground">{activeLoans.length} active loans</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Insurance Coverage</CardTitle>
            <CardDescription>Protection against climate events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ${insurancePayouts.reduce((sum, payout) => sum + payout.amount, 0)}
            </div>
            <div className="text-sm text-muted-foreground">{insurancePayouts.length} insurance events</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>$SEED Rewards</CardTitle>
            <CardDescription>Governance and staking tokens</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{seedRewards.available + seedRewards.staked} $SEED</div>
            <div className="text-sm text-muted-foreground">
              {seedRewards.staked} staked at {seedRewards.apr}% APR
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Loans */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Active Loans</h2>
        <Accordion type="single" collapsible className="border rounded-md">
          {activeLoans.map((loan) => (
            <AccordionItem key={loan.id} value={loan.id}>
              <AccordionTrigger className="px-4 hover:no-underline">
                <div className="flex flex-1 items-center justify-between pr-4">
                  <div className="font-medium">{loan.borrower}</div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-muted-foreground">
                      ${loan.funded} at {loan.apr}%
                    </div>
                    <Badge variant={loan.status === "due" ? "default" : "outline"}>
                      {loan.status === "due" ? "Payment Due" : "Current"}
                    </Badge>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Loan Amount:</span>
                      <span>${loan.amount}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Term:</span>
                      <span>{loan.term} months</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Next Payment:</span>
                      <span>{formatDate(loan.nextPayment)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Payment Amount:</span>
                      <span>${loan.paymentAmount}</span>
                    </div>
                  </div>
                  <div className="flex flex-col justify-end">
                    {loan.status === "due" ? (
                      <Button onClick={() => handleClaimPayment(loan.id, loan.paymentAmount)}>Claim Payment</Button>
                    ) : (
                      <div className="text-sm text-muted-foreground text-center">
                        Next payment in{" "}
                        {Math.ceil((loan.nextPayment.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days
                      </div>
                    )}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Insurance Payouts */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4">Insurance Payouts</h2>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Borrower</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {insurancePayouts.map((payout) => (
                  <TableRow key={payout.id}>
                    <TableCell className="font-medium">{payout.borrower}</TableCell>
                    <TableCell>
                      {payout.event === "drought" && "☔ Drought"}
                      {payout.event === "flood" && "🌊 Flood"}
                      {payout.event === "cyclone" && "🌀 Cyclone"}
                    </TableCell>
                    <TableCell>${payout.amount}</TableCell>
                    <TableCell>{formatDate(payout.date)}</TableCell>
                    <TableCell>
                      <Badge
                        variant={payout.status === "paid" ? "outline" : "default"}
                        className={payout.status === "paid" ? "bg-green-50 text-green-700 border-green-200" : ""}
                      >
                        {payout.status === "paid" ? "Paid" : "Pending Oracle"}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* $SEED Rewards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>$SEED Rewards</span>
              <Button onClick={handleClaimRewards} disabled={isClaimingRewards || seedRewards.available === 0}>
                {isClaimingRewards ? "Claiming..." : "Claim Rewards"}
              </Button>
            </CardTitle>
            <CardDescription>Earn $SEED tokens for providing liquidity to the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Available:</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{seedRewards.available} $SEED</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Staked:</span>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{seedRewards.staked} $SEED</span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <Info className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Staking $SEED tokens gives you a {seedRewards.boost}x APR boost on loans</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Staking APR:</span>
                <span className="font-medium">{seedRewards.apr}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">APR Boost:</span>
                <span className="font-medium">{seedRewards.boost}x</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Reputation NFT */}
        <Card>
          <CardHeader>
            <CardTitle>Reputation NFT</CardTitle>
            <CardDescription>Your on-chain reputation score and lender level</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="relative w-24 h-24 mb-4">
                <div className="absolute inset-0 flex items-center justify-center rounded-full bg-primary/10 border-2 border-primary">
                  <Award className="h-12 w-12 text-primary" />
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground text-xs font-bold px-2 py-0.5 rounded-full">
                  Level {seedRewards.level}
                </div>
              </div>

              <div className="w-full space-y-2 mt-4">
                <div className="flex justify-between text-sm">
                  <span>Progress to Level {seedRewards.level + 1}</span>
                  <span>{seedRewards.progress}%</span>
                </div>
                <Progress value={seedRewards.progress} className="h-2" />
              </div>

              <div className="grid grid-cols-2 gap-4 w-full mt-6">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Loans Funded</div>
                  <div className="font-bold text-xl">12</div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Success Rate</div>
                  <div className="font-bold text-xl">98%</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
