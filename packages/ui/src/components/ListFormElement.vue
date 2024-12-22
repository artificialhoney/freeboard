<script setup lang="js">
import { computed, onMounted, ref, watch } from "vue";
import { levenshteinDistance } from "../fuzzy";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const props = defineProps(["modelValue", "secret", "disabled", "options"]);
const emit = defineEmits(["update:modelValue"]);

const opts = ref([])

const show = ref(false)
const value = ref(props.modelValue)

const filter = () => {
  opts.value = props.options.map(opt => ({
    value: opt.value,
    label: opt.label,
    prio: levenshteinDistance(value.value, opt.value)
  }))
  .sort(a,b => a.prio - b.prio)
  .slice(0, 10)
}

onMounted(filter);

const onLinkClicked = (option) => {
  value.value = option.value
  label.value = option.label
}

const label = computed(() => {
  const opt = props.options.find(o => o.value === value.value)
  if (opt) {
    return opt.label
  } else {
    return t("form.labelList")
  }
})

watch(show, () => {
  if (show.value) {
    return;
  }
  emit("update:modelValue", value.value);
})
</script>

<template>
  <div class="list-form-element">
    <button @click="show = !show" class="list-form-element__drop-button">{{label}}</button>
    <div class="list-form-element__dropdown-content" :class="{'list-form-element__dropdown-content--show': show}">
      <input
        class="list-form-element__dropdown-content__input"
        type="text"
        v-model="value"
        :placeholder="$t('form.placeholderList')"
        :disabled="props.disabled"
        @keyup="filter"
      />
      <a :href="option.value" v-for="option in opts" class="list-form-element__dropdown-content__link" @click="onLinkClicked(option)">{{option.label}}</a>
    </div>
  </div>
</template>

<style lang="css" scoped>
@import url("../assets/css/components/list-form-element.css");
</style>
