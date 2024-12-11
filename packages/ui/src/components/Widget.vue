<script setup lang="js">
import { storeToRefs } from "pinia";
import { useFreeboardStore } from "../stores/freeboard";
import WidgetDialogBox from "./WidgetDialogBox.vue";
import { getCurrentInstance, onMounted, onUpdated, ref, watch } from "vue";
import ConfirmDialogBox from "./ConfirmDialogBox.vue";

const freeboardStore = useFreeboardStore();
const { isEditing, dashboard } = storeToRefs(freeboardStore);

const widgetRef = ref(null);

const openWidgetEditDialogBox = (widget) => {
  freeboardStore.createComponent(WidgetDialogBox, instance.appContext, {
    header: "Edit Widget",
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
    title: "Widget",
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
    <div class="sub-section">
      <div ref="widgetRef" class="widget-output"></div>
      <Transition>
        <div class="sub-section-tools" v-if="isEditing">
          <ul class="board-toolbar">
            <li @click="() => widget.pane.moveWidgetUp(widget)">
              <i class="icon-white"
                ><v-icon name="hi-solid-chevron-up"></v-icon
              ></i>
            </li>
            <li @click="() => widget.pane.moveWidgetDown(widget)">
              <i class="icon-white"
                ><v-icon name="hi-solid-chevron-down"></v-icon
              ></i>
            </li>
            <li @click="() => openWidgetEditDialogBox(widget)">
              <i class="icon-white"><v-icon name="hi-solid-cog"></v-icon></i>
            </li>
            <li @click="() => openWidgetDeleteDialogBox(widget)">
              <i class="icon-white"><v-icon name="hi-trash"></v-icon></i>
            </li>
          </ul>
        </div>
      </Transition>
    </div>
  </section>
</template>
