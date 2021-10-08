import type {Cartridge} from '../../components/interfaces/Cartridge'

export interface CartridgesService {
  removeCartridgeByIndex: (index: number) => void
  drawCartridges: () => void,
  cartridges: Cartridge[]
}
