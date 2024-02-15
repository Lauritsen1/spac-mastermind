"use client"

import { useEffect } from "react"

import { useGameStore } from "@/stores/game-store"

import { Header } from "@/components/game/board-header"
import { Row } from "@/components/game/row"
import { ColorPicker } from "@/components/game/color-picker"

export function Board() {
  const generateCode = useGameStore((state) => state.generateCode)

  useEffect(() => {
    generateCode()
  }, [])

  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <Header />
        <div className="flex flex-col-reverse gap-4 max-w-max">
          {Array(12)
            .fill(null)
            .map((_, rowIndex) => (
              <Row key={rowIndex} rowIndex={rowIndex} />
            ))}
        </div>
        <ColorPicker />
      </div>
    </div>
  )
}
