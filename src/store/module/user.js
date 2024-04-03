
import { GetUserId, SetUser } from '@/utils/storage'
export default {
  namespaced: true,
  state () {
    return {
      UserInfo: GetUserId()
    }
  },
  mutations: {
    intoUserData (state, obj) {
      state.UserInfo = obj.data || obj
      SetUser(obj.data || obj)
    }

  },
  actions: {
    logout (context) {
      context.commit('intoUserData', {})
      context.commit('Carts/cartList', [], { root: true })
    }
  }
}
