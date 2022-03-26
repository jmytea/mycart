import detailEffects from '../../pages/common/Detail/effect'
import loginEffects from '../../pages/common/Login/effect'
import userEffects from './userEffects'
import cartEffects from '../../pages/cart/Root/effects'
import orderEffects from './orderEffects'

export default [
  ...detailEffects,
  ...loginEffects,
  ...userEffects,
  ...cartEffects,
  ...orderEffects
]