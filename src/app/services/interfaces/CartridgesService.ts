import type {Cartridge} from '../../components/Cartridge'

export interface CartridgesService {
  drawCartridges: () => void,
  appendCartridge: (x: number, y: number) => void,
  cartridges: Cartridge[]
}
