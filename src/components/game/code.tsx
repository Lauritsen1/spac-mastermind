import { useStore } from "@/stores/store"

import { COLOR_CLASSES } from "@/lib/constants"

export function Code() {
  const code = useStore((state) => state.code)

  return (
    <div className="flex gap-2">
      {code.map((color, i) => (
        <div
          key={i}
          className={`${COLOR_CLASSES[color]} rounded-full border-2 h-10 w-10`}
        >
          <span className="h-2 w-2 rounded-full"></span>
        </div>
      ))}
    </div>
  )
}
