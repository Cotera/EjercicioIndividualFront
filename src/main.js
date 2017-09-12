import Vue from 'vue'
import App from './App.vue'

window.SERVER = "http://10.60.23.26:49945"
new Vue({ 
  el: '#app',
  render: h => h(App)
})
