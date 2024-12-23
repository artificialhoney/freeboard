import { storeToRefs } from "pinia";
import { useFreeboardStore } from "../stores/freeboard";
import proxy from "../proxy";

export class JSONDatasource {
  static typeName = "json";
  static label = "JSON";
  static fields = (datasource, dashboard, general) => [
    {
      ...general,
      settings: {
        ...general.settings,
        url: datasource?.settings.url,
        refresh: datasource?.settings.refresh,
        useProxy: datasource?.settings.useProxy,
      },
      fields: [
        ...general.fields,
        {
          name: "url",
          label: "form.labelUrl",
          type: "text",
          required: true,
        },
        {
          name: "useProxy",
          label: "form.labelUseProxy",
          type: "boolean",
          default: true,
        },
        {
          name: "refresh",
          label: "form.labelRefresh",
          type: "number",
          suffix: "form.suffixRefresh",
          default: 5,
          required: true,
        },
      ]
    },
    {
      label: "form.labelHTTP",
      icon: "hi-briefcase",
      name: "http",
      settings: {
        method: datasource?.settings.method,
        body: datasource?.settings.body
      },
      fields: [
        {
          name: "method",
          label: "form.labelMethod",
          type: "option",
          default: "GET",
          required: true,
          options: [
            {
              label: "form.labelMethodGET",
              value: "GET",
            },
            {
              label: "form.labelMethodPOST",
              value: "POST",
            },
            {
              label: "form.labelMethodPUT",
              value: "PUT",
            },
            {
              label: "form.labelMethodDELETE",
              value: "DELETE",
            },
          ],
        },
        {
          name: "body",
          label: "form.labelBody",
          type: "code",
          language: 'json'
        },
      ],
    },
    {
      label: "form.labelAuth",
      icon: "hi-eye",
      name: "auth",
      settings: {
        authProvider: datasource?.settings.authProvider
      },
      fields: [
        {
          name: "authProvider",
          label: "form.labelAuthProvider",
          type: "option",
          placeholder: "form.placeholderAuthProvider",
          options: dashboard.authProviders.map((a) => {
            return {
              value: a.name,
              label: a.name,
            };
          }),
        },
      ]
    }
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

  async updateNow() {
    if (this.errorStage > 2) {
      // We've tried everything, let's quit
      return; // TODO: Report an error
    }

    let requestURL = this.currentSettings.url;

    if (!requestURL) {
      return;
    }

    if (this.currentSettings.useProxy) {
      requestURL = proxy(this.currentSettings.url);
    }

    let body = this.currentSettings.body;

    // Can the body be converted to JSON?
    if (body) {
      try {
        body = JSON.parse(body);
      } catch (e) {}
    }

    const freeboardStore = useFreeboardStore();
    const { dashboard } = storeToRefs(freeboardStore);

    const authorizedRequest = this.currentSettings.authProvider
      ? await dashboard.value
          .getAuthProviderByName(this.currentSettings.authProvider)
          .createRequest()
      : { headers: {} };

    authorizedRequest.headers["Content-Type"] = "application/json";

    fetch(requestURL, {
      method: this.currentSettings.method || "GET",
      body: body,
      ...authorizedRequest,
    })
      .then((response) => response.json())
      .then((data) => {
        this.lockErrorStage = true;
        this.updateCallback({ data });
      })
      .catch(() => {
        if (!this.lockErrorStage) {
          this.errorStage++;
          this.updateNow();
        }
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
