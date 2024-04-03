import request from '@/utils/request'

export const cartadd = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/add', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

export const CartList = () => {
  return request.get('/cart/list')
}

export const updataCarts = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/update', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}
export const delCartsDate = (cartIds) => {
  return request.post('/cart/clear', {
    cartIds
  })
}
