export class HeaderAuthProvider {
  static typeName = "header";
  static label = "Header";
  static fields = [
    {
      name: "header",
      label: "form.labelHeader",
      type: "text",
      required: true,
    },
    {
      name: "value",
      label: "form.labelValue",
      type: "text",
      required: true,
    },
  ];

  currentSettings = null;

  constructor(settings) {
    this.settings = settings;
  }

  set settings(settings) {
    this.currentSettings = settings;
  }

  get settings() {
    return this.currentSettings;
  }
  createRequest = async () => {
    return {
      headers: {
        [`${this.currentSettings.header}`]: this.currentSettings.value,
      },
    };
  };
}
