import { storeToRefs } from "pinia";
import { useFreeboardStore } from "../stores/freeboard";

export class Widget {
  shouldRender = true;
  enabled = true;
  title = null;
  pane = null;
  _type = null;
  _settings = null;

  constructor(settings, type) {
    this.settings = settings;
    this.type = type;
  }

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

  render(element) {
    this.shouldRender = false;
    if (
      this.widgetInstance !== undefined &&
      typeof this.widgetInstance.render === "function"
    ) {
      this.widgetInstance.render(element);
    }
  }

  dispose() {}

  serialize() {
    return {
      title: this.title,
      type: this.type,
      settings: this.settings,
      enabled: this.enabled
    };
  }

  deserialize(object) {
    this.title = object.title;
    this.type = object.type;
    this.settings = object.settings;
    this.enabled = object.enabled;
  }


  processDatasourceUpdate(datasource) {
    if (
      this.widgetInstance !== undefined &&
      typeof this.widgetInstance.processDatasourceUpdate === "function"
    ) {
      this.widgetInstance.processDatasourceUpdate(datasource);
    }
  }
}
