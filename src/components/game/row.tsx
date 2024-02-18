"use client"

import { memo } from "react"

import { useStore } from "@/stores/store"

import { COLOR_CLASSES } from "@/lib/constants"

export const Row = memo(function Row({
  row,
  rowIndex,
}: {
  row: string[]
  rowIndex: number
}) {
  const currentRow = useStore((state) => state.currentRow)
  const updateRow = useStore((state) => state.updateRow)

  const handleOnDrop = (e: React.DragEvent<HTMLDivElement>, slot: number) => {
    if (rowIndex !== currentRow) return
    const newColor = e.dataTransfer.getData("color")
    updateRow(newColor, slot)
  }

  const handleOnDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    if (rowIndex !== currentRow) return
    e.preventDefault()
  }

  return (
    <div className="flex gap-4">
      {row.map((color, i) => (
        <div
          key={i}
          className={`${COLOR_CLASSES[color]} rounded-full border-4 h-10 w-10`}
          onDrop={(e) => handleOnDrop(e, i)}
          onDragOver={handleOnDragOver}
        ></div>
      ))}
    </div>
  )
})
