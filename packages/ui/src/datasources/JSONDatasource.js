export class JSONDatasource {
  static typeName = "json";
  static label = "JSON";
  static fields = [
    {
      name: "url",
      label: "URL",
      type: "text",
    },
    {
      name: "useProxy",
      label: "Use Proxy",
      description:
        "A direct JSON connection will be tried first, if that fails, a JSONP connection will be tried. If that fails, you can use the Proxy.",
      type: "boolean",
      default: true,
    },
    {
      name: "refresh",
      label: "Refresh Every",
      type: "number",
      suffix: "seconds",
      default: 5,
    },
    {
      name: "method",
      label: "Method",
      type: "option",
      default: "GET",
      required: true,
      options: [
        {
          label: "GET",
          value: "GET",
        },
        {
          label: "POST",
          value: "POST",
        },
        {
          label: "PUT",
          value: "PUT",
        },
        {
          label: "DELETE",
          value: "DELETE",
        },
      ],
    },
    {
      name: "body",
      label: "Body",
      type: "text",
      description:
        "The body of the request. Normally only used if method is POST",
    },
    {
      name: "headers",
      label: "Headers",
      type: "array",
      settings: [
        {
          name: "name",
          label: "Name",
          type: "text",
        },
        {
          name: "value",
          label: "Value",
          type: "text",
        },
      ],
    },
  ];

  static newInstance(settings, newInstanceCallback, updateCallback) {
    newInstanceCallback(new JSONDatasource(settings, updateCallback));
  }

  updateTimer;
  currentSettings;
  updateCallback;
  errorStage = 0; // 0 = try standard request
  // 1 = try JSONP
  // 2 = try Proxy
  lockErrorStage = false;

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
    if (
      (this.errorStage > 1 && !this.currentSettings.useProxy) ||
      this.errorStage > 2
    ) {
      // We've tried everything, let's quit
      return; // TODO: Report an error
    }

    let requestURL = this.currentSettings.url;

    if (this.errorStage == 2 && this.currentSettings.useProxy) {
      requestURL = "/proxy/" + encodeURI(this.currentSettings.url);
    }

    let body = this.currentSettings.body;

    // Can the body be converted to JSON?
    if (body) {
      try {
        body = JSON.parse(body);
      } catch (e) {}
    }

    fetch(requestURL, {
      dataType: this.errorStage == 1 ? "JSONP" : "JSON",
      type: this.currentSettings.method || "GET",
      data: body,
      beforeSend: (xhr) => {
        try {
          this.currentSettings.headers.forEach((header) => {
            const name = header.name;
            const value = header.value;

            if (name && value) {
              xhr.setRequestHeader(name, value);
            }
          });
        } catch (e) {}
      },
      success: (data) => {
        this.lockErrorStage = true;
        this.updateCallback({ data: data });
      },
      error: () => {
        if (!this.lockErrorStage) {
          this.errorStage++;
          this.updateNow();
        }
      },
    });
  }

  onDispose() {
    clearInterval(this.updateTimer);
    this.updateTimer = null;
  }

  onSettingsChanged(newSettings) {
    this.lockErrorStage = false;
    this.errorStage = 0;

    this.currentSettings = newSettings;
    this.updateRefresh(this.currentSettings.refresh * 1000);
    this.updateNow();
  }
}
