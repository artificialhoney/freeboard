<script setup>
import { onMounted, ref } from "vue";

import $ from "jquery";
window.$ = window.jQuery = $;

import Header from "./Header.vue";
import Board from "./Board.vue";

import { useFreeboardStore } from "../stores/freeboard";

const freeboardStore = useFreeboardStore();

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
