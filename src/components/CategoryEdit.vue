<template>
  <div class="category-edit">
    <a-form-model
      ref="form"
      :model="form"
      :rules="rules"
      :labelCol="{ span: 4 }"
      :wrapperCol="{ span: 10 }"
    >
      <a-form-model-item label="商品类目" prop="category">
        <a-select
          allowClear
          v-model="form.category"
          placeholder="请选择商品类目"
        >
          <a-select-option v-for="c in categories" :key="c.id" :value="c.id">
            {{ c.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="商品子类目" prop="c_items">
        <a-select
          allowClear
          mode="tags"
          v-model="form.c_items"
          placeholder="请添加商品子类目"
        >
          <a-select-option v-for="c in c_items" :key="c" :value="c">
            {{ c }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item :wrapperCol="{ offset: 4 }">
        <a-button @click="submitEdit">修改</a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { categoryRules as rules } from "@/validateRules";
export default {
  watch: {
    "form.category": {
      handler() {
        const category = this.categories.find(c => c.id === this.form.category);
        this.form.c_items = category ? category.c_items : [];
      }
    }
  },
  data: () => ({
    rules,
    form: {
      category: undefined,
      c_items: []
    }
  }),
  computed: {
    ...mapState(["categories"]),
    c_items() {
      return this.form.c_items;
    }
  },
  methods: {
    async submitEdit() {
      try {
        await this.$refs.form.validate();
        const { category: id, c_items } = this.form;
        const category = this.categories.find(c => c.id === id).name;
        this.$emit("edit", id, category, c_items);
      } catch (error) {
        this.$message("请选择正确的类目");
      }
    }
  }
};
</script>

<style lang="less" scoped>
.category-edit {
  padding: 50px;
}
</style>
