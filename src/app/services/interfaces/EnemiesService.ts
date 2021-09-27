import type {Enemy} from '../../components/Enemy'

export interface EnemiesService {
  drawEnemies: () => void,
  isEnemyGotBase: boolean
  enemies: Enemy[]
}
