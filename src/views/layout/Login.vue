<template>
  <div class="login">
    <user-login @login="login" @forget="change(2)" v-if="status === 0">
      <template #register>
        <a-button type="link" @click="change(1)"> 注册 </a-button>
      </template>
    </user-login>
    <user-register @register="register" v-else-if="status === 1">
      <template #login>
        <a-button type="link" @click="change(0)"> 登录 </a-button>
      </template>
    </user-register>
    <forget-password @reset="submitNewPassword" v-else-if="status === 2">
      <template #login>
        <a-button type="link" @click="change(0)"> 登录 </a-button>
      </template>
    </forget-password>
  </div>
</template>
<script>
import { login, logon, resetPassword } from "@/api";
import UserLogin from "@/components/UserLogin";
import UserRegister from "@/components/UserRegister";
import ForgetPassword from "@/components/ForgetPassword";
export default {
  components: {
    UserLogin,
    UserRegister,
    ForgetPassword
  },
  data: () => ({
    status: 0 // 0 登录 1 注册 2 忘记密码
  }),
  methods: {
    async login(email, password) {
      const { data, status, msg } = await login(email, password);
      if (status == "success") {
        await this.$store.dispatch("login", { ...data });
        await this.$message.success("登录成功", 1);
        // 被打断跳转不报错
        this.$router.replace({ path: "/" }).catch(() => {});
      } else {
        this.$message.error(msg);
      }
    },
    async register(logonInfo) {
      const { status, msg } = await logon(logonInfo);
      if (status === "success") {
        await this.$message.success(msg, 1);
        this.change(0);
      } else {
        this.$message.error(msg);
      }
    },
    async submitNewPassword({ email, password, code }) {
      // msg: "修改成功请登录", status: "success"
      const { status, msg } = await resetPassword(email, password, code);
      if (status === "success") {
        await this.$message.success(msg, 1);
        this.change(0);
      } else {
        this.$message.error(msg);
      }
    },
    change(status) {
      this.status = status;
    }
  }
};
</script>
<style lang="less" scoped>
.login {
  height: 100%;
  /deep/.ant-btn-link {
    color: #1890ff;
  }
  > div {
    margin: auto;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
}
</style>
