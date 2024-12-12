import { defineStore, storeToRefs } from "pinia";
import renderComponent from "../render";
import { Dashboard } from "../models/Dashboard";

export const useFreeboardStore = defineStore("freeboard", {
  state: () => ({
    isSaved: false,
    allowEdit: false,
    isEditing: false,
    showLoadingIndicator: true,
    datasourcePlugins: {},
    widgetPlugins: {},
    authPlugins: {},
    dashboard: new Dashboard(),
    assets: {},
    token: null,
  }),
  actions: {
    loadSettingsFromLocalStorage() {
      const item = localStorage.getItem("freeboard");
      if (!item) {
        return;
      }
      const settings = JSON.parse(item);
      if (settings.token) {
        this.token = settings.token;
      }
    },
    saveSettingsToLocalStorage() {
      const settings = {};
      if (this.token) {
        settings.token = this.token;
      }
      localStorage.setItem("freeboard", JSON.stringify(settings));
    },
    login(token) {
      this.token = token;
      this.saveSettingsToLocalStorage();
    },
    logout() {
      this.token = null;
      this.saveSettingsToLocalStorage();
    },
    isLoggedIn() {
      return !!this.token;
    },
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
    loadAuthPlugin(plugin) {
      if (plugin.label === undefined) {
        plugin.label = plugin.typeName;
      }

      this.authPlugins[plugin.typeName] = plugin;
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
    createAsset(type, value, inline) {
      let node = null;
      if (inline) {
        if (type === "style") {
          const style = document.createElement("style");
          style.appendChild(document.createTextNode(value));
          node = style;
        } else {
          const script = document.createElement("script");
          script.type = "application/javascript";
          script.appendChild(document.createTextNode(value));
          node = script;
        }
      } else {
        if (type === "style") {
          const link = document.createElement("link");
          link.type = "text/css";
          link.rel = "stylesheet";
          link.href = value;
          node = link;
        } else {
          const script = document.createElement("script");
          script.type = "application/javascript";
          script.src = value;
          node = script;
        }
      }

      return {
        node,
        type,
        value,
        inline,
      };
    },
    loadDashboardAssets() {
      this.showLoadingIndicator = true;
      const assets = {};
      Object.values(assets).forEach((asset) => {
        asset.node.remove();
        asset.node = null;
      });

      const head = document.head || document.getElementsByTagName("head")[0];

      if (this.dashboard.settings.script) {
        const script = this.createAsset(
          "script",
          this.dashboard.settings.script,
          true,
        );
        head.appendChild(script.node);
        assets["script"] = script;
      }

      if (this.dashboard.settings.style) {
        const style = this.createAsset(
          "style",
          this.dashboard.settings.style,
          true,
        );
        head.appendChild(style.node);
        assets["style"] = style;
      }

      if (Array.isArray(this.dashboard.settings.resources)) {
        const resources = this.dashboard.settings.resources;
        resources.forEach((element) => {
          const node = this.createAsset(element.type, element.url);
          head.appendChild(node.node);
          assets[element.url] = node;
        });
      }

      this.assets = assets;
      this.showLoadingIndicator = false;
    },
    loadDashboard(dashboardData) {
      this.showLoadingIndicator = true;
      this.dashboard = new Dashboard();
      this.dashboard.deserialize(dashboardData);
      this.loadDashboardAssets();
      this.showLoadingIndicator = false;
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
    createComponent(component, appContext, props = {}) {
      const el = document.body.appendChild(document.createElement("div"));
      const c = renderComponent({
        el,
        component,
        appContext,
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
    getAuthPluginFields(typeName) {
      const authProvider = this.authPlugins[typeName];
      if (typeof authProvider.fields === "function") {
        return authProvider.fields(this.dashboard);
      } else {
        return authProvider.fields;
      }
    },
    getDatasourcePluginFields(typeName) {
      const datasource = this.datasourcePlugins[typeName];
      if (typeof datasource.fields === "function") {
        return datasource.fields(this.dashboard);
      } else {
        return datasource.fields;
      }
    },
    getWidgetPluginFields(typeName) {
      const widget = this.widgetPlugins[typeName];
      if (typeof widget.fields === "function") {
        return widget.fields(this.dashboard);
      } else {
        return widget.fields;
      }
    },
  },
});
