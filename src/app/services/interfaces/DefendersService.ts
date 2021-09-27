import type {Defender} from '../../components/Defender'

export interface DefendersService {
  buyDefender: () => void,
  drawDefenders: () => void,
  drawCartridges: () => void,
  shoot: () => void,
  removeDefenderByIndex: (index: number) => void,
  removeCartridgeByIndex: (index: number) => void,
  defenders: Defender[],
}
