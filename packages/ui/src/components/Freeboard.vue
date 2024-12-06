<script setup>
import { onMounted, ref, watch } from "vue";

import Header from "./Header.vue";
import Board from "./Board.vue";
import { useFreeboardStore } from "../stores/freeboard";
import { useRouter } from "vue-router";
import { useQuery } from "@vue/apollo-composable";
import { DASHBOARD_READ_QUERY } from "../gql";
import { storeToRefs } from "pinia";
import Preloader from "./Preloader.vue";
import { ClockDatasource } from "../datasources/ClockDatasource";
import { JSONDatasource } from "../datasources/JSONDatasource";
import { TemplateWidget } from "../widgets/TemplateWidget";
import { Dashboard } from "../models/Dashboard";

const { id } = defineProps({
  id: String,
});

const idRef = ref(id);

const freeboardStore = useFreeboardStore();

const { showLoadingIndicator } = storeToRefs(freeboardStore);

const router = useRouter();

const { result } = useQuery(
  DASHBOARD_READ_QUERY,
  {
    id: idRef.value,
  },
  {
    enabled: !!idRef.value,
  },
);

watch(result, (newResult) => {
  const dashboard = newResult.dashboard;
  if (!dashboard && idRef.value) {
    router.push("/");
  } else if (dashboard) {
    idRef.value = dashboard._id;
    const d = new Dashboard();
    d.deserialize(dashboard);
    freeboardStore.dashboard = d;
    freeboardStore.setIsSaved(true);
  }
});

onMounted(() => {
  freeboardStore.loadDatasourcePlugin(JSONDatasource);
  freeboardStore.loadDatasourcePlugin(ClockDatasource);
  freeboardStore.loadWidgetPlugin(TemplateWidget);

  freeboardStore.toggleAllowEdit();
  freeboardStore.toggleIsEditing();
  freeboardStore.toggleLoadingIndicator();
});
</script>

<template>
  <Transition>
    <div class="app-container">
      <Preloader v-if="showLoadingIndicator" />
      <Header v-if="!showLoadingIndicator" />
      <Board v-if="!showLoadingIndicator" />
    </div>
  </Transition>
</template>
