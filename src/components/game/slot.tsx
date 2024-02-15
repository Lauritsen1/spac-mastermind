import { useGameStore } from "@/stores/game-store"

import { COLORS } from "@/lib/constants"

export function Slot({
  rowIndex,
  slotIndex,
}: {
  rowIndex: number
  slotIndex: number
}) {
  const currentRow = useGameStore((state) => state.currentRow)
  const colorId = useGameStore((state) => state.rows[rowIndex][slotIndex])
  const updateRow = useGameStore((state) => state.updateRow)

  const colorClass = COLORS.find((color) => color.id === colorId)?.class || ""

  const handleOnDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const handleOnDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()

    if (rowIndex !== currentRow) return

    try {
      const color = JSON.parse(event.dataTransfer?.getData("color") || "{}")
      updateRow(color.id, slotIndex)
    } catch (error) {
      console.error("Error parsing color data:", error)
    }
  }

  return (
    <div
      className={`${colorClass} rounded-full border-4 h-10 w-10 grid place-items-center`}
      onDrop={handleOnDrop}
      onDragOver={handleOnDragOver}
    >
      <span className="h-2 w-2 rounded-full"></span>
    </div>
  )
}
