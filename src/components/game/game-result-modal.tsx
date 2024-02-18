"use client"

import { useState, useEffect } from "react"

import { useStore } from "@/stores/store"

import { GameState } from "@/lib/types"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export function GameResultModal() {
  const [open, setOpen] = useState(false)
  const [result, setResult] = useState<GameState>(GameState.Ongoing)
  const gameState = useStore((state) => state.gameState)
  const newGame = useStore((state) => state.newGame)

  useEffect(() => {
    if (gameState !== GameState.Ongoing) {
      setResult(gameState)
      setOpen(true)
    }
  }, [gameState])

  const handleOnAnimationEnd = () => {
    if (!open) {
      newGame()
      setResult(GameState.Ongoing)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent onAnimationEnd={handleOnAnimationEnd}>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center p-8 text-3xl">
            {result === "WIN" ? "You won! 🎉" : "You lost! 😡"}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={newGame}>Play Again</AlertDialogAction>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
