"use client"

import { useState, useEffect } from "react"

import { ThemeToggle } from "@/components/theme-toggle"

import { Button } from "@/components/ui/button"

import { RotateCcw } from "lucide-react"

const PEGS = [
  "bg-red-500",
  "bg-yellow-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-orange-500",
  "bg-purple-500",
]

export default function Page() {
  const [code, setCode] = useState<number[]>([])
  const [guess, setGuess] = useState<number[]>([])
  const [currentRow, setCurrentRow] = useState<number>(0)

  const generateRandomCode = () => {
    const newArray: number[] = []
    for (let i = 0; i < 4; i++) {
      const randomNumber = Math.floor(Math.random() * PEGS.length)
      newArray.push(randomNumber)
    }
    setCode(newArray)
  }

  const compareCodes = () => {
    const codeStr: string = code.join("")
    const guessStr: string = guess.join("")
    const areEqual: boolean = guessStr === codeStr

    if (guess.length === 4 && areEqual) {
      console.log("You won! 🎉")
    }

    if (guess.length === 4 && !areEqual) {
      console.log("You lost! 😡")
    }
  }

  const handleOnDrag = (e: React.DragEvent<HTMLDivElement>, id: number) => {
    e.dataTransfer?.setData("id", String(id))
  }

  const handleOnDrop = (
    e: React.DragEvent<HTMLDivElement>,
    rowIndex: number
  ) => {
    if (rowIndex !== currentRow) return

    const id: number = Number(e.dataTransfer?.getData("id"))
    setGuess((prev) => [...prev, id])

    e.currentTarget.classList.add(PEGS[id])
  }

  const handleDragOver = (
    e: React.DragEvent<HTMLDivElement>,
    rowIndex: number
  ) => {
    if (rowIndex !== currentRow) return
    e.preventDefault()
  }

  useEffect(() => {
    generateRandomCode()
  }, [])

  return (
    <div className="flex justify-center h-screen pt-4">
      {code}
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
              <div key={i} className="flex justify-between gap-8">
                <span className="text-muted-foreground select-none">
                  {i + 1}.
                </span>
                <div className="flex gap-4 *:rounded-full *:border-4 *:h-10 *:w-10">
                  <div
                    onDrop={(e) => handleOnDrop(e, i)}
                    onDragOver={(e) => handleDragOver(e, i)}
                  ></div>
                  <div
                    onDrop={(e) => handleOnDrop(e, i)}
                    onDragOver={(e) => handleDragOver(e, i)}
                  ></div>
                  <div
                    onDrop={(e) => handleOnDrop(e, i)}
                    onDragOver={(e) => handleDragOver(e, i)}
                  ></div>
                  <div
                    onDrop={(e) => handleOnDrop(e, i)}
                    onDragOver={(e) => handleDragOver(e, i)}
                  ></div>
                </div>
                {i === currentRow ? (
                  <Button
                    className="rounded-3xl"
                    variant="outline"
                    onClick={compareCodes}
                  >
                    Check
                  </Button>
                ) : (
                  <div className="flex gap-2 *:rounded-full *:border-[3px] *:h-4 *:w-4">
                    <div className="bg-green-500 "></div>
                    <div className="bg-green-500"></div>
                    <div className="bg-yellow-500"></div>
                    <div></div>
                  </div>
                )}
              </div>
            ))}
        </div>
        <div className="flex justify-center gap-4 mt-4 pt-4 border-t *:rounded-full *:border-4 *:h-10 *:w-10">
          {PEGS.map((color, i) => (
            <div key={i}>
              <div
                className={`${color} h-full w-full rounded-full cursor-pointer grid place-items-center text-black`}
                draggable
                onDragStart={(e) => handleOnDrag(e, i)}
              >
                {i}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
