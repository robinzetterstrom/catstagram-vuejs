import Vue from 'vue'
import Vuex from 'vuex'

const debug = process.env.NODE_ENV !== 'production'
Vue.use(Vuex)

/**
 * Vuex modules
 */
import { Comments } from './modules/comments'
import { Images } from './modules/images'

export default new Vuex.Store({
  strict: debug,
  modules: {
    Comments, Images
  }
})
