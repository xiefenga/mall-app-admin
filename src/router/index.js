import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import routes from "./routes";
import { confirmLoginStatus } from "@/util";
import { syncRoutes } from "./routes";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  if (to.path === "/login") {
    next();
  } else if (!confirmLoginStatus(store)) {
    next("/login");
  } else {
    if (syncRoutes(router, store)) {
      next(to.path);
    } else {
      next();
    }
  }
});

export default router;
