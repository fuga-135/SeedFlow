"use client"

import { useState, useEffect } from "react"
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
import { Bell } from "lucide-react"

export default function OracleNotification() {
  const { toast } = useToast()
  const [showNotification, setShowNotification] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [notificationCount, setNotificationCount] = useState(0)
  const [eventData, setEventData] = useState<any>(null)

  // Simulate oracle event after 10 seconds (for demo purposes)
  useEffect(() => {
    const timer = setTimeout(() => {
      const event = {
        type: "drought",
        loanId: "loan123",
        borrower: "Maria's Farm",
        amount: 50,
        date: new Date(),
      }

      setEventData(event)
      setShowNotification(true)
      setNotificationCount((prev) => prev + 1)

      toast({
        title: "Oracle Event Detected",
        description: "Drought trigger hit for a loan in your portfolio",
      })
    }, 10000)

    return () => clearTimeout(timer)
  }, [toast])

  const handleNotificationClick = () => {
    setShowModal(true)
    setShowNotification(false)
    setNotificationCount(0)
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  return (
    <>
      {/* Notification Bell */}
      <div className="fixed bottom-20 right-4 z-50">
        <Button
          size="icon"
          variant={showNotification ? "default" : "outline"}
          className={`rounded-full h-12 w-12 shadow-lg ${showNotification ? "animate-pulse" : ""}`}
          onClick={handleNotificationClick}
        >
          <Bell className="h-6 w-6" />
          {notificationCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {notificationCount}
            </span>
          )}
        </Button>
      </div>

      {/* Oracle Event Modal */}
      {eventData && (
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Insurance Event Triggered</DialogTitle>
              <DialogDescription>
                A weather oracle has detected a climate event that triggered an insurance payout.
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              <div className="bg-muted p-4 rounded-md space-y-3">
                <div className="flex items-center justify-center text-4xl mb-2">
                  {eventData.type === "drought" && "☔"}
                  {eventData.type === "flood" && "🌊"}
                  {eventData.type === "cyclone" && "🌀"}
                </div>

                <div className="text-center mb-2">
                  <h3 className="font-medium text-lg capitalize">{eventData.type} Event Detected</h3>
                  <p className="text-sm text-muted-foreground">{new Date().toLocaleDateString()}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Loan ID:</span>
                    <span className="font-medium">{eventData.loanId}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Borrower:</span>
                    <span className="font-medium">{eventData.borrower}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Payout Amount:</span>
                    <span className="font-medium">${eventData.amount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="font-medium text-green-600">Paid to Borrower</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-sm text-muted-foreground">
                <p>
                  This insurance payout has been automatically processed. Your principal is protected and the loan will
                  continue as scheduled.
                </p>
              </div>
            </div>

            <DialogFooter>
              <Button onClick={handleCloseModal}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
