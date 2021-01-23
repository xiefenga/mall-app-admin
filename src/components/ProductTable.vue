<template>
  <a-table
    :columns="columns"
    :data-source="tableData"
    :pagination="false"
    :scroll="{ y: 520 }"
    size="middle"
    :loading="isLoading"
  >
    <span slot="tags" slot-scope="tags">
      <a-tag
        v-for="tag in tags"
        :key="tag"
        :color="tag.length > 5 ? 'geekblue' : 'green'"
      >
        {{ tag }}
      </a-tag>
    </span>
    <span slot="operation" slot-scope="text, record">
      <a-button @click="editProduct(record)"> 编辑 </a-button>
      <a-button @click="deleteProduct(record)"> 删除 </a-button>
    </span>
  </a-table>
</template>
<script>
const columns = [
  {
    title: "产品名称",
    dataIndex: "title",
    align: "center",
    ellipsis: true
  },
  {
    title: "描述",
    dataIndex: "desc",
    align: "center",
    ellipsis: true
  },
  {
    title: "类目",
    dataIndex: "category",
    align: "center",
    width: 100
  },
  {
    title: "预售价格",
    dataIndex: "price",
    align: "center",
    width: 100
  },
  {
    title: "折扣价格",
    dataIndex: "price_off",
    align: "center",
    width: 100
  },
  {
    title: "标签",
    dataIndex: "tags",
    align: "center",
    scopedSlots: { customRender: "tags" },
    width: 200,
    ellipsis: true
  },
  {
    title: "库存",
    dataIndex: "inventory",
    align: "center",
    width: 100
  },
  {
    title: "上架状态",
    dataIndex: "status",
    align: "center",
    width: 100
  },
  {
    title: "操作",
    dataIndex: "operation",
    align: "center",
    width: 160,
    scopedSlots: { customRender: "operation" }
  }
];

export default {
  props: {
    tableData: {
      type: Array,
      required: true
    },
    isLoading: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    columns
  }),
  methods: {
    editProduct(record) {
      this.$emit("edit", record);
    },
    deleteProduct(record) {
      this.$emit("delete", record);
    }
  }
};
</script>

<style lang="less" scoped>
.ant-table-wrapper {
  height: 560px;
}
</style>
