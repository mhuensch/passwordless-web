import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'

import 
  { faPlay
  } 
from '@fortawesome/free-solid-svg-icons'

library.add(faPlay)

function configure (Vue) {
  Vue.component('icon', FontAwesomeIcon)
}

export default { configure }