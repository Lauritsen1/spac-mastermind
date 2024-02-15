"use client"

import { useState, useEffect } from "react"

import { Header } from "@/components/game/board-header"
import { Row } from "@/components/game/row"
import { ColorPicker } from "@/components/game/color-picker"

import { useGameStore } from "@/stores/game-store"

export function Board() {
  const code = useGameStore((state) => state.code)
  const generateCode = useGameStore((state) => state.generateCode)
  const guess = useGameStore((state) => state.guess)
  const clearGuess = useGameStore((state) => state.clearGuess)
  const currentRow = useGameStore((state) => state.currentRow)
  const nextRow = useGameStore((state) => state.nextRow)
  const [rows, setRows] = useState(
    Array.from({ length: 12 }, () => new Array(4).fill(0))
  )

  const checkWin = (hints: number[]) => {
    return hints.every((hint) => hint === 2)
  }

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

  const compareCodes = () => {
    const hints = getHints(code, guess)
    console.log(hints)

    setRows((prev) => {
      const newRows = [...prev]
      newRows[currentRow] = hints
      return newRows
    })

    if (checkWin(hints)) {
      console.log("You won!")
      // Here you can handle the win case, for example by showing a message to the user
    } else if (currentRow === 11) {
      console.log("You lost!")
      // Here you can handle the lose case, for example by showing a message to the user
    }

    clearGuess()
    nextRow()
  }

  useEffect(() => {
    generateCode()
  }, [])

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
