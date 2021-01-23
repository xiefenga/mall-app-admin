<template>
  <div class="header">
    <div class="header-content">
      <div class="btn">
        <a-button type="primary" @click="toggleCollapsed">
          <a-icon :type="collapsed ? 'menu-unfold' : 'menu-fold'" />
        </a-button>
      </div>
      <a-breadcrumb>
        <a-breadcrumb-item>
          {{ $route.matched[0].meta.title }}
        </a-breadcrumb-item>
        <a-breadcrumb-item>
          {{ $route.matched[1].meta.title }}
        </a-breadcrumb-item>
      </a-breadcrumb>
      <ul class="login">
        <li>
          <span>欢迎，{{ username }}</span>
          <a-icon
            type="down"
            :style="{ fontSize: '12px', marginLeft: '5px' }"
          />
        </li>
        <li class="login-out" @click="loginOut">退出登录</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    collapsed: {
      type: Boolean,
      required: true
    }
  },
  model: {
    prop: "collapsed",
    event: "toggleCollapsed"
  },
  methods: {
    toggleCollapsed() {
      this.$emit("toggleCollapsed", !this.collapsed);
    },
    loginOut() {
      this.$store.dispatch("loginOut");
      this.$router.replace({ name: "Login" });
    }
  },
  computed: mapState({
    username: state => state.user.username
  })
};
</script>

<style lang="less" scoped>
.header {
  position: relative;
  height: 42px;
  .header-content {
    display: flex;
    height: 42px;
    position: absolute;
    padding: 5px;
    width: 100%;
    z-index: 1;

    .btn {
      margin-right: 5px;
    }

    > .ant-breadcrumb {
      line-height: 32px;
    }

    .login {
      margin-left: auto;
      margin-right: 20px;
      line-height: 32px;
      &:hover {
        .login-out {
          display: block;
        }
      }
      li {
        padding: 0 10px;
        text-align: center;
        cursor: pointer;
        border-radius: 5px;

        &.login-out {
          display: none;
          &:hover {
            background-color: lightblue;
          }
        }
      }
    }
  }
}
</style>
