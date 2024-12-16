import { MAX_COLUMNS, MIN_COLUMNS } from "./models/Dashboard";

export default (dashboard, t) => {
  return [
    {
      label: t("form.labelGeneral"),
      icon: "hi-solid-home",
      name: "general",
      settings: {
        title: dashboard.title,
        columns: dashboard.columns,
      },
      fields: [
        {
          name: "title",
          label: t("form.labelTitle"),
          type: "text",
          required: true,
        },
        {
          name: "columns",
          label: t("form.labelColumns"),
          type: "option",
          required: true,
          options: [...Array(MAX_COLUMNS).keys()]
            .filter((i) => i >= MIN_COLUMNS - 1)
            .map((i) => ({ value: i + 1, label: i + 1 })),
        },
        {
          name: "published",
          label: t("form.labelPublished"),
          type: "boolean",
        },
      ],
    },
    {
      label: t("form.labelStyle"),
      icon: "hi-code",
      name: "style",
      settings: {
        style: dashboard.settings.style,
      },
      fields: [
        {
          name: "style",
          label: t("form.labelStyle"),
          type: "code",
          language: "css",
        },
      ],
    },
    {
      label: t("form.labelScript"),
      icon: "hi-variable",
      name: "script",
      settings: {
        script: dashboard.settings.script,
      },
      fields: [
        {
          name: "script",
          label: t("form.labelScript"),
          type: "code",
          language: "javascript",
        },
      ],
    },
    {
      label: t("form.labelResources"),
      icon: "hi-solid-archive",
      name: "resources",
      settings: {
        resources: dashboard.settings.resources,
      },
      fields: [
        {
          name: "resources",
          label: t("form.labelResources"),
          type: "array",
          settings: [
            {
              name: "type",
              label: t("form.labelType"),
              type: "option",
              required: true,
              default: "script",
              options: [
                {
                  label: t("form.labelScript"),
                  value: "script",
                },
                {
                  label: t("form.labelStylesheet"),
                  value: "style",
                },
              ],
            },
            {
              name: "url",
              label: t("form.labelUrl"),
              type: "text",
            },
          ],
        },
      ],
    },
  ];
};
