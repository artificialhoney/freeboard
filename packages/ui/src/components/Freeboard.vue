<script setup>
import { onMounted, ref, useTemplateRef } from "vue";

import $ from "jquery";
window.$ = window.jQuery = $;
import "~/jquery-ui/dist/jquery-ui";
import "../jquery.plugins.js";
import * as _ from "underscore";
window._ = _;
import FreeboardUI from "./FreeboardUI.vue";
import DeveloperConsole from "./DeveloperConsole.vue";

import { useAppStore } from "../stores/app";
import { storeToRefs } from "pinia";

const appStore = useAppStore();
const { isEditing } = storeToRefs(appStore);

const ui = ref(null);
const developerConsole = ref(null);

function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  let regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
  return results == null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function initialize(allowEditValue, finishedCallback) {
  // TODO
  // ko.applyBindings(theFreeboardModel);

  // Check to see if we have a query param called load. If so, we should load that dashboard initially
  let freeboardLocation = getParameterByName("load");

  if (freeboardLocation != "") {
    $.ajax({
      url: freeboardLocation,
      success: function (data) {
        appStore.loadDashboard(data);

        if (_.isFunction(finishedCallback)) {
          finishedCallback();
        }
      },
    });
  } else {
    appStore.setAllowEdit(true);
    appStore.setIsEditing(true), appStore.showLoadingIndicator(false);
    if (_.isFunction(finishedCallback)) {
      finishedCallback();
    }
  }
}

onMounted(() => {
  appStore.createJSONDatasource();
  appStore.createOpenWeatherMapDatasource();
  appStore.createDweetioDatasource();
  appStore.createPlaybackDatasource();
  appStore.createMeshbluDatasource();

  appStore.createTextWidget();
  appStore.createGoogleMapWidget();
  appStore.createGaugeWidget();
  appStore.createHTMLWidget();
  appStore.createPictureWidget();
  appStore.createPointerWidget();
  appStore.createSparklineWidget();

  let resizeTimer;

  function resizeEnd() {
    appStore.processResize(true);
  }

  $(window).resize(function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resizeEnd, 500);
  });
  initialize(true);
});

let paneEvents = {
  init: function (
    element,
    valueAccessor,
    allBindingsAccessor,
    viewModel,
    bindingContext,
  ) {
    if (isEditing.value) {
      $(element).css({ cursor: "pointer" });
    }

    ui.value.addPane(element, viewModel, bindingContext.$root.isEditing());
  },
  update: function (
    element,
    valueAccessor,
    allBindingsAccessor,
    viewModel,
    bindingContext,
  ) {
    // If pane has been removed
    if (appStore.panes.indexOf(viewModel) == -1) {
      ui.value.removePane(element);
    }
    ui.value.updatePane(element, viewModel);
  },
};

let widgetEvents = {
  init: function (
    element,
    valueAccessor,
    allBindingsAccessor,
    viewModel,
    bindingContext,
  ) {
    if (isEditing.value) {
      ui.value.attachWidgetEditIcons($(element).parent());
    }
  },
  update: function (
    element,
    valueAccessor,
    allBindingsAccessor,
    viewModel,
    bindingContext,
  ) {
    if (viewModel.shouldRender()) {
      $(element).empty();
      viewModel.render(element);
    }
  },
};

function newDashboard() {
  appStore.loadDashboard({ allowEdit: true });
}

function loadDashboard(configuration, callback) {
  appStore.loadDashboard(configuration, callback);
}

function serialize() {
  return appStore.serialize();
}

function resize() {
  ui.value.processResize(true);
}

// To be used if freeboard is going to load dynamic assets from a different root URL
function setAssetRoot(assetRoot) {
  jsEditor.setAssetRoot(assetRoot);
}
function showDialog(contentElement, title, okTitle, cancelTitle, okCallback) {
  new DialogBox(contentElement, title, okTitle, cancelTitle, okCallback);
}
</script>

<template>
  <FreeboardUI ref="ui" />
  <DeveloperConsole ref="developerConsole" />
</template>
