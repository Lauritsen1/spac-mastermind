import { create } from "zustand"

import { COLORS } from "@/lib/constants"
import { generateCode } from "@/lib/game-logic"

type gameStatus = "won" | "lost" | "active"

interface GameStore {
  currentGuess: string[]
  isGameDone: boolean
  gameStatus: gameStatus
  currentRow: number
  code: string[]
  rows: string[][]
  hints: number[][]
  updateIsGameDone: (isGameDone: boolean) => void
  updateGameStatus: (status: gameStatus) => void
  nextRow: () => void
  generateCode: () => void
  updateRow: (colorId: string, slotIndex: number) => void
  setHints: (newHints: number[]) => void
  initializeGame: () => void
}

const initialState = {
  currentGuess: [],
  isGameDone: false,
  gameStatus: "active" as gameStatus,
  currentRow: 0,
  code: [],
  rows: Array.from({ length: 12 }, () => new Array(4).fill("")),
  hints: Array.from({ length: 12 }, () => new Array(4).fill(0)),
}

const useGameStore = create<GameStore>((set) => ({
  ...initialState,
  updateCurrentGuess: (colorId: string, slotIndex: number) =>
    set((state) => {
      state.currentGuess[slotIndex] = colorId
      return { currentGuess: state.currentGuess }
    }),
  updateIsGameDone: (isGameDone) => set({ isGameDone }),
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
      isGameDone: false,
      gameStatus: "active" as gameStatus,
      currentRow: 0,
      code: newCode,
      rows: Array.from({ length: 12 }, () => new Array(4).fill("")),
      hints: Array.from({ length: 12 }, () => new Array(4).fill(0)),
    })
  },
}))

export { useGameStore }
