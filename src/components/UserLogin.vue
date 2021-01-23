<template>
  <div class="user-login">
    <h1>登录</h1>
    <a-form-model
      ref="form"
      :model="form"
      :rules="rules"
      :labelCol="{ span: 4 }"
      :wrapperCol="{ span: 16 }"
    >
      <a-form-model-item label="邮箱" prop="email">
        <a-input
          allowClear
          autocomplete="off"
          v-model="form.email"
          @pressEnter="submit"
        />
      </a-form-model-item>
      <a-form-model-item label="密码" prop="password">
        <a-input-password
          allowClear
          autocomplete="off"
          v-model="form.password"
          @pressEnter="submit"
        />
      </a-form-model-item>
      <div class="forget">
        <a-button type="link" @click="forget"> 忘记密码 </a-button>
      </div>
      <a-form-model-item :wrapperCol="{ offset: 4, span: 20 }">
        <a-button class="login-btn" type="primary" @click="submit">
          登录
        </a-button>
        <slot name="register" />
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
import { loginRules as rules } from "@/validateRules";
export default {
  data() {
    return {
      rules,
      form: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async submit() {
      try {
        await this.$refs.form.validate();
        const { email, password } = this.form;
        this.$emit("login", email, password);
      } catch (error) {
        this.$message.error("请输入正确的邮箱和密码");
      }
    },
    forget() {
      this.$emit("forget");
    }
  }
};
</script>

<style lang="less" scoped>
.user-login {
  width: 500px;
  height: 300px;
  border: 2px solid #30a679;
  border-radius: 5px;
  padding: 20px 50px 0;

  h1 {
    text-align: center;
    margin-bottom: 1.5em;
  }
  .login-btn {
    width: 70%;
  }
  .forget {
    position: absolute;
    right: 30px;
    top: 170px;
  }
}
</style>
