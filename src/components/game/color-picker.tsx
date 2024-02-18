"use client"

import { COLORS, COLOR_CLASSES } from "@/lib/constants"

export function ColorPicker() {
  return (
    <div className="flex justify-center gap-4 mt-4 pt-4 border-t">
      {COLORS.map((color) => (
        <div key={color} className="rounded-full border-4 h-10 w-10">
          <div
            className={`${COLOR_CLASSES[color]} h-full w-full rounded-full cursor-pointer grid place-items-center text-black`}
            draggable
            onDragStart={(e) => e.dataTransfer.setData("color", color)}
          ></div>
        </div>
      ))}
    </div>
  )
}
