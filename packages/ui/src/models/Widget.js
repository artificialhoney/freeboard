import { storeToRefs } from "pinia";
import { useFreeboardStore } from "../stores/freeboard";
import nunjucks from "nunjucks";

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
    const freeboardStore = useFreeboardStore();
    const { dashboard } = storeToRefs(freeboardStore);
    return theFunction.call(undefined, dashboard.value.datasources);
  }

  processCalculatedSetting(settingName) {
    if (typeof this.calculatedSettingScripts[settingName] === "function") {
      let returnValue = undefined;

      try {
        returnValue = this.callValueFunction(
          this.calculatedSettingScripts[settingName],
        );
      } catch (e) {
        console.error(e);
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
            /*
            let literalText = currentSettings[settingDef.name]
              .replace(/"/g, '\\"')
              .replace(/[\r\n]/g, " \\\n");
            */

            valueFunction = function (datasources) {
              return nunjucks.renderString(currentSettings[settingDef.name], {
                datasources,
              });
            };
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
      type: this.type,
      settings: this.settings,
    };
  }

  deserialize(object) {
    this.title = object.title;
    this.settings = object.settings;
    this.type = object.type;
  }
}
