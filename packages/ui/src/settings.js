import { MAX_COLUMNS, MIN_COLUMNS } from "./models/Dashboard";

export default (dashboard) => {
  return [
    {
      label: "General",
      icon: "hi-solid-home",
      name: "general",
      settings: {
        title: dashboard.title,
        columns: dashboard.columns,
      },
      fields: [
        {
          name: "title",
          label: "Title",
          type: "text",
          required: true,
        },
        {
          name: "columns",
          label: "Columns",
          type: "option",
          required: true,
          options: [...Array(MAX_COLUMNS).keys()]
            .filter((i) => i >= MIN_COLUMNS - 1)
            .map((i) => ({ value: i + 1, label: i + 1 })),
        },
        {
          name: "published",
          label: "Published",
          type: "boolean",
        },
      ],
    },
    {
      label: "Style",
      icon: "hi-code",
      name: "style",
      settings: {
        style: dashboard.settings.style,
      },
      fields: [
        {
          name: "style",
          label: "Style",
          type: "code",
          language: "css",
        },
      ],
    },
    {
      label: "Script",
      icon: "hi-variable",
      name: "script",
      settings: {
        script: dashboard.settings.script,
      },
      fields: [
        {
          name: "script",
          label: "Script",
          type: "code",
          language: "javascript",
        },
      ],
    },
    {
      label: "Resources",
      icon: "hi-solid-archive",
      name: "resources",
      settings: {
        resources: dashboard.settings.resources,
      },
      fields: [
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
                  label: "Script",
                  value: "script",
                },
                {
                  label: "Stylesheet",
                  value: "style",
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
      ],
    },
  ];
};
