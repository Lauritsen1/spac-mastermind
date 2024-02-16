import { useEffect } from "react"

import { useGameStore } from "@/stores/game-store"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface ResultModalProps {
  isGameDone: boolean
  gameStatus: string
  updateIsGameDone: (isGameDone: boolean) => void
}

export function ResultModal({
  isGameDone,
  gameStatus,
  updateIsGameDone,
}: ResultModalProps) {
  // const isGameDone = useGameStore((state) => state.isGameDone)
  // const gameStatus = useGameStore((state) => state.gameStatus)
  // const updateIsGameDone = useGameStore((state) => state.updateIsGameDone)
  const initializeGame = useGameStore((state) => state.initializeGame)
  // const currentRow = useGameStore((state) => state.currentRow)

  // useEffect(() => {
  //   console.log(isGameDone)
  // }, [currentRow])

  return (
    <AlertDialog open={isGameDone} onOpenChange={updateIsGameDone}>
      <AlertDialogContent>
        <AlertDialogHeader className="">
          <AlertDialogTitle className="text-center p-8 text-3xl">
            {gameStatus === "won" ? "You won! 🎉" : "You lost! 😡"}
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
          <AlertDialogAction onClick={initializeGame}>
            Play again
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
