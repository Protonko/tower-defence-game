import type {Enemy} from '../../components/Enemy'

export interface EnemiesService {
  drawEnemies: () => void,
  removeEnemyByIndex: (index: number) => void,
  isEnemyGotBase: boolean
  enemies: Enemy[]
}
