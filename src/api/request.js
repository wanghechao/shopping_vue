import instance from '@/utils/request'

export const GetImgUrl = () => {
  return instance.get('/captcha/image')
}

export const GetMesCode = (captchaCode, captchaKey, mobile) => {
  return instance.post('/captcha/sendSmsCaptcha', {
    form: {
      captchaCode,
      captchaKey,
      mobile
    }
  })
}

export const CodeLogin = (getmobile, getsmscode) => {
  return instance.post('/passport/login', {
    form: {
      isParty: false,
      partyData: {},
      mobile: getmobile,
      smsCode: getsmscode

    }
  })
}
