import axios from "./axios";

export const getProductList = (searchWord, category, page, size) => {
  return axios.get("/products/all", {
    params: {
      searchWord,
      category,
      page,
      size
    }
  });
};

export const getProductDetail = id => {
  return axios.get("/products/" + id);
};

export const deleteProduct = id => {
  return axios.delete("/products/" + id);
};

export const addProduct = productInfo => {
  return axios.post("/products/add", {
    ...productInfo
  });
};

export const editProduct = info => {
  return axios.put("/products/edit", { ...info });
};

export const uploadImage = data => {
  return axios.post("/upload/images", data, {
    "Content-Type": "multipart/form-data"
  });
};
