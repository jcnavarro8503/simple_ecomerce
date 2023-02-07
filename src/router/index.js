import { createRouter, createWebHistory } from "vue-router";

let routes = [
  {
    path: "/",
    redirect: "/store",
  },
  // ------------------------------------------------------- StorePage
  {
    path: "/store",
    name: "StorePage",
    layout: "store",
    component: () =>
      import(/* webpackChunkName: "StorePage" */ "../views/StorePage.vue"),
    meta: {},
  },
];

// Adding layout property from each route to the meta
// object so it can be accessed later.
function addLayoutToRoute(route, parentLayout = "store") {
  route.meta = route.meta || {};
  route.meta.layout = route.layout || parentLayout;

  if (route.children) {
    route.children = route.children.map((childRoute) =>
      addLayoutToRoute(childRoute, route.meta.layout)
    );
  }
  return route;
}

routes = routes.map((route) => addLayoutToRoute(route));

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      return {
        selector: to.hash,
        behavior: "smooth",
      };
    }
    return {
      x: 0,
      y: 0,
      behavior: "smooth",
    };
  },
});

export default router;
