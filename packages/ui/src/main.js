import "./main.css";

import "./js/freeboard/freeboard.js";

import "./plugins/freeboard/freeboard.datasources.js";
import "./plugins/freeboard/freeboard.widgets.js";
(function () {
  $(function () {
    //DOM Ready
    // freeboard.setAssetRoot("/freeboard-ui/");
    freeboard.initialize(true);
  });
})();
