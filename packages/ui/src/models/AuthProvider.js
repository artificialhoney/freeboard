import { storeToRefs } from "pinia";
import { useFreeboardStore } from "../stores/freeboard";

export class AuthProvider {
  title = null;
  enabled = true;
  _type = null;
  _settings = null;

  set type(newValue) {
    const freeboardStore = useFreeboardStore();
    const { authPlugins } = storeToRefs(freeboardStore);
    if (!this.authProviderInstance) {
      this.authProviderInstance = new authPlugins.value[newValue](
        this.settings,
      );
    }
    this._type = newValue;
    this.updateAuthProviderInstance();
  }

  get type() {
    return this._type;
  }

  set settings(newValue) {
    this._settings = newValue;
    this.updateAuthProviderInstance();
  }

  get settings() {
    return this._settings;
  }

  serialize() {
    return {
      title: this.title,
      type: this.type,
      settings: this.settings,
      enabled: this.enabled,
    };
  }

  deserialize(object) {
    this._type = object.type;
    this._settings = object.settings;
    this.name = object.name;
    this.enabled = object.enabled;
    this.title = object.title;
    this.updateAuthProviderInstance();
  }

  updateAuthProviderInstance() {
    if (!this.type || !this.settings) {
      return;
    }
    const freeboardStore = useFreeboardStore();
    const { authPlugins } = storeToRefs(freeboardStore);
    if (!this.authProviderInstance) {
      this.authProviderInstance = new authPlugins.value[this.type](
        this.settings,
      );
    }
  }
}
