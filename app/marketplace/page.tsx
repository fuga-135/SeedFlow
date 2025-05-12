"use client"

import { useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Search, ChevronDown } from "lucide-react"
import LoanCard from "@/components/loan-card"
import LoanDetailsDrawer from "@/components/loan-details-drawer"
import FundingModal from "@/components/funding-modal"
import { mockLoans } from "@/lib/mock-data"

export default function MarketplacePage() {
  const { toast } = useToast()
  const [loans, setLoans] = useState<any[]>([])
  const [filteredLoans, setFilteredLoans] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedLoan, setSelectedLoan] = useState<any | null>(null)
  const [isFundingModalOpen, setIsFundingModalOpen] = useState(false)
  const [fundingAmount, setFundingAmount] = useState(0)

  // Filters
  const [filters, setFilters] = useState({
    countries: [] as string[],
    sectors: [] as string[],
    insurance: [] as string[],
    search: "",
    sort: "newest",
  })

  // Load mock data
  useEffect(() => {
    const loadData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setLoans(mockLoans)
      setFilteredLoans(mockLoans)
      setIsLoading(false)
    }

    loadData()

    // Set up websocket mock for live updates
    const interval = setInterval(() => {
      setLoans((prevLoans) =>
        prevLoans.map((loan) => {
          if (Math.random() > 0.7) {
            const newFunded = Math.min(loan.funded + Math.random() * 20, loan.amount)
            return { ...loan, funded: newFunded }
          }
          return loan
        }),
      )
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  // Apply filters
  useEffect(() => {
    let result = [...loans]

    // Country filter
    if (filters.countries.length > 0) {
      result = result.filter((loan) => filters.countries.includes(loan.country))
    }

    // Sector filter
    if (filters.sectors.length > 0) {
      result = result.filter((loan) => filters.sectors.includes(loan.sector))
    }

    // Insurance filter
    if (filters.insurance.length > 0) {
      result = result.filter((loan) => filters.insurance.some((ins) => loan.insurance.includes(ins)))
    }

    // Search
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      result = result.filter(
        (loan) => loan.name.toLowerCase().includes(searchLower) || loan.story.toLowerCase().includes(searchLower),
      )
    }

    // Sort
    switch (filters.sort) {
      case "newest":
        result.sort((a, b) => b.createdAt - a.createdAt)
        break
      case "apr-asc":
        result.sort((a, b) => a.apr - b.apr)
        break
      case "funding-desc":
        result.sort((a, b) => b.funded / b.amount - a.funded / a.amount)
        break
      case "term":
        result.sort((a, b) => a.term - b.term)
        break
    }

    setFilteredLoans(result)
  }, [loans, filters])

  const handleOpenLoanDetails = (loan: any) => {
    setSelectedLoan(loan)
  }

  const handleCloseLoanDetails = () => {
    setSelectedLoan(null)
  }

  const handleQuickFund = (loan: any, percentage: number) => {
    const amount = (loan.amount - loan.funded) * (percentage / 100)
    setSelectedLoan(loan)
    setFundingAmount(amount)
    setIsFundingModalOpen(true)
  }

  const handleFundingComplete = (loanId: string, amount: number) => {
    // Update loan funding status
    setLoans((prevLoans) =>
      prevLoans.map((loan) =>
        loan.id === loanId ? { ...loan, funded: Math.min(loan.funded + amount, loan.amount) } : loan,
      ),
    )

    setIsFundingModalOpen(false)

    toast({
      title: "Funding successful!",
      description: `You've successfully funded $${amount.toFixed(2)} to this loan.`,
    })
  }

  return (
    <div className="container py-6">
      {/* Filter Bar */}
      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b pb-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-1 flex-col md:flex-row gap-4 w-full md:w-auto">
            {/* Country Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full md:w-auto justify-between">
                  {filters.countries.length > 0 ? `${filters.countries.length} Countries` : "Country"}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {["KE", "UG", "TZ", "BD", "PH", "VN", "KH"].map((country) => (
                  <DropdownMenuCheckboxItem
                    key={country}
                    checked={filters.countries.includes(country)}
                    onCheckedChange={(checked) => {
                      setFilters({
                        ...filters,
                        countries: checked
                          ? [...filters.countries, country]
                          : filters.countries.filter((c) => c !== country),
                      })
                    }}
                  >
                    {country}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Sector Filter */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full md:w-auto justify-between">
                  {filters.sectors.length > 0 ? `${filters.sectors.length} Sectors` : "Sector"}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {["Crop", "Livestock", "Retail", "Services"].map((sector) => (
                  <DropdownMenuCheckboxItem
                    key={sector}
                    checked={filters.sectors.includes(sector)}
                    onCheckedChange={(checked) => {
                      setFilters({
                        ...filters,
                        sectors: checked ? [...filters.sectors, sector] : filters.sectors.filter((s) => s !== sector),
                      })
                    }}
                  >
                    {sector}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Insurance Filter */}
            <div className="flex flex-wrap gap-2">
              <Badge
                variant={filters.insurance.includes("drought") ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => {
                  setFilters({
                    ...filters,
                    insurance: filters.insurance.includes("drought")
                      ? filters.insurance.filter((i) => i !== "drought")
                      : [...filters.insurance, "drought"],
                  })
                }}
              >
                ☔ Drought
              </Badge>
              <Badge
                variant={filters.insurance.includes("flood") ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => {
                  setFilters({
                    ...filters,
                    insurance: filters.insurance.includes("flood")
                      ? filters.insurance.filter((i) => i !== "flood")
                      : [...filters.insurance, "flood"],
                  })
                }}
              >
                🌊 Flood
              </Badge>
              <Badge
                variant={filters.insurance.includes("cyclone") ? "default" : "outline"}
                className="cursor-pointer"
                onClick={() => {
                  setFilters({
                    ...filters,
                    insurance: filters.insurance.includes("cyclone")
                      ? filters.insurance.filter((i) => i !== "cyclone")
                      : [...filters.insurance, "cyclone"],
                  })
                }}
              >
                🌀 Cyclone
              </Badge>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
            {/* Search */}
            <div className="relative w-full md:w-auto">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search projects..."
                className="pl-8 w-full md:w-[200px]"
                value={filters.search}
                onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              />
            </div>

            {/* Sort */}
            <Select value={filters.sort} onValueChange={(value) => setFilters({ ...filters, sort: value })}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest</SelectItem>
                <SelectItem value="apr-asc">APR (Low to High)</SelectItem>
                <SelectItem value="funding-desc">Funding % (High to Low)</SelectItem>
                <SelectItem value="term">Term Length</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Loan Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="rounded-lg border overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <div className="p-4 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-8 w-full" />
                </div>
              </div>
            ))
          : filteredLoans.map((loan) => (
              <LoanCard
                key={loan.id}
                loan={loan}
                onOpenDetails={() => handleOpenLoanDetails(loan)}
                onQuickFund={handleQuickFund}
              />
            ))}
      </div>

      {/* Empty State */}
      {!isLoading && filteredLoans.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium">No loans match your filters</h3>
          <p className="text-muted-foreground mt-2">
            Try adjusting your filters or check back later for new opportunities.
          </p>
          <Button
            className="mt-4"
            onClick={() =>
              setFilters({
                countries: [],
                sectors: [],
                insurance: [],
                search: "",
                sort: "newest",
              })
            }
          >
            Clear All Filters
          </Button>
        </div>
      )}

      {/* Load More */}
      {!isLoading && filteredLoans.length > 0 && (
        <div className="flex justify-center mt-8">
          <Button variant="outline">Load More</Button>
        </div>
      )}

      {/* Loan Details Drawer */}
      {selectedLoan && (
        <LoanDetailsDrawer
          loan={selectedLoan}
          open={!!selectedLoan}
          onClose={handleCloseLoanDetails}
          onFund={() => setIsFundingModalOpen(true)}
        />
      )}

      {/* Funding Modal */}
      {selectedLoan && (
        <FundingModal
          loan={selectedLoan}
          open={isFundingModalOpen}
          onOpenChange={setIsFundingModalOpen}
          initialAmount={fundingAmount}
          onComplete={handleFundingComplete}
        />
      )}
    </div>
  )
}
