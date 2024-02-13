"use client"

import { useState, useEffect } from "react"

import { ThemeToggle } from "@/components/theme-toggle"

import { Button } from "@/components/ui/button"

import { RotateCcw } from "lucide-react"

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
    <div className="flex justify-center h-screen pt-4">
      <div>
        <div className="flex justify-between items-center border-b mb-4 pb-4">
          <h2 className="font-bold text-3xl">Mastermind</h2>
          <div className="space-x-2">
            <Button size="icon" variant="ghost">
              <RotateCcw className="h-4 w-4" />
            </Button>
            <ThemeToggle />
          </div>
        </div>
        <div className="flex flex-col-reverse gap-4 max-w-max">
          {Array(12)
            .fill(null)
            .map((_, i) => (
              <div key={i} className="flex justify-between items-center gap-8">
                <span className="text-muted-foreground">{i + 1}.</span>
                <div className="flex gap-4 *:rounded-full *:border-4 *:h-10 *:w-10">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
                <div className="flex gap-2 *:rounded-full *:border-[3px] *:h-4 *:w-4">
                  <div className="bg-green-500 "></div>
                  <div className="bg-green-500"></div>
                  <div className="bg-yellow-500"></div>
                  <div></div>
                </div>
              </div>
            ))}
        </div>
        <div className="flex justify-center gap-4 mt-4 pt-4 border-t *:rounded-full *:border-4 *:h-10 *:w-10">
          <div className="bg-red-500"></div>
          <div className="bg-yellow-500"></div>
          <div className="bg-green-500"></div>
          <div className="bg-blue-500"></div>
          <div className="bg-orange-500"></div>
          <div className="bg-purple-500"></div>
        </div>
      </div>
    </div>
  )
}
