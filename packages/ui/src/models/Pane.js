import { storeToRefs } from "pinia";
import { Widget } from "../models/Widget";
import { useFreeboardStore } from "../stores/freeboard";

export class Pane {
  title = null;
  widgets = [];
  layout = {};

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

    this.widgets.forEach((widget) => {
      widgets.push(widget.serialize());
    });

    return {
      title: this.title,
      layout: this.layout,
      widgets: widgets,
    };
  }

  deserialize(object) {
    const freeboardStore = useFreeboardStore();
    const { dashboard } = storeToRefs(freeboardStore);
    this.title = object.title;
    this.layout = object.layout;

    object.widgets.forEach((widgetConfig) => {
      const widget = new Widget(widgetConfig.settings, widgetConfig.type);
      widget.deserialize(widgetConfig);
      dashboard.value.addWidget(this, widget);
    });
  }

  dispose() {
    this.widgets.forEach(function (widget) {
      widget.dispose();
    });
  }
}
