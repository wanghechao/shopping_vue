export default {
  methods: {

    loginComform () {
      if (!this.$store.getters.token) {
        this.$dialog.confirm({ title: '温馨提示', message: '请先登录', confirmButtonText: '去登录', cancelButtonText: '再逛逛' })
          .then(() => {
            this.$router.replace({
              path: '/login',
              query: {
                backurl: this.$route.fullPath
              }
            })
          })
          .catch(() => {

          })
        return true
      }
      return false
    }

  }
}
