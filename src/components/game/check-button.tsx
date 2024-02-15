import { Button } from "@/components/ui/button"

import { useGameStore } from "@/stores/game-store"

export function CheckButton() {
  const code = useGameStore((state) => state.code)

  const guess = useGameStore((state) => state.guess)
  const clearGuess = useGameStore((state) => state.clearGuess)

  const currentRow = useGameStore((state) => state.currentRow)
  const nextRow = useGameStore((state) => state.nextRow)

  const setHints = useGameStore((state) => state.setHints)

  const getHints = (code: string[], guess: string[]) => {
    let codeSet = new Set(code)
    let guessSet = new Set(guess)
    const hints: number[] = []

    for (let i = code.length - 1; i >= 0; i--) {
      if (code[i] === guess[i]) {
        hints.push(2)
        codeSet.delete(code[i])
        guessSet.delete(guess[i])
      }
    }

    codeSet.forEach((color) => {
      if (guessSet.has(color)) {
        hints.push(1)
        guessSet.delete(color)
      }
    })

    return new Array(4).fill(0).map((_, i) => hints[i] || 0)
  }

  const checkWin = (hints: number[]) => {
    return hints.every((hint) => hint === 2)
  }

  const handleClick = () => {
    const hints = getHints(code, guess)

    if (checkWin(hints)) {
      console.log("You won!")
    } else if (currentRow === 11) {
      console.log("You lost!")
    }

    setHints(hints)
    clearGuess()
    nextRow()
  }

  return (
    <Button className="rounded-3xl" variant="outline" onClick={handleClick}>
      Check
    </Button>
  )
}
