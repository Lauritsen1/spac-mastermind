import { create } from "zustand"

import { COLORS } from "@/lib/constants"
import { generateCode } from "@/lib/utils"

interface GameStore {
  code: string[]
  generateCode: () => void

  hints: number[][]
  setHints: (newHints: number[]) => void

  rows: string[][]
  currentRow: number
  updateRow: (colorId: string, slotIndex: number) => void
  nextRow: () => void
}

const useGameStore = create<GameStore>((set) => ({
  code: [],
  generateCode: () => set({ code: generateCode(COLORS) }),

  hints: new Array(12).fill([]),
  setHints: (newHints) =>
    set((state) => ({
      hints: state.hints.map((hint, index) =>
        index === state.currentRow ? newHints : hint
      ),
    })),

  rows: new Array(12).fill(new Array(4).fill("")),
  currentRow: 0,
  updateRow: (colorId: string, slotIndex: number) =>
    set((state) => {
      const newRows = [...state.rows]
      newRows[state.currentRow] = [
        ...newRows[state.currentRow].slice(0, slotIndex),
        colorId,
        ...newRows[state.currentRow].slice(slotIndex + 1),
      ]
      return { rows: newRows }
    }),
  nextRow: () => set((state) => ({ currentRow: state.currentRow + 1 })),
}))

export { useGameStore }
