import type {Cartridge} from './Cartridge'

export interface Defender {
  draw: () => void
  shoot: (cartridges: Cartridge[]) => void
  health: number
  x: number
  y: number
  width: number
  height: number
}
