import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateCode(COLORS: { id: string }[]) {
  const code = []
  for (let i = 0; i < 4; i++) {
    let randomIndex = Math.floor(Math.random() * COLORS.length)
    code.push(COLORS[randomIndex].id)
  }
  return code
}
