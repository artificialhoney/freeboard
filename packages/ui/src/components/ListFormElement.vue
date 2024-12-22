<script setup lang="js">
import { computed, onMounted, ref, watch } from "vue";
import { levenshteinDistance } from "../fuzzy";
import { useI18n } from "vue-i18n";
import { asyncComputed } from "@vueuse/core";

const { t } = useI18n();

const props = defineProps(["modelValue", "secret", "disabled", "options"]);
const emit = defineEmits(["update:modelValue"]);

const show = ref(false)
const value = ref(props.modelValue)

const filter = async () => {
  const result = (await props.options).filter(opt => opt.value).map(opt => {
    return {
      value: opt.value,
      label: opt.label,
      prio: levenshteinDistance(value.value, opt.label)
    }
  })
  .sort((a,b) => a.prio - b.prio)

  return result.slice(0, 10);
}

const opts = ref([])

const onSearch = async () => {
  opts.value = await filter();
}

const onLinkClicked = (option) => {
  value.value = option.value
  label.value = option.label
  show.value = false;
}

const label = asyncComputed(async () => {
  const opt = (await props.options).find(o => o.value === value.value)
  if (opt) {
    return opt.label
  } else {
    return t("form.labelList")
  }
})

watch(show, () => {
  emit("update:modelValue", value);
})
</script>

<template>
  <div class="list-form-element">
    <button
      @click="show = !show"
      class="list-form-element__drop-button"
      type="button"
    >
      {{ label }}
    </button>
    <Transition>
      <div class="list-form-element__dropdown-content" v-if="show">
        <input
          class="list-form-element__dropdown-content__input"
          type="text"
          v-model="value"
          :placeholder="$t('form.placeholderList')"
          :disabled="props.disabled"
          @keyup.prevent="onSearch"
        />

        <ul>
          <li v-for="option in opts">
            <a
              :href="option.value"
              class="list-form-element__dropdown-content__link"
              @click.prevent="() => onLinkClicked(option)"
              >{{ option.label }}</a
            >
          </li>
        </ul>
      </div>
    </Transition>
  </div>
</template>

<style lang="css" scoped>
@import url("../assets/css/components/list-form-element.css");
</style>
