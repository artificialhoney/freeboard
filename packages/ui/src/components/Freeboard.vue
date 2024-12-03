<script setup>
import { onMounted, ref, watch } from "vue";

import $ from "jquery";
window.$ = window.jQuery = $;

import Header from "./Header.vue";
import Board from "./Board.vue";

import { useFreeboardStore } from "../stores/freeboard";
import { useRouter } from "vue-router";
import { useQuery } from "@vue/apollo-composable";
import { DASHBOARD_READ_QUERY } from "../gql";
import { useDashboardStore } from "../stores/dashboard";
import { storeToRefs } from "pinia";
import Preloader from "./Preloader.vue";

const { id } = defineProps({
  id: String,
});

const idRef = ref(id);

const freeboardStore = useFreeboardStore();
const dashboardStore = useDashboardStore();

const { showLoadingIndicator } = storeToRefs(freeboardStore);

const router = useRouter();

const { result } = useQuery(
  DASHBOARD_READ_QUERY,
  {
    id: idRef.value,
  },
  {
    enabled: !!idRef.value,
  },
);

watch(result, (newResult, oldResult) => {
  const dashboard = newResult.dashboard;
  if (!dashboard && idRef.value) {
    router.push("/");
  } else if (dashboard) {
    idRef.value = dashboard._id;
    dashboardStore.deserialize(dashboard);
    freeboardStore.setIsSaved(true);
  }
});

onMounted(() => {
  freeboardStore.createJSONDatasource();
  freeboardStore.createClockDatasource();

  freeboardStore.createHTMLWidget();

  freeboardStore.toggleAllowEdit();
  freeboardStore.toggleIsEditing();
  freeboardStore.toggleLoadingIndicator();
});
</script>

<template>
  <Transition>
    <Preloader v-if="showLoadingIndicator" />
    <div v-else>
      <Header />
      <Board />
    </div>
  </Transition>
</template>
