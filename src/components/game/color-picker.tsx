import { COLORS } from "@/lib/constants"

import { useDragAndDrop } from "@/hooks/use-drag-and-drop"

export function ColorPicker() {
  const { handleOnDrag } = useDragAndDrop()

  return (
    <div className="flex justify-center gap-4 mt-4 pt-4 border-t">
      {COLORS.map((color) => (
        <div key={color.id} className="rounded-full border-4 h-10 w-10">
          <div
            className={`${color.class} h-full w-full rounded-full cursor-pointer grid place-items-center text-black`}
            draggable
            onDragStart={(e) => handleOnDrag(e, color)}
          ></div>
        </div>
      ))}
    </div>
  )
}
