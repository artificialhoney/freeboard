<script setup lang="js">
import { storeToRefs } from "pinia";
import { useFreeboardStore } from "../stores/freeboard";
import { useMutation } from "@vue/apollo-composable";
import { DASHBOARD_CREATE_MUTATION, DASHBOARD_UPDATE_MUTATION } from "../gql";
import { useRouter } from "vue-router";

const freeboardStore = useFreeboardStore();
const { dashboard } = storeToRefs(freeboardStore);

const { mutate: createDashboard } = useMutation(DASHBOARD_CREATE_MUTATION);
const { mutate: updateDashboard } = useMutation(DASHBOARD_UPDATE_MUTATION);

const router = useRouter();

const saveDashboard = async () => {
  const d = dashboard.value.serialize();
  const id = d._id;
  delete d._id;
  const { isSaved } = storeToRefs(freeboardStore);
  if (isSaved.value) {
    updateDashboard({ id, dashboard: d });
  } else {
    const result = await createDashboard({ dashboard: d });
    router.push(`/${result.data.createDashboard._id}`);
  }
};
</script>
<template>
  <div class="freeboard-control">
    <ul class="board-toolbar vertical">
      <li @click="saveDashboard">
        <i class="icon-white"><v-icon name="hi-cloud-upload" /></i
        ><label>Save Freeboard</label>
      </li>
      <li @click="() => freeboardStore.loadDashboardFromLocalFile()">
        <i class="icon-white"><v-icon name="hi-download" /></i
        ><label>Import Freeboard</label>
      </li>
      <li @click="() => freeboardStore.exportDashboard()">
        <i class="icon-white"><v-icon name="hi-upload" /></i>
        <label>Export Freeboard</label>
      </li>
    </ul>
  </div>
</template>
