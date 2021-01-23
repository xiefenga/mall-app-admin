import { getUserInfo } from "./storage";

export const confirmLoginStatus = store => {
  const {
    user: { appkey, email, role, username }
  } = store.state;
  if (!appkey || !email || !role || !username) {
    const userInfo = getUserInfo();
    if (userInfo) {
      store.commit("setUser", JSON.parse(userInfo));
      return true;
    }
    return false;
  }
  return true;
};
