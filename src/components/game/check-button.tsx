import { useGameStore } from "@/stores/game-store"

import { Button } from "@/components/ui/button"

export function CheckButton() {
  const nextRow = useGameStore((state) => state.nextRow)

  const handleClick = () => {
    nextRow()
  }

  return (
    <Button className="rounded-3xl" variant="outline" onClick={handleClick}>
      Check
    </Button>
  )
}
