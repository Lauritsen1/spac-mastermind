const COLORS = ["red", "yellow", "green", "blue", "orange", "purple"]

type Color = (typeof COLORS)[number]

const COLOR_CLASSES: Record<Color, string> = {
  red: "bg-red-500",
  yellow: "bg-yellow-500",
  green: "bg-green-500",
  blue: "bg-blue-500",
  orange: "bg-orange-500",
  purple: "bg-purple-500",
}

const MAX_ATTEMPTS = 12
const CODE_LENGTH = 4

export { COLORS, COLOR_CLASSES, MAX_ATTEMPTS, CODE_LENGTH }
