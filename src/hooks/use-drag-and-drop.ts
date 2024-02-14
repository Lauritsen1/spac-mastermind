import { useGameStore } from "@/stores/game-store"

import { PEGS } from "@/lib/constants"

export function useDragAndDrop() {
  const currentRow = useGameStore((state) => state.currentRow)
  const setGuess = useGameStore((state) => state.setGuess)

  const handleOnDrag = (event: React.DragEvent<HTMLDivElement>, id: number) => {
    event.dataTransfer?.setData("id", String(id))
  }

  const handleOnDrop = (
    event: React.DragEvent<HTMLDivElement>,
    rowIndex: number
  ) => {
    if (rowIndex !== currentRow) return

    const id = Number(event.dataTransfer?.getData("id"))
    setGuess(id)

    event.currentTarget.classList.add(PEGS[id])
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
