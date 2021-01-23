import axios from "./axios";

export const getCategories = () => {
  return axios.get("/category/all");
};

export const addCategory = (id, name, c_items) => {
  return axios.post("/category/add", {
    id,
    name,
    c_items
  });
};

export const editCategory = (id, name, c_items) => {
  return axios.put("/category/edit", {
    id,
    name,
    c_items
  });
};

export const deleteCategory = id => {
  return axios.delete("/category/" + id);
};
