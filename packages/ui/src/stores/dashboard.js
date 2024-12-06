import { defineStore, storeToRefs } from "pinia";
import { useFreeboardStore } from "./freeboard";
import nunjucks from "nunjucks";
import { Datasource } from "../models/Datasource";
import { Pane } from "../models/Pane";

nunjucks.configure({ autoescape: true });

export const MIN_COLUMNS = 3;
export const VERSION = __APP_VERSION__;

export const useDashboardStore = defineStore("dashboard", {
  state: () => ({
    version: VERSION,
    _id: null,
    title: "Dashboard",
    published: true,
    image: null,
    columns: MIN_COLUMNS,
    width: "md",
    datasources: [],
    panes: [],
    layout: [],
  }),
  actions: {
    decreaseMaxWidth() {
      if (this.width === "md") {
        return;
      }
      if (this.width === "lg") {
        this.width = "md";
      } else {
        this.width = "lg";
      }
    },
    increaseMaxWidth() {
      if (this.width === "xl") {
        return;
      }
      if (this.width === "lg") {
        this.width = "xl";
      } else {
        this.width = "lg";
      }
    },
    getUserColumns() {
      return this.columns;
    },
    setUserColumns(numCols) {
      this.columns = Math.max(MIN_COLUMNS, numCols);
    },
    serialize() {
      let panes = [];

      this.panes.forEach((pane) => {
        panes.push(pane.serialize());
      });

      let datasources = [];

      this.datasources.forEach((datasource) => {
        datasources.push(datasource.serialize());
      });

      return {
        version: this.version,
        _id: this._id,
        title: this.title,
        published: this.published,
        image: this.image,
        columns: this.columns,
        width: "md",
        datasources: datasources,
        panes: panes,
        layout: this.layout,
      };
    },
    deserialize(object) {
      this.version = object.version;
      this._id = object._id;
      this.title = object.title;
      this.columns = object.columns;
      this.image = object.image;
      this.width = object.width;
      this.published = object.published;
      this.layout = object.layout;

      object.datasources.forEach((datasourceConfig) => {
        const datasource = new Datasource();
        datasource.deserialize(datasourceConfig);
        this.addDatasource(datasource);
      });

      object.panes.forEach((paneConfig) => {
        let pane = new Pane();
        pane.deserialize(paneConfig);
        this.addPane(pane);
      });
    },
    addDatasource(datasource) {
      this.datasources = [...this.datasources, datasource];
    },
    deleteDatasource(datasource) {
      const { datasourcePlugins } = useFreeboardStore();
      delete datasourcePlugins[datasource.name.value];
      datasource.dispose();
      this.datasources = this.datasources.filter((item) => {
        return item !== datasource;
      });
    },
    addPane(pane) {
      this.panes = [...this.panes, pane];
    },
    deletePane(pane) {
      pane.dispose();
      this.panes = this.panes.filter((item) => {
        return item !== pane;
      });
      this.layout = this.layout.filter((item) => {
        return item.pane !== pane;
      });
    },
    createPane() {
      const newPane = new Pane();
      newPane.title = "Pane";
      this.addPane(newPane);
    },
    addWidget(pane, widget) {
      pane.widgets.push(widget);
      widget.pane = pane;
      this.panes = [...this.panes];
    },
    deleteWidget(pane, widget) {
      pane.widgets = pane.widgets.filter((item) => {
        return item !== widget;
      });
      this.panes = [...this.panes];
    },
    clearDashboard() {
      this.datasources.forEach((datasource) => {
        datasource.dispose();
      });

      this.panes.forEach((pane) => {
        pane.dispose();
      });

      this.datasources = [];
      this.panes = [];
    },
  },
});
