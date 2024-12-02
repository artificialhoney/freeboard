import { createApp, provide, h } from "vue";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import App from "./App.vue";

import { createPinia } from "pinia";
import router from "./router";

const pinia = createPinia();

const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  cache,
  uri: "/graphql",
});

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },

  render: () => h(App),
})
  .use(pinia)
  .use(router)
  .mount("#app");
