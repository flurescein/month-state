import Vue from 'vue'
import App from './components/App.vue'

import fontawesome from '@fortawesome/fontawesome'
import { faRedo, faCalendar, faAlignJustify, faInfo, faTimes } from '@fortawesome/fontawesome-free-solid'

fontawesome.library.add(faRedo, faCalendar, faAlignJustify, faInfo, faTimes)

new Vue({
  el: '#app',
  render: h => h(App)
})
