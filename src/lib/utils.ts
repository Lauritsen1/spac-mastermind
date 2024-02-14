import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function generateCode() {
  const code: number[] = await []
  for (let i = 0; i < 4; i++) {
    const randomNumber = Math.floor(Math.random() * 6)
    code.push(randomNumber)
  }
  return code
}
