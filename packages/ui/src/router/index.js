import { createRouter, createWebHistory } from "vue-router";
import Freeboard from "../components/Freeboard.vue";
import Login from "../components/Login.vue";
import { useFreeboardStore } from "../stores/freeboard";

let router;

if (__FREEBOARD_STATIC__) {
  router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: "/",
        name: "Home",
        component: Freeboard,
        props: true,
        sensitive: true,
      }
    ],
  });
} else {
  router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
      {
        path: "/login",
        name: "Login",
        component: Login,
        props: true,
        sensitive: true,
      },
      {
        path: "/",
        name: "Home",
        component: Freeboard,
        props: true,
        sensitive: true,
      },
      {
        path: "/:id",
        name: "Freeboard",
        component: Freeboard,
        props: true,
        sensitive: true,
      },
    ],
  });

  router.beforeEach(async (to, from) => {
    const freeboardStore = useFreeboardStore();
    freeboardStore.loadSettingsFromLocalStorage();
    if (!freeboardStore.isLoggedIn() && to.name === "Home") {
      return { name: "Login" };
    } else if (freeboardStore.isLoggedIn() && to.name === "Login") {
      return { name: "Home" };
    }
  });
}
export default router;
