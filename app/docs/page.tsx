"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, FileText, Code, BookOpen } from "lucide-react"

export default function DocsPage() {
  const [activeTab, setActiveTab] = useState("guides")

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-2">Documentation</h1>
      <p className="text-muted-foreground mb-8">
        Learn how to use the SeedFlow platform and integrate with our Solana smart contracts
      </p>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
        <TabsList className="grid grid-cols-3 mb-8">
          <TabsTrigger value="guides">User Guides</TabsTrigger>
          <TabsTrigger value="technical">Technical Docs</TabsTrigger>
          <TabsTrigger value="faq">FAQ</TabsTrigger>
        </TabsList>

        <TabsContent value="guides" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  <span>Borrower Guide</span>
                </CardTitle>
                <CardDescription>How to request and manage loans</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  <li className="text-sm">• Creating a loan request</li>
                  <li className="text-sm">• Choosing insurance options</li>
                  <li className="text-sm">• Repayment process</li>
                  <li className="text-sm">• Building reputation</li>
                </ul>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="#">
                    Read Guide
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  <span>Lender Guide</span>
                </CardTitle>
                <CardDescription>How to fund loans and earn returns</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  <li className="text-sm">• Browsing the marketplace</li>
                  <li className="text-sm">• Funding process</li>
                  <li className="text-sm">• Managing your portfolio</li>
                  <li className="text-sm">• Claiming $SEED rewards</li>
                </ul>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="#">
                    Read Guide
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  <span>Insurance Guide</span>
                </CardTitle>
                <CardDescription>Understanding parametric insurance</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mb-4">
                  <li className="text-sm">• How oracle triggers work</li>
                  <li className="text-sm">• Coverage options</li>
                  <li className="text-sm">• Claim process</li>
                  <li className="text-sm">• Historical data</li>
                </ul>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="#">
                    Read Guide
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>Quick start guide for new users</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Set up a Solana wallet</h3>
                    <p className="text-sm text-muted-foreground">
                      Download and install Phantom, Solflare, or Backpack wallet. Create a new wallet and securely store
                      your recovery phrase.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Connect your wallet</h3>
                    <p className="text-sm text-muted-foreground">
                      Click "Connect Wallet" in the top right corner of the SeedFlow platform and select your wallet
                      provider.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Fund your wallet</h3>
                    <p className="text-sm text-muted-foreground">
                      Transfer SOL to your wallet address. For testing on devnet, use the Solana faucet to get free test
                      SOL.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0">
                    4
                  </div>
                  <div>
                    <h3 className="font-medium mb-1">Start using SeedFlow</h3>
                    <p className="text-sm text-muted-foreground">
                      Browse the marketplace to fund loans or create a loan request if you're a borrower.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="technical" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  <span>Smart Contracts</span>
                </CardTitle>
                <CardDescription>Solana program documentation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-1">LoanPool Program</h3>
                    <p className="text-sm text-muted-foreground mb-2">Manages loan creation, funding, and repayments</p>
                    <div className="flex gap-2">
                      <Badge variant="outline">Anchor</Badge>
                      <Badge variant="outline">Solana</Badge>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-1">CoverPool Program</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Handles insurance coverage and oracle-triggered payouts
                    </p>
                    <div className="flex gap-2">
                      <Badge variant="outline">Anchor</Badge>
                      <Badge variant="outline">Pyth</Badge>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-1">$SEED Token</h3>
                    <p className="text-sm text-muted-foreground mb-2">Platform governance and rewards token</p>
                    <div className="flex gap-2">
                      <Badge variant="outline">SPL Token</Badge>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full" asChild>
                    <Link href="https://github.com" target="_blank">
                      View on GitHub
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  <span>API Reference</span>
                </CardTitle>
                <CardDescription>Integration endpoints and SDKs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-1">JavaScript SDK</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      Client library for interacting with SeedFlow contracts
                    </p>
                    <div className="flex gap-2">
                      <Badge variant="outline">TypeScript</Badge>
                      <Badge variant="outline">npm</Badge>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-1">GraphQL API</h3>
                    <p className="text-sm text-muted-foreground mb-2">Query indexed loan and insurance data</p>
                    <div className="flex gap-2">
                      <Badge variant="outline">GraphQL</Badge>
                      <Badge variant="outline">REST</Badge>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium mb-1">Oracle Feeds</h3>
                    <p className="text-sm text-muted-foreground mb-2">Access Pyth and Switchboard data feeds</p>
                    <div className="flex gap-2">
                      <Badge variant="outline">Pyth</Badge>
                      <Badge variant="outline">Switchboard</Badge>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full" asChild>
                    <Link href="#">
                      View API Docs
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Code Examples</CardTitle>
              <CardDescription>Sample code for common operations</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="create-loan">
                <TabsList className="mb-4">
                  <TabsTrigger value="create-loan">Create Loan</TabsTrigger>
                  <TabsTrigger value="fund-loan">Fund Loan</TabsTrigger>
                  <TabsTrigger value="oracle">Oracle Events</TabsTrigger>
                </TabsList>

                <TabsContent value="create-loan">
                  <div className="bg-muted rounded-md p-4 overflow-x-auto">
                    <pre className="text-sm">
                      <code>{`import { Connection, PublicKey } from '@solana/web3.js';
import { Program } from '@project-serum/anchor';
import { LoanPool } from '@seedflow/sdk';

// Initialize connection and program
const connection = new Connection('https://api.devnet.solana.com');
const program = new Program(LoanPool, new PublicKey('Loan111111111111111111111111111111111111111'));

// Create a new loan
async function createLoan() {
  const amount = 100; // In USD
  const term = 6; // In months
  const apr = 10; // Interest rate
  const insurance = ['drought']; // Insurance types
  
  const tx = await program.methods
    .createLoan(amount, term, apr, insurance)
    .accounts({
      borrower: wallet.publicKey,
      loanAccount: loanKeypair.publicKey,
      systemProgram: SystemProgram.programId,
    })
    .signers([loanKeypair])
    .rpc();
    
  console.log('Loan created with ID:', loanKeypair.publicKey.toString());
  console.log('Transaction:', tx);
}`}</code>
                    </pre>
                  </div>
                </TabsContent>

                <TabsContent value="fund-loan">
                  <div className="bg-muted rounded-md p-4 overflow-x-auto">
                    <pre className="text-sm">
                      <code>{`import { Connection, PublicKey } from '@solana/web3.js';
import { Program } from '@project-serum/anchor';
import { LoanPool } from '@seedflow/sdk';

// Initialize connection and program
const connection = new Connection('https://api.devnet.solana.com');
const program = new Program(LoanPool, new PublicKey('Loan111111111111111111111111111111111111111'));

// Fund an existing loan
async function fundLoan() {
  const loanId = new PublicKey('8xDrJGHjTe5YzcZy3LNgYkQQkxL3XQxKveRFiVcY1wgF');
  const amount = 50; // Amount to fund in USD
  
  const tx = await program.methods
    .fundLoan(amount)
    .accounts({
      lender: wallet.publicKey,
      loanAccount: loanId,
      systemProgram: SystemProgram.programId,
    })
    .rpc();
    
  console.log('Loan funded successfully');
  console.log('Transaction:', tx);
}`}</code>
                    </pre>
                  </div>
                </TabsContent>

                <TabsContent value="oracle">
                  <div className="bg-muted rounded-md p-4 overflow-x-auto">
                    <pre className="text-sm">
                      <code>{`import { Connection, PublicKey } from '@solana/web3.js';
import { Program } from '@project-serum/anchor';
import { CoverPool } from '@seedflow/sdk';
import { getPythPriceData } from '@pythnetwork/client';

// Initialize connection and program
const connection = new Connection('https://api.devnet.solana.com');
const program = new Program(CoverPool, new PublicKey('Cover11111111111111111111111111111111111111'));

// Listen for oracle updates and trigger insurance payouts
async function monitorOracleEvents() {
  // Weather data feed for Kenya (example)
  const weatherFeedId = new PublicKey('WeatherKE111111111111111111111111111111111');
  
  // Subscribe to oracle updates
  connection.onAccountChange(weatherFeedId, async (accountInfo) => {
    const weatherData = getPythPriceData(accountInfo.data);
    
    // Check if drought condition is met (rainfall below threshold)
    if (weatherData.price < 40) {
      console.log('Drought condition detected, triggering insurance payout');
      
      // Trigger insurance payout for affected loans
      const tx = await program.methods
        .triggerInsurancePayout('drought', weatherFeedId)
        .accounts({
          authority: wallet.publicKey,
          coverPool: coverPoolId,
          pythOracle: weatherFeedId,
        })
        .rpc();
        
      console.log('Insurance payout triggered');
      console.log('Transaction:', tx);
    }
  });
}`}</code>
                    </pre>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faq" className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                <span>Frequently Asked Questions</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How does the loan funding process work?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground">
                      When a borrower creates a loan request, it appears on the marketplace. Lenders can browse and fund
                      loans partially or fully. Once a loan is 100% funded, the funds are transferred to the borrower's
                      wallet. Repayments are made according to the loan schedule, and lenders can claim their principal
                      plus interest as payments are made.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-2">
                  <AccordionTrigger>What is parametric insurance and how does it work?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground">
                      Parametric insurance provides automatic payouts based on predefined triggers measured by oracles,
                      without requiring claims processing. For example, drought insurance triggers when rainfall data
                      from Pyth oracles shows levels below 40% of the seasonal average for 30 consecutive days. When
                      triggered, the smart contract automatically releases funds to affected borrowers, helping them
                      maintain repayments despite climate challenges.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-3">
                  <AccordionTrigger>What are $SEED tokens and how do I earn them?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground">
                      $SEED is the platform's governance and rewards token. Lenders earn $SEED tokens proportional to
                      their funding activity and loan duration. Borrowers earn $SEED for on-time repayments. Tokens can
                      be staked for additional APR boosts on loans, used for governance voting, or traded on supported
                      exchanges. You can claim your earned $SEED tokens from the Portfolio page.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-4">
                  <AccordionTrigger>How are loan interest rates determined?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground">
                      Interest rates are initially suggested by our AI credit-scoring service based on the borrower's
                      history, loan amount, term, and sector. The system assigns a risk tier (A-D) with corresponding
                      APR ranges. Borrowers can choose to lower the suggested APR to attract more lenders, but cannot
                      raise it above the suggested maximum. Insurance options add a premium to the total cost but
                      provide protection against climate events.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-5">
                  <AccordionTrigger>Is SeedFlow available on mainnet?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground">
                      SeedFlow is currently running on Solana devnet for testing and development. We plan to launch on
                      mainnet after completing security audits and regulatory compliance. During the devnet phase, you
                      can use test SOL from the Solana faucet to explore the platform's features. We'll announce the
                      mainnet launch date on our social media channels and via email to registered users.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="item-6">
                  <AccordionTrigger>How do I connect my wallet to SeedFlow?</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground">
                      SeedFlow supports Phantom, Solflare, and Backpack wallets. To connect, click the "Connect Wallet"
                      button in the top right corner of the website and select your preferred wallet. Make sure you have
                      the wallet extension installed in your browser or the mobile app installed on your device. For the
                      best experience, we recommend using Phantom wallet with the latest version.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>

          <div className="bg-muted rounded-lg p-6 text-center">
            <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
            <p className="text-muted-foreground mb-4">
              Our support team is ready to help you with any questions or issues.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link href="https://discord.com" target="_blank">
                  Join Discord Community
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="mailto:support@seedflow.xyz">Email Support</Link>
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
