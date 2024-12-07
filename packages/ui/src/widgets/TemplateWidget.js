export class TemplateWidget {
  static typeName = "template";
  static label = "Template";
  static fillSize = true;
  static fields = [
    {
      name: "template",
      label: "Template",
      type: "calculated",
      description: "Can be a HTML template, or javascript that outputs HTML.",
    },
    {
      name: "resources",
      label: "Resources",
      type: "array",
      settings: [
        {
          name: "type",
          label: "Type",
          type: "option",
          required: true,
          default: "script",
          options: [
            {
              label: "script",
              value: "script",
            },
            {
              label: "stylesheet",
              value: "stylesheet",
            },
          ],
        },
        {
          name: "url",
          label: "URL",
          type: "text",
        },
      ],
    },
  ];

  static newInstance(settings, newInstanceCallback) {
    newInstanceCallback(new TemplateWidget(settings));
  }

  templateElement;
  resourceElements = [];
  currentSettings;

  constructor(settings) {
    this.currentSettings = settings;
    this.templateElement = document.createElement("div");
    this.templateElement.className = "template-widget";
    this.onSettingsChanged(settings);
  }

  render(element) {
    element.appendChild(this.templateElement);
  }

  onSettingsChanged(newSettings) {
    this.currentSettings = newSettings;

    this.resourceElements?.forEach((element) => element.remove());
    this.resourceElements = newSettings?.resources?.map((element) => {
      if (element.type === "stylesheet") {
        const link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = element.url;
        return link;
      } else {
        const script = document.createElement("script");
        script.type = "application/javascript";
        script.src = element.url;
        return script;
      }
    });

    this.resourceElements?.forEach((element) =>
      document.head.appendChild(element),
    );
  }

  onCalculatedValueChanged(settingName, newValue) {
    if (settingName !== "template") {
      return;
    }
    this.templateElement.innerHTML = newValue;
  }

  onDispose() {
    this.templateElement.remove();
  }
}
