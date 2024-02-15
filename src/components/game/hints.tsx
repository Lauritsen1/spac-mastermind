export function Hints({ row }: { row: number[] }) {
  return (
    <div className="flex gap-2 *:rounded-full *:border-2 *:h-4 *:w-4">
      {row.map((hint, i) => (
        <div
          key={i}
          className={
            hint === 2 ? "bg-green-500" : hint === 1 ? "bg-orange-500" : ""
          }
        ></div>
      ))}
    </div>
  )
}
