import { useState, useEffect } from "react"

export function useGenerateCode() {
  const [code, setCode] = useState<number[]>([])

  useEffect(() => {
    const newArray: number[] = []
    for (let i = 0; i < 4; i++) {
      const randomNumber = Math.floor(Math.random() * 6)
      newArray.push(randomNumber)
    }
    setCode(newArray)
  }, [])

  return code
}
