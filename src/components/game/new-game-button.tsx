"use client"

import { RotateCcw } from "lucide-react"

import { useStore } from "@/stores/store"

import { Button } from "@/components/ui/button"

export function NewGameButton() {
  const newGame = useStore((state) => state.newGame)

  return (
    <Button size="icon" variant="ghost" onClick={newGame}>
      <RotateCcw className="h-4 w-4" />
    </Button>
  )
}
