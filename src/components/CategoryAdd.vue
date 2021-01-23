<template>
  <div class="category-add">
    <a-form-model
      ref="form"
      :model="form"
      :rules="rules"
      :labelCol="{ span: 4 }"
      :wrapperCol="{ span: 10 }"
    >
      <a-form-model-item label="类目名称" prop="category">
        <a-input
          allowClear
          autocomplete="off"
          v-model="form.category"
          placeholder="请输入类目名称"
        />
      </a-form-model-item>
      <a-form-model-item label="子类目" prop="c_items">
        <a-select
          mode="tags"
          @blur="onBlur"
          @focus="onFocus"
          :placeholder="tip"
          v-model="form.c_items"
          :dropdownMenuStyle="{ display: 'none' }"
        />
      </a-form-model-item>
      <a-form-model-item :wrapperCol="{ offset: 8 }">
        <a-button class="submit" type="primary" @click="submitAdd">
          提交
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import { categoryRules as rules } from "@/validateRules";
export default {
  data: () => ({
    rules,
    form: {
      category: "",
      c_items: []
    },
    tip: "请添加子类目"
  }),
  methods: {
    async submitAdd() {
      try {
        await this.$refs.form.validate();
        const { category, c_items } = this.form;
        this.$emit("add", category, c_items);
      } catch (error) {
        this.$message.error("请输入正确的类目信息");
      }
    },
    onBlur() {
      this.tip = "请添加子类目";
    },
    onFocus() {
      this.tip = "输入子类目名称并回车";
    }
  }
};
</script>

<style lang="less" scoped>
.category-add {
  padding: 50px;
}
</style>
