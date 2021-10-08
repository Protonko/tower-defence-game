export interface Cartridge {
  move: () => void
  draw: () => void
  power: number
  width: number
  height: number
  x: number
  y: number
}
