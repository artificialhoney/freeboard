export class HeaderAuthProvider {
  static typeName = "header";
  static label = "Header";
  static fields = [
    {
      name: "header",
      label: "Header",
      type: "text",
      required: true,
    },
    {
      name: "value",
      label: "Value",
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
