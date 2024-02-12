"use client"

import { useState, useEffect } from "react"

export default function Page() {
  const [code, setCode] = useState<string[]>([])

  const generateRandomCode = () => {
    const PEGS: string[] = ["red", "yellow", "green", "blue", "white", "black"]
    const newArray: string[] = []
    for (let i = 0; i < 4; i++) {
      const randomNumber = Math.floor(Math.random() * PEGS.length)
      newArray.push(PEGS[randomNumber])
    }
    setCode(newArray)
  }

  useEffect(() => {
    generateRandomCode()
  }, [])

  return (
    <div>
      {code.map((item, i) => (
        <div key={i}>{item}</div>
      ))}
    </div>
  )
}
