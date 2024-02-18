import { useState } from "react"

import { ThemeToggle } from "@/components/theme-toggle"
import { NewGameButton } from "@/components/game/new-game-button"
import { Code } from "@/components/game/code"

import { Button } from "@/components/ui/button"

import { Eye, EyeOff } from "lucide-react"

export function GameBoardHeader() {
  const [showCode, setShowCode] = useState(false)

  return (
    <div className="flex justify-between items-center border-b mb-4 pb-4">
      {!showCode ? (
        <h2 className="font-bold text-3xl">Mastermind</h2>
      ) : (
        <Code />
      )}
      <div className="space-x-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowCode(!showCode)}
        >
          {showCode ? (
            <Eye className="h-4 w-4" />
          ) : (
            <EyeOff className="h-4 w-4" />
          )}
        </Button>
        <NewGameButton />
        <ThemeToggle />
      </div>
    </div>
  )
}
