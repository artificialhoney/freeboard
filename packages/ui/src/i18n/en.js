export const en = {
  arrayFormElement: {
    buttonAdd: "Add",
  },
  authProviderDialogBox: {
    labelType: "Type",
    placeholderType: "Select an auth type...",
  },
  authProvidersList: {
    titleAdd: "Add auth provider",
    titleEdit: "Edit auth provider",
    titleDelete: "Delete auth provider",
    buttonAdd: "Add",
    labelName: "Name",
  },
  codeEditor: {
    buttonClose: "Close",
    descriptionHeader: `
    This javascript will be re-evaluated any time a datasource referenced herebis updated,
    and the value you <code><span>return</span></code> will be displayed in the widget.
    You can assume this javascript is wrapped in a function of the form <code><span>function</span>(<span>datasources</span>)</code>
    where datasources is a collection of javascript objects (keyed by their name) corresponding to the most current data in a datasource.`,
  },
  dashboardControl: {
    labelSettings: "Settings",
    labelAuth: "Auth",
    labelDatasources: "Datasources",
    labelAddPane: "Add Pane",
  },
  datasourceDialogBox: {
    labelType: "Type",
    placeholderType: "Select a datasource type...",
  },
  datasourcesList: {
    titleAdd: "Add datasource",
    titleEdit: "Edit datasource",
    titleDelete: "delete datasource",
    buttonAdd: "Add",
    labelName: "Name",
    labelLastUpdated: "Last Updated",
  },
  dialogBox: {
    titleSettings: "Settings",
    titleConfirm: "Confirm",
    buttonOk: "Ok",
    buttonCancel: "Cancel",
  },
  form: {
    labelTitle: "Title",
    labelType: "Type",
    labelGeneral: "General",
    labelColumns: "Columns",
    labelPublished: "Published",
    labelStyle: "Style",
    labelScript: "Script",
    labelStylesheet: "Stylesheet",
    labelResources: "Resources",
    labelName: "Name",
    labelRefresh: "Refresh interval",
    labelTemplate: "Template",
    labelUrl: "URL",
    labelUseProxy: "Use Proxy",
    labelMethod: "Method",
    labelMethodGET: "GET",
    labelMethodPOST: "POST",
    labelMethodPUT: "PUT",
    labelMethodDELETE: "DELETE",
    labelBody: "Body",
    labelAuthProvider: "Auth provider",
    descriptionBody:
      "The body of the request. Normally only used if method is POST",
    descriptionUseProxy:
      "A direct JSON connection will be tried first, if that fails, you can use the Proxy.",
    descriptionTemplate:
      "Can be a HTML template, or javascript that outputs HTML.",
    suffixRefresh: "seconds",
    placeholderAuthProvider: "Select an auth provider",
  },
  freeboardControl: {
    labelSave: "Save Freeboard",
    labelUpdate: "Update Freeboard",
    labelImport: "Import Freeboard",
    labelExport: "Export Freeboard",
  },
  header: {
    title: "Freeboard",
  },
  login: {
    buttonOk: "Login",
  },
  pane: {
    titleAdd: "Add widget",
    titleEdit: "Edit pane",
    titleDelete: "delete pane",
  },
  switchFormElement: {
    labelOn: "Yes",
    labelOff: "No",
  },
  textareaFormElement: {
    labelCode: "Code",
  },
  widget: {
    titleEdit: "Edit widget",
    titleDelete: "delete widget",
  },
  widgetDialogBox: {
    labelType: "Type",
    placeholderType: "Select an widget type...",
  },
};
