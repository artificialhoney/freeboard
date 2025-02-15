<script setup>
import { reactive, ref, watch } from "vue";
import Header from "./Header.vue";
import Board from "./Board.vue";
import { useFreeboardStore } from "../stores/freeboard";
import { useRouter } from "vue-router";
import { useQuery, useSubscription } from "@vue/apollo-composable";
import { DASHBOARD_READ_QUERY, DASHBOARD_UPDATE_SUBSCRIPTION } from "../gql";
import { storeToRefs } from "pinia";
import Preloader from "./Preloader.vue";
import { ClockDatasource } from "../datasources/ClockDatasource";
import { JSONDatasource } from "../datasources/JSONDatasource";
import { HeaderAuthProvider } from "../auth/HeaderAuthProvider";
import { OAuth2Provider } from "../auth/OAuth2Provider";
import { usePreferredColorScheme } from "@vueuse/core";
import { BaseWidget } from "../widgets/BaseWidget";

const freeboardStore = useFreeboardStore();

const cssClass = usePreferredColorScheme();

watch(
  cssClass,
  () => {
    freeboardStore.loadDashboardTheme();
  },
  { immediate: true },
);

const { id } = defineProps({
  id: String,
});

const idRef = ref(id);

const { showLoadingIndicator, isEditing, isSaved, dashboard } =
  storeToRefs(freeboardStore);

const router = useRouter();

const { onResult } = useSubscription(
  DASHBOARD_UPDATE_SUBSCRIPTION,
  () => ({
    id: idRef.value,
  }),
  {
    context: {
      apiName: "stream",
    },
    enabled: !!idRef.value,
  },
);

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

const handleResult = (newResult) => {
  showLoadingIndicator.value = false;
  const dashboard = newResult.dashboard;
  if (!dashboard && idRef.value) {
    isEditing.value = true;
    router.push("/");
  } else if (dashboard) {
    idRef.value = dashboard._id;
    freeboardStore.loadDashboard(dashboard);
    isSaved.value = true;
  }
};

watch(result, handleResult);
onResult((result) => handleResult(result.data));

const d = reactive(dashboard.value);

watch(d, () => {
  freeboardStore.saveSettingsToLocalStorage();
})

freeboardStore.loadSettingsFromLocalStorage(!idRef.value);
freeboardStore.loadDashboardAssets();
freeboardStore.loadDashboardTheme();
freeboardStore.loadAuthPlugin(HeaderAuthProvider);
freeboardStore.loadAuthPlugin(OAuth2Provider);
freeboardStore.loadDatasourcePlugin(JSONDatasource);
freeboardStore.loadDatasourcePlugin(ClockDatasource);
freeboardStore.loadWidgetPlugin(BaseWidget);

freeboardStore.allowEdit = __FREEBOARD_STATIC__ || freeboardStore.isLoggedIn();
freeboardStore.isEditing = __FREEBOARD_STATIC__ || freeboardStore.isLoggedIn();

showLoadingIndicator.value = false;
</script>

<template>
  <Transition>
    <div class="freeboard">
      <Preloader v-if="showLoadingIndicator" />
      <Header v-if="!showLoadingIndicator" />
      <Board v-if="!showLoadingIndicator" />
    </div>
  </Transition>
</template>

<style lang="css" scoped>
@import url("../assets/css/components/freeboard.css");
</style>
