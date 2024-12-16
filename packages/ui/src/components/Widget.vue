<script setup lang="js">
import { storeToRefs } from "pinia";
import { useFreeboardStore } from "../stores/freeboard";
import WidgetDialogBox from "./WidgetDialogBox.vue";
import { getCurrentInstance, onMounted, onUpdated, ref, watch } from "vue";
import ConfirmDialogBox from "./ConfirmDialogBox.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const freeboardStore = useFreeboardStore();
const { isEditing, dashboard } = storeToRefs(freeboardStore);

const widgetRef = ref(null);

const openWidgetEditDialogBox = (widget) => {
  freeboardStore.createComponent(WidgetDialogBox, instance.appContext, {
    header: t("widget.titleEdit"),
    settings: widget.settings,
    type: widget.type,
    onOk: (newSettings) => {
      widget.settings = newSettings.settings;
      widget.type = newSettings.type;
      render();
    },
  });
};

const openWidgetDeleteDialogBox = (widget) => {
  freeboardStore.createComponent(ConfirmDialogBox, instance.appContext, {
    title: t("widget.titleDelete"),
    onOk: () => {
      dashboard.value.deleteWidget(widget.pane, widget);
    },
  });
};

const { widget } = defineProps({
  widget: Object,
});

const render = () => {
  if (!widget.shouldRender || !widgetRef.value) {
    return;
  }
  widget.render(widgetRef.value);
};

onMounted(render);

const instance = getCurrentInstance();
</script>

<template>
  <section class="widget">
    <div class="widget__sub-section">
      <div ref="widgetRef" class="widget__sub-section__widget-output"></div>
      <Transition>
        <ul class="widget__sub-section__board-toolbar" v-if="isEditing">
          <li
            @click="() => widget.pane.moveWidgetUp(widget)"
            class="widget__sub-section__board-toolbar__item"
          >
            <i class="widget__sub-section__board-toolbar__item__icon"
              ><v-icon name="hi-solid-chevron-up"></v-icon
            ></i>
          </li>
          <li
            @click="() => widget.pane.moveWidgetDown(widget)"
            class="widget__sub-section__board-toolbar__item"
          >
            <i class="widget__sub-section__board-toolbar__item__icon"
              ><v-icon name="hi-solid-chevron-down"></v-icon
            ></i>
          </li>
          <li
            @click="() => openWidgetEditDialogBox(widget)"
            class="widget__sub-section__board-toolbar__item"
          >
            <i class="widget__sub-section__board-toolbar__item__icon"
              ><v-icon name="hi-solid-cog"></v-icon
            ></i>
          </li>
          <li
            @click="() => openWidgetDeleteDialogBox(widget)"
            class="widget__sub-section__board-toolbar__item"
          >
            <i class="widget__sub-section__board-toolbar__item__icon"
              ><v-icon name="hi-trash"></v-icon
            ></i>
          </li>
        </ul>
      </Transition>
    </div>
  </section>
</template>

<style lang="css" scoped>
@import url("../assets/css/components/widget.css");
</style>
