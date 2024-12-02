<script setup>
import { onMounted, ref, watch } from "vue";

import $ from "jquery";
window.$ = window.jQuery = $;

import Header from "./Header.vue";
import Board from "./Board.vue";

import { useFreeboardStore } from "../stores/freeboard";
import { onBeforeRouteUpdate } from "vue-router";
import { useQuery } from "@vue/apollo-composable";
import { DASHBOARD_QUERY } from "../gql";

const freeboardStore = useFreeboardStore();

onBeforeRouteUpdate(async (to, from) => {
  // react to route changes...
  console.log(to, from);
  await refetch({ _id: to.params.id });
});
/*
const queryClient = useQueryClient()

const { isPending, isError, data, error } = useQuery({
  queryKey: ['dashboard'],
  queryFn: getTodos,
})

// Mutation
const mutation = useMutation({
  mutationFn: postTodo,
  onSuccess: () => {
    // Invalidate and refetch
    queryClient.invalidateQueries({ queryKey: ['todos'] })
  },
})

function onButtonClick() {
  mutation.mutate({
    id: Date.now(),
    title: 'Do Laundry',
  })
}

const routes = [
  { path: '/', component: HomeView },
  { path: '/about', component: AboutView },
]
*/

onMounted(() => {
  freeboardStore.createJSONDatasource();
  freeboardStore.createOpenWeatherMapDatasource();
  freeboardStore.createDweetioDatasource();
  freeboardStore.createPlaybackDatasource();
  freeboardStore.createMeshbluDatasource();

  freeboardStore.createTextWidget();
  freeboardStore.createGoogleMapWidget();
  freeboardStore.createGaugeWidget();
  freeboardStore.createHTMLWidget();
  freeboardStore.createPictureWidget();
  freeboardStore.createPointerWidget();
  freeboardStore.createSparklineWidget();

  freeboardStore.setAllowEdit(true);
  freeboardStore.setIsEditing(true);
  freeboardStore.showLoadingIndicator(false);
});
</script>

<template>
  <Header />
  <Board />
</template>
