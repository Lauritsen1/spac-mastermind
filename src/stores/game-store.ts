import { create } from "zustand"

import { COLORS } from "@/lib/constants"

interface GameStore {
  code: string[]
  generateCode: () => void

  guess: string[]

  setGuess: (id: string) => void
  clearGuess: () => void

  hints: number[][]
  setHints: (newHints: number[]) => void

  currentRow: number
  nextRow: () => void
}

function generateCode() {
  const code = []
  for (let i = 0; i < 4; i++) {
    let randomIndex = Math.floor(Math.random() * COLORS.length)
    code.push(COLORS[randomIndex].id)
  }
  return code
}

const useGameStore = create<GameStore>((set) => ({
  code: [],
  generateCode: () => set({ code: generateCode() }),

  guess: [],
  setGuess: (id) => set((state) => ({ guess: [...state.guess, id] })),
  clearGuess: () => set({ guess: [] }),

  hints: new Array(12).fill([]),
  setHints: (newHints) =>
    set((state) => ({
      hints: state.hints.map((hint, index) =>
        index === state.currentRow ? newHints : hint
      ),
    })),

  currentRow: 0,
  nextRow: () => set((state) => ({ currentRow: state.currentRow + 1 })),
}))

export { useGameStore }
