import { memo } from "react"

import { useStore } from "@/stores/store"

export const Hints = memo(function Hints({ row }: { row: number }) {
  const currentHints = useStore((state) => state.hints[row])

  return (
    <div className="flex gap-2">
      {currentHints.map((hint, i) => (
        <div
          key={i}
          className={`rounded-full border-2 h-4 w-4 ${
            hint === 2 ? "bg-green-500" : hint === 1 ? "bg-orange-500" : ""
          }`}
        ></div>
      ))}
    </div>
  )
})
