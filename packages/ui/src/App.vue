<script lang="js" setup>
import "./assets/css/app.css";
import { RouterView } from "vue-router";

import { useHead } from "@unhead/vue";
import { useFreeboardStore } from "./stores/freeboard";
import { storeToRefs } from "pinia";
import { watch } from "vue";

const freeboardStore = useFreeboardStore();
const { dashboard } = storeToRefs(freeboardStore);

useHead({
  title: () =>
    dashboard.value ? `${dashboard.value.title} | Freeboard` : "Freeboard",
});
</script>

<template>
  <RouterView />
</template>
