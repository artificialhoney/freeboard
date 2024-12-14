<script setup lang="js">
import { storeToRefs } from "pinia";
import { useFreeboardStore } from "../stores/freeboard";
import AuthProviderDialogBox from "./AuthProviderDialogBox.vue";
import ConfirmDialogBox from "./ConfirmDialogBox.vue";
import { AuthProvider } from "../models/AuthProvider";
import { getCurrentInstance } from "vue";
import TextButton from "./TextButton.vue";

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
  <div class="auth-providers-list">
    <table
      class="auth-providers-list__table"
      v-if="dashboard.authProviders.length"
    >
      <thead class="auth-providers-list__table__head">
        <tr class="auth-providers-list__table__head__row">
          <th class="auth-providers-list__table__head__row__cell">Name</th>
          <th>&nbsp;</th>
        </tr>
      </thead>
      <tbody class="auth-providers-list__table__body">
        <tr
          v-for="authProvider in dashboard.authProviders"
          class="auth-providers-list__table__body__row"
        >
          <td class="auth-providers-list__table__body__row__cell">
            <TextButton
              @click="() => openAuthProviderEditDialogBox(authProvider)"
              >{{ authProvider.name }}</TextButton
            >
          </td>
          <td class="auth-providers-list__table__body__row__cell">
            <ul class="datasources-list__table__body__row__cell__board-toolbar">
              <li
                @click="() => openAuthProviderDeleteDialogBox(authProvider)"
                class="datasources-list__table__body__row__cell__board-toolbar__item"
              >
                <i
                  class="datasources-list__table__body__row__cell__board-toolbar__item__icon"
                >
                  <v-icon name="hi-trash"></v-icon>
                </i>
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="auth-providers-list__operations">
      <TextButton @click="() => openAuthProviderAddDialogBox()">ADD</TextButton>
    </div>
  </div>
</template>

<style lang="css" scoped>
@import url("../assets/css/components/auth-providers-list.css");
</style>
