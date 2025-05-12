"use client"

import { useState } from "react"
import Image from "next/image"
import { useToast } from "@/components/ui/use-toast"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { Share2, Calendar, ArrowUpRight } from "lucide-react"

type LoanDetailsDrawerProps = {
  loan: any
  open: boolean
  onClose: () => void
  onFund: () => void
}

export default function LoanDetailsDrawer({ loan, open, onClose, onFund }: LoanDetailsDrawerProps) {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("overview")

  const fundingPercentage = (loan.funded / loan.amount) * 100
  const insuranceCoverage = loan.insurance.length * 25 // Mock calculation

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const handleShare = () => {
    navigator.clipboard.writeText(`https://seedflow.vercel.app/loan/${loan.id}`)
    toast({
      title: "Link copied",
      description: "Loan link copied to clipboard",
    })
  }

  const handleTwitterShare = () => {
    const text = `Check out this loan opportunity on SeedFlow: ${loan.name}`
    const url = `https://seedflow.vercel.app/loan/${loan.id}`
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      "_blank",
    )
  }

  return (
    <Sheet open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <SheetContent className="sm:max-w-xl w-full overflow-y-auto">
        <SheetHeader className="mb-4">
          <SheetTitle>{loan.name}</SheetTitle>
          <SheetDescription>
            {loan.sector} • {loan.country}
          </SheetDescription>
        </SheetHeader>

        {/* Image Carousel */}
        <div className="relative h-64 mb-6 rounded-lg overflow-hidden">
          <Image
            src={loan.image || "/placeholder.svg?height=256&width=512"}
            alt={loan.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Stats Panel */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <span className="text-xs text-muted-foreground">Amount</span>
              <span className="text-lg font-bold">${loan.amount}</span>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <span className="text-xs text-muted-foreground">APR</span>
              <span className="text-lg font-bold">{loan.apr}%</span>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <span className="text-xs text-muted-foreground">Term</span>
              <span className="text-lg font-bold">{loan.term} months</span>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex flex-col items-center justify-center">
              <span className="text-xs text-muted-foreground">Insurance</span>
              <div className="flex gap-1 mt-1">
                {loan.insurance.includes("drought") && <span>☔</span>}
                {loan.insurance.includes("flood") && <span>🌊</span>}
                {loan.insurance.includes("cyclone") && <span>🌀</span>}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Ring */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex-1">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Funding Progress</span>
                <span>{fundingPercentage.toFixed(0)}%</span>
              </div>
              <Progress value={fundingPercentage} className="h-2" />
            </div>
          </div>
          <div className="w-4"></div>
          <div className="flex-1">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Insurance Coverage</span>
                <span>{insuranceCoverage}%</span>
              </div>
              <Progress value={insuranceCoverage} className="h-2" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="risk">Risk</TabsTrigger>
            <TabsTrigger value="repayments">Repayments</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">About this loan</h4>
              <p className="text-sm text-muted-foreground">{loan.story}</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Project Timeline</h4>
              <div className="text-sm space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>Created: {formatDate(loan.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    Maturity: {formatDate(new Date(loan.createdAt.getTime() + loan.term * 30 * 24 * 60 * 60 * 1000))}
                  </span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="risk" className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Risk Assessment</h4>
              <div className="flex items-center gap-2 mb-2">
                <Badge>Credit Score: B</Badge>
                <Badge variant="outline">On-time Repayment: 92%</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                This borrower has completed 3 previous loans with an average on-time repayment rate of 92%.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Insurance Coverage</h4>
              <ul className="text-sm space-y-2">
                {loan.insurance.includes("drought") && (
                  <li className="flex items-center gap-2">
                    <span>☔</span>
                    <span>Drought protection: Triggers if rainfall is below 40% of average for 30 days</span>
                  </li>
                )}
                {loan.insurance.includes("flood") && (
                  <li className="flex items-center gap-2">
                    <span>🌊</span>
                    <span>Flood protection: Triggers if water levels rise above 2m for 3 days</span>
                  </li>
                )}
                {loan.insurance.includes("cyclone") && (
                  <li className="flex items-center gap-2">
                    <span>🌀</span>
                    <span>Cyclone protection: Triggers if wind speeds exceed 120 km/h</span>
                  </li>
                )}
              </ul>
            </div>
            <div>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <span>View Oracle Feed</span>
                <ArrowUpRight className="h-3 w-3" />
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="repayments" className="space-y-4">
            <div className="text-sm border rounded-md divide-y">
              <div className="grid grid-cols-4 p-2 font-medium bg-muted/50">
                <div>Date</div>
                <div>Amount</div>
                <div>Principal</div>
                <div>Status</div>
              </div>
              {Array.from({ length: loan.term }).map((_, i) => {
                const date = new Date(loan.createdAt)
                date.setMonth(date.getMonth() + i + 1)
                const isPast = date < new Date()

                return (
                  <div key={i} className="grid grid-cols-4 p-2">
                    <div>{formatDate(date)}</div>
                    <div>${((loan.amount / loan.term) * 1.1).toFixed(2)}</div>
                    <div>${(loan.amount / loan.term).toFixed(2)}</div>
                    <div>
                      {isPast ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          Paid
                        </Badge>
                      ) : (
                        <Badge variant="outline">Upcoming</Badge>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="comments" className="space-y-4">
            <div className="text-center py-4">
              <p className="text-sm text-muted-foreground mb-2">Connect your wallet to leave a comment</p>
              <Button variant="outline" size="sm">
                Connect Wallet
              </Button>
            </div>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-6">
          <Button className="flex-1" onClick={onFund} disabled={loan.funded >= loan.amount}>
            {loan.funded >= loan.amount ? "Fully Funded" : "Fund This Loan"}
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={handleTwitterShare}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
              </svg>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
