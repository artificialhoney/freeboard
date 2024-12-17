<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useFreeboardStore } from "../stores/freeboard";
import Form from "./Form.vue";
import { getCurrentInstance, onMounted, ref, watch } from "vue";
import DatasourcesDialogBox from "./DatasourcesDialogBox.vue";
import AuthProvidersDialogBox from "./AuthProvidersDialogBox.vue";
import SettingsDialogBox from "./SettingsDialogBox.vue";
import createSettings from "../settings";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const freeboardStore = useFreeboardStore();
const { dashboard } = storeToRefs(freeboardStore);

const fields = ref(createSettings(dashboard.value, t)[0].fields);
const settings = ref({});

const form = ref(null);

watch(
  dashboard,
  (d) => {
    settings.value = d;
  },
  {
    immediate: true,
  },
);

const openSettingsDialogBox = () => {
  freeboardStore.createComponent(SettingsDialogBox, instance.appContext, {
    onOk: (newSettings) => {
      dashboard.value.settings = newSettings.settings;
      settings.value = {
        title: newSettings.title,
        columns: newSettings.columns,
        published: newSettings.published,
      };
      onChange(settings.value);
      freeboardStore.loadDashboardAssets();
      freeboardStore.loadDashboardTheme();
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
  dashboard.value.published = s.published;
};

const instance = getCurrentInstance();
</script>

<template>
  <div class="dashboard-control">
    <ul
      class="dashboard-control__board-toolbar dashboard-control__board-toolbar"
    >
      <li
        @click="() => openSettingsDialogBox()"
        class="dashboard-control__board-toolbar__item"
      >
        <i class="dashboard-control__board-toolbar__item__icon"
          ><v-icon name="hi-solid-cog" /></i
        ><label class="dashboard-control__board-toolbar__item__label">{{
          $t("dashboardControl.labelSettings")
        }}</label>
      </li>
      <li
        @click="() => openDatasourcesDialogBox()"
        class="dashboard-control__board-toolbar__item"
      >
        <i class="dashboard-control__board-toolbar__item__icon"
          ><v-icon name="hi-database" /></i
        ><label class="dashboard-control__board-toolbar__item__label">{{
          $t("dashboardControl.labelDatasources")
        }}</label>
      </li>
      <li
        @click="() => openAuthProvidersDialogBox()"
        class="dashboard-control__board-toolbar__item"
      >
        <i class="dashboard-control__board-toolbar__item__icon"
          ><v-icon name="hi-eye" /></i
        ><label class="dashboard-control__board-toolbar__item__label">{{
          $t("dashboardControl.labelAuth")
        }}</label>
      </li>
      <li
        @click="() => dashboard.createPane()"
        class="dashboard-control__board-toolbar__item"
      >
        <i class="dashboard-control__board-toolbar__item__icon"
          ><v-icon name="hi-plus-circle" /></i
        ><label class="dashboard-control__board-toolbar__item__label">{{
          $t("dashboardControl.labelAddPane")
        }}</label>
      </li>
    </ul>
    <div class="dashboard-control__form">
      <Form
        ref="form"
        :settings="settings"
        :fields="fields"
        @change="onChange"
      />
    </div>
  </div>
</template>

<style lang="css" scoped>
@import url("../assets/css/components/dashboard-control.css");
</style>
