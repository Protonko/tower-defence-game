import type {BattleService} from './interfaces/BattleService'
import type {DefendersService} from './interfaces/DefendersService'
import type {EnemiesService} from './interfaces/EnemiesService'
import type {CartridgesService} from './interfaces/CartridgesService'
import {injectable, inject} from 'inversify'
import {SERVICE_IDENTIFIER} from '../config/service-identifier'
import {GameConfiguratorSingleton} from './GameConfiguratorSingleton'
import {collision} from '../utils/collision'
import {CARTRIDGE_POWER} from '../static/defenders'

@injectable()
export class BattleServiceImpl implements BattleService {
  private _gameConfigurator: GameConfiguratorSingleton

  constructor(
    @inject(SERVICE_IDENTIFIER.DEFENDERS_SERVICE) private defendersService: DefendersService,
    @inject(SERVICE_IDENTIFIER.ENEMIES_SERVICE) private enemiesService: EnemiesService,
    @inject(SERVICE_IDENTIFIER.CARTRIDGES_SERVICE) private cartridgesService: CartridgesService,
  ) {
    this._gameConfigurator = GameConfiguratorSingleton.getInstance()
  }

  private attackOnDefender() {
    this.defendersService.defenders.forEach((defender, index) => {
      this.enemiesService.enemies.forEach(enemy => {
        if (collision(defender, enemy)) {
          enemy.movement = 0
          defender.health = defender.health - enemy.damage

          if (defender?.health <= 0) {
            this.defendersService.removeDefenderByIndex(index)
            enemy.movement = enemy.speed
          }
        }
      })
    })
  }

  private attackOnEnemy() {
    this.enemiesService.enemies.forEach((enemy, enemyIndex) => {
      this.cartridgesService.cartridges.forEach((cartridge, cartridgeIndex) => {
        if (collision(enemy, cartridge)) {
          enemy.health = enemy.health - CARTRIDGE_POWER

          this.cartridgesService.removeCartridgeByIndex(cartridgeIndex)

          if (enemy?.health <= 0) {
            this._gameConfigurator.balance = this._gameConfigurator.balance + enemy.reward
            this.enemiesService.removeEnemyByIndex(enemyIndex)
          }
        }
      })
    })
  }

  fight() {
    this.attackOnEnemy()
    this.attackOnDefender()
  }
}
