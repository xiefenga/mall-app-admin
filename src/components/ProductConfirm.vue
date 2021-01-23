<template>
  <div class="confirm">
    <a-descriptions title="商品预览">
      <a-descriptions-item label="标题" :span="2">
        {{ formData.title }}
      </a-descriptions-item>
      <a-descriptions-item label="种类">
        {{ category }}
      </a-descriptions-item>
      <a-descriptions-item label="描述" :span="3">
        {{ formData.desc }}
      </a-descriptions-item>
      <a-descriptions-item label="商品售价">
        {{ formData.price }}
      </a-descriptions-item>
      <a-descriptions-item label="标签" :span="2">
        <a-tag v-for="t in formData.tags" :key="t" color="orange">
          {{ t }}
        </a-tag>
      </a-descriptions-item>

      <a-descriptions-item label="折扣价格">
        {{ formData.price_off }}
      </a-descriptions-item>
      <a-descriptions-item label="库存">
        {{ formData.inventory }}
      </a-descriptions-item>
      <a-descriptions-item label="计量单位">
        {{ formData.unit }}
      </a-descriptions-item>
      <a-descriptions-item label="产品图片" :span="3">
        <img v-for="i in formData.images" :key="i" :src="i" />
      </a-descriptions-item>
    </a-descriptions>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: {
    formData: {
      type: Object,
      required: true
    }
  },
  computed: {
    category() {
      return this.categories.find(c => c.id === this.formData.category).name;
    },

    ...mapState(["categories"])
  }
};
</script>

<style lang="less" scoped>
.ant-descriptions {
  padding: 0 50px;
  /deep/.ant-descriptions-title {
    font-size: 20px;
  }
  img {
    margin: 0 5px;
    width: 80px;
    height: 80px;
    padding: 5px;
    border: 1px solid #aaa;
    border-radius: 5px;
    object-fit: cover;
    user-select: none;
  }
}
</style>
