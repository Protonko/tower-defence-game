import type {Defender} from '../../components/Defender'

export interface DefendersService {
  buyDefender: () => void,
  drawDefenders: () => void,
  removeDefenderByIndex: (index: number) => void,
  defenders: Defender[],
}
