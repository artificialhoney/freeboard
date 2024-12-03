<script setup lang="js">
import { storeToRefs } from "pinia";
import { useDashboardStore } from "../stores/dashboard";
import { useFreeboardStore } from "../stores/freeboard";

const freeboardStore = useFreeboardStore();
const dashboardStore = useDashboardStore();
const { datasources } = storeToRefs(dashboardStore);
</script>

<template>
  <div id="datasources">
    <!--<h2 class="title">DATASOURCES</h2>-->

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
                <li @click="() => datasource.updateNow()">
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
      @click="() => freeboardStore.updatePluginEditor('add', 'datasource')"
      >ADD</span
    >
  </div>
</template>
