import type {Defender} from '../../components/interfaces/Defender'
import type {DefenderData, DEFENDER_TYPE} from '../../interfaces/DefenderData'
import type {Mouse} from '../../interfaces/Mouse'

export interface DefendersService {
  buyDefender: () => void,
  drawDefenders: () => void,
  selectDefender: (mouses: Mouse[]) => void,
  removeDefenderByIndex: (index: number) => void,
  defenders: Defender[],
  defendersData: DefenderData[],
  selectedDefenderType: DEFENDER_TYPE
}
