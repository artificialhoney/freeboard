<script setup lang="js">
import { ref } from "vue";
import { useAppStore } from "../stores/app";

const appStore = useAppStore();
const developerConsole = ref(null);

function showDeveloperConsole() {
  let pluginScriptsInputs = [];
  let container = $("<div></div>");
  let addScript = $('<div class="table-operation text-button">ADD</div>');
  let table = $('<table class="table table-condensed sub-table"></table>');

  table.append(
    $('<thead style=""><tr><th>Plugin Script URL</th></tr></thead>'),
  );

  let tableBody = $("<tbody></tbody>");

  table.append(tableBody);

  container
    .append(
      $(
        "<p>Here you can add references to other scripts to load datasource or widget plugins.</p>",
      ),
    )
    .append(table)
    .append(addScript)
    .append(
      '<p>To learn how to build plugins for freeboard, please visit <a target="_blank" href="http://freeboard.github.io/freeboard/docs/plugin_example.html">http://freeboard.github.io/freeboard/docs/plugin_example.html</a></p>',
    );

  function refreshScript(scriptURL) {
    $('script[src="' + scriptURL + '"]').remove();
  }

  function addNewScriptRow(scriptURL) {
    let tableRow = $("<tr></tr>");
    let tableOperations = $('<ul class="board-toolbar"></ul>');
    let scriptInput = $(
      '<input class="table-row-value" style="width:100%;" type="text">',
    );
    let deleteOperation = $(
      '<li><i class="icon-trash icon-white"></i></li>',
    ).click(function (e) {
      pluginScriptsInputs = _.without(pluginScriptsInputs, scriptInput);
      tableRow.remove();
    });

    pluginScriptsInputs.push(scriptInput);

    if (scriptURL) {
      scriptInput.val(scriptURL);
    }

    tableOperations.append(deleteOperation);
    tableBody.append(
      tableRow
        .append($("<td></td>").append(scriptInput))
        .append($('<td class="table-row-operation">').append(tableOperations)),
    );
  }

  _.each(theFreeboardModel.plugins(), function (pluginSource) {
    addNewScriptRow(pluginSource);
  });

  addScript.click(function (e) {
    addNewScriptRow();
  });

  appStore.createDialogBox(
    container,
    "Developer Console",
    "OK",
    null,
    function () {
      // Unload our previous scripts
      _.each(theFreeboardModel.plugins(), function (pluginSource) {
        $('script[src^="' + pluginSource + '"]').remove();
      });

      theFreeboardModel.plugins.removeAll();

      _.each(pluginScriptsInputs, function (scriptInput) {
        let scriptURL = scriptInput.val();

        if (scriptURL && scriptURL.length > 0) {
          theFreeboardModel.addPluginSource(scriptURL);

          // Load the script with a cache buster
          head.js(scriptURL + "?" + Date.now());
        }
      });
    },
  );
}

defineExpose({
  developerConsole,
  showDeveloperConsole,
});
</script>

<template>
  <div ref="developerConsole"></div>
</template>
