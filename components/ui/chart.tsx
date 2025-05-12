import type React from "react"
export const ChartTitle = ({ children }: { children: React.ReactNode }) => {
  return <div className="text-lg font-semibold">{children}</div>
}

export const ChartLegend = () => {
  return <div className="text-sm text-muted-foreground"></div>
}

export const ChartTooltip = () => {
  return null
}

export const ChartContainer = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>
}
