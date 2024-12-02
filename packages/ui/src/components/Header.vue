<script setup lang="js">
import { storeToRefs } from "pinia";
import { useFreeboardStore } from "../stores/freeboard";
import { useDashboardStore } from "../stores/dashboard";
import { useMutation } from "@vue/apollo-composable";
import { DASHBOARD_CREATE_MUTATION, DASHBOARD_UPDATE_MUTATION } from "../gql";
import { useRouter } from "vue-router";
import { ref } from "vue";

const freeboardStore = useFreeboardStore();
const { allowEdit, isEditing } = storeToRefs(freeboardStore);

const dashboardStore = useDashboardStore();
const { datasources, width } = storeToRefs(dashboardStore);

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
</script>

<template>
  <header id="main-header" v-if="allowEdit">
    <div id="admin-bar">
      <div id="admin-menu">
        <div id="board-tools">
          <h1 id="board-logo" class="title">
            <i class="ra ra-feather-wing ra-2x"></i>
            Freeboard
          </h1>
          <div id="board-actions">
            <ul class="board-toolbar vertical">
              <li @click="freeboardStore.loadDashboardFromLocalFile">
                <i id="full-screen-icon" class="icon-folder-open icon-white"></i
                ><label id="full-screen">Load Freeboard</label>
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
              <li id="add-pane" @click="() => dashboardStore.createPane()">
                <i class="icon-plus icon-white"></i><label>Add Pane</label>
              </li>
            </ul>
          </div>
        </div>
        <div id="datasources">
          <h2 class="title">DATASOURCES</h2>

          <div class="datasource-list-container">
            <table
              class="table table-condensed sub-table"
              id="datasources-list"
              v-if="datasources.length"
            >
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Last Updated</th>
                  <th>&nbsp;</th>
                </tr>
              </thead>
              <tbody v-for="datasource in datasources">
                <tr>
                  <td>
                    <span
                      class="text-button datasource-name"
                      @click="
                        () =>
                          freeboardStore.updatePluginEditor(
                            'edit',
                            'datasource',
                            datasource,
                          )
                      "
                      >{{ datasource.name }}</span
                    >
                  </td>
                  <td>{{ datasource.lastUpdated }}</td>
                  <td>
                    <ul class="board-toolbar">
                      <li @click="datasource.updateNow">
                        <i class="icon-refresh icon-white"></i>
                      </li>
                      <li
                        @click="
                          () =>
                            freeboardStore.updatePluginEditor(
                              'delete',
                              'datasource',
                              datasource,
                            )
                        "
                      >
                        <i class="icon-trash icon-white"></i>
                      </li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <span
            class="text-button table-operation"
            @click="
              () => freeboardStore.updatePluginEditor('add', 'datasource')
            "
            >ADD</span
          >
        </div>
      </div>
    </div>
    <div id="column-tools" :class="`responsive-column-width-${width}`">
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
    <div
      id="toggle-header"
      @click="() => freeboardStore.setIsEditing(!isEditing)"
    >
      <i id="toggle-header-icon" class="icon-wrench icon-white"></i>
    </div>
  </header>
</template>
