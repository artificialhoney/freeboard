<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useFreeboardStore } from "../stores/freeboard";
import Form from "./Form.vue";
import { MAX_COLUMNS, MIN_COLUMNS } from "../models/Dashboard";
import { computed, getCurrentInstance, onMounted, ref, watch } from "vue";
import DatasourcesDialogBox from "./DatasourcesDialogBox.vue";
import AuthProvidersDialogBox from "./AuthProvidersDialogBox.vue";

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

const settings = ref({});

const form = ref(null);

const applySettings = () => {
  settings.value = {
    columns: dashboard.value.columns,
    title: dashboard.value.title,
  };
};

watch(dashboard, applySettings);
onMounted(applySettings);

const openDatasourcesDialogBox = () => {
  freeboardStore.createComponent(DatasourcesDialogBox, instance.appContext);
};

const openAuthProvidersDialogBox = () => {
  freeboardStore.createComponent(AuthProvidersDialogBox, instance.appContext);
};

const onChange = (s) => {
  dashboard.value.columns = parseInt(s.columns);
  dashboard.value.title = s.title;
};

const instance = getCurrentInstance();
console.log(instance);
</script>

<template>
  <div class="dashboard-control">
    <ul class="board-toolbar vertical">
      <li @click="() => openDatasourcesDialogBox()">
        <i class="icon-white"><v-icon name="hi-database" /></i
        ><label>Datasources</label>
      </li>
      <li @click="() => openAuthProvidersDialogBox()">
        <i class="icon-white"><v-icon name="hi-eye" /></i><label>Auth</label>
      </li>
      <li class="add-pane" @click="() => dashboard.createPane()">
        <i class="icon-white"><v-icon name="hi-plus-circle" /></i
        ><label>Add Pane</label>
      </li>
    </ul>
    <Form
      ref="form"
      :settings="dashboard"
      :fields="fields"
      @change="onChange"
    />
  </div>
</template>
