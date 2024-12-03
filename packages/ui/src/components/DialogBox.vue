<script setup lang="js">
import { onMounted, ref, defineEmits, defineProps } from "vue";

const overlay = ref(null);

const closeModal = () => {
  $(overlay.value).fadeOut(200, () => {
    emit("close");
  });
};

const emit = defineEmits(["ok", "cancel", "close"]);

const onOk = (event) => {
  emit("ok", event);
  closeModal();
};

const onCancel = (event) => {
  emit("cancel", event);
  closeModal();
};

onMounted(() => {
  $(overlay.value).fadeIn(200);
});

const { header, ok, cancel } = defineProps({
  header: String,
  ok: String,
  cancel: String,
});
</script>
<template>
  <div ref="overlay" id="modal_overlay" style="display: none">
    <div class="modal">
      <header>
        <h2 class="title">{{ header }}</h2>
      </header>
      <section>
        <slot />
      </section>
      <footer>
        <span v-if="ok" id="dialog-ok" class="text-button" @click="onOk">{{
          ok
        }}</span>
        <span
          v-if="cancel"
          id="dialog-cancel"
          class="text-button"
          @click="onCancel"
          >{{ cancel }}</span
        >
      </footer>
    </div>
  </div>
</template>
