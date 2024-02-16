"use client"

import { useEffect } from "react"

import { useGameStore } from "@/stores/game-store"

import { Header } from "@/components/game/board-header"
import { Row } from "@/components/game/row"
import { ColorPicker } from "@/components/game/color-picker"

export function Board() {
  const code = useGameStore((state) => state.code)
  const initializeGame = useGameStore((state) => state.initializeGame)
  const Rows = () => {
    return Array.from({ length: 12 }, (_, i) => <Row key={i} rowIndex={i} />)
  }

  useEffect(() => {
    initializeGame()
  }, [])

  return (
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
  )
}
