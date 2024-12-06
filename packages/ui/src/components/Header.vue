<script setup lang="js">
import { storeToRefs } from "pinia";
import { useFreeboardStore } from "../stores/freeboard";
import { useMutation } from "@vue/apollo-composable";
import { DASHBOARD_CREATE_MUTATION, DASHBOARD_UPDATE_MUTATION } from "../gql";
import { useRouter } from "vue-router";
import { ref } from "vue";
import DatasourcesDialogBox from "./DatasourcesDialogBox.vue";
import DashboardControl from "./DashboardControl.vue";

const freeboardStore = useFreeboardStore();
const { allowEdit, isEditing, dashboard } = storeToRefs(freeboardStore);

const { mutate: createDashboard } = useMutation(DASHBOARD_CREATE_MUTATION);
const { mutate: updateDashboard } = useMutation(DASHBOARD_UPDATE_MUTATION);

const router = useRouter();

const submenuOpened = ref(false);

const saveDashboard = async () => {
  const d = dashboard.value.serialize();
  const id = d._id;
  delete d._id;
  const { isSaved } = storeToRefs(freeboardStore);
  if (isSaved.value) {
    updateDashboard({ id, dashboard: d });
  } else {
    const result = await createDashboard({ dashboard: d });
    router.push(`/${result.data.createDashboard._id}`);
  }
};
</script>

<template>
  <header class="main-header" v-if="allowEdit">
    <Transition name="slide-fade">
      <div class="admin-bar" v-if="isEditing">
        <div class="admin-menu">
          <h1 class="board-logo title">
            <i class="ra ra-feather-wing ra-2x"></i>
            Freeboard
          </h1>
          <div class="board-tools">
            <div class="board-actions">
              <div class="freeboard-control">
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
              </div>

              <DashboardControl />
            </div>
          </div>
        </div>
      </div>
    </Transition>
    <Transition>
      <div
        v-if="isEditing"
        class="column-tools"
        :class="`responsive-column-width-${dashboard.width}`"
      >
        <ul class="board-toolbar left-columns">
          <li
            class="column-tool add"
            @click="() => dashboard.increaseMaxWidth()"
          >
            <span class="column-icon right"></span
            ><i class="icon-arrow-left icon-white"></i>
          </li>
          <li
            class="column-tool sub"
            @click="() => dashboard.decreaseMaxWidth()"
          >
            <span class="column-icon left"></span
            ><i class="icon-arrow-right icon-white"></i>
          </li>
        </ul>
        <ul class="board-toolbar right-columns">
          <li
            class="column-tool sub"
            @click="() => dashboard.decreaseMaxWidth()"
          >
            <span class="column-icon right"></span
            ><i class="icon-arrow-left icon-white"></i>
          </li>
          <li
            class="column-tool add"
            @click="() => dashboard.increaseMaxWidth()"
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
