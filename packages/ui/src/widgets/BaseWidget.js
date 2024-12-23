export class BaseWidget {
  static typeName = "base";
  static label = "Base";
  static fields = (widget, dashboard, general) => [
    general,
    {
      label: "form.labelStyle",
      icon: "hi-beaker",
      name: "style",
      settings: {
        style: widget?.settings.style,
      },
      fields: [
        {
          name: "style",
          label: "form.labelStyle",
          type: "code",
          language: "css",
        },
      ],
    },
    {
      label: "form.labelScript",
      icon: "hi-variable",
      name: "script",
      settings: {
        script: widget?.settings.script,
      },
      fields: [
        {
          name: "script",
          label: "form.labelScript",
          type: "code",
          language: "javascript",
        },
      ],
    },
    {
      label: "form.labelHTML",
      icon: "hi-code",
      name: "html",
      settings: {
        html: widget?.settings.html,
      },
      fields: [
        {
          name: "html",
          label: "form.labelHTML",
          type: "code",
          language: "html",
        },
      ],
    },
    {
      label: "form.labelResources",
      icon: "hi-archive",
      name: "resources",
      settings: {
        resources: widget?.settings.resources,
      },
      fields: [
        {
          name: "resources",
          label: "form.labelResources",
          type: "array",
          settings: [
            {
              name: "url",
              label: "form.labelUrl",
              type: "list",
              options: fetch("https://api.cdnjs.com/libraries/")
                .then((r) => r.json())
                .then((data) =>
                  data.results.map((r) => ({
                    value: r.latest,
                    label: r.name,
                  }))
                ),
            },
          ],
        },
      ],
    },
  ];

  static template({style, script, html, resources}) {
    const res = resources?.map((r) => {
      if (r.type === "style") {
        return `<link rel="stylesheet" type="text/css href="${r.url}"></link>`;
      } else {
        return `<script src="${r.url}"></script>`;
      }
    }) || [];
    return `
<!DOCTYPE html>
<html lang="en">
  <head>
    ${res.join("")}
    <style>${style}</style>
    <meta charset="utf-8" />
  </head>
  <body>
    ${html}
    <script>${script}</script>
  </body>
</html>
    `;
  }

  static newInstance(settings, newInstanceCallback) {
    newInstanceCallback(new BaseWidget(settings));
  }

  iframeElement;
  iframeSrc;
  widgetElement;
  currentSettings;
  element;

  constructor(settings) {
    this.currentSettings = settings;
    this.widgetElement = document.createElement("div");
    this.widgetElement.className = "template-widget";
    this.widgetElement.style.width = "100%";
    this.widgetElement.style.height = "100%";

    this.iframeElement = document.createElement("iframe");
    this.iframeElement.style.width = "100%";
    this.iframeElement.style.height = "100%";

    this.widgetElement.appendChild(this.iframeElement);
    this.onSettingsChanged(settings);
  }

  render(element) {
    if (this.element === element) {
      return;
    }
    this.element = element;
    element.appendChild(this.widgetElement);
  }

  onSettingsChanged(newSettings) {
    this.currentSettings = newSettings;
    this.iframeElement.srcdoc = BaseWidget.template(this.currentSettings)
  }

  onDispose() {
    this.widgetElement.remove();
  }

  processDatasourceUpdate(datasource) {
    this.iframeElement.contentWindow?.postMessage({
      type: "datasource:update",
      datasource: datasource.title,
      ...datasource.latestData,
    });
  }
}
