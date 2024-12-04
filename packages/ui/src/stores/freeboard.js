import { defineStore } from "pinia";
import { useDashboardStore } from "./dashboard";
import renderComponent from "../render-component";

export const useFreeboardStore = defineStore("freeboard", {
  state: () => ({
    isSaved: false,
    allowEdit: false,
    isEditing: false,
    showLoadingIndicator: true,
    datasourcePlugins: {},
    widgetPlugins: {},
  }),
  actions: {
    setIsSaved(isSaved) {
      this.isSaved = isSaved;
    },
    toggleLoadingIndicator() {
      this.showLoadingIndicator = !this.showLoadingIndicator;
    },
    toggleAllowEdit() {
      this.allowEdit = !this.allowEdit;
    },
    toggleIsEditing() {
      this.isEditing = !this.isEditing;
    },
    loadDatasourcePlugin(plugin) {
      if (plugin.label === undefined) {
        plugin.label = plugin.typeName;
      }

      this.datasourcePlugins[plugin.typeName] = plugin;
    },
    loadWidgetPlugin(plugin) {
      if (plugin.label === undefined) {
        plugin.label = plugin.typeName;
      }

      this.widgetPlugins[plugin.typeName] = plugin;
    },
    loadDashboard(dashboardData, callback) {
      const dashboardStore = useDashboardStore();
      this.showLoadingIndicator = true;
      dashboardStore.deserialize(dashboardData, () => {
        this.showLoadingIndicator = false;

        if (typeof callback === "function") {
          callback();
        }
      });
    },
    loadDashboardFromLocalFile() {
      // Check for the various File API support.
      if (window.File && window.FileReader && window.FileList && window.Blob) {
        let input = document.createElement("input");
        input.type = "file";
        input.addEventListener("change", (event) => {
          let files = event.target.files;

          if (files && files.length > 0) {
            let file = files[0];
            let reader = new FileReader();

            reader.addEventListener("load", (fileReaderEvent) => {
              let textFile = fileReaderEvent.target;
              let jsonObject = JSON.parse(textFile.result);

              this.loadDashboard(jsonObject);
              this.isEditing = true;
            });

            reader.readAsText(file);
          }
        });
        input.click();
      } else {
        alert("Unable to load a file in this browser.");
      }
    },
    saveDashboard(pretty) {
      const dashboardStore = useDashboardStore();
      let contentType = "application/octet-stream";
      let a = document.createElement("a");
      let blob;
      if (pretty) {
        blob = new Blob([JSON.stringify(dashboardStore.serialize(), null, 2)], {
          type: contentType,
        });
      } else {
        blob = new Blob([JSON.stringify(dashboardStore.serialize())], {
          type: contentType,
        });
      }
      document.body.appendChild(a);
      a.href = window.URL.createObjectURL(blob);
      a.download = "dashboard.json";
      a.target = "_self";
      a.click();
    },
    getDatasourceTypes() {
      let returnTypes = [];

      this.datasourcePlugins.forEach(function (datasourcePluginType) {
        let typeName = datasourcePluginType.type_name;
        let displayName = typeName;

        if (datasourcePluginType.display_name !== undefined) {
          displayName = datasourcePluginType.display_name;
        }

        returnTypes.push({
          name: typeName,
          display_name: displayName,
        });
      });

      return returnTypes;
    },

    getWidgetTypes() {
      let returnTypes = [];

      this.widgetPlugins.forEach(function (widgetPluginType) {
        let typeName = widgetPluginType.type_name;
        let displayName = typeName;

        if (widgetPluginType.display_name !== undefined) {
          displayName = widgetPluginType.display_name;
        }

        returnTypes.push({
          name: typeName,
          display_name: displayName,
        });
      });

      return returnTypes;
    },
    createComponent(component, props = {}) {
      const el = document.body.appendChild(document.createElement("div"));
      const c = renderComponent({
        el,
        component,
        props: {
          ...props,
          onClose: (event) => {
            if (props.onClose) {
              props.onClose(event);
            }
            c.destroy();
            document.body.removeChild(el);
          },
        },
      });
    },
  },
});
