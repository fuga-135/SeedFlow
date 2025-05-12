"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
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
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { CloudUpload } from "lucide-react"

type BorrowerModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function BorrowerModal({ open, onOpenChange }: BorrowerModalProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    amount: 100,
    term: 6,
    apr: 12,
    story: "",
    insurance: {
      drought: false,
      flood: false,
      cyclone: false,
    },
    photo: null as File | null,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [charCount, setCharCount] = useState(0)

  // Mock credit score service response
  const getCreditScore = () => {
    const scores = ["A", "B", "C", "D"]
    const score = scores[Math.floor(Math.random() * scores.length)]
    const aprMap = { A: 8, B: 12, C: 15, D: 18 }
    return { score, apr: aprMap[score as keyof typeof aprMap] }
  }

  const handleAmountChange = (value: number[]) => {
    setFormData({ ...formData, amount: value[0] })
  }

  const handleTermChange = (value: number[]) => {
    setFormData({ ...formData, term: value[0] })
  }

  const handleStoryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value
    setCharCount(text.length)
    if (text.length <= 280) {
      setFormData({ ...formData, story: text })
    }
  }

  const handleInsuranceChange = (type: keyof typeof formData.insurance) => {
    setFormData({
      ...formData,
      insurance: {
        ...formData.insurance,
        [type]: !formData.insurance[type],
      },
    })
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, photo: e.target.files[0] })
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    // Simulate transaction
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Loan request created!",
      description: `Your loan request for $${formData.amount} has been posted to the marketplace.`,
    })

    setIsSubmitting(false)
    onOpenChange(false)

    // Navigate to marketplace
    router.push("/marketplace")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create Loan Request</DialogTitle>
          <DialogDescription>
            Fill out the details for your loan request. Once submitted, it will appear on the marketplace.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Loan Amount (USD): ${formData.amount}</Label>
            <Slider
              id="amount"
              min={50}
              max={500}
              step={10}
              value={[formData.amount]}
              onValueChange={handleAmountChange}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>$50</span>
              <span>$500</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="term">Term (months): {formData.term}</Label>
            <Slider id="term" min={1} max={12} step={1} value={[formData.term]} onValueChange={handleTermChange} />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1 month</span>
              <span>12 months</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="apr">Suggested APR: {formData.apr}%</Label>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const { apr } = getCreditScore()
                  setFormData({ ...formData, apr })
                }}
              >
                Get Suggestion
              </Button>
            </div>
            <Input
              id="apr"
              type="number"
              value={formData.apr}
              onChange={(e) => setFormData({ ...formData, apr: Number(e.target.value) })}
              min={1}
              max={formData.apr}
            />
            <p className="text-xs text-muted-foreground">
              You can lower the APR, but not increase it above the suggested rate.
            </p>
          </div>

          <div className="space-y-2">
            <Label>Insurance Options</Label>
            <div className="flex flex-col gap-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="drought"
                  checked={formData.insurance.drought}
                  onCheckedChange={() => handleInsuranceChange("drought")}
                />
                <Label htmlFor="drought" className="flex items-center">
                  ☔ Drought Protection (+2% premium)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="flood"
                  checked={formData.insurance.flood}
                  onCheckedChange={() => handleInsuranceChange("flood")}
                />
                <Label htmlFor="flood" className="flex items-center">
                  🌊 Flood Protection (+1.5% premium)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="cyclone"
                  checked={formData.insurance.cyclone}
                  onCheckedChange={() => handleInsuranceChange("cyclone")}
                />
                <Label htmlFor="cyclone" className="flex items-center">
                  🌀 Cyclone Protection (+2.5% premium)
                </Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="story">Your Story</Label>
              <span className={`text-xs ${charCount > 250 ? "text-amber-500" : "text-muted-foreground"}`}>
                {charCount}/280
              </span>
            </div>
            <Textarea
              id="story"
              placeholder="Tell potential lenders about your business and how this loan will help..."
              value={formData.story}
              onChange={handleStoryChange}
              maxLength={280}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="photo">Upload Photo</Label>
            <div className="border-2 border-dashed rounded-md p-4 text-center cursor-pointer hover:bg-muted/50 transition-colors">
              <input id="photo" type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
              <label htmlFor="photo" className="cursor-pointer flex flex-col items-center">
                <CloudUpload className="h-8 w-8 text-muted-foreground mb-2" />
                <span className="text-sm text-muted-foreground">
                  {formData.photo ? formData.photo.name : "Drag & drop or click to upload"}
                </span>
              </label>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Loan Request"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
