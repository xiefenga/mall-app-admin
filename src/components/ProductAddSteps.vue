<template>
  <div>
    <a-steps :current="current">
      <a-step v-for="step in steps" :key="step" :title="step" />
    </a-steps>
    <div class="steps-content">
      <transition
        :enter-class="enterClass"
        :enter-to-class="enterToClass"
        :leave-class="leaveClass"
        :leave-to-class="leaveToClass"
      >
        <template>
          <slot name="basic" v-if="current === 0" />
          <slot name="sale" v-else-if="current === 1" />
          <slot name="confirm" v-else />
        </template>
      </transition>
    </div>
    <div class="steps-action">
      <a-button v-if="current > 0" @click="prev"> 上一步 </a-button>
      <a-button v-if="current < steps.length - 1" @click="next">
        下一步
      </a-button>
      <a-button v-if="current === steps.length - 1" @click="submit">
        提交
      </a-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      steps: ["填写商品基本信息", "填写商品销售信息", "确认信息"],
      current: 0,
      direction: 1 // 0 向前 1 向后
    };
  },
  methods: {
    submit() {
      this.$emit("submit");
    },
    next() {
      this.$emit("next", () => {
        this.current++;
        this.direction = 1;
      });
    },
    prev() {
      this.current--;
      this.direction = 0;
    }
  },
  computed: {
    enterClass() {
      return this.direction ? "enter" : "leave-to";
    },
    enterToClass() {
      return this.direction ? "enter-to" : "leave";
    },
    leaveClass() {
      return this.direction ? "leave" : "enter-to";
    },
    leaveToClass() {
      return this.direction ? "leave-to" : "enter";
    }
  }
};
</script>

<style lang="less" scoped>
.steps-content {
  overflow: hidden;
  margin: 20px 5% 0;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  height: 360px;
  padding-top: 20px;
  position: relative;

  > div {
    position: absolute;
    width: 100%;
  }

  .basic-info {
    margin-top: 30px;
  }

  .sale-info {
    margin-top: 30px;
  }
}
.steps-action {
  margin-top: 20px;
  text-align: center;
  button {
    margin: 0 10px;
  }
}
.v-enter-active,
.v-leave-active {
  transition: 0.5s ease-in-out;
}

.leave,
.enter-to {
  transform: translateX(0);
}

.enter {
  transform: translateX(100%);
}

.leave-to {
  transform: translateX(-100%);
}
</style>
