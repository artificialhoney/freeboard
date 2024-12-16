<script setup lang="js">
import { useFreeboardStore } from "../stores/freeboard";
import { storeToRefs } from "pinia";
import ConfirmDialogBox from "./ConfirmDialogBox.vue";
import PaneDialogBox from "./PaneDialogBox.vue";
import WidgetDialogBox from "./WidgetDialogBox.vue";
import Widget from "./Widget.vue";
import { Widget as _Widget } from "../models/Widget";
import { getCurrentInstance } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const freeboardStore = useFreeboardStore();
const { isEditing, dashboard } = storeToRefs(freeboardStore);

const openPaneEditDialogBox = (pane) => {
  freeboardStore.createComponent(PaneDialogBox, instance.appContext, {
    header: t("pane.titleEdit"),
    onOk: (newSettings) => {
      pane.title = newSettings.settings.name;
    },
    settings: { name: pane.title },
  });
};

const openPaneDeleteDialogBox = (pane) => {
  freeboardStore.createComponent(ConfirmDialogBox, instance.appContext, {
    title: t("pane.titleDelete"),
    onOk: () => dashboard.value.deletePane(pane),
  });
};

const openWidgetAddDialogBox = (pane) => {
  freeboardStore.createComponent(WidgetDialogBox, instance.appContext, {
    header: t("pane.titleAdd"),
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
    <header class="pane__header">
      <h1>{{ pane.title }}</h1>
      <Transition>
        <ul v-if="isEditing" class="pane__header__board-toolbar">
          <li
            @click="() => openWidgetAddDialogBox(pane)"
            class="pane__header__board-toolbar__item"
          >
            <i class="pane__header__board-toolbar__item__icon"
              ><v-icon name="hi-plus"
            /></i>
          </li>
          <li
            @click="() => openPaneEditDialogBox(pane)"
            class="pane__header__board-toolbar__item"
          >
            <i class="pane__header__board-toolbar__item__icon"
              ><v-icon name="hi-clipboard-list"
            /></i>
          </li>
          <li
            @click="() => openPaneDeleteDialogBox(pane)"
            class="pane__header__board-toolbar__item"
          >
            <i class="pane__header__board-toolbar__item__icon"
              ><v-icon name="hi-trash"
            /></i>
          </li>
        </ul>
      </Transition>
    </header>
    <Widget v-for="widget in pane.widgets" :widget="widget" />
  </div>
</template>

<style lang="css" scoped>
@import url("../assets/css/components/pane.css");
</style>
