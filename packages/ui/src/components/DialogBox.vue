<script setup lang="js">
import { onMounted, ref, defineEmits, defineProps } from "vue";

const show = ref(false);

const closeModal = () => {
  show.value = false;
  emit("close");
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
  show.value = true;
});

const { header, ok, cancel } = defineProps({
  header: String,
  ok: String,
  cancel: String,
});
</script>
<template>
  <Transition>
    <div v-if="show" id="modal_overlay">
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
  </Transition>
</template>
