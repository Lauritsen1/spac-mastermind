"use client"

import { useState } from "react"

import { Header } from "@/components/game/board-header"
import { Row } from "@/components/game/row"
import { ColorPicker } from "@/components/game/color-picker"

import { useGameStore } from "@/stores/game-store"

export function Board() {
  const code = useGameStore((state) => state.code)
  const guess = useGameStore((state) => state.guess)
  const clearGuess = useGameStore((state) => state.clearGuess)
  const currentRow = useGameStore((state) => state.currentRow)
  const nextRow = useGameStore((state) => state.nextRow)
  const [rows, setRows] = useState(Array(12).fill([0, 0, 0, 0]))

  const compareCodes = () => {
    const codeStr: string = code.join("")
    const guessStr: string = guess.join("")
    const areEqual: boolean = guessStr === codeStr
    if (guess.length === 4 && areEqual) {
      console.log("You won! 🎉")
      return
    }

    if (guess.length === 4 && !areEqual) {
      console.log("Wrong! 😡")

      const clues: number[] = []
      let codeCopy: (number | null)[] = [...code]
      let guessCopy: (number | null)[] = [...guess]

      for (let i = 0; i < code.length; i++) {
        if (code[i] === guess[i]) {
          clues.push(2)
          codeCopy[i] = guessCopy[i] = null
        }
      }

      for (let i = 0; i < guessCopy.length; i++) {
        if (guessCopy[i] !== null && codeCopy.includes(guessCopy[i])) {
          clues.push(1)
          codeCopy[codeCopy.indexOf(guessCopy[i])] = null
        }
      }

      for (let i = clues.length; i < code.length; i++) {
        clues.push(0)
      }

      setRows((prev) => {
        prev[currentRow] = clues
        return [...prev]
      })

      clearGuess()
      nextRow()
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <Header />
        <div className="flex flex-col-reverse gap-4 max-w-max">
          {rows.map((_, rowIndex) => (
            <Row
              key={rowIndex}
              rowIndex={rowIndex}
              compareCodes={compareCodes}
              row={rows[rowIndex]}
            />
          ))}
        </div>
        <ColorPicker />
      </div>
    </div>
  )
}
