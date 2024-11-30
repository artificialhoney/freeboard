<script setup lang="js">
import { onMounted } from "vue";
import { Pane } from "../stores/dashboard";
import { useFreeboardStore } from "../stores/freeboard";
import { storeToRefs } from "pinia";
import Widget from "./Widget.vue";
const freeboardStore = useFreeboardStore();
const { isEditing } = storeToRefs(freeboardStore);

onMounted(() => {
  if (isEditing) {
    freeboardStore.showPaneEditIcons(true);
  }
});

const { pane } = defineProps({ pane: Pane });
</script>

<template>
  <div :style="{ cursor: isEditing && 'pointer' }">
    <header>
      <h1>{{ pane.title }}</h1>
      <ul class="board-toolbar pane-tools">
        <li
          @click="
            () => freeboardStore.updatePluginEditor('add', 'widget', pane)
          "
        >
          <i class="icon-plus icon-white"></i>
        </li>
        <li
          @click="() => freeboardStore.updatePluginEditor('edit', 'pane', pane)"
        >
          <i class="icon-wrench icon-white"></i>
        </li>
        <li
          @click="
            () => freeboardStore.updatePluginEditor('delete', 'pane', pane)
          "
        >
          <i class="icon-trash icon-white"></i>
        </li>
      </ul>
    </header>
    <Widget v-for="widget in pane.widgets" :widget="widget" />
  </div>
</template>
