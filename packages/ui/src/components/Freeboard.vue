<script setup>
import { onMounted, ref, watch } from "vue";

import $ from "jquery";
window.$ = window.jQuery = $;

import Header from "./Header.vue";
import Board from "./Board.vue";

import { useFreeboardStore } from "../stores/freeboard";
import { useRouter } from "vue-router";
import { useQuery } from "@vue/apollo-composable";
import { DASHBOARD_QUERY } from "../gql";

const { id } = defineProps({
  id: String,
});

const idRef = ref(id);

const freeboardStore = useFreeboardStore();
const router = useRouter();

const { result } = useQuery(
  DASHBOARD_QUERY,
  {
    id: idRef.value,
  },
  {
    enabled: !!idRef.value,
  },
);

watch(result, (newResult, oldResult) => {
  if (!newResult.value?.data?.dashboard && idRef.value) {
    router.push("/");
  }
});

onMounted(() => {
  freeboardStore.createJSONDatasource();
  freeboardStore.createOpenWeatherMapDatasource();
  freeboardStore.createDweetioDatasource();
  freeboardStore.createPlaybackDatasource();
  freeboardStore.createMeshbluDatasource();

  freeboardStore.createTextWidget();
  freeboardStore.createGoogleMapWidget();
  freeboardStore.createGaugeWidget();
  freeboardStore.createHTMLWidget();
  freeboardStore.createPictureWidget();
  freeboardStore.createPointerWidget();
  freeboardStore.createSparklineWidget();

  freeboardStore.setAllowEdit(true);
  freeboardStore.setIsEditing(true);
  freeboardStore.showLoadingIndicator(false);
});
</script>

<template>
  <Header />
  <Board />
</template>
