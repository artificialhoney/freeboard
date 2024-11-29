<script setup lang="js">
import { onMounted, ref, onBeforeUnmount } from "vue";
import { Pane } from "../stores/dashboard";
import { useAppStore } from "../stores/app";
import { storeToRefs } from "pinia";
import WidgetUI from "./WidgetUI.vue";
const appStore = useAppStore();
const { isEditing } = storeToRefs(appStore);

const panel = ref(null);

onBeforeUnmount(() => {
  appStore.removeWidget(panel.value);
});

onMounted(() => {
  let position = appStore.getPositionForScreenSize(pane);
  let col = position.col;
  let row = position.row;
  let width = Number(pane.width);
  let height = Number(pane.getCalculatedHeight());

  appStore.addWidget(panel.value, width, height, col, row);

  if (isEditing) {
    $(panel.value).css({ cursor: "pointer" });
    appStore.showPaneEditIcons(true);
  }

  appStore.updatePositionForScreenSize(pane, row, col);
});

const { pane } = defineProps({ pane: Pane });
</script>

<template>
  <div ref="panel">
    <header>
      <h1>{{ pane.title }}</h1>
      <ul class="board-toolbar pane-tools">
        <li @click="() => appStore.updatePluginEditor('add', 'widget', pane)">
          <i class="icon-plus icon-white"></i>
        </li>
        <li @click="() => appStore.updatePluginEditor('edit', 'pane', pane)">
          <i class="icon-wrench icon-white"></i>
        </li>
        <li @click="() => appStore.updatePluginEditor('delete', 'pane', pane)">
          <i class="icon-trash icon-white"></i>
        </li>
      </ul>
    </header>
    <WidgetUI v-for="widget in pane.widgets" :widget="widget" />
  </div>
</template>
