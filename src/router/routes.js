import Home from "@/views/layout/Home";
import Login from "@/views/layout/Login";

const routes = [
  {
    path: "/",
    component: Home,
    meta: {
      title: "首页",
      icon: "home"
    },
    children: [
      {
        path: "/",
        name: "Index",
        meta: {
          title: "统计",
          icon: "number"
        },
        component: () => import("@/views/page/index.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  }
];

const baseRoute = {
  path: "/product",
  name: "Product",
  meta: {
    title: "商品",
    icon: "inbox"
  },
  component: Home
};

const baseRouteChildren = [
  {
    path: "list",
    name: "ProductList",
    meta: {
      title: "商品列表",
      icon: "unordered-list"
    },
    component: () => import("@/views/page/productList.vue")
  },
  {
    path: "add",
    name: "ProductAdd",
    meta: {
      title: "添加商品",
      icon: "file-add"
    },
    component: () => import("@/views/page/productAdd.vue")
  }
];

const adminRoutesChildren = [
  ...baseRouteChildren,
  {
    path: "category",
    name: "Category",
    meta: {
      title: "类目管理",
      icon: "project"
    },
    component: () => import("@/views/page/category.vue")
  }
];

const coustomerRoutes = [
  {
    ...baseRoute,
    children: baseRouteChildren
  }
];
const adminRoutes = [
  {
    ...baseRoute,
    children: adminRoutesChildren
  }
];

export const routesMap = new Map([
  ["coustomer", coustomerRoutes],
  ["admin", adminRoutes],
  ["customer", coustomerRoutes]
]);

let isAdd = false;

export const syncRoutes = (router, store) => {
  if (isAdd) return false;
  const {
    user: { role }
  } = store.state;
  const roleRoutes = routesMap.get(role);
  router.addRoutes(roleRoutes);
  store.commit("setMenuRoutes", [routes[0], ...roleRoutes]);
  isAdd = true;
  return true;
};

export const resumeIsAdd = () => (isAdd = false);

export default routes;
