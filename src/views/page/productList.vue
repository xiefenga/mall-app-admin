<template>
  <div class="product-list">
    <search-bar @search="handleSearch" :categories="categoryList" />
    <product-table
      :isLoading="isLoading"
      :tableData="productsData"
      @edit="editProduct"
      @delete="deleteProduct"
    />
    <a-locale-provider :locale="zhCN">
      <a-pagination
        showSizeChanger
        hideOnSinglePage
        :current="currentPage"
        :total="total"
        :pageSizeOptions="pageSizeOptions"
        :pageSize.sync="pageSize"
        @change="handlePageChange"
        @showSizeChange="handlePageSizeChange"
      />
    </a-locale-provider>
    <product-edit
      :show="edit"
      :productId="productId"
      @close="edit = false"
      @edit="generateProductsDate"
    />
  </div>
</template>

<script>
import { mapState } from "vuex";
import SearchBar from "@/components/SearchBar";
import ProductEdit from "@/components/ProductEdit";
import ProductTable from "@/components/ProductTable";
import { getProductList, deleteProduct } from "@/api";
import zhCN from "ant-design-vue/es/locale-provider/zh_CN";
export default {
  components: {
    SearchBar,
    ProductEdit,
    ProductTable
  },
  data: () => ({
    keyword: "",
    category: "",
    productsData: [],
    currentPage: 1,
    pageSize: 10,
    total: 0,
    isLoading: false,
    pageSizeOptions: ["10", "15", "20"],
    zhCN,
    edit: false,
    productId: 0
  }),
  methods: {
    handleSearch({ keyword, category }) {
      this.keyword = keyword;
      this.category = category;
      this.currentPage = 1;
      this.generateProductsDate();
    },
    async generateProductsDate() {
      this.isLoading = true;
      const { keyword, category, currentPage, pageSize } = this;
      const {
        data: { data, total }
      } = await getProductList(keyword, category, currentPage, pageSize);
      this.total = total;
      this.productsData = data
        .filter(p => p.id)
        .map(p => ({
          key: p.id,
          id: p.id,
          category: this.categories.find(c => c.id === p.category).name,
          desc: p.desc,
          price: p.price,
          price_off: p.price_off || "无折扣",
          inventory: p.inventory,
          status: p.status ? "上架" : "未上架",
          tags: p.tags,
          title: p.title
        }));
      this.isLoading = false;
    },
    editProduct(product) {
      this.productId = product.id;
      this.edit = true;
    },
    deleteProduct(product) {
      this.$confirm({
        title: "删除商品",
        content: `确认删除商品 ${product.title} 吗`,
        okText: "确认",
        cancelText: "取消",
        onOk: () => {
          deleteProduct(product.id).then(res => {
            if (res.status === "success") {
              this.$message
                .success("删除成功", 1)
                .then(() => this.handlePageChange(1));
            } else {
              this.$message.error(res.msg);
            }
          });
        }
      });
    },
    handlePageChange(page) {
      this.currentPage = page;
      this.generateProductsDate();
    },
    handlePageSizeChange() {
      this.handlePageChange(1);
    }
  },
  computed: {
    categoryList() {
      return this.categories.map(c => ({
        id: c.id,
        name: c.name
      }));
    },
    ...mapState(["categories"])
  },
  async created() {
    await this.$store.dispatch("updateCategories");
    this.generateProductsDate();
  }
};
</script>

<style lang="less" scoped>
.product-list {
  .ant-pagination {
    margin-top: 15px;
    margin-right: 50px;
    text-align: right;
  }
}
</style>
