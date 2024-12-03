<script setup lang="js">
import { Pane, useDashboardStore } from "../stores/dashboard";
import { useFreeboardStore } from "../stores/freeboard";
import { storeToRefs } from "pinia";
import Widget from "./Widget.vue";
import ConfirmDialogBox from "./ConfirmDialogBox.vue";
import PaneDialogBox from "./PaneDialogBox.vue";
import WidgetDialogBox from "./WidgetDialogBox.vue";
const freeboardStore = useFreeboardStore();
const dashboardStore = useDashboardStore();
const { isEditing } = storeToRefs(freeboardStore);

const openPaneEditDialogBox = (pane) => {
  freeboardStore.createDialogBox(PaneDialogBox, {
    header: "Edit Pane",
    onOk: (newSettings) => {
      pane.title = newSettings.settings.title;
      pane.colWidth = newSettings.settings.colWidth;
    },
  });
};

const openPaneDeleteDialogBox = (pane) => {
  freeboardStore.createDialogBox(ConfirmDialogBox, {
    title: "Pane",
    onOk: () => dashboardStore.deletePane(pane),
  });
};

const openWidgetAddDialogBox = (pane) => {
  freeboardStore.createDialogBox(WidgetDialogBox, {
    header: "Add Widget",
    onOk: (newSettings) => {
      const newViewModel = new Widget();

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
