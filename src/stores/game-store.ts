import { create } from "zustand"

import { COLORS } from "@/lib/constants"

interface GameStore {
  code: string[]
  guess: string[]
  currentRow: number
  generateCode: () => void
  setGuess: (id: string) => void
  clearGuess: () => void
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
  guess: [],
  currentRow: 0,
  generateCode: () => set({ code: generateCode() }),
  setGuess: (id) => set((state) => ({ guess: [...state.guess, id] })),
  clearGuess: () => set({ guess: [] }),
  nextRow: () => set((state) => ({ currentRow: state.currentRow + 1 })),
}))

export { useGameStore }
