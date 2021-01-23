<template>
  <div class="forget-password">
    <h1>忘记密码</h1>
    <a-form-model
      ref="form"
      :model="form"
      :rules="rules"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 16 }"
    >
      <a-form-model-item label="邮箱" prop="email">
        <a-input v-model="form.email" placeholder="请输入邮箱" allowClear />
      </a-form-model-item>
      <a-form-model-item label="密码" prop="password">
        <a-input-password
          v-model="form.password"
          placeholder="请输入密码"
          allowClear
        />
      </a-form-model-item>
      <a-form-model-item label="验证码" prop="code" :wrapper-col="{ span: 12 }">
        <a-input v-model="form.code" placeholder="请输入验证码" allowClear />
        <code-btn @getCode="handleGetCode" />
      </a-form-model-item>
      <a-form-model-item :wrapperCol="{ offset: 4, span: 20 }">
        <a-button type="primary" class="submit-btn" @click="submitNewPwd">
          提交
        </a-button>
        <slot name="login" />
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import { getCode } from "@/api";
import { handleGetCode } from "@/common";
import CodeBtn from "@/components/CodeBtn";
import { forgetRules as rules } from "@/validateRules";
export default {
  components: {
    CodeBtn
  },
  data: () => ({
    rules,
    form: {
      email: "",
      password: "",
      code: ""
    }
  }),
  methods: {
    async submitNewPwd() {
      try {
        await this.$refs.form.validate();
        this.$emit("reset", { ...this.form });
      } catch (error) {
        this.$message.error("请输入正确格式的信息");
      }
    },
    handleGetCode(buttonCountDown) {
      handleGetCode(
        this.$refs.form.validateField,
        "email",
        errorMessage => {
          this.$message.error(`${errorMessage},请先输入邮箱`);
        },
        async () => {
          buttonCountDown();
          try {
            const { status, msg } = await getCode(this.form.email);
            if (status === "success") {
              this.$message.success("验证码发送成功，请注意查收");
            } else {
              this.$message.error(msg);
            }
          } catch (error) {
            this.$message.error("请重试");
          }
        }
      );
    }
  }
};
</script>

<style lang="less" scoped>
.forget-password {
  width: 500px;
  height: 370px;
  border: 2px solid #30a679;
  border-radius: 5px;
  padding: 20px 50px 0;

  .code-btn {
    position: absolute;
    right: 0;
    top: 0;
    transform: translate(calc(100% + 5px), -11px);
  }

  .submit-btn {
    width: 70%;
  }

  h1 {
    text-align: center;
    margin-bottom: 1.5em;
  }
}
</style>
