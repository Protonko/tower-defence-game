import type {Mouse} from '../interfaces/Mouse'
import type {BattleService} from './interfaces/BattleService'
import type {DefendersService} from './interfaces/DefendersService'
import type {EnemiesService} from './interfaces/EnemiesService'
import {collision} from '../utils/collision'
import {CELL_SIZE} from '../static/game'
import {ENEMY_DAMAGE} from '../static/enemies'

export class BattleServiceImpl implements BattleService {
  private _defendersService: DefendersService
  private _enemiesService: EnemiesService

  constructor(defendersService: DefendersService, enemiesService: EnemiesService) {
    this._defendersService = defendersService
    this._enemiesService = enemiesService
  }

  fight() {
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
}
