export function Hint({ hint }: { hint: number }) {
  return (
    <div
      className={`rounded-full border-2 h-4 w-4 ${
        hint === 2 ? "bg-green-500" : hint === 1 ? "bg-orange-500" : ""
      }`}
    ></div>
  )
}
