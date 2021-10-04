import type {Enemy} from '../../components/interfaces/Enemy'

export interface EnemiesService {
  drawEnemies: () => void,
  removeEnemyByIndex: (index: number) => void,
  isEnemyGotBase: boolean
  enemies: Enemy[]
}
