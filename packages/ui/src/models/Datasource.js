import { storeToRefs } from "pinia";
import { useFreeboardStore } from "../stores/freeboard";

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
    const freeboardStore = useFreeboardStore();
    const { dashboard } = storeToRefs(freeboardStore);

    this.latestData = newData;
    this.lastUpdated = new Date();
    dashboard.value.processDatasourceUpdate();
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
