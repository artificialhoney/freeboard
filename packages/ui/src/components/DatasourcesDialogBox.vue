<script setup lang="js">
import DialogBox from "./DialogBox.vue";
import DatasourcesList from "./DatasourcesList.vue";

const { onClose } = defineProps({
  onClose: Function,
});
</script>

<template>
  <DialogBox header="Datasources" cancel="Cancel" @close="onClose">
    <DatasourcesList />
  </DialogBox>
</template>
