<script setup lang="js">
import { storeToRefs } from "pinia";
import { useDashboardStore } from "../stores/dashboard";
import { useFreeboardStore } from "../stores/freeboard";
import DatasourceDialogBox from "./DatasourceDialogBox.vue";
import ConfirmDialogBox from "./ConfirmDialogBox.vue";
import { Datasource } from "../models/Datasource";

const freeboardStore = useFreeboardStore();
const dashboardStore = useDashboardStore();
const { datasources } = storeToRefs(dashboardStore);

const openDatasourceEditDialogBox = (datasource) => {
  freeboardStore.createComponent(DatasourceDialogBox, {
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
  freeboardStore.createComponent(ConfirmDialogBox, {
    title: "Datasource",
    onOk: () => {
      dashboardStore.deleteDatasource(datasource);
    },
  });
};

const openDatasourceAddDialogBox = () => {
  freeboardStore.createComponent(DatasourceDialogBox, {
    header: "Add Datasource",
    onOk: (newSettings) => {
      const newViewModel = new Datasource();

      newViewModel.name = newSettings.settings.name;
      delete newSettings.settings.name;

      newViewModel.settings = newSettings.settings;
      newViewModel.type = newSettings.type;

      dashboardStore.addDatasource(newViewModel);
    },
  });
};
</script>

<template>
  <div class="datasources">
    <!--<h2 class="title">DATASOURCES</h2>-->
    <div class="datasource-list-container">
      <table
        class="table table-condensed sub-table"
        id="datasources-list"
        v-if="datasources.length"
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Last Updated</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody v-for="datasource in datasources">
          <tr>
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
                  <i class="icon-refresh icon-white"></i>
                </li>
                <li @click="() => openDatasourceDeleteDialogBox(datasource)">
                  <i class="icon-trash icon-white"></i>
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
