export class ClockDatasource {
  static typeName = "clock";
  static label = "Clock";
  static fields = [
    {
      name: "refresh",
      label: "Refresh Every",
      type: "number",
      suffix: "seconds",
      default: 1,
    },
  ];

  static newInstance(settings, newInstanceCallback, updateCallback) {
    newInstanceCallback(new ClockDatasource(settings, updateCallback));
  }

  timer;
  currentSettings;
  updateCallback;

  constructor(settings, updateCallback) {
    this.currentSettings = settings;
    this.updateCallback = updateCallback;
    this.updateTimer();
  }

  stopTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }

  updateTimer() {
    this.stopTimer();
    this.timer = setInterval(
      () => this.updateNow(),
      this.currentSettings.refresh * 1000,
    );
  }

  updateNow() {
    this.updateCallback({
      value: new Date(),
    });
  }

  onDispose() {
    this.stopTimer();
  }

  onSettingsChanged(newSettings) {
    this.currentSettings = newSettings;
    this.updateTimer();
  }
}
