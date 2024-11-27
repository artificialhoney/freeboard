<script setup lang="js">
import { onMounted, ref } from "vue";
import { useAppStore } from "../stores/app";

const appStore = useAppStore();

const widgetRef = ref(null);

onMounted(() => {
  appStore.attachWidgetEditIcons($(widgetRef.value));
});

const { widget } = defineProps({
  widget: Object,
});
</script>

<template>
  <section ref="widgetRef">
    <div class="sub-section">
      <div class="widget">
        {{ widget.settings.title }}
      </div>
      <div class="sub-section-tools">
        <ul class="board-toolbar">
          <li @click="() => widget.pane.moveWidgetUp(widget)">
            <i class="icon-chevron-up icon-white"></i>
          </li>
          <li @click="() => widget.pane.moveWidgetDown(widget)">
            <i class="icon-chevron-down icon-white"></i>
          </li>
          <li
            @click="() => appStore.updatePluginEditor('edit', 'widget', widget)"
          >
            <i class="icon-wrench icon-white"></i>
          </li>
          <li
            @click="
              () => appStore.updatePluginEditor('delete', 'widget', widget)
            "
          >
            <i class="icon-trash icon-white"></i>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
