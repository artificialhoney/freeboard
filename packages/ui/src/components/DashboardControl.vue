<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useFreeboardStore } from "../stores/freeboard";
import Form from "./Form.vue";
import { MAX_COLUMNS, MIN_COLUMNS } from "../models/Dashboard";
import { computed, onMounted, ref, watch } from "vue";
import DatasourcesDialogBox from "./DatasourcesDialogBox.vue";

const freeboardStore = useFreeboardStore();
const { dashboard } = storeToRefs(freeboardStore);

const fields = ref([
  {
    name: "title",
    label: "Title",
    type: "text",
    required: true,
  },
  {
    name: "columns",
    label: "Columns",
    type: "option",
    required: true,
    options: [...Array(MAX_COLUMNS).keys()]
      .filter((i) => i >= MIN_COLUMNS - 1)
      .map((i) => ({ value: i + 1, label: i + 1 })),
  },
]);

const settings = ref({
  title: dashboard.value.title,
  columns: dashboard.value.columns,
});

const form = ref(null);

onMounted(() => {
  watch(form.value.model, (model) => {
    dashboard.value.columns = parseInt(model.columns);
    dashboard.value.title = model.title;
  });
});

const openDatasourcesDialogBox = () => {
  freeboardStore.createComponent(DatasourcesDialogBox);
};
</script>

<template>
  <div class="dashboard-control">
    <ul class="board-toolbar vertical">
      <li @click="() => openDatasourcesDialogBox()">
        <i class="icon-folder-open icon-white"></i><label>Add Datasource</label>
      </li>
      <li class="add-pane" @click="() => dashboard.createPane()">
        <i class="icon-plus icon-white"></i><label>Add Pane</label>
      </li>
    </ul>
    <Form ref="form" :settings="settings" :fields="fields" />
  </div>
</template>
