import { useState } from "react"

import { useGameStore } from "@/stores/game-store"

import { getHints } from "@/lib/game-logic"

import { Button } from "@/components/ui/button"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function CheckButton() {
  const code = useGameStore((state) => state.code)
  const rows = useGameStore((state) => state.rows)
  const currentRow = useGameStore((state) => state.currentRow)
  const nextRow = useGameStore((state) => state.nextRow)
  const setHints = useGameStore((state) => state.setHints)

  const [open, setOpen] = useState(false)

  const checkWin = (hints: number[]) => {
    return hints.every((hint) => hint === 2)
  }

  const handleClick = () => {
    const guess = rows[currentRow]
    const hints = getHints(code, guess)

    if (checkWin(hints)) {
      setOpen(true)
    } else if (currentRow === 11) {
      setOpen(true)
    }

    setHints(hints)
    nextRow()
  }

  return (
    <>
      <Button className="rounded-3xl" variant="outline" onClick={handleClick}>
        Check
      </Button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>You Won! 🎉😡</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
            <AlertDialogAction>Play again</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
