import type {BattleService} from '../services/interfaces/BattleService'
import type {CartridgesService} from '../services/interfaces/CartridgesService'
import type {DefendersService} from '../services/interfaces/DefendersService'
import type {EnemiesService} from '../services/interfaces/EnemiesService'
import type {BonusService} from '../services/interfaces/BonusService'
import 'reflect-metadata'
import {Container} from 'inversify'
import {SERVICE_IDENTIFIER} from './service-identifier'
import {BattleServiceImpl} from '../services/BattleServiceImpl'
import {CartridgesServiceImpl} from '../services/CartridgesServiceImpl'
import {DefendersServiceImpl} from '../services/DefendersServiceImpl'
import {EnemiesServiceImpl} from '../services/EnemiesServiceImpl'
import {BonusServiceImpl} from '../services/BonusServiceImpl'

const container = new Container()
container.bind<BattleService>(SERVICE_IDENTIFIER.BATTLE_SERVICE).to(BattleServiceImpl)
container.bind<CartridgesService>(SERVICE_IDENTIFIER.CARTRIDGES_SERVICE).to(CartridgesServiceImpl).inSingletonScope()
container.bind<DefendersService>(SERVICE_IDENTIFIER.DEFENDERS_SERVICE).to(DefendersServiceImpl).inSingletonScope()
container.bind<EnemiesService>(SERVICE_IDENTIFIER.ENEMIES_SERVICE).to(EnemiesServiceImpl).inSingletonScope()
container.bind<BonusService>(SERVICE_IDENTIFIER.BONUS_SERVICE).to(BonusServiceImpl)

export {container}
