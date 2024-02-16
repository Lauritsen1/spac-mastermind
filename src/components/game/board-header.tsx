import { ThemeToggle } from "@/components/theme-toggle"
import { ResetButton } from "@/components/game/reset-button"

export function Header() {
  return (
    <div className="flex justify-between items-center border-b mb-4 pb-4">
      <h2 className="font-bold text-3xl">Mastermind</h2>
      <div className="space-x-2">
        <ResetButton />
        <ThemeToggle />
      </div>
    </div>
  )
}
