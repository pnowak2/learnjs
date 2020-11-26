import Vue from 'vue'
import App from './App.vue'
import { defineCustomElements } from 'domisoft-my-web-component';

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

defineCustomElements(window);