<script setup lang="js">
import { storeToRefs } from "pinia";
import { useFreeboardStore } from "../stores/freeboard";
import { useMutation } from "@vue/apollo-composable";
import { DASHBOARD_CREATE_MUTATION, DASHBOARD_UPDATE_MUTATION } from "../gql";
import { useRouter } from "vue-router";
import { watch } from "vue";

const freeboardStore = useFreeboardStore();
const { dashboard, isSaved } = storeToRefs(freeboardStore);

const { mutate: createDashboard, error: createError } = useMutation(
  DASHBOARD_CREATE_MUTATION,
);
const { mutate: updateDashboard, error: updateError } = useMutation(
  DASHBOARD_UPDATE_MUTATION,
);

const router = useRouter();

watch([createError, updateError], () => {
  freeboardStore.logout();
  router.push("/login");
});

const saveDashboard = async () => {
  const { isSaved } = storeToRefs(freeboardStore);
  const d = dashboard.value.serialize();
  const id = d._id;
  delete d._id;
  if (isSaved.value && dashboard.value.isOwner) {
    updateDashboard({ id, dashboard: d });
  } else {
    const result = await createDashboard({ dashboard: d });
    isSaved.value = true;
    dashboard.value._id = result.data.createDashboard._id;
    router.push(`/${result.data.createDashboard._id}`);
  }
};

const iStatic = __FREEBOARD_STATIC__;
</script>
<template>
  <div class="freeboard-control">
    <ul
      class="freeboard-control__board-toolbar freeboard-control__board-toolbar"
    >
      <li
        v-if="!iStatic"
        @click="() => saveDashboard()"
        class="freeboard-control__board-toolbar__item"
      >
        <i class="freeboard-control__board-toolbar__item__icon"
          ><v-icon name="hi-cloud-upload" /></i
        ><label class="freeboard-control__board-toolbar__item__label">{{
          $t(`freeboardControl.label${isSaved ? "Update" : "Save"}`)
        }}</label>
      </li>
      <li
        @click="() => freeboardStore.loadDashboardFromLocalFile()"
        class="freeboard-control__board-toolbar__item"
      >
        <i class="freeboard-control__board-toolbar__item__icon"
          ><v-icon name="hi-download" /></i
        ><label class="freeboard-control__board-toolbar__item__label">{{
          $t("freeboardControl.labelImport")
        }}</label>
      </li>
      <li
        @click="() => freeboardStore.exportDashboard()"
        class="freeboard-control__board-toolbar__item"
      >
        <i class="freeboard-control__board-toolbar__item__icon"
          ><v-icon name="hi-upload"
        /></i>
        <label class="freeboard-control__board-toolbar__item__label">{{
          $t("freeboardControl.labelExport")
        }}</label>
      </li>
    </ul>
  </div>
</template>

<style lang="css" scoped>
@import url("../assets/css/components/freeboard-control.css");
</style>
