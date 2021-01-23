<template>
  <div class="category-delete">
    <a-form-model
      ref="form"
      :model="form"
      :labelCol="{ span: 4 }"
      :wrapperCol="{ span: 10 }"
    >
      <a-form-model-item label="商品类目" prop="categoryId" :rules="rules">
        <a-select
          allowClear
          v-model="form.categoryId"
          placeholder="请选择要删除的类目"
        >
          <a-select-option v-for="c in categories" :key="c.id" :value="c.id">
            {{ c.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item :wrapperCol="{ offset: 4 }">
        <a-button @click="submitDelete">删除</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    form: {
      categoryId: undefined
    },
    rules: [{ required: true, message: "请选择商品类目" }]
  }),
  computed: {
    ...mapState(["categories"])
  },
  methods: {
    async submitDelete() {
      try {
        await this.$refs.form.validate();
        this.$emit("delete", this.form.categoryId);
      } catch (error) {
        this.$message.error("请选择要删除的商品种类");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.category-delete {
  padding: 50px;
}
</style>
