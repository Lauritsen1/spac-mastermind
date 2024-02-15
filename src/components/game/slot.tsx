import { useDragAndDrop } from "@/hooks/use-drag-and-drop"

export function Slot({ rowIndex }: { rowIndex: number }) {
  const { handleOnDrop, handleDragOver } = useDragAndDrop()

  return (
    <div
      className="rounded-full border-4 h-10 w-10 grid place-items-center"
      onDrop={(e) => handleOnDrop(e, rowIndex)}
      onDragOver={(e) => handleDragOver(e, rowIndex)}
    >
      <span className="h-2 w-2 rounded-full"></span>
    </div>
  )
}
