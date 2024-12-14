<script setup lang="js">
import { storeToRefs } from "pinia";
import { useFreeboardStore } from "../stores/freeboard";

const freeboardStore = useFreeboardStore();
const { dashboard } = storeToRefs(freeboardStore);
</script>

<template>
  <div class="column-toolbar" :class="`column-toolbar--${dashboard.width}`">
    <ul
      class="column-toolbar__board-toolbar column-toolbar__board-toolbar--left"
    >
      <li
        class="column-toolbar__board-toolbar__item"
        @click="() => dashboard.increaseMaxWidth()"
      >
        <i class="column-toolbar__board-toolbar__item__icon"
          ><v-icon name="hi-solid-chevron-double-left"></v-icon
        ></i>
      </li>
      <li
        class="column-toolbar__board-toolbar__item"
        @click="() => dashboard.decreaseMaxWidth()"
      >
        <i class="column-toolbar__board-toolbar__item__icon"
          ><v-icon name="hi-solid-chevron-double-right"></v-icon
        ></i>
      </li>
    </ul>
    <ul
      class="column-toolbar__board-toolbar column-toolbar__board-toolbar--right"
    >
      <li
        class="column-toolbar__board-toolbar__item"
        @click="() => dashboard.decreaseMaxWidth()"
      >
        <i class="column-toolbar__board-toolbar__item__icon"
          ><v-icon name="hi-solid-chevron-double-left"></v-icon
        ></i>
      </li>
      <li
        class="column-toolbar__board-toolbar__item"
        @click="() => dashboard.increaseMaxWidth()"
      >
        <i class="column-toolbar__board-toolbar__item__icon"
          ><v-icon name="hi-solid-chevron-double-right"></v-icon
        ></i>
      </li>
    </ul>
  </div>
</template>

<style lang="css" scoped>
@import url("../assets/css/components/column-toolbar.css");
</style>
