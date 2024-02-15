import { Hints } from "@/components/game/hints"

import { Button } from "@/components/ui/button"

import { useDragAndDrop } from "@/hooks/use-drag-and-drop"

import { useGameStore } from "@/stores/game-store"

import { COLORS } from "@/lib/constants"

interface RowProps {
  rowIndex: number
  compareCodes: () => void
  row: number[]
}

export function Row({ rowIndex, compareCodes, row }: RowProps) {
  const code = useGameStore((state) => state.code)
  const currentRow = useGameStore((state) => state.currentRow)
  const { handleOnDrop, handleDragOver } = useDragAndDrop()

  return (
    <div className="flex justify-between items-center gap-8">
      <span className="text-muted-foreground select-none grow">
        {rowIndex + 1}.
      </span>
      <div className="flex gap-4">
        {code.map((color, slotIndex) => {
          const colorObject = COLORS.find((c) => c.id === color)
          return (
            <div
              key={slotIndex}
              className="rounded-full border-4 h-10 w-10 grid place-items-center"
              onDrop={(e) => handleOnDrop(e, rowIndex)}
              onDragOver={(e) => handleDragOver(e, rowIndex)}
            >
              <span
                className={`${colorObject?.class} h-2 w-2 rounded-full`}
              ></span>
            </div>
          )
        })}
      </div>
      {rowIndex === currentRow ? (
        <div className="flex justify-center grow">
          <Button
            className="rounded-3xl"
            variant="outline"
            onClick={compareCodes}
          >
            Check
          </Button>
        </div>
      ) : (
        <Hints row={row} />
      )}
    </div>
  )
}
