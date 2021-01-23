const product = {
  title: "",
  desc: "",
  category: "",
  c_item: "", // 子类目
  tags: [],
  price: "",
  price_off: "", // 折扣价格
  unit: "", // 计量单位
  status: 0, // 上架 1 下架 0
  images: [],
  inventory: 0 // 库存
};

const category = {
  name: "",
  id: "",
  c_items: [] // 子类目
};

// class Product {
//   constructor(info) {
//     for (const key in product) {
//       if (Object.hasOwnProperty.call(product, key)) {
//         this[key] = product[key];
//       }
//     }
//     info.status = 1;
//     info.c_items = info.c_items || [];
//     info.images = this.formData.images.map(i => i.url);
//     info.price_off = info.price_off || info.price;
//   }
// }

export { product, category };
