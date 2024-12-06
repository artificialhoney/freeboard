import { Datasource } from "./Datasource";
import { Pane } from "./Pane";

export const MIN_COLUMNS = 3;

export class Dashboard {
  _id = null;
  title = "Dashboard";
  published = true;
  image = null;
  columns = MIN_COLUMNS;
  width = "md";
  datasources = [];
  panes = [];

  get layout() {
    return this.panes.map((pane) => pane.layout);
  }

  set layout(l) {
    l.forEach((layout, index) => {
      this.panes[index].layout = layout;
    });
  }

  decreaseMaxWidth() {
    if (this.width === "md") {
      return;
    }
    if (this.width === "lg") {
      this.width = "md";
    } else {
      this.width = "lg";
    }
  }

  increaseMaxWidth() {
    if (this.width === "xl") {
      return;
    }
    if (this.width === "lg") {
      this.width = "xl";
    } else {
      this.width = "lg";
    }
  }

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
      version: __APP_VERSION__,
      _id: this._id,
      title: this.title,
      published: this.published,
      image: this.image,
      columns: this.columns,
      width: "md",
      datasources: datasources,
      panes: panes,
    };
  }

  deserialize(object) {
    this.version = object.version;
    this._id = object._id;
    this.title = object.title;
    this.columns = object.columns;
    this.image = object.image;
    this.width = object.width;
    this.published = object.published;

    object.datasources.forEach((datasourceConfig) => {
      const datasource = new Datasource();
      datasource.deserialize(datasourceConfig);
      this.addDatasource(datasource);
    });

    object.panes.forEach((paneConfig) => {
      const pane = new Pane();
      pane.deserialize(paneConfig);
      this.addPane(pane);
    });
  }

  addDatasource(datasource) {
    this.datasources = [...this.datasources, datasource];
  }

  deleteDatasource(datasource) {
    const { datasourcePlugins } = useFreeboardStore();
    delete datasourcePlugins[datasource.name.value];
    datasource.dispose();
    this.datasources = this.datasources.filter((item) => {
      return item !== datasource;
    });
  }

  addPane(pane) {
    this.panes = [...this.panes, pane];
  }

  deletePane(pane) {
    pane.dispose();
    this.panes = this.panes.filter((item) => {
      return item !== pane;
    });
  }

  createPane() {
    const newPane = new Pane();
    newPane.title = "Pane";
    newPane.layout = {
      x: this.panes.length % this.columns,
      y: Math.floor(this.panes.length / this.columns),
      w: 1,
      h: 1,
      i: this.panes.length,
    };

    this.addPane(newPane);
  }

  addWidget(pane, widget) {
    pane.widgets.push(widget);
    widget.pane = pane;
    this.panes = [...this.panes];
  }

  deleteWidget(pane, widget) {
    pane.widgets = pane.widgets.filter((item) => {
      return item !== widget;
    });
    this.panes = [...this.panes];
  }

  clearDashboard() {
    this.datasources.forEach((datasource) => {
      datasource.dispose();
    });

    this.panes.forEach((pane) => {
      pane.dispose();
    });

    this.datasources = [];
    this.panes = [];
  }

  processDatasourceUpdate() {
    this.panes.value?.forEach((pane) => {
      pane.widgets?.forEach((widget) => {
        widget.processDatasourceUpdate();
      });
    });
  }
}
