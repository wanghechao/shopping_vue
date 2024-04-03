import request from '@/utils/request'

export const GetOrder = (dataType) => {
  return request.get('/order/list', {
    params: {
      dataType,
      page: 1
    }
  })
}
