import { createApp, provide, h } from "vue";
import { DefaultApolloClient } from "@vue/apollo-composable";
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from "@apollo/client/core";
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
  HiVariable,
  HiSolidHome,
  HiSolidArchive,
} from "oh-vue-icons/icons";

import { createPinia, storeToRefs } from "pinia";
import router from "./router";
import { useFreeboardStore } from "./stores/freeboard";
import { SSELink } from "./sse";
import { createHead } from "@unhead/vue";

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
  HiVariable,
  HiSolidHome,
  HiSolidArchive,
);

const head = createHead();

const pinia = createPinia();

const cache = new InMemoryCache();

const getHeaders = () => {
  const headers = {};
  const freeboardStore = useFreeboardStore();
  const { token } = storeToRefs(freeboardStore);
  if (token.value) {
    headers["Authorization"] = `Bearer ${token.value}`;
  }
  headers["Content-Type"] = "application/json";
  return headers;
};

const httpLink = new HttpLink({
  uri: `/graphql`,
  fetch: (uri, options) => {
    options.headers = getHeaders();
    return fetch(uri, options);
  },
});

const sseLink = new SSELink({
  url: `/graphql`,
  headers: getHeaders,
});

const apolloClient = new ApolloClient({
  cache,
  link: ApolloLink.split(
    (operation) => operation.getContext().apiName === "stream",
    sseLink,
    httpLink,
  ),
});

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient);
  },

  render: () => h(App),
})
  .use(pinia)
  .use(router)
  .use(head)
  .use(VueMonacoEditorPlugin, { monaco })
  .component("v-icon", OhVueIcon)
  .mount("#app");
