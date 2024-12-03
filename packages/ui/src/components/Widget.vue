<script setup lang="js">
import { useFreeboardStore } from "../stores/freeboard";
import WidgetDialogBox from "./WidgetDialogBox.vue";

const freeboardStore = useFreeboardStore();

const openWidgetEditDialogBox = (widget) => {
  freeboardStore.createDialogBox(WidgetDialogBox, {
    header: "Edit Widget",
    onOk: (newSettings) => {
      widget.settings = newSettings.settings;
      widget.type = newSettings.type;
    },
  });
};

const openWidgetDeleteDialogBox = (widget) => {
  freeboardStore.createDialogBox(ConfirmDialogBox, {
    title: "Widget",
    onOk: () => {
      freeboardStore.deleteWidget(widget.pane, widget);
    },
  });
};

const { widget } = defineProps({
  widget: Object,
});
</script>

<template>
  <section>
    <div class="sub-section">
      <div class="widget">
        {{ widget.settings.title }}
      </div>
      <Transition>
        <div class="sub-section-tools">
          <ul class="board-toolbar">
            <li @click="() => widget.pane.moveWidgetUp(widget)">
              <i class="icon-chevron-up icon-white"></i>
            </li>
            <li @click="() => widget.pane.moveWidgetDown(widget)">
              <i class="icon-chevron-down icon-white"></i>
            </li>
            <li @click="() => openWidgetEditDialogBox(widget)">
              <i class="icon-wrench icon-white"></i>
            </li>
            <li @click="() => openWidgetDeleteDialogBox(widget)">
              <i class="icon-trash icon-white"></i>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  </section>
</template>
