import "./css/thirdparty/jquery.gridster.min.css";
import "./css/thirdparty/codemirror.css";
import "./css/thirdparty/codemirror-ambiance.css";
import "./css/freeboard/styles.css";

import "./js/thirdparty/head.js";
import "./js/thirdparty/jquery.js";
import "./js/thirdparty/jquery-ui.js";
import "./js/thirdparty/jquery.gridster.js";
import "./js/thirdparty/jquery.caret.js";
import "./js/thirdparty/jquery.xdomainrequest.js";
import "./js/thirdparty/codemirror.js";

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
