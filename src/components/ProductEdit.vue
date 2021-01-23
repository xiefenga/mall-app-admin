<template>
  <transition :duration="500">
    <div class="product-edit" v-if="show">
      <div class="edit-content">
        <div class="close" @click="close">
          <a-icon type="close" />
        </div>
        <basic-edit :formData="formData" ref="basic" @submit="handleSubmit" />
        <sale-edit :formData="formData" ref="selling" @submit="handleSubmit" />
        <a-button type="primary" @click="submitEdit">
          提交
        </a-button>
      </div>
    </div>
  </transition>
</template>

<script>
import { product } from "@/entities";
import { getProductDetail, editProduct } from "@/api";
import SaleEdit from "./ProductSaleEdit";
import BasicEdit from "./ProductBasicEdit";

export default {
  props: {
    productId: {
      type: Number,
      required: true
    },
    show: {
      type: Boolean,
      required: true
    }
  },
  components: {
    BasicEdit,
    SaleEdit
  },
  watch: {
    show(val) {
      if (val === true) {
        getProductDetail(this.productId).then(res => {
          const { data } = res;
          this.formData = {
            ...data
          };
          ["appkey", "__v", "updateTime"].forEach(item =>
            this.$delete(this.formData, item)
          );
        });
      }
    }
  },
  data: () => ({
    formData: { ...product }
  }),
  methods: {
    close() {
      this.$emit("close");
    },
    handleSubmit(formData) {
      this.formData = {
        ...this.formData,
        ...formData
      };
    },
    async submitEdit() {
      if (this.$refs.basic.onValidate() && this.$refs.selling.onValidate()) {
        const productInfo = {
          ...this.formData
        };
        const { status, msg } = await editProduct(productInfo);
        if (status === "success") {
          await this.$message.success("修改成功", 1);
          this.close();
          this.$emit("edit");
        } else {
          this.$message.error(msg);
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.product-edit {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  .edit-content {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    width: 60%;
    padding: 30px 0;
    border-radius: 10px;
    text-align: center;
    .close {
      position: absolute;
      top: 1%;
      right: 1%;
      width: 30px;
      height: 30px;
      line-height: 30px;
      font-size: 20px;
      cursor: pointer;
      border-radius: 5px;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: rgb(163, 162, 162);
        color: #fff;
      }
    }
  }

  &.v-enter,
  &.v-leave-to {
    .edit-content {
      top: -100%;
    }
  }

  &.v-enter-active,
  &.v-leave-active {
    .edit-content {
      transition: 0.5s ease-in-out;
    }
  }

  &.v-enter-to,
  &.v-leave {
    .edit-content {
      top: 50%;
    }
  }
}
</style>
