<template>
  <div>
    <van-nav-bar
    title="登录"
    left-text="返回"
    left-arrow
    @click-left="$router.go(-1)"
    />

    <div class="login_bottom">
      <h1 style="margin-left: 30px;">请使用手机号登录</h1>
      <p style="color: gray; margin-left: 30px;">未注册的登录手机号登录后自动注册</p>
      <van-form @submit="onSubmit">
      <van-field
        v-model="Phone"
        name="手机号"
        label="手机号"
        placeholder="手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <div class="Captcha">
        <van-field
        v-model="PicCode"
        name="图形验证码"
        label="图形验证码"
        placeholder="图形验证码"
        :rules="[{ required: true, message: '请填写图形验证码' }]"
        />
        <img :src=PicUrl class="yzm" @click="GetInstance()">
      </div>

      <div class="PhoneCaptcha">
        <van-field
          v-model="PhoneCode"
          name="手机验证码"
          label="手机验证码"
          placeholder="手机验证码"
          :rules="[{ required: true, message: '请填写手机验证码' }]"
        />
        <p><a @click="GetCode">{{ second === totalsecond ? '点击发送验证码' : second + '秒后再次点击' }}</a></p>
      </div>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit" @click="login">提交</van-button>
      </div>
      </van-form>
    </div>

  </div>
</template>

<script>
import { GetImgUrl, GetMesCode, CodeLogin } from '@/api/request'
export default {
  async created () {
    this.GetInstance()
    this.$toast('你好请登录')
  },
  name: 'AppLogin',
  data () {
    return {
      Phone: '',
      PicCode: '',
      PhoneCode: '',
      PicUrl: '',
      PicKey: '',
      totalsecond: 5,
      second: 5,
      codeTime: null
    }
  },
  methods: {
    onSubmit (values) {
      console.log('submit', values)
    },
    async GetInstance () {
      const { data: { base64, key } } = await GetImgUrl()
      this.PicUrl = base64
      this.PicKey = key
    },
    ishaveCode () {
      if (!/^1[3-9]\d{9}$/.test(this.Phone)) {
        this.$toast('请输入正确手机号')
        return false
      }
      if (!/^\w{4}$/.test(this.PicCode)) {
        this.$toast('请输入正确图形验证码')
        return false
      }
      return true
    },
    async GetCode () {
      if (!this.ishaveCode()) {
        return false
      }

      if (!this.codeTime) {
        const res = await GetMesCode(this.PicCode, this.PicKey, this.Phone)
        console.log('res :>> ', res)

        this.$toast('短信已发送请注意')

        this.codeTime = setInterval(() => {
          this.second--

          if (this.second <= 0) {
            clearInterval(this.codeTime)
            this.codeTime = null
            this.second = this.totalsecond
          }
        }, 1000)
      } else {
        this.$toast(`请勿重复点击等待${this.second}后重试`)
      }
    },

    async login () {
      if (!this.ishaveCode()) {
        return false
      }

      const res = await CodeLogin(this.Phone, this.PhoneCode)

      this.$store.commit('User/intoUserData', res)

      this.$toast(res.message)

      const url = this.$route.query.backurl || '/'
      this.$router.replace(url)
    }
  }
}
</script>

<style lang="less" scoped>
  .login_bottom {
    position: relative;
    .Captcha {
      position: relative;
        .yzm {
        position: absolute;
        height: 30px;
        width: 100px;
        top: 0;
        right: 0;
        border: 1px solid black;
      }
    }

    .PhoneCaptcha {
      position: relative;
      p {
        position: absolute;
        right: 20px;
        top: 0;
        border-bottom: 1px solid black;
      }
    }

  }
</style>
