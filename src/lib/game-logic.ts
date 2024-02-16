export function generateCode(COLORS: { id: string }[]) {
  const code = []
  for (let i = 0; i < 4; i++) {
    let randomIndex = Math.floor(Math.random() * COLORS.length)
    code.push(COLORS[randomIndex].id)
  }
  return code
}

export function getHints(code: string[], guess: string[]) {
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

export function checkGameStatus(hints: number[]) {
  return hints.every((hint) => hint === 2)
}
