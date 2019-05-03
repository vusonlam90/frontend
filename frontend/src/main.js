import Vue from 'vue'
import App from './App.vue'
import './assets/css/styles.css'

/* Register egister BootstrapVue plugin */
import BootstrapVue from 'bootstrap-vue'

/* Import Bootstrap and BootstrapVue css files */
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
