"use client"
import { useState, useEffect } from "react"

import { GameBoard } from "@/components/game/game-board"

export default function Page() {
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    setIsHydrated(true)
  }, [])

  return <main>{isHydrated && <GameBoard />}</main>
}
