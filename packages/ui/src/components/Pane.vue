<script setup lang="js">
import { useFreeboardStore } from "../stores/freeboard";
import { storeToRefs } from "pinia";
import ConfirmDialogBox from "./ConfirmDialogBox.vue";
import PaneDialogBox from "./PaneDialogBox.vue";
import WidgetDialogBox from "./WidgetDialogBox.vue";
import Widget from "./Widget.vue";
import { Widget as _Widget } from "../models/Widget";
import { getCurrentInstance } from "vue";

const freeboardStore = useFreeboardStore();
const { isEditing, dashboard } = storeToRefs(freeboardStore);

const openPaneEditDialogBox = (pane) => {
  freeboardStore.createComponent(PaneDialogBox, instance.appContext, {
    header: "Edit Pane",
    onOk: (newSettings) => {
      pane.title = newSettings.settings.name;
    },
    settings: { name: pane.title },
  });
};

const openPaneDeleteDialogBox = (pane) => {
  freeboardStore.createComponent(ConfirmDialogBox, instance.appContext, {
    title: "Pane",
    onOk: () => dashboard.value.deletePane(pane),
  });
};

const openWidgetAddDialogBox = (pane) => {
  freeboardStore.createComponent(WidgetDialogBox, instance.appContext, {
    header: "Add Widget",
    onOk: (newSettings) => {
      const newViewModel = new _Widget(newSettings.settings, newSettings.type);
      dashboard.value.addWidget(pane, newViewModel);
    },
  });
};

const { pane } = defineProps({ pane: Object });
const instance = getCurrentInstance();
</script>

<template>
  <div :style="{ cursor: isEditing ? 'pointer' : 'default' }" class="pane">
    <header>
      <h1>{{ pane.title }}</h1>
      <Transition>
        <ul v-if="isEditing" class="board-toolbar pane-tools">
          <li @click="() => openWidgetAddDialogBox(pane)">
            <i class="icon-white"><v-icon name="hi-plus" /></i>
          </li>
          <li @click="() => openPaneEditDialogBox(pane)">
            <i class="icon-white"><v-icon name="hi-clipboard-list" /></i>
          </li>
          <li @click="() => openPaneDeleteDialogBox(pane)">
            <i class="icon-white"><v-icon name="hi-trash" /></i>
          </li>
        </ul>
      </Transition>
    </header>
    <Widget v-for="widget in pane.widgets" :widget="widget" />
  </div>
</template>
