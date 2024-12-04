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

const { header, ok, cancel, okDisabled } = defineProps({
  header: String,
  ok: String,
  cancel: String,
  okDisabled: Boolean,
});
</script>
<template>
  <Transition>
    <div v-if="show" class="modal-overlay">
      <div class="modal">
        <header>
          <h2 class="title">{{ header }}</h2>
        </header>
        <section>
          <slot />
        </section>
        <footer>
          <button
            :disabled="okDisabled"
            v-if="ok"
            class="text-button"
            @click="onOk"
          >
            {{ ok }}
          </button>
          <button v-if="cancel" class="text-button" @click="onCancel">
            {{ cancel }}
          </button>
        </footer>
      </div>
    </div>
  </Transition>
</template>
