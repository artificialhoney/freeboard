<script setup lang="js">
import { ref, watch } from "vue";
import { storeToRefs } from "pinia";
import { useAppStore } from "../stores/app";
import { GridLayout, GridItem } from "vue-grid-layout-v3";
import { useDashboardStore } from "../stores/dashboard";
import PaneUI from "./PaneUI.vue";
const appStore = useAppStore();
const dashboardStore = useDashboardStore();
const { allowEdit, isEditing } = storeToRefs(appStore);
const { headerImage, datasources, panes } = storeToRefs(dashboardStore);

const layout = ref([]);

watch(panes, () => {
  // const el = { x: 0, y: 0, w: 2, h: 2, i: "0" };
  const l = [];
  panes.value.forEach((pane, index) => {
    l.push({
      x: (panes.value.length * 2) % (index || 12),
      y: panes.value.length + (index || 12), // puts it at the bottom
      w: 2,
      h: 2,
      i: index,
      pane,
    });
  });

  layout.value = l;
});
</script>

<template>
  <div id="board-content">
    <img id="dash-logo" v-if="headerImage" :src="headerImage" />
    <GridLayout
      :layout="layout"
      :col-num="12"
      :row-height="30"
      :is-draggable="true"
      :is-resizable="true"
      :vertical-compact="true"
      :margin="[10, 10]"
      :use-css-transforms="true"
    >
      <GridItem
        v-for="item in layout"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :key="item.i"
      >
        <PaneUI :pane="item.pane" />
      </GridItem>
    </GridLayout>
  </div>
  <header id="main-header" v-if="allowEdit">
    <div id="admin-bar">
      <div id="admin-menu">
        <div id="board-tools">
          <h1 id="board-logo" class="title">
            <i class="ra ra-bolt-shield ra-2x"></i>
          </h1>
          <div id="board-actions">
            <ul class="board-toolbar vertical">
              <li @click="appStore.loadDashboardFromLocalFile">
                <i id="full-screen-icon" class="icon-folder-open icon-white"></i
                ><label id="full-screen">Load Freeboard</label>
              </li>
              <li>
                <i class="icon-download-alt icon-white"></i>
                <label @click="appStore.saveDashboardClicked"
                  >Save Freeboard</label
                >
                <label
                  style="display: none"
                  @click="() => appStore.saveDashboard(true)"
                  >[Pretty]</label
                >
                <label
                  style="display: none"
                  @click="() => appStore.saveDashboard(false)"
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
                          appStore.updatePluginEditor(
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
                            appStore.updatePluginEditor(
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
            @click="() => appStore.updatePluginEditor('add', 'datasource')"
            >ADD</span
          >
        </div>
      </div>
    </div>
    <div id="column-tools" class="responsive-column-width">
      <ul class="board-toolbar left-columns">
        <li class="column-tool add" @click="() => appStore.addGridColumnLeft()">
          <span class="column-icon right"></span
          ><i class="icon-arrow-left icon-white"></i>
        </li>
        <li class="column-tool sub" @click="() => appStore.subGridColumnLeft()">
          <span class="column-icon left"></span
          ><i class="icon-arrow-right icon-white"></i>
        </li>
      </ul>
      <ul class="board-toolbar right-columns">
        <li
          class="column-tool sub"
          @click="() => appStore.subGridColumnRight()"
        >
          <span class="column-icon right"></span
          ><i class="icon-arrow-left icon-white"></i>
        </li>
        <li
          class="column-tool add"
          @click="() => appStore.addGridColumnRight()"
        >
          <span class="column-icon left"></span
          ><i class="icon-arrow-right icon-white"></i>
        </li>
      </ul>
    </div>
    <div id="toggle-header" @click="() => appStore.setIsEditing(!isEditing)">
      <i id="toggle-header-icon" class="icon-wrench icon-white"></i>
    </div>
  </header>
</template>
