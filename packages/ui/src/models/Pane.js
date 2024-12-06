import { Widget } from "../models/Widget";

export class Pane {
  title = null;
  width = 1;
  row = {};
  col = {};
  widgets = [];

  widgetCanMoveUp(widget) {
    return this.widgets.indexOf(widget) >= 1;
  }

  widgetCanMoveDown(widget) {
    let i = this.widgets.indexOf(widget);

    return i < this.widgets.length - 1;
  }

  moveWidgetUp(widget) {
    if (this.widgetCanMoveUp(widget)) {
      let i = this.widgets.indexOf(widget);
      let array = this.widgets;
      this.widgets.splice(i - 1, 2, array[i], array[i - 1]);
    }
  }

  moveWidgetDown(widget) {
    if (this.widgetCanMoveDown(widget)) {
      let i = this.widgets.indexOf(widget);
      let array = this.widgets;
      this.widgets.splice(i, 2, array[i + 1], array[i]);
    }
  }

  serialize() {
    let widgets = [];

    this.widgets.forEach(function (widget) {
      widgets.push(widget.serialize());
    });

    return {
      title: this.title,
      width: this.width,
      row: this.row,
      col: this.col,
      colWidth: Number(this.colWidth),
      widgets: this.widgets,
    };
  }

  deserialize(object) {
    this.title = object.title;
    this.width = object.width;

    this.row = object.row;
    this.col = object.col;
    this.colWidth = object.colWidth || 1;

    object.widgets.forEach((widgetConfig) => {
      const dashboardStore = useDashboardStore();
      let widget = new Widget();
      widget.deserialize(widgetConfig);
      dashboardStore.addWidget(this, widget);
    });
  }

  dispose() {
    this.widgets.forEach(function (widget) {
      widget.dispose();
    });
  }
}
