<template>
  <div class="GoodsBtn">
    <button @click="CountSub" class="CountSub">-</button>
    <input :value="value" @change="handleipuval" type="text" class="ipu">
    <button @click="CountAdd" class="CountAdd">+</button>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 1
    }
  },
  methods: {
    CountSub () {
      if (this.value <= 1) {
        return
      }
      this.$emit('input', this.value - 1)
    },
    CountAdd () {
      this.$emit('input', this.value + 1)
    },
    handleipuval (e) {
      const num = +e.target.value
      if (isNaN(num) || num < 1) {
        e.target.value = this.value
        return false
      }
      this.$emit('input', num)
      console.log('num :>> ', num)
    }
  }
}
</script>

<style lang="less" scoped>
.GoodsBtn {
    width: 110px;
    height: 40px;
    display: flex;
    .ipu{
        margin: 5px;
        width: 50px;
        outline: none;
        border: none;
        text-align: center;
    }
    .CountSub , .CountAdd {
        width: 30px;
        outline: none;
        border: none;
    }
}
</style>
