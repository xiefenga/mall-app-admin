<template>
  <div class="product-add">
    <add-steps @next="next" @submit="submitProduct">
      <template #basic>
        <basic-edit :formData="formData" ref="basic" @submit="handleSubmit" />
      </template>
      <template #sale>
        <sale-edit :formData="formData" ref="selling" @submit="handleSubmit" />
      </template>
      <template #confirm>
        <product-confirm :formData="formData" />
      </template>
    </add-steps>
  </div>
</template>

<script>
import { addProduct } from "@/api";
import { product } from "@/entities";
import AddSteps from "@/components/ProductAddSteps";
import SaleEdit from "@/components/ProductSaleEdit";
import BasicEdit from "@/components/ProductBasicEdit";
import ProductConfirm from "@/components/ProductConfirm";
export default {
  components: {
    AddSteps,
    BasicEdit,
    SaleEdit,
    ProductConfirm
  },
  data: () => ({
    formData: { ...product }
  }),
  methods: {
    next(cb) {
      if (this.$refs.basic) {
        if (this.$refs.basic.onValidate()) {
          cb();
        }
      } else if (this.$refs.selling) {
        if (this.$refs.selling.onValidate()) {
          cb();
        }
      }
    },
    handleSubmit(formData) {
      this.formData = {
        ...this.formData,
        ...formData
      };
    },
    async submitProduct() {
      const productInfo = {
        ...this.formData
      };
      productInfo.status = 1;
      const { status, msg } = await addProduct(productInfo);
      if (status === "success") {
        await this.$message.success("添加成功", 2);
        this.$router.push("/product/list");
      } else {
        this.$message.error(msg);
      }
    }
  },
  created() {
    this.$store.dispatch("updateCategories");
  }
};
</script>

<style lang="less" scoped>
.product-add {
  padding: 50px 100px 0 100px;
}
</style>
