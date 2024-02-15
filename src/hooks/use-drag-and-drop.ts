import { useGameStore } from "@/stores/game-store"

export function useDragAndDrop() {
  const currentRow = useGameStore((state) => state.currentRow)
  const setGuess = useGameStore((state) => state.setGuess)

  const handleOnDrag = (event: React.DragEvent<HTMLDivElement>, color: any) => {
    event.dataTransfer?.setData("color", JSON.stringify(color))
  }

  const handleOnDrop = (
    event: React.DragEvent<HTMLDivElement>,
    rowIndex: number
  ) => {
    if (rowIndex !== currentRow) return

    try {
      const color = JSON.parse(event.dataTransfer?.getData("color") || "{}")
      setGuess(color.id)
      event.currentTarget.classList.add(color.class)
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
