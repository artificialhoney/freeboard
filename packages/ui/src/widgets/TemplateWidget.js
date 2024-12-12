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
  ];

  static newInstance(settings, newInstanceCallback) {
    newInstanceCallback(new TemplateWidget(settings));
  }

  templateElement;
  currentSettings;

  constructor(settings) {
    this.currentSettings = settings;
    this.templateElement = document.createElement("div");
    this.templateElement.className = "template-widget";
    this.templateElement.style.width = "100%";
    this.templateElement.style.height = "100%";
    this.onSettingsChanged(settings);
  }

  render(element) {
    element.appendChild(this.templateElement);
  }

  onSettingsChanged(newSettings) {
    this.currentSettings = newSettings;
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
