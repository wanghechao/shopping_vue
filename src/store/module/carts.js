import { CartList, updataCarts, delCartsDate } from '@/api/CartAdd'
export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  mutations: {
    addcartList (context, newGetData) {
      context.cartList = newGetData
    },
    changeChecked (state, goodsId) {
      return state.cartList.forEach(item => {
        if (item.goods_id === goodsId) {
          item.ischeck = !item.ischeck
        }
      })
    },
    toggolAllChecked (state, flg) {
      return state.cartList.forEach(item => { item.ischeck = flg })
    },
    updateCarts (state, obj) {
      const { goodsId, val } = obj
      const findgoods = state.cartList.find(item => item.goods_id === goodsId)
      findgoods.goods_num = val
    }
  },
  actions: {
    async getcartList (context) {
      const { data } = await CartList()
      data.list.forEach(item => {
        item.ischeck = true
      })
      context.commit('addcartList', data.list)
    },
    async updateCarts (context, obj) {
      const { goodsId, val, goodsSkuId } = obj
      await updataCarts(goodsId, val, goodsSkuId)
      context.commit('updateCarts', { goodsId, val })
    },
    async clearCartsDate (context) {
      const ckgoods = context.getters.checkCount
      const ckgoodsId = ckgoods.map(item => item.id)
      await delCartsDate(ckgoodsId)
      context.dispatch('getcartList')
    }
  },
  getters: {
    goodsCount (state) {
      return state.cartList.reduce((num, item) => num + item.goods_num, 0)
    },
    checkCount (state) {
      return state.cartList.filter(item => item.ischeck)
    },
    checkgoodsCount (state, getters) {
      return getters.checkCount.reduce((num, item) => num + item.goods_num, 0)
    },
    checkgoodsPrice (state, getters) {
      return getters.checkCount.reduce((num, item) => {
        return num + item.goods_num * item.goods.goods_price_min
      }, 0).toFixed(2)
    },
    isAllChecked (state) {
      return state.cartList.every(item => item.ischeck)
    }
  }
}
