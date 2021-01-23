const greaterThanZero = tip => (rule, value, callback) => {
  value < 0 ? callback(new Error(tip)) : callback();
};

const mustBeInteger = tip => (rule, value, callback) => {
  Number.isInteger(value) ? callback() : callback(new Error(tip));
};

const validator = (v, tip) => v(tip);

export const productBasicRule = {
  title: [{ required: true, message: "请输入商品的标题" }],
  category: [{ required: true, message: "请选择商品种类" }],
  tags: [{ required: true, message: "请添加标签" }]
};

export const productSellingRules = {
  price: [
    { required: true, message: "请输入商品价格" },
    { validator: validator(greaterThanZero, "价格不能低于0") }
  ],
  price_off: [{ validator: validator(greaterThanZero, "价格不能低于0") }],
  inventory: [
    { required: true, message: "请输入商品库存" },
    { validator: validator(greaterThanZero, "库存必须为正数") },
    { validator: validator(mustBeInteger, "库存必须为整数") }
  ],
  unit: [{ required: true, message: "请填写计量单位" }]
};
