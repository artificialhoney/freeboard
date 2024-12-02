import { createRouter, createWebHistory } from "vue-router";
import Freeboard from "../components/Freeboard.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/:id?",
      name: "Home",
      component: Freeboard,
      props: true,
      sensitive: true,
    },
  ],
});

export default router;
