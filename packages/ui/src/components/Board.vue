<script setup lang="js">
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { GridLayout, GridItem } from "vue-grid-layout-v3";
import { useDashboardStore } from "../stores/dashboard";
import PaneUI from "./Pane.vue";
const dashboardStore = useDashboardStore();
const { headerImage, panes, width, layout } = storeToRefs(dashboardStore);

const cols = ref(4);

watch(panes, () => {
  const l = [];
  panes.value.forEach((pane, index) => {
    if (index < layout.value.length) {
      l.push(layout.value[index]);
    } else {
      l.push({
        x: index % cols.value,
        y: Math.floor(index / cols.value),
        w: 1,
        h: 1,
        i: index,
        pane,
      });
    }
    layout.value = l;
  });
});
</script>

<template>
  <div class="board-content">
    <img class="dash-logo" v-if="headerImage" :src="headerImage" />
    <GridLayout
      :class="`responsive-column-width-${width}`"
      v-model:layout="layout"
      :col-num="cols"
      :row-height="30"
      :is-draggable="true"
      :is-resizable="true"
      :vertical-compact="true"
      :is-bounded="true"
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
        :is-draggable="true"
        :is-resizable="true"
        :key="item.i"
      >
        <PaneUI :pane="item.pane" />
      </GridItem>
    </GridLayout>
  </div>
</template>
