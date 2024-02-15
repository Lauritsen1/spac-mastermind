import { useGameStore } from "@/stores/game-store"

import { Slot } from "@/components/game/slot"
import { CheckButton } from "@/components/game/check-button"
import { Hint } from "@/components/game/hint"

export function Row({ rowIndex }: { rowIndex: number }) {
  const currentRow = useGameStore((state) => state.currentRow)
  const hints = useGameStore((state) => state.hints)

  const Hints = () => {
    return Array.from({ length: 4 }).map((_, i) => (
      <Hint key={i} hint={hints[rowIndex][i]} />
    ))
  }

  const Slots = () => {
    return Array.from({ length: 4 }).map((_, i) => (
      <Slot key={i} rowIndex={rowIndex} />
    ))
  }

  return (
    <div className="flex justify-between items-center gap-8">
      <span className="text-muted-foreground select-none grow">
        {rowIndex + 1}.
      </span>
      <div className="flex gap-4">
        <Slots />
      </div>
      {rowIndex === currentRow ? (
        <div className="flex justify-center grow">
          <CheckButton />
        </div>
      ) : (
        <div className="flex gap-2">
          <Hints />
        </div>
      )}
    </div>
  )
}
