"use client"

import { useState } from "react"
import {
  ArrowDownIcon,
  ArrowUpIcon,
  BarChart3Icon,
  CreditCardIcon,
  DollarSignIcon,
  HelpCircleIcon,
  PercentIcon,
  PieChartIcon,
  TrendingUpIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

export default function Dashboard() {
  const [fiscalYear, setFiscalYear] = useState("2025-2026")

  // Summary data for key metrics
  const summaryData = [
    {
      title: "Total Revenue",
      value: "₹3,835,268.52 Cr",
      change: "+10.02%",
      trend: "up",
      icon: DollarSignIcon,
    },
    {
      title: "Tax Revenue",
      value: "₹2,847,788.89 Cr",
      change: "+10.96%",
      trend: "up",
      icon: CreditCardIcon,
    },
    {
      title: "Non-Tax Revenue",
      value: "₹987,479.63 Cr",
      change: "+7.42%",
      trend: "up",
      icon: BarChart3Icon,
    },
    {
      title: "Fiscal Deficit",
      value: "₹524,433.89 Cr",
      change: "-14.13%",
      trend: "down",
      icon: TrendingUpIcon,
    },
  ]

  // Revenue data for charts
  const revenueData = [
    { category: "Tax Revenue", value: 2847788.89, color: "#4f46e5" },
    { category: "Non-Tax Revenue", value: 987479.63, color: "#8b5cf6" },
  ]

  // Tax revenue breakdown
  const taxRevenueData = [
    { category: "GST", value: 1183355.0, color: "#4f46e5" },
    { category: "Income & Expenditure Tax", value: 2442000.0, color: "#8b5cf6" },
    { category: "Property & Capital Transaction Tax", value: 78000.0, color: "#a78bfa" },
    { category: "Other Commodity & Service Tax", value: 562100.0, color: "#c4b5fd" },
    { category: "UT Taxes", value: 4778.0, color: "#ddd6fe" },
  ]

  // Expenditure data
  const expenditureData = [
    { category: "General Services", value: 2182279.64, color: "#ef4444" },
    { category: "Social Services", value: 198580.18, color: "#f97316" },
    { category: "Economic Services", value: 1235614.85, color: "#eab308" },
    { category: "Grants-in-Aid", value: 726567.55, color: "#84cc16" },
    { category: "UT Expenditure", value: 16660.19, color: "#14b8a6" },
  ]

  // Trend data for multiple years
  const trendData = [
    {
      year: "2023-2024",
      revenue: 3088174.64,
      expenditure: 3854082.21,
      deficit: 765907.57,
    },
    {
      year: "2024-2025 (BE)",
      revenue: 3504334.53,
      expenditure: 4085175.38,
      deficit: 580840.85,
    },
    {
      year: "2024-2025 (RE)",
      revenue: 3485869.29,
      expenditure: 4096607.07,
      deficit: 610737.78,
    },
    {
      year: "2025-2026 (BE)",
      revenue: 3835268.52,
      expenditure: 4359702.41,
      deficit: 524433.89,
    },
  ]

  // Capital expenditure data
  const capitalExpenditureData = [
    { category: "General Services", value: 209088.88, color: "#06b6d4" },
    { category: "Social Services", value: 11186.3, color: "#0ea5e9" },
    { category: "Economic Services", value: 731222.48, color: "#3b82f6" },
    { category: "UT Expenditure", value: 4747.65, color: "#6366f1" },
  ]

  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-50">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-white px-6">
        <h1 className="text-xl font-semibold">Government of India Budget Dashboard</h1>
        <div className="ml-auto flex items-center gap-4">
          <Tabs defaultValue="2025-2026" onValueChange={setFiscalYear}>
            <TabsList>
              <TabsTrigger value="2023-2024">2023-2024</TabsTrigger>
              <TabsTrigger value="2024-2025">2024-2025</TabsTrigger>
              <TabsTrigger value="2025-2026">2025-2026</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </header>
      <main className="flex-1 p-6 md:p-8">
        <div className="grid gap-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {summaryData.map((item, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                  <item.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{item.value}</div>
                  <p
                    className={`flex items-center text-xs ${item.trend === "up" ? "text-emerald-500" : "text-rose-500"}`}
                  >
                    {item.trend === "up" ? (
                      <ArrowUpIcon className="mr-1 h-4 w-4" />
                    ) : (
                      <ArrowDownIcon className="mr-1 h-4 w-4" />
                    )}
                    {item.change} from previous year
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Revenue Composition</CardTitle>
                <CardDescription>Breakdown of revenue sources for {fiscalYear}</CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={revenueData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ category, percent }) => `${category}: ${(percent * 100).toFixed(1)}%`}
                        labelLine={false}
                      >
                        {revenueData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`₹${Number(value).toLocaleString()} Cr`, "Value"]}
                        contentStyle={{ backgroundColor: "white", borderRadius: "8px", border: "1px solid #e2e8f0" }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Tax Revenue Breakdown</CardTitle>
                <CardDescription>Major tax revenue sources for {fiscalYear}</CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={taxRevenueData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ category, percent }) => `${category}: ${(percent * 100).toFixed(1)}%`}
                        labelLine={false}
                      >
                        {taxRevenueData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`₹${Number(value).toLocaleString()} Cr`, "Value"]}
                        contentStyle={{ backgroundColor: "white", borderRadius: "8px", border: "1px solid #e2e8f0" }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Expenditure Distribution</CardTitle>
                <CardDescription>Major spending categories for {fiscalYear}</CardDescription>
              </CardHeader>
              <CardContent className="px-2">
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={expenditureData}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        paddingAngle={2}
                        dataKey="value"
                        label={({ category, percent }) => `${category}: ${(percent * 100).toFixed(1)}%`}
                        labelLine={false}
                      >
                        {expenditureData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`₹${Number(value).toLocaleString()} Cr`, "Value"]}
                        contentStyle={{ backgroundColor: "white", borderRadius: "8px", border: "1px solid #e2e8f0" }}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Budget Trends</CardTitle>
                <CardDescription>Revenue, expenditure and deficit trends over years</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    revenue: {
                      label: "Revenue",
                      color: "hsl(var(--chart-1))",
                    },
                    expenditure: {
                      label: "Expenditure",
                      color: "hsl(var(--chart-2))",
                    },
                    deficit: {
                      label: "Deficit",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                  className="aspect-[4/3]"
                >
                  <LineChart
                    data={trendData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 20,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="var(--color-revenue)"
                      strokeWidth={2}
                      activeDot={{ r: 8 }}
                    />
                    <Line type="monotone" dataKey="expenditure" stroke="var(--color-expenditure)" strokeWidth={2} />
                    <Line type="monotone" dataKey="deficit" stroke="var(--color-deficit)" strokeWidth={2} />
                  </LineChart>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Capital Expenditure</CardTitle>
                <CardDescription>Breakdown of capital expenditure for {fiscalYear}</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    value: {
                      label: "Amount (₹ Cr)",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="aspect-[4/3]"
                >
                  <BarChart
                    data={capitalExpenditureData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 60,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" angle={-45} textAnchor="end" height={80} />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="value" fill="var(--color-value)" radius={[4, 4, 0, 0]}>
                      {capitalExpenditureData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-6 md:grid-cols-1">
            <Card>
              <CardHeader>
                <CardTitle>Budget Highlights</CardTitle>
                <CardDescription>Key insights from the {fiscalYear} budget</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <div className="flex flex-col gap-2 rounded-lg border p-4">
                    <div className="flex items-center gap-2">
                      <PieChartIcon className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">Revenue Growth</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Total revenue receipts projected at ₹3,835,268.52 crores, showing a 10.02% increase from the
                      previous year.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 rounded-lg border p-4">
                    <div className="flex items-center gap-2">
                      <PercentIcon className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">Fiscal Deficit</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Fiscal deficit reduced to ₹524,433.89 crores, showing a 14.13% decrease from the previous year's
                      revised estimates.
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 rounded-lg border p-4">
                    <div className="flex items-center gap-2">
                      <TrendingUpIcon className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">Capital Expenditure</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Capital expenditure increased to ₹956,245.31 crores, focusing on infrastructure development and
                      economic growth.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full" size="sm">
                  <HelpCircleIcon className="mr-2 h-4 w-4" />
                  View Detailed Budget Report
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

