import { createApp, provide, h } from "vue";
import { createMemoryHistory, createRouter } from "vue-router";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import App from "./App.vue";

import { createPinia } from "pinia";
import Freeboard from "./components/Freeboard.vue";

const routes = [
  { path: "/:id", component: Freeboard },
  { path: "/", component: Freeboard },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

const pinia = createPinia();

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  cache,
  uri: "/graphql",
});

createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },

  render: () => h(App),
})
  .use(pinia)
  .use(router)
  .mount("#app");
