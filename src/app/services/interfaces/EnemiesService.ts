import type {Enemy} from '@models/Enemy'

export interface EnemiesService {
  drawEnemies: () => void
  removeEnemyByIndex: (index: number) => void
  isEnemyGotBase: boolean
  enemies: Enemy[]
}
