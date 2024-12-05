<script setup lang="js">
import { storeToRefs } from "pinia";
import { useFreeboardStore } from "../stores/freeboard";
import WidgetDialogBox from "./WidgetDialogBox.vue";
import { onMounted, onUpdated, ref, watch } from "vue";

const freeboardStore = useFreeboardStore();
const { isEditing } = storeToRefs(freeboardStore);

const widgetRef = ref(null);

const openWidgetEditDialogBox = (widget) => {
  freeboardStore.createComponent(WidgetDialogBox, {
    header: "Edit Widget",
    settings: widget.settings,
    type: widget.type,
    onOk: (newSettings) => {
      widget.type = newSettings.type;
      widget.settings = newSettings.settings;

      render();
    },
  });
};

const openWidgetDeleteDialogBox = (widget) => {
  freeboardStore.createComponent(ConfirmDialogBox, {
    title: "Widget",
    onOk: () => {
      freeboardStore.deleteWidget(widget.pane, widget);
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
</script>

<template>
  <section>
    <div class="sub-section">
      <div ref="widgetRef" class="widget"></div>
      <Transition>
        <div class="sub-section-tools" v-if="isEditing">
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
