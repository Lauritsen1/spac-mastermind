"use client"

import { useState, useEffect } from "react"

import { useGameStore } from "@/stores/game-store"

import { getHints, checkWin } from "@/lib/game-logic"

import { Header } from "@/components/game/board-header"
import { Row } from "@/components/game/row"
import { ColorPicker } from "@/components/game/color-picker"
import { ResultModal } from "@/components/game/result-modal"

export function Board() {
  const code = useGameStore((state) => state.code)
  const initializeGame = useGameStore((state) => state.initializeGame)
  const currentRow = useGameStore((state) => state.currentRow)
  const rows = useGameStore((state) => state.rows)
  const gameStatus = useGameStore((state) => state.gameStatus)
  const isGameDone = useGameStore((state) => state.isGameDone)
  const updateIsGameDone = useGameStore((state) => state.updateIsGameDone)
  const updateGameStatus = useGameStore((state) => state.updateGameStatus)
  const setHints = useGameStore((state) => state.setHints)

  const [guess, setGuess] = useState<string[]>([])

  const Rows = () => {
    return Array.from({ length: 12 }, (_, i) => <Row key={i} rowIndex={i} />)
  }

  // Initialize the game
  useEffect(() => {
    initializeGame()
  }, [])

  // Update guess when the current row changes
  useEffect(() => {
    setGuess(rows[currentRow])
  }, [currentRow, rows])

  // Update the game when the current row changes
  useEffect(() => {
    const hints = getHints(code, guess)

    if (checkWin(hints)) {
      updateGameStatus("won")
      updateIsGameDone(true)
    } else if (currentRow === 11 && !checkWin(hints)) {
      updateGameStatus("lost")
      updateIsGameDone(true)
    }

    setHints(hints)
  }, [currentRow, guess])

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        {code.map((color, index) => (
          <div
            key={index}
            className="h-12 w-12 rounded-full border border-gray-200"
            style={{ backgroundColor: color }}
          />
        ))}
        <div>
          <Header />
          <div className="flex flex-col-reverse gap-4 max-w-max">
            <Rows />
          </div>
          <ColorPicker />
        </div>
      </div>
      <ResultModal
        gameStatus={gameStatus}
        isGameDone={isGameDone}
        updateIsGameDone={updateIsGameDone}
      />
    </>
  )
}
