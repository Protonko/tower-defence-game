import type {EnemiesService} from './interfaces/EnemiesService'
import {GameConfiguratorSingleton} from './GameConfiguratorSingleton'
import {Enemy} from '../components/Enemy'
import {CELL_SIZE} from '../static/game'
import {ENEMY_CREATION_INTERVAL} from '../static/enemies'

export class EnemiesServiceImpl implements EnemiesService {
  private _canvasConfiguration: GameConfiguratorSingleton
  private _enemies: Enemy[]
  // private enemyPositions: number[]
  private _isEnemyGotBase: boolean

  constructor() {
    this._canvasConfiguration = GameConfiguratorSingleton.getInstance()
    this._enemies = []
    // this.enemyPositions = []
    this._isEnemyGotBase = false

    setInterval(() => {
      this.createEnemy()
    }, ENEMY_CREATION_INTERVAL)
  }

  private createEnemy() {
    const yPosition = Math.floor(Math.random() * 5 + 1) * CELL_SIZE
    this._enemies.push(new Enemy(yPosition))
    // this.enemyPositions.push(yPosition)
  }

  drawEnemies() {
    this._enemies.forEach(enemy => {
      enemy.move()
      enemy.draw()

      if (enemy.x < 0) {
        this._isEnemyGotBase = true
      }
    })
  }

  get isEnemyGotBase() {
    return this._isEnemyGotBase
  }

  get enemies() {
    return this._enemies
  }
}
