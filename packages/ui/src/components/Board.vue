<script setup lang="js">
import { storeToRefs } from "pinia";
import { GridLayout, GridItem } from "vue-grid-layout-v3";
import { useFreeboardStore } from "../stores/freeboard";
import Pane from "./Pane.vue";

const freeboardStore = useFreeboardStore();
const { dashboard, isEditing } = storeToRefs(freeboardStore);
</script>

<template>
  <div class="board">
    <img
      class="board__dash-logo"
      v-if="dashboard.image"
      :src="dashboard.image"
    />
    <GridLayout
      :class="`board__grid board__grid--${dashboard.width}`"
      v-model:layout="dashboard.layout"
      :col-num="dashboard.columns"
      :row-height="30"
      :is-draggable="isEditing"
      :is-resizable="isEditing"
      :vertical-compact="true"
      :is-bounded="true"
      :margin="[20, 20]"
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
        <Pane :pane="pane" />
      </GridItem>
    </GridLayout>
  </div>
</template>

<style lang="css" scoped>
@import url("../assets/css/components/board.css");
</style>
