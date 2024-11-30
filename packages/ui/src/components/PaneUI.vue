<script setup lang="js">
import { onMounted, ref } from "vue";
import { Pane } from "../stores/dashboard";
import { useAppStore } from "../stores/app";
import { storeToRefs } from "pinia";
import WidgetUI from "./WidgetUI.vue";
const appStore = useAppStore();
const { isEditing } = storeToRefs(appStore);

onMounted(() => {
  if (isEditing) {
    appStore.showPaneEditIcons(true);
  }
});

const { pane } = defineProps({ pane: Pane });
</script>

<template>
  <div :style="{ cursor: isEditing && 'pointer' }">
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
