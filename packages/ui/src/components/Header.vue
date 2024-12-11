<script setup lang="js">
import { storeToRefs } from "pinia";
import { useFreeboardStore } from "../stores/freeboard";
import DashboardControl from "./DashboardControl.vue";
import FreeboardControl from "./FreeboardControl.vue";

const freeboardStore = useFreeboardStore();
const { allowEdit, isEditing, dashboard } = storeToRefs(freeboardStore);
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
              <FreeboardControl />

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
            ><i class="icon-white"
              ><v-icon name="hi-solid-chevron-double-left"></v-icon
            ></i>
          </li>
          <li
            class="column-tool sub"
            @click="() => dashboard.decreaseMaxWidth()"
          >
            <span class="column-icon left"></span
            ><i class="icon-white"
              ><v-icon name="hi-solid-chevron-double-right"></v-icon
            ></i>
          </li>
        </ul>
        <ul class="board-toolbar right-columns">
          <li
            class="column-tool sub"
            @click="() => dashboard.decreaseMaxWidth()"
          >
            <span class="column-icon right"></span
            ><i class="icon-white"
              ><v-icon name="hi-solid-chevron-double-left"></v-icon
            ></i>
          </li>
          <li
            class="column-tool add"
            @click="() => dashboard.increaseMaxWidth()"
          >
            <span class="column-icon left"></span
            ><i class="icon-white"
              ><v-icon name="hi-solid-chevron-double-right"></v-icon
            ></i>
          </li>
        </ul>
      </div>
    </Transition>

    <div class="toggle-header" @click="() => freeboardStore.toggleIsEditing()">
      <i class="toggle-header-icon icon-white"
        ><v-icon
          :name="isEditing ? 'hi-solid-chevron-up' : 'hi-solid-cog'"
        ></v-icon
      ></i>
    </div>
  </header>
</template>
