<script setup>
import { watch } from "vue";
import "./assets/css/app.css";
import { RouterView, useRoute } from "vue-router";
import { useQuery } from "@vue/apollo-composable";
import { DASHBOARD_QUERY } from "./gql";

const route = useRoute();
const { result, loading, error, refetch, variables } = useQuery(
  DASHBOARD_QUERY,
  { id: "id" },
);

watch(
  () => route.params.id,
  (newId, oldId) => {
    variables.value = {
      id: newId,
    };
  },
);
</script>

<template>
  <RouterView />
</template>
