<script setup>
import { onMounted, ref, watch } from "vue";

import Header from "./Header.vue";
import Board from "./Board.vue";
import { useFreeboardStore } from "../stores/freeboard";
import { useRouter } from "vue-router";
import { useQuery } from "@vue/apollo-composable";
import { DASHBOARD_READ_QUERY } from "../gql";
import { storeToRefs } from "pinia";
import Preloader from "./Preloader.vue";
import { ClockDatasource } from "../datasources/ClockDatasource";
import { JSONDatasource } from "../datasources/JSONDatasource";
import { TemplateWidget } from "../widgets/TemplateWidget";
import { HeaderAuthProvider } from "../auth/HeaderAuthProvider";
import { OAuth2Provider } from "../auth/OAuth2Provider";

const { id } = defineProps({
  id: String,
});

const idRef = ref(id);

const freeboardStore = useFreeboardStore();

const { showLoadingIndicator } = storeToRefs(freeboardStore);

const router = useRouter();

const { result, loading, error } = useQuery(
  DASHBOARD_READ_QUERY,
  {
    id: idRef.value,
  },
  {
    enabled: !!idRef.value,
  },
);

watch(error, (e) => {
  router.push("/");
});

watch(loading, (l) => {
  showLoadingIndicator.value = l;
});

watch(result, (newResult) => {
  showLoadingIndicator.value = false;
  const dashboard = newResult.dashboard;
  if (!dashboard && idRef.value) {
    freeboardStore.toggleIsEditing();
    router.push("/");
  } else if (dashboard) {
    idRef.value = dashboard._id;
    freeboardStore.loadDashboard(dashboard);
    freeboardStore.setIsSaved(true);
  }
});

freeboardStore.loadSettingsFromLocalStorage();
freeboardStore.loadAuthPlugin(HeaderAuthProvider);
freeboardStore.loadAuthPlugin(OAuth2Provider);
freeboardStore.loadDatasourcePlugin(JSONDatasource);
freeboardStore.loadDatasourcePlugin(ClockDatasource);
freeboardStore.loadWidgetPlugin(TemplateWidget);

freeboardStore.toggleAllowEdit();
freeboardStore.toggleIsEditing();

showLoadingIndicator.value = false;
</script>

<template>
  <Transition>
    <div class="app-container">
      <Preloader v-if="showLoadingIndicator" />
      <Header v-if="freeboardStore.isLoggedIn() && !showLoadingIndicator" />
      <Board v-if="!showLoadingIndicator" />
    </div>
  </Transition>
</template>
