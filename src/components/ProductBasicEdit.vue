<template>
  <div class="basic-info">
    <a-form-model
      ref="ruleForm"
      :model="form"
      :rules="rules"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 14 }"
    >
      <a-form-model-item label="标题" prop="title">
        <a-input v-model="form.title" placeholder="请输入标题" />
      </a-form-model-item>
      <a-form-model-item label="商品描述">
        <a-input v-model="form.desc" placeholder="请输入商品描述" />
      </a-form-model-item>
      <a-form-model-item label="商品类目" prop="category">
        <a-select
          ref="category"
          placeholder="请选择商品种类"
          v-model="form.category"
          @change="handleCategoryChange"
          allowClear
        >
          <a-select-option v-for="c in categories" :key="c.id" :value="c.id">
            {{ c.name }}
          </a-select-option>
        </a-select>
        <a-select
          ref="subCategory"
          placeholder="请选择子类目"
          v-model="form.c_item"
          allowClear
        >
          <a-select-option
            v-for="c in selectedCategory.c_items"
            :key="c"
            :value="c"
          >
            {{ c }}
          </a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="商品标签" prop="tags">
        <a-select mode="tags" placeholder="请添加标签" v-model="form.tags" />
      </a-form-model-item>
    </a-form-model>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { productBasicRule as rules } from "@/validateRules";
export default {
  props: {
    formData: {
      validator(value) {
        if (typeof value === "object") {
          const { title, desc, category, c_item, tags } = value;
          return (
            typeof title === "string" &&
            typeof desc === "string" &&
            ["number", "string"].includes(typeof category) &&
            (typeof c_item === "string" || c_item === null) &&
            Array.isArray(tags)
          );
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
      rules,
      form: {
        // title: "",
        // desc: "",
        // category: "",
        // c_item: "",
        // tags: []
      }
    };
  },
  computed: {
    selectedCategory() {
      return this.categories.find(c => c.id === this.form.category) || {};
    },
    ...mapState(["categories"])
  },
  methods: {
    onValidate() {
      let result = false;
      this.$refs.ruleForm.validate(valid => (result = valid));
      result &&
        this.$emit("submit", {
          ...this.form,
          c_item: this.form.c_item || ""
        });
      return result;
    },
    handleCategoryChange() {
      this.form.c_item = undefined;
    },
    backfill() {
      const { title, desc, category, c_item, tags } = this.formData;
      this.form = {
        title,
        desc,
        category: category || undefined,
        c_item: c_item || undefined,
        tags: tags && tags.length ? tags : undefined
      };
      // undefined 是为了让 selet 显示 placeholder
    }
  }
};
</script>
