<script setup lang="js">
import { storeToRefs } from "pinia";
import { useFreeboardStore } from "../stores/freeboard";
import AuthProviderDialogBox from "./AuthProviderDialogBox.vue";
import ConfirmDialogBox from "./ConfirmDialogBox.vue";
import { AuthProvider } from "../models/AuthProvider";
import { getCurrentInstance } from "vue";
import TextButton from "./TextButton.vue";
import { useI18n } from "vue-i18n";
import ActionButton from "./ActionButton.vue";

const { t } = useI18n();
const freeboardStore = useFreeboardStore();
const { dashboard } = storeToRefs(freeboardStore);

const openAuthProviderEditDialogBox = (authprovider) => {
  freeboardStore.createComponent(AuthProviderDialogBox, instance.appContext, {
    header: t("authProvidersList.titleEdit"),
    authprovider,
    onOk: (newSettings) => {
      authprovider.title = newSettings.title;
      authprovider.enabled = newSettings.enabled;
      authprovider.settings = newSettings.settings;
      authprovider.type = newSettings.type;
    },
  });
};

const openAuthProviderDeleteDialogBox = (authprovider) => {
  freeboardStore.createComponent(ConfirmDialogBox, instance.appContext, {
    title: t("authProvidersList.titleDelete"),
    onOk: () => {
      dashboard.value.deleteAuthProvider(authprovider);
    },
  });
};

const openAuthProviderAddDialogBox = () => {
  freeboardStore.createComponent(AuthProviderDialogBox, instance.appContext, {
    header: t("authProvidersList.titleAdd"),
    onOk: (newSettings) => {
      const newViewModel = new AuthProvider();
      newViewModel.title = newSettings.title;
      newViewModel.enabled = newSettings.enabled;
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
          <th class="auth-providers-list__table__head__row__cell">
            {{ $t("authProvidersList.labelName") }}
          </th>
          <th class="auth-providers-list__table__head__row__cell">&nbsp;</th>
          <th class="auth-providers-list__table__head__row__cell">&nbsp;</th>
        </tr>
      </thead>
      <tbody class="auth-providers-list__table__body">
        <tr
          v-for="authProvider in dashboard.authProviders"
          class="auth-providers-list__table__body__row"
        >
          <td class="auth-providers-list__table__body__row__cell" colspan="2">
            <TextButton
              @click="() => openAuthProviderEditDialogBox(authProvider)"
              >{{ authProvider.title }}</TextButton
            >
          </td>
          <td class="auth-providers-list__table__body__row__cell">
            <ul class="auth-providers-list__table__body__row__cell__board-toolbar">
              <li
                @click="() => openAuthProviderDeleteDialogBox(authProvider)"
                class="auth-providers-list__table__body__row__cell__board-toolbar__item"
              >
                <i
                  class="auth-providers-list__table__body__row__cell__board-toolbar__item__icon"
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
      <ActionButton @click="() => openAuthProviderAddDialogBox()">{{
        $t("authProvidersList.buttonAdd")
      }}</ActionButton>
    </div>
  </div>
</template>

<style lang="css" scoped>
@import url("../assets/css/components/auth-providers-list.css");
</style>
