<script setup lang="js">
import { storeToRefs } from "pinia";
import { useFreeboardStore } from "../stores/freeboard";

const freeboardStore = useFreeboardStore();

const { isEditing } = storeToRefs(freeboardStore);
</script>

<template>
  <div class="toggle-header-button" @click="() => (isEditing = !isEditing)">
    <i class="toggle-header-button__icon"
      ><v-icon
        class="toggle-header-button__icon__svg"
        :name="isEditing ? 'hi-solid-chevron-up' : 'hi-solid-cog'"
      ></v-icon
    ></i>
  </div>
</template>

<style lang="css" scoped>
@import url("../assets/css/components/toggle-header-button.css");
</style>
