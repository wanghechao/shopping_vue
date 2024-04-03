import request from '@/utils/request'

export const PayAddress = () => {
  return request.get('/address/list')
}

export const GiveMoney = (PayMode, obj) => {
  return request.get('/checkout/order', {
    params: {
      mode: PayMode,
      delivery: '10',
      isUsePoints: 0,
      couponId: 0,
      ...obj
    }

  })
}

export const submitWeb = (mode, obj) => {
  return request.post('/checkout/submit', {
    mode,
    delivery: '10',
    isUsePoints: 0,
    couponId: 0,
    payType: 10,
    remark: '真给力',
    ...obj
  })
}
