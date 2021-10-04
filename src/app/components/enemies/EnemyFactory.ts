import {DevilEnemy} from './DevilEnemy'
import {GoblinEnemy} from './GoblinEnemy'

export enum ENEMY_TYPE {
  DEVIL = 'DEVIL',
  GOBLIN = 'GOBLIN',
}

export class EnemyFactory {
  static createEnemy(enemyType: ENEMY_TYPE, yPosition: number) {
    switch (enemyType) {
      case ENEMY_TYPE.DEVIL:
        return new DevilEnemy(yPosition)
      case ENEMY_TYPE.GOBLIN:
        return new GoblinEnemy(yPosition)
      default:
        return new GoblinEnemy(yPosition)
    }
  }
}
