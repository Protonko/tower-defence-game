import type {Defender} from '../../components/interfaces/Defender'

export interface DefendersService {
  buyDefender: () => void,
  drawDefenders: () => void,
  removeDefenderByIndex: (index: number) => void,
  defenders: Defender[],
}
