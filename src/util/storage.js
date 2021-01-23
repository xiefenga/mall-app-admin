export const setLoginUser = userInfo => {
  window.localStorage.setItem("user", JSON.stringify(userInfo));
};

export const removeUser = () => {
  window.localStorage.removeItem("user");
};

export const getUserInfo = () => {
  return window.localStorage.getItem("user");
};
