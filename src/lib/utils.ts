import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function checkGameState(hints: number[][], currentRow: number) {
  const isWin = hints[currentRow].every((hint) => hint === 2)

  if (isWin) return "WON"

  if (!isWin && currentRow >= 11) return "LOST"

  return "ONGOING"
}
