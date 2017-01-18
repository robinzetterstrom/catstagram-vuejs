import Vue from 'vue'
import Vuex from 'vuex'

const debug = process.env.NODE_ENV !== 'production'
Vue.use(Vuex)

/**
 * Vuex modules
 */
import { Comments } from './modules/comments'

export default new Vuex.Store({
  strict: debug,
  modules: {
    Comments
  }
})
