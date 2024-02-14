import { create } from "zustand"

import { generateCode } from "@/lib/utils"

interface GameStore {
  code: number[]
  guess: number[]
  currentRow: number
  generateNewCode: () => void
  setGuess: (id: number) => void
  clearGuess: () => void
  nextRow: () => void
}

const useGameStore = create<GameStore>((set) => ({
  code: [],
  guess: [],
  currentRow: 0,
  generateNewCode: async () => set({ code: await generateCode() }),
  setGuess: (id) => set((state) => ({ guess: [...state.guess, id] })),
  clearGuess: () => set({ guess: [] }),
  nextRow: () => set((state) => ({ currentRow: state.currentRow + 1 })),
}))

generateCode().then((code: number[]) => useGameStore.setState({ code }))

export { useGameStore }
