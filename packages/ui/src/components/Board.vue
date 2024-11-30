<script setup lang="js">
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { GridLayout, GridItem } from "vue-grid-layout-v3";
import { useDashboardStore } from "../stores/dashboard";
import PaneUI from "./Pane.vue";
const dashboardStore = useDashboardStore();
const { headerImage, panes } = storeToRefs(dashboardStore);

const layout = ref([]);

watch(panes, () => {
  // const el = { x: 0, y: 0, w: 2, h: 2, i: "0" };
  const l = [];
  panes.value.forEach((pane, index) => {
    l.push({
      x: (panes.value.length * 2) % (index || 12),
      y: panes.value.length + (index || 12), // puts it at the bottom
      w: 2,
      h: 2,
      i: index,
      pane,
    });
  });

  layout.value = l;
});
</script>

<template>
  <div id="board-content">
    <img id="dash-logo" v-if="headerImage" :src="headerImage" />
    <GridLayout
      :layout="layout"
      :col-num="12"
      :row-height="30"
      :is-draggable="true"
      :is-resizable="true"
      :vertical-compact="true"
      :margin="[10, 10]"
      :use-css-transforms="true"
    >
      <GridItem
        v-for="item in layout"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :key="item.i"
      >
        <PaneUI :pane="item.pane" />
      </GridItem>
    </GridLayout>
  </div>
</template>
