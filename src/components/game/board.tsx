"use client"

import { useEffect } from "react"

import { useGameStore } from "@/stores/game-store"

import { Header } from "@/components/game/board-header"
import { Row } from "@/components/game/row"
import { ColorPicker } from "@/components/game/color-picker"

export function Board() {
  const code = useGameStore((state) => state.code)
  const rows = useGameStore((state) => state.rows)
  const generateCode = useGameStore((state) => state.generateCode)

  const Rows = () => {
    return rows.map((_, i) => <Row key={i} rowIndex={i} />)
  }

  useEffect(() => {
    generateCode()
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
