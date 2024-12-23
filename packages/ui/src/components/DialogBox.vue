<script setup lang="js">
import { onDeactivated, onMounted, ref } from "vue";
import TextButton from "./TextButton.vue";

const show = ref(false);

const closeModal = () => {
  show.value = false;
  emit("close");
};

const emit = defineEmits(["ok", "cancel", "close"]);

const onOk = (event) => {
  emit("ok", event);
};

const onCancel = (event) => {
  emit("cancel", event);
  closeModal();
};

const onKey = (e) => {
  if (e.code === 'Escape') {
    onCancel(e);
  }
}

onMounted(() => {
  show.value = true;
  window.addEventListener('keydown', onKey)
});

onDeactivated(() => {
  window.removeEventListener('keydown', onKey)
});

const { header, ok, cancel, okDisabled } = defineProps({
  header: String,
  ok: String,
  cancel: String,
  okDisabled: Boolean,
});

defineExpose({
  closeModal,
});
</script>
<template>
  <Transition>
    <div v-if="show" class="dialog-box">
      <div class="dialog-box__modal">
        <header class="dialog-box__modal__header">
          <h2>{{ header }}</h2>
          <slot name="header"></slot>
        </header>
        <section class="dialog-box__modal__content">
          <slot />
        </section>
        <footer class="dialog-box__modal__footer">
          <TextButton :disabled="okDisabled" v-if="ok" @click="onOk" @submit="onOk" form="form" >
            {{ ok }}
          </TextButton>
          <TextButton v-if="cancel" @click="onCancel">
            {{ cancel }}
          </TextButton>
        </footer>
      </div>
    </div>
  </Transition>
</template>

<style lang="css" scoped>
@import url("../assets/css/components/dialog-box.css");
</style>
