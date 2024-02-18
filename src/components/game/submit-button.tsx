"use client"

import { useStore } from "@/stores/store"

import { Button } from "@/components/ui/button"

export function SubmitButton() {
  const row = useStore((state) => state.rows[state.currentRow])
  const updateHints = useStore((state) => state.updateHints)
  const checkGameState = useStore((state) => state.checkGameState)
  const nextRow = useStore((state) => state.nextRow)

  const handleClick = () => {
    updateHints()
    checkGameState()
    nextRow()
  }

  return (
    <Button
      className="rounded-3xl"
      variant="outline"
      onClick={handleClick}
      disabled={row.includes("")}
    >
      Check
    </Button>
  )
}
