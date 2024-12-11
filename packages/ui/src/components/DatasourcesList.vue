<script setup lang="js">
import { storeToRefs } from "pinia";
import { useFreeboardStore } from "../stores/freeboard";
import DatasourceDialogBox from "./DatasourceDialogBox.vue";
import ConfirmDialogBox from "./ConfirmDialogBox.vue";
import { Datasource } from "../models/Datasource";
import { getCurrentInstance } from "vue";

const freeboardStore = useFreeboardStore();
const { dashboard } = storeToRefs(freeboardStore);

const openDatasourceEditDialogBox = (datasource) => {
  freeboardStore.createComponent(DatasourceDialogBox, instance.appContext, {
    header: "Edit Datasource",
    settings: { ...datasource.settings, name: datasource.name },
    type: datasource.type,
    onOk: (newSettings) => {
      datasource.name = newSettings.settings.name;
      delete newSettings.settings.name;
      datasource.settings = newSettings.settings;
      datasource.type = newSettings.type;
    },
  });
};

const openDatasourceDeleteDialogBox = (datasource) => {
  freeboardStore.createComponent(ConfirmDialogBox, instance.appContext, {
    title: "Datasource",
    onOk: () => {
      dashboard.value.deleteDatasource(datasource);
    },
  });
};

const openDatasourceAddDialogBox = () => {
  freeboardStore.createComponent(DatasourceDialogBox, instance.appContext, {
    header: "Add Datasource",
    onOk: (newSettings) => {
      const newViewModel = new Datasource();

      newViewModel.name = newSettings.settings.name;
      delete newSettings.settings.name;

      newViewModel.settings = newSettings.settings;
      newViewModel.type = newSettings.type;

      dashboard.value.addDatasource(newViewModel);
    },
  });
};

const instance = getCurrentInstance();
</script>

<template>
  <div class="datasources">
    <div class="datasource-list-container">
      <table
        class="table table-condensed sub-table"
        id="datasources-list"
        v-if="dashboard.datasources.length"
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Last Updated</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="datasource in dashboard.datasources">
            <td>
              <span
                class="text-button datasource-name"
                @click="() => openDatasourceEditDialogBox(datasource)"
                >{{ datasource.name }}</span
              >
            </td>
            <td>{{ datasource.lastUpdated }}</td>
            <td>
              <ul class="board-toolbar">
                <li @click="() => datasource.updateNow()">
                  <i class="icon-white"><v-icon name="hi-refresh"></v-icon></i>
                </li>
                <li @click="() => openDatasourceDeleteDialogBox(datasource)">
                  <i class="icon-white"><v-icon name="hi-trash"></v-icon></i>
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <span
      class="text-button table-operation"
      @click="() => openDatasourceAddDialogBox()"
      >ADD</span
    >
  </div>
</template>
