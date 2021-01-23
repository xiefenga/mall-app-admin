<template>
  <div class="category">
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="商品类目增加">
        <category-add @add="addCategory" />
      </a-tab-pane>
      <a-tab-pane key="2" tab="商品类目编辑">
        <category-edit @edit="eidtCategory" />
      </a-tab-pane>
      <a-tab-pane key="3" tab="商品类目删除">
        <category-delete @delete="deleteCategory" />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import CategoryAdd from "@/components/CategoryAdd";
import CategoryEdit from "@/components/CategoryEdit";
import CategoryDelete from "@/components/CategoryDelete";
import { addCategory, editCategory, deleteCategory } from "@/api";
export default {
  components: {
    CategoryAdd,
    CategoryEdit,
    CategoryDelete
  },
  created() {
    this.$store.dispatch("updateCategories");
  },
  data: () => ({}),
  methods: {
    async addCategory(category, c_items) {
      const { msg, status } = await addCategory(Date.now(), category, c_items);
      if (status === "success") {
        await this.$message.success("添加成功", 1);
        this.$store.dispatch("updateCategories");
      } else {
        this.$message.error(msg);
      }
    },
    async eidtCategory(id, category, c_items) {
      const { status, msg } = await editCategory(id, category, c_items);
      if (status === "success") {
        await this.$message.success("修改成功");
        this.$store.dispatch("updateCategories");
      } else {
        this.$message.error(msg);
      }
    },
    async deleteCategory(id) {
      const { status, msg } = await deleteCategory(id);
      if (status === "success") {
        await this.$message.success("删除成功", 1);
        this.$store.dispatch("updateCategories");
      } else {
        this.$message.error(msg);
      }
    }
  }
};
</script>

<style lang="less" scoped>
.category {
  padding: 0 10px;
}
</style>
