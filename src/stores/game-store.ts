import { create } from "zustand"

import { COLORS } from "@/lib/constants"
import { generateCode } from "@/lib/game-logic"

interface GameStore {
  gameStatus: "won" | "lost" | ""
  currentRow: number
  code: string[]
  rows: string[][]
  hints: number[][]
  updateGameStatus: (status: "won" | "lost") => void
  nextRow: () => void
  generateCode: () => void
  updateRow: (colorId: string, slotIndex: number) => void
  setHints: (newHints: number[]) => void
  initializeGame: () => void
}

const initialState = {
  gameStatus: "" as "won" | "lost" | "",
  currentRow: 0,
  code: [],
  rows: Array.from({ length: 12 }, () => new Array(4).fill("")),
  hints: Array.from({ length: 12 }, () => new Array(4).fill(0)),
}

const useGameStore = create<GameStore>((set) => ({
  ...initialState,
  updateGameStatus: (status) => set({ gameStatus: status }),
  nextRow: () => set((state) => ({ currentRow: state.currentRow + 1 })),
  generateCode: () => set({ code: generateCode(COLORS) }),
  updateRow: (colorId: string, slotIndex: number) =>
    set((state) => {
      state.rows[state.currentRow][slotIndex] = colorId
      return { rows: state.rows }
    }),
  setHints: (hints: number[]) =>
    set((state) => {
      state.hints[state.currentRow] = hints
      return state
    }),
  initializeGame: async () => {
    const newCode = await generateCode(COLORS)
    set({
      gameStatus: "" as "won" | "lost" | "",
      currentRow: 0,
      code: newCode,
      rows: Array.from({ length: 12 }, () => new Array(4).fill("")),
      hints: Array.from({ length: 12 }, () => new Array(4).fill(0)),
    })
  },
}))

export { useGameStore }
