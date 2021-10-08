import type {Defender} from '@models/Defender'
import type {DefenderData} from '@models/DefenderData'
import type {Mouse} from '@models/Mouse'
import type {DEFENDER_TYPE} from '@models/DefenderType'

export interface DefendersService {
  buyDefender: () => void
  drawDefenders: () => void
  selectDefender: (mouses: Mouse[]) => void
  removeDefenderByIndex: (index: number) => void
  defenders: Defender[]
  defendersData: DefenderData[]
  selectedDefenderType: DEFENDER_TYPE
}
