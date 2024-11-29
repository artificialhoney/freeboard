<script setup>
import { onMounted, ref } from "vue";

import $ from "jquery";
window.$ = window.jQuery = $;
import "~/jquery-ui/dist/jquery-ui";
import "../jquery.plugins.js";
import * as _ from "underscore";
window._ = _;
import FreeboardUI from "./FreeboardUI.vue";

import { useAppStore } from "../stores/app";

const appStore = useAppStore();

const ui = ref(null);

onMounted(() => {
  appStore.createJSONDatasource();
  appStore.createOpenWeatherMapDatasource();
  appStore.createDweetioDatasource();
  appStore.createPlaybackDatasource();
  appStore.createMeshbluDatasource();

  appStore.createTextWidget();
  appStore.createGoogleMapWidget();
  appStore.createGaugeWidget();
  appStore.createHTMLWidget();
  appStore.createPictureWidget();
  appStore.createPointerWidget();
  appStore.createSparklineWidget();

  let resizeTimer;

  function resizeEnd() {
    appStore.processResize(false);
  }

  $(window).resize(function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resizeEnd, 500);
  });

  appStore.setAllowEdit(true);
  appStore.setIsEditing(true);
  appStore.showLoadingIndicator(false);
});
</script>

<template>
  <FreeboardUI ref="ui" />
</template>
