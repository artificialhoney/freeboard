<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useFreeboardStore } from "../stores/freeboard";
import Form from "./Form.vue";
import { getCurrentInstance, onMounted, ref } from "vue";
import DatasourcesDialogBox from "./DatasourcesDialogBox.vue";
import AuthProvidersDialogBox from "./AuthProvidersDialogBox.vue";
import SettingsDialogBox from "./SettingsDialogBox.vue";
import createSettings from "../settings";

const freeboardStore = useFreeboardStore();
const { dashboard } = storeToRefs(freeboardStore);

const fields = ref(createSettings(dashboard.value)[0].fields);
const settings = ref(dashboard.value);

const form = ref(null);

const openSettingsDialogBox = () => {
  freeboardStore.createComponent(SettingsDialogBox, instance.appContext, {
    onOk: (newSettings) => {
      dashboard.value.settings = newSettings.settings;
      settings.value = {
        title: newSettings.title,
        columns: newSettings.columns,
      };
      onChange(settings.value);
      freeboardStore.loadDashboardAssets();
    },
  });
};

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
</script>

<template>
  <div class="dashboard-control">
    <ul class="board-toolbar vertical">
      <li @click="() => openSettingsDialogBox()">
        <i class="icon-white"><v-icon name="hi-solid-cog" /></i
        ><label>Settings</label>
      </li>
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
    <div>
      <Form
        ref="form"
        :settings.sync="settings"
        :fields="fields"
        @change="onChange"
      />
    </div>
  </div>
</template>
