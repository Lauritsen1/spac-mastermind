import { create } from "zustand"

import { GameState } from "@/lib/types"

const COLORS = ["red", "yellow", "green", "blue", "orange", "purple"]
const MAX_ATTEMPTS = 12
const CODE_LENGTH = 4

interface Store {
  gameState: GameState
  currentRow: number
  code: string[]
  rows: string[][]
  hints: number[][]
  showCode: boolean
  updateRow: (color: string, slot: number) => void
  nextRow: () => void
  updateHints: () => void
  checkGameState: () => void
  setShowCode: (showCode: boolean) => void
  newGame: () => void
}

const setInitialState = () => ({
  code: generateCode(COLORS, CODE_LENGTH),
  rows: Array(MAX_ATTEMPTS)
    .fill(null)
    .map(() => Array(CODE_LENGTH).fill("")),
  hints: Array(MAX_ATTEMPTS)
    .fill(null)
    .map(() => Array(CODE_LENGTH).fill(0)),
  gameState: GameState.Ongoing,
  currentRow: 0,
  showCode: false,
})

const useStore = create<Store>((set) => ({
  ...setInitialState(),

  updateRow: (color: string, slot: number) =>
    set((state) => {
      const newrows = state.rows.map((row, index) => {
        if (index !== state.currentRow) return row
        return row.map((c, i) => (i === slot ? color : c))
      })
      return { rows: newrows }
    }),

  nextRow: () =>
    set((state) => ({
      currentRow: state.currentRow + 1,
    })),

  updateHints: () =>
    set((state) => {
      const hint = generateHints(state.code, state.rows[state.currentRow])
      return {
        hints: state.hints.map((h, i) => (i === state.currentRow ? hint : h)),
      }
    }),

  checkGameState: () =>
    set((state) => {
      const isWin = state.hints[state.currentRow].every((hint) => hint === 2)
      if (isWin) {
        return { gameState: GameState.Win }
      }

      if (!isWin && state.currentRow === MAX_ATTEMPTS - 1) {
        return { gameState: GameState.Lose }
      }

      return { gameState: GameState.Ongoing }
    }),

  setShowCode: (showCode) => set((state) => ({ showCode: showCode })),

  newGame: () => set(setInitialState),
}))

function generateCode<T>(arr: T[], len: number): T[] {
  const code = []
  for (let i = 0; i < len; i++) {
    let randomIndex = Math.floor(Math.random() * arr.length)
    code.push(arr[randomIndex])
  }
  return code
}

const generateHints = (code: string[], guess: string[]) => {
  let codeSet = new Set(code)
  let guessSet = new Set(guess)
  const hints: number[] = []

  for (let i = code.length - 1; i >= 0; i--) {
    if (code[i] === guess[i]) {
      hints.push(2)
      codeSet.delete(code[i])
      guessSet.delete(guess[i])
    }
  }

  codeSet.forEach((color) => {
    if (guessSet.has(color)) {
      hints.push(1)
      guessSet.delete(color)
    }
  })

  return new Array(4).fill(0).map((_, i) => hints[i] || 0)
}

export { useStore }
