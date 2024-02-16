import { create } from "zustand"

import { COLORS } from "@/lib/constants"
import { generateCode } from "@/lib/game-logic"

interface GameStore {
  code: string[]
  hints: number[][]
  rows: string[][]
  currentRow: number
  generateCode: () => void
  setHints: (newHints: number[]) => void
  updateRow: (colorId: string, slotIndex: number) => void
  nextRow: () => void
}

const useGameStore = create<GameStore>((set) => ({
  code: [],
  hints: Array.from({ length: 12 }, () => new Array(4).fill(0)),
  rows: Array.from({ length: 12 }, () => new Array(4).fill("")),
  currentRow: 0,
  generateCode: () => set({ code: generateCode(COLORS) }),
  setHints: (hints: number[]) =>
    set((state) => {
      state.hints[state.currentRow] = hints
      return state
    }),
  updateRow: (colorId: string, slotIndex: number) =>
    set((state) => {
      state.rows[state.currentRow][slotIndex] = colorId
      return { rows: state.rows }
    }),
  nextRow: () => set((state) => ({ currentRow: state.currentRow + 1 })),
}))

export { useGameStore }
