import type {Mouse} from '../interfaces/Mouse'
import type {BattleService} from './interfaces/BattleService'
import type {DefendersService} from './interfaces/DefendersService'
import type {EnemiesService} from './interfaces/EnemiesService'
import type {CartridgesService} from './interfaces/CartridgesService'
import {GameConfiguratorSingleton} from './GameConfiguratorSingleton'
import {collision} from '../utils/collision'
import {CELL_SIZE} from '../static/game'
import {ENEMY_DAMAGE} from '../static/enemies'
import {CARTRIDGE_POWER} from '../static/defenders'

export class BattleServiceImpl implements BattleService {
  private _gameConfiguration: GameConfiguratorSingleton
  private _defendersService: DefendersService
  private _enemiesService: EnemiesService
  private _cartridgesService: CartridgesService

  constructor(
    defendersService: DefendersService,
    enemiesService: EnemiesService,
    cartridgesService: CartridgesService,
  ) {
    this._gameConfiguration = GameConfiguratorSingleton.getInstance()
    this._defendersService = defendersService
    this._enemiesService = enemiesService
    this._cartridgesService = cartridgesService
  }

  private attackOnDefender() {
    this._defendersService.defenders.forEach((defender, index) => {
      const defenderMouse: Mouse = {
        x: defender.x,
        y: defender.y,
        width: CELL_SIZE,
        height: CELL_SIZE,
      }

      this._enemiesService.enemies.forEach(enemy => {
        const enemyMouse: Mouse = {
          x: enemy.x,
          y: enemy.y,
          width: CELL_SIZE,
          height: CELL_SIZE,
        }

        if (collision(defenderMouse, enemyMouse)) {
          enemy.movement = 0
          defender.health = defender.health - ENEMY_DAMAGE

          if (defender?.health <= 0) {
            this._defendersService.removeDefenderByIndex(index)
            enemy.movement = enemy.speed
          }
        }
      })
    })
  }

  private attackOnEnemy() {
    this._enemiesService.enemies.forEach(enemy => {
      const enemyMouse: Mouse = {
        height: CELL_SIZE,
        width: CELL_SIZE,
        x: enemy.x,
        y: enemy.y
      }

      this._cartridgesService.cartridges.forEach((cartridge, index) => {
        const cartridgeMouse: Mouse = {
          height: CELL_SIZE,
          width: CELL_SIZE,
          x: cartridge.x,
          y: cartridge.y
        }

        if (collision(enemyMouse, cartridgeMouse)) {
          enemy.health = enemy.health - CARTRIDGE_POWER

          this._cartridgesService.removeCartridgeByIndex(index)

          if (enemy?.health <= 0) {
            this._gameConfiguration.balance = this._gameConfiguration.balance + enemy.reward
            this._enemiesService.removeEnemyByIndex(index)
          }
        }
      })
    })
  }

  fight() {
    this.attackOnDefender()
    this.attackOnEnemy()
  }
}
