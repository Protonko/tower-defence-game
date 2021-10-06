import type {Defender} from '../../components/interfaces/Defender'
import type {DefenderData} from '../../interfaces/DefenderData'

export interface DefendersService {
  buyDefender: () => void,
  drawDefenders: () => void,
  removeDefenderByIndex: (index: number) => void,
  defenders: Defender[],
  defendersData: DefenderData[],
}
