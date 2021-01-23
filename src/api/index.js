export { default as axios } from "./axios";

export {
  login,
  logon,
  resetPassword,
  changeUserInfo,
  getCode
} from "./passport";

export {
  getProductList,
  getProductDetail,
  deleteProduct,
  addProduct,
  editProduct,
  uploadImage
} from "./product";

export {
  getCategories,
  addCategory,
  editCategory,
  deleteCategory
} from "./category";
