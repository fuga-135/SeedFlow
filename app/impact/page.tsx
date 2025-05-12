"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ChartContainer, ChartTooltip, ChartLegend, ChartTitle } from "@/components/ui/chart"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"

export default function ImpactStatsPage() {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data
  const overviewData = {
    totalFunded: 2500000,
    totalBorrowers: 1250,
    totalLenders: 850,
    avgLoanSize: 2000,
    successRate: 98,
    insuranceClaims: 45,
  }

  const countriesData = [
    { name: "Kenya", value: 35 },
    { name: "Uganda", value: 20 },
    { name: "Tanzania", value: 15 },
    { name: "Bangladesh", value: 10 },
    { name: "Philippines", value: 10 },
    { name: "Vietnam", value: 5 },
    { name: "Cambodia", value: 5 },
  ]

  const sectorData = [
    { name: "Crop", value: 45 },
    { name: "Livestock", value: 25 },
    { name: "Retail", value: 20 },
    { name: "Services", value: 10 },
  ]

  const monthlyFundingData = [
    { name: "Jan", amount: 150000 },
    { name: "Feb", amount: 180000 },
    { name: "Mar", amount: 210000 },
    { name: "Apr", amount: 240000 },
    { name: "May", amount: 300000 },
  ]

  const insuranceData = [
    { name: "Drought", claims: 25, amount: 125000 },
    { name: "Flood", claims: 15, amount: 75000 },
    { name: "Cyclone", claims: 5, amount: 50000 },
  ]

  const sdgData = [
    { name: "SDG 1: No Poverty", value: 85 },
    { name: "SDG 2: Zero Hunger", value: 75 },
    { name: "SDG 5: Gender Equality", value: 60 },
    { name: "SDG 8: Decent Work", value: 70 },
    { name: "SDG 13: Climate Action", value: 50 },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"]

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-2">Impact Statistics</h1>
      <p className="text-muted-foreground mb-8">Track the social and environmental impact of the SeedFlow platform</p>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="geographic">Geographic</TabsTrigger>
          <TabsTrigger value="sdgs">SDG Impact</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Total Funded</CardTitle>
                <CardDescription>All-time funding volume</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">${overviewData.totalFunded.toLocaleString()}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Borrowers</CardTitle>
                <CardDescription>Entrepreneurs supported</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{overviewData.totalBorrowers.toLocaleString()}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Success Rate</CardTitle>
                <CardDescription>Loan repayment rate</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{overviewData.successRate}%</div>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Funding Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Funding Volume</CardTitle>
              <CardDescription>Total amount funded per month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ChartContainer>
                  <ChartTitle>Monthly Funding (USD)</ChartTitle>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyFundingData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip formatter={(value: number) => [`$${value.toLocaleString()}`, "Amount"]} />
                      <Bar dataKey="amount" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          {/* Sector Distribution */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sector Distribution</CardTitle>
                <CardDescription>Funding by business sector</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ChartContainer>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={sectorData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        >
                          {sectorData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <ChartTooltip formatter={(value: number) => [`${value}%`, "Percentage"]} />
                      </PieChart>
                    </ResponsiveContainer>
                    <ChartLegend />
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            {/* Insurance Claims */}
            <Card>
              <CardHeader>
                <CardTitle>Insurance Claims</CardTitle>
                <CardDescription>Payouts by event type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ChartContainer>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={insuranceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <ChartTooltip
                          formatter={(value: number, name: string) => [
                            name === "claims" ? value : `$${value.toLocaleString()}`,
                            name === "claims" ? "Claims" : "Amount",
                          ]}
                        />
                        <Bar dataKey="claims" fill="#00C49F" name="Claims" />
                        <Bar dataKey="amount" fill="#0088FE" name="Amount" />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="geographic" className="space-y-8">
          {/* Country Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Geographic Distribution</CardTitle>
              <CardDescription>Funding by country</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ChartContainer>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={countriesData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={100} />
                      <ChartTooltip formatter={(value: number) => [`${value}%`, "Percentage"]} />
                      <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          {/* Country Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Kenya</CardTitle>
                <CardDescription>Top performing country</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Borrowers:</span>
                    <span>438</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Funded:</span>
                    <span>$875,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Success Rate:</span>
                    <span>99%</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="outline">Crop</Badge>
                    <Badge variant="outline">Livestock</Badge>
                    <Badge variant="outline">Retail</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Bangladesh</CardTitle>
                <CardDescription>Fastest growing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Borrowers:</span>
                    <span>125</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Funded:</span>
                    <span>$250,000</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Growth Rate:</span>
                    <span>+45% MoM</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="outline">Crop</Badge>
                    <Badge variant="outline">Services</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Philippines</CardTitle>
                <CardDescription>Most insurance claims</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Borrowers:</span>
                    <span>125</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Insurance Claims:</span>
                    <span>18</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Claim Amount:</span>
                    <span>$90,000</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Badge variant="outline">Cyclone</Badge>
                    <Badge variant="outline">Flood</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sdgs" className="space-y-8">
          {/* SDG Impact */}
          <Card>
            <CardHeader>
              <CardTitle>Sustainable Development Goals Impact</CardTitle>
              <CardDescription>Contribution to UN SDGs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ChartContainer>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sdgData} layout="vertical">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" width={150} />
                      <ChartTooltip formatter={(value: number) => [`${value}%`, "Impact Score"]} />
                      <Bar dataKey="value" fill="#00C49F" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          {/* SDG Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>SDG 1: No Poverty</CardTitle>
                <CardDescription>End poverty in all its forms everywhere</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    SeedFlow has helped 1,250 entrepreneurs access affordable capital, with 85% reporting increased
                    household income after receiving funding.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Impact Score:</span>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">85%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Key Metric:</span>
                    <span>+42% avg. income increase</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SDG 13: Climate Action</CardTitle>
                <CardDescription>Combat climate change and its impacts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Through parametric insurance products, SeedFlow has protected 750 farmers against climate risks,
                    with 45 successful insurance payouts during extreme weather events.
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Impact Score:</span>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">50%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Key Metric:</span>
                    <span>$250,000 in climate protection</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
