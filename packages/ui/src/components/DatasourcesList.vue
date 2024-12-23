<script setup lang="js">
import { storeToRefs } from "pinia";
import { useFreeboardStore } from "../stores/freeboard";
import DatasourceDialogBox from "./DatasourceDialogBox.vue";
import ConfirmDialogBox from "./ConfirmDialogBox.vue";
import { Datasource } from "../models/Datasource";
import { getCurrentInstance } from "vue";
import TextButton from "./TextButton.vue";
import { useI18n } from "vue-i18n";
import ActionButton from "./ActionButton.vue";

const { t } = useI18n();

const freeboardStore = useFreeboardStore();
const { dashboard } = storeToRefs(freeboardStore);

const openDatasourceEditDialogBox = (datasource) => {
  freeboardStore.createComponent(DatasourceDialogBox, instance.appContext, {
    header: t("datasourcesList.titleEdit"),
    datasource,
    onOk: (newSettings) => {
      datasource.title = newSettings.title;
      datasource.enabled = newSettings.enabled;
      datasource.settings = newSettings.settings;
      datasource.type = newSettings.type;
    },
  });
};

const openDatasourceDeleteDialogBox = (datasource) => {
  freeboardStore.createComponent(ConfirmDialogBox, instance.appContext, {
    title: t("datasourcesList.titleDelete"),
    onOk: () => {
      dashboard.value.deleteDatasource(datasource);
    },
  });
};

const openDatasourceAddDialogBox = () => {
  freeboardStore.createComponent(DatasourceDialogBox, instance.appContext, {
    header: t("datasourcesList.titleAdd"),
    onOk: (newSettings) => {
      const newViewModel = new Datasource();
      newViewModel.title = newSettings.title;
      newViewModel.enabled = newSettings.enabled;
      newViewModel.settings = newSettings.settings;
      newViewModel.type = newSettings.type;

      dashboard.value.addDatasource(newViewModel);
    },
  });
};

const instance = getCurrentInstance();
</script>

<template>
  <div class="datasources-list">
    <table class="datasources-list__table" v-if="dashboard.datasources.length">
      <thead class="datasources-list__table__head">
        <tr class="datasources-list__table__head__row">
          <th class="datasources-list__table__head__row__cell">
            {{ t("datasourcesList.labelName") }}
          </th>
          <th class="datasources-list__table__head__row__cell">
            {{ t("datasourcesList.labelLastUpdated") }}
          </th>
          <th class="datasources-list__table__head__row__cell">&nbsp;</th>
        </tr>
      </thead>
      <tbody class="datasources-list__table__body">
        <tr
          v-for="datasource in dashboard.datasources"
          class="datasources-list__table__body__row"
        >
          <td class="datasources-list__table__body__row__cell">
            <TextButton
              @click="() => openDatasourceEditDialogBox(datasource)"
              >{{ datasource.title }}</TextButton
            >
          </td>
          <td class="datasources-list__table__body__row__cell">
            {{ datasource.lastUpdated }}
          </td>
          <td class="datasources-list__table__body__row__cell">
            <ul class="datasources-list__table__body__row__cell__board-toolbar">
              <li
                @click="() => datasource.updateNow()"
                class="datasources-list__table__body__row__cell__board-toolbar__item"
              >
                <i
                  class="datasources-list__table__body__row__cell__board-toolbar__item__icon"
                  ><v-icon name="hi-refresh"></v-icon
                ></i>
              </li>
              <li
                @click="() => openDatasourceDeleteDialogBox(datasource)"
                class="datasources-list__table__body__row__cell__board-toolbar__item"
              >
                <i
                  class="datasources-list__table__body__row__cell__board-toolbar__item__icon"
                  ><v-icon name="hi-trash"></v-icon
                ></i>
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="datasources-list__operations">
      <ActionButton @click="() => openDatasourceAddDialogBox()">{{
        t("datasourcesList.buttonAdd")
      }}</ActionButton>
    </div>
  </div>
</template>

<style lang="css" scoped>
@import url("../assets/css/components/datasources-list.css");
</style>
