import { MAX_COLUMNS, MIN_COLUMNS } from "./models/Dashboard";

export default (dashboard) => {
  return [
    {
      label: "form.labelGeneral",
      icon: "hi-home",
      name: "general",
      settings: {
        title: dashboard.title,
        columns: dashboard.columns,
      },
      fields: [
        {
          name: "title",
          label: "form.labelTitle",
          type: "text",
          required: true,
        },
        {
          name: "columns",
          label: "form.labelColumns",
          type: "option",
          required: true,
          options: [...Array(MAX_COLUMNS).keys()]
            .filter((i) => i >= MIN_COLUMNS - 1)
            .map((i) => ({ value: i + 1, label: `form.labelColumn${i + 1}` })),
        },
        {
          name: "published",
          label: "form.labelPublished",
          type: "boolean",
        },
      ],
    },
    {
      label: "form.labelTheme",
      icon: "hi-pencil-alt",
      name: "theme",
      settings: {
        theme: dashboard.settings.theme,
      },
      fields: [
        {
          name: "theme",
          label: "form.labelTheme",
          type: "option",
          default: "auto",
          required: true,
          options: [
            {
              label: "form.labelThemeAuto",
              value: "auto",
            },
            {
              label: "form.labelThemeLight",
              value: "light",
            },
            {
              label: "form.labelThemeDark",
              value: "dark",
            },
          ],
        },
      ],
    },
    {
      label: "form.labelStyle",
      icon: "hi-beaker",
      name: "style",
      settings: {
        style: dashboard.settings.style,
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
        script: dashboard.settings.script,
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
      label: "form.labelResources",
      icon: "hi-archive",
      name: "resources",
      settings: {
        resources: dashboard.settings.resources,
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
};
