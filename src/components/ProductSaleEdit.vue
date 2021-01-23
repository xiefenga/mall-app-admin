<template>
  <div class="sale-info">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 14 }"
    >
      <a-row type="flex" justify="space-around">
        <a-col :span="10">
          <a-form-model-item label="商品售价" prop="price">
            <a-input-number
              :step="0.1"
              v-model="form.price"
              :formatter="priceFormatter"
              :parser="priceParser"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="10">
          <a-form-model-item label="折扣价格" prop="price_off">
            <a-input-number
              :disabled="!price_offAllow"
              :step="0.1"
              v-model="form.price_off"
              :formatter="priceFormatter"
              :parser="priceParser"
            />
            <a-checkbox
              :checked="price_offAllow"
              @change="price_offAllowChange"
            >
              {{ price_offAllow ? "给打折" : "不打折" }}
            </a-checkbox>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row type="flex" justify="space-around">
        <a-col :span="10">
          <a-form-model-item label="商品库存" prop="inventory">
            <a-input-number
              v-model="form.inventory"
              :formatter="inventoryFormatter"
              :parser="inventoryParser"
            />
          </a-form-model-item>
        </a-col>
        <a-col :span="10">
          <a-form-model-item label="计量单位" prop="unit">
            <a-select v-model="form.unit" placeholder="选择计量单位">
              <a-select-option v-for="unit in units" :key="unit" :value="unit">
                {{ unit }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
      </a-row>
      <a-row type="flex">
        <a-col :span="20" :offset="1">
          <a-form-model-item
            label="商品相册"
            :label-col="{ span: 4 }"
            :wrapper-col="{ span: 20 }"
          >
            <a-upload
              multiple
              listType="picture-card"
              :fileList="form.images"
              :customRequest="upload"
              :remove="remove"
            >
              <div>
                <a-icon type="plus" />
                <div class="ant-upload-text">
                  上传图片
                </div>
              </div>
            </a-upload>
          </a-form-model-item>
        </a-col>
      </a-row>
    </a-form-model>
  </div>
</template>

<script>
import { uploadImage } from "@/api";
import { productSellingRules as rules } from "@/validateRules";
export default {
  props: {
    formData: {
      validator(value) {
        if (typeof value === "object") {
          const { price, price_off, inventory, unit, images } = value;
          return ["number", "string"].includes(typeof price) &&
            ["number", "string"].includes(typeof price_off) &&
            ["number", "string"].includes(typeof inventory) &&
            typeof unit === "string" &&
            Array.isArray(images) &&
            images.length
            ? typeof images[0] === "string"
              ? true
              : typeof images[0] === "object"
              ? "url" in images[0]
                ? true
                : false
              : false
            : true;
        }
        return false;
      }
    }
  },
  created() {
    this.backfill();
  },
  watch: {
    formData() {
      this.backfill();
    }
  },
  data() {
    return {
      price_offAllow: false,
      rules,
      units: ["kg", "g", "L", "ml"],
      form: {
        price: 100,
        // price_off: "",
        inventory: 100
        // unit: "",
        // images: []
      }
    };
  },
  methods: {
    backfill() {
      const { price, price_off, inventory, unit, images } = this.formData;
      this.price_offAllow = Boolean(price_off);
      this.form = {
        price: price || this.form.price,
        price_off: price_off || this.form.price_off,
        inventory: inventory || this.form.inventory,
        unit: unit || undefined,
        images: images.map((image, i) => {
          if (typeof image === "string") {
            return {
              uid: image, // 文件唯一标识
              name: `image-${i}.jpg`,
              status: "done",
              url: image
            };
          } else {
            return {
              uid: image.uid || image.url,
              name: image.name || `image-${i}.jpg`,
              satus: "done",
              url: image.url
            };
          }
        })
      };
    },
    onValidate() {
      let result = false;
      this.$refs.ruleForm.validate(valid => (result = valid));
      result &&
        this.$emit("submit", {
          ...this.form,
          price_off: this.price_offAllow ? this.form.price_off : "",
          images: this.form.images.map(i => i.url)
        });
      return result;
    },
    price_offAllowChange(e) {
      this.price_offAllow = e.target.checked;
    },
    async upload({ file }) {
      const formDate = new FormData();
      formDate.append("avatar", file);
      try {
        const { data } = await uploadImage(formDate);
        this.form.images.push({ ...data, uid: data.url });
      } catch (error) {
        this.$message.error("图片太大或者格式不正确" + error.message);
      }
    },
    remove(file) {
      const index = this.form.images.indexOf(file);
      this.form.images.splice(index, 1);
    },
    priceFormatter(value) {
      return `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    priceParser(value) {
      return value.replace(/￥\s?|(,*)/g, "");
    },
    inventoryFormatter(value) {
      return `${value} 件`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    inventoryParser(value) {
      return value.replace(/\$\s?|(,*)/g, "");
    }
  }
};
</script>

<style lang="less" scoped>
.ant-checkbox-wrapper {
  margin-left: 5px;
  /deep/ .ant-checkbox + span {
    padding: 0;
  }
}
</style>
