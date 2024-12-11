import { createApp, provide, h } from "vue";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import App from "./App.vue";
import monaco from "./monaco";
import { install as VueMonacoEditorPlugin } from "@guolao/vue-monaco-editor";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
  HiDatabase,
  HiEye,
  HiCloudUpload,
  HiPlusCircle,
  HiDownload,
  HiUpload,
  HiPlus,
  HiClipboardList,
  HiTrash,
  HiSolidChevronUp,
  HiSolidCog,
  HiCode,
  HiSolidChevronDown,
  HiRefresh,
  HiSolidChevronDoubleLeft,
  HiSolidChevronDoubleRight,
} from "oh-vue-icons/icons";

import { createPinia } from "pinia";
import router from "./router";

addIcons(
  HiDatabase,
  HiEye,
  HiCloudUpload,
  HiPlusCircle,
  HiDownload,
  HiUpload,
  HiPlus,
  HiClipboardList,
  HiTrash,
  HiSolidChevronUp,
  HiSolidCog,
  HiCode,
  HiSolidChevronDown,
  HiRefresh,
  HiSolidChevronDoubleLeft,
  HiSolidChevronDoubleRight,
);

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
  .use(VueMonacoEditorPlugin, { monaco })
  .component("v-icon", OhVueIcon)
  .mount("#app");
