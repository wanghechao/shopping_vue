import Vue from 'vue'
import Vuex from 'vuex'
import User from '@/store/module/user'
import Carts from './module/carts'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
    token (state) {
      return state.User.UserInfo.token
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    User,
    Carts
  }
})
