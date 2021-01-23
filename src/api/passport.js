import axios from "./axios";

export const login = (email, password) => {
  return axios.post("/passport/login", {
    email,
    password
  });
};

export const logon = logonInfo => {
  return axios.post("/passport/logon", { ...logonInfo });
};

export const resetPassword = (email, password, code) => {
  return axios.post("/passport/findBack", {
    email,
    password,
    code
  });
};

export const changeUserInfo = newInfo => {
  const { newPassword, role, ...info } = newInfo;
  newPassword && (info.newPassword = newPassword);
  role && (info.role = role);
  return axios.post("/passport/changeUserInfo", { ...info });
};

export const getCode = email => {
  return axios.post("/passport/getCode", { email });
};
