<script setup lang="js">
import { computed, ref, watch } from "vue";
import DialogBox from "./DialogBox.vue";
import Form from "./Form.vue";
import { USER_AUTH_MUTATION } from "../gql";
import { useMutation } from "@vue/apollo-composable";
import { useFreeboardStore } from "../stores/freeboard";
import router from "../router";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const freeboardStore = useFreeboardStore();

const form = ref(null);

const { mutate: authUser, loading } = useMutation(USER_AUTH_MUTATION);

const fields = ref(null);

watch(
  loading,
  (l) => {
    fields.value = [
      {
        name: "email",
        label: t("form.labelEmail"),
        type: "text",
        required: true,
        disabled: l,
      },
      {
        name: "password",
        label: t("form.labelPassword"),
        type: "password",
        required: true,
        disabled: l,
      },
    ];
  },
  { immediate: true },
);

const dialog = ref(null);

const onDialogBoxOk = async () => {
  if (form.value.hasErrors()) {
    return;
  } else {
    const value = form.value.getValue();
    const result = await authUser(value);
    freeboardStore.login(result.data.authUser.token);
    router.push("/");
  }
};
</script>

<template>
  <div class="login">
    <DialogBox
      class="login__dialog-box"
      ref="dialog"
      header="Login"
      :ok="$t('login.buttonOk')"
      @ok="() => onDialogBoxOk()"
    >
      <Form ref="form" :fields="fields" :settings="{}" />
    </DialogBox>
  </div>
</template>

<style lang="css" scoped>
@import url("../assets/css/components/login.css");
</style>
