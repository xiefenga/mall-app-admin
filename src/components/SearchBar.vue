<template>
  <div class="search-bar">
    <a-form-model
      layout="inline"
      :model="searchData"
      @submit="handleSubmit"
      @submit.native.prevent
    >
      <a-form-model-item label="检索关键字">
        <a-input
          v-model="searchData.keyword"
          placeholder="请输入关键字"
          allowClear
        />
      </a-form-model-item>
      <a-form-model-item label="商品类目">
        <a-select
          placeholder="请选择商品类目"
          allowClear
          style="width: 180px"
          @change="handleChange"
        >
          <a-select-option v-for="c in categories" :key="c.id" :value="c.id">
            {{ c.name }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="primary" html-type="submit">
          搜索
        </a-button>
      </a-form-model-item>
    </a-form-model>
  </div>
</template>
<script>
export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      searchData: {
        keyword: "",
        category: ""
      }
    };
  },
  methods: {
    handleChange(val) {
      this.searchData.category = val;
    },
    handleSubmit() {
      this.$emit("search", this.searchData);
    }
  }
};
</script>

<style lang="less" scoped>
.search-bar {
  border-top: 1px solid #eee;
  padding: 10px 0;
  padding-left: 50px;
}
</style>
