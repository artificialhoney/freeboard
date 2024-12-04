export class HTMLWidget {
  static typeName = "html";
  static label = "HTML";
  static fillSize = true;
  static fields = [
    {
      name: "html",
      label: "HTML",
      type: "calculated",
      description: "Can be literal HTML, or javascript that outputs HTML.",
    },
    {
      name: "height",
      label: "Height Blocks",
      type: "number",
      default: 4,
      description: "A height block is around 60 pixels",
    },
  ];

  static newInstance(settings, newInstanceCallback) {
    newInstanceCallback(new HTMLWidget(settings));
  }

  htmlElement;
  currentSettings;

  constructor(settings) {
    this.htmlElement = document.createElement("div");
    this.htmlElement.className = "html-widget";
    this.htmlElement.style.whiteSpace = "normal";
    this.htmlElement.style.width = "100%";
    this.htmlElement.style.height = "100%";
    this.onSettingsChanged(settings);
  }

  render(element) {
    element.appendChild(this.htmlElement);
  }

  onSettingsChanged(newSettings) {
    this.currentSettings = newSettings;
  }

  onCalculatedValueChanged(settingName, newValue) {
    if (settingName == "html") {
      this.htmlElement.html(newValue);
    }
  }

  onDispose() {}

  getHeight() {
    return Number(this.currentSettings.height);
  }
}
