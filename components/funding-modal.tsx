"use client"

import type React from "react"

import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Loader2 } from "lucide-react"

type FundingModalProps = {
  loan: any
  open: boolean
  onOpenChange: (open: boolean) => void
  initialAmount?: number
  onComplete: (loanId: string, amount: number) => void
}

export default function FundingModal({ loan, open, onOpenChange, initialAmount = 0, onComplete }: FundingModalProps) {
  const { toast } = useToast()
  const [step, setStep] = useState(1)
  const [amount, setAmount] = useState(initialAmount || 50)
  const [autoReinvest, setAutoReinvest] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const remainingAmount = loan.amount - loan.funded
  const maxAmount = Math.min(remainingAmount, 500)
  const solAmount = amount / 20 // Mock conversion rate
  const txFee = 0.000005 // Mock transaction fee

  const handleAmountChange = (value: number[]) => {
    setAmount(Math.min(value[0], maxAmount))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseFloat(e.target.value)
    if (!isNaN(value)) {
      setAmount(Math.min(value, maxAmount))
    }
  }

  const handleContinue = () => {
    setStep(2)
  }

  const handleBack = () => {
    setStep(1)
  }

  const handleConfirm = async () => {
    setIsProcessing(true)

    // Simulate transaction
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Mock transaction hash
    const txHash = "5KtP9xz1zMroxES9BhhJT5Pqgvp3Bv7mFZKJYQMJQBxJRkjKvXQ"

    toast({
      title: "Transaction confirmed",
      description: (
        <div className="flex flex-col gap-1">
          <span>
            Successfully funded ${amount.toFixed(2)} to {loan.name}
          </span>
          <a
            href={`https://solscan.io/tx/${txHash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-blue-500 hover:underline"
          >
            View on Solscan
          </a>
        </div>
      ),
    })

    setIsProcessing(false)
    onComplete(loan.id, amount)
    setStep(1)
    onOpenChange(false)
  }

  const handleCancel = () => {
    setStep(1)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{step === 1 ? "Fund This Loan" : "Confirm Funding"}</DialogTitle>
          <DialogDescription>
            {step === 1
              ? "Choose how much you want to fund for this loan."
              : "Review your funding details before confirming."}
          </DialogDescription>
        </DialogHeader>

        {step === 1 ? (
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="amount">Amount (USD)</Label>
                <span className="text-sm text-muted-foreground">Max: ${maxAmount.toFixed(2)}</span>
              </div>
              <div className="flex gap-2 items-center">
                <span className="text-sm">$</span>
                <Input
                  id="amount"
                  type="number"
                  value={amount}
                  onChange={handleInputChange}
                  min={10}
                  max={maxAmount}
                  step={10}
                />
              </div>
              <Slider
                value={[amount]}
                onValueChange={handleAmountChange}
                min={10}
                max={maxAmount}
                step={10}
                className="mt-2"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>$10</span>
                <span>${maxAmount.toFixed(0)}</span>
              </div>
            </div>

            <div className="space-y-2 pt-2">
              <div className="flex justify-between text-sm">
                <span>Equivalent SOL:</span>
                <span>◎ {solAmount.toFixed(4)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Transaction Fee:</span>
                <span>◎ {txFee.toFixed(6)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Total:</span>
                <span>◎ {(solAmount + txFee).toFixed(4)}</span>
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <Switch id="auto-reinvest" checked={autoReinvest} onCheckedChange={setAutoReinvest} />
              <Label htmlFor="auto-reinvest">Auto-reinvest returns</Label>
            </div>
          </div>
        ) : (
          <div className="grid gap-4 py-4">
            <div className="space-y-4">
              <div className="bg-muted p-4 rounded-md space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Loan ID:</span>
                  <span className="font-medium">{loan.id.slice(0, 8)}...</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Borrower:</span>
                  <span className="font-medium">{loan.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Amount:</span>
                  <span className="font-medium">${amount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Interest Rate:</span>
                  <span className="font-medium">{loan.apr}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Maturity Date:</span>
                  <span className="font-medium">
                    {new Date(loan.createdAt.getTime() + loan.term * 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Insurance Coverage:</span>
                  <span className="font-medium">{loan.insurance.length * 25}%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Expected Return:</span>
                  <span className="font-medium">${(amount * (1 + loan.apr / 100)).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Auto-reinvest:</span>
                  <span className="font-medium">{autoReinvest ? "Yes" : "No"}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <DialogFooter>
          {step === 1 ? (
            <>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
              <Button onClick={handleContinue}>Continue</Button>
            </>
          ) : (
            <>
              <Button variant="outline" onClick={handleBack} disabled={isProcessing}>
                Back
              </Button>
              <Button onClick={handleConfirm} disabled={isProcessing}>
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Confirm & Sign"
                )}
              </Button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
