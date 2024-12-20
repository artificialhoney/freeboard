export class TemplateWidget {
  static typeName = "template";
  static label = "Template";
  static fields = () => [
    {
      name: "template",
      label: "form.labelTemplate",
      type: "calculated",
      description: "form.descriptionTemplate",
    },
  ];

  static newInstance(settings, newInstanceCallback) {
    newInstanceCallback(new TemplateWidget(settings));
  }

  widgetElement;
  currentSettings;

  constructor(settings) {
    this.currentSettings = settings;
    this.widgetElement = document.createElement("div");
    this.widgetElement.className = "template-widget";
    this.widgetElement.style.width = "100%";
    this.widgetElement.style.height = "100%";
    this.onSettingsChanged(settings);
  }

  render(element) {
    element.appendChild(this.widgetElement);
  }

  onSettingsChanged(newSettings) {
    this.currentSettings = newSettings;
  }

  onCalculatedValueChanged(settingName, newValue) {
    if (settingName !== "template") {
      return;
    }
    this.widgetElement.innerHTML = newValue;
  }

  onDispose() {
    this.widgetElement.remove();
  }
}
