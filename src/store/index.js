import Vue from "vue";
import Vuex from "vuex";
import { getCategories } from "@/api";
import { resumeIsAdd } from "@/router/routes";
import { setLoginUser, removeUser } from "@/util";

Vue.use(Vuex);

const defalutUser = {
  appkey: "",
  email: "",
  role: "",
  username: ""
};

export default new Vuex.Store({
  state: {
    user: defalutUser,
    menuRoutes: [],
    categories: []
  },
  mutations: {
    setUser(state, userInfo) {
      state.user = userInfo;
    },
    setMenuRoutes(state, routes) {
      state.menuRoutes = routes;
    },
    setCategories(state, categories) {
      state.categories = categories;
    }
  },
  actions: {
    login({ commit }, userInfo) {
      commit("setUser", userInfo);
      setLoginUser(userInfo);
    },
    loginOut({ commit }) {
      commit("setUser", defalutUser);
      commit("setMenuRoutes", []);
      resumeIsAdd();
      removeUser();
    },
    async updateCategories({ commit }) {
      const {
        data: { data }
      } = await getCategories();
      commit("setCategories", data);
    }
  }
});
