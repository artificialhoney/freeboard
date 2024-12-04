<script setup lang="js">
import {
  Pane,
  useDashboardStore,
  Widget as _Widget,
} from "../stores/dashboard";
import { useFreeboardStore } from "../stores/freeboard";
import { storeToRefs } from "pinia";
import ConfirmDialogBox from "./ConfirmDialogBox.vue";
import PaneDialogBox from "./PaneDialogBox.vue";
import WidgetDialogBox from "./WidgetDialogBox.vue";
import Widget from "./Widget.vue";

const freeboardStore = useFreeboardStore();
const dashboardStore = useDashboardStore();
const { isEditing } = storeToRefs(freeboardStore);

const openPaneEditDialogBox = (pane) => {
  freeboardStore.createComponent(PaneDialogBox, {
    header: "Edit Pane",
    onOk: (newSettings) => {
      pane.title = newSettings.settings.name;
    },
    settings: { name: pane.title },
  });
};

const openPaneDeleteDialogBox = (pane) => {
  freeboardStore.createComponent(ConfirmDialogBox, {
    title: "Pane",
    onOk: () => dashboardStore.deletePane(pane),
  });
};

const openWidgetAddDialogBox = (pane) => {
  freeboardStore.createComponent(WidgetDialogBox, {
    header: "Add Widget",
    onOk: (newSettings) => {
      const newViewModel = new _Widget();

      newViewModel.settings = newSettings.settings;
      newViewModel.type = newSettings.type;

      dashboardStore.addWidget(pane, newViewModel);
    },
  });
};

const { pane } = defineProps({ pane: Pane });
</script>

<template>
  <div :style="{ cursor: isEditing ? 'pointer' : 'default' }">
    <header>
      <h1>{{ pane.title }}</h1>
      <Transition>
        <ul v-if="isEditing" class="board-toolbar pane-tools">
          <li @click="() => openWidgetAddDialogBox(pane)">
            <i class="icon-plus icon-white"></i>
          </li>
          <li @click="() => openPaneEditDialogBox(pane)">
            <i class="icon-wrench icon-white"></i>
          </li>
          <li @click="() => openPaneDeleteDialogBox(pane)">
            <i class="icon-trash icon-white"></i>
          </li>
        </ul>
      </Transition>
    </header>
    <Widget v-for="widget in pane.widgets" :widget="widget" />
  </div>
</template>
