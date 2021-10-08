import type {Enemy} from '@models/Enemy'
import type {EnemiesService} from './interfaces/EnemiesService'
import {injectable} from 'inversify'
import {GameConfiguratorSingleton} from './GameConfiguratorSingleton'
import {CELL_SIZE} from '@static/game'
import {EnemyFactory, ENEMY_TYPE} from '@components/enemies/EnemyFactory'

@injectable()
export class EnemiesServiceImpl implements EnemiesService {
  private _gameConfigurator: GameConfiguratorSingleton
  private _enemies: Enemy[]
  private _isEnemyGotBase: boolean

  constructor() {
    const enemyCreationInterval = 5000

    this._gameConfigurator = GameConfiguratorSingleton.getInstance()
    this._enemies = []
    this._isEnemyGotBase = false

    setInterval(() => {
      this.appendEnemy()
    }, enemyCreationInterval)
  }

  private appendEnemy() {
    const enemyType =
      Math.random() > 0.75 ? ENEMY_TYPE.DEVIL : ENEMY_TYPE.GOBLIN
    const yPosition = Math.floor(Math.random() * 5 + 1) * CELL_SIZE

    this._enemies.push(EnemyFactory.createEnemy(enemyType, yPosition))
  }

  removeEnemyByIndex(index: number) {
    this._enemies.splice(index, 1)
  }

  drawEnemies() {
    this._enemies.forEach((enemy) => {
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
