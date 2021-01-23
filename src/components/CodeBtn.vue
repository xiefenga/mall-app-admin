<template>
  <div class="code-btn">
    <a-button class="code-btn" @click="getCode" :disabled="disableBtn">
      {{ this.timer ? `${this.countDown}s后再试` : "获取验证码" }}
    </a-button>
  </div>
</template>

<script>
export default {
  data: () => ({
    timer: null,
    countDown: 60
  }),
  computed: {
    disableBtn() {
      return Boolean(this.timer);
    }
  },
  methods: {
    getCode() {
      this.$emit("getCode", this.buttonCountDown);
    },
    buttonCountDown() {
      if (this.timer) {
        return;
      }
      this.timer = setInterval(() => {
        this.countDown--;
        if (this.countDown === 0) {
          clearInterval(this.timer);
          this.timer = null;
          this.countDown = 60;
        }
      }, 1000);
    }
  }
};
</script>

<style lang="less" scoped>
.code-btn {
  display: inline-block;
}
</style>
