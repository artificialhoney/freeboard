<script setup lang="js">
import { onMounted, ref, watch } from "vue";

const { fields } = defineProps({
  fields: Array,
});

const tabs = ref(null);

const index = ref(null);

const showTab = (value) => {
  Array.from(tabs.value.children).forEach((e) => (e.style.display = "none"));
  tabs.value.children[value].style.display = "inherit";
};

watch(index, showTab);
onMounted(() => (index.value = 0));
</script>
<template>
  <div class="tab-navigator">
    <div class="menu">
      <ul class="board-toolbar vertical">
        <li v-for="(field, i) in fields" @click="() => (index = i)">
          <i class="icon-white"><v-icon :name="field.icon" /></i
          ><label>{{ field.label }}</label>
        </li>
      </ul>
    </div>
    <div ref="tabs" class="tabs">
      <slot></slot>
    </div>
  </div>
</template>
