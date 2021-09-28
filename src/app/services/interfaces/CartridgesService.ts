import type {Cartridge} from '../../components/Cartridge'

export interface CartridgesService {
  removeCartridgeByIndex: (index: number) => void
  drawCartridges: () => void,
  appendCartridge: (x: number, y: number) => void,
  cartridges: Cartridge[]
}
