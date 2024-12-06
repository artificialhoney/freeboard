<script setup lang="js">
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { GridLayout, GridItem } from "vue-grid-layout-v3";
import { useFreeboardStore } from "../stores/freeboard";
import PaneUI from "./Pane.vue";

const freeboardStore = useFreeboardStore();
const { dashboard, isEditing } = storeToRefs(freeboardStore);
</script>

<template>
  <div class="board-content">
    <img class="dash-logo" v-if="dashboard.image" :src="dashboard.image" />
    <GridLayout
      :class="`responsive-column-width-${dashboard.width}`"
      v-model:layout="dashboard.layout"
      :col-num="dashboard.columns"
      :row-height="30"
      :is-draggable="isEditing"
      :is-resizable="isEditing"
      :vertical-compact="true"
      :is-bounded="true"
      :margin="[10, 10]"
      :use-css-transforms="true"
    >
      <GridItem
        v-for="(pane, index) in dashboard.panes"
        :x="pane.layout.x"
        :y="pane.layout.y"
        :w="pane.layout.w"
        :h="pane.layout.h"
        :i="pane.layout.i"
        :key="index"
      >
        <PaneUI :pane="pane" />
      </GridItem>
    </GridLayout>
  </div>
</template>
