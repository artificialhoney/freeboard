import { defineStore, storeToRefs } from "pinia";
import { useFreeboardStore } from "./freeboard";

export const SERIALIZATION_VERSION = 1;
export const MIN_COLUMNS = 3;

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
    const { datasourceData } = storeToRefs(freeboardStore);

    this.disposeDatasourceInstance();

    if (
      newValue in datasourceData &&
      typeof datasourceData[newValue].newInstance === "function"
    ) {
      let datasourceType = datasourceData[newValue];

      function finishLoad() {
        datasourceType.newInstance(
          this.settings.value,
          function (datasourceInstance) {
            this.datasourceInstance = datasourceInstance;
            datasourceInstance.updateNow();
          },
          this.updateCallback,
        );
      }

      // Do we need to load any external scripts?
      if (datasourceType.external_scripts) {
        // TODO
        head.js(datasourceType.external_scripts.slice(0), finishLoad); // Need to clone the array because head.js adds some weird functions to it
      } else {
        finishLoad();
      }
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
    const freeboardStore = useFreeboardStore();
    freeboardStore.processDatasourceUpdate(this, newData);

    this.latestData = newData;

    let now = new Date();
    this.lastUpdated = now.toLocaleTimeString();
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

  thisgetDataRepresentation(dataPath) {
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
  _colWidth = 1;

  set colWidth(newValue) {
    this.processSizeChange();
    this._colWidth = this.colWidth;
  }

  get colWidth() {
    return this._colWidth;
  }

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

  processSizeChange() {
    // Give the animation a moment to complete. Really hacky.
    // TODO: Make less hacky. Also, doesn't work when screen resizes.
    setTimeout(() => {
      this.widgets.forEach(function (widget) {
        widget.processSizeChange();
      });
    }, 1000);
  }

  getCalculatedHeight() {
    let sumHeights = this.widgets.reduce(function (memo, widget) {
      return memo + widget.height;
    }, 0);

    sumHeights *= 6;
    sumHeights += 3;

    sumHeights *= 10;

    let rows = Math.ceil((sumHeights + 20) / 30);

    return Math.max(4, rows);
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
  shouldRender = false;
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
      newValue in widgetPlugins.value &&
      typeof widgetPlugins.value[newValue].newInstance === "function"
    ) {
      let widgetType = widgetPlugins.value[newValue];

      const finishLoad = () => {
        widgetType.newInstance(this.settings, (widgetInstance) => {
          this.fillSize = widgetType.fill_size;
          this.widgetInstance = widgetInstance;
          this.shouldRender = true;
        });
      };

      // TODO
      // Do we need to load any external scripts?
      if (widgetType.external_scripts) {
        head.js(widgetType.external_scripts.slice(0), finishLoad); // Need to clone the array because head.js adds some weird functions to it
      } else {
        finishLoad();
      }
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

  processDatasourceUpdate(datasourceName) {
    let refreshSettingNames =
      this.datasourceRefreshNotifications[datasourceName];

    if (refreshSettingNames.constructor === Array) {
      refreshSettingNames.forEach(function (settingName) {
        this.processCalculatedSetting(settingName);
      });
    }
  }

  callValueFunction(theFunction) {
    const freeboardStore = useFreeboardStore();
    const { datasourceData } = storeToRefs(freeboardStore);
    return theFunction.call(undefined, datasourceData);
  }

  thisprocessSizeChange() {
    if (
      this.widgetInstance !== undefined &&
      typeof this.widgetInstance.onSizeChanged === "function"
    ) {
      this.widgetInstance.onSizeChanged();
    }
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
        } catch (e) {
          // TODO
          // console.log(e.toString());
        }
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
    let settingsDefs = widgetPlugins.value[this.type].settings;
    let datasourceRegex = new RegExp(
      "datasources.([\\w_-]+)|datasources\\[['\"]([^'\"]+)",
      "g",
    );
    let currentSettings = this.settings;

    settingsDefs.forEach(function (settingDef) {
      if (settingDef.type == "calculated") {
        let script = currentSettings[settingDef.name];

        if (script !== undefined) {
          if (script.constructor === Array) {
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

  // TODO
  /*
  this._heightUpdate = ko.observable();
  this.height = ko.computed({
    read: function () {
      self._heightUpdate();

      if (
        self.widgetInstance !== undefined &&
        typeof self.widgetInstance.getHeight === 'function'
      ) {
        return self.widgetInstance.getHeight();
      }

      return 1;
    },
  })
    */

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

export const useDashboardStore = defineStore("dashboards", {
  state: () => ({
    title: null,
    board: null,
    published: true,
    headerImage: null,
    datasources: [],
    userColumns: MIN_COLUMNS,
    maxWidth: "md",
    panes: [],
  }),
  actions: {
    decreaseMaxWidth() {
      if (this.maxWidth === "md") {
        return;
      }
      if (this.maxWidth === "lg") {
        this.maxWidth = "md";
      } else {
        this.maxWidth = "lg";
      }
    },
    increaseMaxWidth() {
      if (this.maxWidth === "xl") {
        return;
      }
      if (this.maxWidth === "lg") {
        this.maxWidth = "xl";
      } else {
        this.maxWidth = "lg";
      }
    },
    getUserColumns() {
      return this.userColumns;
    },
    setUserColumns(numCols) {
      this.userColumns = Math.max(MIN_COLUMNS, numCols);
    },
    addDatasource(datasource) {
      this.datasources = [...this.datasources, datasource];
    },
    deleteDatasource(datasource) {
      const { datasourceData } = useFreeboardStore();
      delete datasourceData[datasource.name.value];
      datasource.dispose();
      this.datasources = this.datasources.filter(function (item) {
        return item !== datasource;
      });
    },
    serialize() {
      let panes = [];

      this.panes.forEach((pane) => {
        panes.push(pane.serialize());
      });

      let datasources = [];

      this.datasources.forEach(function (datasource) {
        datasources.push(datasource.serialize());
      });

      return {
        version: SERIALIZATION_VERSION,
        headerImage: this.headerImage,
        plugins: this.plugins,
        panes: panes,
        datasources: datasources,
        columns: this.getUserColumns(),
      };
    },

    deserialize(object, finishedCallback) {
      const freeboardStore = useFreeboardStore();
      this.clearDashboard();

      const finishLoad = () => {
        this.setUserColumns(object.columns);
        this.version = object.version || 0;
        this.headerImage = object.headerImage;

        object.datasources.forEach((datasourceConfig) => {
          const datasource = new Datasource();
          datasource.deserialize(datasourceConfig);
          this.addDatasource(datasource);
        });

        const sortedPanes = object.panes.sort((pane) => {
          return freeboardStore.getPositionForScreenSize(pane).row;
        });

        sortedPanes.forEach((paneConfig) => {
          let pane = new Pane();
          pane.deserialize(paneConfig);
          this.addPane(pane);
        });

        if (typeof finishedCallback === "function") {
          finishedCallback();
        }

        // freeboardStore.processResize(true);
      };

      // This could have been self.plugins(object.plugins), but for some weird reason head.js was causing a function to be added to the list of plugins.
      object.plugins?.forEach(function (plugin) {
        this.addPluginSource(plugin);
      });

      // Load any plugins referenced in this definition
      if (object.plugins?.constructor === Array && object.plugins.length > 0) {
        // TODO
        head.js(object.plugins, function () {
          finishLoad();
        });
      } else {
        finishLoad();
      }
    },
    addPane(pane) {
      this.panes = [...this.panes, pane];
    },
    deletePane(pane) {
      const freeboardStore = useFreeboardStore();
      pane.dispose();
      this.panes = this.panes.filter(function (item) {
        return item !== pane;
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
      pane.widgets = pane.widgets.filter(function (item) {
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
