<script setup lang="js">
import { storeToRefs } from "pinia";
import { useFreeboardStore } from "../stores/freeboard";
import AuthProviderDialogBox from "./AuthProviderDialogBox.vue";
import ConfirmDialogBox from "./ConfirmDialogBox.vue";
import { AuthProvider } from "../models/AuthProvider";
import { getCurrentInstance } from "vue";

const freeboardStore = useFreeboardStore();
const { dashboard } = storeToRefs(freeboardStore);

const openAuthProviderEditDialogBox = (authprovider) => {
  freeboardStore.createComponent(AuthProviderDialogBox, instance.appContext, {
    header: "Edit AuthProvider",
    settings: { ...authprovider.settings, name: authprovider.name },
    type: authprovider.type,
    onOk: (newSettings) => {
      authprovider.name = newSettings.settings.name;
      delete newSettings.settings.name;
      authprovider.settings = newSettings.settings;
      authprovider.type = newSettings.type;
    },
  });
};

const openAuthProviderDeleteDialogBox = (authprovider) => {
  freeboardStore.createComponent(ConfirmDialogBox, instance.appContext, {
    title: "AuthProvider",
    onOk: () => {
      dashboard.value.deleteAuthProvider(authprovider);
    },
  });
};

const openAuthProviderAddDialogBox = () => {
  freeboardStore.createComponent(AuthProviderDialogBox, instance.appContext, {
    header: "Add AuthProvider",
    onOk: (newSettings) => {
      const newViewModel = new AuthProvider();

      newViewModel.name = newSettings.settings.name;
      delete newSettings.settings.name;

      newViewModel.settings = newSettings.settings;
      newViewModel.type = newSettings.type;

      dashboard.value.addAuthProvider(newViewModel);
    },
  });
};

const instance = getCurrentInstance();
</script>

<template>
  <div class="authproviders">
    <div class="authprovider-list-container">
      <table
        class="table table-condensed sub-table"
        id="authproviders-list"
        v-if="dashboard.authProviders.length"
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="authProvider in dashboard.authProviders">
            <td>
              <span
                class="text-button authprovider-name"
                @click="() => openAuthProviderEditDialogBox(authProvider)"
                >{{ authProvider.name }}</span
              >
            </td>
            <td>
              <ul class="board-toolbar">
                <li
                  @click="() => openAuthProviderDeleteDialogBox(authProvider)"
                >
                  <i class="icon-white">
                    <v-icon name="hi-trash"></v-icon>
                  </i>
                </li>
              </ul>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <span
      class="text-button table-operation"
      @click="() => openAuthProviderAddDialogBox()"
      >ADD</span
    >
  </div>
</template>
