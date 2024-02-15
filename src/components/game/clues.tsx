export function Clues({ row }: { row: number[] }) {
  return (
    <div className="flex gap-2 *:rounded-full *:border-[3px] *:h-4 *:w-4">
      {row.map((clue, i) => (
        <div
          key={i}
          className="rounded-full border-4 h-4 w-4 grid place-items-center"
        >
          {clue}
        </div>
      ))}
      {/* <div className="bg-green-500 "></div>
      <div className="bg-green-500"></div>
      <div className="bg-yellow-500"></div>
      <div></div> */}
    </div>
  )
}
