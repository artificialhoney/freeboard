export class ClockDatasource {
  static typeName = "clock";
  static label = "Clock";
  static fields = (datasource, dashboard, general) => [
    {
      ...general,
      settings: {
        ...general.settings,
        refresh: datasource?.settings.refresh
      },
      fields: [
        ...general.fields,
        {
          name: "refresh",
          label: "form.labelRefresh",
          type: "number",
          suffix: "form.suffixRefresh",
          default: 1,
        },
      ],
    },
  ];

  static newInstance(settings, newInstanceCallback, updateCallback) {
    newInstanceCallback(new ClockDatasource(settings, updateCallback));
  }

  updateTimer;
  currentSettings;
  updateCallback;

  constructor(settings, updateCallback) {
    this.currentSettings = settings;
    this.updateCallback = updateCallback;
    this.updateRefresh(this.currentSettings.refresh * 1000);
  }

  updateRefresh(refreshTime) {
    if (this.updateTimer) {
      clearInterval(this.updateTimer);
    }

    this.updateTimer = setInterval(() => {
      this.updateNow();
    }, refreshTime);
  }

  updateNow() {
    this.updateCallback({
      data: new Date(),
    });
  }

  onDispose() {
    clearInterval(this.updateTimer);
    this.updateTimer = null;
  }

  onSettingsChanged(newSettings) {
    this.currentSettings = newSettings;
    this.updateRefresh(this.currentSettings.refresh * 1000);
    this.updateNow();
  }
}
