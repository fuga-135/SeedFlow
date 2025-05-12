"use client"

import Link from "next/link"
import { Github, Twitter, DiscIcon as Discord } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

export default function Footer() {
  const { setTheme } = useTheme()

  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Link href="/terms" className="text-xs text-muted-foreground underline-offset-4 hover:underline">
            Terms
          </Link>
          <div className="hidden md:block text-muted-foreground">•</div>
          <Link href="/privacy" className="text-xs text-muted-foreground underline-offset-4 hover:underline">
            Privacy
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link href="https://github.com" target="_blank" rel="noreferrer">
            <Github className="h-4 w-4 text-muted-foreground hover:text-foreground" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link href="https://twitter.com" target="_blank" rel="noreferrer">
            <Twitter className="h-4 w-4 text-muted-foreground hover:text-foreground" />
            <span className="sr-only">Twitter</span>
          </Link>
          <Link href="https://discord.com" target="_blank" rel="noreferrer">
            <Discord className="h-4 w-4 text-muted-foreground hover:text-foreground" />
            <span className="sr-only">Discord</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 w-8 px-0">
                <span className="sr-only">Language</span>
                <span className="text-xs">EN</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>English</DropdownMenuItem>
              <DropdownMenuItem>Swahili</DropdownMenuItem>
              <DropdownMenuItem>Khmer</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 w-8 px-0">
                <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </footer>
  )
}
