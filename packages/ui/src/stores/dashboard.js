import { defineStore, storeToRefs } from "pinia";
import { useFreeboardStore } from "./freeboard";

export const MIN_COLUMNS = 3;
export const VERSION = __APP_VERSION__;

export class Datasource {
  name = null;
  latestData = null;
  _settings = {};
  _type = null;
  lastUpdated = null;
  lastError = null;

  set settings(newValue) {
    if (
      this.datasourceInstance !== undefined &&
      typeof this.datasourceInstance.onSettingsChanged === "function"
    ) {
      this.datasourceInstance.onSettingsChanged(newValue);
    }
    this._settings = newValue;
  }

  get settings() {
    return this._settings;
  }

  set type(newValue) {
    const freeboardStore = useFreeboardStore();
    const { datasourcePlugins } = storeToRefs(freeboardStore);

    this.disposeDatasourceInstance();

    if (
      newValue in datasourcePlugins.value &&
      typeof datasourcePlugins.value[newValue].newInstance === "function"
    ) {
      const datasourceType = datasourcePlugins.value[newValue];
      datasourceType.newInstance(
        this.settings,
        (datasourceInstance) => {
          this.datasourceInstance = datasourceInstance;
          datasourceInstance.updateNow();
        },
        (newData) => this.updateCallback(newData),
      );
    }
    this._type = newValue;
  }

  get type() {
    return this._type;
  }

  disposeDatasourceInstance() {
    if (this.datasourceInstance !== undefined) {
      if (typeof this.datasourceInstance.onDispose === "function") {
        this.datasourceInstance.onDispose();
      }

      this.datasourceInstance = undefined;
    }
  }

  updateCallback(newData) {
    this.latestData = newData;
    this.lastUpdated = new Date();
    this.processDatasourceUpdate();
  }

  processDatasourceUpdate() {
    const dashboardStore = useDashboardStore();
    const { panes } = storeToRefs(dashboardStore);

    panes.value?.forEach((pane) => {
      pane.widgets?.forEach((widget) => {
        widget.processDatasourceUpdate();
      });
    });
  }

  serialize() {
    return {
      name: this.name,
      type: this.type,
      settings: this.settings,
    };
  }

  deserialize(object) {
    this.settings = object.settings;
    this.name = object.name;
    this.type = object.type;
  }

  getDataRepresentation(dataPath) {
    const valueFunction = new Function("data", "return " + dataPath + ";");
    return valueFunction.call(undefined, this.latestData);
  }

  updateNow() {
    if (
      this.datasourceInstance !== undefined &&
      typeof this.datasourceInstance.updateNow === "function"
    ) {
      this.datasourceInstance.updateNow();
    }
  }

  dispose() {
    this.disposeDatasourceInstance();
  }
}

export class Pane {
  title = null;
  width = 1;
  row = {};
  col = {};
  widgets = [];

  widgetCanMoveUp(widget) {
    return this.widgets.indexOf(widget) >= 1;
  }

  widgetCanMoveDown(widget) {
    let i = this.widgets.indexOf(widget);

    return i < this.widgets.length - 1;
  }

  moveWidgetUp(widget) {
    if (this.widgetCanMoveUp(widget)) {
      let i = this.widgets.indexOf(widget);
      let array = this.widgets;
      this.widgets.splice(i - 1, 2, array[i], array[i - 1]);
    }
  }

  moveWidgetDown(widget) {
    if (this.widgetCanMoveDown(widget)) {
      let i = this.widgets.indexOf(widget);
      let array = this.widgets;
      this.widgets.splice(i, 2, array[i + 1], array[i]);
    }
  }

  serialize() {
    let widgets = [];

    this.widgets.forEach(function (widget) {
      widgets.push(widget.serialize());
    });

    return {
      title: this.title,
      width: this.width,
      row: this.row,
      col: this.col,
      colWidth: Number(this.colWidth),
      widgets: this.widgets,
    };
  }

  deserialize(object) {
    this.title = object.title;
    this.width = object.width;

    this.row = object.row;
    this.col = object.col;
    this.colWidth = object.colWidth || 1;

    object.widgets.forEach((widgetConfig) => {
      const dashboardStore = useDashboardStore();
      let widget = new Widget();
      widget.deserialize(widgetConfig);
      dashboardStore.addWidget(this, widget);
    });
  }

  dispose() {
    this.widgets.forEach(function (widget) {
      widget.dispose();
    });
  }
}

export class Widget {
  shouldRender = true;
  datasourceRefreshNotifications = {};
  calculatedSettingScripts = {};
  fillSize = 0;
  pane = null;
  _type = null;
  _settings = null;

  set type(newValue) {
    const freeboardStore = useFreeboardStore();
    const { widgetPlugins } = storeToRefs(freeboardStore);
    this.disposeWidgetInstance();
    if (
      widgetPlugins.value[newValue] &&
      typeof widgetPlugins.value[newValue].newInstance === "function"
    ) {
      const widgetType = widgetPlugins.value[newValue];

      widgetType.newInstance(this.settings, (widgetInstance) => {
        this.fillSize = widgetType.fillSize;
        this.widgetInstance = widgetInstance;
        this.shouldRender = true;
      });
    }
    this._type = newValue;
  }

  get type() {
    return this._type;
  }

  set settings(newValue) {
    if (
      this.widgetInstance !== undefined &&
      typeof this.widgetInstance.onSettingsChanged === "function"
    ) {
      this.widgetInstance.onSettingsChanged(newValue);
    }

    this.updateCalculatedSettings();
    // this._heightUpdate.valueHasMutated();
    this._settings = newValue;
  }

  get settings() {
    return this._settings;
  }

  disposeWidgetInstance() {
    if (this.widgetInstance !== undefined) {
      if (typeof this.widgetInstance.onDispose === "function") {
        this.widgetInstance.onDispose();
      }

      this.widgetInstance = undefined;
    }
  }

  processDatasourceUpdate() {
    const key =
      this.datasourceRefreshNotifications &&
      Object.keys(this.datasourceRefreshNotifications)[0];
    if (!key) {
      return;
    }
    const refreshSettingNames = this.datasourceRefreshNotifications[key];
    if (Array.isArray(refreshSettingNames)) {
      refreshSettingNames.forEach((settingName) => {
        this.processCalculatedSetting(settingName);
      });
    }
  }

  callValueFunction(theFunction) {
    const dashboardStore = useDashboardStore();
    const { datasources } = storeToRefs(dashboardStore);
    return theFunction.call(undefined, datasources.value);
  }

  processCalculatedSetting(settingName) {
    if (typeof this.calculatedSettingScripts[settingName] === "function") {
      let returnValue = undefined;

      try {
        returnValue = this.callValueFunction(
          this.calculatedSettingScripts[settingName],
        );
      } catch (e) {
        let rawValue = this.settings[settingName];

        // If there is a reference error and the value just contains letters and numbers, then
        if (e instanceof ReferenceError && /^\w+$/.test(rawValue)) {
          returnValue = rawValue;
        }
      }
      if (
        this.widgetInstance !== undefined &&
        typeof this.widgetInstance.onCalculatedValueChanged === "function" &&
        returnValue !== undefined
      ) {
        try {
          this.widgetInstance.onCalculatedValueChanged(
            settingName,
            returnValue,
          );
        } catch (e) {}
      }
    }
  }

  updateCalculatedSettings() {
    const freeboardStore = useFreeboardStore();
    const { widgetPlugins } = storeToRefs(freeboardStore);

    this.datasourceRefreshNotifications = {};
    this.calculatedSettingScripts = {};

    if (this.type == null) {
      return;
    }

    // Check for any calculated settings
    let settingsDefs = widgetPlugins.value[this.type].fields;
    let datasourceRegex = new RegExp(
      "datasources.([\\w_-]+)|datasources\\[['\"]([^'\"]+)",
      "g",
    );
    const currentSettings = this.settings;

    settingsDefs.forEach((settingDef) => {
      if (settingDef.type == "calculated") {
        let script = currentSettings[settingDef.name];

        if (script !== undefined) {
          if (Array.isArray(script)) {
            script = "[" + script.join(",") + "]";
          }

          // If there is no return, add one
          if (
            (script.match(/;/g) || []).length <= 1 &&
            script.indexOf("return") == -1
          ) {
            script = "return " + script;
          }

          let valueFunction;

          try {
            valueFunction = new Function("datasources", script);
          } catch (e) {
            let literalText = currentSettings[settingDef.name]
              .replace(/"/g, '\\"')
              .replace(/[\r\n]/g, " \\\n");

            // If the value function cannot be created, then go ahead and treat it as literal text
            valueFunction = new Function(
              "datasources",
              'return "' + literalText + '";',
            );
          }

          this.calculatedSettingScripts[settingDef.name] = valueFunction;
          this.processCalculatedSetting(settingDef.name);

          // Are there any datasources we need to be subscribed to?
          let matches;

          while ((matches = datasourceRegex.exec(script))) {
            let dsName = matches[1] || matches[2];
            let refreshSettingNames =
              this.datasourceRefreshNotifications[dsName];

            if (refreshSettingNames === undefined) {
              refreshSettingNames = [];
              this.datasourceRefreshNotifications[dsName] = refreshSettingNames;
            }

            if (refreshSettingNames.indexOf(settingDef.name) === -1) {
              // Only subscribe to this notification once.
              refreshSettingNames.push(settingDef.name);
            }
          }
        }
      }
    });
  }
  render(element) {
    this.shouldRender = false;
    if (
      this.widgetInstance !== undefined &&
      typeof this.widgetInstance.render === "function"
    ) {
      this.widgetInstance.render(element);
      this.updateCalculatedSettings();
    }
  }

  dispose() {}

  serialize() {
    return {
      title: self.title,
      type: self.type,
      settings: self.settings,
    };
  }

  deserialize(object) {
    this.title = object.title;
    this.settings = object.settings;
    this.type = object.type;
  }
}

export const useDashboardStore = defineStore("dashboard", {
  state: () => ({
    version: VERSION,
    _id: null,
    title: "Dashboard",
    published: true,
    image: null,
    columns: MIN_COLUMNS,
    width: "md",
    datasources: [],
    panes: [],
    layout: [],
  }),
  actions: {
    decreaseMaxWidth() {
      if (this.width === "md") {
        return;
      }
      if (this.width === "lg") {
        this.width = "md";
      } else {
        this.width = "lg";
      }
    },
    increaseMaxWidth() {
      if (this.width === "xl") {
        return;
      }
      if (this.width === "lg") {
        this.width = "xl";
      } else {
        this.width = "lg";
      }
    },
    getUserColumns() {
      return this.columns;
    },
    setUserColumns(numCols) {
      this.columns = Math.max(MIN_COLUMNS, numCols);
    },
    serialize() {
      let panes = [];

      this.panes.forEach((pane) => {
        panes.push(pane.serialize());
      });

      let datasources = [];

      this.datasources.forEach((datasource) => {
        datasources.push(datasource.serialize());
      });

      return {
        version: this.version,
        _id: this._id,
        title: this.title,
        published: this.published,
        image: this.image,
        columns: this.columns,
        width: "md",
        datasources: datasources,
        panes: panes,
        layout: this.layout,
      };
    },
    deserialize(object) {
      this.version = object.version;
      this._id = object._id;
      this.title = object.title;
      this.columns = object.columns;
      this.image = object.image;
      this.width = object.width;
      this.published = object.published;
      this.layout = object.layout;

      object.datasources.forEach((datasourceConfig) => {
        const datasource = new Datasource();
        datasource.deserialize(datasourceConfig);
        this.addDatasource(datasource);
      });

      object.panes.forEach((paneConfig) => {
        let pane = new Pane();
        pane.deserialize(paneConfig);
        this.addPane(pane);
      });
    },
    addDatasource(datasource) {
      this.datasources = [...this.datasources, datasource];
    },
    deleteDatasource(datasource) {
      const { datasourcePlugins } = useFreeboardStore();
      delete datasourcePlugins[datasource.name.value];
      datasource.dispose();
      this.datasources = this.datasources.filter((item) => {
        return item !== datasource;
      });
    },
    addPane(pane) {
      this.panes = [...this.panes, pane];
    },
    deletePane(pane) {
      pane.dispose();
      this.panes = this.panes.filter((item) => {
        return item !== pane;
      });
      this.layout = this.layout.filter((item) => {
        return item.pane !== pane;
      });
    },
    createPane() {
      const newPane = new Pane();
      newPane.title = "Pane";
      this.addPane(newPane);
    },
    addWidget(pane, widget) {
      pane.widgets.push(widget);
      widget.pane = pane;
      this.panes = [...this.panes];
    },
    deleteWidget(pane, widget) {
      pane.widgets = pane.widgets.filter((item) => {
        return item !== widget;
      });
      this.panes = [...this.panes];
    },
    clearDashboard() {
      this.datasources.forEach((datasource) => {
        datasource.dispose();
      });

      this.panes.forEach((pane) => {
        pane.dispose();
      });

      this.datasources = [];
      this.panes = [];
    },
  },
});
