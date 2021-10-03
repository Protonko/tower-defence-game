import type {Cartridge} from '../../components/Cartridge'

export interface CartridgesService {
  removeCartridgeByIndex: (index: number) => void
  drawCartridges: () => void,
  cartridges: Cartridge[]
}
