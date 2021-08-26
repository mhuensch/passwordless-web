import Vue from 'vue'
import App from '@/App.vue'
import routing from '@/modules/router'
import icons from '@/modules/icons'

// Remove the "You are running Vue in development mode." message.
// We always build this code in production mode when releasing to our servers.
Vue.config.productionTip = false

const router = routing.configure(Vue)
icons.configure(Vue)

new Vue(
  { render: createElement => createElement(App)
  , router: router
  }
).$mount('#app')