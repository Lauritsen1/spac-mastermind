import { RotateCcw } from "lucide-react"

import { useGameStore } from "@/stores/game-store"

import { Button } from "@/components/ui/button"

export function ResetButton() {
  const initializeGame = useGameStore((state) => state.initializeGame)

  return (
    <Button size="icon" variant="ghost" onClick={initializeGame}>
      <RotateCcw className="h-4 w-4" />
    </Button>
  )
}
