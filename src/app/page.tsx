"use client"

import { useEffect } from "react"

import { Header } from "@/components/header"
import { Row } from "@/components/row"
import { ColorPicker } from "@/components/color-picker"

import { useGameStore } from "@/stores/game-store"

export default function Page() {
  const code = useGameStore((state) => state.code)
  const guess = useGameStore((state) => state.guess)
  const nextRow = useGameStore((state) => state.nextRow)

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
      nextRow()
    }
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <Header />
        <div className="flex flex-col-reverse gap-4 max-w-max">
          {Array(12)
            .fill(null)
            .map((_, rowIndex) => (
              <Row
                key={rowIndex}
                rowIndex={rowIndex}
                compareCodes={compareCodes}
              />
            ))}
        </div>
        <ColorPicker />
      </div>
    </div>
  )
}
