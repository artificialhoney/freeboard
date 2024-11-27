/* jquery.sparkline 2.1.2 - http://omnipotent.net/jquery.sparkline/
 ** Licensed under the New BSD License - see above site for details */

(function (a, b, c) {
  (function (a) {
    typeof define == "function" && define.amd
      ? define(["jquery"], a)
      : jQuery && !jQuery.fn.sparkline && a(jQuery);
  })(function (d) {
    "use strict";
    var e = {},
      f,
      g,
      h,
      i,
      j,
      k,
      l,
      m,
      n,
      o,
      p,
      q,
      r,
      s,
      t,
      u,
      v,
      w,
      x,
      y,
      z,
      A,
      B,
      C,
      D,
      E,
      F,
      G,
      H,
      I,
      J,
      K,
      L = 0;
    (f = function () {
      return {
        common: {
          type: "line",
          lineColor: "#00f",
          fillColor: "#cdf",
          defaultPixelsPerValue: 3,
          width: "auto",
          height: "auto",
          composite: !1,
          tagValuesAttribute: "values",
          tagOptionsPrefix: "spark",
          enableTagOptions: !1,
          enableHighlight: !0,
          highlightLighten: 1.4,
          tooltipSkipNull: !0,
          tooltipPrefix: "",
          tooltipSuffix: "",
          disableHiddenCheck: !1,
          numberFormatter: !1,
          numberDigitGroupCount: 3,
          numberDigitGroupSep: ",",
          numberDecimalMark: ".",
          disableTooltips: !1,
          disableInteraction: !1,
        },
        line: {
          spotColor: "#f80",
          highlightSpotColor: "#5f5",
          highlightLineColor: "#f22",
          spotRadius: 1.5,
          minSpotColor: "#f80",
          maxSpotColor: "#f80",
          lineWidth: 1,
          normalRangeMin: c,
          normalRangeMax: c,
          normalRangeColor: "#ccc",
          drawNormalOnTop: !1,
          chartRangeMin: c,
          chartRangeMax: c,
          chartRangeMinX: c,
          chartRangeMaxX: c,
          tooltipFormat: new h(
            '<span style="color: {{color}}">&#9679;</span> {{prefix}}{{y}}{{suffix}}',
          ),
        },
        bar: {
          barColor: "#3366cc",
          negBarColor: "#f44",
          stackedBarColor: [
            "#3366cc",
            "#dc3912",
            "#ff9900",
            "#109618",
            "#66aa00",
            "#dd4477",
            "#0099c6",
            "#990099",
          ],
          zeroColor: c,
          nullColor: c,
          zeroAxis: !0,
          barWidth: 4,
          barSpacing: 1,
          chartRangeMax: c,
          chartRangeMin: c,
          chartRangeClip: !1,
          colorMap: c,
          tooltipFormat: new h(
            '<span style="color: {{color}}">&#9679;</span> {{prefix}}{{value}}{{suffix}}',
          ),
        },
        tristate: {
          barWidth: 4,
          barSpacing: 1,
          posBarColor: "#6f6",
          negBarColor: "#f44",
          zeroBarColor: "#999",
          colorMap: {},
          tooltipFormat: new h(
            '<span style="color: {{color}}">&#9679;</span> {{value:map}}',
          ),
          tooltipValueLookups: { map: { "-1": "Loss", 0: "Draw", 1: "Win" } },
        },
        discrete: {
          lineHeight: "auto",
          thresholdColor: c,
          thresholdValue: 0,
          chartRangeMax: c,
          chartRangeMin: c,
          chartRangeClip: !1,
          tooltipFormat: new h("{{prefix}}{{value}}{{suffix}}"),
        },
        bullet: {
          targetColor: "#f33",
          targetWidth: 3,
          performanceColor: "#33f",
          rangeColors: ["#d3dafe", "#a8b6ff", "#7f94ff"],
          base: c,
          tooltipFormat: new h("{{fieldkey:fields}} - {{value}}"),
          tooltipValueLookups: {
            fields: { r: "Range", p: "Performance", t: "Target" },
          },
        },
        pie: {
          offset: 0,
          sliceColors: [
            "#3366cc",
            "#dc3912",
            "#ff9900",
            "#109618",
            "#66aa00",
            "#dd4477",
            "#0099c6",
            "#990099",
          ],
          borderWidth: 0,
          borderColor: "#000",
          tooltipFormat: new h(
            '<span style="color: {{color}}">&#9679;</span> {{value}} ({{percent.1}}%)',
          ),
        },
        box: {
          raw: !1,
          boxLineColor: "#000",
          boxFillColor: "#cdf",
          whiskerColor: "#000",
          outlierLineColor: "#333",
          outlierFillColor: "#fff",
          medianColor: "#f00",
          showOutliers: !0,
          outlierIQR: 1.5,
          spotRadius: 1.5,
          target: c,
          targetColor: "#4a2",
          chartRangeMax: c,
          chartRangeMin: c,
          tooltipFormat: new h("{{field:fields}}: {{value}}"),
          tooltipFormatFieldlistKey: "field",
          tooltipValueLookups: {
            fields: {
              lq: "Lower Quartile",
              med: "Median",
              uq: "Upper Quartile",
              lo: "Left Outlier",
              ro: "Right Outlier",
              lw: "Left Whisker",
              rw: "Right Whisker",
            },
          },
        },
      };
    }),
      (E =
        '.jqstooltip { position: absolute;left: 0px;top: 0px;visibility: hidden;background: rgb(0, 0, 0) transparent;background-color: rgba(0,0,0,0.6);filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000);-ms-filter: "progid:DXImageTransform.Microsoft.gradient(startColorstr=#99000000, endColorstr=#99000000)";color: white;font: 10px arial, san serif;text-align: left;white-space: nowrap;padding: 5px;border: 1px solid white;z-index: 10000;}.jqsfield { color: white;font: 10px arial, san serif;text-align: left;}'),
      (g = function () {
        var a, b;
        return (
          (a = function () {
            this.init.apply(this, arguments);
          }),
          arguments.length > 1
            ? (arguments[0]
                ? ((a.prototype = d.extend(
                    new arguments[0](),
                    arguments[arguments.length - 1],
                  )),
                  (a._super = arguments[0].prototype))
                : (a.prototype = arguments[arguments.length - 1]),
              arguments.length > 2 &&
                ((b = Array.prototype.slice.call(arguments, 1, -1)),
                b.unshift(a.prototype),
                d.extend.apply(d, b)))
            : (a.prototype = arguments[0]),
          (a.prototype.cls = a),
          a
        );
      }),
      (d.SPFormatClass = h =
        g({
          fre: /\{\{([\w.]+?)(:(.+?))?\}\}/g,
          precre: /(\w+)\.(\d+)/,
          init: function (a, b) {
            (this.format = a), (this.fclass = b);
          },
          render: function (a, b, d) {
            var e = this,
              f = a,
              g,
              h,
              i,
              j,
              k;
            return this.format.replace(this.fre, function () {
              var a;
              return (
                (h = arguments[1]),
                (i = arguments[3]),
                (g = e.precre.exec(h)),
                g ? ((k = g[2]), (h = g[1])) : (k = !1),
                (j = f[h]),
                j === c
                  ? ""
                  : i && b && b[i]
                    ? ((a = b[i]), a.get ? b[i].get(j) || j : b[i][j] || j)
                    : (n(j) &&
                        (d.get("numberFormatter")
                          ? (j = d.get("numberFormatter")(j))
                          : (j = s(
                              j,
                              k,
                              d.get("numberDigitGroupCount"),
                              d.get("numberDigitGroupSep"),
                              d.get("numberDecimalMark"),
                            ))),
                      j)
              );
            });
          },
        })),
      (d.spformat = function (a, b) {
        return new h(a, b);
      }),
      (i = function (a, b, c) {
        return a < b ? b : a > c ? c : a;
      }),
      (j = function (a, c) {
        var d;
        return c === 2
          ? ((d = b.floor(a.length / 2)),
            a.length % 2 ? a[d] : (a[d - 1] + a[d]) / 2)
          : a.length % 2
            ? ((d = (a.length * c + c) / 4),
              d % 1 ? (a[b.floor(d)] + a[b.floor(d) - 1]) / 2 : a[d - 1])
            : ((d = (a.length * c + 2) / 4),
              d % 1 ? (a[b.floor(d)] + a[b.floor(d) - 1]) / 2 : a[d - 1]);
      }),
      (k = function (a) {
        var b;
        switch (a) {
          case "undefined":
            a = c;
            break;
          case "null":
            a = null;
            break;
          case "true":
            a = !0;
            break;
          case "false":
            a = !1;
            break;
          default:
            (b = parseFloat(a)), a == b && (a = b);
        }
        return a;
      }),
      (l = function (a) {
        var b,
          c = [];
        for (b = a.length; b--; ) c[b] = k(a[b]);
        return c;
      }),
      (m = function (a, b) {
        var c,
          d,
          e = [];
        for (c = 0, d = a.length; c < d; c++) a[c] !== b && e.push(a[c]);
        return e;
      }),
      (n = function (a) {
        return !isNaN(parseFloat(a)) && isFinite(a);
      }),
      (s = function (a, b, c, e, f) {
        var g, h;
        (a = (b === !1 ? parseFloat(a).toString() : a.toFixed(b)).split("")),
          (g = (g = d.inArray(".", a)) < 0 ? a.length : g),
          g < a.length && (a[g] = f);
        for (h = g - c; h > 0; h -= c) a.splice(h, 0, e);
        return a.join("");
      }),
      (o = function (a, b, c) {
        var d;
        for (d = b.length; d--; ) {
          if (c && b[d] === null) continue;
          if (b[d] !== a) return !1;
        }
        return !0;
      }),
      (p = function (a) {
        var b = 0,
          c;
        for (c = a.length; c--; ) b += typeof a[c] == "number" ? a[c] : 0;
        return b;
      }),
      (r = function (a) {
        return d.isArray(a) ? a : [a];
      }),
      (q = function (b) {
        var c;
        a.createStyleSheet
          ? (a.createStyleSheet().cssText = b)
          : ((c = a.createElement("style")),
            (c.type = "text/css"),
            a.getElementsByTagName("head")[0].appendChild(c),
            (c[
              typeof a.body.style.WebkitAppearance == "string"
                ? "innerText"
                : "innerHTML"
            ] = b));
      }),
      (d.fn.simpledraw = function (b, e, f, g) {
        var h, i;
        if (f && (h = this.data("_jqs_vcanvas"))) return h;
        if (d.fn.sparkline.canvas === !1) return !1;
        if (d.fn.sparkline.canvas === c) {
          var j = a.createElement("canvas");
          if (!j.getContext || !j.getContext("2d")) {
            if (!a.namespaces || !!a.namespaces.v)
              return (d.fn.sparkline.canvas = !1), !1;
            a.namespaces.add(
              "v",
              "urn:schemas-microsoft-com:vml",
              "#default#VML",
            ),
              (d.fn.sparkline.canvas = function (a, b, c, d) {
                return new J(a, b, c);
              });
          } else
            d.fn.sparkline.canvas = function (a, b, c, d) {
              return new I(a, b, c, d);
            };
        }
        return (
          b === c && (b = d(this).innerWidth()),
          e === c && (e = d(this).innerHeight()),
          (h = d.fn.sparkline.canvas(b, e, this, g)),
          (i = d(this).data("_jqs_mhandler")),
          i && i.registerCanvas(h),
          h
        );
      }),
      (d.fn.cleardraw = function () {
        var a = this.data("_jqs_vcanvas");
        a && a.reset();
      }),
      (d.RangeMapClass = t =
        g({
          init: function (a) {
            var b,
              c,
              d = [];
            for (b in a)
              a.hasOwnProperty(b) &&
                typeof b == "string" &&
                b.indexOf(":") > -1 &&
                ((c = b.split(":")),
                (c[0] = c[0].length === 0 ? -Infinity : parseFloat(c[0])),
                (c[1] = c[1].length === 0 ? Infinity : parseFloat(c[1])),
                (c[2] = a[b]),
                d.push(c));
            (this.map = a), (this.rangelist = d || !1);
          },
          get: function (a) {
            var b = this.rangelist,
              d,
              e,
              f;
            if ((f = this.map[a]) !== c) return f;
            if (b)
              for (d = b.length; d--; ) {
                e = b[d];
                if (e[0] <= a && e[1] >= a) return e[2];
              }
            return c;
          },
        })),
      (d.range_map = function (a) {
        return new t(a);
      }),
      (u = g({
        init: function (a, b) {
          var c = d(a);
          (this.$el = c),
            (this.options = b),
            (this.currentPageX = 0),
            (this.currentPageY = 0),
            (this.el = a),
            (this.splist = []),
            (this.tooltip = null),
            (this.over = !1),
            (this.displayTooltips = !b.get("disableTooltips")),
            (this.highlightEnabled = !b.get("disableHighlight"));
        },
        registerSparkline: function (a) {
          this.splist.push(a), this.over && this.updateDisplay();
        },
        registerCanvas: function (a) {
          var b = d(a.canvas);
          (this.canvas = a),
            (this.$canvas = b),
            b.mouseenter(d.proxy(this.mouseenter, this)),
            b.mouseleave(d.proxy(this.mouseleave, this)),
            b.click(d.proxy(this.mouseclick, this));
        },
        reset: function (a) {
          (this.splist = []),
            this.tooltip && a && (this.tooltip.remove(), (this.tooltip = c));
        },
        mouseclick: function (a) {
          var b = d.Event("sparklineClick");
          (b.originalEvent = a),
            (b.sparklines = this.splist),
            this.$el.trigger(b);
        },
        mouseenter: function (b) {
          d(a.body).unbind("mousemove.jqs"),
            d(a.body).bind("mousemove.jqs", d.proxy(this.mousemove, this)),
            (this.over = !0),
            (this.currentPageX = b.pageX),
            (this.currentPageY = b.pageY),
            (this.currentEl = b.target),
            !this.tooltip &&
              this.displayTooltips &&
              ((this.tooltip = new v(this.options)),
              this.tooltip.updatePosition(b.pageX, b.pageY)),
            this.updateDisplay();
        },
        mouseleave: function () {
          d(a.body).unbind("mousemove.jqs");
          var b = this.splist,
            c = b.length,
            e = !1,
            f,
            g;
          (this.over = !1),
            (this.currentEl = null),
            this.tooltip && (this.tooltip.remove(), (this.tooltip = null));
          for (g = 0; g < c; g++)
            (f = b[g]), f.clearRegionHighlight() && (e = !0);
          e && this.canvas.render();
        },
        mousemove: function (a) {
          (this.currentPageX = a.pageX),
            (this.currentPageY = a.pageY),
            (this.currentEl = a.target),
            this.tooltip && this.tooltip.updatePosition(a.pageX, a.pageY),
            this.updateDisplay();
        },
        updateDisplay: function () {
          var a = this.splist,
            b = a.length,
            c = !1,
            e = this.$canvas.offset(),
            f = this.currentPageX - e.left,
            g = this.currentPageY - e.top,
            h,
            i,
            j,
            k,
            l;
          if (!this.over) return;
          for (j = 0; j < b; j++)
            (i = a[j]),
              (k = i.setRegionHighlight(this.currentEl, f, g)),
              k && (c = !0);
          if (c) {
            (l = d.Event("sparklineRegionChange")),
              (l.sparklines = this.splist),
              this.$el.trigger(l);
            if (this.tooltip) {
              h = "";
              for (j = 0; j < b; j++)
                (i = a[j]), (h += i.getCurrentRegionTooltip());
              this.tooltip.setContent(h);
            }
            this.disableHighlight || this.canvas.render();
          }
          k === null && this.mouseleave();
        },
      })),
      (v = g({
        sizeStyle:
          "position: static !important;display: block !important;visibility: hidden !important;float: left !important;",
        init: function (b) {
          var c = b.get("tooltipClassname", "jqstooltip"),
            e = this.sizeStyle,
            f;
          (this.container = b.get("tooltipContainer") || a.body),
            (this.tooltipOffsetX = b.get("tooltipOffsetX", 10)),
            (this.tooltipOffsetY = b.get("tooltipOffsetY", 12)),
            d("#jqssizetip").remove(),
            d("#jqstooltip").remove(),
            (this.sizetip = d("<div/>", {
              id: "jqssizetip",
              style: e,
              class: c,
            })),
            (this.tooltip = d("<div/>", {
              id: "jqstooltip",
              class: c,
            }).appendTo(this.container)),
            (f = this.tooltip.offset()),
            (this.offsetLeft = f.left),
            (this.offsetTop = f.top),
            (this.hidden = !0),
            d(window).unbind("resize.jqs scroll.jqs"),
            d(window).bind(
              "resize.jqs scroll.jqs",
              d.proxy(this.updateWindowDims, this),
            ),
            this.updateWindowDims();
        },
        updateWindowDims: function () {
          (this.scrollTop = d(window).scrollTop()),
            (this.scrollLeft = d(window).scrollLeft()),
            (this.scrollRight = this.scrollLeft + d(window).width()),
            this.updatePosition();
        },
        getSize: function (a) {
          this.sizetip.html(a).appendTo(this.container),
            (this.width = this.sizetip.width() + 1),
            (this.height = this.sizetip.height()),
            this.sizetip.remove();
        },
        setContent: function (a) {
          if (!a) {
            this.tooltip.css("visibility", "hidden"), (this.hidden = !0);
            return;
          }
          this.getSize(a),
            this.tooltip.html(a).css({
              width: this.width,
              height: this.height,
              visibility: "visible",
            }),
            this.hidden && ((this.hidden = !1), this.updatePosition());
        },
        updatePosition: function (a, b) {
          if (a === c) {
            if (this.mousex === c) return;
            (a = this.mousex - this.offsetLeft),
              (b = this.mousey - this.offsetTop);
          } else
            (this.mousex = a -= this.offsetLeft),
              (this.mousey = b -= this.offsetTop);
          if (!this.height || !this.width || this.hidden) return;
          (b -= this.height + this.tooltipOffsetY),
            (a += this.tooltipOffsetX),
            b < this.scrollTop && (b = this.scrollTop),
            a < this.scrollLeft
              ? (a = this.scrollLeft)
              : a + this.width > this.scrollRight &&
                (a = this.scrollRight - this.width),
            this.tooltip.css({ left: a, top: b });
        },
        remove: function () {
          this.tooltip.remove(),
            this.sizetip.remove(),
            (this.sizetip = this.tooltip = c),
            d(window).unbind("resize.jqs scroll.jqs");
        },
      })),
      (F = function () {
        q(E);
      }),
      d(F),
      (K = []),
      (d.fn.sparkline = function (b, e) {
        return this.each(function () {
          var f = new d.fn.sparkline.options(this, e),
            g = d(this),
            h,
            i;
          h = function () {
            var e, h, i, j, k, l, m;
            if (b === "html" || b === c) {
              m = this.getAttribute(f.get("tagValuesAttribute"));
              if (m === c || m === null) m = g.html();
              e = m.replace(/(^\s*<!--)|(-->\s*$)|\s+/g, "").split(",");
            } else e = b;
            h =
              f.get("width") === "auto"
                ? e.length * f.get("defaultPixelsPerValue")
                : f.get("width");
            if (f.get("height") === "auto") {
              if (!f.get("composite") || !d.data(this, "_jqs_vcanvas"))
                (j = a.createElement("span")),
                  (j.innerHTML = "a"),
                  g.html(j),
                  (i = d(j).innerHeight() || d(j).height()),
                  d(j).remove(),
                  (j = null);
            } else i = f.get("height");
            f.get("disableInteraction")
              ? (k = !1)
              : ((k = d.data(this, "_jqs_mhandler")),
                k
                  ? f.get("composite") || k.reset()
                  : ((k = new u(this, f)), d.data(this, "_jqs_mhandler", k)));
            if (f.get("composite") && !d.data(this, "_jqs_vcanvas")) {
              d.data(this, "_jqs_errnotify") ||
                (alert(
                  "Attempted to attach a composite sparkline to an element with no existing sparkline",
                ),
                d.data(this, "_jqs_errnotify", !0));
              return;
            }
            (l = new d.fn.sparkline[f.get("type")](this, e, f, h, i)),
              l.render(),
              k && k.registerSparkline(l);
          };
          if (
            (d(this).html() &&
              !f.get("disableHiddenCheck") &&
              d(this).is(":hidden")) ||
            !d(this).parents("body").length
          ) {
            if (!f.get("composite") && d.data(this, "_jqs_pending"))
              for (i = K.length; i; i--)
                K[i - 1][0] == this && K.splice(i - 1, 1);
            K.push([this, h]), d.data(this, "_jqs_pending", !0);
          } else h.call(this);
        });
      }),
      (d.fn.sparkline.defaults = f()),
      (d.sparkline_display_visible = function () {
        var a,
          b,
          c,
          e = [];
        for (b = 0, c = K.length; b < c; b++)
          (a = K[b][0]),
            d(a).is(":visible") && !d(a).parents().is(":hidden")
              ? (K[b][1].call(a),
                d.data(K[b][0], "_jqs_pending", !1),
                e.push(b))
              : !d(a).closest("html").length &&
                !d.data(a, "_jqs_pending") &&
                (d.data(K[b][0], "_jqs_pending", !1), e.push(b));
        for (b = e.length; b; b--) K.splice(e[b - 1], 1);
      }),
      (d.fn.sparkline.options = g({
        init: function (a, b) {
          var c, f, g, h;
          (this.userOptions = b = b || {}),
            (this.tag = a),
            (this.tagValCache = {}),
            (f = d.fn.sparkline.defaults),
            (g = f.common),
            (this.tagOptionsPrefix =
              b.enableTagOptions && (b.tagOptionsPrefix || g.tagOptionsPrefix)),
            (h = this.getTagSetting("type")),
            h === e ? (c = f[b.type || g.type]) : (c = f[h]),
            (this.mergedOptions = d.extend({}, g, c, b));
        },
        getTagSetting: function (a) {
          var b = this.tagOptionsPrefix,
            d,
            f,
            g,
            h;
          if (b === !1 || b === c) return e;
          if (this.tagValCache.hasOwnProperty(a)) d = this.tagValCache.key;
          else {
            d = this.tag.getAttribute(b + a);
            if (d === c || d === null) d = e;
            else if (d.substr(0, 1) === "[") {
              d = d.substr(1, d.length - 2).split(",");
              for (f = d.length; f--; )
                d[f] = k(d[f].replace(/(^\s*)|(\s*$)/g, ""));
            } else if (d.substr(0, 1) === "{") {
              (g = d.substr(1, d.length - 2).split(",")), (d = {});
              for (f = g.length; f--; )
                (h = g[f].split(":", 2)),
                  (d[h[0].replace(/(^\s*)|(\s*$)/g, "")] = k(
                    h[1].replace(/(^\s*)|(\s*$)/g, ""),
                  ));
            } else d = k(d);
            this.tagValCache.key = d;
          }
          return d;
        },
        get: function (a, b) {
          var d = this.getTagSetting(a),
            f;
          return d !== e ? d : (f = this.mergedOptions[a]) === c ? b : f;
        },
      })),
      (d.fn.sparkline._base = g({
        disabled: !1,
        init: function (a, b, e, f, g) {
          (this.el = a),
            (this.$el = d(a)),
            (this.values = b),
            (this.options = e),
            (this.width = f),
            (this.height = g),
            (this.currentRegion = c);
        },
        initTarget: function () {
          var a = !this.options.get("disableInteraction");
          (this.target = this.$el.simpledraw(
            this.width,
            this.height,
            this.options.get("composite"),
            a,
          ))
            ? ((this.canvasWidth = this.target.pixelWidth),
              (this.canvasHeight = this.target.pixelHeight))
            : (this.disabled = !0);
        },
        render: function () {
          return this.disabled ? ((this.el.innerHTML = ""), !1) : !0;
        },
        getRegion: function (a, b) {},
        setRegionHighlight: function (a, b, d) {
          var e = this.currentRegion,
            f = !this.options.get("disableHighlight"),
            g;
          return b > this.canvasWidth || d > this.canvasHeight || b < 0 || d < 0
            ? null
            : ((g = this.getRegion(a, b, d)),
              e !== g
                ? (e !== c && f && this.removeHighlight(),
                  (this.currentRegion = g),
                  g !== c && f && this.renderHighlight(),
                  !0)
                : !1);
        },
        clearRegionHighlight: function () {
          return this.currentRegion !== c
            ? (this.removeHighlight(), (this.currentRegion = c), !0)
            : !1;
        },
        renderHighlight: function () {
          this.changeHighlight(!0);
        },
        removeHighlight: function () {
          this.changeHighlight(!1);
        },
        changeHighlight: function (a) {},
        getCurrentRegionTooltip: function () {
          var a = this.options,
            b = "",
            e = [],
            f,
            g,
            i,
            j,
            k,
            l,
            m,
            n,
            o,
            p,
            q,
            r,
            s,
            t;
          if (this.currentRegion === c) return "";
          (f = this.getCurrentRegionFields()), (q = a.get("tooltipFormatter"));
          if (q) return q(this, a, f);
          a.get("tooltipChartTitle") &&
            (b +=
              '<div class="jqs jqstitle">' +
              a.get("tooltipChartTitle") +
              "</div>\n"),
            (g = this.options.get("tooltipFormat"));
          if (!g) return "";
          d.isArray(g) || (g = [g]),
            d.isArray(f) || (f = [f]),
            (m = this.options.get("tooltipFormatFieldlist")),
            (n = this.options.get("tooltipFormatFieldlistKey"));
          if (m && n) {
            o = [];
            for (l = f.length; l--; )
              (p = f[l][n]), (t = d.inArray(p, m)) != -1 && (o[t] = f[l]);
            f = o;
          }
          (i = g.length), (s = f.length);
          for (l = 0; l < i; l++) {
            (r = g[l]),
              typeof r == "string" && (r = new h(r)),
              (j = r.fclass || "jqsfield");
            for (t = 0; t < s; t++)
              if (!f[t].isNull || !a.get("tooltipSkipNull"))
                d.extend(f[t], {
                  prefix: a.get("tooltipPrefix"),
                  suffix: a.get("tooltipSuffix"),
                }),
                  (k = r.render(f[t], a.get("tooltipValueLookups"), a)),
                  e.push('<div class="' + j + '">' + k + "</div>");
          }
          return e.length ? b + e.join("\n") : "";
        },
        getCurrentRegionFields: function () {},
        calcHighlightColor: function (a, c) {
          var d = c.get("highlightColor"),
            e = c.get("highlightLighten"),
            f,
            g,
            h,
            j;
          if (d) return d;
          if (e) {
            f =
              /^#([0-9a-f])([0-9a-f])([0-9a-f])$/i.exec(a) ||
              /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i.exec(a);
            if (f) {
              (h = []), (g = a.length === 4 ? 16 : 1);
              for (j = 0; j < 3; j++)
                h[j] = i(b.round(parseInt(f[j + 1], 16) * g * e), 0, 255);
              return "rgb(" + h.join(",") + ")";
            }
          }
          return a;
        },
      })),
      (w = {
        changeHighlight: function (a) {
          var b = this.currentRegion,
            c = this.target,
            e = this.regionShapes[b],
            f;
          e &&
            ((f = this.renderRegion(b, a)),
            d.isArray(f) || d.isArray(e)
              ? (c.replaceWithShapes(e, f),
                (this.regionShapes[b] = d.map(f, function (a) {
                  return a.id;
                })))
              : (c.replaceWithShape(e, f), (this.regionShapes[b] = f.id)));
        },
        render: function () {
          var a = this.values,
            b = this.target,
            c = this.regionShapes,
            e,
            f,
            g,
            h;
          if (!this.cls._super.render.call(this)) return;
          for (g = a.length; g--; ) {
            e = this.renderRegion(g);
            if (e)
              if (d.isArray(e)) {
                f = [];
                for (h = e.length; h--; ) e[h].append(), f.push(e[h].id);
                c[g] = f;
              } else e.append(), (c[g] = e.id);
            else c[g] = null;
          }
          b.render();
        },
      }),
      (d.fn.sparkline.line = x =
        g(d.fn.sparkline._base, {
          type: "line",
          init: function (a, b, c, d, e) {
            x._super.init.call(this, a, b, c, d, e),
              (this.vertices = []),
              (this.regionMap = []),
              (this.xvalues = []),
              (this.yvalues = []),
              (this.yminmax = []),
              (this.hightlightSpotId = null),
              (this.lastShapeId = null),
              this.initTarget();
          },
          getRegion: function (a, b, d) {
            var e,
              f = this.regionMap;
            for (e = f.length; e--; )
              if (f[e] !== null && b >= f[e][0] && b <= f[e][1]) return f[e][2];
            return c;
          },
          getCurrentRegionFields: function () {
            var a = this.currentRegion;
            return {
              isNull: this.yvalues[a] === null,
              x: this.xvalues[a],
              y: this.yvalues[a],
              color: this.options.get("lineColor"),
              fillColor: this.options.get("fillColor"),
              offset: a,
            };
          },
          renderHighlight: function () {
            var a = this.currentRegion,
              b = this.target,
              d = this.vertices[a],
              e = this.options,
              f = e.get("spotRadius"),
              g = e.get("highlightSpotColor"),
              h = e.get("highlightLineColor"),
              i,
              j;
            if (!d) return;
            f &&
              g &&
              ((i = b.drawCircle(d[0], d[1], f, c, g)),
              (this.highlightSpotId = i.id),
              b.insertAfterShape(this.lastShapeId, i)),
              h &&
                ((j = b.drawLine(
                  d[0],
                  this.canvasTop,
                  d[0],
                  this.canvasTop + this.canvasHeight,
                  h,
                )),
                (this.highlightLineId = j.id),
                b.insertAfterShape(this.lastShapeId, j));
          },
          removeHighlight: function () {
            var a = this.target;
            this.highlightSpotId &&
              (a.removeShapeId(this.highlightSpotId),
              (this.highlightSpotId = null)),
              this.highlightLineId &&
                (a.removeShapeId(this.highlightLineId),
                (this.highlightLineId = null));
          },
          scanValues: function () {
            var a = this.values,
              c = a.length,
              d = this.xvalues,
              e = this.yvalues,
              f = this.yminmax,
              g,
              h,
              i,
              j,
              k;
            for (g = 0; g < c; g++)
              (h = a[g]),
                (i = typeof a[g] == "string"),
                (j = typeof a[g] == "object" && a[g] instanceof Array),
                (k = i && a[g].split(":")),
                i && k.length === 2
                  ? (d.push(Number(k[0])),
                    e.push(Number(k[1])),
                    f.push(Number(k[1])))
                  : j
                    ? (d.push(h[0]), e.push(h[1]), f.push(h[1]))
                    : (d.push(g),
                      a[g] === null || a[g] === "null"
                        ? e.push(null)
                        : (e.push(Number(h)), f.push(Number(h))));
            this.options.get("xvalues") && (d = this.options.get("xvalues")),
              (this.maxy = this.maxyorg = b.max.apply(b, f)),
              (this.miny = this.minyorg = b.min.apply(b, f)),
              (this.maxx = b.max.apply(b, d)),
              (this.minx = b.min.apply(b, d)),
              (this.xvalues = d),
              (this.yvalues = e),
              (this.yminmax = f);
          },
          processRangeOptions: function () {
            var a = this.options,
              b = a.get("normalRangeMin"),
              d = a.get("normalRangeMax");
            b !== c &&
              (b < this.miny && (this.miny = b),
              d > this.maxy && (this.maxy = d)),
              a.get("chartRangeMin") !== c &&
                (a.get("chartRangeClip") ||
                  a.get("chartRangeMin") < this.miny) &&
                (this.miny = a.get("chartRangeMin")),
              a.get("chartRangeMax") !== c &&
                (a.get("chartRangeClip") ||
                  a.get("chartRangeMax") > this.maxy) &&
                (this.maxy = a.get("chartRangeMax")),
              a.get("chartRangeMinX") !== c &&
                (a.get("chartRangeClipX") ||
                  a.get("chartRangeMinX") < this.minx) &&
                (this.minx = a.get("chartRangeMinX")),
              a.get("chartRangeMaxX") !== c &&
                (a.get("chartRangeClipX") ||
                  a.get("chartRangeMaxX") > this.maxx) &&
                (this.maxx = a.get("chartRangeMaxX"));
          },
          drawNormalRange: function (a, d, e, f, g) {
            var h = this.options.get("normalRangeMin"),
              i = this.options.get("normalRangeMax"),
              j = d + b.round(e - e * ((i - this.miny) / g)),
              k = b.round((e * (i - h)) / g);
            this.target
              .drawRect(a, j, f, k, c, this.options.get("normalRangeColor"))
              .append();
          },
          render: function () {
            var a = this.options,
              e = this.target,
              f = this.canvasWidth,
              g = this.canvasHeight,
              h = this.vertices,
              i = a.get("spotRadius"),
              j = this.regionMap,
              k,
              l,
              m,
              n,
              o,
              p,
              q,
              r,
              s,
              u,
              v,
              w,
              y,
              z,
              A,
              B,
              C,
              D,
              E,
              F,
              G,
              H,
              I,
              J,
              K;
            if (!x._super.render.call(this)) return;
            this.scanValues(),
              this.processRangeOptions(),
              (I = this.xvalues),
              (J = this.yvalues);
            if (!this.yminmax.length || this.yvalues.length < 2) return;
            (n = o = 0),
              (k = this.maxx - this.minx === 0 ? 1 : this.maxx - this.minx),
              (l = this.maxy - this.miny === 0 ? 1 : this.maxy - this.miny),
              (m = this.yvalues.length - 1),
              i && (f < i * 4 || g < i * 4) && (i = 0);
            if (i) {
              G = a.get("highlightSpotColor") && !a.get("disableInteraction");
              if (
                G ||
                a.get("minSpotColor") ||
                (a.get("spotColor") && J[m] === this.miny)
              )
                g -= b.ceil(i);
              if (
                G ||
                a.get("maxSpotColor") ||
                (a.get("spotColor") && J[m] === this.maxy)
              )
                (g -= b.ceil(i)), (n += b.ceil(i));
              if (
                G ||
                ((a.get("minSpotColor") || a.get("maxSpotColor")) &&
                  (J[0] === this.miny || J[0] === this.maxy))
              )
                (o += b.ceil(i)), (f -= b.ceil(i));
              if (
                G ||
                a.get("spotColor") ||
                a.get("minSpotColor") ||
                (a.get("maxSpotColor") &&
                  (J[m] === this.miny || J[m] === this.maxy))
              )
                f -= b.ceil(i);
            }
            g--,
              a.get("normalRangeMin") !== c &&
                !a.get("drawNormalOnTop") &&
                this.drawNormalRange(o, n, g, f, l),
              (q = []),
              (r = [q]),
              (z = A = null),
              (B = J.length);
            for (K = 0; K < B; K++)
              (s = I[K]),
                (v = I[K + 1]),
                (u = J[K]),
                (w = o + b.round((s - this.minx) * (f / k))),
                (y = K < B - 1 ? o + b.round((v - this.minx) * (f / k)) : f),
                (A = w + (y - w) / 2),
                (j[K] = [z || 0, A, K]),
                (z = A),
                u === null
                  ? K &&
                    (J[K - 1] !== null && ((q = []), r.push(q)), h.push(null))
                  : (u < this.miny && (u = this.miny),
                    u > this.maxy && (u = this.maxy),
                    q.length || q.push([w, n + g]),
                    (p = [w, n + b.round(g - g * ((u - this.miny) / l))]),
                    q.push(p),
                    h.push(p));
            (C = []), (D = []), (E = r.length);
            for (K = 0; K < E; K++)
              (q = r[K]),
                q.length &&
                  (a.get("fillColor") &&
                    (q.push([q[q.length - 1][0], n + g]),
                    D.push(q.slice(0)),
                    q.pop()),
                  q.length > 2 && (q[0] = [q[0][0], q[1][1]]),
                  C.push(q));
            E = D.length;
            for (K = 0; K < E; K++)
              e.drawShape(
                D[K],
                a.get("fillColor"),
                a.get("fillColor"),
              ).append();
            a.get("normalRangeMin") !== c &&
              a.get("drawNormalOnTop") &&
              this.drawNormalRange(o, n, g, f, l),
              (E = C.length);
            for (K = 0; K < E; K++)
              e.drawShape(
                C[K],
                a.get("lineColor"),
                c,
                a.get("lineWidth"),
              ).append();
            if (i && a.get("valueSpots")) {
              (F = a.get("valueSpots")), F.get === c && (F = new t(F));
              for (K = 0; K < B; K++)
                (H = F.get(J[K])),
                  H &&
                    e
                      .drawCircle(
                        o + b.round((I[K] - this.minx) * (f / k)),
                        n + b.round(g - g * ((J[K] - this.miny) / l)),
                        i,
                        c,
                        H,
                      )
                      .append();
            }
            i &&
              a.get("spotColor") &&
              J[m] !== null &&
              e
                .drawCircle(
                  o + b.round((I[I.length - 1] - this.minx) * (f / k)),
                  n + b.round(g - g * ((J[m] - this.miny) / l)),
                  i,
                  c,
                  a.get("spotColor"),
                )
                .append(),
              this.maxy !== this.minyorg &&
                (i &&
                  a.get("minSpotColor") &&
                  ((s = I[d.inArray(this.minyorg, J)]),
                  e
                    .drawCircle(
                      o + b.round((s - this.minx) * (f / k)),
                      n + b.round(g - g * ((this.minyorg - this.miny) / l)),
                      i,
                      c,
                      a.get("minSpotColor"),
                    )
                    .append()),
                i &&
                  a.get("maxSpotColor") &&
                  ((s = I[d.inArray(this.maxyorg, J)]),
                  e
                    .drawCircle(
                      o + b.round((s - this.minx) * (f / k)),
                      n + b.round(g - g * ((this.maxyorg - this.miny) / l)),
                      i,
                      c,
                      a.get("maxSpotColor"),
                    )
                    .append())),
              (this.lastShapeId = e.getLastShapeId()),
              (this.canvasTop = n),
              e.render();
          },
        })),
      (d.fn.sparkline.bar = y =
        g(d.fn.sparkline._base, w, {
          type: "bar",
          init: function (a, e, f, g, h) {
            var j = parseInt(f.get("barWidth"), 10),
              n = parseInt(f.get("barSpacing"), 10),
              o = f.get("chartRangeMin"),
              p = f.get("chartRangeMax"),
              q = f.get("chartRangeClip"),
              r = Infinity,
              s = -Infinity,
              u,
              v,
              w,
              x,
              z,
              A,
              B,
              C,
              D,
              E,
              F,
              G,
              H,
              I,
              J,
              K,
              L,
              M,
              N,
              O,
              P,
              Q,
              R;
            y._super.init.call(this, a, e, f, g, h);
            for (A = 0, B = e.length; A < B; A++) {
              (O = e[A]), (u = typeof O == "string" && O.indexOf(":") > -1);
              if (u || d.isArray(O))
                (J = !0),
                  u && (O = e[A] = l(O.split(":"))),
                  (O = m(O, null)),
                  (v = b.min.apply(b, O)),
                  (w = b.max.apply(b, O)),
                  v < r && (r = v),
                  w > s && (s = w);
            }
            (this.stacked = J),
              (this.regionShapes = {}),
              (this.barWidth = j),
              (this.barSpacing = n),
              (this.totalBarWidth = j + n),
              (this.width = g = e.length * j + (e.length - 1) * n),
              this.initTarget(),
              q &&
                ((H = o === c ? -Infinity : o), (I = p === c ? Infinity : p)),
              (z = []),
              (x = J ? [] : z);
            var S = [],
              T = [];
            for (A = 0, B = e.length; A < B; A++)
              if (J) {
                (K = e[A]), (e[A] = N = []), (S[A] = 0), (x[A] = T[A] = 0);
                for (L = 0, M = K.length; L < M; L++)
                  (O = N[L] = q ? i(K[L], H, I) : K[L]),
                    O !== null &&
                      (O > 0 && (S[A] += O),
                      r < 0 && s > 0
                        ? O < 0
                          ? (T[A] += b.abs(O))
                          : (x[A] += O)
                        : (x[A] += b.abs(O - (O < 0 ? s : r))),
                      z.push(O));
              } else
                (O = q ? i(e[A], H, I) : e[A]),
                  (O = e[A] = k(O)),
                  O !== null && z.push(O);
            (this.max = G = b.max.apply(b, z)),
              (this.min = F = b.min.apply(b, z)),
              (this.stackMax = s = J ? b.max.apply(b, S) : G),
              (this.stackMin = r = J ? b.min.apply(b, z) : F),
              f.get("chartRangeMin") !== c &&
                (f.get("chartRangeClip") || f.get("chartRangeMin") < F) &&
                (F = f.get("chartRangeMin")),
              f.get("chartRangeMax") !== c &&
                (f.get("chartRangeClip") || f.get("chartRangeMax") > G) &&
                (G = f.get("chartRangeMax")),
              (this.zeroAxis = D = f.get("zeroAxis", !0)),
              F <= 0 && G >= 0 && D
                ? (E = 0)
                : D == 0
                  ? (E = F)
                  : F > 0
                    ? (E = F)
                    : (E = G),
              (this.xaxisOffset = E),
              (C = J ? b.max.apply(b, x) + b.max.apply(b, T) : G - F),
              (this.canvasHeightEf =
                D && F < 0 ? this.canvasHeight - 2 : this.canvasHeight - 1),
              F < E
                ? ((Q = J && G >= 0 ? s : G),
                  (P = ((Q - E) / C) * this.canvasHeight),
                  P !== b.ceil(P) &&
                    ((this.canvasHeightEf -= 2), (P = b.ceil(P))))
                : (P = this.canvasHeight),
              (this.yoffset = P),
              d.isArray(f.get("colorMap"))
                ? ((this.colorMapByIndex = f.get("colorMap")),
                  (this.colorMapByValue = null))
                : ((this.colorMapByIndex = null),
                  (this.colorMapByValue = f.get("colorMap")),
                  this.colorMapByValue &&
                    this.colorMapByValue.get === c &&
                    (this.colorMapByValue = new t(this.colorMapByValue))),
              (this.range = C);
          },
          getRegion: function (a, d, e) {
            var f = b.floor(d / this.totalBarWidth);
            return f < 0 || f >= this.values.length ? c : f;
          },
          getCurrentRegionFields: function () {
            var a = this.currentRegion,
              b = r(this.values[a]),
              c = [],
              d,
              e;
            for (e = b.length; e--; )
              (d = b[e]),
                c.push({
                  isNull: d === null,
                  value: d,
                  color: this.calcColor(e, d, a),
                  offset: a,
                });
            return c;
          },
          calcColor: function (a, b, e) {
            var f = this.colorMapByIndex,
              g = this.colorMapByValue,
              h = this.options,
              i,
              j;
            return (
              this.stacked
                ? (i = h.get("stackedBarColor"))
                : (i = b < 0 ? h.get("negBarColor") : h.get("barColor")),
              b === 0 && h.get("zeroColor") !== c && (i = h.get("zeroColor")),
              g && (j = g.get(b)) ? (i = j) : f && f.length > e && (i = f[e]),
              d.isArray(i) ? i[a % i.length] : i
            );
          },
          renderRegion: function (a, e) {
            var f = this.values[a],
              g = this.options,
              h = this.xaxisOffset,
              i = [],
              j = this.range,
              k = this.stacked,
              l = this.target,
              m = a * this.totalBarWidth,
              n = this.canvasHeightEf,
              p = this.yoffset,
              q,
              r,
              s,
              t,
              u,
              v,
              w,
              x,
              y,
              z;
            (f = d.isArray(f) ? f : [f]),
              (w = f.length),
              (x = f[0]),
              (t = o(null, f)),
              (z = o(h, f, !0));
            if (t)
              return g.get("nullColor")
                ? ((s = e
                    ? g.get("nullColor")
                    : this.calcHighlightColor(g.get("nullColor"), g)),
                  (q = p > 0 ? p - 1 : p),
                  l.drawRect(m, q, this.barWidth - 1, 0, s, s))
                : c;
            u = p;
            for (v = 0; v < w; v++) {
              x = f[v];
              if (k && x === h) {
                if (!z || y) continue;
                y = !0;
              }
              j > 0 ? (r = b.floor(n * (b.abs(x - h) / j)) + 1) : (r = 1),
                x < h || (x === h && p === 0)
                  ? ((q = u), (u += r))
                  : ((q = p - r), (p -= r)),
                (s = this.calcColor(v, x, a)),
                e && (s = this.calcHighlightColor(s, g)),
                i.push(l.drawRect(m, q, this.barWidth - 1, r - 1, s, s));
            }
            return i.length === 1 ? i[0] : i;
          },
        })),
      (d.fn.sparkline.tristate = z =
        g(d.fn.sparkline._base, w, {
          type: "tristate",
          init: function (a, b, e, f, g) {
            var h = parseInt(e.get("barWidth"), 10),
              i = parseInt(e.get("barSpacing"), 10);
            z._super.init.call(this, a, b, e, f, g),
              (this.regionShapes = {}),
              (this.barWidth = h),
              (this.barSpacing = i),
              (this.totalBarWidth = h + i),
              (this.values = d.map(b, Number)),
              (this.width = f = b.length * h + (b.length - 1) * i),
              d.isArray(e.get("colorMap"))
                ? ((this.colorMapByIndex = e.get("colorMap")),
                  (this.colorMapByValue = null))
                : ((this.colorMapByIndex = null),
                  (this.colorMapByValue = e.get("colorMap")),
                  this.colorMapByValue &&
                    this.colorMapByValue.get === c &&
                    (this.colorMapByValue = new t(this.colorMapByValue))),
              this.initTarget();
          },
          getRegion: function (a, c, d) {
            return b.floor(c / this.totalBarWidth);
          },
          getCurrentRegionFields: function () {
            var a = this.currentRegion;
            return {
              isNull: this.values[a] === c,
              value: this.values[a],
              color: this.calcColor(this.values[a], a),
              offset: a,
            };
          },
          calcColor: function (a, b) {
            var c = this.values,
              d = this.options,
              e = this.colorMapByIndex,
              f = this.colorMapByValue,
              g,
              h;
            return (
              f && (h = f.get(a))
                ? (g = h)
                : e && e.length > b
                  ? (g = e[b])
                  : c[b] < 0
                    ? (g = d.get("negBarColor"))
                    : c[b] > 0
                      ? (g = d.get("posBarColor"))
                      : (g = d.get("zeroBarColor")),
              g
            );
          },
          renderRegion: function (a, c) {
            var d = this.values,
              e = this.options,
              f = this.target,
              g,
              h,
              i,
              j,
              k,
              l;
            (g = f.pixelHeight),
              (i = b.round(g / 2)),
              (j = a * this.totalBarWidth),
              d[a] < 0
                ? ((k = i), (h = i - 1))
                : d[a] > 0
                  ? ((k = 0), (h = i - 1))
                  : ((k = i - 1), (h = 2)),
              (l = this.calcColor(d[a], a));
            if (l === null) return;
            return (
              c && (l = this.calcHighlightColor(l, e)),
              f.drawRect(j, k, this.barWidth - 1, h - 1, l, l)
            );
          },
        })),
      (d.fn.sparkline.discrete = A =
        g(d.fn.sparkline._base, w, {
          type: "discrete",
          init: function (a, e, f, g, h) {
            A._super.init.call(this, a, e, f, g, h),
              (this.regionShapes = {}),
              (this.values = e = d.map(e, Number)),
              (this.min = b.min.apply(b, e)),
              (this.max = b.max.apply(b, e)),
              (this.range = this.max - this.min),
              (this.width = g =
                f.get("width") === "auto" ? e.length * 2 : this.width),
              (this.interval = b.floor(g / e.length)),
              (this.itemWidth = g / e.length),
              f.get("chartRangeMin") !== c &&
                (f.get("chartRangeClip") ||
                  f.get("chartRangeMin") < this.min) &&
                (this.min = f.get("chartRangeMin")),
              f.get("chartRangeMax") !== c &&
                (f.get("chartRangeClip") ||
                  f.get("chartRangeMax") > this.max) &&
                (this.max = f.get("chartRangeMax")),
              this.initTarget(),
              this.target &&
                (this.lineHeight =
                  f.get("lineHeight") === "auto"
                    ? b.round(this.canvasHeight * 0.3)
                    : f.get("lineHeight"));
          },
          getRegion: function (a, c, d) {
            return b.floor(c / this.itemWidth);
          },
          getCurrentRegionFields: function () {
            var a = this.currentRegion;
            return {
              isNull: this.values[a] === c,
              value: this.values[a],
              offset: a,
            };
          },
          renderRegion: function (a, c) {
            var d = this.values,
              e = this.options,
              f = this.min,
              g = this.max,
              h = this.range,
              j = this.interval,
              k = this.target,
              l = this.canvasHeight,
              m = this.lineHeight,
              n = l - m,
              o,
              p,
              q,
              r;
            return (
              (p = i(d[a], f, g)),
              (r = a * j),
              (o = b.round(n - n * ((p - f) / h))),
              (q =
                e.get("thresholdColor") && p < e.get("thresholdValue")
                  ? e.get("thresholdColor")
                  : e.get("lineColor")),
              c && (q = this.calcHighlightColor(q, e)),
              k.drawLine(r, o, r, o + m, q)
            );
          },
        })),
      (d.fn.sparkline.bullet = B =
        g(d.fn.sparkline._base, {
          type: "bullet",
          init: function (a, d, e, f, g) {
            var h, i, j;
            B._super.init.call(this, a, d, e, f, g),
              (this.values = d = l(d)),
              (j = d.slice()),
              (j[0] = j[0] === null ? j[2] : j[0]),
              (j[1] = d[1] === null ? j[2] : j[1]),
              (h = b.min.apply(b, d)),
              (i = b.max.apply(b, d)),
              e.get("base") === c ? (h = h < 0 ? h : 0) : (h = e.get("base")),
              (this.min = h),
              (this.max = i),
              (this.range = i - h),
              (this.shapes = {}),
              (this.valueShapes = {}),
              (this.regiondata = {}),
              (this.width = f = e.get("width") === "auto" ? "4.0em" : f),
              (this.target = this.$el.simpledraw(f, g, e.get("composite"))),
              d.length || (this.disabled = !0),
              this.initTarget();
          },
          getRegion: function (a, b, d) {
            var e = this.target.getShapeAt(a, b, d);
            return e !== c && this.shapes[e] !== c ? this.shapes[e] : c;
          },
          getCurrentRegionFields: function () {
            var a = this.currentRegion;
            return {
              fieldkey: a.substr(0, 1),
              value: this.values[a.substr(1)],
              region: a,
            };
          },
          changeHighlight: function (a) {
            var b = this.currentRegion,
              c = this.valueShapes[b],
              d;
            delete this.shapes[c];
            switch (b.substr(0, 1)) {
              case "r":
                d = this.renderRange(b.substr(1), a);
                break;
              case "p":
                d = this.renderPerformance(a);
                break;
              case "t":
                d = this.renderTarget(a);
            }
            (this.valueShapes[b] = d.id),
              (this.shapes[d.id] = b),
              this.target.replaceWithShape(c, d);
          },
          renderRange: function (a, c) {
            var d = this.values[a],
              e = b.round(this.canvasWidth * ((d - this.min) / this.range)),
              f = this.options.get("rangeColors")[a - 2];
            return (
              c && (f = this.calcHighlightColor(f, this.options)),
              this.target.drawRect(0, 0, e - 1, this.canvasHeight - 1, f, f)
            );
          },
          renderPerformance: function (a) {
            var c = this.values[1],
              d = b.round(this.canvasWidth * ((c - this.min) / this.range)),
              e = this.options.get("performanceColor");
            return (
              a && (e = this.calcHighlightColor(e, this.options)),
              this.target.drawRect(
                0,
                b.round(this.canvasHeight * 0.3),
                d - 1,
                b.round(this.canvasHeight * 0.4) - 1,
                e,
                e,
              )
            );
          },
          renderTarget: function (a) {
            var c = this.values[0],
              d = b.round(
                this.canvasWidth * ((c - this.min) / this.range) -
                  this.options.get("targetWidth") / 2,
              ),
              e = b.round(this.canvasHeight * 0.1),
              f = this.canvasHeight - e * 2,
              g = this.options.get("targetColor");
            return (
              a && (g = this.calcHighlightColor(g, this.options)),
              this.target.drawRect(
                d,
                e,
                this.options.get("targetWidth") - 1,
                f - 1,
                g,
                g,
              )
            );
          },
          render: function () {
            var a = this.values.length,
              b = this.target,
              c,
              d;
            if (!B._super.render.call(this)) return;
            for (c = 2; c < a; c++)
              (d = this.renderRange(c).append()),
                (this.shapes[d.id] = "r" + c),
                (this.valueShapes["r" + c] = d.id);
            this.values[1] !== null &&
              ((d = this.renderPerformance().append()),
              (this.shapes[d.id] = "p1"),
              (this.valueShapes.p1 = d.id)),
              this.values[0] !== null &&
                ((d = this.renderTarget().append()),
                (this.shapes[d.id] = "t0"),
                (this.valueShapes.t0 = d.id)),
              b.render();
          },
        })),
      (d.fn.sparkline.pie = C =
        g(d.fn.sparkline._base, {
          type: "pie",
          init: function (a, c, e, f, g) {
            var h = 0,
              i;
            C._super.init.call(this, a, c, e, f, g),
              (this.shapes = {}),
              (this.valueShapes = {}),
              (this.values = c = d.map(c, Number)),
              e.get("width") === "auto" && (this.width = this.height);
            if (c.length > 0) for (i = c.length; i--; ) h += c[i];
            (this.total = h),
              this.initTarget(),
              (this.radius = b.floor(
                b.min(this.canvasWidth, this.canvasHeight) / 2,
              ));
          },
          getRegion: function (a, b, d) {
            var e = this.target.getShapeAt(a, b, d);
            return e !== c && this.shapes[e] !== c ? this.shapes[e] : c;
          },
          getCurrentRegionFields: function () {
            var a = this.currentRegion;
            return {
              isNull: this.values[a] === c,
              value: this.values[a],
              percent: (this.values[a] / this.total) * 100,
              color:
                this.options.get("sliceColors")[
                  a % this.options.get("sliceColors").length
                ],
              offset: a,
            };
          },
          changeHighlight: function (a) {
            var b = this.currentRegion,
              c = this.renderSlice(b, a),
              d = this.valueShapes[b];
            delete this.shapes[d],
              this.target.replaceWithShape(d, c),
              (this.valueShapes[b] = c.id),
              (this.shapes[c.id] = b);
          },
          renderSlice: function (a, d) {
            var e = this.target,
              f = this.options,
              g = this.radius,
              h = f.get("borderWidth"),
              i = f.get("offset"),
              j = 2 * b.PI,
              k = this.values,
              l = this.total,
              m = i ? 2 * b.PI * (i / 360) : 0,
              n,
              o,
              p,
              q,
              r;
            q = k.length;
            for (p = 0; p < q; p++) {
              (n = m), (o = m), l > 0 && (o = m + j * (k[p] / l));
              if (a === p)
                return (
                  (r = f.get("sliceColors")[p % f.get("sliceColors").length]),
                  d && (r = this.calcHighlightColor(r, f)),
                  e.drawPieSlice(g, g, g - h, n, o, c, r)
                );
              m = o;
            }
          },
          render: function () {
            var a = this.target,
              d = this.values,
              e = this.options,
              f = this.radius,
              g = e.get("borderWidth"),
              h,
              i;
            if (!C._super.render.call(this)) return;
            g &&
              a
                .drawCircle(
                  f,
                  f,
                  b.floor(f - g / 2),
                  e.get("borderColor"),
                  c,
                  g,
                )
                .append();
            for (i = d.length; i--; )
              d[i] &&
                ((h = this.renderSlice(i).append()),
                (this.valueShapes[i] = h.id),
                (this.shapes[h.id] = i));
            a.render();
          },
        })),
      (d.fn.sparkline.box = D =
        g(d.fn.sparkline._base, {
          type: "box",
          init: function (a, b, c, e, f) {
            D._super.init.call(this, a, b, c, e, f),
              (this.values = d.map(b, Number)),
              (this.width = c.get("width") === "auto" ? "4.0em" : e),
              this.initTarget(),
              this.values.length || (this.disabled = 1);
          },
          getRegion: function () {
            return 1;
          },
          getCurrentRegionFields: function () {
            var a = [
              { field: "lq", value: this.quartiles[0] },
              { field: "med", value: this.quartiles[1] },
              { field: "uq", value: this.quartiles[2] },
            ];
            return (
              this.loutlier !== c &&
                a.push({ field: "lo", value: this.loutlier }),
              this.routlier !== c &&
                a.push({ field: "ro", value: this.routlier }),
              this.lwhisker !== c &&
                a.push({ field: "lw", value: this.lwhisker }),
              this.rwhisker !== c &&
                a.push({ field: "rw", value: this.rwhisker }),
              a
            );
          },
          render: function () {
            var a = this.target,
              d = this.values,
              e = d.length,
              f = this.options,
              g = this.canvasWidth,
              h = this.canvasHeight,
              i =
                f.get("chartRangeMin") === c
                  ? b.min.apply(b, d)
                  : f.get("chartRangeMin"),
              k =
                f.get("chartRangeMax") === c
                  ? b.max.apply(b, d)
                  : f.get("chartRangeMax"),
              l = 0,
              m,
              n,
              o,
              p,
              q,
              r,
              s,
              t,
              u,
              v,
              w;
            if (!D._super.render.call(this)) return;
            if (f.get("raw"))
              f.get("showOutliers") && d.length > 5
                ? ((n = d[0]),
                  (m = d[1]),
                  (p = d[2]),
                  (q = d[3]),
                  (r = d[4]),
                  (s = d[5]),
                  (t = d[6]))
                : ((m = d[0]), (p = d[1]), (q = d[2]), (r = d[3]), (s = d[4]));
            else {
              d.sort(function (a, b) {
                return a - b;
              }),
                (p = j(d, 1)),
                (q = j(d, 2)),
                (r = j(d, 3)),
                (o = r - p);
              if (f.get("showOutliers")) {
                m = s = c;
                for (u = 0; u < e; u++)
                  m === c && d[u] > p - o * f.get("outlierIQR") && (m = d[u]),
                    d[u] < r + o * f.get("outlierIQR") && (s = d[u]);
                (n = d[0]), (t = d[e - 1]);
              } else (m = d[0]), (s = d[e - 1]);
            }
            (this.quartiles = [p, q, r]),
              (this.lwhisker = m),
              (this.rwhisker = s),
              (this.loutlier = n),
              (this.routlier = t),
              (w = g / (k - i + 1)),
              f.get("showOutliers") &&
                ((l = b.ceil(f.get("spotRadius"))),
                (g -= 2 * b.ceil(f.get("spotRadius"))),
                (w = g / (k - i + 1)),
                n < m &&
                  a
                    .drawCircle(
                      (n - i) * w + l,
                      h / 2,
                      f.get("spotRadius"),
                      f.get("outlierLineColor"),
                      f.get("outlierFillColor"),
                    )
                    .append(),
                t > s &&
                  a
                    .drawCircle(
                      (t - i) * w + l,
                      h / 2,
                      f.get("spotRadius"),
                      f.get("outlierLineColor"),
                      f.get("outlierFillColor"),
                    )
                    .append()),
              a
                .drawRect(
                  b.round((p - i) * w + l),
                  b.round(h * 0.1),
                  b.round((r - p) * w),
                  b.round(h * 0.8),
                  f.get("boxLineColor"),
                  f.get("boxFillColor"),
                )
                .append(),
              a
                .drawLine(
                  b.round((m - i) * w + l),
                  b.round(h / 2),
                  b.round((p - i) * w + l),
                  b.round(h / 2),
                  f.get("lineColor"),
                )
                .append(),
              a
                .drawLine(
                  b.round((m - i) * w + l),
                  b.round(h / 4),
                  b.round((m - i) * w + l),
                  b.round(h - h / 4),
                  f.get("whiskerColor"),
                )
                .append(),
              a
                .drawLine(
                  b.round((s - i) * w + l),
                  b.round(h / 2),
                  b.round((r - i) * w + l),
                  b.round(h / 2),
                  f.get("lineColor"),
                )
                .append(),
              a
                .drawLine(
                  b.round((s - i) * w + l),
                  b.round(h / 4),
                  b.round((s - i) * w + l),
                  b.round(h - h / 4),
                  f.get("whiskerColor"),
                )
                .append(),
              a
                .drawLine(
                  b.round((q - i) * w + l),
                  b.round(h * 0.1),
                  b.round((q - i) * w + l),
                  b.round(h * 0.9),
                  f.get("medianColor"),
                )
                .append(),
              f.get("target") &&
                ((v = b.ceil(f.get("spotRadius"))),
                a
                  .drawLine(
                    b.round((f.get("target") - i) * w + l),
                    b.round(h / 2 - v),
                    b.round((f.get("target") - i) * w + l),
                    b.round(h / 2 + v),
                    f.get("targetColor"),
                  )
                  .append(),
                a
                  .drawLine(
                    b.round((f.get("target") - i) * w + l - v),
                    b.round(h / 2),
                    b.round((f.get("target") - i) * w + l + v),
                    b.round(h / 2),
                    f.get("targetColor"),
                  )
                  .append()),
              a.render();
          },
        })),
      (G = g({
        init: function (a, b, c, d) {
          (this.target = a), (this.id = b), (this.type = c), (this.args = d);
        },
        append: function () {
          return this.target.appendShape(this), this;
        },
      })),
      (H = g({
        _pxregex: /(\d+)(px)?\s*$/i,
        init: function (a, b, c) {
          if (!a) return;
          (this.width = a),
            (this.height = b),
            (this.target = c),
            (this.lastShapeId = null),
            c[0] && (c = c[0]),
            d.data(c, "_jqs_vcanvas", this);
        },
        drawLine: function (a, b, c, d, e, f) {
          return this.drawShape(
            [
              [a, b],
              [c, d],
            ],
            e,
            f,
          );
        },
        drawShape: function (a, b, c, d) {
          return this._genShape("Shape", [a, b, c, d]);
        },
        drawCircle: function (a, b, c, d, e, f) {
          return this._genShape("Circle", [a, b, c, d, e, f]);
        },
        drawPieSlice: function (a, b, c, d, e, f, g) {
          return this._genShape("PieSlice", [a, b, c, d, e, f, g]);
        },
        drawRect: function (a, b, c, d, e, f) {
          return this._genShape("Rect", [a, b, c, d, e, f]);
        },
        getElement: function () {
          return this.canvas;
        },
        getLastShapeId: function () {
          return this.lastShapeId;
        },
        reset: function () {
          alert("reset not implemented");
        },
        _insert: function (a, b) {
          d(b).html(a);
        },
        _calculatePixelDims: function (a, b, c) {
          var e;
          (e = this._pxregex.exec(b)),
            e ? (this.pixelHeight = e[1]) : (this.pixelHeight = d(c).height()),
            (e = this._pxregex.exec(a)),
            e ? (this.pixelWidth = e[1]) : (this.pixelWidth = d(c).width());
        },
        _genShape: function (a, b) {
          var c = L++;
          return b.unshift(c), new G(this, c, a, b);
        },
        appendShape: function (a) {
          alert("appendShape not implemented");
        },
        replaceWithShape: function (a, b) {
          alert("replaceWithShape not implemented");
        },
        insertAfterShape: function (a, b) {
          alert("insertAfterShape not implemented");
        },
        removeShapeId: function (a) {
          alert("removeShapeId not implemented");
        },
        getShapeAt: function (a, b, c) {
          alert("getShapeAt not implemented");
        },
        render: function () {
          alert("render not implemented");
        },
      })),
      (I = g(H, {
        init: function (b, e, f, g) {
          I._super.init.call(this, b, e, f),
            (this.canvas = a.createElement("canvas")),
            f[0] && (f = f[0]),
            d.data(f, "_jqs_vcanvas", this),
            d(this.canvas).css({
              display: "inline-block",
              width: b,
              height: e,
              verticalAlign: "top",
            }),
            this._insert(this.canvas, f),
            this._calculatePixelDims(b, e, this.canvas),
            (this.canvas.width = this.pixelWidth),
            (this.canvas.height = this.pixelHeight),
            (this.interact = g),
            (this.shapes = {}),
            (this.shapeseq = []),
            (this.currentTargetShapeId = c),
            d(this.canvas).css({
              width: this.pixelWidth,
              height: this.pixelHeight,
            });
        },
        _getContext: function (a, b, d) {
          var e = this.canvas.getContext("2d");
          return (
            a !== c && (e.strokeStyle = a),
            (e.lineWidth = d === c ? 1 : d),
            b !== c && (e.fillStyle = b),
            e
          );
        },
        reset: function () {
          var a = this._getContext();
          a.clearRect(0, 0, this.pixelWidth, this.pixelHeight),
            (this.shapes = {}),
            (this.shapeseq = []),
            (this.currentTargetShapeId = c);
        },
        _drawShape: function (a, b, d, e, f) {
          var g = this._getContext(d, e, f),
            h,
            i;
          g.beginPath(), g.moveTo(b[0][0] + 0.5, b[0][1] + 0.5);
          for (h = 1, i = b.length; h < i; h++)
            g.lineTo(b[h][0] + 0.5, b[h][1] + 0.5);
          d !== c && g.stroke(),
            e !== c && g.fill(),
            this.targetX !== c &&
              this.targetY !== c &&
              g.isPointInPath(this.targetX, this.targetY) &&
              (this.currentTargetShapeId = a);
        },
        _drawCircle: function (a, d, e, f, g, h, i) {
          var j = this._getContext(g, h, i);
          j.beginPath(),
            j.arc(d, e, f, 0, 2 * b.PI, !1),
            this.targetX !== c &&
              this.targetY !== c &&
              j.isPointInPath(this.targetX, this.targetY) &&
              (this.currentTargetShapeId = a),
            g !== c && j.stroke(),
            h !== c && j.fill();
        },
        _drawPieSlice: function (a, b, d, e, f, g, h, i) {
          var j = this._getContext(h, i);
          j.beginPath(),
            j.moveTo(b, d),
            j.arc(b, d, e, f, g, !1),
            j.lineTo(b, d),
            j.closePath(),
            h !== c && j.stroke(),
            i && j.fill(),
            this.targetX !== c &&
              this.targetY !== c &&
              j.isPointInPath(this.targetX, this.targetY) &&
              (this.currentTargetShapeId = a);
        },
        _drawRect: function (a, b, c, d, e, f, g) {
          return this._drawShape(
            a,
            [
              [b, c],
              [b + d, c],
              [b + d, c + e],
              [b, c + e],
              [b, c],
            ],
            f,
            g,
          );
        },
        appendShape: function (a) {
          return (
            (this.shapes[a.id] = a),
            this.shapeseq.push(a.id),
            (this.lastShapeId = a.id),
            a.id
          );
        },
        replaceWithShape: function (a, b) {
          var c = this.shapeseq,
            d;
          this.shapes[b.id] = b;
          for (d = c.length; d--; ) c[d] == a && (c[d] = b.id);
          delete this.shapes[a];
        },
        replaceWithShapes: function (a, b) {
          var c = this.shapeseq,
            d = {},
            e,
            f,
            g;
          for (f = a.length; f--; ) d[a[f]] = !0;
          for (f = c.length; f--; )
            (e = c[f]),
              d[e] && (c.splice(f, 1), delete this.shapes[e], (g = f));
          for (f = b.length; f--; )
            c.splice(g, 0, b[f].id), (this.shapes[b[f].id] = b[f]);
        },
        insertAfterShape: function (a, b) {
          var c = this.shapeseq,
            d;
          for (d = c.length; d--; )
            if (c[d] === a) {
              c.splice(d + 1, 0, b.id), (this.shapes[b.id] = b);
              return;
            }
        },
        removeShapeId: function (a) {
          var b = this.shapeseq,
            c;
          for (c = b.length; c--; )
            if (b[c] === a) {
              b.splice(c, 1);
              break;
            }
          delete this.shapes[a];
        },
        getShapeAt: function (a, b, c) {
          return (
            (this.targetX = b),
            (this.targetY = c),
            this.render(),
            this.currentTargetShapeId
          );
        },
        render: function () {
          var a = this.shapeseq,
            b = this.shapes,
            c = a.length,
            d = this._getContext(),
            e,
            f,
            g;
          d.clearRect(0, 0, this.pixelWidth, this.pixelHeight);
          for (g = 0; g < c; g++)
            (e = a[g]), (f = b[e]), this["_draw" + f.type].apply(this, f.args);
          this.interact || ((this.shapes = {}), (this.shapeseq = []));
        },
      })),
      (J = g(H, {
        init: function (b, c, e) {
          var f;
          J._super.init.call(this, b, c, e),
            e[0] && (e = e[0]),
            d.data(e, "_jqs_vcanvas", this),
            (this.canvas = a.createElement("span")),
            d(this.canvas).css({
              display: "inline-block",
              position: "relative",
              overflow: "hidden",
              width: b,
              height: c,
              margin: "0px",
              padding: "0px",
              verticalAlign: "top",
            }),
            this._insert(this.canvas, e),
            this._calculatePixelDims(b, c, this.canvas),
            (this.canvas.width = this.pixelWidth),
            (this.canvas.height = this.pixelHeight),
            (f =
              '<v:group coordorigin="0 0" coordsize="' +
              this.pixelWidth +
              " " +
              this.pixelHeight +
              '"' +
              ' style="position:absolute;top:0;left:0;width:' +
              this.pixelWidth +
              "px;height=" +
              this.pixelHeight +
              'px;"></v:group>'),
            this.canvas.insertAdjacentHTML("beforeEnd", f),
            (this.group = d(this.canvas).children()[0]),
            (this.rendered = !1),
            (this.prerender = "");
        },
        _drawShape: function (a, b, d, e, f) {
          var g = [],
            h,
            i,
            j,
            k,
            l,
            m,
            n;
          for (n = 0, m = b.length; n < m; n++)
            g[n] = "" + b[n][0] + "," + b[n][1];
          return (
            (h = g.splice(0, 1)),
            (f = f === c ? 1 : f),
            (i =
              d === c
                ? ' stroked="false" '
                : ' strokeWeight="' + f + 'px" strokeColor="' + d + '" '),
            (j =
              e === c
                ? ' filled="false"'
                : ' fillColor="' + e + '" filled="true" '),
            (k = g[0] === g[g.length - 1] ? "x " : ""),
            (l =
              '<v:shape coordorigin="0 0" coordsize="' +
              this.pixelWidth +
              " " +
              this.pixelHeight +
              '" ' +
              ' id="jqsshape' +
              a +
              '" ' +
              i +
              j +
              ' style="position:absolute;left:0px;top:0px;height:' +
              this.pixelHeight +
              "px;width:" +
              this.pixelWidth +
              'px;padding:0px;margin:0px;" ' +
              ' path="m ' +
              h +
              " l " +
              g.join(", ") +
              " " +
              k +
              'e">' +
              " </v:shape>"),
            l
          );
        },
        _drawCircle: function (a, b, d, e, f, g, h) {
          var i, j, k;
          return (
            (b -= e),
            (d -= e),
            (i =
              f === c
                ? ' stroked="false" '
                : ' strokeWeight="' + h + 'px" strokeColor="' + f + '" '),
            (j =
              g === c
                ? ' filled="false"'
                : ' fillColor="' + g + '" filled="true" '),
            (k =
              '<v:oval  id="jqsshape' +
              a +
              '" ' +
              i +
              j +
              ' style="position:absolute;top:' +
              d +
              "px; left:" +
              b +
              "px; width:" +
              e * 2 +
              "px; height:" +
              e * 2 +
              'px"></v:oval>'),
            k
          );
        },
        _drawPieSlice: function (a, d, e, f, g, h, i, j) {
          var k, l, m, n, o, p, q, r;
          if (g === h) return "";
          h - g === 2 * b.PI && ((g = 0), (h = 2 * b.PI)),
            (l = d + b.round(b.cos(g) * f)),
            (m = e + b.round(b.sin(g) * f)),
            (n = d + b.round(b.cos(h) * f)),
            (o = e + b.round(b.sin(h) * f));
          if (l === n && m === o) {
            if (h - g < b.PI) return "";
            (l = n = d + f), (m = o = e);
          }
          return l === n && m === o && h - g < b.PI
            ? ""
            : ((k = [d - f, e - f, d + f, e + f, l, m, n, o]),
              (p =
                i === c
                  ? ' stroked="false" '
                  : ' strokeWeight="1px" strokeColor="' + i + '" '),
              (q =
                j === c
                  ? ' filled="false"'
                  : ' fillColor="' + j + '" filled="true" '),
              (r =
                '<v:shape coordorigin="0 0" coordsize="' +
                this.pixelWidth +
                " " +
                this.pixelHeight +
                '" ' +
                ' id="jqsshape' +
                a +
                '" ' +
                p +
                q +
                ' style="position:absolute;left:0px;top:0px;height:' +
                this.pixelHeight +
                "px;width:" +
                this.pixelWidth +
                'px;padding:0px;margin:0px;" ' +
                ' path="m ' +
                d +
                "," +
                e +
                " wa " +
                k.join(", ") +
                ' x e">' +
                " </v:shape>"),
              r);
        },
        _drawRect: function (a, b, c, d, e, f, g) {
          return this._drawShape(
            a,
            [
              [b, c],
              [b, c + e],
              [b + d, c + e],
              [b + d, c],
              [b, c],
            ],
            f,
            g,
          );
        },
        reset: function () {
          this.group.innerHTML = "";
        },
        appendShape: function (a) {
          var b = this["_draw" + a.type].apply(this, a.args);
          return (
            this.rendered
              ? this.group.insertAdjacentHTML("beforeEnd", b)
              : (this.prerender += b),
            (this.lastShapeId = a.id),
            a.id
          );
        },
        replaceWithShape: function (a, b) {
          var c = d("#jqsshape" + a),
            e = this["_draw" + b.type].apply(this, b.args);
          c[0].outerHTML = e;
        },
        replaceWithShapes: function (a, b) {
          var c = d("#jqsshape" + a[0]),
            e = "",
            f = b.length,
            g;
          for (g = 0; g < f; g++)
            e += this["_draw" + b[g].type].apply(this, b[g].args);
          c[0].outerHTML = e;
          for (g = 1; g < a.length; g++) d("#jqsshape" + a[g]).remove();
        },
        insertAfterShape: function (a, b) {
          var c = d("#jqsshape" + a),
            e = this["_draw" + b.type].apply(this, b.args);
          c[0].insertAdjacentHTML("afterEnd", e);
        },
        removeShapeId: function (a) {
          var b = d("#jqsshape" + a);
          this.group.removeChild(b[0]);
        },
        getShapeAt: function (a, b, c) {
          var d = a.id.substr(8);
          return d;
        },
        render: function () {
          this.rendered ||
            ((this.group.innerHTML = this.prerender), (this.rendered = !0));
        },
      }));
  });
})(document, Math);

/* jquery.caret  */
(function ($) {
  $.fn.insertAtCaret = function (text, opts) {
    var element = $(this).get(0);

    if (document.selection) {
      element.focus();
      var orig = element.value.replace(/\r\n/g, "\n");
      var range = document.selection.createRange();

      if (range.parentElement() != element) {
        return false;
      }

      range.text = text;

      var actual = (tmp = element.value.replace(/\r\n/g, "\n"));

      for (var diff = 0; diff < orig.length; diff++) {
        if (orig.charAt(diff) != actual.charAt(diff)) break;
      }

      for (
        var index = 0, start = 0;
        tmp.match(text) && (tmp = tmp.replace(text, "")) && index <= diff;
        index = start + text.length
      ) {
        start = actual.indexOf(text, index);
      }
    } else if (element.selectionStart) {
      var start = element.selectionStart;
      var end = element.selectionEnd;

      element.value =
        element.value.substr(0, start) +
        text +
        element.value.substr(end, element.value.length);
    }

    if (start) {
      setCaretTo(element, start + text.length);
    } else {
      element.value = text + element.value;
    }

    $(this).change();

    return this;
  };

  $.fn.replaceTextAt = function (start, end, replacementText) {
    var element = $(this).get(0);

    var wholeString = $(this).val();
    var prefix = wholeString.substr(0, start);
    var suffix = wholeString.substr(end);

    $(this).val(prefix + replacementText + suffix);

    var newCursorPosition = prefix.length + replacementText.length;

    setCaretTo(element, newCursorPosition);

    $(this).change();

    return this;
  };

  $.fn.setCaretPosition = function (start, end) {
    var element = $(this).get(0);
    element.focus();
    setCaretTo(element, start, end);
    return this;
  };

  $.fn.getCaretPosition = function () {
    var element = $(this).get(0);
    $(element).focus();
    return getCaretPosition(element);
  };

  $.fn.getSelectedText = function () {
    var element = $(this).get(0);

    // workaround for firefox because window.getSelection does not work inside inputs
    if (typeof element.selectionStart == "number") {
      return $(element)
        .val()
        .substr(
          element.selectionStart,
          element.selectionEnd - element.selectionStart,
        );
    } else if (document.getSelection) {
      return document.getSelection();
    } else if (window.getSelection) {
      return window.getSelection();
    }
  };

  // privates
  function setCaretTo(element, start, end) {
    if (element.createTextRange) {
      var range = element.createTextRange();
      range.moveStart("character", start);
      range.moveEnd("character", end || start);
      range.select();
    } else if (element.selectionStart) {
      element.focus();
      element.setSelectionRange(start, end || start);
    }
  }

  function getCaretPosition(element) {
    if (typeof element.selectionStart == "number") {
      return element.selectionStart;
    } else if (document.selection) {
      var range = document.selection.createRange();
      var rangeLength = range.text.length;
      range.moveStart("character", -element.value.length);
      return range.text.length - rangeLength;
    }
  }
})(jQuery);

/*! gridster.js - v0.1.0 - 2013-06-14
 * http://gridster.net/
 * Copyright (c) 2013 ducksboard; Licensed MIT */

(function ($, window, document, undefined) {
  /**
   * Creates objects with coordinates (x1, y1, x2, y2, cx, cy, width, height)
   * to simulate DOM elements on the screen.
   * Coords is used by Gridster to create a faux grid with any DOM element can
   * collide.
   *
   * @class Coords
   * @param {HTMLElement|Object} obj The jQuery HTMLElement or a object with: left,
   * top, width and height properties.
   * @return {Object} Coords instance.
   * @constructor
   */
  function Coords(obj) {
    if (obj[0] && $.isPlainObject(obj[0])) {
      this.data = obj[0];
    } else {
      this.el = obj;
    }

    this.isCoords = true;
    this.coords = {};
    this.init();
    return this;
  }

  var fn = Coords.prototype;

  fn.init = function () {
    this.set();
    this.original_coords = this.get();
  };

  fn.set = function (update, not_update_offsets) {
    var el = this.el;

    if (el && !update) {
      this.data = el.offset();
      this.data.width = el.width();
      this.data.height = el.height();
    }

    if (el && update && !not_update_offsets) {
      var offset = el.offset();
      this.data.top = offset.top;
      this.data.left = offset.left;
    }

    var d = this.data;

    this.coords.x1 = d.left;
    this.coords.y1 = d.top;
    this.coords.x2 = d.left + d.width;
    this.coords.y2 = d.top + d.height;
    this.coords.cx = d.left + d.width / 2;
    this.coords.cy = d.top + d.height / 2;
    this.coords.width = d.width;
    this.coords.height = d.height;
    this.coords.el = el || false;

    return this;
  };

  fn.update = function (data) {
    if (!data && !this.el) {
      return this;
    }

    if (data) {
      var new_data = $.extend({}, this.data, data);
      this.data = new_data;
      return this.set(true, true);
    }

    this.set(true);
    return this;
  };

  fn.get = function () {
    return this.coords;
  };

  //jQuery adapter
  $.fn.coords = function () {
    if (this.data("coords")) {
      return this.data("coords");
    }

    var ins = new Coords(this, arguments[0]);
    this.data("coords", ins);
    return ins;
  };
})(jQuery, window, document);

(function ($, window, document, undefined) {
  var defaults = {
    colliders_context: document.body,
    // ,on_overlap: function(collider_data){},
    // on_overlap_start : function(collider_data){},
    // on_overlap_stop : function(collider_data){}
  };

  /**
   * Detects collisions between a DOM element against other DOM elements or
   * Coords objects.
   *
   * @class Collision
   * @uses Coords
   * @param {HTMLElement} el The jQuery wrapped HTMLElement.
   * @param {HTMLElement|Array} colliders Can be a jQuery collection
   *  of HTMLElements or an Array of Coords instances.
   * @param {Object} [options] An Object with all options you want to
   *        overwrite:
   *   @param {Function} [options.on_overlap_start] Executes a function the first
   *    time each `collider ` is overlapped.
   *   @param {Function} [options.on_overlap_stop] Executes a function when a
   *    `collider` is no longer collided.
   *   @param {Function} [options.on_overlap] Executes a function when the
   * mouse is moved during the collision.
   * @return {Object} Collision instance.
   * @constructor
   */
  function Collision(el, colliders, options) {
    this.options = $.extend(defaults, options);
    this.$element = el;
    this.last_colliders = [];
    this.last_colliders_coords = [];
    if (typeof colliders === "string" || colliders instanceof jQuery) {
      this.$colliders = $(colliders, this.options.colliders_context).not(
        this.$element,
      );
    } else {
      this.colliders = $(colliders);
    }

    this.init();
  }

  var fn = Collision.prototype;

  fn.init = function () {
    this.find_collisions();
  };

  fn.overlaps = function (a, b) {
    var x = false;
    var y = false;

    if (
      (b.x1 >= a.x1 && b.x1 <= a.x2) ||
      (b.x2 >= a.x1 && b.x2 <= a.x2) ||
      (a.x1 >= b.x1 && a.x2 <= b.x2)
    ) {
      x = true;
    }

    if (
      (b.y1 >= a.y1 && b.y1 <= a.y2) ||
      (b.y2 >= a.y1 && b.y2 <= a.y2) ||
      (a.y1 >= b.y1 && a.y2 <= b.y2)
    ) {
      y = true;
    }

    return x && y;
  };

  fn.detect_overlapping_region = function (a, b) {
    var regionX = "";
    var regionY = "";

    if (a.y1 > b.cy && a.y1 < b.y2) {
      regionX = "N";
    }
    if (a.y2 > b.y1 && a.y2 < b.cy) {
      regionX = "S";
    }
    if (a.x1 > b.cx && a.x1 < b.x2) {
      regionY = "W";
    }
    if (a.x2 > b.x1 && a.x2 < b.cx) {
      regionY = "E";
    }

    return regionX + regionY || "C";
  };

  fn.calculate_overlapped_area_coords = function (a, b) {
    var x1 = Math.max(a.x1, b.x1);
    var y1 = Math.max(a.y1, b.y1);
    var x2 = Math.min(a.x2, b.x2);
    var y2 = Math.min(a.y2, b.y2);

    return $({
      left: x1,
      top: y1,
      width: x2 - x1,
      height: y2 - y1,
    })
      .coords()
      .get();
  };

  fn.calculate_overlapped_area = function (coords) {
    return coords.width * coords.height;
  };

  fn.manage_colliders_start_stop = function (
    new_colliders_coords,
    start_callback,
    stop_callback,
  ) {
    var last = this.last_colliders_coords;

    for (var i = 0, il = last.length; i < il; i++) {
      if ($.inArray(last[i], new_colliders_coords) === -1) {
        start_callback.call(this, last[i]);
      }
    }

    for (var j = 0, jl = new_colliders_coords.length; j < jl; j++) {
      if ($.inArray(new_colliders_coords[j], last) === -1) {
        stop_callback.call(this, new_colliders_coords[j]);
      }
    }
  };

  fn.find_collisions = function (player_data_coords) {
    var self = this;
    var colliders_coords = [];
    var colliders_data = [];
    var $colliders = this.colliders || this.$colliders;
    var count = $colliders.length;
    var player_coords = self.$element
      .coords()
      .update(player_data_coords || false)
      .get();

    while (count--) {
      var $collider = self.$colliders
        ? $($colliders[count])
        : $colliders[count];
      var $collider_coords_ins = $collider.isCoords
        ? $collider
        : $collider.coords();
      var collider_coords = $collider_coords_ins.get();
      var overlaps = self.overlaps(player_coords, collider_coords);

      if (!overlaps) {
        continue;
      }

      var region = self.detect_overlapping_region(
        player_coords,
        collider_coords,
      );

      //todo: make this an option
      if (region === "C") {
        var area_coords = self.calculate_overlapped_area_coords(
          player_coords,
          collider_coords,
        );
        var area = self.calculate_overlapped_area(area_coords);
        var collider_data = {
          area: area,
          area_coords: area_coords,
          region: region,
          coords: collider_coords,
          player_coords: player_coords,
          el: $collider,
        };

        if (self.options.on_overlap) {
          self.options.on_overlap.call(this, collider_data);
        }
        colliders_coords.push($collider_coords_ins);
        colliders_data.push(collider_data);
      }
    }

    if (self.options.on_overlap_stop || self.options.on_overlap_start) {
      this.manage_colliders_start_stop(
        colliders_coords,
        self.options.on_overlap_start,
        self.options.on_overlap_stop,
      );
    }

    this.last_colliders_coords = colliders_coords;

    return colliders_data;
  };

  fn.get_closest_colliders = function (player_data_coords) {
    var colliders = this.find_collisions(player_data_coords);

    colliders.sort(function (a, b) {
      /* if colliders are being overlapped by the "C" (center) region,
       * we have to set a lower index in the array to which they are placed
       * above in the grid. */
      if (a.region === "C" && b.region === "C") {
        if (a.coords.y1 < b.coords.y1 || a.coords.x1 < b.coords.x1) {
          return -1;
        } else {
          return 1;
        }
      }

      if (a.area < b.area) {
        return 1;
      }

      return 1;
    });
    return colliders;
  };

  //jQuery adapter
  $.fn.collision = function (collider, options) {
    return new Collision(this, collider, options);
  };
})(jQuery, window, document);

(function (window, undefined) {
  /* Debounce and throttle functions taken from underscore.js */
  window.debounce = function (func, wait, immediate) {
    var timeout;
    return function () {
      var context = this,
        args = arguments;
      var later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      if (immediate && !timeout) func.apply(context, args);
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  window.throttle = function (func, wait) {
    var context, args, timeout, throttling, more, result;
    var whenDone = debounce(function () {
      more = throttling = false;
    }, wait);
    return function () {
      context = this;
      args = arguments;
      var later = function () {
        timeout = null;
        if (more) func.apply(context, args);
        whenDone();
      };
      if (!timeout) timeout = setTimeout(later, wait);
      if (throttling) {
        more = true;
      } else {
        result = func.apply(context, args);
      }
      whenDone();
      throttling = true;
      return result;
    };
  };
})(window);

(function ($, window, document, undefined) {
  var defaults = {
    items: ".gs_w",
    distance: 1,
    limit: true,
    offset_left: 0,
    autoscroll: true,
    ignore_dragging: ["INPUT", "TEXTAREA", "SELECT", "BUTTON"],
    handle: null,
    container_width: 0, // 0 == auto
    // drag: function(e){},
    // start : function(e, ui){},
    // stop : function(e){}
  };

  var $window = $(window);
  var isTouch = !!("ontouchstart" in window);
  var pointer_events = {
    start: isTouch
      ? "touchstart.gridster-draggable"
      : "mousedown.gridster-draggable",
    move: isTouch
      ? "touchmove.gridster-draggable"
      : "mousemove.gridster-draggable",
    end: isTouch ? "touchend.gridster-draggable" : "mouseup.gridster-draggable",
  };

  /**
   * Basic drag implementation for DOM elements inside a container.
   * Provide start/stop/drag callbacks.
   *
   * @class Draggable
   * @param {HTMLElement} el The HTMLelement that contains all the panes
   *  to be dragged.
   * @param {Object} [options] An Object with all options you want to
   *        overwrite:
   *    @param {HTMLElement|String} [options.items] Define who will
   *     be the draggable items. Can be a CSS Selector String or a
   *     collection of HTMLElements.
   *    @param {Number} [options.distance] Distance in pixels after mousedown
   *     the mouse must move before dragging should start.
   *    @param {Boolean} [options.limit] Constrains dragging to the width of
   *     the container
   *    @param {offset_left} [options.offset_left] Offset added to the item
   *     that is being dragged.
   *    @param {Number} [options.drag] Executes a callback when the mouse is
   *     moved during the dragging.
   *    @param {Number} [options.start] Executes a callback when the drag
   *     starts.
   *    @param {Number} [options.stop] Executes a callback when the drag stops.
   * @return {Object} Returns `el`.
   * @constructor
   */
  function Draggable(el, options) {
    this.options = $.extend({}, defaults, options);
    this.$body = $(document.body);
    this.$container = $(el);
    this.$dragitems = $(this.options.items, this.$container);
    this.is_dragging = false;
    this.player_min_left = 0 + this.options.offset_left;
    this.init();
  }

  var fn = Draggable.prototype;

  fn.init = function () {
    this.calculate_positions();
    this.$container.css("position", "relative");
    this.disabled = false;
    this.events();

    $(window).bind(
      "resize.gridster-draggable",
      throttle($.proxy(this.calculate_positions, this), 200),
    );
  };

  fn.setOptions = function (options) {
    this.options = $.extend(this.options, options);
  };

  fn.events = function () {
    this.$container.on(
      "selectstart.gridster-draggable",
      $.proxy(this.on_select_start, this),
    );

    this.$container.on(
      pointer_events.start,
      this.options.items,
      $.proxy(this.drag_handler, this),
    );

    this.$body.on(
      pointer_events.end,
      $.proxy(function (e) {
        this.is_dragging = false;
        if (this.disabled) {
          return;
        }
        this.$body.off(pointer_events.move);
        if (this.drag_start) {
          this.on_dragstop(e);
        }
      }, this),
    );
  };

  fn.get_actual_pos = function ($el) {
    var pos = $el.position();
    return pos;
  };

  fn.get_mouse_pos = function (e) {
    if (isTouch) {
      var oe = e.originalEvent;
      e = oe.touches.length ? oe.touches[0] : oe.changedTouches[0];
    }

    return {
      left: e.clientX,
      top: e.clientY,
    };
  };

  fn.get_offset = function (e) {
    e.preventDefault();
    var mouse_actual_pos = this.get_mouse_pos(e);
    var diff_x = Math.round(mouse_actual_pos.left - this.mouse_init_pos.left);
    var diff_y = Math.round(mouse_actual_pos.top - this.mouse_init_pos.top);

    var left = Math.round(this.el_init_offset.left + diff_x - this.baseX);
    var top = Math.round(
      this.el_init_offset.top + diff_y - this.baseY + this.scrollOffset,
    );

    if (this.options.limit) {
      if (left > this.player_max_left) {
        left = this.player_max_left;
      } else if (left < this.player_min_left) {
        left = this.player_min_left;
      }
    }

    return {
      left: left,
      top: top,
      mouse_left: mouse_actual_pos.left,
      mouse_top: mouse_actual_pos.top,
    };
  };

  fn.manage_scroll = function (offset) {
    /* scroll document */
    var nextScrollTop;
    var scrollTop = $window.scrollTop();
    var min_window_y = scrollTop;
    var max_window_y = min_window_y + this.window_height;

    var mouse_down_zone = max_window_y - 50;
    var mouse_up_zone = min_window_y + 50;

    var abs_mouse_left = offset.mouse_left;
    var abs_mouse_top = min_window_y + offset.mouse_top;

    var max_player_y =
      this.doc_height - this.window_height + this.player_height;

    if (abs_mouse_top >= mouse_down_zone) {
      nextScrollTop = scrollTop + 30;
      if (nextScrollTop < max_player_y) {
        $window.scrollTop(nextScrollTop);
        this.scrollOffset = this.scrollOffset + 30;
      }
    }

    if (abs_mouse_top <= mouse_up_zone) {
      nextScrollTop = scrollTop - 30;
      if (nextScrollTop > 0) {
        $window.scrollTop(nextScrollTop);
        this.scrollOffset = this.scrollOffset - 30;
      }
    }
  };

  fn.calculate_positions = function (e) {
    this.window_height = $window.height();
  };

  fn.drag_handler = function (e) {
    var node = e.target.nodeName;
    if (this.disabled || (e.which !== 1 && !isTouch)) {
      return;
    }

    if (this.ignore_drag(e)) {
      return;
    }

    var self = this;
    var first = true;
    this.$player = $(e.currentTarget);

    this.el_init_pos = this.get_actual_pos(this.$player);
    this.mouse_init_pos = this.get_mouse_pos(e);
    this.offsetY = this.mouse_init_pos.top - this.el_init_pos.top;

    this.$body.on(pointer_events.move, function (mme) {
      var mouse_actual_pos = self.get_mouse_pos(mme);
      var diff_x = Math.abs(mouse_actual_pos.left - self.mouse_init_pos.left);
      var diff_y = Math.abs(mouse_actual_pos.top - self.mouse_init_pos.top);
      if (!(diff_x > self.options.distance || diff_y > self.options.distance)) {
        return false;
      }

      if (first) {
        first = false;
        self.on_dragstart.call(self, mme);
        return false;
      }

      if (self.is_dragging === true) {
        self.on_dragmove.call(self, mme);
      }

      return false;
    });

    if (!isTouch) {
      return false;
    }
  };

  fn.on_dragstart = function (e) {
    e.preventDefault();
    this.drag_start = true;
    this.is_dragging = true;
    var offset = this.$container.offset();
    this.baseX = Math.round(offset.left);
    this.baseY = Math.round(offset.top);
    this.doc_height = $(document).height();

    if (this.options.helper === "clone") {
      this.$helper = this.$player
        .clone()
        .appendTo(this.$container)
        .addClass("helper");
      this.helper = true;
    } else {
      this.helper = false;
    }
    this.scrollOffset = 0;
    this.el_init_offset = this.$player.offset();
    this.player_width = this.$player.width();
    this.player_height = this.$player.height();

    var container_width =
      this.options.container_width || this.$container.width();
    this.player_max_left =
      container_width - this.player_width + this.options.offset_left;

    if (this.options.start) {
      this.options.start.call(this.$player, e, {
        helper: this.helper ? this.$helper : this.$player,
      });
    }
    return false;
  };

  fn.on_dragmove = function (e) {
    var offset = this.get_offset(e);

    this.options.autoscroll && this.manage_scroll(offset);

    (this.helper ? this.$helper : this.$player).css({
      position: "absolute",
      left: offset.left,
      top: offset.top,
    });

    var ui = {
      position: {
        left: offset.left,
        top: offset.top,
      },
    };

    if (this.options.drag) {
      this.options.drag.call(this.$player, e, ui);
    }
    return false;
  };

  fn.on_dragstop = function (e) {
    var offset = this.get_offset(e);
    this.drag_start = false;

    var ui = {
      position: {
        left: offset.left,
        top: offset.top,
      },
    };

    if (this.options.stop) {
      this.options.stop.call(this.$player, e, ui);
    }

    if (this.helper) {
      this.$helper.remove();
    }

    return false;
  };

  fn.on_select_start = function (e) {
    if (this.disabled) {
      return;
    }

    if (this.ignore_drag(e)) {
      return;
    }

    return false;
  };

  fn.enable = function () {
    this.disabled = false;
  };

  fn.disable = function () {
    this.disabled = true;
  };

  fn.destroy = function () {
    this.disable();

    this.$container.off(".gridster-draggable");
    this.$body.off(".gridster-draggable");
    $(window).off(".gridster-draggable");

    $.removeData(this.$container, "drag");
  };

  fn.ignore_drag = function (event) {
    if (this.options.handle) {
      return !$(event.target).is(this.options.handle);
    }

    return $.inArray(event.target.nodeName, this.options.ignore_dragging) >= 0;
  };

  //jQuery adapter
  $.fn.drag = function (options) {
    return this.each(function () {
      if (!$.data(this, "drag")) {
        $.data(this, "drag", new Draggable(this, options));
      } else {
        $.data(this, "drag").setOptions(options);
      }
    });
  };
})(jQuery, window, document);

(function ($, window, document, undefined) {
  var defaults = {
    namespace: "",
    widget_selector: "li",
    widget_margins: [10, 10],
    widget_base_dimensions: [400, 225],
    extra_rows: 0,
    extra_cols: 0,
    min_cols: 1,
    max_cols: null,
    min_rows: 15,
    max_size_x: 6,
    autogenerate_stylesheet: true,
    avoid_overlapped_widgets: true,
    serialize_params: function ($w, wgd) {
      return {
        col: wgd.col,
        row: wgd.row,
        size_x: wgd.size_x,
        size_y: wgd.size_y,
      };
    },
    collision: {},
    draggable: {
      distance: 4,
    },
  };

  /**
   * @class Gridster
   * @uses Draggable
   * @uses Collision
   * @param {HTMLElement} el The HTMLelement that contains all the panes.
   * @param {Object} [options] An Object with all options you want to
   *        overwrite:
   *    @param {HTMLElement|String} [options.widget_selector] Define who will
   *     be the draggable panes. Can be a CSS Selector String or a
   *     collection of HTMLElements
   *    @param {Array} [options.widget_margins] Margin between panes.
   *     The first index for the horizontal margin (left, right) and
   *     the second for the vertical margin (top, bottom).
   *    @param {Array} [options.widget_base_dimensions] Base widget dimensions
   *     in pixels. The first index for the width and the second for the
   *     height.
   *    @param {Number} [options.extra_cols] Add more columns in addition to
   *     those that have been calculated.
   *    @param {Number} [options.extra_rows] Add more rows in addition to
   *     those that have been calculated.
   *    @param {Number} [options.min_cols] The minimum required columns.
   *    @param {Number} [options.max_cols] The maximum columns possible (set to null
   *     for no maximum).
   *    @param {Number} [options.min_rows] The minimum required rows.
   *    @param {Number} [options.max_size_x] The maximum number of columns
   *     that a widget can span.
   *    @param {Boolean} [options.autogenerate_stylesheet] If true, all the
   *     CSS required to position all panes in their respective columns
   *     and rows will be generated automatically and injected to the
   *     `<head>` of the document. You can set this to false, and write
   *     your own CSS targeting rows and cols via data-attributes like so:
   *     `[data-col="1"] { left: 10px; }`
   *    @param {Boolean} [options.avoid_overlapped_widgets] Avoid that panes loaded
   *     from the DOM can be overlapped. It is helpful if the positions were
   *     bad stored in the database or if there was any conflict.
   *    @param {Function} [options.serialize_params] Return the data you want
   *     for each widget in the serialization. Two arguments are passed:
   *     `$w`: the jQuery wrapped HTMLElement, and `wgd`: the grid
   *     coords object (`col`, `row`, `size_x`, `size_y`).
   *    @param {Object} [options.collision] An Object with all options for
   *     Collision class you want to overwrite. See Collision docs for
   *     more info.
   *    @param {Object} [options.draggable] An Object with all options for
   *     Draggable class you want to overwrite. See Draggable docs for more
   *     info.
   *
   * @constructor
   */
  function Gridster(el, options) {
    this.options = $.extend(true, defaults, options);
    this.$el = $(el);
    this.$wrapper = this.$el.parent();
    this.$widgets = this.$el
      .children(this.options.widget_selector)
      .addClass("gs_w");
    this.panes = [];
    this.$changed = $([]);
    this.wrapper_width = this.$wrapper.width();
    this.min_widget_width =
      this.options.widget_margins[0] * 2 +
      this.options.widget_base_dimensions[0];
    this.min_widget_height =
      this.options.widget_margins[1] * 2 +
      this.options.widget_base_dimensions[1];

    this.$style_tags = $([]);

    this.init();
  }

  Gridster.generated_stylesheets = [];

  var fn = Gridster.prototype;

  fn.init = function () {
    this.generate_grid_and_stylesheet();
    this.get_widgets_from_DOM();
    this.set_dom_grid_height();
    this.$wrapper.addClass("ready");
    this.draggable();

    $(window).bind(
      "resize.gridster",
      throttle($.proxy(this.recalculate_faux_grid, this), 200),
    );
  };

  /**
   * Disables dragging.
   *
   * @method disable
   * @return {Class} Returns the instance of the Gridster Class.
   */
  fn.disable = function () {
    this.$wrapper.find(".player-revert").removeClass("player-revert");
    this.drag_api.disable();
    return this;
  };

  /**
   * Enables dragging.
   *
   * @method enable
   * @return {Class} Returns the instance of the Gridster Class.
   */
  fn.enable = function () {
    this.drag_api.enable();
    return this;
  };

  /**
   * Add a new widget to the grid.
   *
   * @method add_widget
   * @param {String|HTMLElement} html The string representing the HTML of the widget
   *  or the HTMLElement.
   * @param {Number} [size_x] The nº of rows the widget occupies horizontally.
   * @param {Number} [size_y] The nº of columns the widget occupies vertically.
   * @param {Number} [col] The column the widget should start in.
   * @param {Number} [row] The row the widget should start in.
   * @return {HTMLElement} Returns the jQuery wrapped HTMLElement representing.
   *  the widget that was just created.
   */
  fn.add_widget = function (html, size_x, size_y, col, row) {
    var pos;
    size_x || (size_x = 1);
    size_y || (size_y = 1);

    if (!col & !row) {
      pos = this.next_position(size_x, size_y);
    } else {
      pos = {
        col: col,
        row: row,
      };

      this.empty_cells(col, row, size_x, size_y);
    }

    var $w = $(html)
      .attr({
        "data-col": pos.col,
        "data-row": pos.row,
        "data-sizex": size_x,
        "data-sizey": size_y,
      })
      .addClass("gs_w")
      .appendTo(this.$el)
      .hide();

    this.$widgets = this.$widgets.add($w);

    this.register_widget($w);

    this.add_faux_rows(pos.size_y);
    //this.add_faux_cols(pos.size_x);

    this.set_dom_grid_height();

    return $w.fadeIn();
  };

  /**
   * Change the size of a widget.
   *
   * @method resize_widget
   * @param {HTMLElement} $widget The jQuery wrapped HTMLElement
   *  representing the widget.
   * @param {Number} size_x The number of columns that will occupy the widget.
   * @param {Number} size_y The number of rows that will occupy the widget.
   * @param {Function} callback Function executed when the widget is removed.
   * @return {HTMLElement} Returns $widget.
   */
  fn.resize_widget = function ($widget, size_x, size_y, callback) {
    var wgd = $widget.coords().grid;
    size_x || (size_x = wgd.size_x);
    size_y || (size_y = wgd.size_y);

    if (size_x > this.cols) {
      size_x = this.cols;
    }

    var old_cells_occupied = this.get_cells_occupied(wgd);
    var old_size_x = wgd.size_x;
    var old_size_y = wgd.size_y;
    var old_col = wgd.col;
    var new_col = old_col;
    var wider = size_x > old_size_x;
    var taller = size_y > old_size_y;

    if (old_col + size_x - 1 > this.cols) {
      var diff = old_col + (size_x - 1) - this.cols;
      var c = old_col - diff;
      new_col = Math.max(1, c);
    }

    var new_grid_data = {
      col: new_col,
      row: wgd.row,
      size_x: size_x,
      size_y: size_y,
    };

    var new_cells_occupied = this.get_cells_occupied(new_grid_data);

    var empty_cols = [];
    $.each(old_cells_occupied.cols, function (i, col) {
      if ($.inArray(col, new_cells_occupied.cols) === -1) {
        empty_cols.push(col);
      }
    });

    var occupied_cols = [];
    $.each(new_cells_occupied.cols, function (i, col) {
      if ($.inArray(col, old_cells_occupied.cols) === -1) {
        occupied_cols.push(col);
      }
    });

    var empty_rows = [];
    $.each(old_cells_occupied.rows, function (i, row) {
      if ($.inArray(row, new_cells_occupied.rows) === -1) {
        empty_rows.push(row);
      }
    });

    var occupied_rows = [];
    $.each(new_cells_occupied.rows, function (i, row) {
      if ($.inArray(row, old_cells_occupied.rows) === -1) {
        occupied_rows.push(row);
      }
    });

    this.remove_from_gridmap(wgd);

    if (occupied_cols.length) {
      var cols_to_empty = [
        new_col,
        wgd.row,
        size_x,
        Math.min(old_size_y, size_y),
        $widget,
      ];
      this.empty_cells.apply(this, cols_to_empty);
    }

    if (occupied_rows.length) {
      var rows_to_empty = [new_col, wgd.row, size_x, size_y, $widget];
      this.empty_cells.apply(this, rows_to_empty);
    }

    wgd.col = new_col;
    wgd.size_x = size_x;
    wgd.size_y = size_y;
    this.add_to_gridmap(new_grid_data, $widget);

    //update coords instance attributes
    $widget.data("coords").update({
      width:
        size_x * this.options.widget_base_dimensions[0] +
        (size_x - 1) * this.options.widget_margins[0] * 2,
      height:
        size_y * this.options.widget_base_dimensions[1] +
        (size_y - 1) * this.options.widget_margins[1] * 2,
    });

    if (size_y > old_size_y) {
      this.add_faux_rows(size_y - old_size_y);
    }

    if (size_x > old_size_x) {
      this.add_faux_cols(size_x - old_size_x);
    }

    $widget.attr({
      "data-col": new_col,
      "data-sizex": size_x,
      "data-sizey": size_y,
    });

    if (empty_cols.length) {
      var cols_to_remove_holes = [
        empty_cols[0],
        wgd.row,
        empty_cols.length,
        Math.min(old_size_y, size_y),
        $widget,
      ];

      this.remove_empty_cells.apply(this, cols_to_remove_holes);
    }

    if (empty_rows.length) {
      var rows_to_remove_holes = [new_col, wgd.row, size_x, size_y, $widget];
      this.remove_empty_cells.apply(this, rows_to_remove_holes);
    }

    if (callback) {
      callback.call(this, size_x, size_y);
    }

    return $widget;
  };

  /**
   * Move down panes in cells represented by the arguments col, row, size_x,
   * size_y
   *
   * @method empty_cells
   * @param {Number} col The column where the group of cells begin.
   * @param {Number} row The row where the group of cells begin.
   * @param {Number} size_x The number of columns that the group of cells
   * occupy.
   * @param {Number} size_y The number of rows that the group of cells
   * occupy.
   * @param {HTMLElement} $exclude Exclude panes from being moved.
   * @return {Class} Returns the instance of the Gridster Class.
   */
  fn.empty_cells = function (col, row, size_x, size_y, $exclude) {
    var $nexts = this.widgets_below({
      col: col,
      row: row - size_y,
      size_x: size_x,
      size_y: size_y,
    });

    $nexts.not($exclude).each(
      $.proxy(function (i, w) {
        var wgd = $(w).coords().grid;
        if (!(wgd.row <= row + size_y - 1)) {
          return;
        }
        var diff = row + size_y - wgd.row;
        this.move_widget_down($(w), diff);
      }, this),
    );

    this.set_dom_grid_height();

    return this;
  };

  /**
   * Move up panes below cells represented by the arguments col, row, size_x,
   * size_y.
   *
   * @method remove_empty_cells
   * @param {Number} col The column where the group of cells begin.
   * @param {Number} row The row where the group of cells begin.
   * @param {Number} size_x The number of columns that the group of cells
   * occupy.
   * @param {Number} size_y The number of rows that the group of cells
   * occupy.
   * @param {HTMLElement} exclude Exclude panes from being moved.
   * @return {Class} Returns the instance of the Gridster Class.
   */
  fn.remove_empty_cells = function (col, row, size_x, size_y, exclude) {
    var $nexts = this.widgets_below({
      col: col,
      row: row,
      size_x: size_x,
      size_y: size_y,
    });

    $nexts.not(exclude).each(
      $.proxy(function (i, widget) {
        this.move_widget_up($(widget), size_y);
      }, this),
    );

    this.set_dom_grid_height();

    return this;
  };

  /**
   * Get the most left column below to add a new widget.
   *
   * @method next_position
   * @param {Number} size_x The nº of rows the widget occupies horizontally.
   * @param {Number} size_y The nº of columns the widget occupies vertically.
   * @return {Object} Returns a grid coords object representing the future
   *  widget coords.
   */
  fn.next_position = function (size_x, size_y) {
    size_x || (size_x = 1);
    size_y || (size_y = 1);
    var ga = this.gridmap;
    var cols_l = ga.length;
    var valid_pos = [];
    var rows_l;

    for (var c = 1; c < cols_l; c++) {
      rows_l = ga[c].length;
      for (var r = 1; r <= rows_l; r++) {
        var can_move_to = this.can_move_to(
          {
            size_x: size_x,
            size_y: size_y,
          },
          c,
          r,
        );

        if (can_move_to) {
          valid_pos.push({
            col: c,
            row: r,
            size_y: size_y,
            size_x: size_x,
          });
        }
      }
    }

    if (valid_pos.length) {
      return this.sort_by_row_and_col_asc(valid_pos)[0];
    }
    return false;
  };

  /**
   * Remove a widget from the grid.
   *
   * @method remove_widget
   * @param {HTMLElement} el The jQuery wrapped HTMLElement you want to remove.
   * @param {Boolean|Function} silent If true, panes below the removed one
   * will not move up. If a Function is passed it will be used as callback.
   * @param {Function} callback Function executed when the widget is removed.
   * @return {Class} Returns the instance of the Gridster Class.
   */
  fn.remove_widget = function (el, silent, callback) {
    var $el = el instanceof jQuery ? el : $(el);
    var wgd = $el.coords().grid;

    // if silent is a function assume it's a callback
    if ($.isFunction(silent)) {
      callback = silent;
      silent = false;
    }

    this.cells_occupied_by_placeholder = {};
    this.$widgets = this.$widgets.not($el);

    var $nexts = this.widgets_below($el);

    this.remove_from_gridmap(wgd);

    $el.fadeOut(
      $.proxy(function () {
        $el.remove();

        if (!silent) {
          $nexts.each(
            $.proxy(function (i, widget) {
              this.move_widget_up($(widget), wgd.size_y);
            }, this),
          );
        }

        this.set_dom_grid_height();

        if (callback) {
          callback.call(this, el);
        }
      }, this),
    );
  };

  /**
   * Remove all panes from the grid.
   *
   * @method remove_all_widgets
   * @param {Function} callback Function executed for each widget removed.
   * @return {Class} Returns the instance of the Gridster Class.
   */
  fn.remove_all_widgets = function (callback) {
    this.$widgets.each(
      $.proxy(function (i, el) {
        this.remove_widget(el, true, callback);
      }, this),
    );

    return this;
  };

  /**
   * Returns a serialized array of the panes in the grid.
   *
   * @method serialize
   * @param {HTMLElement} [$widgets] The collection of jQuery wrapped
   *  HTMLElements you want to serialize. If no argument is passed all panes
   *  will be serialized.
   * @return {Array} Returns an Array of Objects with the data specified in
   *  the serialize_params option.
   */
  fn.serialize = function ($widgets) {
    $widgets || ($widgets = this.$widgets);
    var result = [];
    $widgets.each(
      $.proxy(function (i, widget) {
        result.push(
          this.options.serialize_params($(widget), $(widget).coords().grid),
        );
      }, this),
    );

    return result;
  };

  /**
   * Returns a serialized array of the panes that have changed their
   *  position.
   *
   * @method serialize_changed
   * @return {Array} Returns an Array of Objects with the data specified in
   *  the serialize_params option.
   */
  fn.serialize_changed = function () {
    return this.serialize(this.$changed);
  };

  /**
   * Creates the grid coords object representing the widget a add it to the
   * mapped array of positions.
   *
   * @method register_widget
   * @return {Array} Returns the instance of the Gridster class.
   */
  fn.register_widget = function ($el) {
    var wgd = {
      col: parseInt($el.attr("data-col"), 10),
      row: parseInt($el.attr("data-row"), 10),
      size_x: parseInt($el.attr("data-sizex"), 10),
      size_y: parseInt($el.attr("data-sizey"), 10),
      el: $el,
    };

    if (
      this.options.avoid_overlapped_widgets &&
      !this.can_move_to(
        { size_x: wgd.size_x, size_y: wgd.size_y },
        wgd.col,
        wgd.row,
      )
    ) {
      wgd = this.next_position(wgd.size_x, wgd.size_y);
      wgd.el = $el;
      $el.attr({
        "data-col": wgd.col,
        "data-row": wgd.row,
        "data-sizex": wgd.size_x,
        "data-sizey": wgd.size_y,
      });
    }

    // attach Coord object to player data-coord attribute
    $el.data("coords", $el.coords());

    // Extend Coord object with grid position info
    $el.data("coords").grid = wgd;

    this.add_to_gridmap(wgd, $el);

    return this;
  };

  /**
   * Update in the mapped array of positions the value of cells represented by
   * the grid coords object passed in the `grid_data` param.
   *
   * @param {Object} grid_data The grid coords object representing the cells
   *  to update in the mapped array.
   * @param {HTMLElement|Boolean} value Pass `false` or the jQuery wrapped
   *  HTMLElement, depends if you want to delete an existing position or add
   *  a new one.
   * @method update_widget_position
   * @return {Class} Returns the instance of the Gridster Class.
   */
  fn.update_widget_position = function (grid_data, value) {
    this.for_each_cell_occupied(grid_data, function (col, row) {
      if (!this.gridmap[col]) {
        return this;
      }
      this.gridmap[col][row] = value;
    });
    return this;
  };

  /**
   * Remove a widget from the mapped array of positions.
   *
   * @method remove_from_gridmap
   * @param {Object} grid_data The grid coords object representing the cells
   *  to update in the mapped array.
   * @return {Class} Returns the instance of the Gridster Class.
   */
  fn.remove_from_gridmap = function (grid_data) {
    return this.update_widget_position(grid_data, false);
  };

  /**
   * Add a widget to the mapped array of positions.
   *
   * @method add_to_gridmap
   * @param {Object} grid_data The grid coords object representing the cells
   *  to update in the mapped array.
   * @param {HTMLElement|Boolean} value The value to set in the specified
   *  position .
   * @return {Class} Returns the instance of the Gridster Class.
   */
  fn.add_to_gridmap = function (grid_data, value) {
    this.update_widget_position(grid_data, value || grid_data.el);

    if (grid_data.el) {
      var $widgets = this.widgets_below(grid_data.el);
      $widgets.each(
        $.proxy(function (i, widget) {
          this.move_widget_up($(widget));
        }, this),
      );
    }
  };

  /**
   * Make panes draggable.
   *
   * @uses Draggable
   * @method draggable
   * @return {Class} Returns the instance of the Gridster Class.
   */
  fn.draggable = function () {
    var self = this;
    var draggable_options = $.extend(true, {}, this.options.draggable, {
      offset_left: this.options.widget_margins[0],
      container_width: this.container_width,
      start: function (event, ui) {
        self.$widgets.filter(".player-revert").removeClass("player-revert");

        self.$player = $(this);
        self.$helper =
          self.options.draggable.helper === "clone"
            ? $(ui.helper)
            : self.$player;
        self.helper = !self.$helper.is(self.$player);

        self.on_start_drag.call(self, event, ui);
        self.$el.trigger("gridster:dragstart");
      },
      stop: function (event, ui) {
        self.on_stop_drag.call(self, event, ui);
        self.$el.trigger("gridster:dragstop");
      },
      drag: throttle(function (event, ui) {
        self.on_drag.call(self, event, ui);
        self.$el.trigger("gridster:drag");
      }, 60),
    });

    this.drag_api = this.$el.drag(draggable_options).data("drag");
    return this;
  };

  /**
   * This function is executed when the player begins to be dragged.
   *
   * @method on_start_drag
   * @param {Event} event The original browser event
   * @param {Object} ui A prepared ui object.
   */
  fn.on_start_drag = function (event, ui) {
    this.$helper.add(this.$player).add(this.$wrapper).addClass("dragging");

    this.$player.addClass("player");
    this.player_grid_data = this.$player.coords().grid;
    this.placeholder_grid_data = $.extend({}, this.player_grid_data);

    //set new grid height along the dragging period
    this.$el.css(
      "height",
      this.$el.height() + this.player_grid_data.size_y * this.min_widget_height,
    );

    var colliders = this.faux_grid;
    var coords = this.$player.data("coords").coords;

    this.cells_occupied_by_player = this.get_cells_occupied(
      this.player_grid_data,
    );
    this.cells_occupied_by_placeholder = this.get_cells_occupied(
      this.placeholder_grid_data,
    );

    this.last_cols = [];
    this.last_rows = [];

    // see jquery.collision.js
    this.collision_api = this.$helper.collision(
      colliders,
      this.options.collision,
    );

    this.$preview_holder = $("<li />", {
      class: "preview-holder",
      "data-row": this.$player.attr("data-row"),
      "data-col": this.$player.attr("data-col"),
      css: {
        width: coords.width,
        height: coords.height,
      },
    }).appendTo(this.$el);

    if (this.options.draggable.start) {
      this.options.draggable.start.call(this, event, ui);
    }
  };

  /**
   * This function is executed when the player is being dragged.
   *
   * @method on_drag
   * @param {Event} event The original browser event
   * @param {Object} ui A prepared ui object.
   */
  fn.on_drag = function (event, ui) {
    //break if dragstop has been fired
    if (this.$player === null) {
      return false;
    }

    var abs_offset = {
      left: ui.position.left + this.baseX,
      top: ui.position.top + this.baseY,
    };

    this.colliders_data = this.collision_api.get_closest_colliders(abs_offset);

    this.on_overlapped_column_change(
      this.on_start_overlapping_column,
      this.on_stop_overlapping_column,
    );

    this.on_overlapped_row_change(
      this.on_start_overlapping_row,
      this.on_stop_overlapping_row,
    );

    if (this.helper && this.$player) {
      this.$player.css({
        left: ui.position.left,
        top: ui.position.top,
      });
    }

    if (this.options.draggable.drag) {
      this.options.draggable.drag.call(this, event, ui);
    }
  };

  /**
   * This function is executed when the player stops being dragged.
   *
   * @method on_stop_drag
   * @param {Event} event The original browser event
   * @param {Object} ui A prepared ui object.
   */
  fn.on_stop_drag = function (event, ui) {
    this.$helper.add(this.$player).add(this.$wrapper).removeClass("dragging");

    ui.position.left = ui.position.left + this.baseX;
    ui.position.top = ui.position.top + this.baseY;
    this.colliders_data = this.collision_api.get_closest_colliders(ui.position);

    this.on_overlapped_column_change(
      this.on_start_overlapping_column,
      this.on_stop_overlapping_column,
    );

    this.on_overlapped_row_change(
      this.on_start_overlapping_row,
      this.on_stop_overlapping_row,
    );

    this.$player
      .addClass("player-revert")
      .removeClass("player")
      .attr({
        "data-col": this.placeholder_grid_data.col,
        "data-row": this.placeholder_grid_data.row,
      })
      .css({
        left: "",
        top: "",
      });

    this.$changed = this.$changed.add(this.$player);

    this.cells_occupied_by_player = this.get_cells_occupied(
      this.placeholder_grid_data,
    );
    this.set_cells_player_occupies(
      this.placeholder_grid_data.col,
      this.placeholder_grid_data.row,
    );

    this.$player.coords().grid.row = this.placeholder_grid_data.row;
    this.$player.coords().grid.col = this.placeholder_grid_data.col;

    if (this.options.draggable.stop) {
      this.options.draggable.stop.call(this, event, ui);
    }

    this.$preview_holder.remove();

    this.$player = null;
    this.$helper = null;
    this.placeholder_grid_data = {};
    this.player_grid_data = {};
    this.cells_occupied_by_placeholder = {};
    this.cells_occupied_by_player = {};

    this.set_dom_grid_height();
  };

  /**
   * Executes the callbacks passed as arguments when a column begins to be
   * overlapped or stops being overlapped.
   *
   * @param {Function} start_callback Function executed when a new column
   *  begins to be overlapped. The column is passed as first argument.
   * @param {Function} stop_callback Function executed when a column stops
   *  being overlapped. The column is passed as first argument.
   * @method on_overlapped_column_change
   * @return {Class} Returns the instance of the Gridster Class.
   */
  fn.on_overlapped_column_change = function (start_callback, stop_callback) {
    if (!this.colliders_data.length) {
      return this;
    }
    var cols = this.get_targeted_columns(this.colliders_data[0].el.data.col);

    var last_n_cols = this.last_cols.length;
    var n_cols = cols.length;
    var i;

    for (i = 0; i < n_cols; i++) {
      if ($.inArray(cols[i], this.last_cols) === -1) {
        (start_callback || $.noop).call(this, cols[i]);
      }
    }

    for (i = 0; i < last_n_cols; i++) {
      if ($.inArray(this.last_cols[i], cols) === -1) {
        (stop_callback || $.noop).call(this, this.last_cols[i]);
      }
    }

    this.last_cols = cols;

    return this;
  };

  /**
   * Executes the callbacks passed as arguments when a row starts to be
   * overlapped or stops being overlapped.
   *
   * @param {Function} start_callback Function executed when a new row begins
   *  to be overlapped. The row is passed as first argument.
   * @param {Function} end_callback Function executed when a row stops being
   *  overlapped. The row is passed as first argument.
   * @method on_overlapped_row_change
   * @return {Class} Returns the instance of the Gridster Class.
   */
  fn.on_overlapped_row_change = function (start_callback, end_callback) {
    if (!this.colliders_data.length) {
      return this;
    }
    var rows = this.get_targeted_rows(this.colliders_data[0].el.data.row);
    var last_n_rows = this.last_rows.length;
    var n_rows = rows.length;
    var i;

    for (i = 0; i < n_rows; i++) {
      if ($.inArray(rows[i], this.last_rows) === -1) {
        (start_callback || $.noop).call(this, rows[i]);
      }
    }

    for (i = 0; i < last_n_rows; i++) {
      if ($.inArray(this.last_rows[i], rows) === -1) {
        (end_callback || $.noop).call(this, this.last_rows[i]);
      }
    }

    this.last_rows = rows;
  };

  /**
   * Sets the current position of the player
   *
   * @param {Number} col
   * @param {Number} row
   * @param {Boolean} no_player
   * @method set_player
   * @return {object}
   */
  fn.set_player = function (col, row, no_player) {
    var self = this;
    if (!no_player) {
      this.empty_cells_player_occupies();
    }
    var cell = !no_player ? self.colliders_data[0].el.data : { col: col };
    var to_col = cell.col;
    var to_row = row || cell.row;

    this.player_grid_data = {
      col: to_col,
      row: to_row,
      size_y: this.player_grid_data.size_y,
      size_x: this.player_grid_data.size_x,
    };

    this.cells_occupied_by_player = this.get_cells_occupied(
      this.player_grid_data,
    );

    var $overlapped_widgets = this.get_widgets_overlapped(
      this.player_grid_data,
    );

    var constraints = this.widgets_constraints($overlapped_widgets);

    this.manage_movements(constraints.can_go_up, to_col, to_row);
    this.manage_movements(constraints.can_not_go_up, to_col, to_row);

    /* if there is not panes overlapping in the new player position,
     * update the new placeholder position. */
    if (!$overlapped_widgets.length) {
      var pp = this.can_go_player_up(this.player_grid_data);
      if (pp !== false) {
        to_row = pp;
      }
      this.set_placeholder(to_col, to_row);
    }

    return {
      col: to_col,
      row: to_row,
    };
  };

  /**
   * See which of the panes in the $panes param collection can go to
   * a upper row and which not.
   *
   * @method widgets_contraints
   * @param {jQuery} $widgets A jQuery wrapped collection of
   * HTMLElements.
   * @return {object} Returns a literal Object with two keys: `can_go_up` &
   * `can_not_go_up`. Each contains a set of HTMLElements.
   */
  fn.widgets_constraints = function ($widgets) {
    var $widgets_can_go_up = $([]);
    var $widgets_can_not_go_up;
    var wgd_can_go_up = [];
    var wgd_can_not_go_up = [];

    $widgets.each(
      $.proxy(function (i, w) {
        var $w = $(w);
        var wgd = $w.coords().grid;
        if (this.can_go_widget_up(wgd)) {
          $widgets_can_go_up = $widgets_can_go_up.add($w);
          wgd_can_go_up.push(wgd);
        } else {
          wgd_can_not_go_up.push(wgd);
        }
      }, this),
    );

    $widgets_can_not_go_up = $widgets.not($widgets_can_go_up);

    return {
      can_go_up: this.sort_by_row_asc(wgd_can_go_up),
      can_not_go_up: this.sort_by_row_desc(wgd_can_not_go_up),
    };
  };

  /**
   * Sorts an Array of grid coords objects (representing the grid coords of
   * each widget) in ascending way.
   *
   * @method sort_by_row_asc
   * @param {Array} widgets Array of grid coords objects
   * @return {Array} Returns the array sorted.
   */
  fn.sort_by_row_asc = function (widgets) {
    widgets = widgets.sort(function (a, b) {
      if (!a.row) {
        a = $(a).coords().grid;
        b = $(b).coords().grid;
      }

      if (a.row > b.row) {
        return 1;
      }
      return -1;
    });

    return widgets;
  };

  /**
   * Sorts an Array of grid coords objects (representing the grid coords of
   * each widget) placing first the empty cells upper left.
   *
   * @method sort_by_row_and_col_asc
   * @param {Array} widgets Array of grid coords objects
   * @return {Array} Returns the array sorted.
   */
  fn.sort_by_row_and_col_asc = function (widgets) {
    widgets = widgets.sort(function (a, b) {
      if (a.row > b.row || (a.row === b.row && a.col > b.col)) {
        return 1;
      }
      return -1;
    });

    return widgets;
  };

  /**
   * Sorts an Array of grid coords objects by column (representing the grid
   * coords of each widget) in ascending way.
   *
   * @method sort_by_col_asc
   * @param {Array} widgets Array of grid coords objects
   * @return {Array} Returns the array sorted.
   */
  fn.sort_by_col_asc = function (widgets) {
    widgets = widgets.sort(function (a, b) {
      if (a.col > b.col) {
        return 1;
      }
      return -1;
    });

    return widgets;
  };

  /**
   * Sorts an Array of grid coords objects (representing the grid coords of
   * each widget) in descending way.
   *
   * @method sort_by_row_desc
   * @param {Array} widgets Array of grid coords objects
   * @return {Array} Returns the array sorted.
   */
  fn.sort_by_row_desc = function (widgets) {
    widgets = widgets.sort(function (a, b) {
      if (a.row + a.size_y < b.row + b.size_y) {
        return 1;
      }
      return -1;
    });
    return widgets;
  };

  /**
   * Sorts an Array of grid coords objects (representing the grid coords of
   * each widget) in descending way.
   *
   * @method manage_movements
   * @param {jQuery} $widgets A jQuery collection of HTMLElements
   *  representing the panes you want to move.
   * @param {Number} to_col The column to which we want to move the panes.
   * @param {Number} to_row The row to which we want to move the panes.
   * @return {Class} Returns the instance of the Gridster Class.
   */
  fn.manage_movements = function ($widgets, to_col, to_row) {
    $.each(
      $widgets,
      $.proxy(function (i, w) {
        var wgd = w;
        var $w = wgd.el;

        var can_go_widget_up = this.can_go_widget_up(wgd);

        if (can_go_widget_up) {
          //target CAN go up
          //so move widget up
          this.move_widget_to($w, can_go_widget_up);
          this.set_placeholder(to_col, can_go_widget_up + wgd.size_y);
        } else {
          //target can't go up
          var can_go_player_up = this.can_go_player_up(this.player_grid_data);

          if (!can_go_player_up) {
            // target can't go up
            // player cant't go up
            // so we need to move widget down to a position that dont
            // overlaps player
            var y = to_row + this.player_grid_data.size_y - wgd.row;

            this.move_widget_down($w, y);
            this.set_placeholder(to_col, to_row);
          }
        }
      }, this),
    );

    return this;
  };

  /**
   * Determines if there is a widget in the row and col given. Or if the
   * HTMLElement passed as first argument is the player.
   *
   * @method is_player
   * @param {Number|HTMLElement} col_or_el A jQuery wrapped collection of
   * HTMLElements.
   * @param {Number} [row] The column to which we want to move the panes.
   * @return {Boolean} Returns true or false.
   */
  fn.is_player = function (col_or_el, row) {
    if (row && !this.gridmap[col_or_el]) {
      return false;
    }
    var $w = row ? this.gridmap[col_or_el][row] : col_or_el;
    return $w && ($w.is(this.$player) || $w.is(this.$helper));
  };

  /**
   * Determines if the widget that is being dragged is currently over the row
   * and col given.
   *
   * @method is_player_in
   * @param {Number} col The column to check.
   * @param {Number} row The row to check.
   * @return {Boolean} Returns true or false.
   */
  fn.is_player_in = function (col, row) {
    var c = this.cells_occupied_by_player || {};
    return $.inArray(col, c.cols) >= 0 && $.inArray(row, c.rows) >= 0;
  };

  /**
   * Determines if the placeholder is currently over the row and col given.
   *
   * @method is_placeholder_in
   * @param {Number} col The column to check.
   * @param {Number} row The row to check.
   * @return {Boolean} Returns true or false.
   */
  fn.is_placeholder_in = function (col, row) {
    var c = this.cells_occupied_by_placeholder || {};
    return this.is_placeholder_in_col(col) && $.inArray(row, c.rows) >= 0;
  };

  /**
   * Determines if the placeholder is currently over the column given.
   *
   * @method is_placeholder_in_col
   * @param {Number} col The column to check.
   * @return {Boolean} Returns true or false.
   */
  fn.is_placeholder_in_col = function (col) {
    var c = this.cells_occupied_by_placeholder || [];
    return $.inArray(col, c.cols) >= 0;
  };

  /**
   * Determines if the cell represented by col and row params is empty.
   *
   * @method is_empty
   * @param {Number} col The column to check.
   * @param {Number} row The row to check.
   * @return {Boolean} Returns true or false.
   */
  fn.is_empty = function (col, row) {
    if (typeof this.gridmap[col] !== "undefined") {
      if (
        typeof this.gridmap[col][row] !== "undefined" &&
        this.gridmap[col][row] === false
      ) {
        return true;
      }
      return false;
    }
    return true;
  };

  /**
   * Determines if the cell represented by col and row params is occupied.
   *
   * @method is_occupied
   * @param {Number} col The column to check.
   * @param {Number} row The row to check.
   * @return {Boolean} Returns true or false.
   */
  fn.is_occupied = function (col, row) {
    if (!this.gridmap[col]) {
      return false;
    }

    if (this.gridmap[col][row]) {
      return true;
    }
    return false;
  };

  /**
   * Determines if there is a widget in the cell represented by col/row params.
   *
   * @method is_widget
   * @param {Number} col The column to check.
   * @param {Number} row The row to check.
   * @return {Boolean|HTMLElement} Returns false if there is no widget,
   * else returns the jQuery HTMLElement
   */
  fn.is_widget = function (col, row) {
    var cell = this.gridmap[col];
    if (!cell) {
      return false;
    }

    cell = cell[row];

    if (cell) {
      return cell;
    }

    return false;
  };

  /**
   * Determines if there is a widget in the cell represented by col/row
   * params and if this is under the widget that is being dragged.
   *
   * @method is_widget_under_player
   * @param {Number} col The column to check.
   * @param {Number} row The row to check.
   * @return {Boolean} Returns true or false.
   */
  fn.is_widget_under_player = function (col, row) {
    if (this.is_widget(col, row)) {
      return this.is_player_in(col, row);
    }
    return false;
  };

  /**
   * Get panes overlapping with the player or with the object passed
   * representing the grid cells.
   *
   * @method get_widgets_under_player
   * @return {HTMLElement} Returns a jQuery collection of HTMLElements
   */
  fn.get_widgets_under_player = function (cells) {
    cells || (cells = this.cells_occupied_by_player || { cols: [], rows: [] });
    var $widgets = $([]);

    $.each(
      cells.cols,
      $.proxy(function (i, col) {
        $.each(
          cells.rows,
          $.proxy(function (i, row) {
            if (this.is_widget(col, row)) {
              $widgets = $widgets.add(this.gridmap[col][row]);
            }
          }, this),
        );
      }, this),
    );

    return $widgets;
  };

  /**
   * Put placeholder at the row and column specified.
   *
   * @method set_placeholder
   * @param {Number} col The column to which we want to move the
   *  placeholder.
   * @param {Number} row The row to which we want to move the
   *  placeholder.
   * @return {Class} Returns the instance of the Gridster Class.
   */
  fn.set_placeholder = function (col, row) {
    var phgd = $.extend({}, this.placeholder_grid_data);
    var $nexts = this.widgets_below({
      col: phgd.col,
      row: phgd.row,
      size_y: phgd.size_y,
      size_x: phgd.size_x,
    });

    // Prevents panes go out of the grid
    var right_col = col + phgd.size_x - 1;
    if (right_col > this.cols) {
      col = col - (right_col - col);
    }

    var moved_down = this.placeholder_grid_data.row < row;
    var changed_column = this.placeholder_grid_data.col !== col;

    this.placeholder_grid_data.col = col;
    this.placeholder_grid_data.row = row;

    this.cells_occupied_by_placeholder = this.get_cells_occupied(
      this.placeholder_grid_data,
    );

    this.$preview_holder.attr({
      "data-row": row,
      "data-col": col,
    });

    if (moved_down || changed_column) {
      $nexts.each(
        $.proxy(function (i, widget) {
          this.move_widget_up(
            $(widget),
            this.placeholder_grid_data.col - col + phgd.size_y,
          );
        }, this),
      );
    }

    var $widgets_under_ph = this.get_widgets_under_player(
      this.cells_occupied_by_placeholder,
    );
    if ($widgets_under_ph.length) {
      $widgets_under_ph.each(
        $.proxy(function (i, widget) {
          var $w = $(widget);
          this.move_widget_down(
            $w,
            row + phgd.size_y - $w.data("coords").grid.row,
          );
        }, this),
      );
    }
  };

  /**
   * Determines whether the player can move to a position above.
   *
   * @method can_go_player_up
   * @param {Object} widget_grid_data The actual grid coords object of the
   *  player.
   * @return {Number|Boolean} If the player can be moved to an upper row
   *  returns the row number, else returns false.
   */
  fn.can_go_player_up = function (widget_grid_data) {
    var p_bottom_row = widget_grid_data.row + widget_grid_data.size_y - 1;
    var result = true;
    var upper_rows = [];
    var min_row = 10000;
    var $widgets_under_player = this.get_widgets_under_player();

    /* generate an array with columns as index and array with upper rows
     * empty as value */
    this.for_each_column_occupied(widget_grid_data, function (tcol) {
      var grid_col = this.gridmap[tcol];
      var r = p_bottom_row + 1;
      upper_rows[tcol] = [];

      while (--r > 0) {
        if (
          this.is_empty(tcol, r) ||
          this.is_player(tcol, r) ||
          (this.is_widget(tcol, r) && grid_col[r].is($widgets_under_player))
        ) {
          upper_rows[tcol].push(r);
          min_row = r < min_row ? r : min_row;
        } else {
          break;
        }
      }

      if (upper_rows[tcol].length === 0) {
        result = false;
        return true; //break
      }

      upper_rows[tcol].sort(function (a, b) {
        return a - b;
      });
    });

    if (!result) {
      return false;
    }

    return this.get_valid_rows(widget_grid_data, upper_rows, min_row);
  };

  /**
   * Determines whether a widget can move to a position above.
   *
   * @method can_go_widget_up
   * @param {Object} widget_grid_data The actual grid coords object of the
   *  widget we want to check.
   * @return {Number|Boolean} If the widget can be moved to an upper row
   *  returns the row number, else returns false.
   */
  fn.can_go_widget_up = function (widget_grid_data) {
    var p_bottom_row = widget_grid_data.row + widget_grid_data.size_y - 1;
    var result = true;
    var upper_rows = [];
    var min_row = 10000;

    /* generate an array with columns as index and array with topmost rows
     * empty as value */
    this.for_each_column_occupied(widget_grid_data, function (tcol) {
      var grid_col = this.gridmap[tcol];
      upper_rows[tcol] = [];

      var r = p_bottom_row + 1;
      // iterate over each row
      while (--r > 0) {
        if (this.is_widget(tcol, r) && !this.is_player_in(tcol, r)) {
          if (!grid_col[r].is(widget_grid_data.el)) {
            break;
          }
        }

        if (
          !this.is_player(tcol, r) &&
          !this.is_placeholder_in(tcol, r) &&
          !this.is_player_in(tcol, r)
        ) {
          upper_rows[tcol].push(r);
        }

        if (r < min_row) {
          min_row = r;
        }
      }

      if (upper_rows[tcol].length === 0) {
        result = false;
        return true; //break
      }

      upper_rows[tcol].sort(function (a, b) {
        return a - b;
      });
    });

    if (!result) {
      return false;
    }

    return this.get_valid_rows(widget_grid_data, upper_rows, min_row);
  };

  /**
   * Search a valid row for the widget represented by `widget_grid_data' in
   * the `upper_rows` array. Iteration starts from row specified in `min_row`.
   *
   * @method get_valid_rows
   * @param {Object} widget_grid_data The actual grid coords object of the
   *  player.
   * @param {Array} upper_rows An array with columns as index and arrays
   *  of valid rows as values.
   * @param {Number} min_row The upper row from which the iteration will start.
   * @return {Number|Boolean} Returns the upper row valid from the `upper_rows`
   *  for the widget in question.
   */
  fn.get_valid_rows = function (widget_grid_data, upper_rows, min_row) {
    var p_top_row = widget_grid_data.row;
    var p_bottom_row = widget_grid_data.row + widget_grid_data.size_y - 1;
    var size_y = widget_grid_data.size_y;
    var r = min_row - 1;
    var valid_rows = [];

    while (++r <= p_bottom_row) {
      var common = true;
      $.each(upper_rows, function (col, rows) {
        if ($.isArray(rows) && $.inArray(r, rows) === -1) {
          common = false;
        }
      });

      if (common === true) {
        valid_rows.push(r);
        if (valid_rows.length === size_y) {
          break;
        }
      }
    }

    var new_row = false;
    if (size_y === 1) {
      if (valid_rows[0] !== p_top_row) {
        new_row = valid_rows[0] || false;
      }
    } else {
      if (valid_rows[0] !== p_top_row) {
        new_row = this.get_consecutive_numbers_index(valid_rows, size_y);
      }
    }

    return new_row;
  };

  fn.get_consecutive_numbers_index = function (arr, size_y) {
    var max = arr.length;
    var result = [];
    var first = true;
    var prev = -1; // or null?

    for (var i = 0; i < max; i++) {
      if (first || arr[i] === prev + 1) {
        result.push(i);
        if (result.length === size_y) {
          break;
        }
        first = false;
      } else {
        result = [];
        first = true;
      }

      prev = arr[i];
    }

    return result.length >= size_y ? arr[result[0]] : false;
  };

  /**
   * Get panes overlapping with the player.
   *
   * @method get_widgets_overlapped
   * @return {jQuery} Returns a jQuery collection of HTMLElements.
   */
  fn.get_widgets_overlapped = function () {
    var $w;
    var $widgets = $([]);
    var used = [];
    var rows_from_bottom = this.cells_occupied_by_player.rows.slice(0);
    rows_from_bottom.reverse();

    $.each(
      this.cells_occupied_by_player.cols,
      $.proxy(function (i, col) {
        $.each(
          rows_from_bottom,
          $.proxy(function (i, row) {
            // if there is a widget in the player position
            if (!this.gridmap[col]) {
              return true;
            } //next iteration
            var $w = this.gridmap[col][row];
            if (
              this.is_occupied(col, row) &&
              !this.is_player($w) &&
              $.inArray($w, used) === -1
            ) {
              $widgets = $widgets.add($w);
              used.push($w);
            }
          }, this),
        );
      }, this),
    );

    return $widgets;
  };

  /**
   * This callback is executed when the player begins to collide with a column.
   *
   * @method on_start_overlapping_column
   * @param {Number} col The collided column.
   * @return {jQuery} Returns a jQuery collection of HTMLElements.
   */
  fn.on_start_overlapping_column = function (col) {
    this.set_player(col, false);
  };

  /**
   * A callback executed when the player begins to collide with a row.
   *
   * @method on_start_overlapping_row
   * @param {Number} row The collided row.
   * @return {jQuery} Returns a jQuery collection of HTMLElements.
   */
  fn.on_start_overlapping_row = function (row) {
    this.set_player(false, row);
  };

  /**
   * A callback executed when the the player ends to collide with a column.
   *
   * @method on_stop_overlapping_column
   * @param {Number} col The collided row.
   * @return {jQuery} Returns a jQuery collection of HTMLElements.
   */
  fn.on_stop_overlapping_column = function (col) {
    this.set_player(col, false);

    var self = this;
    this.for_each_widget_below(
      col,
      this.cells_occupied_by_player.rows[0],
      function (tcol, trow) {
        self.move_widget_up(this, self.player_grid_data.size_y);
      },
    );
  };

  /**
   * This callback is executed when the player ends to collide with a row.
   *
   * @method on_stop_overlapping_row
   * @param {Number} row The collided row.
   * @return {jQuery} Returns a jQuery collection of HTMLElements.
   */
  fn.on_stop_overlapping_row = function (row) {
    this.set_player(false, row);

    var self = this;
    var cols = this.cells_occupied_by_player.cols;
    for (var c = 0, cl = cols.length; c < cl; c++) {
      this.for_each_widget_below(cols[c], row, function (tcol, trow) {
        self.move_widget_up(this, self.player_grid_data.size_y);
      });
    }
  };

  /**
   * Move a widget to a specific row. The cell or cells must be empty.
   * If the widget has panes below, all of these panes will be moved also
   * if they can.
   *
   * @method move_widget_to
   * @param {HTMLElement} $widget The jQuery wrapped HTMLElement of the
   * widget is going to be moved.
   * @return {Class} Returns the instance of the Gridster Class.
   */
  fn.move_widget_to = function ($widget, row) {
    var self = this;
    var widget_grid_data = $widget.coords().grid;
    var diff = row - widget_grid_data.row;
    var $next_widgets = this.widgets_below($widget);

    var can_move_to_new_cell = this.can_move_to(
      widget_grid_data,
      widget_grid_data.col,
      row,
      $widget,
    );

    if (can_move_to_new_cell === false) {
      return false;
    }

    this.remove_from_gridmap(widget_grid_data);
    widget_grid_data.row = row;
    this.add_to_gridmap(widget_grid_data);
    $widget.attr("data-row", row);
    this.$changed = this.$changed.add($widget);

    $next_widgets.each(function (i, widget) {
      var $w = $(widget);
      var wgd = $w.coords().grid;
      var can_go_up = self.can_go_widget_up(wgd);
      if (can_go_up && can_go_up !== wgd.row) {
        self.move_widget_to($w, can_go_up);
      }
    });

    return this;
  };

  /**
   * Move up the specified widget and all below it.
   *
   * @method move_widget_up
   * @param {HTMLElement} $widget The widget you want to move.
   * @param {Number} [y_units] The number of cells that the widget has to move.
   * @return {Class} Returns the instance of the Gridster Class.
   */
  fn.move_widget_up = function ($widget, y_units) {
    var el_grid_data = $widget.coords().grid;
    var actual_row = el_grid_data.row;
    var moved = [];
    var can_go_up = true;
    y_units || (y_units = 1);

    if (!this.can_go_up($widget)) {
      return false;
    } //break;

    this.for_each_column_occupied(el_grid_data, function (col) {
      // can_go_up
      if ($.inArray($widget, moved) === -1) {
        var widget_grid_data = $widget.coords().grid;
        var next_row = actual_row - y_units;
        next_row = this.can_go_up_to_row(widget_grid_data, col, next_row);

        if (!next_row) {
          return true;
        }

        var $next_widgets = this.widgets_below($widget);

        this.remove_from_gridmap(widget_grid_data);
        widget_grid_data.row = next_row;
        this.add_to_gridmap(widget_grid_data);
        $widget.attr("data-row", widget_grid_data.row);
        this.$changed = this.$changed.add($widget);

        moved.push($widget);

        $next_widgets.each(
          $.proxy(function (i, widget) {
            this.move_widget_up($(widget), y_units);
          }, this),
        );
      }
    });
  };

  /**
   * Move down the specified widget and all below it.
   *
   * @method move_widget_down
   * @param {jQuery} $widget The jQuery object representing the widget
   *  you want to move.
   * @param {Number} y_units The number of cells that the widget has to move.
   * @return {Class} Returns the instance of the Gridster Class.
   */
  fn.move_widget_down = function ($widget, y_units) {
    var el_grid_data = $widget.coords().grid;
    var actual_row = el_grid_data.row;
    var moved = [];
    var y_diff = y_units;

    if (!$widget) {
      return false;
    }

    if ($.inArray($widget, moved) === -1) {
      var widget_grid_data = $widget.coords().grid;
      var next_row = actual_row + y_units;
      var $next_widgets = this.widgets_below($widget);

      this.remove_from_gridmap(widget_grid_data);

      $next_widgets.each(
        $.proxy(function (i, widget) {
          var $w = $(widget);
          var wd = $w.coords().grid;
          var tmp_y = this.displacement_diff(wd, widget_grid_data, y_diff);

          if (tmp_y > 0) {
            this.move_widget_down($w, tmp_y);
          }
        }, this),
      );

      widget_grid_data.row = next_row;
      this.update_widget_position(widget_grid_data, $widget);
      $widget.attr("data-row", widget_grid_data.row);
      this.$changed = this.$changed.add($widget);

      moved.push($widget);
    }
  };

  /**
   * Check if the widget can move to the specified row, else returns the
   * upper row possible.
   *
   * @method can_go_up_to_row
   * @param {Number} widget_grid_data The current grid coords object of the
   *  widget.
   * @param {Number} col The target column.
   * @param {Number} row The target row.
   * @return {Boolean|Number} Returns the row number if the widget can move
   *  to the target position, else returns false.
   */
  fn.can_go_up_to_row = function (widget_grid_data, col, row) {
    var ga = this.gridmap;
    var result = true;
    var urc = []; // upper_rows_in_columns
    var actual_row = widget_grid_data.row;
    var r;

    /* generate an array with columns as index and array with
     * upper rows empty in the column */
    this.for_each_column_occupied(widget_grid_data, function (tcol) {
      var grid_col = ga[tcol];
      urc[tcol] = [];

      r = actual_row;
      while (r--) {
        if (this.is_empty(tcol, r) && !this.is_placeholder_in(tcol, r)) {
          urc[tcol].push(r);
        } else {
          break;
        }
      }

      if (!urc[tcol].length) {
        result = false;
        return true;
      }
    });

    if (!result) {
      return false;
    }

    /* get common rows starting from upper position in all the columns
     * that widget occupies */
    r = row;
    for (r = 1; r < actual_row; r++) {
      var common = true;

      for (var uc = 0, ucl = urc.length; uc < ucl; uc++) {
        if (urc[uc] && $.inArray(r, urc[uc]) === -1) {
          common = false;
        }
      }

      if (common === true) {
        result = r;
        break;
      }
    }

    return result;
  };

  fn.displacement_diff = function (widget_grid_data, parent_bgd, y_units) {
    var actual_row = widget_grid_data.row;
    var diffs = [];
    var parent_max_y = parent_bgd.row + parent_bgd.size_y;

    this.for_each_column_occupied(widget_grid_data, function (col) {
      var temp_y_units = 0;

      for (var r = parent_max_y; r < actual_row; r++) {
        if (this.is_empty(col, r)) {
          temp_y_units = temp_y_units + 1;
        }
      }

      diffs.push(temp_y_units);
    });

    var max_diff = Math.max.apply(Math, diffs);
    y_units = y_units - max_diff;

    return y_units > 0 ? y_units : 0;
  };

  /**
   * Get panes below a widget.
   *
   * @method widgets_below
   * @param {HTMLElement} $el The jQuery wrapped HTMLElement.
   * @return {jQuery} A jQuery collection of HTMLElements.
   */
  fn.widgets_below = function ($el) {
    var el_grid_data = $.isPlainObject($el) ? $el : $el.coords().grid;
    var self = this;
    var ga = this.gridmap;
    var next_row = el_grid_data.row + el_grid_data.size_y - 1;
    var $nexts = $([]);

    this.for_each_column_occupied(el_grid_data, function (col) {
      self.for_each_widget_below(col, next_row, function (tcol, trow) {
        if (!self.is_player(this) && $.inArray(this, $nexts) === -1) {
          $nexts = $nexts.add(this);
          return true; // break
        }
      });
    });

    return this.sort_by_row_asc($nexts);
  };

  /**
   * Update the array of mapped positions with the new player position.
   *
   * @method set_cells_player_occupies
   * @param {Number} col The new player col.
   * @param {Number} col The new player row.
   * @return {Class} Returns the instance of the Gridster Class.
   */
  fn.set_cells_player_occupies = function (col, row) {
    this.remove_from_gridmap(this.placeholder_grid_data);
    this.placeholder_grid_data.col = col;
    this.placeholder_grid_data.row = row;
    this.add_to_gridmap(this.placeholder_grid_data, this.$player);
    return this;
  };

  /**
   * Remove from the array of mapped positions the reference to the player.
   *
   * @method empty_cells_player_occupies
   * @return {Class} Returns the instance of the Gridster Class.
   */
  fn.empty_cells_player_occupies = function () {
    this.remove_from_gridmap(this.placeholder_grid_data);
    return this;
  };

  fn.can_go_up = function ($el) {
    var el_grid_data = $el.coords().grid;
    var initial_row = el_grid_data.row;
    var prev_row = initial_row - 1;
    var ga = this.gridmap;
    var upper_rows_by_column = [];

    var result = true;
    if (initial_row === 1) {
      return false;
    }

    this.for_each_column_occupied(el_grid_data, function (col) {
      var $w = this.is_widget(col, prev_row);

      if (
        this.is_occupied(col, prev_row) ||
        this.is_player(col, prev_row) ||
        this.is_placeholder_in(col, prev_row) ||
        this.is_player_in(col, prev_row)
      ) {
        result = false;
        return true; //break
      }
    });

    return result;
  };

  /**
   * Check if it's possible to move a widget to a specific col/row. It takes
   * into account the dimensions (`size_y` and `size_x` attrs. of the grid
   *  coords object) the widget occupies.
   *
   * @method can_move_to
   * @param {Object} widget_grid_data The grid coords object that represents
   *  the widget.
   * @param {Object} col The col to check.
   * @param {Object} row The row to check.
   * @param {Number} [max_row] The max row allowed.
   * @return {Boolean} Returns true if all cells are empty, else return false.
   */
  fn.can_move_to = function (widget_grid_data, col, row, max_row) {
    var ga = this.gridmap;
    var $w = widget_grid_data.el;
    var future_wd = {
      size_y: widget_grid_data.size_y,
      size_x: widget_grid_data.size_x,
      col: col,
      row: row,
    };
    var result = true;

    //Prevents panes go out of the grid
    var right_col = col + widget_grid_data.size_x - 1;
    if (right_col > this.cols) {
      return false;
    }

    if (max_row && max_row < row + widget_grid_data.size_y - 1) {
      return false;
    }

    this.for_each_cell_occupied(future_wd, function (tcol, trow) {
      var $tw = this.is_widget(tcol, trow);
      if ($tw && (!widget_grid_data.el || $tw.is($w))) {
        result = false;
      }
    });

    return result;
  };

  /**
   * Given the leftmost column returns all columns that are overlapping
   *  with the player.
   *
   * @method get_targeted_columns
   * @param {Number} [from_col] The leftmost column.
   * @return {Array} Returns an array with column numbers.
   */
  fn.get_targeted_columns = function (from_col) {
    var max =
      (from_col || this.player_grid_data.col) +
      (this.player_grid_data.size_x - 1);
    var cols = [];
    for (var col = from_col; col <= max; col++) {
      cols.push(col);
    }
    return cols;
  };

  /**
   * Given the upper row returns all rows that are overlapping with the player.
   *
   * @method get_targeted_rows
   * @param {Number} [from_row] The upper row.
   * @return {Array} Returns an array with row numbers.
   */
  fn.get_targeted_rows = function (from_row) {
    var max =
      (from_row || this.player_grid_data.row) +
      (this.player_grid_data.size_y - 1);
    var rows = [];
    for (var row = from_row; row <= max; row++) {
      rows.push(row);
    }
    return rows;
  };

  /**
   * Get all columns and rows that a widget occupies.
   *
   * @method get_cells_occupied
   * @param {Object} el_grid_data The grid coords object of the widget.
   * @return {Object} Returns an object like `{ cols: [], rows: []}`.
   */
  fn.get_cells_occupied = function (el_grid_data) {
    var cells = { cols: [], rows: [] };
    var i;
    if (arguments[1] instanceof jQuery) {
      el_grid_data = arguments[1].coords().grid;
    }

    for (i = 0; i < el_grid_data.size_x; i++) {
      var col = el_grid_data.col + i;
      cells.cols.push(col);
    }

    for (i = 0; i < el_grid_data.size_y; i++) {
      var row = el_grid_data.row + i;
      cells.rows.push(row);
    }

    return cells;
  };

  /**
   * Iterate over the cells occupied by a widget executing a function for
   * each one.
   *
   * @method for_each_cell_occupied
   * @param {Object} el_grid_data The grid coords object that represents the
   *  widget.
   * @param {Function} callback The function to execute on each column
   *  iteration. Column and row are passed as arguments.
   * @return {Class} Returns the instance of the Gridster Class.
   */
  fn.for_each_cell_occupied = function (grid_data, callback) {
    this.for_each_column_occupied(grid_data, function (col) {
      this.for_each_row_occupied(grid_data, function (row) {
        callback.call(this, col, row);
      });
    });
    return this;
  };

  /**
   * Iterate over the columns occupied by a widget executing a function for
   * each one.
   *
   * @method for_each_column_occupied
   * @param {Object} el_grid_data The grid coords object that represents
   *  the widget.
   * @param {Function} callback The function to execute on each column
   *  iteration. The column number is passed as first argument.
   * @return {Class} Returns the instance of the Gridster Class.
   */
  fn.for_each_column_occupied = function (el_grid_data, callback) {
    for (var i = 0; i < el_grid_data.size_x; i++) {
      var col = el_grid_data.col + i;
      callback.call(this, col, el_grid_data);
    }
  };

  /**
   * Iterate over the rows occupied by a widget executing a function for
   * each one.
   *
   * @method for_each_row_occupied
   * @param {Object} el_grid_data The grid coords object that represents
   *  the widget.
   * @param {Function} callback The function to execute on each column
   *  iteration. The row number is passed as first argument.
   * @return {Class} Returns the instance of the Gridster Class.
   */
  fn.for_each_row_occupied = function (el_grid_data, callback) {
    for (var i = 0; i < el_grid_data.size_y; i++) {
      var row = el_grid_data.row + i;
      callback.call(this, row, el_grid_data);
    }
  };

  fn._traversing_widgets = function (type, direction, col, row, callback) {
    var ga = this.gridmap;
    if (!ga[col]) {
      return;
    }

    var cr, max;
    var action = type + "/" + direction;
    if (arguments[2] instanceof jQuery) {
      var el_grid_data = arguments[2].coords().grid;
      col = el_grid_data.col;
      row = el_grid_data.row;
      callback = arguments[3];
    }
    var matched = [];
    var trow = row;

    var methods = {
      "for_each/above": function () {
        while (trow--) {
          if (
            trow > 0 &&
            this.is_widget(col, trow) &&
            $.inArray(ga[col][trow], matched) === -1
          ) {
            cr = callback.call(ga[col][trow], col, trow);
            matched.push(ga[col][trow]);
            if (cr) {
              break;
            }
          }
        }
      },
      "for_each/below": function () {
        for (trow = row + 1, max = ga[col].length; trow < max; trow++) {
          if (
            this.is_widget(col, trow) &&
            $.inArray(ga[col][trow], matched) === -1
          ) {
            cr = callback.call(ga[col][trow], col, trow);
            matched.push(ga[col][trow]);
            if (cr) {
              break;
            }
          }
        }
      },
    };

    if (methods[action]) {
      methods[action].call(this);
    }
  };

  /**
   * Iterate over each widget above the column and row specified.
   *
   * @method for_each_widget_above
   * @param {Number} col The column to start iterating.
   * @param {Number} row The row to start iterating.
   * @param {Function} callback The function to execute on each widget
   *  iteration. The value of `this` inside the function is the jQuery
   *  wrapped HTMLElement.
   * @return {Class} Returns the instance of the Gridster Class.
   */
  fn.for_each_widget_above = function (col, row, callback) {
    this._traversing_widgets("for_each", "above", col, row, callback);
    return this;
  };

  /**
   * Iterate over each widget below the column and row specified.
   *
   * @method for_each_widget_below
   * @param {Number} col The column to start iterating.
   * @param {Number} row The row to start iterating.
   * @param {Function} callback The function to execute on each widget
   *  iteration. The value of `this` inside the function is the jQuery wrapped
   *  HTMLElement.
   * @return {Class} Returns the instance of the Gridster Class.
   */
  fn.for_each_widget_below = function (col, row, callback) {
    this._traversing_widgets("for_each", "below", col, row, callback);
    return this;
  };

  /**
   * Returns the highest occupied cell in the grid.
   *
   * @method get_highest_occupied_cell
   * @return {Object} Returns an object with `col` and `row` numbers.
   */
  fn.get_highest_occupied_cell = function () {
    var r;
    var gm = this.gridmap;
    var rows = [];
    var row_in_col = [];
    for (var c = gm.length - 1; c >= 1; c--) {
      for (r = gm[c].length - 1; r >= 1; r--) {
        if (this.is_widget(c, r)) {
          rows.push(r);
          row_in_col[r] = c;
          break;
        }
      }
    }

    var highest_row = Math.max.apply(Math, rows);

    this.highest_occupied_cell = {
      col: row_in_col[highest_row],
      row: highest_row,
    };

    return this.highest_occupied_cell;
  };

  fn.get_widgets_from = function (col, row) {
    var ga = this.gridmap;
    var $widgets = $();

    if (col) {
      $widgets = $widgets.add(
        this.$widgets.filter(function () {
          var tcol = $(this).attr("data-col");
          return tcol === col || tcol > col;
        }),
      );
    }

    if (row) {
      $widgets = $widgets.add(
        this.$widgets.filter(function () {
          var trow = $(this).attr("data-row");
          return trow === row || trow > row;
        }),
      );
    }

    return $widgets;
  };

  /**
   * Set the current height of the parent grid.
   *
   * @method set_dom_grid_height
   * @return {Object} Returns the instance of the Gridster class.
   */
  fn.set_dom_grid_height = function () {
    var r = this.get_highest_occupied_cell().row + 1;
    this.$el.css("height", r * this.min_widget_height);
    return this;
  };

  /**
   * It generates the neccessary styles to position the panes.
   *
   * @method generate_stylesheet
   * @param {Number} rows Number of columns.
   * @param {Number} cols Number of rows.
   * @return {Object} Returns the instance of the Gridster class.
   */
  fn.generate_stylesheet = function (opts) {
    var styles = "";
    var max_size_x = this.options.max_size_x;
    var max_rows = 0;
    var max_cols = 0;
    var i;
    var rules;

    opts || (opts = {});
    opts.cols || (opts.cols = this.cols);
    opts.rows || (opts.rows = this.rows);
    opts.namespace || (opts.namespace = this.options.namespace);
    opts.widget_base_dimensions ||
      (opts.widget_base_dimensions = this.options.widget_base_dimensions);
    opts.widget_margins || (opts.widget_margins = this.options.widget_margins);
    opts.min_widget_width =
      opts.widget_margins[0] * 2 + opts.widget_base_dimensions[0];
    opts.min_widget_height =
      opts.widget_margins[1] * 2 + opts.widget_base_dimensions[1];

    // don't duplicate stylesheets for the same configuration
    var serialized_opts = $.param(opts);
    if ($.inArray(serialized_opts, Gridster.generated_stylesheets) >= 0) {
      return false;
    }

    Gridster.generated_stylesheets.push(serialized_opts);

    /* generate CSS styles for cols */
    for (i = opts.cols; i >= 0; i--) {
      styles +=
        opts.namespace +
        ' [data-col="' +
        (i + 1) +
        '"] { left:' +
        (i * opts.widget_base_dimensions[0] +
          i * opts.widget_margins[0] +
          (i + 1) * opts.widget_margins[0]) +
        "px;} ";
    }

    /* generate CSS styles for rows */
    for (i = opts.rows; i >= 0; i--) {
      styles +=
        opts.namespace +
        ' [data-row="' +
        (i + 1) +
        '"] { top:' +
        (i * opts.widget_base_dimensions[1] +
          i * opts.widget_margins[1] +
          (i + 1) * opts.widget_margins[1]) +
        "px;} ";
    }

    for (var y = 1; y <= opts.rows; y++) {
      styles +=
        opts.namespace +
        ' [data-sizey="' +
        y +
        '"] { height:' +
        (y * opts.widget_base_dimensions[1] +
          (y - 1) * (opts.widget_margins[1] * 2)) +
        "px;}";
    }

    for (var x = 1; x <= max_size_x; x++) {
      styles +=
        opts.namespace +
        ' [data-sizex="' +
        x +
        '"] { width:' +
        (x * opts.widget_base_dimensions[0] +
          (x - 1) * (opts.widget_margins[0] * 2)) +
        "px;}";
    }

    return this.add_style_tag(styles);
  };

  /**
   * Injects the given CSS as string to the head of the document.
   *
   * @method add_style_tag
   * @param {String} css The styles to apply.
   * @return {Object} Returns the instance of the Gridster class.
   */
  fn.add_style_tag = function (css) {
    var d = document;
    var tag = d.createElement("style");

    d.getElementsByTagName("head")[0].appendChild(tag);
    tag.setAttribute("type", "text/css");

    if (tag.styleSheet) {
      tag.styleSheet.cssText = css;
    } else {
      tag.appendChild(document.createTextNode(css));
    }

    this.$style_tags = this.$style_tags.add(tag);

    return this;
  };

  /**
   * Remove the style tag with the associated id from the head of the document
   *
   * @method  remove_style_tag
   * @return {Object} Returns the instance of the Gridster class.
   */
  fn.remove_style_tags = function () {
    this.$style_tags.remove();
  };

  /**
   * Generates a faux grid to collide with it when a widget is dragged and
   * detect row or column that we want to go.
   *
   * @method generate_faux_grid
   * @param {Number} rows Number of columns.
   * @param {Number} cols Number of rows.
   * @return {Object} Returns the instance of the Gridster class.
   */
  fn.generate_faux_grid = function (rows, cols) {
    this.faux_grid = [];
    this.gridmap = [];
    var col;
    var row;
    for (col = cols; col > 0; col--) {
      this.gridmap[col] = [];
      for (row = rows; row > 0; row--) {
        this.add_faux_cell(row, col);
      }
    }
    return this;
  };

  /**
   * Add cell to the faux grid.
   *
   * @method add_faux_cell
   * @param {Number} row The row for the new faux cell.
   * @param {Number} col The col for the new faux cell.
   * @return {Object} Returns the instance of the Gridster class.
   */
  fn.add_faux_cell = function (row, col) {
    var coords = $({
      left: this.baseX + (col - 1) * this.min_widget_width,
      top: this.baseY + (row - 1) * this.min_widget_height,
      width: this.min_widget_width,
      height: this.min_widget_height,
      col: col,
      row: row,
      original_col: col,
      original_row: row,
    }).coords();

    if (!$.isArray(this.gridmap[col])) {
      this.gridmap[col] = [];
    }

    this.gridmap[col][row] = false;
    this.faux_grid.push(coords);

    return this;
  };

  /**
   * Add rows to the faux grid.
   *
   * @method add_faux_rows
   * @param {Number} rows The number of rows you want to add to the faux grid.
   * @return {Object} Returns the instance of the Gridster class.
   */
  fn.add_faux_rows = function (rows) {
    var actual_rows = this.rows;
    var max_rows = actual_rows + (rows || 1);

    for (var r = max_rows; r > actual_rows; r--) {
      for (var c = this.cols; c >= 1; c--) {
        this.add_faux_cell(r, c);
      }
    }

    this.rows = max_rows;

    if (this.options.autogenerate_stylesheet) {
      this.generate_stylesheet();
    }

    return this;
  };

  /**
   * Add cols to the faux grid.
   *
   * @method add_faux_cols
   * @param {Number} cols The number of cols you want to add to the faux grid.
   * @return {Object} Returns the instance of the Gridster class.
   */
  fn.add_faux_cols = function (cols) {
    var actual_cols = this.cols;
    var max_cols = actual_cols + (cols || 1);

    for (var c = actual_cols; c < max_cols; c++) {
      for (var r = this.rows; r >= 1; r--) {
        this.add_faux_cell(r, c);
      }
    }

    this.cols = max_cols;

    if (this.options.autogenerate_stylesheet) {
      this.generate_stylesheet();
    }

    return this;
  };

  /**
   * Recalculates the offsets for the faux grid. You need to use it when
   * the browser is resized.
   *
   * @method recalculate_faux_grid
   * @return {Object} Returns the instance of the Gridster class.
   */
  fn.recalculate_faux_grid = function () {
    var aw = this.$wrapper.width();
    this.baseX = ($(window).width() - aw) / 2;
    this.baseY = this.$wrapper.offset().top;

    $.each(
      this.faux_grid,
      $.proxy(function (i, coords) {
        this.faux_grid[i] = coords.update({
          left: this.baseX + (coords.data.col - 1) * this.min_widget_width,
          top: this.baseY + (coords.data.row - 1) * this.min_widget_height,
        });
      }, this),
    );

    return this;
  };

  /**
   * Get all panes in the DOM and register them.
   *
   * @method get_widgets_from_DOM
   * @return {Object} Returns the instance of the Gridster class.
   */
  fn.get_widgets_from_DOM = function () {
    this.$widgets.each(
      $.proxy(function (i, widget) {
        this.register_widget($(widget));
      }, this),
    );
    return this;
  };

  /**
   * Calculate columns and rows to be set based on the configuration
   *  parameters, grid dimensions, etc ...
   *
   * @method generate_grid_and_stylesheet
   * @return {Object} Returns the instance of the Gridster class.
   */
  fn.generate_grid_and_stylesheet = function () {
    var aw = this.$wrapper.width();
    var ah = this.$wrapper.height();
    var max_cols = this.options.max_cols;

    var cols = Math.floor(aw / this.min_widget_width) + this.options.extra_cols;

    var actual_cols = this.$widgets
      .map(function () {
        return $(this).attr("data-col");
      })
      .get();

    //needed to pass tests with phantomjs
    actual_cols.length || (actual_cols = [0]);

    var min_cols = Math.max.apply(Math, actual_cols);

    // get all rows that could be occupied by the current panes
    var max_rows = this.options.extra_rows;
    this.$widgets.each(function (i, w) {
      max_rows += +$(w).attr("data-sizey");
    });

    this.cols = cols; //Math.max(Math.min(min_cols, cols), 1, this.options.min_cols);

    /*if(max_cols && max_cols >= min_cols && max_cols < this.cols)
		{
			this.cols = max_cols;
		}*/

    this.rows = Math.max(max_rows, this.options.min_rows);

    this.baseX = ($(window).width() - aw) / 2;
    this.baseY = this.$wrapper.offset().top;

    // left and right gutters not included
    this.container_width =
      this.cols * this.options.widget_base_dimensions[0] +
      (this.cols - 1) * 2 * this.options.widget_margins[0];

    if (this.options.autogenerate_stylesheet) {
      this.generate_stylesheet();
    }

    return this.generate_faux_grid(this.rows, this.cols);
  };

  /**
   * Destroy this gridster by removing any sign of its presence, making it easy to avoid memory leaks
   *
   * @method destroy
   * @return {undefined}
   */
  fn.destroy = function () {
    // remove bound callback on window resize
    $(window).unbind(".gridster");

    if (this.drag_api) {
      this.drag_api.destroy();
    }

    this.remove_style_tags();

    // lastly, remove gridster element
    // this will additionally cause any data associated to this element to be removed, including this
    // very gridster instance
    this.$el.remove();

    return this;
  };

  //jQuery adapter
  $.fn.gridster = function (options) {
    return this.each(function () {
      if (!$(this).data("gridster")) {
        $(this).data("gridster", new Gridster(this, options));
      }
    });
  };

  $.Gridster = fn;
})(jQuery, window, document);

(function ($, window, document, undefined) {
  var fn = $.Gridster;

  fn.widgets_in_col = function (col) {
    if (!this.gridmap[col]) {
      return false;
    }

    for (var i = this.gridmap[col].length - 1; i >= 0; i--) {
      if (this.is_widget(col, i) !== false) {
        return true;
      }
    }

    return false;
  };

  fn.widgets_in_row = function (row) {
    for (var i = this.gridmap.length; i >= 1; i--) {
      if (this.is_widget(i, row) !== false) {
        return true;
      }
    }

    return false;
  };

  fn.widgets_in_range = function (col1, row1, col2, row2) {
    var valid_cols = [];
    var valid_rows = [];
    var $widgets = $([]);
    var c, r, $w, wgd;

    for (c = col2; c >= col1; c--) {
      for (r = row2; r >= row1; r--) {
        $w = this.is_widget(c, r);

        if ($w !== false) {
          wgd = $w.data("coords").grid;
          if (
            wgd.col >= col1 &&
            wgd.col <= col2 &&
            wgd.row >= row1 &&
            wgd.row <= row2
          ) {
            $widgets = $widgets.add($w);
          }
        }
      }
    }

    return $widgets;
  };

  fn.get_bottom_most_occupied_cell = function () {
    var row = 0;
    var col = 0;
    this.for_each_cell(function ($el, c, r) {
      if ($el && r > row) {
        row = r;
        col = c;
      }
    });

    return { col: col, row: row };
  };

  fn.get_right_most_occupied_cell = function () {
    var row = 0;
    var col = 0;
    this.for_each_cell(function ($el, c, r) {
      if ($el) {
        row = r;
        col = c;
        return false;
      }
    });

    return { col: col, row: row };
  };

  fn.for_each_cell = function (callback, gridmap) {
    gridmap || (gridmap = this.gridmap);
    var cols = gridmap.length;
    var rows = gridmap[1].length;

    cols_iter: for (var c = cols - 1; c >= 1; c--) {
      for (var r = rows - 1; r >= 1; r--) {
        var $el = gridmap[c] && gridmap[c][r];
        if (callback) {
          if (callback.call(this, $el, c, r) === false) {
            break cols_iter;
          } else {
            continue;
          }
        }
      }
    }
  };

  fn.next_position_in_range = function (size_x, size_y, max_rows) {
    size_x || (size_x = 1);
    size_y || (size_y = 1);
    var ga = this.gridmap;
    var cols_l = ga.length;
    var valid_pos = [];
    var rows_l;

    for (var c = 1; c < cols_l; c++) {
      rows_l = max_rows || ga[c].length;
      for (var r = 1; r <= rows_l; r++) {
        var can_move_to = this.can_move_to(
          {
            size_x: size_x,
            size_y: size_y,
          },
          c,
          r,
          max_rows,
        );

        if (can_move_to) {
          valid_pos.push({
            col: c,
            row: r,
            size_y: size_y,
            size_x: size_x,
          });
        }
      }
    }

    if (valid_pos.length >= 1) {
      return this.sort_by_col_asc(valid_pos)[0];
    }

    return false;
  };

  fn.closest_to_right = function (col, row) {
    if (!this.gridmap[col]) {
      return false;
    }
    var cols_l = this.gridmap.length - 1;

    for (var c = col; c <= cols_l; c++) {
      if (this.gridmap[c][row]) {
        return { col: c, row: row };
      }
    }

    return false;
  };

  fn.closest_to_left = function (col, row) {
    var cols_l = this.gridmap.length - 1;
    if (!this.gridmap[col]) {
      return false;
    }

    for (var c = col; c >= 1; c--) {
      if (this.gridmap[c][row]) {
        return { col: c, row: row };
      }
    }

    return false;
  };
})(jQuery, window, document);

/*!
 * jQuery-ajaxTransport-XDomainRequest - v1.0.3 - 2014-06-06
 * https://github.com/MoonScript/jQuery-ajaxTransport-XDomainRequest
 * Copyright (c) 2014 Jason Moon (@JSONMOON)
 * Licensed MIT (/blob/master/LICENSE.txt)
 */
(function (a) {
  if (typeof define === "function" && define.amd) {
    define(["jquery"], a);
  } else if (typeof exports === "object") {
    module.exports = a(require("jquery"));
  } else {
    a(jQuery);
  }
})(function ($) {
  if ($.support.cors || !$.ajaxTransport || !window.XDomainRequest) {
    return;
  }
  var n = /^https?:\/\//i;
  var o = /^get|post$/i;
  var p = new RegExp("^" + location.protocol, "i");
  $.ajaxTransport("* text html xml json", function (j, k, l) {
    if (
      !j.crossDomain ||
      !j.async ||
      !o.test(j.type) ||
      !n.test(j.url) ||
      !p.test(j.url)
    ) {
      return;
    }
    var m = null;
    return {
      send: function (f, g) {
        var h = "";
        var i = (k.dataType || "").toLowerCase();
        m = new XDomainRequest();
        if (/^\d+$/.test(k.timeout)) {
          m.timeout = k.timeout;
        }
        m.ontimeout = function () {
          g(500, "timeout");
        };
        m.onload = function () {
          var a =
            "Content-Length: " +
            m.responseText.length +
            "\r\nContent-Type: " +
            m.contentType;
          var b = { code: 200, message: "success" };
          var c = { text: m.responseText };
          try {
            if (i === "html" || /text\/html/i.test(m.contentType)) {
              c.html = m.responseText;
            } else if (
              i === "json" ||
              (i !== "text" && /\/json/i.test(m.contentType))
            ) {
              try {
                c.json = $.parseJSON(m.responseText);
              } catch (e) {
                b.code = 500;
                b.message = "parseerror";
              }
            } else if (
              i === "xml" ||
              (i !== "text" && /\/xml/i.test(m.contentType))
            ) {
              var d = new ActiveXObject("Microsoft.XMLDOM");
              d.async = false;
              try {
                d.loadXML(m.responseText);
              } catch (e) {
                d = undefined;
              }
              if (
                !d ||
                !d.documentElement ||
                d.getElementsByTagName("parsererror").length
              ) {
                b.code = 500;
                b.message = "parseerror";
                throw "Invalid XML: " + m.responseText;
              }
              c.xml = d;
            }
          } catch (parseMessage) {
            throw parseMessage;
          } finally {
            g(b.code, b.message, c, a);
          }
        };
        m.onprogress = function () {};
        m.onerror = function () {
          g(500, "error", { text: m.responseText });
        };
        if (k.data) {
          h = $.type(k.data) === "string" ? k.data : $.param(k.data);
        }
        m.open(j.type, j.url);
        m.send(h);
      },
      abort: function () {
        if (m) {
          m.abort();
        }
      },
    };
  });
});
