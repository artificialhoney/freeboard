<script setup lang="js">
import { storeToRefs } from "pinia";
import { useFreeboardStore } from "../stores/freeboard";
import { useDashboardStore } from "../stores/dashboard";
import { useMutation } from "@vue/apollo-composable";
import { DASHBOARD_CREATE_MUTATION, DASHBOARD_UPDATE_MUTATION } from "../gql";
import { useRouter } from "vue-router";
import { ref } from "vue";
import DatasourcesDialogBox from "./DatasourcesDialogBox.vue";

const freeboardStore = useFreeboardStore();
const { allowEdit, isEditing } = storeToRefs(freeboardStore);

const dashboardStore = useDashboardStore();
const { width } = storeToRefs(dashboardStore);

const { mutate: createDashboard } = useMutation(DASHBOARD_CREATE_MUTATION);
const { mutate: updateDashboard } = useMutation(DASHBOARD_UPDATE_MUTATION);

const router = useRouter();

const submenuOpened = ref(false);

const saveDashboard = async () => {
  const dashboard = dashboardStore.serialize();
  const id = dashboard._id;
  delete dashboard._id;
  const { isSaved } = storeToRefs(freeboardStore);
  if (isSaved.value) {
    updateDashboard({ id, dashboard });
  } else {
    const result = await createDashboard({ dashboard });
    router.push(`/${result.data.createDashboard._id}`);
  }
};

const openDatasourcesDialogBox = () => {
  freeboardStore.createComponent(DatasourcesDialogBox);
};
</script>

<template>
  <header class="main-header" v-if="allowEdit">
    <Transition name="slide-fade">
      <div class="admin-bar" v-if="isEditing">
        <div class="admin-menu">
          <div class="board-tools">
            <h1 class="board-logo title">
              <i class="ra ra-feather-wing ra-2x"></i>
              Freeboard
            </h1>
            <div class="board-actions">
              <ul class="board-toolbar vertical">
                <li @click="freeboardStore.loadDashboardFromLocalFile">
                  <i class="icon-folder-open icon-white"></i
                  ><label>Load Freeboard</label>
                </li>
                <li @click="saveDashboard">
                  <i class="icon-bookmark icon-white"></i
                  ><label>Save Freeboard</label>
                </li>
                <li @click="() => (submenuOpened = !submenuOpened)">
                  <i class="icon-download-alt icon-white"></i>
                  <label>Export Freeboard</label>
                  <label
                    v-if="submenuOpened"
                    @click="() => freeboardStore.saveDashboard(true)"
                    >[Pretty]</label
                  >
                  <label
                    v-if="submenuOpened"
                    @click="() => freeboardStore.saveDashboard(false)"
                    >[Minified]</label
                  >
                </li>
              </ul>
              <ul class="board-toolbar vertical">
                <li @click="() => openDatasourcesDialogBox()">
                  <i class="icon-folder-open icon-white"></i
                  ><label>Add Datasource</label>
                </li>
                <li>
                  <i class="icon-bookmark icon-white"></i
                  ><label>Add Secret</label>
                </li>
                <li class="add-pane" @click="() => dashboardStore.createPane()">
                  <i class="icon-plus icon-white"></i><label>Add Pane</label>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Transition>
    <Transition>
      <div
        v-if="isEditing"
        class="column-tools"
        :class="`responsive-column-width-${width}`"
      >
        <ul class="board-toolbar left-columns">
          <li
            class="column-tool add"
            @click="() => dashboardStore.increaseMaxWidth()"
          >
            <span class="column-icon right"></span
            ><i class="icon-arrow-left icon-white"></i>
          </li>
          <li
            class="column-tool sub"
            @click="() => dashboardStore.decreaseMaxWidth()"
          >
            <span class="column-icon left"></span
            ><i class="icon-arrow-right icon-white"></i>
          </li>
        </ul>
        <ul class="board-toolbar right-columns">
          <li
            class="column-tool sub"
            @click="() => dashboardStore.decreaseMaxWidth()"
          >
            <span class="column-icon right"></span
            ><i class="icon-arrow-left icon-white"></i>
          </li>
          <li
            class="column-tool add"
            @click="() => dashboardStore.increaseMaxWidth()"
          >
            <span class="column-icon left"></span
            ><i class="icon-arrow-right icon-white"></i>
          </li>
        </ul>
      </div>
    </Transition>

    <div class="toggle-header" @click="() => freeboardStore.toggleIsEditing()">
      <i
        class="toggle-header-icon icon-white"
        :class="isEditing ? 'icon-chevron-up' : 'icon-wrench'"
      ></i>
    </div>
  </header>
</template>
