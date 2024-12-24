import { defineStore, storeToRefs } from "pinia";
import renderComponent from "../render";
import { Dashboard } from "../models/Dashboard";
import { useI18n } from "vue-i18n";
import { usePreferredColorScheme } from "@vueuse/core";
import { useMutation } from "@vue/apollo-composable";
import { DASHBOARD_CREATE_MUTATION, DASHBOARD_UPDATE_MUTATION } from "../gql";

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
    loadSettingsFromLocalStorage(dashboard) {
      const item = localStorage.getItem("freeboard");
      if (!item) {
        return;
      }
      const settings = JSON.parse(item);
      if (settings.token) {
        this.token = settings.token;
      }
      if (dashboard && settings.dashboard) {
        this.dashboard = new Dashboard();
        this.dashboard.deserialize(settings.dashboard);
      }
    },
    saveSettingsToLocalStorage() {
      const settings = {};
      if (this.token) {
        settings.token = this.token;
      }
      if (this.dashboard) {
        settings.dashboard = this.dashboard.serialize();
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
    async saveDashboard(id, dashboard, createDashboard, updateDashboard) {
      if (this.isSaved && this.dashboard.isOwner) {
        updateDashboard({ id, dashboard: dashboard });
      } else {
        const result = await createDashboard({ dashboard: dashboard });
        this.isSaved = true;
        this.dashboard._id = result.data.createDashboard._id;
        router.push(`/${result.data.createDashboard._id}`);
      }
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
    loadDashboardTheme() {
      let cssClass;
      if (this.dashboard.settings.theme === "auto") {
        const colorScheme = usePreferredColorScheme();
        cssClass = colorScheme.value === "dark" ? "dark" : "light";
      } else if (this.dashboard.settings.theme === "dark") {
        cssClass = "dark";
      } else {
        cssClass = "light";
      }
      document.body.className = cssClass;
    },
    loadDashboard(dashboardData) {
      this.showLoadingIndicator = true;
      this.dashboard = new Dashboard();
      this.dashboard.deserialize(dashboardData);
      this.loadDashboardAssets();
      this.loadDashboardTheme();
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
    getAuthPluginFields(authProvider) {
      const a = this.authPlugins[authProvider.typeName];
      if (typeof a.fields === "function") {
        return a.fields(authProvider, this.dashboard);
      } else {
        return a.fields;
      }
    },
    getDatasourcePluginFields(datasource) {
      const d = this.datasourcePlugins[datasource.typeName];
      if (typeof d.fields === "function") {
        return d.fields(datasource, this.dashboard);
      } else {
        return d.fields;
      }
    },
    getWidgetPluginFields(widget) {
      if (typeof widget.constructor.fields === "function") {
        return widget.constructor.fields(widget, this.dashboard);
      } else {
        widget.constructor.fields;
      }
    },
  },
});
