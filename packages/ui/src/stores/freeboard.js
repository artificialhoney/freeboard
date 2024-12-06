import { defineStore, storeToRefs } from "pinia";
import renderComponent from "../render-component";
import { Dashboard } from "../models/Dashboard";

export const useFreeboardStore = defineStore("freeboard", {
  state: () => ({
    isSaved: false,
    allowEdit: false,
    isEditing: false,
    showLoadingIndicator: true,
    datasourcePlugins: {},
    widgetPlugins: {},
    dashboard: new Dashboard(),
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
      this.showLoadingIndicator = true;
      this.dashboard = new Dashboard();
      this.dashboard.deserialize(dashboardData, () => {
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
    exportDashboard() {
      const contentType = "application/octet-stream";
      const a = document.createElement("a");
      const blob = new Blob(
        [JSON.stringify(this.dashboard.serialize(), null, 2)],
        {
          type: contentType,
        },
      );
      document.body.appendChild(a);
      a.href = window.URL.createObjectURL(blob);
      a.download = `${this.dashboard.title}.json`;
      a.target = "_self";
      a.click();
    },
    getDatasourceTypes() {
      let returnTypes = [];

      this.datasourcePlugins.forEach((datasourcePluginType) => {
        let typeName = datasourcePluginType.typeName;
        let displayName = typeName;

        if (datasourcePluginType.label !== undefined) {
          displayName = datasourcePluginType.label;
        }

        returnTypes.push({
          name: typeName,
          label: displayName,
        });
      });

      return returnTypes;
    },

    getWidgetTypes() {
      let returnTypes = [];

      this.widgetPlugins.forEach((widgetPluginType) => {
        let typeName = widgetPluginType.typeName;
        let displayName = typeName;

        if (widgetPluginType.label !== undefined) {
          displayName = widgetPluginType.label;
        }

        returnTypes.push({
          name: typeName,
          label: displayName,
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
