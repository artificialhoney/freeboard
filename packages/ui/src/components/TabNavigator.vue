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
    <div class="tab-navigator__menu">
      <ul class="tab-navigator__menu__board-toolbar">
        <li
          v-for="(field, i) in fields"
          @click="() => (index = i)"
          class="tab-navigator__menu__board-toolbar__item"
          :class="{
            'tab-navigator__menu__board-toolbar__item--active': index === i,
          }"
        >
          <i class="tab-navigator__menu__board-toolbar__item__icon"
            ><v-icon :name="field.icon" /></i
          ><label class="tab-navigator__menu__board-toolbar__item__label">{{
            $t(field.label)
          }}</label>
        </li>
      </ul>
    </div>
    <div ref="tabs" class="tab-navigator__tabs">
      <slot></slot>
    </div>
  </div>
</template>

<style lang="css" scoped>
@import url("../assets/css/components/tab-navigator.css");
</style>
