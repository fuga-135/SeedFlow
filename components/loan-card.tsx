"use client"

import { useState } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Progress } from "@/components/ui/progress"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Info } from "lucide-react"

type LoanCardProps = {
  loan: any
  onOpenDetails: () => void
  onQuickFund: (loan: any, percentage: number) => void
}

export default function LoanCard({ loan, onOpenDetails, onQuickFund }: LoanCardProps) {
  const [quickFundPercentage, setQuickFundPercentage] = useState(50)
  const [showQuickFund, setShowQuickFund] = useState(false)

  const fundingPercentage = (loan.funded / loan.amount) * 100
  const remainingAmount = loan.amount - loan.funded

  const formatInsurance = (insurance: string[]) => {
    const icons: Record<string, string> = {
      drought: "☔",
      flood: "🌊",
      cyclone: "🌀",
    }

    return insurance.map((ins) => icons[ins] || ins)
  }

  return (
    <div className="rounded-lg border overflow-hidden bg-card hover:shadow-md transition-shadow">
      {/* Image with Country Flag */}
      <div className="relative h-48 cursor-pointer" onClick={onOpenDetails}>
        <Image
          src={loan.image || "/placeholder.svg?height=192&width=384"}
          alt={loan.name}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm rounded-md px-2 py-1 text-xs font-medium">
          {loan.country}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3
            className="font-semibold text-lg cursor-pointer hover:text-primary transition-colors"
            onClick={onOpenDetails}
          >
            {loan.name}
          </h3>
          <Badge variant="outline">{loan.sector}</Badge>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{loan.story}</p>

        {/* Funding Progress */}
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span>${loan.funded.toFixed(0)} funded</span>
            <span>${loan.amount.toFixed(0)} goal</span>
          </div>
          <Progress value={fundingPercentage} className="h-2" />
        </div>

        {/* Loan Details */}
        <div className="flex items-center justify-between mb-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 px-2">
                  <span className="text-sm font-medium mr-1">Details</span>
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="p-4 space-y-2 w-64">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">APR:</span>
                  <span className="font-medium">{loan.apr}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Term:</span>
                  <span className="font-medium">{loan.term} months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Insurance:</span>
                  <span className="font-medium">{formatInsurance(loan.insurance).join(" ")}</span>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button variant="outline" size="sm" onClick={onOpenDetails}>
            View
          </Button>
        </div>

        {/* Quick Fund */}
        {remainingAmount > 0 && (
          <div className="border-t pt-3">
            {showQuickFund ? (
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Quick Fund: {quickFundPercentage}%</span>
                  <span>${((remainingAmount * quickFundPercentage) / 100).toFixed(2)}</span>
                </div>
                <Slider
                  value={[quickFundPercentage]}
                  onValueChange={(value) => setQuickFundPercentage(value[0])}
                  min={10}
                  max={100}
                  step={10}
                />
                <div className="flex justify-between gap-2">
                  <Button variant="outline" size="sm" className="flex-1" onClick={() => setShowQuickFund(false)}>
                    Cancel
                  </Button>
                  <Button size="sm" className="flex-1" onClick={() => onQuickFund(loan, quickFundPercentage)}>
                    Fund
                  </Button>
                </div>
              </div>
            ) : (
              <Button variant="default" className="w-full" onClick={() => setShowQuickFund(true)}>
                Quick Fund
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
