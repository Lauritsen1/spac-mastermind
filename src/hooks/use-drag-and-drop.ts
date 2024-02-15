import { useGameStore } from "@/stores/game-store"

export function useDragAndDrop() {
  const currentRow = useGameStore((state) => state.currentRow)
  const updateRow = useGameStore((state) => state.updateRow)

  const handleOnDrag = (event: React.DragEvent<HTMLDivElement>, color: any) => {
    event.dataTransfer?.setData("color", JSON.stringify(color))
  }

  const handleOnDrop = (
    event: React.DragEvent<HTMLDivElement>,
    rowIndex: number,
    slotIndex: number
  ) => {
    if (rowIndex !== currentRow) return

    try {
      const color = JSON.parse(event.dataTransfer?.getData("color") || "{}")
      console.log(color.id, slotIndex)

      updateRow(color.id, slotIndex)
      // event.currentTarget.classList.add(color.class)
    } catch (error) {
      console.error("Error parsing color data:", error)
    }
  }

  const handleDragOver = (
    event: React.DragEvent<HTMLDivElement>,
    rowIndex: number
  ) => {
    if (rowIndex !== currentRow) return
    event.preventDefault()
  }

  return { handleOnDrag, handleOnDrop, handleDragOver }
}
