import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Toaster } from "@/components/ui/toaster"
import { WalletContextProvider } from "@/components/wallet-provider"
import ChatbotWidget from "@/components/chatbot-widget"
import OracleNotification from "@/components/oracle-notification"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SeedFlow | Solana Microfinance Platform",
  description: "Fund, borrow, and insure microloans on Solana",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <WalletContextProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <ChatbotWidget />
            <OracleNotification />
            <Toaster />
          </WalletContextProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
