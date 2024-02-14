import { useDragAndDrop } from "@/hooks/use-drag-and-drop"
import { PEGS } from "@/lib/constants"

export function ColorPicker() {
  const { handleOnDrag } = useDragAndDrop()

  return (
    <div className="flex justify-center gap-4 mt-4 pt-4 border-t">
      {PEGS.map((color, i) => (
        <div key={i} className="rounded-full border-4 h-10 w-10">
          <div
            className={`${color} h-full w-full rounded-full cursor-pointer grid place-items-center text-black`}
            draggable
            onDragStart={(e) => handleOnDrag(e, i)}
          >
            {i}
          </div>
        </div>
      ))}
    </div>
  )
}
