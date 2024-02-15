import { ThemeToggle } from "@/components/theme-toggle"

import { Button } from "@/components/ui/button"

import { RotateCcw } from "lucide-react"

export function Header() {
  return (
    <div className="flex justify-between items-center border-b mb-4 pb-4">
      <h2 className="font-bold text-3xl">Mastermind</h2>
      <div className="space-x-2">
        <Button size="icon" variant="ghost">
          <RotateCcw className="h-4 w-4" />
        </Button>
        <ThemeToggle />
      </div>
    </div>
  )
}
