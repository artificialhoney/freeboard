<script setup lang="js">
import { storeToRefs } from "pinia";
import { useFreeboardStore } from "../stores/freeboard";
import DashboardControl from "./DashboardControl.vue";
import FreeboardControl from "./FreeboardControl.vue";
import ToggleHeaderButton from "./ToggleHeaderButton.vue";
import ColumnToolbar from "./ColumnToolbar.vue";

const freeboardStore = useFreeboardStore();
const { allowEdit, isEditing, dashboard } = storeToRefs(freeboardStore);
</script>

<template>
  <header class="header" v-if="allowEdit">
    <Transition name="slide-fade">
      <div class="header__admin-bar" v-if="isEditing">
        <div class="header__admin-bar__admin-menu">
          <h1 class="header__admin-bar__admin-menu__board-logo">
            <i class="ra ra-feather-wing ra-2x"></i>
            {{ $t("header.title") }}
          </h1>
          <div class="header__admin-bar__admin-menu__board-tools">
            <div
              class="header__admin-bar__admin-menu__board-tools__board-actions"
            >
              <FreeboardControl />
              <DashboardControl />
            </div>
          </div>
        </div>
      </div>
    </Transition>
    <Transition>
      <ColumnToolbar v-if="isEditing" />
    </Transition>
    <ToggleHeaderButton />
  </header>
</template>

<style lang="css" scoped>
@import url("../assets/css/components/header.css");
</style>
