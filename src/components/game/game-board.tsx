"use client"

import { useStore } from "@/stores/store"

import { GameBoardHeader } from "@/components/game/game-board-header"
import { Row } from "@/components/game/row"
import { SubmitButton } from "@/components/game/submit-button"
import { Hints } from "@/components/game/hints"
import { ColorPicker } from "@/components/game/color-picker"
import { GameResultModal } from "@/components/game/game-result-modal"

export function GameBoard() {
  const rows = useStore((state) => state.rows)
  const gameState = useStore((state) => state.gameState)
  const currentRow = useStore((state) => state.currentRow)

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div>
          <GameBoardHeader />
          <div className="flex flex-col-reverse gap-4">
            {rows.map((row, i) => (
              <div key={i} className="flex justify-between items-center gap-8">
                <span className="text-muted-foreground select-none grow">
                  {i + 1}.
                </span>
                <Row row={row} rowIndex={i} />
                {i === currentRow && gameState === "ONGOING" ? (
                  <div className="flex justify-center grow">
                    <SubmitButton />
                  </div>
                ) : (
                  <Hints row={i} />
                )}
              </div>
            ))}
          </div>
          <ColorPicker />
        </div>
      </div>
      <GameResultModal />
    </>
  )
}
