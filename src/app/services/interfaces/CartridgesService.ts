import type {Cartridge} from '@models/Cartridge'

export interface CartridgesService {
  removeCartridgeByIndex: (index: number) => void
  drawCartridges: () => void
  cartridges: Cartridge[]
}
