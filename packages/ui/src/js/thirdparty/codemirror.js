/* CodeMirror - Minified & Bundled
   Generated on 4/30/2014 with http://codemirror.net/doc/compress.html
   Version: HEAD

   CodeMirror Library:
   - codemirror.js
   Modes:
   - javascript.js
   Add-ons:
   - closebrackets.js
   - continuecomment.js
   - javascript-hint.js
   - matchbrackets.js
   - show-hint.js
 */

!function (a) {
  if ("object" == typeof exports && "object" == typeof module)
    module.exports = a();
  else {
    if ("function" == typeof define && define.amd) return define([], a);
    this.CodeMirror = a();
  }
}.call(window, function () {
  "use strict";
  function y(a, c) {
    if (!(this instanceof y)) return new y(a, c);
    (this.options = c = c || {}), Eg(Zd, c, !1), M(c);
    var d = c.value;
    "string" == typeof d && (d = new yf(d, c.mode)), (this.doc = d);
    var e = (this.display = new z(a, d));
    (e.wrapper.CodeMirror = this),
      I(this),
      G(this),
      c.lineWrapping && (this.display.wrapper.className += " CodeMirror-wrap"),
      c.autofocus && !q && Qc(this),
      (this.state = {
        keyMaps: [],
        overlays: [],
        modeGen: 0,
        overwrite: !1,
        focused: !1,
        suppressEdits: !1,
        pasteIncoming: !1,
        cutIncoming: !1,
        draggingText: !1,
        highlight: new ug(),
      }),
      b && setTimeout(Fg(Pc, this, !0), 20),
      Tc(this),
      Xg();
    var f = this;
    zc(this, function () {
      (f.curOp.forceUpdate = !0),
        Cf(f, d),
        (c.autofocus && !q) || Qg() == e.input
          ? setTimeout(Fg(vd, f), 20)
          : wd(f);
      for (var a in $d) $d.hasOwnProperty(a) && $d[a](f, c[a], ae);
      for (var b = 0; b < ee.length; ++b) ee[b](f);
    });
  }
  function z(a, b) {
    var d = this,
      e = (d.input = Lg(
        "textarea",
        null,
        null,
        "position: absolute; padding: 0; width: 1px; height: 1em; outline: none",
      ));
    h ? (e.style.width = "1000px") : e.setAttribute("wrap", "off"),
      p && (e.style.border = "1px solid black"),
      e.setAttribute("autocorrect", "off"),
      e.setAttribute("autocapitalize", "off"),
      e.setAttribute("spellcheck", "false"),
      (d.inputDiv = Lg(
        "div",
        [e],
        null,
        "overflow: hidden; position: relative; width: 3px; height: 0px;",
      )),
      (d.scrollbarH = Lg(
        "div",
        [Lg("div", null, null, "height: 100%; min-height: 1px")],
        "CodeMirror-hscrollbar",
      )),
      (d.scrollbarV = Lg(
        "div",
        [Lg("div", null, null, "min-width: 1px")],
        "CodeMirror-vscrollbar",
      )),
      (d.scrollbarFiller = Lg("div", null, "CodeMirror-scrollbar-filler")),
      (d.gutterFiller = Lg("div", null, "CodeMirror-gutter-filler")),
      (d.lineDiv = Lg("div", null, "CodeMirror-code")),
      (d.selectionDiv = Lg(
        "div",
        null,
        null,
        "position: relative; z-index: 1",
      )),
      (d.cursorDiv = Lg("div", null, "CodeMirror-cursors")),
      (d.measure = Lg("div", null, "CodeMirror-measure")),
      (d.lineMeasure = Lg("div", null, "CodeMirror-measure")),
      (d.lineSpace = Lg(
        "div",
        [d.measure, d.lineMeasure, d.selectionDiv, d.cursorDiv, d.lineDiv],
        null,
        "position: relative; outline: none",
      )),
      (d.mover = Lg(
        "div",
        [Lg("div", [d.lineSpace], "CodeMirror-lines")],
        null,
        "position: relative",
      )),
      (d.sizer = Lg("div", [d.mover], "CodeMirror-sizer")),
      (d.heightForcer = Lg(
        "div",
        null,
        null,
        "position: absolute; height: " + pg + "px; width: 1px;",
      )),
      (d.gutters = Lg("div", null, "CodeMirror-gutters")),
      (d.lineGutter = null),
      (d.scroller = Lg(
        "div",
        [d.sizer, d.heightForcer, d.gutters],
        "CodeMirror-scroll",
      )),
      d.scroller.setAttribute("tabIndex", "-1"),
      (d.wrapper = Lg(
        "div",
        [
          d.inputDiv,
          d.scrollbarH,
          d.scrollbarV,
          d.scrollbarFiller,
          d.gutterFiller,
          d.scroller,
        ],
        "CodeMirror",
      )),
      c && ((d.gutters.style.zIndex = -1), (d.scroller.style.paddingRight = 0)),
      p && (e.style.width = "0px"),
      h || (d.scroller.draggable = !0),
      m &&
        ((d.inputDiv.style.height = "1px"),
        (d.inputDiv.style.position = "absolute")),
      c &&
        (d.scrollbarH.style.minHeight = d.scrollbarV.style.minWidth = "18px"),
      a.appendChild ? a.appendChild(d.wrapper) : a(d.wrapper),
      (d.viewFrom = d.viewTo = b.first),
      (d.view = []),
      (d.externalMeasured = null),
      (d.viewOffset = 0),
      (d.lastSizeC = 0),
      (d.updateLineNumbers = null),
      (d.lineNumWidth = d.lineNumInnerWidth = d.lineNumChars = null),
      (d.prevInput = ""),
      (d.alignWidgets = !1),
      (d.pollingFast = !1),
      (d.poll = new ug()),
      (d.cachedCharWidth = d.cachedTextHeight = d.cachedPaddingH = null),
      (d.inaccurateSelection = !1),
      (d.maxLine = null),
      (d.maxLineLength = 0),
      (d.maxLineChanged = !1),
      (d.wheelDX = d.wheelDY = d.wheelStartX = d.wheelStartY = null),
      (d.shift = !1),
      (d.selForContextMenu = null);
  }
  function A(a) {
    (a.doc.mode = y.getMode(a.options, a.doc.modeOption)), B(a);
  }
  function B(a) {
    a.doc.iter(function (a) {
      a.stateAfter && (a.stateAfter = null), a.styles && (a.styles = null);
    }),
      (a.doc.frontier = a.doc.first),
      Sb(a, 100),
      a.state.modeGen++,
      a.curOp && Fc(a);
  }
  function C(a) {
    a.options.lineWrapping
      ? (Tg(a.display.wrapper, "CodeMirror-wrap"),
        (a.display.sizer.style.minWidth = ""))
      : (Sg(a.display.wrapper, "CodeMirror-wrap"), L(a)),
      E(a),
      Fc(a),
      ic(a),
      setTimeout(function () {
        O(a);
      }, 100);
  }
  function D(a) {
    var b = uc(a.display),
      c = a.options.lineWrapping,
      d = c && Math.max(5, a.display.scroller.clientWidth / vc(a.display) - 3);
    return function (e) {
      if (Ue(a.doc, e)) return 0;
      var f = 0;
      if (e.widgets)
        for (var g = 0; g < e.widgets.length; g++)
          e.widgets[g].height && (f += e.widgets[g].height);
      return c ? f + (Math.ceil(e.text.length / d) || 1) * b : f + b;
    };
  }
  function E(a) {
    var b = a.doc,
      c = D(a);
    b.iter(function (a) {
      var b = c(a);
      b != a.height && Gf(a, b);
    });
  }
  function F(a) {
    var b = je[a.options.keyMap],
      c = b.style;
    a.display.wrapper.className =
      a.display.wrapper.className.replace(/\s*cm-keymap-\S+/g, "") +
      (c ? " cm-keymap-" + c : "");
  }
  function G(a) {
    (a.display.wrapper.className =
      a.display.wrapper.className.replace(/\s*cm-s-\S+/g, "") +
      a.options.theme.replace(/(^|\s)\s*/g, " cm-s-")),
      ic(a);
  }
  function H(a) {
    I(a),
      Fc(a),
      setTimeout(function () {
        Q(a);
      }, 20);
  }
  function I(a) {
    var b = a.display.gutters,
      c = a.options.gutters;
    Ng(b);
    for (var d = 0; d < c.length; ++d) {
      var e = c[d],
        f = b.appendChild(Lg("div", null, "CodeMirror-gutter " + e));
      "CodeMirror-linenumbers" == e &&
        ((a.display.lineGutter = f),
        (f.style.width = (a.display.lineNumWidth || 1) + "px"));
    }
    (b.style.display = d ? "" : "none"), J(a);
  }
  function J(a) {
    var b = a.display.gutters.offsetWidth;
    (a.display.sizer.style.marginLeft = b + "px"),
      (a.display.scrollbarH.style.left = a.options.fixedGutter ? b + "px" : 0);
  }
  function K(a) {
    if (0 == a.height) return 0;
    for (var c, b = a.text.length, d = a; (c = Ne(d)); ) {
      var e = c.find(0, !0);
      (d = e.from.line), (b += e.from.ch - e.to.ch);
    }
    for (d = a; (c = Oe(d)); ) {
      var e = c.find(0, !0);
      (b -= d.text.length - e.from.ch),
        (d = e.to.line),
        (b += d.text.length - e.to.ch);
    }
    return b;
  }
  function L(a) {
    var b = a.display,
      c = a.doc;
    (b.maxLine = Df(c, c.first)),
      (b.maxLineLength = K(b.maxLine)),
      (b.maxLineChanged = !0),
      c.iter(function (a) {
        var c = K(a);
        c > b.maxLineLength && ((b.maxLineLength = c), (b.maxLine = a));
      });
  }
  function M(a) {
    var b = Bg(a.gutters, "CodeMirror-linenumbers");
    -1 == b && a.lineNumbers
      ? (a.gutters = a.gutters.concat(["CodeMirror-linenumbers"]))
      : b > -1 &&
        !a.lineNumbers &&
        ((a.gutters = a.gutters.slice(0)), a.gutters.splice(b, 1));
  }
  function N(a) {
    var b = a.display.scroller;
    return {
      clientHeight: b.clientHeight,
      barHeight: a.display.scrollbarV.clientHeight,
      scrollWidth: b.scrollWidth,
      clientWidth: b.clientWidth,
      barWidth: a.display.scrollbarH.clientWidth,
      docHeight: Math.round(a.doc.height + Xb(a.display)),
    };
  }
  function O(a, b) {
    b || (b = N(a));
    var c = a.display,
      d = b.docHeight + pg,
      e = b.scrollWidth > b.clientWidth,
      f = d > b.clientHeight;
    if (
      (f
        ? ((c.scrollbarV.style.display = "block"),
          (c.scrollbarV.style.bottom = e ? _g(c.measure) + "px" : "0"),
          (c.scrollbarV.firstChild.style.height =
            Math.max(
              0,
              d - b.clientHeight + (b.barHeight || c.scrollbarV.clientHeight),
            ) + "px"))
        : ((c.scrollbarV.style.display = ""),
          (c.scrollbarV.firstChild.style.height = "0")),
      e
        ? ((c.scrollbarH.style.display = "block"),
          (c.scrollbarH.style.right = f ? _g(c.measure) + "px" : "0"),
          (c.scrollbarH.firstChild.style.width =
            b.scrollWidth -
            b.clientWidth +
            (b.barWidth || c.scrollbarH.clientWidth) +
            "px"))
        : ((c.scrollbarH.style.display = ""),
          (c.scrollbarH.firstChild.style.width = "0")),
      e && f
        ? ((c.scrollbarFiller.style.display = "block"),
          (c.scrollbarFiller.style.height = c.scrollbarFiller.style.width =
            _g(c.measure) + "px"))
        : (c.scrollbarFiller.style.display = ""),
      e && a.options.coverGutterNextToScrollbar && a.options.fixedGutter
        ? ((c.gutterFiller.style.display = "block"),
          (c.gutterFiller.style.height = _g(c.measure) + "px"),
          (c.gutterFiller.style.width = c.gutters.offsetWidth + "px"))
        : (c.gutterFiller.style.display = ""),
      !a.state.checkedOverlayScrollbar && b.clientHeight > 0)
    ) {
      if (0 === _g(c.measure)) {
        var g = r && !n ? "12px" : "18px";
        c.scrollbarV.style.minWidth = c.scrollbarH.style.minHeight = g;
        var h = function (b) {
          cg(b) != c.scrollbarV && cg(b) != c.scrollbarH && Ac(a, Xc)(b);
        };
        eg(c.scrollbarV, "mousedown", h), eg(c.scrollbarH, "mousedown", h);
      }
      a.state.checkedOverlayScrollbar = !0;
    }
  }
  function P(a, b, c) {
    var d = c && null != c.top ? c.top : a.scroller.scrollTop;
    d = Math.floor(d - Wb(a));
    var e = c && null != c.bottom ? c.bottom : d + a.wrapper.clientHeight,
      f = If(b, d),
      g = If(b, e);
    if (c && c.ensure) {
      var h = c.ensure.from.line,
        i = c.ensure.to.line;
      if (f > h)
        return { from: h, to: If(b, Jf(Df(b, h)) + a.wrapper.clientHeight) };
      if (Math.min(i, b.lastLine()) >= g)
        return { from: If(b, Jf(Df(b, i)) - a.wrapper.clientHeight), to: i };
    }
    return { from: f, to: g };
  }
  function Q(a) {
    var b = a.display,
      c = b.view;
    if (b.alignWidgets || (b.gutters.firstChild && a.options.fixedGutter)) {
      for (
        var d = T(b) - b.scroller.scrollLeft + a.doc.scrollLeft,
          e = b.gutters.offsetWidth,
          f = d + "px",
          g = 0;
        g < c.length;
        g++
      )
        if (!c[g].hidden) {
          a.options.fixedGutter && c[g].gutter && (c[g].gutter.style.left = f);
          var h = c[g].alignable;
          if (h) for (var i = 0; i < h.length; i++) h[i].style.left = f;
        }
      a.options.fixedGutter && (b.gutters.style.left = d + e + "px");
    }
  }
  function R(a) {
    if (!a.options.lineNumbers) return !1;
    var b = a.doc,
      c = S(a.options, b.first + b.size - 1),
      d = a.display;
    if (c.length != d.lineNumChars) {
      var e = d.measure.appendChild(
          Lg(
            "div",
            [Lg("div", c)],
            "CodeMirror-linenumber CodeMirror-gutter-elt",
          ),
        ),
        f = e.firstChild.offsetWidth,
        g = e.offsetWidth - f;
      return (
        (d.lineGutter.style.width = ""),
        (d.lineNumInnerWidth = Math.max(f, d.lineGutter.offsetWidth - g)),
        (d.lineNumWidth = d.lineNumInnerWidth + g),
        (d.lineNumChars = d.lineNumInnerWidth ? c.length : -1),
        (d.lineGutter.style.width = d.lineNumWidth + "px"),
        J(a),
        !0
      );
    }
    return !1;
  }
  function S(a, b) {
    return String(a.lineNumberFormatter(b + a.firstLineNumber));
  }
  function T(a) {
    return (
      a.scroller.getBoundingClientRect().left -
      a.sizer.getBoundingClientRect().left
    );
  }
  function U(a, b, c) {
    for (
      var f,
        d = a.display.viewFrom,
        e = a.display.viewTo,
        g = P(a.display, a.doc, b),
        i = !0;
      ;
      i = !1
    ) {
      var j = a.display.scroller.clientWidth;
      if (!V(a, g, c)) break;
      (f = !0), a.display.maxLineChanged && !a.options.lineWrapping && W(a);
      var k = N(a);
      if (
        (Ob(a),
        X(a, k),
        O(a, k),
        h && a.options.lineWrapping && Y(a, k),
        i && a.options.lineWrapping && j != a.display.scroller.clientWidth)
      )
        c = !0;
      else if (
        ((c = !1),
        b &&
          null != b.top &&
          (b = { top: Math.min(k.docHeight - pg - k.clientHeight, b.top) }),
        (g = P(a.display, a.doc, b)),
        g.from >= a.display.viewFrom && g.to <= a.display.viewTo)
      )
        break;
    }
    return (
      (a.display.updateLineNumbers = null),
      f &&
        (jg(a, "update", a),
        (a.display.viewFrom != d || a.display.viewTo != e) &&
          jg(a, "viewportChange", a, a.display.viewFrom, a.display.viewTo)),
      f
    );
  }
  function V(a, b, c) {
    var d = a.display,
      e = a.doc;
    if (!d.wrapper.offsetWidth) return Hc(a), void 0;
    if (!(!c && b.from >= d.viewFrom && b.to <= d.viewTo && 0 == Lc(a))) {
      R(a) && Hc(a);
      var f = _(a),
        g = e.first + e.size,
        h = Math.max(b.from - a.options.viewportMargin, e.first),
        i = Math.min(g, b.to + a.options.viewportMargin);
      d.viewFrom < h &&
        h - d.viewFrom < 20 &&
        (h = Math.max(e.first, d.viewFrom)),
        d.viewTo > i && d.viewTo - i < 20 && (i = Math.min(g, d.viewTo)),
        x && ((h = Se(a.doc, h)), (i = Te(a.doc, i)));
      var j =
        h != d.viewFrom ||
        i != d.viewTo ||
        d.lastSizeC != d.wrapper.clientHeight;
      Kc(a, h, i),
        (d.viewOffset = Jf(Df(a.doc, d.viewFrom))),
        (a.display.mover.style.top = d.viewOffset + "px");
      var k = Lc(a);
      if (j || 0 != k || c) {
        var l = Qg();
        return (
          k > 4 && (d.lineDiv.style.display = "none"),
          ab(a, d.updateLineNumbers, f),
          k > 4 && (d.lineDiv.style.display = ""),
          l && Qg() != l && l.offsetHeight && l.focus(),
          Ng(d.cursorDiv),
          Ng(d.selectionDiv),
          j && ((d.lastSizeC = d.wrapper.clientHeight), Sb(a, 400)),
          Z(a),
          !0
        );
      }
    }
  }
  function W(a) {
    var b = a.display,
      c = ac(a, b.maxLine, b.maxLine.text.length).left;
    b.maxLineChanged = !1;
    var d = Math.max(0, c + 3),
      e = Math.max(0, b.sizer.offsetLeft + d + pg - b.scroller.clientWidth);
    (b.sizer.style.minWidth = d + "px"),
      e < a.doc.scrollLeft && hd(a, Math.min(b.scroller.scrollLeft, e), !0);
  }
  function X(a, b) {
    (a.display.sizer.style.minHeight = a.display.heightForcer.style.top =
      b.docHeight + "px"),
      (a.display.gutters.style.height =
        Math.max(b.docHeight, b.clientHeight - pg) + "px");
  }
  function Y(a, b) {
    a.display.sizer.offsetWidth + a.display.gutters.offsetWidth <
      a.display.scroller.clientWidth - 1 &&
      ((a.display.sizer.style.minHeight = a.display.heightForcer.style.top =
        "0px"),
      (a.display.gutters.style.height = b.docHeight + "px"));
  }
  function Z(a) {
    for (
      var b = a.display, d = b.lineDiv.offsetTop, e = 0;
      e < b.view.length;
      e++
    ) {
      var g,
        f = b.view[e];
      if (!f.hidden) {
        if (c) {
          var h = f.node.offsetTop + f.node.offsetHeight;
          (g = h - d), (d = h);
        } else {
          var i = f.node.getBoundingClientRect();
          g = i.bottom - i.top;
        }
        var j = f.line.height - g;
        if (
          (2 > g && (g = uc(b)),
          (j > 0.001 || -0.001 > j) && (Gf(f.line, g), $(f.line), f.rest))
        )
          for (var k = 0; k < f.rest.length; k++) $(f.rest[k]);
      }
    }
  }
  function $(a) {
    if (a.widgets)
      for (var b = 0; b < a.widgets.length; ++b)
        a.widgets[b].height = a.widgets[b].node.offsetHeight;
  }
  function _(a) {
    for (
      var b = a.display, c = {}, d = {}, e = b.gutters.firstChild, f = 0;
      e;
      e = e.nextSibling, ++f
    )
      (c[a.options.gutters[f]] = e.offsetLeft),
        (d[a.options.gutters[f]] = e.offsetWidth);
    return {
      fixedPos: T(b),
      gutterTotalWidth: b.gutters.offsetWidth,
      gutterLeft: c,
      gutterWidth: d,
      wrapperWidth: b.wrapper.clientWidth,
    };
  }
  function ab(a, b, c) {
    function i(b) {
      var c = b.nextSibling;
      return (
        h && r && a.display.currentWheelTarget == b
          ? (b.style.display = "none")
          : b.parentNode.removeChild(b),
        c
      );
    }
    for (
      var d = a.display,
        e = a.options.lineNumbers,
        f = d.lineDiv,
        g = f.firstChild,
        j = d.view,
        k = d.viewFrom,
        l = 0;
      l < j.length;
      l++
    ) {
      var m = j[l];
      if (m.hidden);
      else if (m.node) {
        for (; g != m.node; ) g = i(g);
        var o = e && null != b && k >= b && m.lineNumber;
        m.changes && (Bg(m.changes, "gutter") > -1 && (o = !1), bb(a, m, k, c)),
          o &&
            (Ng(m.lineNumber),
            m.lineNumber.appendChild(document.createTextNode(S(a.options, k)))),
          (g = m.node.nextSibling);
      } else {
        var n = jb(a, m, k, c);
        f.insertBefore(n, g);
      }
      k += m.size;
    }
    for (; g; ) g = i(g);
  }
  function bb(a, b, c, d) {
    for (var e = 0; e < b.changes.length; e++) {
      var f = b.changes[e];
      "text" == f
        ? fb(a, b)
        : "gutter" == f
          ? hb(a, b, c, d)
          : "class" == f
            ? gb(b)
            : "widget" == f && ib(b, d);
    }
    b.changes = null;
  }
  function cb(a) {
    return (
      a.node == a.text &&
        ((a.node = Lg("div", null, null, "position: relative")),
        a.text.parentNode && a.text.parentNode.replaceChild(a.node, a.text),
        a.node.appendChild(a.text),
        c && (a.node.style.zIndex = 2)),
      a.node
    );
  }
  function db(a) {
    var b = a.bgClass
      ? a.bgClass + " " + (a.line.bgClass || "")
      : a.line.bgClass;
    if ((b && (b += " CodeMirror-linebackground"), a.background))
      b
        ? (a.background.className = b)
        : (a.background.parentNode.removeChild(a.background),
          (a.background = null));
    else if (b) {
      var c = cb(a);
      a.background = c.insertBefore(Lg("div", null, b), c.firstChild);
    }
  }
  function eb(a, b) {
    var c = a.display.externalMeasured;
    return c && c.line == b.line
      ? ((a.display.externalMeasured = null), (b.measure = c.measure), c.built)
      : mf(a, b);
  }
  function fb(a, b) {
    var c = b.text.className,
      d = eb(a, b);
    b.text == b.node && (b.node = d.pre),
      b.text.parentNode.replaceChild(d.pre, b.text),
      (b.text = d.pre),
      d.bgClass != b.bgClass || d.textClass != b.textClass
        ? ((b.bgClass = d.bgClass), (b.textClass = d.textClass), gb(b))
        : c && (b.text.className = c);
  }
  function gb(a) {
    db(a),
      a.line.wrapClass
        ? (cb(a).className = a.line.wrapClass)
        : a.node != a.text && (a.node.className = "");
    var b = a.textClass
      ? a.textClass + " " + (a.line.textClass || "")
      : a.line.textClass;
    a.text.className = b || "";
  }
  function hb(a, b, c, d) {
    b.gutter && (b.node.removeChild(b.gutter), (b.gutter = null));
    var e = b.line.gutterMarkers;
    if (a.options.lineNumbers || e) {
      var f = cb(b),
        g = (b.gutter = f.insertBefore(
          Lg(
            "div",
            null,
            "CodeMirror-gutter-wrapper",
            "position: absolute; left: " +
              (a.options.fixedGutter ? d.fixedPos : -d.gutterTotalWidth) +
              "px",
          ),
          b.text,
        ));
      if (
        (!a.options.lineNumbers ||
          (e && e["CodeMirror-linenumbers"]) ||
          (b.lineNumber = g.appendChild(
            Lg(
              "div",
              S(a.options, c),
              "CodeMirror-linenumber CodeMirror-gutter-elt",
              "left: " +
                d.gutterLeft["CodeMirror-linenumbers"] +
                "px; width: " +
                a.display.lineNumInnerWidth +
                "px",
            ),
          )),
        e)
      )
        for (var h = 0; h < a.options.gutters.length; ++h) {
          var i = a.options.gutters[h],
            j = e.hasOwnProperty(i) && e[i];
          j &&
            g.appendChild(
              Lg(
                "div",
                [j],
                "CodeMirror-gutter-elt",
                "left: " +
                  d.gutterLeft[i] +
                  "px; width: " +
                  d.gutterWidth[i] +
                  "px",
              ),
            );
        }
    }
  }
  function ib(a, b) {
    a.alignable && (a.alignable = null);
    for (var d, c = a.node.firstChild; c; c = d) {
      var d = c.nextSibling;
      "CodeMirror-linewidget" == c.className && a.node.removeChild(c);
    }
    kb(a, b);
  }
  function jb(a, b, c, d) {
    var e = eb(a, b);
    return (
      (b.text = b.node = e.pre),
      e.bgClass && (b.bgClass = e.bgClass),
      e.textClass && (b.textClass = e.textClass),
      gb(b),
      hb(a, b, c, d),
      kb(b, d),
      b.node
    );
  }
  function kb(a, b) {
    if ((lb(a.line, a, b, !0), a.rest))
      for (var c = 0; c < a.rest.length; c++) lb(a.rest[c], a, b, !1);
  }
  function lb(a, b, c, d) {
    if (a.widgets)
      for (var e = cb(b), f = 0, g = a.widgets; f < g.length; ++f) {
        var h = g[f],
          i = Lg("div", [h.node], "CodeMirror-linewidget");
        h.handleMouseEvents || (i.ignoreEvents = !0),
          mb(h, i, b, c),
          d && h.above
            ? e.insertBefore(i, b.gutter || b.text)
            : e.appendChild(i),
          jg(h, "redraw");
      }
  }
  function mb(a, b, c, d) {
    if (a.noHScroll) {
      (c.alignable || (c.alignable = [])).push(b);
      var e = d.wrapperWidth;
      (b.style.left = d.fixedPos + "px"),
        a.coverGutter ||
          ((e -= d.gutterTotalWidth),
          (b.style.paddingLeft = d.gutterTotalWidth + "px")),
        (b.style.width = e + "px");
    }
    a.coverGutter &&
      ((b.style.zIndex = 5),
      (b.style.position = "relative"),
      a.noHScroll || (b.style.marginLeft = -d.gutterTotalWidth + "px"));
  }
  function pb(a) {
    return nb(a.line, a.ch);
  }
  function qb(a, b) {
    return ob(a, b) < 0 ? b : a;
  }
  function rb(a, b) {
    return ob(a, b) < 0 ? a : b;
  }
  function sb(a, b) {
    (this.ranges = a), (this.primIndex = b);
  }
  function tb(a, b) {
    (this.anchor = a), (this.head = b);
  }
  function ub(a, b) {
    var c = a[b];
    a.sort(function (a, b) {
      return ob(a.from(), b.from());
    }),
      (b = Bg(a, c));
    for (var d = 1; d < a.length; d++) {
      var e = a[d],
        f = a[d - 1];
      if (ob(f.to(), e.from()) >= 0) {
        var g = rb(f.from(), e.from()),
          h = qb(f.to(), e.to()),
          i = f.empty() ? e.from() == e.head : f.from() == f.head;
        b >= d && --b, a.splice(--d, 2, new tb(i ? h : g, i ? g : h));
      }
    }
    return new sb(a, b);
  }
  function vb(a, b) {
    return new sb([new tb(a, b || a)], 0);
  }
  function wb(a, b) {
    return Math.max(a.first, Math.min(b, a.first + a.size - 1));
  }
  function xb(a, b) {
    if (b.line < a.first) return nb(a.first, 0);
    var c = a.first + a.size - 1;
    return b.line > c
      ? nb(c, Df(a, c).text.length)
      : yb(b, Df(a, b.line).text.length);
  }
  function yb(a, b) {
    var c = a.ch;
    return null == c || c > b ? nb(a.line, b) : 0 > c ? nb(a.line, 0) : a;
  }
  function zb(a, b) {
    return b >= a.first && b < a.first + a.size;
  }
  function Ab(a, b) {
    for (var c = [], d = 0; d < b.length; d++) c[d] = xb(a, b[d]);
    return c;
  }
  function Bb(a, b, c, d) {
    if ((a.cm && a.cm.display.shift) || a.extend) {
      var e = b.anchor;
      if (d) {
        var f = ob(c, e) < 0;
        f != ob(d, e) < 0 ? ((e = c), (c = d)) : f != ob(c, d) < 0 && (c = d);
      }
      return new tb(e, c);
    }
    return new tb(d || c, c);
  }
  function Cb(a, b, c, d) {
    Ib(a, new sb([Bb(a, a.sel.primary(), b, c)], 0), d);
  }
  function Db(a, b, c) {
    for (var d = [], e = 0; e < a.sel.ranges.length; e++)
      d[e] = Bb(a, a.sel.ranges[e], b[e], null);
    var f = ub(d, a.sel.primIndex);
    Ib(a, f, c);
  }
  function Eb(a, b, c, d) {
    var e = a.sel.ranges.slice(0);
    (e[b] = c), Ib(a, ub(e, a.sel.primIndex), d);
  }
  function Fb(a, b, c, d) {
    Ib(a, vb(b, c), d);
  }
  function Gb(a, b) {
    var c = {
      ranges: b.ranges,
      update: function (b) {
        this.ranges = [];
        for (var c = 0; c < b.length; c++)
          this.ranges[c] = new tb(xb(a, b[c].anchor), xb(a, b[c].head));
      },
    };
    return (
      gg(a, "beforeSelectionChange", a, c),
      a.cm && gg(a.cm, "beforeSelectionChange", a.cm, c),
      c.ranges != b.ranges ? ub(c.ranges, c.ranges.length - 1) : b
    );
  }
  function Hb(a, b, c) {
    var d = a.history.done,
      e = zg(d);
    e && e.ranges ? ((d[d.length - 1] = b), Jb(a, b, c)) : Ib(a, b, c);
  }
  function Ib(a, b, c) {
    Jb(a, b, c), Rf(a, a.sel, a.cm ? a.cm.curOp.id : 0 / 0, c);
  }
  function Jb(a, b, c) {
    (ng(a, "beforeSelectionChange") ||
      (a.cm && ng(a.cm, "beforeSelectionChange"))) &&
      (b = Gb(a, b));
    var d = ob(b.primary().head, a.sel.primary().head) < 0 ? -1 : 1;
    Kb(a, Mb(a, b, d, !0)), (c && c.scroll === !1) || !a.cm || Rd(a.cm);
  }
  function Kb(a, b) {
    b.equals(a.sel) ||
      ((a.sel = b),
      a.cm &&
        ((a.cm.curOp.updateInput = a.cm.curOp.selectionChanged = !0), mg(a.cm)),
      jg(a, "cursorActivity", a));
  }
  function Lb(a) {
    Kb(a, Mb(a, a.sel, null, !1), rg);
  }
  function Mb(a, b, c, d) {
    for (var e, f = 0; f < b.ranges.length; f++) {
      var g = b.ranges[f],
        h = Nb(a, g.anchor, c, d),
        i = Nb(a, g.head, c, d);
      (e || h != g.anchor || i != g.head) &&
        (e || (e = b.ranges.slice(0, f)), (e[f] = new tb(h, i)));
    }
    return e ? ub(e, b.primIndex) : b;
  }
  function Nb(a, b, c, d) {
    var e = !1,
      f = b,
      g = c || 1;
    a.cantEdit = !1;
    a: for (;;) {
      var h = Df(a, f.line);
      if (h.markedSpans)
        for (var i = 0; i < h.markedSpans.length; ++i) {
          var j = h.markedSpans[i],
            k = j.marker;
          if (
            (null == j.from ||
              (k.inclusiveLeft ? j.from <= f.ch : j.from < f.ch)) &&
            (null == j.to || (k.inclusiveRight ? j.to >= f.ch : j.to > f.ch))
          ) {
            if (d && (gg(k, "beforeCursorEnter"), k.explicitlyCleared)) {
              if (h.markedSpans) {
                --i;
                continue;
              }
              break;
            }
            if (!k.atomic) continue;
            var l = k.find(0 > g ? -1 : 1);
            if (
              0 == ob(l, f) &&
              ((l.ch += g),
              l.ch < 0
                ? (l = l.line > a.first ? xb(a, nb(l.line - 1)) : null)
                : l.ch > h.text.length &&
                  (l =
                    l.line < a.first + a.size - 1 ? nb(l.line + 1, 0) : null),
              !l)
            ) {
              if (e)
                return d
                  ? ((a.cantEdit = !0), nb(a.first, 0))
                  : Nb(a, b, c, !0);
              (e = !0), (l = b), (g = -g);
            }
            f = l;
            continue a;
          }
        }
      return f;
    }
  }
  function Ob(a) {
    for (
      var b = a.display,
        c = a.doc,
        d = document.createDocumentFragment(),
        e = document.createDocumentFragment(),
        f = 0;
      f < c.sel.ranges.length;
      f++
    ) {
      var g = c.sel.ranges[f],
        h = g.empty();
      (h || a.options.showCursorWhenSelecting) && Pb(a, g, d), h || Qb(a, g, e);
    }
    if (a.options.moveInputWithCursor) {
      var i = oc(a, c.sel.primary().head, "div"),
        j = b.wrapper.getBoundingClientRect(),
        k = b.lineDiv.getBoundingClientRect(),
        l = Math.max(
          0,
          Math.min(b.wrapper.clientHeight - 10, i.top + k.top - j.top),
        ),
        m = Math.max(
          0,
          Math.min(b.wrapper.clientWidth - 10, i.left + k.left - j.left),
        );
      (b.inputDiv.style.top = l + "px"), (b.inputDiv.style.left = m + "px");
    }
    Og(b.cursorDiv, d), Og(b.selectionDiv, e);
  }
  function Pb(a, b, c) {
    var d = oc(a, b.head, "div"),
      e = c.appendChild(Lg("div", "\xa0", "CodeMirror-cursor"));
    if (
      ((e.style.left = d.left + "px"),
      (e.style.top = d.top + "px"),
      (e.style.height =
        Math.max(0, d.bottom - d.top) * a.options.cursorHeight + "px"),
      d.other)
    ) {
      var f = c.appendChild(
        Lg("div", "\xa0", "CodeMirror-cursor CodeMirror-secondarycursor"),
      );
      (f.style.display = ""),
        (f.style.left = d.other.left + "px"),
        (f.style.top = d.other.top + "px"),
        (f.style.height = 0.85 * (d.other.bottom - d.other.top) + "px");
    }
  }
  function Qb(a, b, c) {
    function j(a, b, c, d) {
      0 > b && (b = 0),
        (b = Math.round(b)),
        (d = Math.round(d)),
        f.appendChild(
          Lg(
            "div",
            null,
            "CodeMirror-selected",
            "position: absolute; left: " +
              a +
              "px; top: " +
              b +
              "px; width: " +
              (null == c ? i - a : c) +
              "px; height: " +
              (d - b) +
              "px",
          ),
        );
    }
    function k(b, c, d) {
      function m(c, d) {
        return nc(a, nb(b, c), "div", f, d);
      }
      var k,
        l,
        f = Df(e, b),
        g = f.text.length;
      return (
        ih(Kf(f), c || 0, null == d ? g : d, function (a, b, e) {
          var n,
            o,
            p,
            f = m(a, "left");
          if (a == b) (n = f), (o = p = f.left);
          else {
            if (((n = m(b - 1, "right")), "rtl" == e)) {
              var q = f;
              (f = n), (n = q);
            }
            (o = f.left), (p = n.right);
          }
          null == c && 0 == a && (o = h),
            n.top - f.top > 3 &&
              (j(o, f.top, null, f.bottom),
              (o = h),
              f.bottom < n.top && j(o, f.bottom, null, n.top)),
            null == d && b == g && (p = i),
            (!k || f.top < k.top || (f.top == k.top && f.left < k.left)) &&
              (k = f),
            (!l ||
              n.bottom > l.bottom ||
              (n.bottom == l.bottom && n.right > l.right)) &&
              (l = n),
            h + 1 > o && (o = h),
            j(o, n.top, p - o, n.bottom);
        }),
        { start: k, end: l }
      );
    }
    var d = a.display,
      e = a.doc,
      f = document.createDocumentFragment(),
      g = Yb(a.display),
      h = g.left,
      i = d.lineSpace.offsetWidth - g.right,
      l = b.from(),
      m = b.to();
    if (l.line == m.line) k(l.line, l.ch, m.ch);
    else {
      var n = Df(e, l.line),
        o = Df(e, m.line),
        p = Qe(n) == Qe(o),
        q = k(l.line, l.ch, p ? n.text.length + 1 : null).end,
        r = k(m.line, p ? 0 : null, m.ch).start;
      p &&
        (q.top < r.top - 2
          ? (j(q.right, q.top, null, q.bottom), j(h, r.top, r.left, r.bottom))
          : j(q.right, q.top, r.left - q.right, q.bottom)),
        q.bottom < r.top && j(h, q.bottom, null, r.top);
    }
    c.appendChild(f);
  }
  function Rb(a) {
    if (a.state.focused) {
      var b = a.display;
      clearInterval(b.blinker);
      var c = !0;
      (b.cursorDiv.style.visibility = ""),
        a.options.cursorBlinkRate > 0 &&
          (b.blinker = setInterval(function () {
            b.cursorDiv.style.visibility = (c = !c) ? "" : "hidden";
          }, a.options.cursorBlinkRate));
    }
  }
  function Sb(a, b) {
    a.doc.mode.startState &&
      a.doc.frontier < a.display.viewTo &&
      a.state.highlight.set(b, Fg(Tb, a));
  }
  function Tb(a) {
    var b = a.doc;
    if (
      (b.frontier < b.first && (b.frontier = b.first),
      !(b.frontier >= a.display.viewTo))
    ) {
      var c = +new Date() + a.options.workTime,
        d = ge(b.mode, Vb(a, b.frontier));
      zc(a, function () {
        b.iter(
          b.frontier,
          Math.min(b.first + b.size, a.display.viewTo + 500),
          function (e) {
            if (b.frontier >= a.display.viewFrom) {
              var f = e.styles,
                g = ff(a, e, d, !0);
              (e.styles = g.styles),
                g.classes
                  ? (e.styleClasses = g.classes)
                  : e.styleClasses && (e.styleClasses = null);
              for (
                var h = !f || f.length != e.styles.length, i = 0;
                !h && i < f.length;
                ++i
              )
                h = f[i] != e.styles[i];
              h && Gc(a, b.frontier, "text"), (e.stateAfter = ge(b.mode, d));
            } else
              hf(a, e.text, d),
                (e.stateAfter = 0 == b.frontier % 5 ? ge(b.mode, d) : null);
            return (
              ++b.frontier,
              +new Date() > c ? (Sb(a, a.options.workDelay), !0) : void 0
            );
          },
        );
      });
    }
  }
  function Ub(a, b, c) {
    for (
      var d,
        e,
        f = a.doc,
        g = c ? -1 : b - (a.doc.mode.innerMode ? 1e3 : 100),
        h = b;
      h > g;
      --h
    ) {
      if (h <= f.first) return f.first;
      var i = Df(f, h - 1);
      if (i.stateAfter && (!c || h <= f.frontier)) return h;
      var j = vg(i.text, null, a.options.tabSize);
      (null == e || d > j) && ((e = h - 1), (d = j));
    }
    return e;
  }
  function Vb(a, b, c) {
    var d = a.doc,
      e = a.display;
    if (!d.mode.startState) return !0;
    var f = Ub(a, b, c),
      g = f > d.first && Df(d, f - 1).stateAfter;
    return (
      (g = g ? ge(d.mode, g) : he(d.mode)),
      d.iter(f, b, function (c) {
        hf(a, c.text, g);
        var h = f == b - 1 || 0 == f % 5 || (f >= e.viewFrom && f < e.viewTo);
        (c.stateAfter = h ? ge(d.mode, g) : null), ++f;
      }),
      c && (d.frontier = f),
      g
    );
  }
  function Wb(a) {
    return a.lineSpace.offsetTop;
  }
  function Xb(a) {
    return a.mover.offsetHeight - a.lineSpace.offsetHeight;
  }
  function Yb(a) {
    if (a.cachedPaddingH) return a.cachedPaddingH;
    var b = Og(a.measure, Lg("pre", "x")),
      c = window.getComputedStyle ? window.getComputedStyle(b) : b.currentStyle,
      d = { left: parseInt(c.paddingLeft), right: parseInt(c.paddingRight) };
    return isNaN(d.left) || isNaN(d.right) || (a.cachedPaddingH = d), d;
  }
  function Zb(a, b, c) {
    var d = a.options.lineWrapping,
      e = d && a.display.scroller.clientWidth;
    if (!b.measure.heights || (d && b.measure.width != e)) {
      var f = (b.measure.heights = []);
      if (d) {
        b.measure.width = e;
        for (
          var g = b.text.firstChild.getClientRects(), h = 0;
          h < g.length - 1;
          h++
        ) {
          var i = g[h],
            j = g[h + 1];
          Math.abs(i.bottom - j.bottom) > 2 &&
            f.push((i.bottom + j.top) / 2 - c.top);
        }
      }
      f.push(c.bottom - c.top);
    }
  }
  function $b(a, b, c) {
    if (a.line == b) return { map: a.measure.map, cache: a.measure.cache };
    for (var d = 0; d < a.rest.length; d++)
      if (a.rest[d] == b)
        return { map: a.measure.maps[d], cache: a.measure.caches[d] };
    for (var d = 0; d < a.rest.length; d++)
      if (Hf(a.rest[d]) > c)
        return {
          map: a.measure.maps[d],
          cache: a.measure.caches[d],
          before: !0,
        };
  }
  function _b(a, b) {
    b = Qe(b);
    var c = Hf(b),
      d = (a.display.externalMeasured = new Dc(a.doc, b, c));
    d.lineN = c;
    var e = (d.built = mf(a, d));
    return (d.text = e.pre), Og(a.display.lineMeasure, e.pre), d;
  }
  function ac(a, b, c, d) {
    return dc(a, cc(a, b), c, d);
  }
  function bc(a, b) {
    if (b >= a.display.viewFrom && b < a.display.viewTo)
      return a.display.view[Ic(a, b)];
    var c = a.display.externalMeasured;
    return c && b >= c.lineN && b < c.lineN + c.size ? c : void 0;
  }
  function cc(a, b) {
    var c = Hf(b),
      d = bc(a, c);
    d && !d.text ? (d = null) : d && d.changes && bb(a, d, c, _(a)),
      d || (d = _b(a, b));
    var e = $b(d, b, c);
    return {
      line: b,
      view: d,
      rect: null,
      map: e.map,
      cache: e.cache,
      before: e.before,
      hasHeights: !1,
    };
  }
  function dc(a, b, c, d) {
    b.before && (c = -1);
    var f,
      e = c + (d || "");
    return (
      b.cache.hasOwnProperty(e)
        ? (f = b.cache[e])
        : (b.rect || (b.rect = b.view.text.getBoundingClientRect()),
          b.hasHeights || (Zb(a, b.view, b.rect), (b.hasHeights = !0)),
          (f = fc(a, b, c, d)),
          f.bogus || (b.cache[e] = f)),
      { left: f.left, right: f.right, top: f.top, bottom: f.bottom }
    );
  }
  function fc(a, b, c, e) {
    for (var h, i, j, k, f = b.map, l = 0; l < f.length; l += 3) {
      var m = f[l],
        n = f[l + 1];
      if (
        (m > c
          ? ((i = 0), (j = 1), (k = "left"))
          : n > c
            ? ((i = c - m), (j = i + 1))
            : (l == f.length - 3 || (c == n && f[l + 3] > c)) &&
              ((j = n - m), (i = j - 1), c >= n && (k = "right")),
        null != i)
      ) {
        if (
          ((h = f[l + 2]),
          m == n && e == (h.insertLeft ? "left" : "right") && (k = e),
          "left" == e && 0 == i)
        )
          for (; l && f[l - 2] == f[l - 3] && f[l - 1].insertLeft; )
            (h = f[(l -= 3) + 2]), (k = "left");
        if ("right" == e && i == n - m)
          for (
            ;
            l < f.length - 3 && f[l + 3] == f[l + 4] && !f[l + 5].insertLeft;

          )
            (h = f[(l += 3) + 2]), (k = "right");
        break;
      }
    }
    var o;
    if (3 == h.nodeType) {
      for (; i && Kg(b.line.text.charAt(m + i)); ) --i;
      for (; n > m + j && Kg(b.line.text.charAt(m + j)); ) ++j;
      if (d && 0 == i && j == n - m) o = h.parentNode.getBoundingClientRect();
      else if (g && a.options.lineWrapping) {
        var p = Mg(h, i, j).getClientRects();
        o = p.length ? p["right" == e ? p.length - 1 : 0] : ec;
      } else o = Mg(h, i, j).getBoundingClientRect() || ec;
    } else {
      i > 0 && (k = e = "right");
      var p;
      o =
        a.options.lineWrapping && (p = h.getClientRects()).length > 1
          ? p["right" == e ? p.length - 1 : 0]
          : h.getBoundingClientRect();
    }
    if (d && !i && (!o || (!o.left && !o.right))) {
      var q = h.parentNode.getClientRects()[0];
      o = q
        ? {
            left: q.left,
            right: q.left + vc(a.display),
            top: q.top,
            bottom: q.bottom,
          }
        : ec;
    }
    for (
      var r,
        s = (o.bottom + o.top) / 2 - b.rect.top,
        t = b.view.measure.heights,
        l = 0;
      l < t.length - 1 && !(s < t[l]);
      l++
    );
    (r = l ? t[l - 1] : 0), (s = t[l]);
    var u = {
      left: ("right" == k ? o.right : o.left) - b.rect.left,
      right: ("left" == k ? o.left : o.right) - b.rect.left,
      top: r,
      bottom: s,
    };
    return o.left || o.right || (u.bogus = !0), u;
  }
  function gc(a) {
    if (
      a.measure &&
      ((a.measure.cache = {}), (a.measure.heights = null), a.rest)
    )
      for (var b = 0; b < a.rest.length; b++) a.measure.caches[b] = {};
  }
  function hc(a) {
    (a.display.externalMeasure = null), Ng(a.display.lineMeasure);
    for (var b = 0; b < a.display.view.length; b++) gc(a.display.view[b]);
  }
  function ic(a) {
    hc(a),
      (a.display.cachedCharWidth =
        a.display.cachedTextHeight =
        a.display.cachedPaddingH =
          null),
      a.options.lineWrapping || (a.display.maxLineChanged = !0),
      (a.display.lineNumChars = null);
  }
  function jc() {
    return (
      window.pageXOffset ||
      (document.documentElement || document.body).scrollLeft
    );
  }
  function kc() {
    return (
      window.pageYOffset ||
      (document.documentElement || document.body).scrollTop
    );
  }
  function lc(a, b, c, d) {
    if (b.widgets)
      for (var e = 0; e < b.widgets.length; ++e)
        if (b.widgets[e].above) {
          var f = Ye(b.widgets[e]);
          (c.top += f), (c.bottom += f);
        }
    if ("line" == d) return c;
    d || (d = "local");
    var g = Jf(b);
    if (
      ("local" == d ? (g += Wb(a.display)) : (g -= a.display.viewOffset),
      "page" == d || "window" == d)
    ) {
      var h = a.display.lineSpace.getBoundingClientRect();
      g += h.top + ("window" == d ? 0 : kc());
      var i = h.left + ("window" == d ? 0 : jc());
      (c.left += i), (c.right += i);
    }
    return (c.top += g), (c.bottom += g), c;
  }
  function mc(a, b, c) {
    if ("div" == c) return b;
    var d = b.left,
      e = b.top;
    if ("page" == c) (d -= jc()), (e -= kc());
    else if ("local" == c || !c) {
      var f = a.display.sizer.getBoundingClientRect();
      (d += f.left), (e += f.top);
    }
    var g = a.display.lineSpace.getBoundingClientRect();
    return { left: d - g.left, top: e - g.top };
  }
  function nc(a, b, c, d, e) {
    return d || (d = Df(a.doc, b.line)), lc(a, d, ac(a, d, b.ch, e), c);
  }
  function oc(a, b, c, d, e) {
    function f(b, f) {
      var g = dc(a, e, b, f ? "right" : "left");
      return f ? (g.left = g.right) : (g.right = g.left), lc(a, d, g, c);
    }
    function g(a, b) {
      var c = h[b],
        d = c.level % 2;
      return (
        a == jh(c) && b && c.level < h[b - 1].level
          ? ((c = h[--b]), (a = kh(c) - (c.level % 2 ? 0 : 1)), (d = !0))
          : a == kh(c) &&
            b < h.length - 1 &&
            c.level < h[b + 1].level &&
            ((c = h[++b]), (a = jh(c) - (c.level % 2)), (d = !1)),
        d && a == c.to && a > c.from ? f(a - 1) : f(a, d)
      );
    }
    (d = d || Df(a.doc, b.line)), e || (e = cc(a, d));
    var h = Kf(d),
      i = b.ch;
    if (!h) return f(i);
    var j = rh(h, i),
      k = g(i, j);
    return null != qh && (k.other = g(i, qh)), k;
  }
  function pc(a, b) {
    var c = 0,
      b = xb(a.doc, b);
    a.options.lineWrapping || (c = vc(a.display) * b.ch);
    var d = Df(a.doc, b.line),
      e = Jf(d) + Wb(a.display);
    return { left: c, right: c, top: e, bottom: e + d.height };
  }
  function qc(a, b, c, d) {
    var e = nb(a, b);
    return (e.xRel = d), c && (e.outside = !0), e;
  }
  function rc(a, b, c) {
    var d = a.doc;
    if (((c += a.display.viewOffset), 0 > c)) return qc(d.first, 0, !0, -1);
    var e = If(d, c),
      f = d.first + d.size - 1;
    if (e > f) return qc(d.first + d.size - 1, Df(d, f).text.length, !0, 1);
    0 > b && (b = 0);
    for (var g = Df(d, e); ; ) {
      var h = sc(a, g, e, b, c),
        i = Oe(g),
        j = i && i.find(0, !0);
      if (!i || !(h.ch > j.from.ch || (h.ch == j.from.ch && h.xRel > 0)))
        return h;
      e = Hf((g = j.to.line));
    }
  }
  function sc(a, b, c, d, e) {
    function j(d) {
      var e = oc(a, nb(c, d), "line", b, i);
      return (
        (g = !0),
        f > e.bottom ? e.left - h : f < e.top ? e.left + h : ((g = !1), e.left)
      );
    }
    var f = e - Jf(b),
      g = !1,
      h = 2 * a.display.wrapper.clientWidth,
      i = cc(a, b),
      k = Kf(b),
      l = b.text.length,
      m = lh(b),
      n = mh(b),
      o = j(m),
      p = g,
      q = j(n),
      r = g;
    if (d > q) return qc(c, n, r, 1);
    for (;;) {
      if (k ? n == m || n == th(b, m, 1) : 1 >= n - m) {
        for (
          var s = o > d || q - d >= d - o ? m : n, t = d - (s == m ? o : q);
          Kg(b.text.charAt(s));

        )
          ++s;
        var u = qc(c, s, s == m ? p : r, -1 > t ? -1 : t > 1 ? 1 : 0);
        return u;
      }
      var v = Math.ceil(l / 2),
        w = m + v;
      if (k) {
        w = m;
        for (var x = 0; v > x; ++x) w = th(b, w, 1);
      }
      var y = j(w);
      y > d
        ? ((n = w), (q = y), (r = g) && (q += 1e3), (l = v))
        : ((m = w), (o = y), (p = g), (l -= v));
    }
  }
  function uc(a) {
    if (null != a.cachedTextHeight) return a.cachedTextHeight;
    if (null == tc) {
      tc = Lg("pre");
      for (var b = 0; 49 > b; ++b)
        tc.appendChild(document.createTextNode("x")), tc.appendChild(Lg("br"));
      tc.appendChild(document.createTextNode("x"));
    }
    Og(a.measure, tc);
    var c = tc.offsetHeight / 50;
    return c > 3 && (a.cachedTextHeight = c), Ng(a.measure), c || 1;
  }
  function vc(a) {
    if (null != a.cachedCharWidth) return a.cachedCharWidth;
    var b = Lg("span", "xxxxxxxxxx"),
      c = Lg("pre", [b]);
    Og(a.measure, c);
    var d = b.getBoundingClientRect(),
      e = (d.right - d.left) / 10;
    return e > 2 && (a.cachedCharWidth = e), e || 10;
  }
  function xc(a) {
    (a.curOp = {
      viewChanged: !1,
      startHeight: a.doc.height,
      forceUpdate: !1,
      updateInput: null,
      typing: !1,
      changeObjs: null,
      cursorActivityHandlers: null,
      selectionChanged: !1,
      updateMaxLine: !1,
      scrollLeft: null,
      scrollTop: null,
      scrollToPos: null,
      id: ++wc,
    }),
      ig++ || (hg = []);
  }
  function yc(a) {
    var b = a.curOp,
      c = a.doc,
      d = a.display;
    if (
      ((a.curOp = null),
      b.updateMaxLine && L(a),
      b.viewChanged ||
        b.forceUpdate ||
        null != b.scrollTop ||
        (b.scrollToPos &&
          (b.scrollToPos.from.line < d.viewFrom ||
            b.scrollToPos.to.line >= d.viewTo)) ||
        (d.maxLineChanged && a.options.lineWrapping))
    ) {
      var e = U(a, { top: b.scrollTop, ensure: b.scrollToPos }, b.forceUpdate);
      a.display.scroller.offsetHeight &&
        (a.doc.scrollTop = a.display.scroller.scrollTop);
    }
    if (
      (!e && b.selectionChanged && Ob(a),
      e || b.startHeight == a.doc.height || O(a),
      null != b.scrollTop && d.scroller.scrollTop != b.scrollTop)
    ) {
      var f = Math.max(
        0,
        Math.min(
          d.scroller.scrollHeight - d.scroller.clientHeight,
          b.scrollTop,
        ),
      );
      d.scroller.scrollTop = d.scrollbarV.scrollTop = c.scrollTop = f;
    }
    if (null != b.scrollLeft && d.scroller.scrollLeft != b.scrollLeft) {
      var g = Math.max(
        0,
        Math.min(d.scroller.scrollWidth - d.scroller.clientWidth, b.scrollLeft),
      );
      (d.scroller.scrollLeft = d.scrollbarH.scrollLeft = c.scrollLeft = g),
        Q(a);
    }
    if (b.scrollToPos) {
      var h = Nd(
        a,
        xb(a.doc, b.scrollToPos.from),
        xb(a.doc, b.scrollToPos.to),
        b.scrollToPos.margin,
      );
      b.scrollToPos.isCursor && a.state.focused && Md(a, h);
    }
    b.selectionChanged && Rb(a),
      a.state.focused && b.updateInput && Pc(a, b.typing);
    var i = b.maybeHiddenMarkers,
      j = b.maybeUnhiddenMarkers;
    if (i)
      for (var k = 0; k < i.length; ++k) i[k].lines.length || gg(i[k], "hide");
    if (j)
      for (var k = 0; k < j.length; ++k)
        j[k].lines.length && gg(j[k], "unhide");
    var l;
    if (
      (--ig || ((l = hg), (hg = null)),
      b.changeObjs && gg(a, "changes", a, b.changeObjs),
      l)
    )
      for (var k = 0; k < l.length; ++k) l[k]();
    if (b.cursorActivityHandlers)
      for (var k = 0; k < b.cursorActivityHandlers.length; k++)
        b.cursorActivityHandlers[k](a);
  }
  function zc(a, b) {
    if (a.curOp) return b();
    xc(a);
    try {
      return b();
    } finally {
      yc(a);
    }
  }
  function Ac(a, b) {
    return function () {
      if (a.curOp) return b.apply(a, arguments);
      xc(a);
      try {
        return b.apply(a, arguments);
      } finally {
        yc(a);
      }
    };
  }
  function Bc(a) {
    return function () {
      if (this.curOp) return a.apply(this, arguments);
      xc(this);
      try {
        return a.apply(this, arguments);
      } finally {
        yc(this);
      }
    };
  }
  function Cc(a) {
    return function () {
      var b = this.cm;
      if (!b || b.curOp) return a.apply(this, arguments);
      xc(b);
      try {
        return a.apply(this, arguments);
      } finally {
        yc(b);
      }
    };
  }
  function Dc(a, b, c) {
    (this.line = b),
      (this.rest = Re(b)),
      (this.size = this.rest ? Hf(zg(this.rest)) - c + 1 : 1),
      (this.node = this.text = null),
      (this.hidden = Ue(a, b));
  }
  function Ec(a, b, c) {
    for (var e, d = [], f = b; c > f; f = e) {
      var g = new Dc(a.doc, Df(a.doc, f), f);
      (e = f + g.size), d.push(g);
    }
    return d;
  }
  function Fc(a, b, c, d) {
    null == b && (b = a.doc.first),
      null == c && (c = a.doc.first + a.doc.size),
      d || (d = 0);
    var e = a.display;
    if (
      (d &&
        c < e.viewTo &&
        (null == e.updateLineNumbers || e.updateLineNumbers > b) &&
        (e.updateLineNumbers = b),
      (a.curOp.viewChanged = !0),
      b >= e.viewTo)
    )
      x && Se(a.doc, b) < e.viewTo && Hc(a);
    else if (c <= e.viewFrom)
      x && Te(a.doc, c + d) > e.viewFrom
        ? Hc(a)
        : ((e.viewFrom += d), (e.viewTo += d));
    else if (b <= e.viewFrom && c >= e.viewTo) Hc(a);
    else if (b <= e.viewFrom) {
      var f = Jc(a, c, c + d, 1);
      f
        ? ((e.view = e.view.slice(f.index)),
          (e.viewFrom = f.lineN),
          (e.viewTo += d))
        : Hc(a);
    } else if (c >= e.viewTo) {
      var f = Jc(a, b, b, -1);
      f ? ((e.view = e.view.slice(0, f.index)), (e.viewTo = f.lineN)) : Hc(a);
    } else {
      var g = Jc(a, b, b, -1),
        h = Jc(a, c, c + d, 1);
      g && h
        ? ((e.view = e.view
            .slice(0, g.index)
            .concat(Ec(a, g.lineN, h.lineN))
            .concat(e.view.slice(h.index))),
          (e.viewTo += d))
        : Hc(a);
    }
    var i = e.externalMeasured;
    i &&
      (c < i.lineN
        ? (i.lineN += d)
        : b < i.lineN + i.size && (e.externalMeasured = null));
  }
  function Gc(a, b, c) {
    a.curOp.viewChanged = !0;
    var d = a.display,
      e = a.display.externalMeasured;
    if (
      (e && b >= e.lineN && b < e.lineN + e.size && (d.externalMeasured = null),
      !(b < d.viewFrom || b >= d.viewTo))
    ) {
      var f = d.view[Ic(a, b)];
      if (null != f.node) {
        var g = f.changes || (f.changes = []);
        -1 == Bg(g, c) && g.push(c);
      }
    }
  }
  function Hc(a) {
    (a.display.viewFrom = a.display.viewTo = a.doc.first),
      (a.display.view = []),
      (a.display.viewOffset = 0);
  }
  function Ic(a, b) {
    if (b >= a.display.viewTo) return null;
    if (((b -= a.display.viewFrom), 0 > b)) return null;
    for (var c = a.display.view, d = 0; d < c.length; d++)
      if (((b -= c[d].size), 0 > b)) return d;
  }
  function Jc(a, b, c, d) {
    var f,
      e = Ic(a, b),
      g = a.display.view;
    if (!x) return { index: e, lineN: c };
    for (var h = 0, i = a.display.viewFrom; e > h; h++) i += g[h].size;
    if (i != b) {
      if (d > 0) {
        if (e == g.length - 1) return null;
        (f = i + g[e].size - b), e++;
      } else f = i - b;
      (b += f), (c += f);
    }
    for (; Se(a.doc, c) != c; ) {
      if (e == (0 > d ? 0 : g.length - 1)) return null;
      (c += d * g[e - (0 > d ? 1 : 0)].size), (e += d);
    }
    return { index: e, lineN: c };
  }
  function Kc(a, b, c) {
    var d = a.display,
      e = d.view;
    0 == e.length || b >= d.viewTo || c <= d.viewFrom
      ? ((d.view = Ec(a, b, c)), (d.viewFrom = b))
      : (d.viewFrom > b
          ? (d.view = Ec(a, b, d.viewFrom).concat(d.view))
          : d.viewFrom < b && (d.view = d.view.slice(Ic(a, b))),
        (d.viewFrom = b),
        d.viewTo < c
          ? (d.view = d.view.concat(Ec(a, d.viewTo, c)))
          : d.viewTo > c && (d.view = d.view.slice(0, Ic(a, c)))),
      (d.viewTo = c);
  }
  function Lc(a) {
    for (var b = a.display.view, c = 0, d = 0; d < b.length; d++) {
      var e = b[d];
      e.hidden || (e.node && !e.changes) || ++c;
    }
    return c;
  }
  function Mc(a) {
    a.display.pollingFast ||
      a.display.poll.set(a.options.pollInterval, function () {
        Oc(a), a.state.focused && Mc(a);
      });
  }
  function Nc(a) {
    function c() {
      var d = Oc(a);
      d || b
        ? ((a.display.pollingFast = !1), Mc(a))
        : ((b = !0), a.display.poll.set(60, c));
    }
    var b = !1;
    (a.display.pollingFast = !0), a.display.poll.set(20, c);
  }
  function Oc(a) {
    var b = a.display.input,
      c = a.display.prevInput,
      e = a.doc;
    if (!a.state.focused || (fh(b) && !c) || Sc(a) || a.options.disableInput)
      return !1;
    a.state.pasteIncoming &&
      a.state.fakedLastChar &&
      ((b.value = b.value.substring(0, b.value.length - 1)),
      (a.state.fakedLastChar = !1));
    var f = b.value;
    if (f == c && !a.somethingSelected()) return !1;
    if (g && !d && a.display.inputHasSelection === f) return Pc(a), !1;
    var h = !a.curOp;
    h && xc(a),
      (a.display.shift = !1),
      8203 != f.charCodeAt(0) ||
        e.sel != a.display.selForContextMenu ||
        c ||
        (c = "\u200b");
    for (
      var i = 0, j = Math.min(c.length, f.length);
      j > i && c.charCodeAt(i) == f.charCodeAt(i);

    )
      ++i;
    for (
      var k = f.slice(i),
        l = eh(k),
        m =
          a.state.pasteIncoming &&
          l.length > 1 &&
          e.sel.ranges.length == l.length,
        n = e.sel.ranges.length - 1;
      n >= 0;
      n--
    ) {
      var o = e.sel.ranges[n],
        p = o.from(),
        q = o.to();
      i < c.length
        ? (p = nb(p.line, p.ch - (c.length - i)))
        : a.state.overwrite &&
          o.empty() &&
          !a.state.pasteIncoming &&
          (q = nb(
            q.line,
            Math.min(Df(e, q.line).text.length, q.ch + zg(l).length),
          ));
      var r = a.curOp.updateInput,
        s = {
          from: p,
          to: q,
          text: m ? [l[n]] : l,
          origin: a.state.pasteIncoming
            ? "paste"
            : a.state.cutIncoming
              ? "cut"
              : "+input",
        };
      if (
        (Fd(a.doc, s),
        jg(a, "inputRead", a, s),
        k &&
          !a.state.pasteIncoming &&
          a.options.electricChars &&
          a.options.smartIndent &&
          o.head.ch < 100 &&
          (!n || e.sel.ranges[n - 1].head.line != o.head.line))
      ) {
        var t = a.getModeAt(o.head);
        if (t.electricChars) {
          for (var u = 0; u < t.electricChars.length; u++)
            if (k.indexOf(t.electricChars.charAt(u)) > -1) {
              Td(a, o.head.line, "smart");
              break;
            }
        } else if (t.electricInput) {
          var v = zd(s);
          t.electricInput.test(Df(e, v.line).text.slice(0, v.ch)) &&
            Td(a, o.head.line, "smart");
        }
      }
    }
    return (
      Rd(a),
      (a.curOp.updateInput = r),
      (a.curOp.typing = !0),
      f.length > 1e3 || f.indexOf("\n") > -1
        ? (b.value = a.display.prevInput = "")
        : (a.display.prevInput = f),
      h && yc(a),
      (a.state.pasteIncoming = a.state.cutIncoming = !1),
      !0
    );
  }
  function Pc(a, b) {
    var c,
      e,
      f = a.doc;
    if (a.somethingSelected()) {
      a.display.prevInput = "";
      var h = f.sel.primary();
      c =
        gh &&
        (h.to().line - h.from().line > 100 ||
          (e = a.getSelection()).length > 1e3);
      var i = c ? "-" : e || a.getSelection();
      (a.display.input.value = i),
        a.state.focused && Ag(a.display.input),
        g && !d && (a.display.inputHasSelection = i);
    } else
      b ||
        ((a.display.prevInput = a.display.input.value = ""),
        g && !d && (a.display.inputHasSelection = null));
    a.display.inaccurateSelection = c;
  }
  function Qc(a) {
    "nocursor" == a.options.readOnly ||
      (q && Qg() == a.display.input) ||
      a.display.input.focus();
  }
  function Rc(a) {
    a.state.focused || (Qc(a), vd(a));
  }
  function Sc(a) {
    return a.options.readOnly || a.doc.cantEdit;
  }
  function Tc(a) {
    function e() {
      a.state.focused && setTimeout(Fg(Qc, a), 0);
    }
    function f(b) {
      lg(a, b) || bg(b);
    }
    function i(b) {
      if (a.somethingSelected())
        c.inaccurateSelection &&
          ((c.prevInput = ""),
          (c.inaccurateSelection = !1),
          (c.input.value = a.getSelection()),
          Ag(c.input));
      else {
        for (var d = "", e = [], f = 0; f < a.doc.sel.ranges.length; f++) {
          var g = a.doc.sel.ranges[f].head.line,
            h = { anchor: nb(g, 0), head: nb(g + 1, 0) };
          e.push(h), (d += a.getRange(h.anchor, h.head));
        }
        "cut" == b.type
          ? a.setSelections(e, null, rg)
          : ((c.prevInput = ""), (c.input.value = d), Ag(c.input));
      }
      "cut" == b.type && (a.state.cutIncoming = !0);
    }
    var c = a.display;
    eg(c.scroller, "mousedown", Ac(a, Xc)),
      b
        ? eg(
            c.scroller,
            "dblclick",
            Ac(a, function (b) {
              if (!lg(a, b)) {
                var c = Wc(a, b);
                if (c && !cd(a, b) && !Vc(a.display, b)) {
                  $f(b);
                  var d = Yd(a.doc, c);
                  Cb(a.doc, d.anchor, d.head);
                }
              }
            }),
          )
        : eg(c.scroller, "dblclick", function (b) {
            lg(a, b) || $f(b);
          }),
      eg(c.lineSpace, "selectstart", function (a) {
        Vc(c, a) || $f(a);
      }),
      v ||
        eg(c.scroller, "contextmenu", function (b) {
          xd(a, b);
        }),
      eg(c.scroller, "scroll", function () {
        c.scroller.clientHeight &&
          (gd(a, c.scroller.scrollTop),
          hd(a, c.scroller.scrollLeft, !0),
          gg(a, "scroll", a));
      }),
      eg(c.scrollbarV, "scroll", function () {
        c.scroller.clientHeight && gd(a, c.scrollbarV.scrollTop);
      }),
      eg(c.scrollbarH, "scroll", function () {
        c.scroller.clientHeight && hd(a, c.scrollbarH.scrollLeft);
      }),
      eg(c.scroller, "mousewheel", function (b) {
        kd(a, b);
      }),
      eg(c.scroller, "DOMMouseScroll", function (b) {
        kd(a, b);
      }),
      eg(c.scrollbarH, "mousedown", e),
      eg(c.scrollbarV, "mousedown", e),
      eg(c.wrapper, "scroll", function () {
        c.wrapper.scrollTop = c.wrapper.scrollLeft = 0;
      }),
      eg(c.input, "keyup", Ac(a, td)),
      eg(c.input, "input", function () {
        g &&
          !d &&
          a.display.inputHasSelection &&
          (a.display.inputHasSelection = null),
          Nc(a);
      }),
      eg(c.input, "keydown", Ac(a, rd)),
      eg(c.input, "keypress", Ac(a, ud)),
      eg(c.input, "focus", Fg(vd, a)),
      eg(c.input, "blur", Fg(wd, a)),
      a.options.dragDrop &&
        (eg(c.scroller, "dragstart", function (b) {
          fd(a, b);
        }),
        eg(c.scroller, "dragenter", f),
        eg(c.scroller, "dragover", f),
        eg(c.scroller, "drop", Ac(a, ed))),
      eg(c.scroller, "paste", function (b) {
        Vc(c, b) || ((a.state.pasteIncoming = !0), Qc(a), Nc(a));
      }),
      eg(c.input, "paste", function () {
        if (
          h &&
          !a.state.fakedLastChar &&
          !(new Date() - a.state.lastMiddleDown < 200)
        ) {
          var b = c.input.selectionStart,
            d = c.input.selectionEnd;
          (c.input.value += "$"),
            (c.input.selectionStart = b),
            (c.input.selectionEnd = d),
            (a.state.fakedLastChar = !0);
        }
        (a.state.pasteIncoming = !0), Nc(a);
      }),
      eg(c.input, "cut", i),
      eg(c.input, "copy", i),
      m &&
        eg(c.sizer, "mouseup", function () {
          Qg() == c.input && c.input.blur(), Qc(a);
        });
  }
  function Uc(a) {
    var b = a.display;
    (b.cachedCharWidth = b.cachedTextHeight = b.cachedPaddingH = null),
      a.setSize();
  }
  function Vc(a, b) {
    for (var c = cg(b); c != a.wrapper; c = c.parentNode)
      if (!c || c.ignoreEvents || (c.parentNode == a.sizer && c != a.mover))
        return !0;
  }
  function Wc(a, b, c, d) {
    var e = a.display;
    if (!c) {
      var f = cg(b);
      if (
        f == e.scrollbarH ||
        f == e.scrollbarV ||
        f == e.scrollbarFiller ||
        f == e.gutterFiller
      )
        return null;
    }
    var g,
      h,
      i = e.lineSpace.getBoundingClientRect();
    try {
      (g = b.clientX - i.left), (h = b.clientY - i.top);
    } catch (b) {
      return null;
    }
    var k,
      j = rc(a, g, h);
    if (d && 1 == j.xRel && (k = Df(a.doc, j.line).text).length == j.ch) {
      var l = vg(k, k.length, a.options.tabSize) - k.length;
      j = nb(
        j.line,
        Math.max(0, Math.round((g - Yb(a.display).left) / vc(a.display)) - l),
      );
    }
    return j;
  }
  function Xc(a) {
    if (!lg(this, a)) {
      var b = this,
        c = b.display;
      if (((c.shift = a.shiftKey), Vc(c, a)))
        return (
          h ||
            ((c.scroller.draggable = !1),
            setTimeout(function () {
              c.scroller.draggable = !0;
            }, 100)),
          void 0
        );
      if (!cd(b, a)) {
        var d = Wc(b, a);
        switch ((window.focus(), dg(a))) {
          case 1:
            d ? $c(b, a, d) : cg(a) == c.scroller && $f(a);
            break;
          case 2:
            h && (b.state.lastMiddleDown = +new Date()),
              d && Cb(b.doc, d),
              setTimeout(Fg(Qc, b), 20),
              $f(a);
            break;
          case 3:
            v && xd(b, a);
        }
      }
    }
  }
  function $c(a, b, c) {
    setTimeout(Fg(Rc, a), 0);
    var e,
      d = +new Date();
    Zc && Zc.time > d - 400 && 0 == ob(Zc.pos, c)
      ? (e = "triple")
      : Yc && Yc.time > d - 400 && 0 == ob(Yc.pos, c)
        ? ((e = "double"), (Zc = { time: d, pos: c }))
        : ((e = "single"), (Yc = { time: d, pos: c }));
    var f = a.doc.sel,
      g = r ? b.metaKey : b.ctrlKey;
    a.options.dragDrop &&
    Zg &&
    !g &&
    !Sc(a) &&
    "single" == e &&
    f.contains(c) > -1 &&
    f.somethingSelected()
      ? _c(a, b, c)
      : ad(a, b, c, e, g);
  }
  function _c(a, c, e) {
    var f = a.display,
      g = Ac(a, function (i) {
        h && (f.scroller.draggable = !1),
          (a.state.draggingText = !1),
          fg(document, "mouseup", g),
          fg(f.scroller, "drop", g),
          Math.abs(c.clientX - i.clientX) + Math.abs(c.clientY - i.clientY) <
            10 &&
            ($f(i),
            Cb(a.doc, e),
            Qc(a),
            b &&
              !d &&
              setTimeout(function () {
                document.body.focus(), Qc(a);
              }, 20));
      });
    h && (f.scroller.draggable = !0),
      (a.state.draggingText = g),
      f.scroller.dragDrop && f.scroller.dragDrop(),
      eg(document, "mouseup", g),
      eg(f.scroller, "drop", g);
  }
  function ad(a, b, c, d, f) {
    function p(b) {
      if (0 != ob(o, b))
        if (((o = b), "rect" == d)) {
          for (
            var e = [],
              f = a.options.tabSize,
              g = vg(Df(i, c.line).text, c.ch, f),
              h = vg(Df(i, b.line).text, b.ch, f),
              m = Math.min(g, h),
              n = Math.max(g, h),
              p = Math.min(c.line, b.line),
              q = Math.min(a.lastLine(), Math.max(c.line, b.line));
            q >= p;
            p++
          ) {
            var r = Df(i, p).text,
              s = wg(r, m, f);
            m == n
              ? e.push(new tb(nb(p, s), nb(p, s)))
              : r.length > s && e.push(new tb(nb(p, s), nb(p, wg(r, n, f))));
          }
          e.length || e.push(new tb(c, c)),
            Ib(i, ub(l.ranges.slice(0, k).concat(e), k), sg);
        } else {
          var t = j,
            u = t.anchor,
            v = b;
          if ("single" != d) {
            if ("double" == d) var w = Yd(i, b);
            else var w = new tb(nb(b.line, 0), xb(i, nb(b.line + 1, 0)));
            ob(w.anchor, u) > 0
              ? ((v = w.head), (u = rb(t.from(), w.anchor)))
              : ((v = w.anchor), (u = qb(t.to(), w.head)));
          }
          var e = l.ranges.slice(0);
          (e[k] = new tb(xb(i, u), v)), Ib(i, ub(e, k), sg);
        }
    }
    function s(b) {
      var c = ++r,
        e = Wc(a, b, !0, "rect" == d);
      if (e)
        if (0 != ob(e, o)) {
          Rc(a), p(e);
          var f = P(h, i);
          (e.line >= f.to || e.line < f.from) &&
            setTimeout(
              Ac(a, function () {
                r == c && s(b);
              }),
              150,
            );
        } else {
          var g = b.clientY < q.top ? -20 : b.clientY > q.bottom ? 20 : 0;
          g &&
            setTimeout(
              Ac(a, function () {
                r == c && ((h.scroller.scrollTop += g), s(b));
              }),
              50,
            );
        }
    }
    function t(b) {
      (r = 1 / 0),
        $f(b),
        Qc(a),
        fg(document, "mousemove", u),
        fg(document, "mouseup", v),
        (i.history.lastSelOrigin = null);
    }
    var h = a.display,
      i = a.doc;
    $f(b);
    var j,
      k,
      l = i.sel;
    if (
      (f && !b.shiftKey
        ? ((k = i.sel.contains(c)),
          (j = k > -1 ? i.sel.ranges[k] : new tb(c, c)))
        : (j = i.sel.primary()),
      b.altKey)
    )
      (d = "rect"), f || (j = new tb(c, c)), (c = Wc(a, b, !0, !0)), (k = -1);
    else if ("double" == d) {
      var m = Yd(i, c);
      j = a.display.shift || i.extend ? Bb(i, j, m.anchor, m.head) : m;
    } else if ("triple" == d) {
      var n = new tb(nb(c.line, 0), xb(i, nb(c.line + 1, 0)));
      j = a.display.shift || i.extend ? Bb(i, j, n.anchor, n.head) : n;
    } else j = Bb(i, j, c);
    f
      ? k > -1
        ? Eb(i, k, j, sg)
        : ((k = i.sel.ranges.length),
          Ib(i, ub(i.sel.ranges.concat([j]), k), {
            scroll: !1,
            origin: "*mouse",
          }))
      : ((k = 0), Ib(i, new sb([j], 0), sg), (l = i.sel));
    var o = c,
      q = h.wrapper.getBoundingClientRect(),
      r = 0,
      u = Ac(a, function (a) {
        (g && !e ? a.buttons : dg(a)) ? s(a) : t(a);
      }),
      v = Ac(a, t);
    eg(document, "mousemove", u), eg(document, "mouseup", v);
  }
  function bd(a, b, c, d, e) {
    try {
      var f = b.clientX,
        g = b.clientY;
    } catch (b) {
      return !1;
    }
    if (f >= Math.floor(a.display.gutters.getBoundingClientRect().right))
      return !1;
    d && $f(b);
    var h = a.display,
      i = h.lineDiv.getBoundingClientRect();
    if (g > i.bottom || !ng(a, c)) return ag(b);
    g -= i.top - h.viewOffset;
    for (var j = 0; j < a.options.gutters.length; ++j) {
      var k = h.gutters.childNodes[j];
      if (k && k.getBoundingClientRect().right >= f) {
        var l = If(a.doc, g),
          m = a.options.gutters[j];
        return e(a, c, a, l, m, b), ag(b);
      }
    }
  }
  function cd(a, b) {
    return bd(a, b, "gutterClick", !0, jg);
  }
  function ed(a) {
    var b = this;
    if (!lg(b, a) && !Vc(b.display, a)) {
      $f(a), g && (dd = +new Date());
      var c = Wc(b, a, !0),
        d = a.dataTransfer.files;
      if (c && !Sc(b))
        if (d && d.length && window.FileReader && window.File)
          for (
            var e = d.length,
              f = Array(e),
              h = 0,
              i = function (a, d) {
                var g = new FileReader();
                (g.onload = Ac(b, function () {
                  if (((f[d] = g.result), ++h == e)) {
                    c = xb(b.doc, c);
                    var a = {
                      from: c,
                      to: c,
                      text: eh(f.join("\n")),
                      origin: "paste",
                    };
                    Fd(b.doc, a), Hb(b.doc, vb(c, zd(a)));
                  }
                })),
                  g.readAsText(a);
              },
              j = 0;
            e > j;
            ++j
          )
            i(d[j], j);
        else {
          if (b.state.draggingText && b.doc.sel.contains(c) > -1)
            return b.state.draggingText(a), setTimeout(Fg(Qc, b), 20), void 0;
          try {
            var f = a.dataTransfer.getData("Text");
            if (f) {
              var k = b.state.draggingText && b.listSelections();
              if ((Jb(b.doc, vb(c, c)), k))
                for (var j = 0; j < k.length; ++j)
                  Ld(b.doc, "", k[j].anchor, k[j].head, "drag");
              b.replaceSelection(f, "around", "paste"), Qc(b);
            }
          } catch (a) {}
        }
    }
  }
  function fd(a, b) {
    if (g && (!a.state.draggingText || +new Date() - dd < 100))
      return bg(b), void 0;
    if (
      !lg(a, b) &&
      !Vc(a.display, b) &&
      (b.dataTransfer.setData("Text", a.getSelection()),
      b.dataTransfer.setDragImage && !l)
    ) {
      var c = Lg("img", null, null, "position: fixed; left: 0; top: 0;");
      (c.src =
        "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="),
        k &&
          ((c.width = c.height = 1),
          a.display.wrapper.appendChild(c),
          (c._top = c.offsetTop)),
        b.dataTransfer.setDragImage(c, 0, 0),
        k && c.parentNode.removeChild(c);
    }
  }
  function gd(b, c) {
    Math.abs(b.doc.scrollTop - c) < 2 ||
      ((b.doc.scrollTop = c),
      a || U(b, { top: c }),
      b.display.scroller.scrollTop != c && (b.display.scroller.scrollTop = c),
      b.display.scrollbarV.scrollTop != c &&
        (b.display.scrollbarV.scrollTop = c),
      a && U(b),
      Sb(b, 100));
  }
  function hd(a, b, c) {
    (c ? b == a.doc.scrollLeft : Math.abs(a.doc.scrollLeft - b) < 2) ||
      ((b = Math.min(
        b,
        a.display.scroller.scrollWidth - a.display.scroller.clientWidth,
      )),
      (a.doc.scrollLeft = b),
      Q(a),
      a.display.scroller.scrollLeft != b && (a.display.scroller.scrollLeft = b),
      a.display.scrollbarH.scrollLeft != b &&
        (a.display.scrollbarH.scrollLeft = b));
  }
  function kd(b, c) {
    var d = c.wheelDeltaX,
      e = c.wheelDeltaY;
    null == d && c.detail && c.axis == c.HORIZONTAL_AXIS && (d = c.detail),
      null == e && c.detail && c.axis == c.VERTICAL_AXIS
        ? (e = c.detail)
        : null == e && (e = c.wheelDelta);
    var f = b.display,
      g = f.scroller;
    if (
      (d && g.scrollWidth > g.clientWidth) ||
      (e && g.scrollHeight > g.clientHeight)
    ) {
      if (e && r && h)
        a: for (var i = c.target, j = f.view; i != g; i = i.parentNode)
          for (var l = 0; l < j.length; l++)
            if (j[l].node == i) {
              b.display.currentWheelTarget = i;
              break a;
            }
      if (d && !a && !k && null != jd)
        return (
          e &&
            gd(
              b,
              Math.max(
                0,
                Math.min(g.scrollTop + e * jd, g.scrollHeight - g.clientHeight),
              ),
            ),
          hd(
            b,
            Math.max(
              0,
              Math.min(g.scrollLeft + d * jd, g.scrollWidth - g.clientWidth),
            ),
          ),
          $f(c),
          (f.wheelStartX = null),
          void 0
        );
      if (e && null != jd) {
        var m = e * jd,
          n = b.doc.scrollTop,
          o = n + f.wrapper.clientHeight;
        0 > m
          ? (n = Math.max(0, n + m - 50))
          : (o = Math.min(b.doc.height, o + m + 50)),
          U(b, { top: n, bottom: o });
      }
      20 > id &&
        (null == f.wheelStartX
          ? ((f.wheelStartX = g.scrollLeft),
            (f.wheelStartY = g.scrollTop),
            (f.wheelDX = d),
            (f.wheelDY = e),
            setTimeout(function () {
              if (null != f.wheelStartX) {
                var a = g.scrollLeft - f.wheelStartX,
                  b = g.scrollTop - f.wheelStartY,
                  c =
                    (b && f.wheelDY && b / f.wheelDY) ||
                    (a && f.wheelDX && a / f.wheelDX);
                (f.wheelStartX = f.wheelStartY = null),
                  c && ((jd = (jd * id + c) / (id + 1)), ++id);
              }
            }, 200))
          : ((f.wheelDX += d), (f.wheelDY += e)));
    }
  }
  function ld(a, b, c) {
    if ("string" == typeof b && ((b = ie[b]), !b)) return !1;
    a.display.pollingFast && Oc(a) && (a.display.pollingFast = !1);
    var d = a.display.shift,
      e = !1;
    try {
      Sc(a) && (a.state.suppressEdits = !0),
        c && (a.display.shift = !1),
        (e = b(a) != qg);
    } finally {
      (a.display.shift = d), (a.state.suppressEdits = !1);
    }
    return e;
  }
  function md(a) {
    var b = a.state.keyMaps.slice(0);
    return (
      a.options.extraKeys && b.push(a.options.extraKeys),
      b.push(a.options.keyMap),
      b
    );
  }
  function od(a, b) {
    var c = ke(a.options.keyMap),
      d = c.auto;
    clearTimeout(nd),
      d &&
        !me(b) &&
        (nd = setTimeout(function () {
          ke(a.options.keyMap) == c &&
            ((a.options.keyMap = d.call ? d.call(null, a) : d), F(a));
        }, 50));
    var e = ne(b, !0),
      f = !1;
    if (!e) return !1;
    var g = md(a);
    return (
      (f = b.shiftKey
        ? le("Shift-" + e, g, function (b) {
            return ld(a, b, !0);
          }) ||
          le(e, g, function (b) {
            return ("string" == typeof b ? /^go[A-Z]/.test(b) : b.motion)
              ? ld(a, b)
              : void 0;
          })
        : le(e, g, function (b) {
            return ld(a, b);
          })),
      f && ($f(b), Rb(a), jg(a, "keyHandled", a, e, b)),
      f
    );
  }
  function pd(a, b, c) {
    var d = le("'" + c + "'", md(a), function (b) {
      return ld(a, b, !0);
    });
    return d && ($f(b), Rb(a), jg(a, "keyHandled", a, "'" + c + "'", b)), d;
  }
  function rd(a) {
    var c = this;
    if ((Rc(c), !lg(c, a))) {
      b && 27 == a.keyCode && (a.returnValue = !1);
      var d = a.keyCode;
      c.display.shift = 16 == d || a.shiftKey;
      var e = od(c, a);
      k &&
        ((qd = e ? d : null),
        !e &&
          88 == d &&
          !gh &&
          (r ? a.metaKey : a.ctrlKey) &&
          c.replaceSelection("", null, "cut")),
        18 != d ||
          /\bCodeMirror-crosshair\b/.test(c.display.lineDiv.className) ||
          sd(c);
    }
  }
  function sd(a) {
    function c(a) {
      (18 != a.keyCode && a.altKey) ||
        (Sg(b, "CodeMirror-crosshair"),
        fg(document, "keyup", c),
        fg(document, "mouseover", c));
    }
    var b = a.display.lineDiv;
    Tg(b, "CodeMirror-crosshair"),
      eg(document, "keyup", c),
      eg(document, "mouseover", c);
  }
  function td(a) {
    lg(this, a) || (16 == a.keyCode && (this.doc.sel.shift = !1));
  }
  function ud(a) {
    var b = this;
    if (!lg(b, a)) {
      var c = a.keyCode,
        e = a.charCode;
      if (k && c == qd) return (qd = null), $f(a), void 0;
      if (!((k && (!a.which || a.which < 10)) || m) || !od(b, a)) {
        var f = String.fromCharCode(null == e ? c : e);
        pd(b, a, f) || (g && !d && (b.display.inputHasSelection = null), Nc(b));
      }
    }
  }
  function vd(a) {
    "nocursor" != a.options.readOnly &&
      (a.state.focused ||
        (gg(a, "focus", a),
        (a.state.focused = !0),
        Tg(a.display.wrapper, "CodeMirror-focused"),
        a.curOp ||
          a.display.selForContextMenu == a.doc.sel ||
          (Pc(a), h && setTimeout(Fg(Pc, a, !0), 0))),
      Mc(a),
      Rb(a));
  }
  function wd(a) {
    a.state.focused &&
      (gg(a, "blur", a),
      (a.state.focused = !1),
      Sg(a.display.wrapper, "CodeMirror-focused")),
      clearInterval(a.display.blinker),
      setTimeout(function () {
        a.state.focused || (a.display.shift = !1);
      }, 150);
  }
  function xd(a, b) {
    function j() {
      if (null != c.input.selectionStart) {
        var b = a.somethingSelected(),
          d = (c.input.value = "\u200b" + (b ? c.input.value : ""));
        (c.prevInput = b ? "" : "\u200b"),
          (c.input.selectionStart = 1),
          (c.input.selectionEnd = d.length);
      }
    }
    function l() {
      if (
        ((c.inputDiv.style.position = "relative"),
        (c.input.style.cssText = i),
        d && (c.scrollbarV.scrollTop = c.scroller.scrollTop = f),
        Mc(a),
        null != c.input.selectionStart)
      ) {
        (!g || d) && j();
        var b = 0,
          e = function () {
            c.selForContextMenu == a.doc.sel && 0 == c.input.selectionStart
              ? Ac(a, ie.selectAll)(a)
              : b++ < 10
                ? (c.detectingSelectAll = setTimeout(e, 500))
                : Pc(a);
          };
        c.detectingSelectAll = setTimeout(e, 200);
      }
    }
    if (!lg(a, b, "contextmenu")) {
      var c = a.display;
      if (!Vc(c, b) && !yd(a, b)) {
        var e = Wc(a, b),
          f = c.scroller.scrollTop;
        if (e && !k) {
          var h = a.options.resetSelectionOnContextMenu;
          h && -1 == a.doc.sel.contains(e) && Ac(a, Ib)(a.doc, vb(e), rg);
          var i = c.input.style.cssText;
          if (
            ((c.inputDiv.style.position = "absolute"),
            (c.input.style.cssText =
              "position: fixed; width: 30px; height: 30px; top: " +
              (b.clientY - 5) +
              "px; left: " +
              (b.clientX - 5) +
              "px; z-index: 1000; background: " +
              (g ? "rgba(255, 255, 255, .05)" : "transparent") +
              "; outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);"),
            Qc(a),
            Pc(a),
            a.somethingSelected() || (c.input.value = c.prevInput = " "),
            (c.selForContextMenu = a.doc.sel),
            clearTimeout(c.detectingSelectAll),
            g && !d && j(),
            v)
          ) {
            bg(b);
            var m = function () {
              fg(window, "mouseup", m), setTimeout(l, 20);
            };
            eg(window, "mouseup", m);
          } else setTimeout(l, 50);
        }
      }
    }
  }
  function yd(a, b) {
    return ng(a, "gutterContextMenu")
      ? bd(a, b, "gutterContextMenu", !1, gg)
      : !1;
  }
  function Ad(a, b) {
    if (ob(a, b.from) < 0) return a;
    if (ob(a, b.to) <= 0) return zd(b);
    var c = a.line + b.text.length - (b.to.line - b.from.line) - 1,
      d = a.ch;
    return a.line == b.to.line && (d += zd(b).ch - b.to.ch), nb(c, d);
  }
  function Bd(a, b) {
    for (var c = [], d = 0; d < a.sel.ranges.length; d++) {
      var e = a.sel.ranges[d];
      c.push(new tb(Ad(e.anchor, b), Ad(e.head, b)));
    }
    return ub(c, a.sel.primIndex);
  }
  function Cd(a, b, c) {
    return a.line == b.line
      ? nb(c.line, a.ch - b.ch + c.ch)
      : nb(c.line + (a.line - b.line), a.ch);
  }
  function Dd(a, b, c) {
    for (var d = [], e = nb(a.first, 0), f = e, g = 0; g < b.length; g++) {
      var h = b[g],
        i = Cd(h.from, e, f),
        j = Cd(zd(h), e, f);
      if (((e = h.to), (f = j), "around" == c)) {
        var k = a.sel.ranges[g],
          l = ob(k.head, k.anchor) < 0;
        d[g] = new tb(l ? j : i, l ? i : j);
      } else d[g] = new tb(i, i);
    }
    return new sb(d, a.sel.primIndex);
  }
  function Ed(a, b, c) {
    var d = {
      canceled: !1,
      from: b.from,
      to: b.to,
      text: b.text,
      origin: b.origin,
      cancel: function () {
        this.canceled = !0;
      },
    };
    return (
      c &&
        (d.update = function (b, c, d, e) {
          b && (this.from = xb(a, b)),
            c && (this.to = xb(a, c)),
            d && (this.text = d),
            void 0 !== e && (this.origin = e);
        }),
      gg(a, "beforeChange", a, d),
      a.cm && gg(a.cm, "beforeChange", a.cm, d),
      d.canceled
        ? null
        : { from: d.from, to: d.to, text: d.text, origin: d.origin }
    );
  }
  function Fd(a, b, c) {
    if (a.cm) {
      if (!a.cm.curOp) return Ac(a.cm, Fd)(a, b, c);
      if (a.cm.state.suppressEdits) return;
    }
    if (
      !(ng(a, "beforeChange") || (a.cm && ng(a.cm, "beforeChange"))) ||
      (b = Ed(a, b, !0))
    ) {
      var d = w && !c && Ge(a, b.from, b.to);
      if (d)
        for (var e = d.length - 1; e >= 0; --e)
          Gd(a, { from: d[e].from, to: d[e].to, text: e ? [""] : b.text });
      else Gd(a, b);
    }
  }
  function Gd(a, b) {
    if (1 != b.text.length || "" != b.text[0] || 0 != ob(b.from, b.to)) {
      var c = Bd(a, b);
      Pf(a, b, c, a.cm ? a.cm.curOp.id : 0 / 0), Jd(a, b, c, De(a, b));
      var d = [];
      Bf(a, function (a, c) {
        c || -1 != Bg(d, a.history) || (Zf(a.history, b), d.push(a.history)),
          Jd(a, b, null, De(a, b));
      });
    }
  }
  function Hd(a, b, c) {
    if (!a.cm || !a.cm.state.suppressEdits) {
      for (
        var e,
          d = a.history,
          f = a.sel,
          g = "undo" == b ? d.done : d.undone,
          h = "undo" == b ? d.undone : d.done,
          i = 0;
        i < g.length &&
        ((e = g[i]), c ? !e.ranges || e.equals(a.sel) : e.ranges);
        i++
      );
      if (i != g.length) {
        for (d.lastOrigin = d.lastSelOrigin = null; (e = g.pop()), e.ranges; ) {
          if ((Sf(e, h), c && !e.equals(a.sel)))
            return Ib(a, e, { clearRedo: !1 }), void 0;
          f = e;
        }
        var j = [];
        Sf(f, h),
          h.push({ changes: j, generation: d.generation }),
          (d.generation = e.generation || ++d.maxGeneration);
        for (
          var k = ng(a, "beforeChange") || (a.cm && ng(a.cm, "beforeChange")),
            i = e.changes.length - 1;
          i >= 0;
          --i
        ) {
          var l = e.changes[i];
          if (((l.origin = b), k && !Ed(a, l, !1)))
            return (g.length = 0), void 0;
          j.push(Mf(a, l));
          var m = i ? Bd(a, l, null) : zg(g);
          Jd(a, l, m, Fe(a, l)), !i && a.cm && a.cm.scrollIntoView(l);
          var n = [];
          Bf(a, function (a, b) {
            b ||
              -1 != Bg(n, a.history) ||
              (Zf(a.history, l), n.push(a.history)),
              Jd(a, l, null, Fe(a, l));
          });
        }
      }
    }
  }
  function Id(a, b) {
    if (
      0 != b &&
      ((a.first += b),
      (a.sel = new sb(
        Cg(a.sel.ranges, function (a) {
          return new tb(
            nb(a.anchor.line + b, a.anchor.ch),
            nb(a.head.line + b, a.head.ch),
          );
        }),
        a.sel.primIndex,
      )),
      a.cm)
    ) {
      Fc(a.cm, a.first, a.first - b, b);
      for (var c = a.cm.display, d = c.viewFrom; d < c.viewTo; d++)
        Gc(a.cm, d, "gutter");
    }
  }
  function Jd(a, b, c, d) {
    if (a.cm && !a.cm.curOp) return Ac(a.cm, Jd)(a, b, c, d);
    if (b.to.line < a.first)
      return Id(a, b.text.length - 1 - (b.to.line - b.from.line)), void 0;
    if (!(b.from.line > a.lastLine())) {
      if (b.from.line < a.first) {
        var e = b.text.length - 1 - (a.first - b.from.line);
        Id(a, e),
          (b = {
            from: nb(a.first, 0),
            to: nb(b.to.line + e, b.to.ch),
            text: [zg(b.text)],
            origin: b.origin,
          });
      }
      var f = a.lastLine();
      b.to.line > f &&
        (b = {
          from: b.from,
          to: nb(f, Df(a, f).text.length),
          text: [b.text[0]],
          origin: b.origin,
        }),
        (b.removed = Ef(a, b.from, b.to)),
        c || (c = Bd(a, b, null)),
        a.cm ? Kd(a.cm, b, d) : uf(a, b, d),
        Jb(a, c, rg);
    }
  }
  function Kd(a, b, c) {
    var d = a.doc,
      e = a.display,
      f = b.from,
      g = b.to,
      h = !1,
      i = f.line;
    a.options.lineWrapping ||
      ((i = Hf(Qe(Df(d, f.line)))),
      d.iter(i, g.line + 1, function (a) {
        return a == e.maxLine ? ((h = !0), !0) : void 0;
      })),
      d.sel.contains(b.from, b.to) > -1 && mg(a),
      uf(d, b, c, D(a)),
      a.options.lineWrapping ||
        (d.iter(i, f.line + b.text.length, function (a) {
          var b = K(a);
          b > e.maxLineLength &&
            ((e.maxLine = a),
            (e.maxLineLength = b),
            (e.maxLineChanged = !0),
            (h = !1));
        }),
        h && (a.curOp.updateMaxLine = !0)),
      (d.frontier = Math.min(d.frontier, f.line)),
      Sb(a, 400);
    var j = b.text.length - (g.line - f.line) - 1;
    f.line != g.line || 1 != b.text.length || tf(a.doc, b)
      ? Fc(a, f.line, g.line + 1, j)
      : Gc(a, f.line, "text");
    var k = ng(a, "changes"),
      l = ng(a, "change");
    if (l || k) {
      var m = {
        from: f,
        to: g,
        text: b.text,
        removed: b.removed,
        origin: b.origin,
      };
      l && jg(a, "change", a, m),
        k && (a.curOp.changeObjs || (a.curOp.changeObjs = [])).push(m);
    }
    a.display.selForContextMenu = null;
  }
  function Ld(a, b, c, d, e) {
    if ((d || (d = c), ob(d, c) < 0)) {
      var f = d;
      (d = c), (c = f);
    }
    "string" == typeof b && (b = eh(b)),
      Fd(a, { from: c, to: d, text: b, origin: e });
  }
  function Md(a, b) {
    var c = a.display,
      d = c.sizer.getBoundingClientRect(),
      e = null;
    if (
      (b.top + d.top < 0
        ? (e = !0)
        : b.bottom + d.top >
            (window.innerHeight || document.documentElement.clientHeight) &&
          (e = !1),
      null != e && !o)
    ) {
      var f = Lg(
        "div",
        "\u200b",
        null,
        "position: absolute; top: " +
          (b.top - c.viewOffset - Wb(a.display)) +
          "px; height: " +
          (b.bottom - b.top + pg) +
          "px; left: " +
          b.left +
          "px; width: 2px;",
      );
      a.display.lineSpace.appendChild(f),
        f.scrollIntoView(e),
        a.display.lineSpace.removeChild(f);
    }
  }
  function Nd(a, b, c, d) {
    for (null == d && (d = 0); ; ) {
      var e = !1,
        f = oc(a, b),
        g = c && c != b ? oc(a, c) : f,
        h = Pd(
          a,
          Math.min(f.left, g.left),
          Math.min(f.top, g.top) - d,
          Math.max(f.left, g.left),
          Math.max(f.bottom, g.bottom) + d,
        ),
        i = a.doc.scrollTop,
        j = a.doc.scrollLeft;
      if (
        (null != h.scrollTop &&
          (gd(a, h.scrollTop), Math.abs(a.doc.scrollTop - i) > 1 && (e = !0)),
        null != h.scrollLeft &&
          (hd(a, h.scrollLeft), Math.abs(a.doc.scrollLeft - j) > 1 && (e = !0)),
        !e)
      )
        return f;
    }
  }
  function Od(a, b, c, d, e) {
    var f = Pd(a, b, c, d, e);
    null != f.scrollTop && gd(a, f.scrollTop),
      null != f.scrollLeft && hd(a, f.scrollLeft);
  }
  function Pd(a, b, c, d, e) {
    var f = a.display,
      g = uc(a.display);
    0 > c && (c = 0);
    var h =
        a.curOp && null != a.curOp.scrollTop
          ? a.curOp.scrollTop
          : f.scroller.scrollTop,
      i = f.scroller.clientHeight - pg,
      j = {},
      k = a.doc.height + Xb(f),
      l = g > c,
      m = e > k - g;
    if (h > c) j.scrollTop = l ? 0 : c;
    else if (e > h + i) {
      var n = Math.min(c, (m ? k : e) - i);
      n != h && (j.scrollTop = n);
    }
    var o =
        a.curOp && null != a.curOp.scrollLeft
          ? a.curOp.scrollLeft
          : f.scroller.scrollLeft,
      p = f.scroller.clientWidth - pg;
    (b += f.gutters.offsetWidth), (d += f.gutters.offsetWidth);
    var q = f.gutters.offsetWidth,
      r = q + 10 > b;
    return (
      o + q > b || r
        ? (r && (b = 0), (j.scrollLeft = Math.max(0, b - 10 - q)))
        : d > p + o - 3 && (j.scrollLeft = d + 10 - p),
      j
    );
  }
  function Qd(a, b, c) {
    (null != b || null != c) && Sd(a),
      null != b &&
        (a.curOp.scrollLeft =
          (null == a.curOp.scrollLeft ? a.doc.scrollLeft : a.curOp.scrollLeft) +
          b),
      null != c &&
        (a.curOp.scrollTop =
          (null == a.curOp.scrollTop ? a.doc.scrollTop : a.curOp.scrollTop) +
          c);
  }
  function Rd(a) {
    Sd(a);
    var b = a.getCursor(),
      c = b,
      d = b;
    a.options.lineWrapping ||
      ((c = b.ch ? nb(b.line, b.ch - 1) : b), (d = nb(b.line, b.ch + 1))),
      (a.curOp.scrollToPos = {
        from: c,
        to: d,
        margin: a.options.cursorScrollMargin,
        isCursor: !0,
      });
  }
  function Sd(a) {
    var b = a.curOp.scrollToPos;
    if (b) {
      a.curOp.scrollToPos = null;
      var c = pc(a, b.from),
        d = pc(a, b.to),
        e = Pd(
          a,
          Math.min(c.left, d.left),
          Math.min(c.top, d.top) - b.margin,
          Math.max(c.right, d.right),
          Math.max(c.bottom, d.bottom) + b.margin,
        );
      a.scrollTo(e.scrollLeft, e.scrollTop);
    }
  }
  function Td(a, b, c, d) {
    var f,
      e = a.doc;
    null == c && (c = "add"),
      "smart" == c && (a.doc.mode.indent ? (f = Vb(a, b)) : (c = "prev"));
    var g = a.options.tabSize,
      h = Df(e, b),
      i = vg(h.text, null, g);
    h.stateAfter && (h.stateAfter = null);
    var k,
      j = h.text.match(/^\s*/)[0];
    if (d || /\S/.test(h.text)) {
      if (
        "smart" == c &&
        ((k = a.doc.mode.indent(f, h.text.slice(j.length), h.text)), k == qg)
      ) {
        if (!d) return;
        c = "prev";
      }
    } else (k = 0), (c = "not");
    "prev" == c
      ? (k = b > e.first ? vg(Df(e, b - 1).text, null, g) : 0)
      : "add" == c
        ? (k = i + a.options.indentUnit)
        : "subtract" == c
          ? (k = i - a.options.indentUnit)
          : "number" == typeof c && (k = i + c),
      (k = Math.max(0, k));
    var l = "",
      m = 0;
    if (a.options.indentWithTabs)
      for (var n = Math.floor(k / g); n; --n) (m += g), (l += "	");
    if ((k > m && (l += yg(k - m)), l != j))
      Ld(a.doc, l, nb(b, 0), nb(b, j.length), "+input");
    else
      for (var n = 0; n < e.sel.ranges.length; n++) {
        var o = e.sel.ranges[n];
        if (o.head.line == b && o.head.ch < j.length) {
          var m = nb(b, j.length);
          Eb(e, n, new tb(m, m));
          break;
        }
      }
    h.stateAfter = null;
  }
  function Ud(a, b, c, d) {
    var e = b,
      f = b,
      g = a.doc;
    return (
      "number" == typeof b ? (f = Df(g, wb(g, b))) : (e = Hf(b)),
      null == e ? null : (d(f, e) && Gc(a, e, c), f)
    );
  }
  function Vd(a, b) {
    for (var c = a.doc.sel.ranges, d = [], e = 0; e < c.length; e++) {
      for (var f = b(c[e]); d.length && ob(f.from, zg(d).to) <= 0; ) {
        var g = d.pop();
        if (ob(g.from, f.from) < 0) {
          f.from = g.from;
          break;
        }
      }
      d.push(f);
    }
    zc(a, function () {
      for (var b = d.length - 1; b >= 0; b--)
        Ld(a.doc, "", d[b].from, d[b].to, "+delete");
      Rd(a);
    });
  }
  function Wd(a, b, c, d, e) {
    function k() {
      var b = f + c;
      return b < a.first || b >= a.first + a.size
        ? (j = !1)
        : ((f = b), (i = Df(a, b)));
    }
    function l(a) {
      var b = (e ? th : uh)(i, g, c, !0);
      if (null == b) {
        if (a || !k()) return (j = !1);
        g = e ? (0 > c ? mh : lh)(i) : 0 > c ? i.text.length : 0;
      } else g = b;
      return !0;
    }
    var f = b.line,
      g = b.ch,
      h = c,
      i = Df(a, f),
      j = !0;
    if ("char" == d) l();
    else if ("column" == d) l(!0);
    else if ("word" == d || "group" == d)
      for (var m = null, n = "group" == d, o = !0; !(0 > c) || l(!o); o = !1) {
        var p = i.text.charAt(g) || "\n",
          q = Hg(p)
            ? "w"
            : n && "\n" == p
              ? "n"
              : !n || /\s/.test(p)
                ? null
                : "p";
        if ((!n || o || q || (q = "s"), m && m != q)) {
          0 > c && ((c = 1), l());
          break;
        }
        if ((q && (m = q), c > 0 && !l(!o))) break;
      }
    var r = Nb(a, nb(f, g), h, !0);
    return j || (r.hitSide = !0), r;
  }
  function Xd(a, b, c, d) {
    var g,
      e = a.doc,
      f = b.left;
    if ("page" == d) {
      var h = Math.min(
        a.display.wrapper.clientHeight,
        window.innerHeight || document.documentElement.clientHeight,
      );
      g = b.top + c * (h - (0 > c ? 1.5 : 0.5) * uc(a.display));
    } else "line" == d && (g = c > 0 ? b.bottom + 3 : b.top - 3);
    for (;;) {
      var i = rc(a, f, g);
      if (!i.outside) break;
      if (0 > c ? 0 >= g : g >= e.height) {
        i.hitSide = !0;
        break;
      }
      g += 5 * c;
    }
    return i;
  }
  function Yd(a, b) {
    var c = Df(a, b.line).text,
      d = b.ch,
      e = b.ch;
    if (c) {
      (b.xRel < 0 || e == c.length) && d ? --d : ++e;
      for (
        var f = c.charAt(d),
          g = Hg(f)
            ? Hg
            : /\s/.test(f)
              ? function (a) {
                  return /\s/.test(a);
                }
              : function (a) {
                  return !/\s/.test(a) && !Hg(a);
                };
        d > 0 && g(c.charAt(d - 1));

      )
        --d;
      for (; e < c.length && g(c.charAt(e)); ) ++e;
    }
    return new tb(nb(b.line, d), nb(b.line, e));
  }
  function _d(a, b, c, d) {
    (y.defaults[a] = b),
      c &&
        ($d[a] = d
          ? function (a, b, d) {
              d != ae && c(a, b, d);
            }
          : c);
  }
  function ke(a) {
    return "string" == typeof a ? je[a] : a;
  }
  function re(a, b, c, d, e) {
    if (d && d.shared) return te(a, b, c, d, e);
    if (a.cm && !a.cm.curOp) return Ac(a.cm, re)(a, b, c, d, e);
    var f = new pe(a, e),
      g = ob(b, c);
    if ((d && Eg(d, f, !1), g > 0 || (0 == g && f.clearWhenEmpty !== !1)))
      return f;
    if (
      (f.replacedWith &&
        ((f.collapsed = !0),
        (f.widgetNode = Lg("span", [f.replacedWith], "CodeMirror-widget")),
        d.handleMouseEvents || (f.widgetNode.ignoreEvents = !0),
        d.insertLeft && (f.widgetNode.insertLeft = !0)),
      f.collapsed)
    ) {
      if (
        Pe(a, b.line, b, c, f) ||
        (b.line != c.line && Pe(a, c.line, b, c, f))
      )
        throw new Error(
          "Inserting collapsed marker partially overlapping an existing one",
        );
      x = !0;
    }
    f.addToHistory &&
      Pf(a, { from: b, to: c, origin: "markText" }, a.sel, 0 / 0);
    var j,
      h = b.line,
      i = a.cm;
    if (
      (a.iter(h, c.line + 1, function (a) {
        i &&
          f.collapsed &&
          !i.options.lineWrapping &&
          Qe(a) == i.display.maxLine &&
          (j = !0),
          f.collapsed && h != b.line && Gf(a, 0),
          Ae(
            a,
            new xe(f, h == b.line ? b.ch : null, h == c.line ? c.ch : null),
          ),
          ++h;
      }),
      f.collapsed &&
        a.iter(b.line, c.line + 1, function (b) {
          Ue(a, b) && Gf(b, 0);
        }),
      f.clearOnEnter &&
        eg(f, "beforeCursorEnter", function () {
          f.clear();
        }),
      f.readOnly &&
        ((w = !0),
        (a.history.done.length || a.history.undone.length) && a.clearHistory()),
      f.collapsed && ((f.id = ++qe), (f.atomic = !0)),
      i)
    ) {
      if ((j && (i.curOp.updateMaxLine = !0), f.collapsed))
        Fc(i, b.line, c.line + 1);
      else if (f.className || f.title || f.startStyle || f.endStyle)
        for (var k = b.line; k <= c.line; k++) Gc(i, k, "text");
      f.atomic && Lb(i.doc), jg(i, "markerAdded", i, f);
    }
    return f;
  }
  function te(a, b, c, d, e) {
    (d = Eg(d)), (d.shared = !1);
    var f = [re(a, b, c, d, e)],
      g = f[0],
      h = d.widgetNode;
    return (
      Bf(a, function (a) {
        h && (d.widgetNode = h.cloneNode(!0)),
          f.push(re(a, xb(a, b), xb(a, c), d, e));
        for (var i = 0; i < a.linked.length; ++i)
          if (a.linked[i].isParent) return;
        g = zg(f);
      }),
      new se(f, g)
    );
  }
  function ue(a) {
    return a.findMarks(
      nb(a.first, 0),
      a.clipPos(nb(a.lastLine())),
      function (a) {
        return a.parent;
      },
    );
  }
  function ve(a, b) {
    for (var c = 0; c < b.length; c++) {
      var d = b[c],
        e = d.find(),
        f = a.clipPos(e.from),
        g = a.clipPos(e.to);
      if (ob(f, g)) {
        var h = re(a, f, g, d.primary, d.primary.type);
        d.markers.push(h), (h.parent = d);
      }
    }
  }
  function we(a) {
    for (var b = 0; b < a.length; b++) {
      var c = a[b],
        d = [c.primary.doc];
      Bf(c.primary.doc, function (a) {
        d.push(a);
      });
      for (var e = 0; e < c.markers.length; e++) {
        var f = c.markers[e];
        -1 == Bg(d, f.doc) && ((f.parent = null), c.markers.splice(e--, 1));
      }
    }
  }
  function xe(a, b, c) {
    (this.marker = a), (this.from = b), (this.to = c);
  }
  function ye(a, b) {
    if (a)
      for (var c = 0; c < a.length; ++c) {
        var d = a[c];
        if (d.marker == b) return d;
      }
  }
  function ze(a, b) {
    for (var c, d = 0; d < a.length; ++d)
      a[d] != b && (c || (c = [])).push(a[d]);
    return c;
  }
  function Ae(a, b) {
    (a.markedSpans = a.markedSpans ? a.markedSpans.concat([b]) : [b]),
      b.marker.attachLine(a);
  }
  function Be(a, b, c) {
    if (a)
      for (var e, d = 0; d < a.length; ++d) {
        var f = a[d],
          g = f.marker,
          h = null == f.from || (g.inclusiveLeft ? f.from <= b : f.from < b);
        if (
          h ||
          (f.from == b && "bookmark" == g.type && (!c || !f.marker.insertLeft))
        ) {
          var i = null == f.to || (g.inclusiveRight ? f.to >= b : f.to > b);
          (e || (e = [])).push(new xe(g, f.from, i ? null : f.to));
        }
      }
    return e;
  }
  function Ce(a, b, c) {
    if (a)
      for (var e, d = 0; d < a.length; ++d) {
        var f = a[d],
          g = f.marker,
          h = null == f.to || (g.inclusiveRight ? f.to >= b : f.to > b);
        if (
          h ||
          (f.from == b && "bookmark" == g.type && (!c || f.marker.insertLeft))
        ) {
          var i =
            null == f.from || (g.inclusiveLeft ? f.from <= b : f.from < b);
          (e || (e = [])).push(
            new xe(g, i ? null : f.from - b, null == f.to ? null : f.to - b),
          );
        }
      }
    return e;
  }
  function De(a, b) {
    var c = zb(a, b.from.line) && Df(a, b.from.line).markedSpans,
      d = zb(a, b.to.line) && Df(a, b.to.line).markedSpans;
    if (!c && !d) return null;
    var e = b.from.ch,
      f = b.to.ch,
      g = 0 == ob(b.from, b.to),
      h = Be(c, e, g),
      i = Ce(d, f, g),
      j = 1 == b.text.length,
      k = zg(b.text).length + (j ? e : 0);
    if (h)
      for (var l = 0; l < h.length; ++l) {
        var m = h[l];
        if (null == m.to) {
          var n = ye(i, m.marker);
          n ? j && (m.to = null == n.to ? null : n.to + k) : (m.to = e);
        }
      }
    if (i)
      for (var l = 0; l < i.length; ++l) {
        var m = i[l];
        if ((null != m.to && (m.to += k), null == m.from)) {
          var n = ye(h, m.marker);
          n || ((m.from = k), j && (h || (h = [])).push(m));
        } else (m.from += k), j && (h || (h = [])).push(m);
      }
    h && (h = Ee(h)), i && i != h && (i = Ee(i));
    var o = [h];
    if (!j) {
      var q,
        p = b.text.length - 2;
      if (p > 0 && h)
        for (var l = 0; l < h.length; ++l)
          null == h[l].to &&
            (q || (q = [])).push(new xe(h[l].marker, null, null));
      for (var l = 0; p > l; ++l) o.push(q);
      o.push(i);
    }
    return o;
  }
  function Ee(a) {
    for (var b = 0; b < a.length; ++b) {
      var c = a[b];
      null != c.from &&
        c.from == c.to &&
        c.marker.clearWhenEmpty !== !1 &&
        a.splice(b--, 1);
    }
    return a.length ? a : null;
  }
  function Fe(a, b) {
    var c = Vf(a, b),
      d = De(a, b);
    if (!c) return d;
    if (!d) return c;
    for (var e = 0; e < c.length; ++e) {
      var f = c[e],
        g = d[e];
      if (f && g)
        a: for (var h = 0; h < g.length; ++h) {
          for (var i = g[h], j = 0; j < f.length; ++j)
            if (f[j].marker == i.marker) continue a;
          f.push(i);
        }
      else g && (c[e] = g);
    }
    return c;
  }
  function Ge(a, b, c) {
    var d = null;
    if (
      (a.iter(b.line, c.line + 1, function (a) {
        if (a.markedSpans)
          for (var b = 0; b < a.markedSpans.length; ++b) {
            var c = a.markedSpans[b].marker;
            !c.readOnly || (d && -1 != Bg(d, c)) || (d || (d = [])).push(c);
          }
      }),
      !d)
    )
      return null;
    for (var e = [{ from: b, to: c }], f = 0; f < d.length; ++f)
      for (var g = d[f], h = g.find(0), i = 0; i < e.length; ++i) {
        var j = e[i];
        if (!(ob(j.to, h.from) < 0 || ob(j.from, h.to) > 0)) {
          var k = [i, 1],
            l = ob(j.from, h.from),
            m = ob(j.to, h.to);
          (0 > l || (!g.inclusiveLeft && !l)) &&
            k.push({ from: j.from, to: h.from }),
            (m > 0 || (!g.inclusiveRight && !m)) &&
              k.push({ from: h.to, to: j.to }),
            e.splice.apply(e, k),
            (i += k.length - 1);
        }
      }
    return e;
  }
  function He(a) {
    var b = a.markedSpans;
    if (b) {
      for (var c = 0; c < b.length; ++c) b[c].marker.detachLine(a);
      a.markedSpans = null;
    }
  }
  function Ie(a, b) {
    if (b) {
      for (var c = 0; c < b.length; ++c) b[c].marker.attachLine(a);
      a.markedSpans = b;
    }
  }
  function Je(a) {
    return a.inclusiveLeft ? -1 : 0;
  }
  function Ke(a) {
    return a.inclusiveRight ? 1 : 0;
  }
  function Le(a, b) {
    var c = a.lines.length - b.lines.length;
    if (0 != c) return c;
    var d = a.find(),
      e = b.find(),
      f = ob(d.from, e.from) || Je(a) - Je(b);
    if (f) return -f;
    var g = ob(d.to, e.to) || Ke(a) - Ke(b);
    return g ? g : b.id - a.id;
  }
  function Me(a, b) {
    var d,
      c = x && a.markedSpans;
    if (c)
      for (var e, f = 0; f < c.length; ++f)
        (e = c[f]),
          e.marker.collapsed &&
            null == (b ? e.from : e.to) &&
            (!d || Le(d, e.marker) < 0) &&
            (d = e.marker);
    return d;
  }
  function Ne(a) {
    return Me(a, !0);
  }
  function Oe(a) {
    return Me(a, !1);
  }
  function Pe(a, b, c, d, e) {
    var f = Df(a, b),
      g = x && f.markedSpans;
    if (g)
      for (var h = 0; h < g.length; ++h) {
        var i = g[h];
        if (i.marker.collapsed) {
          var j = i.marker.find(0),
            k = ob(j.from, c) || Je(i.marker) - Je(e),
            l = ob(j.to, d) || Ke(i.marker) - Ke(e);
          if (
            !((k >= 0 && 0 >= l) || (0 >= k && l >= 0)) &&
            ((0 >= k && (ob(j.to, c) || Ke(i.marker) - Je(e)) > 0) ||
              (k >= 0 && (ob(j.from, d) || Je(i.marker) - Ke(e)) < 0))
          )
            return !0;
        }
      }
  }
  function Qe(a) {
    for (var b; (b = Ne(a)); ) a = b.find(-1, !0).line;
    return a;
  }
  function Re(a) {
    for (var b, c; (b = Oe(a)); )
      (a = b.find(1, !0).line), (c || (c = [])).push(a);
    return c;
  }
  function Se(a, b) {
    var c = Df(a, b),
      d = Qe(c);
    return c == d ? b : Hf(d);
  }
  function Te(a, b) {
    if (b > a.lastLine()) return b;
    var d,
      c = Df(a, b);
    if (!Ue(a, c)) return b;
    for (; (d = Oe(c)); ) c = d.find(1, !0).line;
    return Hf(c) + 1;
  }
  function Ue(a, b) {
    var c = x && b.markedSpans;
    if (c)
      for (var d, e = 0; e < c.length; ++e)
        if (((d = c[e]), d.marker.collapsed)) {
          if (null == d.from) return !0;
          if (
            !d.marker.widgetNode &&
            0 == d.from &&
            d.marker.inclusiveLeft &&
            Ve(a, b, d)
          )
            return !0;
        }
  }
  function Ve(a, b, c) {
    if (null == c.to) {
      var d = c.marker.find(1, !0);
      return Ve(a, d.line, ye(d.line.markedSpans, c.marker));
    }
    if (c.marker.inclusiveRight && c.to == b.text.length) return !0;
    for (var e, f = 0; f < b.markedSpans.length; ++f)
      if (
        ((e = b.markedSpans[f]),
        e.marker.collapsed &&
          !e.marker.widgetNode &&
          e.from == c.to &&
          (null == e.to || e.to != c.from) &&
          (e.marker.inclusiveLeft || c.marker.inclusiveRight) &&
          Ve(a, b, e))
      )
        return !0;
  }
  function Xe(a, b, c) {
    Jf(b) < ((a.curOp && a.curOp.scrollTop) || a.doc.scrollTop) &&
      Qd(a, null, c);
  }
  function Ye(a) {
    return null != a.height
      ? a.height
      : (Pg(document.body, a.node) ||
          Og(
            a.cm.display.measure,
            Lg("div", [a.node], null, "position: relative"),
          ),
        (a.height = a.node.offsetHeight));
  }
  function Ze(a, b, c, d) {
    var e = new We(a, c, d);
    return (
      e.noHScroll && (a.display.alignWidgets = !0),
      Ud(a, b, "widget", function (b) {
        var c = b.widgets || (b.widgets = []);
        if (
          (null == e.insertAt
            ? c.push(e)
            : c.splice(Math.min(c.length - 1, Math.max(0, e.insertAt)), 0, e),
          (e.line = b),
          !Ue(a.doc, b))
        ) {
          var d = Jf(b) < a.doc.scrollTop;
          Gf(b, b.height + Ye(e)),
            d && Qd(a, null, e.height),
            (a.curOp.forceUpdate = !0);
        }
        return !0;
      }),
      e
    );
  }
  function _e(a, b, c, d) {
    (a.text = b),
      a.stateAfter && (a.stateAfter = null),
      a.styles && (a.styles = null),
      null != a.order && (a.order = null),
      He(a),
      Ie(a, c);
    var e = d ? d(a) : 1;
    e != a.height && Gf(a, e);
  }
  function af(a) {
    (a.parent = null), He(a);
  }
  function bf(a, b) {
    if (a)
      for (;;) {
        var c = a.match(/(?:^|\s+)line-(background-)?(\S+)/);
        if (!c) break;
        a = a.slice(0, c.index) + a.slice(c.index + c[0].length);
        var d = c[1] ? "bgClass" : "textClass";
        null == b[d]
          ? (b[d] = c[2])
          : new RegExp("(?:^|s)" + c[2] + "(?:$|s)").test(b[d]) ||
            (b[d] += " " + c[2]);
      }
    return a;
  }
  function cf(a, b) {
    if (a.blankLine) return a.blankLine(b);
    if (a.innerMode) {
      var c = y.innerMode(a, b);
      return c.mode.blankLine ? c.mode.blankLine(c.state) : void 0;
    }
  }
  function df(a, b, c) {
    for (var d = 0; 10 > d; d++) {
      var e = a.token(b, c);
      if (b.pos > b.start) return e;
    }
    throw new Error("Mode " + a.name + " failed to advance stream.");
  }
  function ef(a, b, c, d, e, f, g) {
    var h = c.flattenSpans;
    null == h && (h = a.options.flattenSpans);
    var l,
      i = 0,
      j = null,
      k = new oe(b, a.options.tabSize);
    for ("" == b && bf(cf(c, d), f); !k.eol(); ) {
      if (
        (k.pos > a.options.maxHighlightLength
          ? ((h = !1), g && hf(a, b, d, k.pos), (k.pos = b.length), (l = null))
          : (l = bf(df(c, k, d), f)),
        a.options.addModeClass)
      ) {
        var m = y.innerMode(c, d).mode.name;
        m && (l = "m-" + (l ? m + " " + l : m));
      }
      (h && j == l) || (i < k.start && e(k.start, j), (i = k.start), (j = l)),
        (k.start = k.pos);
    }
    for (; i < k.pos; ) {
      var n = Math.min(k.pos, i + 5e4);
      e(n, j), (i = n);
    }
  }
  function ff(a, b, c, d) {
    var e = [a.state.modeGen],
      f = {};
    ef(
      a,
      b.text,
      a.doc.mode,
      c,
      function (a, b) {
        e.push(a, b);
      },
      f,
      d,
    );
    for (var g = 0; g < a.state.overlays.length; ++g) {
      var h = a.state.overlays[g],
        i = 1,
        j = 0;
      ef(
        a,
        b.text,
        h.mode,
        !0,
        function (a, b) {
          for (var c = i; a > j; ) {
            var d = e[i];
            d > a && e.splice(i, 1, a, e[i + 1], d),
              (i += 2),
              (j = Math.min(a, d));
          }
          if (b)
            if (h.opaque) e.splice(c, i - c, a, "cm-overlay " + b), (i = c + 2);
            else
              for (; i > c; c += 2) {
                var f = e[c + 1];
                e[c + 1] = (f ? f + " " : "") + "cm-overlay " + b;
              }
        },
        f,
      );
    }
    return { styles: e, classes: f.bgClass || f.textClass ? f : null };
  }
  function gf(a, b) {
    if (!b.styles || b.styles[0] != a.state.modeGen) {
      var c = ff(a, b, (b.stateAfter = Vb(a, Hf(b))));
      (b.styles = c.styles),
        c.classes
          ? (b.styleClasses = c.classes)
          : b.styleClasses && (b.styleClasses = null);
    }
    return b.styles;
  }
  function hf(a, b, c, d) {
    var e = a.doc.mode,
      f = new oe(b, a.options.tabSize);
    for (
      f.start = f.pos = d || 0, "" == b && cf(e, c);
      !f.eol() && f.pos <= a.options.maxHighlightLength;

    )
      df(e, f, c), (f.start = f.pos);
  }
  function lf(a, b) {
    if (!a || /^\s*$/.test(a)) return null;
    var c = b.addModeClass ? kf : jf;
    return c[a] || (c[a] = a.replace(/\S+/g, "cm-$&"));
  }
  function mf(a, b) {
    var c = Lg("span", null, null, h ? "padding-right: .1px" : null),
      d = { pre: Lg("pre", [c]), content: c, col: 0, pos: 0, cm: a };
    b.measure = {};
    for (var e = 0; e <= (b.rest ? b.rest.length : 0); e++) {
      var i,
        f = e ? b.rest[e - 1] : b.line;
      (d.pos = 0),
        (d.addToken = of),
        (g || h) &&
          a.getOption("lineWrapping") &&
          (d.addToken = pf(d.addToken)),
        dh(a.display.measure) &&
          (i = Kf(f)) &&
          (d.addToken = qf(d.addToken, i)),
        (d.map = []),
        sf(f, d, gf(a, f)),
        f.styleClasses &&
          (f.styleClasses.bgClass &&
            (d.bgClass = Ug(f.styleClasses.bgClass, d.bgClass || "")),
          f.styleClasses.textClass &&
            (d.textClass = Ug(f.styleClasses.textClass, d.textClass || ""))),
        0 == d.map.length &&
          d.map.push(0, 0, d.content.appendChild(bh(a.display.measure))),
        0 == e
          ? ((b.measure.map = d.map), (b.measure.cache = {}))
          : ((b.measure.maps || (b.measure.maps = [])).push(d.map),
            (b.measure.caches || (b.measure.caches = [])).push({}));
    }
    return gg(a, "renderLine", a, b.line, d.pre), d;
  }
  function nf(a) {
    var b = Lg("span", "\u2022", "cm-invalidchar");
    return (b.title = "\\u" + a.charCodeAt(0).toString(16)), b;
  }
  function of(a, b, c, e, f, g) {
    if (b) {
      var h = a.cm.options.specialChars,
        i = !1;
      if (h.test(b))
        for (var j = document.createDocumentFragment(), k = 0; ; ) {
          h.lastIndex = k;
          var l = h.exec(b),
            m = l ? l.index - k : b.length - k;
          if (m) {
            var n = document.createTextNode(b.slice(k, k + m));
            d ? j.appendChild(Lg("span", [n])) : j.appendChild(n),
              a.map.push(a.pos, a.pos + m, n),
              (a.col += m),
              (a.pos += m);
          }
          if (!l) break;
          if (((k += m + 1), "	" == l[0])) {
            var o = a.cm.options.tabSize,
              p = o - (a.col % o),
              n = j.appendChild(Lg("span", yg(p), "cm-tab"));
            a.col += p;
          } else {
            var n = a.cm.options.specialCharPlaceholder(l[0]);
            d ? j.appendChild(Lg("span", [n])) : j.appendChild(n), (a.col += 1);
          }
          a.map.push(a.pos, a.pos + 1, n), a.pos++;
        }
      else {
        a.col += b.length;
        var j = document.createTextNode(b);
        a.map.push(a.pos, a.pos + b.length, j),
          d && (i = !0),
          (a.pos += b.length);
      }
      if (c || e || f || i) {
        var q = c || "";
        e && (q += e), f && (q += f);
        var r = Lg("span", [j], q);
        return g && (r.title = g), a.content.appendChild(r);
      }
      a.content.appendChild(j);
    }
  }
  function pf(a) {
    function b(a) {
      for (var b = " ", c = 0; c < a.length - 2; ++c) b += c % 2 ? " " : "\xa0";
      return (b += " ");
    }
    return function (c, d, e, f, g, h) {
      a(c, d.replace(/ {3,}/g, b), e, f, g, h);
    };
  }
  function qf(a, b) {
    return function (c, d, e, f, g, h) {
      e = e ? e + " cm-force-border" : "cm-force-border";
      for (var i = c.pos, j = i + d.length; ; ) {
        for (var k = 0; k < b.length; k++) {
          var l = b[k];
          if (l.to > i && l.from <= i) break;
        }
        if (l.to >= j) return a(c, d, e, f, g, h);
        a(c, d.slice(0, l.to - i), e, f, null, h),
          (f = null),
          (d = d.slice(l.to - i)),
          (i = l.to);
      }
    };
  }
  function rf(a, b, c, d) {
    var e = !d && c.widgetNode;
    e && (a.map.push(a.pos, a.pos + b, e), a.content.appendChild(e)),
      (a.pos += b);
  }
  function sf(a, b, c) {
    var d = a.markedSpans,
      e = a.text,
      f = 0;
    if (d)
      for (
        var k, m, n, o, p, q, h = e.length, i = 0, g = 1, j = "", l = 0;
        ;

      ) {
        if (l == i) {
          (m = n = o = p = ""), (q = null), (l = 1 / 0);
          for (var r = [], s = 0; s < d.length; ++s) {
            var t = d[s],
              u = t.marker;
            t.from <= i && (null == t.to || t.to > i)
              ? (null != t.to && l > t.to && ((l = t.to), (n = "")),
                u.className && (m += " " + u.className),
                u.startStyle && t.from == i && (o += " " + u.startStyle),
                u.endStyle && t.to == l && (n += " " + u.endStyle),
                u.title && !p && (p = u.title),
                u.collapsed && (!q || Le(q.marker, u) < 0) && (q = t))
              : t.from > i && l > t.from && (l = t.from),
              "bookmark" == u.type && t.from == i && u.widgetNode && r.push(u);
          }
          if (
            q &&
            (q.from || 0) == i &&
            (rf(b, (null == q.to ? h + 1 : q.to) - i, q.marker, null == q.from),
            null == q.to)
          )
            return;
          if (!q && r.length) for (var s = 0; s < r.length; ++s) rf(b, 0, r[s]);
        }
        if (i >= h) break;
        for (var v = Math.min(h, l); ; ) {
          if (j) {
            var w = i + j.length;
            if (!q) {
              var x = w > v ? j.slice(0, v - i) : j;
              b.addToken(b, x, k ? k + m : m, o, i + x.length == l ? n : "", p);
            }
            if (w >= v) {
              (j = j.slice(v - i)), (i = v);
              break;
            }
            (i = w), (o = "");
          }
          (j = e.slice(f, (f = c[g++]))), (k = lf(c[g++], b.cm.options));
        }
      }
    else
      for (var g = 1; g < c.length; g += 2)
        b.addToken(b, e.slice(f, (f = c[g])), lf(c[g + 1], b.cm.options));
  }
  function tf(a, b) {
    return (
      0 == b.from.ch &&
      0 == b.to.ch &&
      "" == zg(b.text) &&
      (!a.cm || a.cm.options.wholeLineUpdateBefore)
    );
  }
  function uf(a, b, c, d) {
    function e(a) {
      return c ? c[a] : null;
    }
    function f(a, c, e) {
      _e(a, c, e, d), jg(a, "change", a, b);
    }
    var g = b.from,
      h = b.to,
      i = b.text,
      j = Df(a, g.line),
      k = Df(a, h.line),
      l = zg(i),
      m = e(i.length - 1),
      n = h.line - g.line;
    if (tf(a, b)) {
      for (var o = 0, p = []; o < i.length - 1; ++o)
        p.push(new $e(i[o], e(o), d));
      f(k, k.text, m),
        n && a.remove(g.line, n),
        p.length && a.insert(g.line, p);
    } else if (j == k)
      if (1 == i.length)
        f(j, j.text.slice(0, g.ch) + l + j.text.slice(h.ch), m);
      else {
        for (var p = [], o = 1; o < i.length - 1; ++o)
          p.push(new $e(i[o], e(o), d));
        p.push(new $e(l + j.text.slice(h.ch), m, d)),
          f(j, j.text.slice(0, g.ch) + i[0], e(0)),
          a.insert(g.line + 1, p);
      }
    else if (1 == i.length)
      f(j, j.text.slice(0, g.ch) + i[0] + k.text.slice(h.ch), e(0)),
        a.remove(g.line + 1, n);
    else {
      f(j, j.text.slice(0, g.ch) + i[0], e(0)), f(k, l + k.text.slice(h.ch), m);
      for (var o = 1, p = []; o < i.length - 1; ++o)
        p.push(new $e(i[o], e(o), d));
      n > 1 && a.remove(g.line + 1, n - 1), a.insert(g.line + 1, p);
    }
    jg(a, "change", a, b);
  }
  function vf(a) {
    (this.lines = a), (this.parent = null);
    for (var b = 0, c = 0; b < a.length; ++b)
      (a[b].parent = this), (c += a[b].height);
    this.height = c;
  }
  function wf(a) {
    this.children = a;
    for (var b = 0, c = 0, d = 0; d < a.length; ++d) {
      var e = a[d];
      (b += e.chunkSize()), (c += e.height), (e.parent = this);
    }
    (this.size = b), (this.height = c), (this.parent = null);
  }
  function Bf(a, b, c) {
    function d(a, e, f) {
      if (a.linked)
        for (var g = 0; g < a.linked.length; ++g) {
          var h = a.linked[g];
          if (h.doc != e) {
            var i = f && h.sharedHist;
            (!c || i) && (b(h.doc, i), d(h.doc, a, i));
          }
        }
    }
    d(a, null, !0);
  }
  function Cf(a, b) {
    if (b.cm) throw new Error("This document is already in use.");
    (a.doc = b),
      (b.cm = a),
      E(a),
      A(a),
      a.options.lineWrapping || L(a),
      (a.options.mode = b.modeOption),
      Fc(a);
  }
  function Df(a, b) {
    if (((b -= a.first), 0 > b || b >= a.size))
      throw new Error(
        "There is no line " + (b + a.first) + " in the document.",
      );
    for (var c = a; !c.lines; )
      for (var d = 0; ; ++d) {
        var e = c.children[d],
          f = e.chunkSize();
        if (f > b) {
          c = e;
          break;
        }
        b -= f;
      }
    return c.lines[b];
  }
  function Ef(a, b, c) {
    var d = [],
      e = b.line;
    return (
      a.iter(b.line, c.line + 1, function (a) {
        var f = a.text;
        e == c.line && (f = f.slice(0, c.ch)),
          e == b.line && (f = f.slice(b.ch)),
          d.push(f),
          ++e;
      }),
      d
    );
  }
  function Ff(a, b, c) {
    var d = [];
    return (
      a.iter(b, c, function (a) {
        d.push(a.text);
      }),
      d
    );
  }
  function Gf(a, b) {
    var c = b - a.height;
    if (c) for (var d = a; d; d = d.parent) d.height += c;
  }
  function Hf(a) {
    if (null == a.parent) return null;
    for (
      var b = a.parent, c = Bg(b.lines, a), d = b.parent;
      d;
      b = d, d = d.parent
    )
      for (var e = 0; d.children[e] != b; ++e) c += d.children[e].chunkSize();
    return c + b.first;
  }
  function If(a, b) {
    var c = a.first;
    a: do {
      for (var d = 0; d < a.children.length; ++d) {
        var e = a.children[d],
          f = e.height;
        if (f > b) {
          a = e;
          continue a;
        }
        (b -= f), (c += e.chunkSize());
      }
      return c;
    } while (!a.lines);
    for (var d = 0; d < a.lines.length; ++d) {
      var g = a.lines[d],
        h = g.height;
      if (h > b) break;
      b -= h;
    }
    return c + d;
  }
  function Jf(a) {
    a = Qe(a);
    for (var b = 0, c = a.parent, d = 0; d < c.lines.length; ++d) {
      var e = c.lines[d];
      if (e == a) break;
      b += e.height;
    }
    for (var f = c.parent; f; c = f, f = c.parent)
      for (var d = 0; d < f.children.length; ++d) {
        var g = f.children[d];
        if (g == c) break;
        b += g.height;
      }
    return b;
  }
  function Kf(a) {
    var b = a.order;
    return null == b && (b = a.order = vh(a.text)), b;
  }
  function Lf(a) {
    (this.done = []),
      (this.undone = []),
      (this.undoDepth = 1 / 0),
      (this.lastModTime = this.lastSelTime = 0),
      (this.lastOp = null),
      (this.lastOrigin = this.lastSelOrigin = null),
      (this.generation = this.maxGeneration = a || 1);
  }
  function Mf(a, b) {
    var c = { from: pb(b.from), to: zd(b), text: Ef(a, b.from, b.to) };
    return (
      Tf(a, c, b.from.line, b.to.line + 1),
      Bf(
        a,
        function (a) {
          Tf(a, c, b.from.line, b.to.line + 1);
        },
        !0,
      ),
      c
    );
  }
  function Nf(a) {
    for (; a.length; ) {
      var b = zg(a);
      if (!b.ranges) break;
      a.pop();
    }
  }
  function Of(a, b) {
    return b
      ? (Nf(a.done), zg(a.done))
      : a.done.length && !zg(a.done).ranges
        ? zg(a.done)
        : a.done.length > 1 && !a.done[a.done.length - 2].ranges
          ? (a.done.pop(), zg(a.done))
          : void 0;
  }
  function Pf(a, b, c, d) {
    var e = a.history;
    e.undone.length = 0;
    var g,
      f = +new Date();
    if (
      (e.lastOp == d ||
        (e.lastOrigin == b.origin &&
          b.origin &&
          (("+" == b.origin.charAt(0) &&
            a.cm &&
            e.lastModTime > f - a.cm.options.historyEventDelay) ||
            "*" == b.origin.charAt(0)))) &&
      (g = Of(e, e.lastOp == d))
    ) {
      var h = zg(g.changes);
      0 == ob(b.from, b.to) && 0 == ob(b.from, h.to)
        ? (h.to = zd(b))
        : g.changes.push(Mf(a, b));
    } else {
      var i = zg(e.done);
      for (
        (i && i.ranges) || Sf(a.sel, e.done),
          g = { changes: [Mf(a, b)], generation: e.generation },
          e.done.push(g);
        e.done.length > e.undoDepth;

      )
        e.done.shift(), e.done[0].ranges || e.done.shift();
    }
    e.done.push(c),
      (e.generation = ++e.maxGeneration),
      (e.lastModTime = e.lastSelTime = f),
      (e.lastOp = d),
      (e.lastOrigin = e.lastSelOrigin = b.origin),
      h || gg(a, "historyAdded");
  }
  function Qf(a, b, c, d) {
    var e = b.charAt(0);
    return (
      "*" == e ||
      ("+" == e &&
        c.ranges.length == d.ranges.length &&
        c.somethingSelected() == d.somethingSelected() &&
        new Date() - a.history.lastSelTime <=
          (a.cm ? a.cm.options.historyEventDelay : 500))
    );
  }
  function Rf(a, b, c, d) {
    var e = a.history,
      f = d && d.origin;
    c == e.lastOp ||
    (f &&
      e.lastSelOrigin == f &&
      ((e.lastModTime == e.lastSelTime && e.lastOrigin == f) ||
        Qf(a, f, zg(e.done), b)))
      ? (e.done[e.done.length - 1] = b)
      : Sf(b, e.done),
      (e.lastSelTime = +new Date()),
      (e.lastSelOrigin = f),
      (e.lastOp = c),
      d && d.clearRedo !== !1 && Nf(e.undone);
  }
  function Sf(a, b) {
    var c = zg(b);
    (c && c.ranges && c.equals(a)) || b.push(a);
  }
  function Tf(a, b, c, d) {
    var e = b["spans_" + a.id],
      f = 0;
    a.iter(Math.max(a.first, c), Math.min(a.first + a.size, d), function (c) {
      c.markedSpans &&
        ((e || (e = b["spans_" + a.id] = {}))[f] = c.markedSpans),
        ++f;
    });
  }
  function Uf(a) {
    if (!a) return null;
    for (var c, b = 0; b < a.length; ++b)
      a[b].marker.explicitlyCleared
        ? c || (c = a.slice(0, b))
        : c && c.push(a[b]);
    return c ? (c.length ? c : null) : a;
  }
  function Vf(a, b) {
    var c = b["spans_" + a.id];
    if (!c) return null;
    for (var d = 0, e = []; d < b.text.length; ++d) e.push(Uf(c[d]));
    return e;
  }
  function Wf(a, b, c) {
    for (var d = 0, e = []; d < a.length; ++d) {
      var f = a[d];
      if (f.ranges) e.push(c ? sb.prototype.deepCopy.call(f) : f);
      else {
        var g = f.changes,
          h = [];
        e.push({ changes: h });
        for (var i = 0; i < g.length; ++i) {
          var k,
            j = g[i];
          if ((h.push({ from: j.from, to: j.to, text: j.text }), b))
            for (var l in j)
              (k = l.match(/^spans_(\d+)$/)) &&
                Bg(b, Number(k[1])) > -1 &&
                ((zg(h)[l] = j[l]), delete j[l]);
        }
      }
    }
    return e;
  }
  function Xf(a, b, c, d) {
    c < a.line ? (a.line += d) : b < a.line && ((a.line = b), (a.ch = 0));
  }
  function Yf(a, b, c, d) {
    for (var e = 0; e < a.length; ++e) {
      var f = a[e],
        g = !0;
      if (f.ranges) {
        f.copied || ((f = a[e] = f.deepCopy()), (f.copied = !0));
        for (var h = 0; h < f.ranges.length; h++)
          Xf(f.ranges[h].anchor, b, c, d), Xf(f.ranges[h].head, b, c, d);
      } else {
        for (var h = 0; h < f.changes.length; ++h) {
          var i = f.changes[h];
          if (c < i.from.line)
            (i.from = nb(i.from.line + d, i.from.ch)),
              (i.to = nb(i.to.line + d, i.to.ch));
          else if (b <= i.to.line) {
            g = !1;
            break;
          }
        }
        g || (a.splice(0, e + 1), (e = 0));
      }
    }
  }
  function Zf(a, b) {
    var c = b.from.line,
      d = b.to.line,
      e = b.text.length - (d - c) - 1;
    Yf(a.done, c, d, e), Yf(a.undone, c, d, e);
  }
  function ag(a) {
    return null != a.defaultPrevented ? a.defaultPrevented : 0 == a.returnValue;
  }
  function cg(a) {
    return a.target || a.srcElement;
  }
  function dg(a) {
    var b = a.which;
    return (
      null == b &&
        (1 & a.button
          ? (b = 1)
          : 2 & a.button
            ? (b = 3)
            : 4 & a.button && (b = 2)),
      r && a.ctrlKey && 1 == b && (b = 3),
      b
    );
  }
  function jg(a, b) {
    function e(a) {
      return function () {
        a.apply(null, d);
      };
    }
    var c = a._handlers && a._handlers[b];
    if (c) {
      var d = Array.prototype.slice.call(arguments, 2);
      hg || (++ig, (hg = []), setTimeout(kg, 0));
      for (var f = 0; f < c.length; ++f) hg.push(e(c[f]));
    }
  }
  function kg() {
    --ig;
    var a = hg;
    hg = null;
    for (var b = 0; b < a.length; ++b) a[b]();
  }
  function lg(a, b, c) {
    return gg(a, c || b.type, a, b), ag(b) || b.codemirrorIgnore;
  }
  function mg(a) {
    var b = a._handlers && a._handlers.cursorActivity;
    if (b)
      for (
        var c =
            a.curOp.cursorActivityHandlers ||
            (a.curOp.cursorActivityHandlers = []),
          d = 0;
        d < b.length;
        ++d
      )
        -1 == Bg(c, b[d]) && c.push(b[d]);
  }
  function ng(a, b) {
    var c = a._handlers && a._handlers[b];
    return c && c.length > 0;
  }
  function og(a) {
    (a.prototype.on = function (a, b) {
      eg(this, a, b);
    }),
      (a.prototype.off = function (a, b) {
        fg(this, a, b);
      });
  }
  function ug() {
    this.id = null;
  }
  function wg(a, b, c) {
    for (var d = 0, e = 0; ; ) {
      var f = a.indexOf("	", d);
      -1 == f && (f = a.length);
      var g = f - d;
      if (f == a.length || e + g >= b) return d + Math.min(g, b - e);
      if (((e += f - d), (e += c - (e % c)), (d = f + 1), e >= b)) return d;
    }
  }
  function yg(a) {
    for (; xg.length <= a; ) xg.push(zg(xg) + " ");
    return xg[a];
  }
  function zg(a) {
    return a[a.length - 1];
  }
  function Bg(a, b) {
    for (var c = 0; c < a.length; ++c) if (a[c] == b) return c;
    return -1;
  }
  function Cg(a, b) {
    for (var c = [], d = 0; d < a.length; d++) c[d] = b(a[d], d);
    return c;
  }
  function Dg(a, b) {
    var c;
    if (Object.create) c = Object.create(a);
    else {
      var d = function () {};
      (d.prototype = a), (c = new d());
    }
    return b && Eg(b, c), c;
  }
  function Eg(a, b, c) {
    b || (b = {});
    for (var d in a)
      !a.hasOwnProperty(d) ||
        (c === !1 && b.hasOwnProperty(d)) ||
        (b[d] = a[d]);
    return b;
  }
  function Fg(a) {
    var b = Array.prototype.slice.call(arguments, 1);
    return function () {
      return a.apply(null, b);
    };
  }
  function Ig(a) {
    for (var b in a) if (a.hasOwnProperty(b) && a[b]) return !1;
    return !0;
  }
  function Kg(a) {
    return a.charCodeAt(0) >= 768 && Jg.test(a);
  }
  function Lg(a, b, c, d) {
    var e = document.createElement(a);
    if (
      (c && (e.className = c), d && (e.style.cssText = d), "string" == typeof b)
    )
      e.appendChild(document.createTextNode(b));
    else if (b) for (var f = 0; f < b.length; ++f) e.appendChild(b[f]);
    return e;
  }
  function Ng(a) {
    for (var b = a.childNodes.length; b > 0; --b) a.removeChild(a.firstChild);
    return a;
  }
  function Og(a, b) {
    return Ng(a).appendChild(b);
  }
  function Pg(a, b) {
    if (a.contains) return a.contains(b);
    for (; (b = b.parentNode); ) if (b == a) return !0;
  }
  function Qg() {
    return document.activeElement;
  }
  function Rg(a) {
    return new RegExp("\\b" + a + "\\b\\s*");
  }
  function Sg(a, b) {
    var c = Rg(b);
    c.test(a.className) && (a.className = a.className.replace(c, ""));
  }
  function Tg(a, b) {
    Rg(b).test(a.className) || (a.className += " " + b);
  }
  function Ug(a, b) {
    for (var c = a.split(" "), d = 0; d < c.length; d++)
      c[d] && !Rg(c[d]).test(b) && (b += " " + c[d]);
    return b;
  }
  function Vg(a) {
    if (document.body.getElementsByClassName)
      for (
        var b = document.body.getElementsByClassName("CodeMirror"), c = 0;
        c < b.length;
        c++
      ) {
        var d = b[c].CodeMirror;
        d && a(d);
      }
  }
  function Xg() {
    Wg || (Yg(), (Wg = !0));
  }
  function Yg() {
    var a;
    eg(window, "resize", function () {
      null == a &&
        (a = setTimeout(function () {
          (a = null), ($g = null), Vg(Uc);
        }, 100));
    }),
      eg(window, "blur", function () {
        Vg(wd);
      });
  }
  function _g(a) {
    if (null != $g) return $g;
    var b = Lg(
      "div",
      null,
      null,
      "width: 50px; height: 50px; overflow-x: scroll",
    );
    return (
      Og(a, b), b.offsetWidth && ($g = b.offsetHeight - b.clientHeight), $g || 0
    );
  }
  function bh(a) {
    if (null == ah) {
      var b = Lg("span", "\u200b");
      Og(a, Lg("span", [b, document.createTextNode("x")])),
        0 != a.firstChild.offsetHeight &&
          (ah = b.offsetWidth <= 1 && b.offsetHeight > 2 && !c);
    }
    return ah
      ? Lg("span", "\u200b")
      : Lg(
          "span",
          "\xa0",
          null,
          "display: inline-block; width: 1px; margin-right: -1px",
        );
  }
  function dh(a) {
    if (null != ch) return ch;
    var b = Og(a, document.createTextNode("A\u062eA")),
      c = Mg(b, 0, 1).getBoundingClientRect();
    if (c.left == c.right) return !1;
    var d = Mg(b, 1, 2).getBoundingClientRect();
    return (ch = d.right - c.right < 3);
  }
  function ih(a, b, c, d) {
    if (!a) return d(b, c, "ltr");
    for (var e = !1, f = 0; f < a.length; ++f) {
      var g = a[f];
      ((g.from < c && g.to > b) || (b == c && g.to == b)) &&
        (d(
          Math.max(g.from, b),
          Math.min(g.to, c),
          1 == g.level ? "rtl" : "ltr",
        ),
        (e = !0));
    }
    e || d(b, c, "ltr");
  }
  function jh(a) {
    return a.level % 2 ? a.to : a.from;
  }
  function kh(a) {
    return a.level % 2 ? a.from : a.to;
  }
  function lh(a) {
    var b = Kf(a);
    return b ? jh(b[0]) : 0;
  }
  function mh(a) {
    var b = Kf(a);
    return b ? kh(zg(b)) : a.text.length;
  }
  function nh(a, b) {
    var c = Df(a.doc, b),
      d = Qe(c);
    d != c && (b = Hf(d));
    var e = Kf(d),
      f = e ? (e[0].level % 2 ? mh(d) : lh(d)) : 0;
    return nb(b, f);
  }
  function oh(a, b) {
    for (var c, d = Df(a.doc, b); (c = Oe(d)); )
      (d = c.find(1, !0).line), (b = null);
    var e = Kf(d),
      f = e ? (e[0].level % 2 ? lh(d) : mh(d)) : d.text.length;
    return nb(null == b ? Hf(d) : b, f);
  }
  function ph(a, b, c) {
    var d = a[0].level;
    return b == d ? !0 : c == d ? !1 : c > b;
  }
  function rh(a, b) {
    qh = null;
    for (var d, c = 0; c < a.length; ++c) {
      var e = a[c];
      if (e.from < b && e.to > b) return c;
      if (e.from == b || e.to == b) {
        if (null != d)
          return ph(a, e.level, a[d].level)
            ? (e.from != e.to && (qh = d), c)
            : (e.from != e.to && (qh = c), d);
        d = c;
      }
    }
    return d;
  }
  function sh(a, b, c, d) {
    if (!d) return b + c;
    do b += c;
    while (b > 0 && Kg(a.text.charAt(b)));
    return b;
  }
  function th(a, b, c, d) {
    var e = Kf(a);
    if (!e) return uh(a, b, c, d);
    for (
      var f = rh(e, b), g = e[f], h = sh(a, b, g.level % 2 ? -c : c, d);
      ;

    ) {
      if (h > g.from && h < g.to) return h;
      if (h == g.from || h == g.to)
        return rh(e, h) == f
          ? h
          : ((g = e[(f += c)]), c > 0 == g.level % 2 ? g.to : g.from);
      if (((g = e[(f += c)]), !g)) return null;
      h = c > 0 == g.level % 2 ? sh(a, g.to, -1, d) : sh(a, g.from, 1, d);
    }
  }
  function uh(a, b, c, d) {
    var e = b + c;
    if (d) for (; e > 0 && Kg(a.text.charAt(e)); ) e += c;
    return 0 > e || e > a.text.length ? null : e;
  }
  var a = /gecko\/\d/i.test(navigator.userAgent),
    b = /MSIE \d/.test(navigator.userAgent),
    c = b && (null == document.documentMode || document.documentMode < 8),
    d = b && (null == document.documentMode || document.documentMode < 9),
    e = b && (null == document.documentMode || document.documentMode < 10),
    f = /Trident\/([7-9]|\d{2,})\./.test(navigator.userAgent),
    g = b || f,
    h = /WebKit\//.test(navigator.userAgent),
    i = h && /Qt\/\d+\.\d+/.test(navigator.userAgent),
    j = /Chrome\//.test(navigator.userAgent),
    k = /Opera\//.test(navigator.userAgent),
    l = /Apple Computer/.test(navigator.vendor),
    m = /KHTML\//.test(navigator.userAgent),
    n = /Mac OS X 1\d\D([8-9]|\d\d)\D/.test(navigator.userAgent),
    o = /PhantomJS/.test(navigator.userAgent),
    p =
      /AppleWebKit/.test(navigator.userAgent) &&
      /Mobile\/\w+/.test(navigator.userAgent),
    q =
      p ||
      /Android|webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(
        navigator.userAgent,
      ),
    r = p || /Mac/.test(navigator.platform),
    s = /win/i.test(navigator.platform),
    t = k && navigator.userAgent.match(/Version\/(\d*\.\d*)/);
  t && (t = Number(t[1])), t && t >= 15 && ((k = !1), (h = !0));
  var u = r && (i || (k && (null == t || 12.11 > t))),
    v = a || (g && !d),
    w = !1,
    x = !1,
    nb = (y.Pos = function (a, b) {
      return this instanceof nb
        ? ((this.line = a), (this.ch = b), void 0)
        : new nb(a, b);
    }),
    ob = (y.cmpPos = function (a, b) {
      return a.line - b.line || a.ch - b.ch;
    });
  (sb.prototype = {
    primary: function () {
      return this.ranges[this.primIndex];
    },
    equals: function (a) {
      if (a == this) return !0;
      if (
        a.primIndex != this.primIndex ||
        a.ranges.length != this.ranges.length
      )
        return !1;
      for (var b = 0; b < this.ranges.length; b++) {
        var c = this.ranges[b],
          d = a.ranges[b];
        if (0 != ob(c.anchor, d.anchor) || 0 != ob(c.head, d.head)) return !1;
      }
      return !0;
    },
    deepCopy: function () {
      for (var a = [], b = 0; b < this.ranges.length; b++)
        a[b] = new tb(pb(this.ranges[b].anchor), pb(this.ranges[b].head));
      return new sb(a, this.primIndex);
    },
    somethingSelected: function () {
      for (var a = 0; a < this.ranges.length; a++)
        if (!this.ranges[a].empty()) return !0;
      return !1;
    },
    contains: function (a, b) {
      b || (b = a);
      for (var c = 0; c < this.ranges.length; c++) {
        var d = this.ranges[c];
        if (ob(b, d.from()) >= 0 && ob(a, d.to()) <= 0) return c;
      }
      return -1;
    },
  }),
    (tb.prototype = {
      from: function () {
        return rb(this.anchor, this.head);
      },
      to: function () {
        return qb(this.anchor, this.head);
      },
      empty: function () {
        return (
          this.head.line == this.anchor.line && this.head.ch == this.anchor.ch
        );
      },
    });
  var tc,
    Yc,
    Zc,
    ec = { left: 0, right: 0, top: 0, bottom: 0 },
    wc = 0,
    dd = 0,
    id = 0,
    jd = null;
  g ? (jd = -0.53) : a ? (jd = 15) : j ? (jd = -0.7) : l && (jd = -1 / 3);
  var nd,
    qd = null,
    zd = (y.changeEnd = function (a) {
      return a.text
        ? nb(
            a.from.line + a.text.length - 1,
            zg(a.text).length + (1 == a.text.length ? a.from.ch : 0),
          )
        : a.to;
    });
  (y.prototype = {
    constructor: y,
    focus: function () {
      window.focus(), Qc(this), Nc(this);
    },
    setOption: function (a, b) {
      var c = this.options,
        d = c[a];
      (c[a] != b || "mode" == a) &&
        ((c[a] = b), $d.hasOwnProperty(a) && Ac(this, $d[a])(this, b, d));
    },
    getOption: function (a) {
      return this.options[a];
    },
    getDoc: function () {
      return this.doc;
    },
    addKeyMap: function (a, b) {
      this.state.keyMaps[b ? "push" : "unshift"](a);
    },
    removeKeyMap: function (a) {
      for (var b = this.state.keyMaps, c = 0; c < b.length; ++c)
        if (b[c] == a || ("string" != typeof b[c] && b[c].name == a))
          return b.splice(c, 1), !0;
    },
    addOverlay: Bc(function (a, b) {
      var c = a.token ? a : y.getMode(this.options, a);
      if (c.startState) throw new Error("Overlays may not be stateful.");
      this.state.overlays.push({ mode: c, modeSpec: a, opaque: b && b.opaque }),
        this.state.modeGen++,
        Fc(this);
    }),
    removeOverlay: Bc(function (a) {
      for (var b = this.state.overlays, c = 0; c < b.length; ++c) {
        var d = b[c].modeSpec;
        if (d == a || ("string" == typeof a && d.name == a))
          return b.splice(c, 1), this.state.modeGen++, Fc(this), void 0;
      }
    }),
    indentLine: Bc(function (a, b, c) {
      "string" != typeof b &&
        "number" != typeof b &&
        (b =
          null == b
            ? this.options.smartIndent
              ? "smart"
              : "prev"
            : b
              ? "add"
              : "subtract"),
        zb(this.doc, a) && Td(this, a, b, c);
    }),
    indentSelection: Bc(function (a) {
      for (var b = this.doc.sel.ranges, c = -1, d = 0; d < b.length; d++) {
        var e = b[d];
        if (e.empty())
          e.head.line > c &&
            (Td(this, e.head.line, a, !0),
            (c = e.head.line),
            d == this.doc.sel.primIndex && Rd(this));
        else {
          var f = Math.max(c, e.from().line),
            g = e.to();
          c = Math.min(this.lastLine(), g.line - (g.ch ? 0 : 1)) + 1;
          for (var h = f; c > h; ++h) Td(this, h, a);
        }
      }
    }),
    getTokenAt: function (a, b) {
      var c = this.doc;
      a = xb(c, a);
      for (
        var d = Vb(this, a.line, b),
          e = this.doc.mode,
          f = Df(c, a.line),
          g = new oe(f.text, this.options.tabSize);
        g.pos < a.ch && !g.eol();

      ) {
        g.start = g.pos;
        var h = df(e, g, d);
      }
      return {
        start: g.start,
        end: g.pos,
        string: g.current(),
        type: h || null,
        state: d,
      };
    },
    getTokenTypeAt: function (a) {
      a = xb(this.doc, a);
      var f,
        b = gf(this, Df(this.doc, a.line)),
        c = 0,
        d = (b.length - 1) / 2,
        e = a.ch;
      if (0 == e) f = b[2];
      else
        for (;;) {
          var g = (c + d) >> 1;
          if ((g ? b[2 * g - 1] : 0) >= e) d = g;
          else {
            if (!(b[2 * g + 1] < e)) {
              f = b[2 * g + 2];
              break;
            }
            c = g + 1;
          }
        }
      var h = f ? f.indexOf("cm-overlay ") : -1;
      return 0 > h ? f : 0 == h ? null : f.slice(0, h - 1);
    },
    getModeAt: function (a) {
      var b = this.doc.mode;
      return b.innerMode ? y.innerMode(b, this.getTokenAt(a).state).mode : b;
    },
    getHelper: function (a, b) {
      return this.getHelpers(a, b)[0];
    },
    getHelpers: function (a, b) {
      var c = [];
      if (!fe.hasOwnProperty(b)) return fe;
      var d = fe[b],
        e = this.getModeAt(a);
      if ("string" == typeof e[b]) d[e[b]] && c.push(d[e[b]]);
      else if (e[b])
        for (var f = 0; f < e[b].length; f++) {
          var g = d[e[b][f]];
          g && c.push(g);
        }
      else
        e.helperType && d[e.helperType]
          ? c.push(d[e.helperType])
          : d[e.name] && c.push(d[e.name]);
      for (var f = 0; f < d._global.length; f++) {
        var h = d._global[f];
        h.pred(e, this) && -1 == Bg(c, h.val) && c.push(h.val);
      }
      return c;
    },
    getStateAfter: function (a, b) {
      var c = this.doc;
      return (
        (a = wb(c, null == a ? c.first + c.size - 1 : a)), Vb(this, a + 1, b)
      );
    },
    cursorCoords: function (a, b) {
      var c,
        d = this.doc.sel.primary();
      return (
        (c =
          null == a
            ? d.head
            : "object" == typeof a
              ? xb(this.doc, a)
              : a
                ? d.from()
                : d.to()),
        oc(this, c, b || "page")
      );
    },
    charCoords: function (a, b) {
      return nc(this, xb(this.doc, a), b || "page");
    },
    coordsChar: function (a, b) {
      return (a = mc(this, a, b || "page")), rc(this, a.left, a.top);
    },
    lineAtHeight: function (a, b) {
      return (
        (a = mc(this, { top: a, left: 0 }, b || "page").top),
        If(this.doc, a + this.display.viewOffset)
      );
    },
    heightAtLine: function (a, b) {
      var c = !1,
        d = this.doc.first + this.doc.size - 1;
      a < this.doc.first ? (a = this.doc.first) : a > d && ((a = d), (c = !0));
      var e = Df(this.doc, a);
      return (
        lc(this, e, { top: 0, left: 0 }, b || "page").top +
        (c ? this.doc.height - Jf(e) : 0)
      );
    },
    defaultTextHeight: function () {
      return uc(this.display);
    },
    defaultCharWidth: function () {
      return vc(this.display);
    },
    setGutterMarker: Bc(function (a, b, c) {
      return Ud(this, a, "gutter", function (a) {
        var d = a.gutterMarkers || (a.gutterMarkers = {});
        return (d[b] = c), !c && Ig(d) && (a.gutterMarkers = null), !0;
      });
    }),
    clearGutter: Bc(function (a) {
      var b = this,
        c = b.doc,
        d = c.first;
      c.iter(function (c) {
        c.gutterMarkers &&
          c.gutterMarkers[a] &&
          ((c.gutterMarkers[a] = null),
          Gc(b, d, "gutter"),
          Ig(c.gutterMarkers) && (c.gutterMarkers = null)),
          ++d;
      });
    }),
    addLineClass: Bc(function (a, b, c) {
      return Ud(this, a, "class", function (a) {
        var d =
          "text" == b
            ? "textClass"
            : "background" == b
              ? "bgClass"
              : "wrapClass";
        if (a[d]) {
          if (new RegExp("(?:^|\\s)" + c + "(?:$|\\s)").test(a[d])) return !1;
          a[d] += " " + c;
        } else a[d] = c;
        return !0;
      });
    }),
    removeLineClass: Bc(function (a, b, c) {
      return Ud(this, a, "class", function (a) {
        var d =
            "text" == b
              ? "textClass"
              : "background" == b
                ? "bgClass"
                : "wrapClass",
          e = a[d];
        if (!e) return !1;
        if (null == c) a[d] = null;
        else {
          var f = e.match(new RegExp("(?:^|\\s+)" + c + "(?:$|\\s+)"));
          if (!f) return !1;
          var g = f.index + f[0].length;
          a[d] =
            e.slice(0, f.index) +
              (f.index && g != e.length ? " " : "") +
              e.slice(g) || null;
        }
        return !0;
      });
    }),
    addLineWidget: Bc(function (a, b, c) {
      return Ze(this, a, b, c);
    }),
    removeLineWidget: function (a) {
      a.clear();
    },
    lineInfo: function (a) {
      if ("number" == typeof a) {
        if (!zb(this.doc, a)) return null;
        var b = a;
        if (((a = Df(this.doc, a)), !a)) return null;
      } else {
        var b = Hf(a);
        if (null == b) return null;
      }
      return {
        line: b,
        handle: a,
        text: a.text,
        gutterMarkers: a.gutterMarkers,
        textClass: a.textClass,
        bgClass: a.bgClass,
        wrapClass: a.wrapClass,
        widgets: a.widgets,
      };
    },
    getViewport: function () {
      return { from: this.display.viewFrom, to: this.display.viewTo };
    },
    addWidget: function (a, b, c, d, e) {
      var f = this.display;
      a = oc(this, xb(this.doc, a));
      var g = a.bottom,
        h = a.left;
      if (
        ((b.style.position = "absolute"), f.sizer.appendChild(b), "over" == d)
      )
        g = a.top;
      else if ("above" == d || "near" == d) {
        var i = Math.max(f.wrapper.clientHeight, this.doc.height),
          j = Math.max(f.sizer.clientWidth, f.lineSpace.clientWidth);
        ("above" == d || a.bottom + b.offsetHeight > i) &&
        a.top > b.offsetHeight
          ? (g = a.top - b.offsetHeight)
          : a.bottom + b.offsetHeight <= i && (g = a.bottom),
          h + b.offsetWidth > j && (h = j - b.offsetWidth);
      }
      (b.style.top = g + "px"),
        (b.style.left = b.style.right = ""),
        "right" == e
          ? ((h = f.sizer.clientWidth - b.offsetWidth), (b.style.right = "0px"))
          : ("left" == e
              ? (h = 0)
              : "middle" == e &&
                (h = (f.sizer.clientWidth - b.offsetWidth) / 2),
            (b.style.left = h + "px")),
        c && Od(this, h, g, h + b.offsetWidth, g + b.offsetHeight);
    },
    triggerOnKeyDown: Bc(rd),
    triggerOnKeyPress: Bc(ud),
    triggerOnKeyUp: Bc(td),
    execCommand: function (a) {
      return ie.hasOwnProperty(a) ? ie[a](this) : void 0;
    },
    findPosH: function (a, b, c, d) {
      var e = 1;
      0 > b && ((e = -1), (b = -b));
      for (
        var f = 0, g = xb(this.doc, a);
        b > f && ((g = Wd(this.doc, g, e, c, d)), !g.hitSide);
        ++f
      );
      return g;
    },
    moveH: Bc(function (a, b) {
      var c = this;
      c.extendSelectionsBy(function (d) {
        return c.display.shift || c.doc.extend || d.empty()
          ? Wd(c.doc, d.head, a, b, c.options.rtlMoveVisually)
          : 0 > a
            ? d.from()
            : d.to();
      }, tg);
    }),
    deleteH: Bc(function (a, b) {
      var c = this.doc.sel,
        d = this.doc;
      c.somethingSelected()
        ? d.replaceSelection("", null, "+delete")
        : Vd(this, function (c) {
            var e = Wd(d, c.head, a, b, !1);
            return 0 > a ? { from: e, to: c.head } : { from: c.head, to: e };
          });
    }),
    findPosV: function (a, b, c, d) {
      var e = 1,
        f = d;
      0 > b && ((e = -1), (b = -b));
      for (var g = 0, h = xb(this.doc, a); b > g; ++g) {
        var i = oc(this, h, "div");
        if (
          (null == f ? (f = i.left) : (i.left = f),
          (h = Xd(this, i, e, c)),
          h.hitSide)
        )
          break;
      }
      return h;
    },
    moveV: Bc(function (a, b) {
      var c = this,
        d = this.doc,
        e = [],
        f = !c.display.shift && !d.extend && d.sel.somethingSelected();
      if (
        (d.extendSelectionsBy(function (g) {
          if (f) return 0 > a ? g.from() : g.to();
          var h = oc(c, g.head, "div");
          null != g.goalColumn && (h.left = g.goalColumn), e.push(h.left);
          var i = Xd(c, h, a, b);
          return (
            "page" == b &&
              g == d.sel.primary() &&
              Qd(c, null, nc(c, i, "div").top - h.top),
            i
          );
        }, tg),
        e.length)
      )
        for (var g = 0; g < d.sel.ranges.length; g++)
          d.sel.ranges[g].goalColumn = e[g];
    }),
    toggleOverwrite: function (a) {
      (null == a || a != this.state.overwrite) &&
        ((this.state.overwrite = !this.state.overwrite)
          ? Tg(this.display.cursorDiv, "CodeMirror-overwrite")
          : Sg(this.display.cursorDiv, "CodeMirror-overwrite"),
        gg(this, "overwriteToggle", this, this.state.overwrite));
    },
    hasFocus: function () {
      return Qg() == this.display.input;
    },
    scrollTo: Bc(function (a, b) {
      (null != a || null != b) && Sd(this),
        null != a && (this.curOp.scrollLeft = a),
        null != b && (this.curOp.scrollTop = b);
    }),
    getScrollInfo: function () {
      var a = this.display.scroller,
        b = pg;
      return {
        left: a.scrollLeft,
        top: a.scrollTop,
        height: a.scrollHeight - b,
        width: a.scrollWidth - b,
        clientHeight: a.clientHeight - b,
        clientWidth: a.clientWidth - b,
      };
    },
    scrollIntoView: Bc(function (a, b) {
      if (
        (null == a
          ? ((a = { from: this.doc.sel.primary().head, to: null }),
            null == b && (b = this.options.cursorScrollMargin))
          : "number" == typeof a
            ? (a = { from: nb(a, 0), to: null })
            : null == a.from && (a = { from: a, to: null }),
        a.to || (a.to = a.from),
        (a.margin = b || 0),
        null != a.from.line)
      )
        Sd(this), (this.curOp.scrollToPos = a);
      else {
        var c = Pd(
          this,
          Math.min(a.from.left, a.to.left),
          Math.min(a.from.top, a.to.top) - a.margin,
          Math.max(a.from.right, a.to.right),
          Math.max(a.from.bottom, a.to.bottom) + a.margin,
        );
        this.scrollTo(c.scrollLeft, c.scrollTop);
      }
    }),
    setSize: Bc(function (a, b) {
      function c(a) {
        return "number" == typeof a || /^\d+$/.test(String(a)) ? a + "px" : a;
      }
      null != a && (this.display.wrapper.style.width = c(a)),
        null != b && (this.display.wrapper.style.height = c(b)),
        this.options.lineWrapping && hc(this),
        (this.curOp.forceUpdate = !0),
        gg(this, "refresh", this);
    }),
    operation: function (a) {
      return zc(this, a);
    },
    refresh: Bc(function () {
      var a = this.display.cachedTextHeight;
      Fc(this),
        (this.curOp.forceUpdate = !0),
        ic(this),
        this.scrollTo(this.doc.scrollLeft, this.doc.scrollTop),
        J(this),
        (null == a || Math.abs(a - uc(this.display)) > 0.5) && E(this),
        gg(this, "refresh", this);
    }),
    swapDoc: Bc(function (a) {
      var b = this.doc;
      return (
        (b.cm = null),
        Cf(this, a),
        ic(this),
        Pc(this),
        this.scrollTo(a.scrollLeft, a.scrollTop),
        jg(this, "swapDoc", this, b),
        b
      );
    }),
    getInputField: function () {
      return this.display.input;
    },
    getWrapperElement: function () {
      return this.display.wrapper;
    },
    getScrollerElement: function () {
      return this.display.scroller;
    },
    getGutterElement: function () {
      return this.display.gutters;
    },
  }),
    og(y);
  var Zd = (y.defaults = {}),
    $d = (y.optionHandlers = {}),
    ae = (y.Init = {
      toString: function () {
        return "CodeMirror.Init";
      },
    });
  _d(
    "value",
    "",
    function (a, b) {
      a.setValue(b);
    },
    !0,
  ),
    _d(
      "mode",
      null,
      function (a, b) {
        (a.doc.modeOption = b), A(a);
      },
      !0,
    ),
    _d("indentUnit", 2, A, !0),
    _d("indentWithTabs", !1),
    _d("smartIndent", !0),
    _d(
      "tabSize",
      4,
      function (a) {
        B(a), ic(a), Fc(a);
      },
      !0,
    ),
    _d(
      "specialChars",
      /[\t\u0000-\u0019\u00ad\u200b\u2028\u2029\ufeff]/g,
      function (a, b) {
        (a.options.specialChars = new RegExp(
          b.source + (b.test("	") ? "" : "|	"),
          "g",
        )),
          a.refresh();
      },
      !0,
    ),
    _d(
      "specialCharPlaceholder",
      nf,
      function (a) {
        a.refresh();
      },
      !0,
    ),
    _d("electricChars", !0),
    _d("rtlMoveVisually", !s),
    _d("wholeLineUpdateBefore", !0),
    _d(
      "theme",
      "default",
      function (a) {
        G(a), H(a);
      },
      !0,
    ),
    _d("keyMap", "default", F),
    _d("extraKeys", null),
    _d("lineWrapping", !1, C, !0),
    _d(
      "gutters",
      [],
      function (a) {
        M(a.options), H(a);
      },
      !0,
    ),
    _d(
      "fixedGutter",
      !0,
      function (a, b) {
        (a.display.gutters.style.left = b ? T(a.display) + "px" : "0"),
          a.refresh();
      },
      !0,
    ),
    _d("coverGutterNextToScrollbar", !1, O, !0),
    _d(
      "lineNumbers",
      !1,
      function (a) {
        M(a.options), H(a);
      },
      !0,
    ),
    _d("firstLineNumber", 1, H, !0),
    _d(
      "lineNumberFormatter",
      function (a) {
        return a;
      },
      H,
      !0,
    ),
    _d("showCursorWhenSelecting", !1, Ob, !0),
    _d("resetSelectionOnContextMenu", !0),
    _d("readOnly", !1, function (a, b) {
      "nocursor" == b
        ? (wd(a), a.display.input.blur(), (a.display.disabled = !0))
        : ((a.display.disabled = !1), b || Pc(a));
    }),
    _d(
      "disableInput",
      !1,
      function (a, b) {
        b || Pc(a);
      },
      !0,
    ),
    _d("dragDrop", !0),
    _d("cursorBlinkRate", 530),
    _d("cursorScrollMargin", 0),
    _d("cursorHeight", 1),
    _d("workTime", 100),
    _d("workDelay", 100),
    _d("flattenSpans", !0, B, !0),
    _d("addModeClass", !1, B, !0),
    _d("pollInterval", 100),
    _d("undoDepth", 200, function (a, b) {
      a.doc.history.undoDepth = b;
    }),
    _d("historyEventDelay", 1250),
    _d(
      "viewportMargin",
      10,
      function (a) {
        a.refresh();
      },
      !0,
    ),
    _d("maxHighlightLength", 1e4, B, !0),
    _d("moveInputWithCursor", !0, function (a, b) {
      b || (a.display.inputDiv.style.top = a.display.inputDiv.style.left = 0);
    }),
    _d("tabindex", null, function (a, b) {
      a.display.input.tabIndex = b || "";
    }),
    _d("autofocus", null);
  var be = (y.modes = {}),
    ce = (y.mimeModes = {});
  (y.defineMode = function (a, b) {
    if (
      (y.defaults.mode || "null" == a || (y.defaults.mode = a),
      arguments.length > 2)
    ) {
      b.dependencies = [];
      for (var c = 2; c < arguments.length; ++c)
        b.dependencies.push(arguments[c]);
    }
    be[a] = b;
  }),
    (y.defineMIME = function (a, b) {
      ce[a] = b;
    }),
    (y.resolveMode = function (a) {
      if ("string" == typeof a && ce.hasOwnProperty(a)) a = ce[a];
      else if (a && "string" == typeof a.name && ce.hasOwnProperty(a.name)) {
        var b = ce[a.name];
        "string" == typeof b && (b = { name: b }),
          (a = Dg(b, a)),
          (a.name = b.name);
      } else if ("string" == typeof a && /^[\w\-]+\/[\w\-]+\+xml$/.test(a))
        return y.resolveMode("application/xml");
      return "string" == typeof a ? { name: a } : a || { name: "null" };
    }),
    (y.getMode = function (a, b) {
      var b = y.resolveMode(b),
        c = be[b.name];
      if (!c) return y.getMode(a, "text/plain");
      var d = c(a, b);
      if (de.hasOwnProperty(b.name)) {
        var e = de[b.name];
        for (var f in e)
          e.hasOwnProperty(f) &&
            (d.hasOwnProperty(f) && (d["_" + f] = d[f]), (d[f] = e[f]));
      }
      if (
        ((d.name = b.name),
        b.helperType && (d.helperType = b.helperType),
        b.modeProps)
      )
        for (var f in b.modeProps) d[f] = b.modeProps[f];
      return d;
    }),
    y.defineMode("null", function () {
      return {
        token: function (a) {
          a.skipToEnd();
        },
      };
    }),
    y.defineMIME("text/plain", "null");
  var de = (y.modeExtensions = {});
  (y.extendMode = function (a, b) {
    var c = de.hasOwnProperty(a) ? de[a] : (de[a] = {});
    Eg(b, c);
  }),
    (y.defineExtension = function (a, b) {
      y.prototype[a] = b;
    }),
    (y.defineDocExtension = function (a, b) {
      yf.prototype[a] = b;
    }),
    (y.defineOption = _d);
  var ee = [];
  y.defineInitHook = function (a) {
    ee.push(a);
  };
  var fe = (y.helpers = {});
  (y.registerHelper = function (a, b, c) {
    fe.hasOwnProperty(a) || (fe[a] = y[a] = { _global: [] }), (fe[a][b] = c);
  }),
    (y.registerGlobalHelper = function (a, b, c, d) {
      y.registerHelper(a, b, d), fe[a]._global.push({ pred: c, val: d });
    });
  var ge = (y.copyState = function (a, b) {
      if (b === !0) return b;
      if (a.copyState) return a.copyState(b);
      var c = {};
      for (var d in b) {
        var e = b[d];
        e instanceof Array && (e = e.concat([])), (c[d] = e);
      }
      return c;
    }),
    he = (y.startState = function (a, b, c) {
      return a.startState ? a.startState(b, c) : !0;
    });
  y.innerMode = function (a, b) {
    for (; a.innerMode; ) {
      var c = a.innerMode(b);
      if (!c || c.mode == a) break;
      (b = c.state), (a = c.mode);
    }
    return c || { mode: a, state: b };
  };
  var ie = (y.commands = {
      selectAll: function (a) {
        a.setSelection(nb(a.firstLine(), 0), nb(a.lastLine()), rg);
      },
      singleSelection: function (a) {
        a.setSelection(a.getCursor("anchor"), a.getCursor("head"), rg);
      },
      killLine: function (a) {
        Vd(a, function (b) {
          if (b.empty()) {
            var c = Df(a.doc, b.head.line).text.length;
            return b.head.ch == c && b.head.line < a.lastLine()
              ? { from: b.head, to: nb(b.head.line + 1, 0) }
              : { from: b.head, to: nb(b.head.line, c) };
          }
          return { from: b.from(), to: b.to() };
        });
      },
      deleteLine: function (a) {
        Vd(a, function (b) {
          return {
            from: nb(b.from().line, 0),
            to: xb(a.doc, nb(b.to().line + 1, 0)),
          };
        });
      },
      delLineLeft: function (a) {
        Vd(a, function (a) {
          return { from: nb(a.from().line, 0), to: a.from() };
        });
      },
      undo: function (a) {
        a.undo();
      },
      redo: function (a) {
        a.redo();
      },
      undoSelection: function (a) {
        a.undoSelection();
      },
      redoSelection: function (a) {
        a.redoSelection();
      },
      goDocStart: function (a) {
        a.extendSelection(nb(a.firstLine(), 0));
      },
      goDocEnd: function (a) {
        a.extendSelection(nb(a.lastLine()));
      },
      goLineStart: function (a) {
        a.extendSelectionsBy(function (b) {
          return nh(a, b.head.line);
        }, tg);
      },
      goLineStartSmart: function (a) {
        a.extendSelectionsBy(function (b) {
          var c = nh(a, b.head.line),
            d = a.getLineHandle(c.line),
            e = Kf(d);
          if (!e || 0 == e[0].level) {
            var f = Math.max(0, d.text.search(/\S/)),
              g = b.head.line == c.line && b.head.ch <= f && b.head.ch;
            return nb(c.line, g ? 0 : f);
          }
          return c;
        }, tg);
      },
      goLineEnd: function (a) {
        a.extendSelectionsBy(function (b) {
          return oh(a, b.head.line);
        }, tg);
      },
      goLineRight: function (a) {
        a.extendSelectionsBy(function (b) {
          var c = a.charCoords(b.head, "div").top + 5;
          return a.coordsChar(
            { left: a.display.lineDiv.offsetWidth + 100, top: c },
            "div",
          );
        }, tg);
      },
      goLineLeft: function (a) {
        a.extendSelectionsBy(function (b) {
          var c = a.charCoords(b.head, "div").top + 5;
          return a.coordsChar({ left: 0, top: c }, "div");
        }, tg);
      },
      goLineUp: function (a) {
        a.moveV(-1, "line");
      },
      goLineDown: function (a) {
        a.moveV(1, "line");
      },
      goPageUp: function (a) {
        a.moveV(-1, "page");
      },
      goPageDown: function (a) {
        a.moveV(1, "page");
      },
      goCharLeft: function (a) {
        a.moveH(-1, "char");
      },
      goCharRight: function (a) {
        a.moveH(1, "char");
      },
      goColumnLeft: function (a) {
        a.moveH(-1, "column");
      },
      goColumnRight: function (a) {
        a.moveH(1, "column");
      },
      goWordLeft: function (a) {
        a.moveH(-1, "word");
      },
      goGroupRight: function (a) {
        a.moveH(1, "group");
      },
      goGroupLeft: function (a) {
        a.moveH(-1, "group");
      },
      goWordRight: function (a) {
        a.moveH(1, "word");
      },
      delCharBefore: function (a) {
        a.deleteH(-1, "char");
      },
      delCharAfter: function (a) {
        a.deleteH(1, "char");
      },
      delWordBefore: function (a) {
        a.deleteH(-1, "word");
      },
      delWordAfter: function (a) {
        a.deleteH(1, "word");
      },
      delGroupBefore: function (a) {
        a.deleteH(-1, "group");
      },
      delGroupAfter: function (a) {
        a.deleteH(1, "group");
      },
      indentAuto: function (a) {
        a.indentSelection("smart");
      },
      indentMore: function (a) {
        a.indentSelection("add");
      },
      indentLess: function (a) {
        a.indentSelection("subtract");
      },
      insertTab: function (a) {
        a.replaceSelection("	");
      },
      insertSoftTab: function (a) {
        for (
          var b = [], c = a.listSelections(), d = a.options.tabSize, e = 0;
          e < c.length;
          e++
        ) {
          var f = c[e].from(),
            g = vg(a.getLine(f.line), f.ch, d);
          b.push(new Array(d - (g % d) + 1).join(" "));
        }
        a.replaceSelections(b);
      },
      defaultTab: function (a) {
        a.somethingSelected()
          ? a.indentSelection("add")
          : a.execCommand("insertTab");
      },
      transposeChars: function (a) {
        zc(a, function () {
          for (var b = a.listSelections(), c = 0; c < b.length; c++) {
            var d = b[c].head,
              e = Df(a.doc, d.line).text;
            d.ch > 0 &&
              d.ch < e.length - 1 &&
              a.replaceRange(
                e.charAt(d.ch) + e.charAt(d.ch - 1),
                nb(d.line, d.ch - 1),
                nb(d.line, d.ch + 1),
              );
          }
        });
      },
      newlineAndIndent: function (a) {
        zc(a, function () {
          for (var b = a.listSelections().length, c = 0; b > c; c++) {
            var d = a.listSelections()[c];
            a.replaceRange("\n", d.anchor, d.head, "+input"),
              a.indentLine(d.from().line + 1, null, !0),
              Rd(a);
          }
        });
      },
      toggleOverwrite: function (a) {
        a.toggleOverwrite();
      },
    }),
    je = (y.keyMap = {});
  (je.basic = {
    Left: "goCharLeft",
    Right: "goCharRight",
    Up: "goLineUp",
    Down: "goLineDown",
    End: "goLineEnd",
    Home: "goLineStartSmart",
    PageUp: "goPageUp",
    PageDown: "goPageDown",
    Delete: "delCharAfter",
    Backspace: "delCharBefore",
    "Shift-Backspace": "delCharBefore",
    Tab: "defaultTab",
    "Shift-Tab": "indentAuto",
    Enter: "newlineAndIndent",
    Insert: "toggleOverwrite",
    Esc: "singleSelection",
  }),
    (je.pcDefault = {
      "Ctrl-A": "selectAll",
      "Ctrl-D": "deleteLine",
      "Ctrl-Z": "undo",
      "Shift-Ctrl-Z": "redo",
      "Ctrl-Y": "redo",
      "Ctrl-Home": "goDocStart",
      "Ctrl-Up": "goDocStart",
      "Ctrl-End": "goDocEnd",
      "Ctrl-Down": "goDocEnd",
      "Ctrl-Left": "goGroupLeft",
      "Ctrl-Right": "goGroupRight",
      "Alt-Left": "goLineStart",
      "Alt-Right": "goLineEnd",
      "Ctrl-Backspace": "delGroupBefore",
      "Ctrl-Delete": "delGroupAfter",
      "Ctrl-S": "save",
      "Ctrl-F": "find",
      "Ctrl-G": "findNext",
      "Shift-Ctrl-G": "findPrev",
      "Shift-Ctrl-F": "replace",
      "Shift-Ctrl-R": "replaceAll",
      "Ctrl-[": "indentLess",
      "Ctrl-]": "indentMore",
      "Ctrl-U": "undoSelection",
      "Shift-Ctrl-U": "redoSelection",
      "Alt-U": "redoSelection",
      fallthrough: "basic",
    }),
    (je.macDefault = {
      "Cmd-A": "selectAll",
      "Cmd-D": "deleteLine",
      "Cmd-Z": "undo",
      "Shift-Cmd-Z": "redo",
      "Cmd-Y": "redo",
      "Cmd-Up": "goDocStart",
      "Cmd-End": "goDocEnd",
      "Cmd-Down": "goDocEnd",
      "Alt-Left": "goGroupLeft",
      "Alt-Right": "goGroupRight",
      "Cmd-Left": "goLineStart",
      "Cmd-Right": "goLineEnd",
      "Alt-Backspace": "delGroupBefore",
      "Ctrl-Alt-Backspace": "delGroupAfter",
      "Alt-Delete": "delGroupAfter",
      "Cmd-S": "save",
      "Cmd-F": "find",
      "Cmd-G": "findNext",
      "Shift-Cmd-G": "findPrev",
      "Cmd-Alt-F": "replace",
      "Shift-Cmd-Alt-F": "replaceAll",
      "Cmd-[": "indentLess",
      "Cmd-]": "indentMore",
      "Cmd-Backspace": "delLineLeft",
      "Cmd-U": "undoSelection",
      "Shift-Cmd-U": "redoSelection",
      fallthrough: ["basic", "emacsy"],
    }),
    (je.emacsy = {
      "Ctrl-F": "goCharRight",
      "Ctrl-B": "goCharLeft",
      "Ctrl-P": "goLineUp",
      "Ctrl-N": "goLineDown",
      "Alt-F": "goWordRight",
      "Alt-B": "goWordLeft",
      "Ctrl-A": "goLineStart",
      "Ctrl-E": "goLineEnd",
      "Ctrl-V": "goPageDown",
      "Shift-Ctrl-V": "goPageUp",
      "Ctrl-D": "delCharAfter",
      "Ctrl-H": "delCharBefore",
      "Alt-D": "delWordAfter",
      "Alt-Backspace": "delWordBefore",
      "Ctrl-K": "killLine",
      "Ctrl-T": "transposeChars",
    }),
    (je["default"] = r ? je.macDefault : je.pcDefault);
  var le = (y.lookupKey = function (a, b, c) {
      function d(b) {
        b = ke(b);
        var e = b[a];
        if (e === !1) return "stop";
        if (null != e && c(e)) return !0;
        if (b.nofallthrough) return "stop";
        var f = b.fallthrough;
        if (null == f) return !1;
        if ("[object Array]" != Object.prototype.toString.call(f)) return d(f);
        for (var g = 0; g < f.length; ++g) {
          var h = d(f[g]);
          if (h) return h;
        }
        return !1;
      }
      for (var e = 0; e < b.length; ++e) {
        var f = d(b[e]);
        if (f) return "stop" != f;
      }
    }),
    me = (y.isModifierKey = function (a) {
      var b = hh[a.keyCode];
      return "Ctrl" == b || "Alt" == b || "Shift" == b || "Mod" == b;
    }),
    ne = (y.keyName = function (a, b) {
      if (k && 34 == a.keyCode && a["char"]) return !1;
      var c = hh[a.keyCode];
      return null == c || a.altGraphKey
        ? !1
        : (a.altKey && (c = "Alt-" + c),
          (u ? a.metaKey : a.ctrlKey) && (c = "Ctrl-" + c),
          (u ? a.ctrlKey : a.metaKey) && (c = "Cmd-" + c),
          !b && a.shiftKey && (c = "Shift-" + c),
          c);
    });
  y.fromTextArea = function (a, b) {
    function d() {
      a.value = i.getValue();
    }
    if (
      (b || (b = {}),
      (b.value = a.value),
      !b.tabindex && a.tabindex && (b.tabindex = a.tabindex),
      !b.placeholder && a.placeholder && (b.placeholder = a.placeholder),
      null == b.autofocus)
    ) {
      var c = Qg();
      b.autofocus =
        c == a || (null != a.getAttribute("autofocus") && c == document.body);
    }
    if (a.form && (eg(a.form, "submit", d), !b.leaveSubmitMethodAlone)) {
      var e = a.form,
        f = e.submit;
      try {
        var g = (e.submit = function () {
          d(), (e.submit = f), e.submit(), (e.submit = g);
        });
      } catch (h) {}
    }
    a.style.display = "none";
    var i = y(function (b) {
      a.parentNode.insertBefore(b, a.nextSibling);
    }, b);
    return (
      (i.save = d),
      (i.getTextArea = function () {
        return a;
      }),
      (i.toTextArea = function () {
        d(),
          a.parentNode.removeChild(i.getWrapperElement()),
          (a.style.display = ""),
          a.form &&
            (fg(a.form, "submit", d),
            "function" == typeof a.form.submit && (a.form.submit = f));
      }),
      i
    );
  };
  var oe = (y.StringStream = function (a, b) {
    (this.pos = this.start = 0),
      (this.string = a),
      (this.tabSize = b || 8),
      (this.lastColumnPos = this.lastColumnValue = 0),
      (this.lineStart = 0);
  });
  oe.prototype = {
    eol: function () {
      return this.pos >= this.string.length;
    },
    sol: function () {
      return this.pos == this.lineStart;
    },
    peek: function () {
      return this.string.charAt(this.pos) || void 0;
    },
    next: function () {
      return this.pos < this.string.length
        ? this.string.charAt(this.pos++)
        : void 0;
    },
    eat: function (a) {
      var b = this.string.charAt(this.pos);
      if ("string" == typeof a) var c = b == a;
      else var c = b && (a.test ? a.test(b) : a(b));
      return c ? (++this.pos, b) : void 0;
    },
    eatWhile: function (a) {
      for (var b = this.pos; this.eat(a); );
      return this.pos > b;
    },
    eatSpace: function () {
      for (var a = this.pos; /[\s\u00a0]/.test(this.string.charAt(this.pos)); )
        ++this.pos;
      return this.pos > a;
    },
    skipToEnd: function () {
      this.pos = this.string.length;
    },
    skipTo: function (a) {
      var b = this.string.indexOf(a, this.pos);
      return b > -1 ? ((this.pos = b), !0) : void 0;
    },
    backUp: function (a) {
      this.pos -= a;
    },
    column: function () {
      return (
        this.lastColumnPos < this.start &&
          ((this.lastColumnValue = vg(
            this.string,
            this.start,
            this.tabSize,
            this.lastColumnPos,
            this.lastColumnValue,
          )),
          (this.lastColumnPos = this.start)),
        this.lastColumnValue -
          (this.lineStart ? vg(this.string, this.lineStart, this.tabSize) : 0)
      );
    },
    indentation: function () {
      return (
        vg(this.string, null, this.tabSize) -
        (this.lineStart ? vg(this.string, this.lineStart, this.tabSize) : 0)
      );
    },
    match: function (a, b, c) {
      if ("string" != typeof a) {
        var f = this.string.slice(this.pos).match(a);
        return f && f.index > 0
          ? null
          : (f && b !== !1 && (this.pos += f[0].length), f);
      }
      var d = function (a) {
          return c ? a.toLowerCase() : a;
        },
        e = this.string.substr(this.pos, a.length);
      return d(e) == d(a) ? (b !== !1 && (this.pos += a.length), !0) : void 0;
    },
    current: function () {
      return this.string.slice(this.start, this.pos);
    },
    hideFirstChars: function (a, b) {
      this.lineStart += a;
      try {
        return b();
      } finally {
        this.lineStart -= a;
      }
    },
  };
  var pe = (y.TextMarker = function (a, b) {
    (this.lines = []), (this.type = b), (this.doc = a);
  });
  og(pe),
    (pe.prototype.clear = function () {
      if (!this.explicitlyCleared) {
        var a = this.doc.cm,
          b = a && !a.curOp;
        if ((b && xc(a), ng(this, "clear"))) {
          var c = this.find();
          c && jg(this, "clear", c.from, c.to);
        }
        for (var d = null, e = null, f = 0; f < this.lines.length; ++f) {
          var g = this.lines[f],
            h = ye(g.markedSpans, this);
          a && !this.collapsed
            ? Gc(a, Hf(g), "text")
            : a && (null != h.to && (e = Hf(g)), null != h.from && (d = Hf(g))),
            (g.markedSpans = ze(g.markedSpans, h)),
            null == h.from &&
              this.collapsed &&
              !Ue(this.doc, g) &&
              a &&
              Gf(g, uc(a.display));
        }
        if (a && this.collapsed && !a.options.lineWrapping)
          for (var f = 0; f < this.lines.length; ++f) {
            var i = Qe(this.lines[f]),
              j = K(i);
            j > a.display.maxLineLength &&
              ((a.display.maxLine = i),
              (a.display.maxLineLength = j),
              (a.display.maxLineChanged = !0));
          }
        null != d && a && this.collapsed && Fc(a, d, e + 1),
          (this.lines.length = 0),
          (this.explicitlyCleared = !0),
          this.atomic &&
            this.doc.cantEdit &&
            ((this.doc.cantEdit = !1), a && Lb(a.doc)),
          a && jg(a, "markerCleared", a, this),
          b && yc(a),
          this.parent && this.parent.clear();
      }
    }),
    (pe.prototype.find = function (a, b) {
      null == a && "bookmark" == this.type && (a = 1);
      for (var c, d, e = 0; e < this.lines.length; ++e) {
        var f = this.lines[e],
          g = ye(f.markedSpans, this);
        if (null != g.from && ((c = nb(b ? f : Hf(f), g.from)), -1 == a))
          return c;
        if (null != g.to && ((d = nb(b ? f : Hf(f), g.to)), 1 == a)) return d;
      }
      return c && { from: c, to: d };
    }),
    (pe.prototype.changed = function () {
      var a = this.find(-1, !0),
        b = this,
        c = this.doc.cm;
      a &&
        c &&
        zc(c, function () {
          var d = a.line,
            e = Hf(a.line),
            f = bc(c, e);
          if (
            (f &&
              (gc(f), (c.curOp.selectionChanged = c.curOp.forceUpdate = !0)),
            (c.curOp.updateMaxLine = !0),
            !Ue(b.doc, d) && null != b.height)
          ) {
            var g = b.height;
            b.height = null;
            var h = Ye(b) - g;
            h && Gf(d, d.height + h);
          }
        });
    }),
    (pe.prototype.attachLine = function (a) {
      if (!this.lines.length && this.doc.cm) {
        var b = this.doc.cm.curOp;
        (b.maybeHiddenMarkers && -1 != Bg(b.maybeHiddenMarkers, this)) ||
          (b.maybeUnhiddenMarkers || (b.maybeUnhiddenMarkers = [])).push(this);
      }
      this.lines.push(a);
    }),
    (pe.prototype.detachLine = function (a) {
      if (
        (this.lines.splice(Bg(this.lines, a), 1),
        !this.lines.length && this.doc.cm)
      ) {
        var b = this.doc.cm.curOp;
        (b.maybeHiddenMarkers || (b.maybeHiddenMarkers = [])).push(this);
      }
    });
  var qe = 0,
    se = (y.SharedTextMarker = function (a, b) {
      (this.markers = a), (this.primary = b);
      for (var c = 0; c < a.length; ++c) a[c].parent = this;
    });
  og(se),
    (se.prototype.clear = function () {
      if (!this.explicitlyCleared) {
        this.explicitlyCleared = !0;
        for (var a = 0; a < this.markers.length; ++a) this.markers[a].clear();
        jg(this, "clear");
      }
    }),
    (se.prototype.find = function (a, b) {
      return this.primary.find(a, b);
    });
  var We = (y.LineWidget = function (a, b, c) {
    if (c) for (var d in c) c.hasOwnProperty(d) && (this[d] = c[d]);
    (this.cm = a), (this.node = b);
  });
  og(We),
    (We.prototype.clear = function () {
      var a = this.cm,
        b = this.line.widgets,
        c = this.line,
        d = Hf(c);
      if (null != d && b) {
        for (var e = 0; e < b.length; ++e) b[e] == this && b.splice(e--, 1);
        b.length || (c.widgets = null);
        var f = Ye(this);
        zc(a, function () {
          Xe(a, c, -f), Gc(a, d, "widget"), Gf(c, Math.max(0, c.height - f));
        });
      }
    }),
    (We.prototype.changed = function () {
      var a = this.height,
        b = this.cm,
        c = this.line;
      this.height = null;
      var d = Ye(this) - a;
      d &&
        zc(b, function () {
          (b.curOp.forceUpdate = !0), Xe(b, c, d), Gf(c, c.height + d);
        });
    });
  var $e = (y.Line = function (a, b, c) {
    (this.text = a), Ie(this, b), (this.height = c ? c(this) : 1);
  });
  og($e),
    ($e.prototype.lineNo = function () {
      return Hf(this);
    });
  var jf = {},
    kf = {};
  (vf.prototype = {
    chunkSize: function () {
      return this.lines.length;
    },
    removeInner: function (a, b) {
      for (var c = a, d = a + b; d > c; ++c) {
        var e = this.lines[c];
        (this.height -= e.height), af(e), jg(e, "delete");
      }
      this.lines.splice(a, b);
    },
    collapse: function (a) {
      a.push.apply(a, this.lines);
    },
    insertInner: function (a, b, c) {
      (this.height += c),
        (this.lines = this.lines
          .slice(0, a)
          .concat(b)
          .concat(this.lines.slice(a)));
      for (var d = 0; d < b.length; ++d) b[d].parent = this;
    },
    iterN: function (a, b, c) {
      for (var d = a + b; d > a; ++a) if (c(this.lines[a])) return !0;
    },
  }),
    (wf.prototype = {
      chunkSize: function () {
        return this.size;
      },
      removeInner: function (a, b) {
        this.size -= b;
        for (var c = 0; c < this.children.length; ++c) {
          var d = this.children[c],
            e = d.chunkSize();
          if (e > a) {
            var f = Math.min(b, e - a),
              g = d.height;
            if (
              (d.removeInner(a, f),
              (this.height -= g - d.height),
              e == f && (this.children.splice(c--, 1), (d.parent = null)),
              0 == (b -= f))
            )
              break;
            a = 0;
          } else a -= e;
        }
        if (
          this.size - b < 25 &&
          (this.children.length > 1 || !(this.children[0] instanceof vf))
        ) {
          var h = [];
          this.collapse(h),
            (this.children = [new vf(h)]),
            (this.children[0].parent = this);
        }
      },
      collapse: function (a) {
        for (var b = 0; b < this.children.length; ++b)
          this.children[b].collapse(a);
      },
      insertInner: function (a, b, c) {
        (this.size += b.length), (this.height += c);
        for (var d = 0; d < this.children.length; ++d) {
          var e = this.children[d],
            f = e.chunkSize();
          if (f >= a) {
            if ((e.insertInner(a, b, c), e.lines && e.lines.length > 50)) {
              for (; e.lines.length > 50; ) {
                var g = e.lines.splice(e.lines.length - 25, 25),
                  h = new vf(g);
                (e.height -= h.height),
                  this.children.splice(d + 1, 0, h),
                  (h.parent = this);
              }
              this.maybeSpill();
            }
            break;
          }
          a -= f;
        }
      },
      maybeSpill: function () {
        if (!(this.children.length <= 10)) {
          var a = this;
          do {
            var b = a.children.splice(a.children.length - 5, 5),
              c = new wf(b);
            if (a.parent) {
              (a.size -= c.size), (a.height -= c.height);
              var e = Bg(a.parent.children, a);
              a.parent.children.splice(e + 1, 0, c);
            } else {
              var d = new wf(a.children);
              (d.parent = a), (a.children = [d, c]), (a = d);
            }
            c.parent = a.parent;
          } while (a.children.length > 10);
          a.parent.maybeSpill();
        }
      },
      iterN: function (a, b, c) {
        for (var d = 0; d < this.children.length; ++d) {
          var e = this.children[d],
            f = e.chunkSize();
          if (f > a) {
            var g = Math.min(b, f - a);
            if (e.iterN(a, g, c)) return !0;
            if (0 == (b -= g)) break;
            a = 0;
          } else a -= f;
        }
      },
    });
  var xf = 0,
    yf = (y.Doc = function (a, b, c) {
      if (!(this instanceof yf)) return new yf(a, b, c);
      null == c && (c = 0),
        wf.call(this, [new vf([new $e("", null)])]),
        (this.first = c),
        (this.scrollTop = this.scrollLeft = 0),
        (this.cantEdit = !1),
        (this.cleanGeneration = 1),
        (this.frontier = c);
      var d = nb(c, 0);
      (this.sel = vb(d)),
        (this.history = new Lf(null)),
        (this.id = ++xf),
        (this.modeOption = b),
        "string" == typeof a && (a = eh(a)),
        uf(this, { from: d, to: d, text: a }),
        Ib(this, vb(d), rg);
    });
  (yf.prototype = Dg(wf.prototype, {
    constructor: yf,
    iter: function (a, b, c) {
      c
        ? this.iterN(a - this.first, b - a, c)
        : this.iterN(this.first, this.first + this.size, a);
    },
    insert: function (a, b) {
      for (var c = 0, d = 0; d < b.length; ++d) c += b[d].height;
      this.insertInner(a - this.first, b, c);
    },
    remove: function (a, b) {
      this.removeInner(a - this.first, b);
    },
    getValue: function (a) {
      var b = Ff(this, this.first, this.first + this.size);
      return a === !1 ? b : b.join(a || "\n");
    },
    setValue: Cc(function (a) {
      var b = nb(this.first, 0),
        c = this.first + this.size - 1;
      Fd(
        this,
        {
          from: b,
          to: nb(c, Df(this, c).text.length),
          text: eh(a),
          origin: "setValue",
        },
        !0,
      ),
        Ib(this, vb(b));
    }),
    replaceRange: function (a, b, c, d) {
      (b = xb(this, b)), (c = c ? xb(this, c) : b), Ld(this, a, b, c, d);
    },
    getRange: function (a, b, c) {
      var d = Ef(this, xb(this, a), xb(this, b));
      return c === !1 ? d : d.join(c || "\n");
    },
    getLine: function (a) {
      var b = this.getLineHandle(a);
      return b && b.text;
    },
    getLineHandle: function (a) {
      return zb(this, a) ? Df(this, a) : void 0;
    },
    getLineNumber: function (a) {
      return Hf(a);
    },
    getLineHandleVisualStart: function (a) {
      return "number" == typeof a && (a = Df(this, a)), Qe(a);
    },
    lineCount: function () {
      return this.size;
    },
    firstLine: function () {
      return this.first;
    },
    lastLine: function () {
      return this.first + this.size - 1;
    },
    clipPos: function (a) {
      return xb(this, a);
    },
    getCursor: function (a) {
      var c,
        b = this.sel.primary();
      return (c =
        null == a || "head" == a
          ? b.head
          : "anchor" == a
            ? b.anchor
            : "end" == a || "to" == a || a === !1
              ? b.to()
              : b.from());
    },
    listSelections: function () {
      return this.sel.ranges;
    },
    somethingSelected: function () {
      return this.sel.somethingSelected();
    },
    setCursor: Cc(function (a, b, c) {
      Fb(this, xb(this, "number" == typeof a ? nb(a, b || 0) : a), null, c);
    }),
    setSelection: Cc(function (a, b, c) {
      Fb(this, xb(this, a), xb(this, b || a), c);
    }),
    extendSelection: Cc(function (a, b, c) {
      Cb(this, xb(this, a), b && xb(this, b), c);
    }),
    extendSelections: Cc(function (a, b) {
      Db(this, Ab(this, a, b));
    }),
    extendSelectionsBy: Cc(function (a, b) {
      Db(this, Cg(this.sel.ranges, a), b);
    }),
    setSelections: Cc(function (a, b, c) {
      if (a.length) {
        for (var d = 0, e = []; d < a.length; d++)
          e[d] = new tb(xb(this, a[d].anchor), xb(this, a[d].head));
        null == b && (b = Math.min(a.length - 1, this.sel.primIndex)),
          Ib(this, ub(e, b), c);
      }
    }),
    addSelection: Cc(function (a, b, c) {
      var d = this.sel.ranges.slice(0);
      d.push(new tb(xb(this, a), xb(this, b || a))),
        Ib(this, ub(d, d.length - 1), c);
    }),
    getSelection: function (a) {
      for (var c, b = this.sel.ranges, d = 0; d < b.length; d++) {
        var e = Ef(this, b[d].from(), b[d].to());
        c = c ? c.concat(e) : e;
      }
      return a === !1 ? c : c.join(a || "\n");
    },
    getSelections: function (a) {
      for (var b = [], c = this.sel.ranges, d = 0; d < c.length; d++) {
        var e = Ef(this, c[d].from(), c[d].to());
        a !== !1 && (e = e.join(a || "\n")), (b[d] = e);
      }
      return b;
    },
    replaceSelection: function (a, b, c) {
      for (var d = [], e = 0; e < this.sel.ranges.length; e++) d[e] = a;
      this.replaceSelections(d, b, c || "+input");
    },
    replaceSelections: Cc(function (a, b, c) {
      for (var d = [], e = this.sel, f = 0; f < e.ranges.length; f++) {
        var g = e.ranges[f];
        d[f] = { from: g.from(), to: g.to(), text: eh(a[f]), origin: c };
      }
      for (
        var h = b && "end" != b && Dd(this, d, b), f = d.length - 1;
        f >= 0;
        f--
      )
        Fd(this, d[f]);
      h ? Hb(this, h) : this.cm && Rd(this.cm);
    }),
    undo: Cc(function () {
      Hd(this, "undo");
    }),
    redo: Cc(function () {
      Hd(this, "redo");
    }),
    undoSelection: Cc(function () {
      Hd(this, "undo", !0);
    }),
    redoSelection: Cc(function () {
      Hd(this, "redo", !0);
    }),
    setExtending: function (a) {
      this.extend = a;
    },
    getExtending: function () {
      return this.extend;
    },
    historySize: function () {
      for (var a = this.history, b = 0, c = 0, d = 0; d < a.done.length; d++)
        a.done[d].ranges || ++b;
      for (var d = 0; d < a.undone.length; d++) a.undone[d].ranges || ++c;
      return { undo: b, redo: c };
    },
    clearHistory: function () {
      this.history = new Lf(this.history.maxGeneration);
    },
    markClean: function () {
      this.cleanGeneration = this.changeGeneration(!0);
    },
    changeGeneration: function (a) {
      return (
        a && (this.history.lastOp = this.history.lastOrigin = null),
        this.history.generation
      );
    },
    isClean: function (a) {
      return this.history.generation == (a || this.cleanGeneration);
    },
    getHistory: function () {
      return { done: Wf(this.history.done), undone: Wf(this.history.undone) };
    },
    setHistory: function (a) {
      var b = (this.history = new Lf(this.history.maxGeneration));
      (b.done = Wf(a.done.slice(0), null, !0)),
        (b.undone = Wf(a.undone.slice(0), null, !0));
    },
    markText: function (a, b, c) {
      return re(this, xb(this, a), xb(this, b), c, "range");
    },
    setBookmark: function (a, b) {
      var c = {
        replacedWith: b && (null == b.nodeType ? b.widget : b),
        insertLeft: b && b.insertLeft,
        clearWhenEmpty: !1,
        shared: b && b.shared,
      };
      return (a = xb(this, a)), re(this, a, a, c, "bookmark");
    },
    findMarksAt: function (a) {
      a = xb(this, a);
      var b = [],
        c = Df(this, a.line).markedSpans;
      if (c)
        for (var d = 0; d < c.length; ++d) {
          var e = c[d];
          (null == e.from || e.from <= a.ch) &&
            (null == e.to || e.to >= a.ch) &&
            b.push(e.marker.parent || e.marker);
        }
      return b;
    },
    findMarks: function (a, b, c) {
      (a = xb(this, a)), (b = xb(this, b));
      var d = [],
        e = a.line;
      return (
        this.iter(a.line, b.line + 1, function (f) {
          var g = f.markedSpans;
          if (g)
            for (var h = 0; h < g.length; h++) {
              var i = g[h];
              (e == a.line && a.ch > i.to) ||
                (null == i.from && e != a.line) ||
                (e == b.line && i.from > b.ch) ||
                (c && !c(i.marker)) ||
                d.push(i.marker.parent || i.marker);
            }
          ++e;
        }),
        d
      );
    },
    getAllMarks: function () {
      var a = [];
      return (
        this.iter(function (b) {
          var c = b.markedSpans;
          if (c)
            for (var d = 0; d < c.length; ++d)
              null != c[d].from && a.push(c[d].marker);
        }),
        a
      );
    },
    posFromIndex: function (a) {
      var b,
        c = this.first;
      return (
        this.iter(function (d) {
          var e = d.text.length + 1;
          return e > a ? ((b = a), !0) : ((a -= e), ++c, void 0);
        }),
        xb(this, nb(c, b))
      );
    },
    indexFromPos: function (a) {
      a = xb(this, a);
      var b = a.ch;
      return a.line < this.first || a.ch < 0
        ? 0
        : (this.iter(this.first, a.line, function (a) {
            b += a.text.length + 1;
          }),
          b);
    },
    copy: function (a) {
      var b = new yf(
        Ff(this, this.first, this.first + this.size),
        this.modeOption,
        this.first,
      );
      return (
        (b.scrollTop = this.scrollTop),
        (b.scrollLeft = this.scrollLeft),
        (b.sel = this.sel),
        (b.extend = !1),
        a &&
          ((b.history.undoDepth = this.history.undoDepth),
          b.setHistory(this.getHistory())),
        b
      );
    },
    linkedDoc: function (a) {
      a || (a = {});
      var b = this.first,
        c = this.first + this.size;
      null != a.from && a.from > b && (b = a.from),
        null != a.to && a.to < c && (c = a.to);
      var d = new yf(Ff(this, b, c), a.mode || this.modeOption, b);
      return (
        a.sharedHist && (d.history = this.history),
        (this.linked || (this.linked = [])).push({
          doc: d,
          sharedHist: a.sharedHist,
        }),
        (d.linked = [{ doc: this, isParent: !0, sharedHist: a.sharedHist }]),
        ve(d, ue(this)),
        d
      );
    },
    unlinkDoc: function (a) {
      if ((a instanceof y && (a = a.doc), this.linked))
        for (var b = 0; b < this.linked.length; ++b) {
          var c = this.linked[b];
          if (c.doc == a) {
            this.linked.splice(b, 1), a.unlinkDoc(this), we(ue(this));
            break;
          }
        }
      if (a.history == this.history) {
        var d = [a.id];
        Bf(
          a,
          function (a) {
            d.push(a.id);
          },
          !0,
        ),
          (a.history = new Lf(null)),
          (a.history.done = Wf(this.history.done, d)),
          (a.history.undone = Wf(this.history.undone, d));
      }
    },
    iterLinkedDocs: function (a) {
      Bf(this, a);
    },
    getMode: function () {
      return this.mode;
    },
    getEditor: function () {
      return this.cm;
    },
  })),
    (yf.prototype.eachLine = yf.prototype.iter);
  var zf = "iter insert remove copy getEditor".split(" ");
  for (var Af in yf.prototype)
    yf.prototype.hasOwnProperty(Af) &&
      Bg(zf, Af) < 0 &&
      (y.prototype[Af] = (function (a) {
        return function () {
          return a.apply(this.doc, arguments);
        };
      })(yf.prototype[Af]));
  og(yf);
  var hg,
    $f = (y.e_preventDefault = function (a) {
      a.preventDefault ? a.preventDefault() : (a.returnValue = !1);
    }),
    _f = (y.e_stopPropagation = function (a) {
      a.stopPropagation ? a.stopPropagation() : (a.cancelBubble = !0);
    }),
    bg = (y.e_stop = function (a) {
      $f(a), _f(a);
    }),
    eg = (y.on = function (a, b, c) {
      if (a.addEventListener) a.addEventListener(b, c, !1);
      else if (a.attachEvent) a.attachEvent("on" + b, c);
      else {
        var d = a._handlers || (a._handlers = {}),
          e = d[b] || (d[b] = []);
        e.push(c);
      }
    }),
    fg = (y.off = function (a, b, c) {
      if (a.removeEventListener) a.removeEventListener(b, c, !1);
      else if (a.detachEvent) a.detachEvent("on" + b, c);
      else {
        var d = a._handlers && a._handlers[b];
        if (!d) return;
        for (var e = 0; e < d.length; ++e)
          if (d[e] == c) {
            d.splice(e, 1);
            break;
          }
      }
    }),
    gg = (y.signal = function (a, b) {
      var c = a._handlers && a._handlers[b];
      if (c)
        for (
          var d = Array.prototype.slice.call(arguments, 2), e = 0;
          e < c.length;
          ++e
        )
          c[e].apply(null, d);
    }),
    ig = 0,
    pg = 30,
    qg = (y.Pass = {
      toString: function () {
        return "CodeMirror.Pass";
      },
    }),
    rg = { scroll: !1 },
    sg = { origin: "*mouse" },
    tg = { origin: "+move" };
  ug.prototype.set = function (a, b) {
    clearTimeout(this.id), (this.id = setTimeout(b, a));
  };
  var vg = (y.countColumn = function (a, b, c, d, e) {
      null == b && ((b = a.search(/[^\s\u00a0]/)), -1 == b && (b = a.length));
      for (var f = d || 0, g = e || 0; ; ) {
        var h = a.indexOf("	", f);
        if (0 > h || h >= b) return g + (b - f);
        (g += h - f), (g += c - (g % c)), (f = h + 1);
      }
    }),
    xg = [""],
    Ag = function (a) {
      a.select();
    };
  p
    ? (Ag = function (a) {
        (a.selectionStart = 0), (a.selectionEnd = a.value.length);
      })
    : g &&
      (Ag = function (a) {
        try {
          a.select();
        } catch (b) {}
      }),
    [].indexOf &&
      (Bg = function (a, b) {
        return a.indexOf(b);
      }),
    [].map &&
      (Cg = function (a, b) {
        return a.map(b);
      });
  var Mg,
    Gg =
      /[\u00df\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/,
    Hg = (y.isWordChar = function (a) {
      return (
        /\w/.test(a) ||
        (a > "\x80" && (a.toUpperCase() != a.toLowerCase() || Gg.test(a)))
      );
    }),
    Jg =
      /[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/;
  (Mg = document.createRange
    ? function (a, b, c) {
        var d = document.createRange();
        return d.setEnd(a, c), d.setStart(a, b), d;
      }
    : function (a, b, c) {
        var d = document.body.createTextRange();
        return (
          d.moveToElementText(a.parentNode),
          d.collapse(!0),
          d.moveEnd("character", c),
          d.moveStart("character", b),
          d
        );
      }),
    b &&
      (Qg = function () {
        try {
          return document.activeElement;
        } catch (a) {
          return document.body;
        }
      });
  var $g,
    ah,
    ch,
    Wg = !1,
    Zg = (function () {
      if (d) return !1;
      var a = Lg("div");
      return "draggable" in a || "dragDrop" in a;
    })(),
    eh = (y.splitLines =
      3 != "\n\nb".split(/\n/).length
        ? function (a) {
            for (var b = 0, c = [], d = a.length; d >= b; ) {
              var e = a.indexOf("\n", b);
              -1 == e && (e = a.length);
              var f = a.slice(b, "\r" == a.charAt(e - 1) ? e - 1 : e),
                g = f.indexOf("\r");
              -1 != g
                ? (c.push(f.slice(0, g)), (b += g + 1))
                : (c.push(f), (b = e + 1));
            }
            return c;
          }
        : function (a) {
            return a.split(/\r\n?|\n/);
          }),
    fh = window.getSelection
      ? function (a) {
          try {
            return a.selectionStart != a.selectionEnd;
          } catch (b) {
            return !1;
          }
        }
      : function (a) {
          try {
            var b = a.ownerDocument.selection.createRange();
          } catch (c) {}
          return b && b.parentElement() == a
            ? 0 != b.compareEndPoints("StartToEnd", b)
            : !1;
        },
    gh = (function () {
      var a = Lg("div");
      return "oncopy" in a
        ? !0
        : (a.setAttribute("oncopy", "return;"), "function" == typeof a.oncopy);
    })(),
    hh = {
      3: "Enter",
      8: "Backspace",
      9: "Tab",
      13: "Enter",
      16: "Shift",
      17: "Ctrl",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Esc",
      32: "Space",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "Left",
      38: "Up",
      39: "Right",
      40: "Down",
      44: "PrintScrn",
      45: "Insert",
      46: "Delete",
      59: ";",
      61: "=",
      91: "Mod",
      92: "Mod",
      93: "Mod",
      107: "=",
      109: "-",
      127: "Delete",
      173: "-",
      186: ";",
      187: "=",
      188: ",",
      189: "-",
      190: ".",
      191: "/",
      192: "`",
      219: "[",
      220: "\\",
      221: "]",
      222: "'",
      63232: "Up",
      63233: "Down",
      63234: "Left",
      63235: "Right",
      63272: "Delete",
      63273: "Home",
      63275: "End",
      63276: "PageUp",
      63277: "PageDown",
      63302: "Insert",
    };
  (y.keyNames = hh),
    (function () {
      for (var a = 0; 10 > a; a++) hh[a + 48] = hh[a + 96] = String(a);
      for (var a = 65; 90 >= a; a++) hh[a] = String.fromCharCode(a);
      for (var a = 1; 12 >= a; a++) hh[a + 111] = hh[a + 63235] = "F" + a;
    })();
  var qh,
    vh = (function () {
      function c(c) {
        return 247 >= c
          ? a.charAt(c)
          : c >= 1424 && 1524 >= c
            ? "R"
            : c >= 1536 && 1773 >= c
              ? b.charAt(c - 1536)
              : c >= 1774 && 2220 >= c
                ? "r"
                : c >= 8192 && 8203 >= c
                  ? "w"
                  : 8204 == c
                    ? "b"
                    : "L";
      }
      function j(a, b, c) {
        (this.level = a), (this.from = b), (this.to = c);
      }
      var a =
          "bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN",
        b =
          "rrrrrrrrrrrr,rNNmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmrrrrrrrnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmNmmmm",
        d = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/,
        e = /[stwN]/,
        f = /[LRr]/,
        g = /[Lb1n]/,
        h = /[1n]/,
        i = "L";
      return function (a) {
        if (!d.test(a)) return !1;
        for (var m, b = a.length, k = [], l = 0; b > l; ++l)
          k.push((m = c(a.charCodeAt(l))));
        for (var l = 0, n = i; b > l; ++l) {
          var m = k[l];
          "m" == m ? (k[l] = n) : (n = m);
        }
        for (var l = 0, o = i; b > l; ++l) {
          var m = k[l];
          "1" == m && "r" == o
            ? (k[l] = "n")
            : f.test(m) && ((o = m), "r" == m && (k[l] = "R"));
        }
        for (var l = 1, n = k[0]; b - 1 > l; ++l) {
          var m = k[l];
          "+" == m && "1" == n && "1" == k[l + 1]
            ? (k[l] = "1")
            : "," != m || n != k[l + 1] || ("1" != n && "n" != n) || (k[l] = n),
            (n = m);
        }
        for (var l = 0; b > l; ++l) {
          var m = k[l];
          if ("," == m) k[l] = "N";
          else if ("%" == m) {
            for (var p = l + 1; b > p && "%" == k[p]; ++p);
            for (
              var q =
                  (l && "!" == k[l - 1]) || (b > p && "1" == k[p]) ? "1" : "N",
                r = l;
              p > r;
              ++r
            )
              k[r] = q;
            l = p - 1;
          }
        }
        for (var l = 0, o = i; b > l; ++l) {
          var m = k[l];
          "L" == o && "1" == m ? (k[l] = "L") : f.test(m) && (o = m);
        }
        for (var l = 0; b > l; ++l)
          if (e.test(k[l])) {
            for (var p = l + 1; b > p && e.test(k[p]); ++p);
            for (
              var s = "L" == (l ? k[l - 1] : i),
                t = "L" == (b > p ? k[p] : i),
                q = s || t ? "L" : "R",
                r = l;
              p > r;
              ++r
            )
              k[r] = q;
            l = p - 1;
          }
        for (var v, u = [], l = 0; b > l; )
          if (g.test(k[l])) {
            var w = l;
            for (++l; b > l && g.test(k[l]); ++l);
            u.push(new j(0, w, l));
          } else {
            var x = l,
              y = u.length;
            for (++l; b > l && "L" != k[l]; ++l);
            for (var r = x; l > r; )
              if (h.test(k[r])) {
                r > x && u.splice(y, 0, new j(1, x, r));
                var z = r;
                for (++r; l > r && h.test(k[r]); ++r);
                u.splice(y, 0, new j(2, z, r)), (x = r);
              } else ++r;
            l > x && u.splice(y, 0, new j(1, x, l));
          }
        return (
          1 == u[0].level &&
            (v = a.match(/^\s+/)) &&
            ((u[0].from = v[0].length), u.unshift(new j(0, 0, v[0].length))),
          1 == zg(u).level &&
            (v = a.match(/\s+$/)) &&
            ((zg(u).to -= v[0].length), u.push(new j(0, b - v[0].length, b))),
          u[0].level != zg(u).level && u.push(new j(u[0].level, b, b)),
          u
        );
      };
    })();
  return (y.version = "4.1.1"), y;
}),
  (function (a) {
    "object" == typeof exports && "object" == typeof module
      ? a(require("./codemirror"))
      : "function" == typeof define && define.amd
        ? define(["./codemirror"], a)
        : a(CodeMirror);
  })(function (a) {
    "use strict";
    a.defineMode("javascript", function (b, c) {
      function l(a) {
        for (var c, b = !1, d = !1; null != (c = a.next()); ) {
          if (!b) {
            if ("/" == c && !d) return;
            "[" == c ? (d = !0) : d && "]" == c && (d = !1);
          }
          b = !b && "\\" == c;
        }
      }
      function o(a, b, c) {
        return (m = a), (n = c), b;
      }
      function p(a, b) {
        var c = a.next();
        if ('"' == c || "'" == c) return (b.tokenize = q(c)), b.tokenize(a, b);
        if ("." == c && a.match(/^\d+(?:[eE][+\-]?\d+)?/))
          return o("number", "number");
        if ("." == c && a.match("..")) return o("spread", "meta");
        if (/[\[\]{}\(\),;\:\.]/.test(c)) return o(c);
        if ("=" == c && a.eat(">")) return o("=>", "operator");
        if ("0" == c && a.eat(/x/i))
          return a.eatWhile(/[\da-f]/i), o("number", "number");
        if (/\d/.test(c))
          return (
            a.match(/^\d*(?:\.\d*)?(?:[eE][+\-]?\d+)?/), o("number", "number")
          );
        if ("/" == c)
          return a.eat("*")
            ? ((b.tokenize = r), r(a, b))
            : a.eat("/")
              ? (a.skipToEnd(), o("comment", "comment"))
              : "operator" == b.lastType ||
                  "keyword c" == b.lastType ||
                  "sof" == b.lastType ||
                  /^[\[{}\(,;:]$/.test(b.lastType)
                ? (l(a), a.eatWhile(/[gimy]/), o("regexp", "string-2"))
                : (a.eatWhile(j), o("operator", "operator", a.current()));
        if ("`" == c) return (b.tokenize = s), s(a, b);
        if ("#" == c) return a.skipToEnd(), o("error", "error");
        if (j.test(c))
          return a.eatWhile(j), o("operator", "operator", a.current());
        a.eatWhile(/[\w\$_]/);
        var d = a.current(),
          e = i.propertyIsEnumerable(d) && i[d];
        return e && "." != b.lastType
          ? o(e.type, e.style, d)
          : o("variable", "variable", d);
      }
      function q(a) {
        return function (b, c) {
          var e,
            d = !1;
          if (f && "@" == b.peek() && b.match(k))
            return (c.tokenize = p), o("jsonld-keyword", "meta");
          for (; null != (e = b.next()) && (e != a || d); ) d = !d && "\\" == e;
          return d || (c.tokenize = p), o("string", "string");
        };
      }
      function r(a, b) {
        for (var d, c = !1; (d = a.next()); ) {
          if ("/" == d && c) {
            b.tokenize = p;
            break;
          }
          c = "*" == d;
        }
        return o("comment", "comment");
      }
      function s(a, b) {
        for (var d, c = !1; null != (d = a.next()); ) {
          if (!c && ("`" == d || ("$" == d && a.eat("{")))) {
            b.tokenize = p;
            break;
          }
          c = !c && "\\" == d;
        }
        return o("quasi", "string-2", a.current());
      }
      function u(a, b) {
        b.fatArrowAt && (b.fatArrowAt = null);
        var c = a.string.indexOf("=>", a.start);
        if (!(0 > c)) {
          for (var d = 0, e = !1, f = c - 1; f >= 0; --f) {
            var g = a.string.charAt(f),
              h = t.indexOf(g);
            if (h >= 0 && 3 > h) {
              if (!d) {
                ++f;
                break;
              }
              if (0 == --d) break;
            } else if (h >= 3 && 6 > h) ++d;
            else if (/[$\w]/.test(g)) e = !0;
            else if (e && !d) {
              ++f;
              break;
            }
          }
          e && !d && (b.fatArrowAt = f);
        }
      }
      function w(a, b, c, d, e, f) {
        (this.indented = a),
          (this.column = b),
          (this.type = c),
          (this.prev = e),
          (this.info = f),
          null != d && (this.align = d);
      }
      function x(a, b) {
        for (var c = a.localVars; c; c = c.next) if (c.name == b) return !0;
        for (var d = a.context; d; d = d.prev)
          for (var c = d.vars; c; c = c.next) if (c.name == b) return !0;
      }
      function y(a, b, c, d, e) {
        var f = a.cc;
        for (
          z.state = a,
            z.stream = e,
            z.marked = null,
            z.cc = f,
            a.lexical.hasOwnProperty("align") || (a.lexical.align = !0);
          ;

        ) {
          var h = f.length ? f.pop() : g ? K : J;
          if (h(c, d)) {
            for (; f.length && f[f.length - 1].lex; ) f.pop()();
            return z.marked
              ? z.marked
              : "variable" == c && x(a, d)
                ? "variable-2"
                : b;
          }
        }
      }
      function A() {
        for (var a = arguments.length - 1; a >= 0; a--) z.cc.push(arguments[a]);
      }
      function B() {
        return A.apply(null, arguments), !0;
      }
      function C(a) {
        function b(b) {
          for (var c = b; c; c = c.next) if (c.name == a) return !0;
          return !1;
        }
        var d = z.state;
        if (d.context) {
          if (((z.marked = "def"), b(d.localVars))) return;
          d.localVars = { name: a, next: d.localVars };
        } else {
          if (b(d.globalVars)) return;
          c.globalVars && (d.globalVars = { name: a, next: d.globalVars });
        }
      }
      function E() {
        (z.state.context = { prev: z.state.context, vars: z.state.localVars }),
          (z.state.localVars = D);
      }
      function F() {
        (z.state.localVars = z.state.context.vars),
          (z.state.context = z.state.context.prev);
      }
      function G(a, b) {
        var c = function () {
          var c = z.state,
            d = c.indented;
          "stat" == c.lexical.type && (d = c.lexical.indented),
            (c.lexical = new w(d, z.stream.column(), a, null, c.lexical, b));
        };
        return (c.lex = !0), c;
      }
      function H() {
        var a = z.state;
        a.lexical.prev &&
          (")" == a.lexical.type && (a.indented = a.lexical.indented),
          (a.lexical = a.lexical.prev));
      }
      function I(a) {
        function b(c) {
          return c == a ? B() : ";" == a ? A() : B(b);
        }
        return b;
      }
      function J(a, b) {
        return "var" == a
          ? B(G("vardef", b.length), db, I(";"), H)
          : "keyword a" == a
            ? B(G("form"), K, J, H)
            : "keyword b" == a
              ? B(G("form"), J, H)
              : "{" == a
                ? B(G("}"), ab, H)
                : ";" == a
                  ? B()
                  : "if" == a
                    ? ("else" == z.state.lexical.info &&
                        z.state.cc[z.state.cc.length - 1] == H &&
                        z.state.cc.pop()(),
                      B(G("form"), K, J, H, ib))
                    : "function" == a
                      ? B(ob)
                      : "for" == a
                        ? B(G("form"), jb, J, H)
                        : "variable" == a
                          ? B(G("stat"), V)
                          : "switch" == a
                            ? B(
                                G("form"),
                                K,
                                G("}", "switch"),
                                I("{"),
                                ab,
                                H,
                                H,
                              )
                            : "case" == a
                              ? B(K, I(":"))
                              : "default" == a
                                ? B(I(":"))
                                : "catch" == a
                                  ? B(G("form"), E, I("("), pb, I(")"), J, H, F)
                                  : "module" == a
                                    ? B(G("form"), E, tb, F, H)
                                    : "class" == a
                                      ? B(G("form"), qb, sb, H)
                                      : "export" == a
                                        ? B(G("form"), ub, H)
                                        : "import" == a
                                          ? B(G("form"), vb, H)
                                          : A(G("stat"), K, I(";"), H);
      }
      function K(a) {
        return M(a, !1);
      }
      function L(a) {
        return M(a, !0);
      }
      function M(a, b) {
        if (z.state.fatArrowAt == z.stream.start) {
          var c = b ? U : T;
          if ("(" == a) return B(E, G(")"), $(eb, ")"), H, I("=>"), c, F);
          if ("variable" == a) return A(E, eb, I("=>"), c, F);
        }
        var d = b ? Q : P;
        return v.hasOwnProperty(a)
          ? B(d)
          : "function" == a
            ? B(ob, d)
            : "keyword c" == a
              ? B(b ? O : N)
              : "(" == a
                ? B(G(")"), N, Ab, I(")"), H, d)
                : "operator" == a || "spread" == a
                  ? B(b ? L : K)
                  : "[" == a
                    ? B(G("]"), yb, H, d)
                    : "{" == a
                      ? _(X, "}", null, d)
                      : "quasi" == a
                        ? A(R, d)
                        : B();
      }
      function N(a) {
        return a.match(/[;\}\)\],]/) ? A() : A(K);
      }
      function O(a) {
        return a.match(/[;\}\)\],]/) ? A() : A(L);
      }
      function P(a, b) {
        return "," == a ? B(K) : Q(a, b, !1);
      }
      function Q(a, b, c) {
        var d = 0 == c ? P : Q,
          e = 0 == c ? K : L;
        return "=>" == b
          ? B(E, c ? U : T, F)
          : "operator" == a
            ? /\+\+|--/.test(b)
              ? B(d)
              : "?" == b
                ? B(K, I(":"), e)
                : B(e)
            : "quasi" == a
              ? A(R, d)
              : ";" != a
                ? "(" == a
                  ? _(L, ")", "call", d)
                  : "." == a
                    ? B(W, d)
                    : "[" == a
                      ? B(G("]"), N, I("]"), H, d)
                      : void 0
                : void 0;
      }
      function R(a, b) {
        return "quasi" != a
          ? A()
          : "${" != b.slice(b.length - 2)
            ? B(R)
            : B(K, S);
      }
      function S(a) {
        return "}" == a
          ? ((z.marked = "string-2"), (z.state.tokenize = s), B(R))
          : void 0;
      }
      function T(a) {
        return u(z.stream, z.state), "{" == a ? A(J) : A(K);
      }
      function U(a) {
        return u(z.stream, z.state), "{" == a ? A(J) : A(L);
      }
      function V(a) {
        return ":" == a ? B(H, J) : A(P, I(";"), H);
      }
      function W(a) {
        return "variable" == a ? ((z.marked = "property"), B()) : void 0;
      }
      function X(a, b) {
        if ("variable" == a) {
          if (((z.marked = "property"), "get" == b || "set" == b)) return B(Y);
        } else if ("number" == a || "string" == a)
          z.marked = f ? "property" : a + " property";
        else if ("[" == a) return B(K, I("]"), Z);
        return v.hasOwnProperty(a) ? B(Z) : void 0;
      }
      function Y(a) {
        return "variable" != a ? A(Z) : ((z.marked = "property"), B(ob));
      }
      function Z(a) {
        return ":" == a ? B(L) : "(" == a ? A(ob) : void 0;
      }
      function $(a, b) {
        function c(d) {
          if ("," == d) {
            var e = z.state.lexical;
            return "call" == e.info && (e.pos = (e.pos || 0) + 1), B(a, c);
          }
          return d == b ? B() : B(I(b));
        }
        return function (d) {
          return d == b ? B() : A(a, c);
        };
      }
      function _(a, b, c) {
        for (var d = 3; d < arguments.length; d++) z.cc.push(arguments[d]);
        return B(G(b, c), $(a, b), H);
      }
      function ab(a) {
        return "}" == a ? B() : A(J, ab);
      }
      function bb(a) {
        return h && ":" == a ? B(cb) : void 0;
      }
      function cb(a) {
        return "variable" == a ? ((z.marked = "variable-3"), B()) : void 0;
      }
      function db() {
        return A(eb, bb, gb, hb);
      }
      function eb(a, b) {
        return "variable" == a
          ? (C(b), B())
          : "[" == a
            ? _(eb, "]")
            : "{" == a
              ? _(fb, "}")
              : void 0;
      }
      function fb(a, b) {
        return "variable" != a || z.stream.match(/^\s*:/, !1)
          ? ("variable" == a && (z.marked = "property"), B(I(":"), eb, gb))
          : (C(b), B(gb));
      }
      function gb(a, b) {
        return "=" == b ? B(L) : void 0;
      }
      function hb(a) {
        return "," == a ? B(db) : void 0;
      }
      function ib(a, b) {
        return "keyword b" == a && "else" == b
          ? B(G("form", "else"), J, H)
          : void 0;
      }
      function jb(a) {
        return "(" == a ? B(G(")"), kb, I(")"), H) : void 0;
      }
      function kb(a) {
        return "var" == a
          ? B(db, I(";"), mb)
          : ";" == a
            ? B(mb)
            : "variable" == a
              ? B(lb)
              : A(K, I(";"), mb);
      }
      function lb(a, b) {
        return "in" == b || "of" == b
          ? ((z.marked = "keyword"), B(K))
          : B(P, mb);
      }
      function mb(a, b) {
        return ";" == a
          ? B(nb)
          : "in" == b || "of" == b
            ? ((z.marked = "keyword"), B(K))
            : A(K, I(";"), nb);
      }
      function nb(a) {
        ")" != a && B(K);
      }
      function ob(a, b) {
        return "*" == b
          ? ((z.marked = "keyword"), B(ob))
          : "variable" == a
            ? (C(b), B(ob))
            : "(" == a
              ? B(E, G(")"), $(pb, ")"), H, J, F)
              : void 0;
      }
      function pb(a) {
        return "spread" == a ? B(pb) : A(eb, bb);
      }
      function qb(a, b) {
        return "variable" == a ? (C(b), B(rb)) : void 0;
      }
      function rb(a, b) {
        return "extends" == b ? B(K) : void 0;
      }
      function sb(a) {
        return "{" == a ? _(X, "}") : void 0;
      }
      function tb(a, b) {
        return "string" == a ? B(J) : "variable" == a ? (C(b), B(xb)) : void 0;
      }
      function ub(a, b) {
        return "*" == b
          ? ((z.marked = "keyword"), B(xb, I(";")))
          : "default" == b
            ? ((z.marked = "keyword"), B(K, I(";")))
            : A(J);
      }
      function vb(a) {
        return "string" == a ? B() : A(wb, xb);
      }
      function wb(a, b) {
        return "{" == a ? _(wb, "}") : ("variable" == a && C(b), B());
      }
      function xb(a, b) {
        return "from" == b ? ((z.marked = "keyword"), B(K)) : void 0;
      }
      function yb(a) {
        return "]" == a ? B() : A(L, zb);
      }
      function zb(a) {
        return "for" == a
          ? A(Ab, I("]"))
          : "," == a
            ? B($(L, "]"))
            : A($(L, "]"));
      }
      function Ab(a) {
        return "for" == a ? B(jb, Ab) : "if" == a ? B(K, Ab) : void 0;
      }
      var m,
        n,
        d = b.indentUnit,
        e = c.statementIndent,
        f = c.jsonld,
        g = c.json || f,
        h = c.typescript,
        i = (function () {
          function a(a) {
            return { type: a, style: "keyword" };
          }
          var b = a("keyword a"),
            c = a("keyword b"),
            d = a("keyword c"),
            e = a("operator"),
            f = { type: "atom", style: "atom" },
            g = {
              if: a("if"),
              while: b,
              with: b,
              else: c,
              do: c,
              try: c,
              finally: c,
              return: d,
              break: d,
              continue: d,
              new: d,
              delete: d,
              throw: d,
              debugger: d,
              var: a("var"),
              const: a("var"),
              let: a("var"),
              function: a("function"),
              catch: a("catch"),
              for: a("for"),
              switch: a("switch"),
              case: a("case"),
              default: a("default"),
              in: e,
              typeof: e,
              instanceof: e,
              true: f,
              false: f,
              null: f,
              undefined: f,
              NaN: f,
              Infinity: f,
              this: a("this"),
              module: a("module"),
              class: a("class"),
              super: a("atom"),
              yield: d,
              export: a("export"),
              import: a("import"),
              extends: d,
            };
          if (h) {
            var i = { type: "variable", style: "variable-3" },
              j = {
                interface: a("interface"),
                extends: a("extends"),
                constructor: a("constructor"),
                public: a("public"),
                private: a("private"),
                protected: a("protected"),
                static: a("static"),
                string: i,
                number: i,
                bool: i,
                any: i,
              };
            for (var k in j) g[k] = j[k];
          }
          return g;
        })(),
        j = /[+\-*&%=<>!?|~^]/,
        k =
          /^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/,
        t = "([{}])",
        v = {
          atom: !0,
          number: !0,
          variable: !0,
          string: !0,
          regexp: !0,
          this: !0,
          "jsonld-keyword": !0,
        },
        z = { state: null, column: null, marked: null, cc: null },
        D = { name: "this", next: { name: "arguments" } };
      return (
        (H.lex = !0),
        {
          startState: function (a) {
            var b = {
              tokenize: p,
              lastType: "sof",
              cc: [],
              lexical: new w((a || 0) - d, 0, "block", !1),
              localVars: c.localVars,
              context: c.localVars && { vars: c.localVars },
              indented: 0,
            };
            return (
              c.globalVars &&
                "object" == typeof c.globalVars &&
                (b.globalVars = c.globalVars),
              b
            );
          },
          token: function (a, b) {
            if (
              (a.sol() &&
                (b.lexical.hasOwnProperty("align") || (b.lexical.align = !1),
                (b.indented = a.indentation()),
                u(a, b)),
              b.tokenize != r && a.eatSpace())
            )
              return null;
            var c = b.tokenize(a, b);
            return "comment" == m
              ? c
              : ((b.lastType =
                  "operator" != m || ("++" != n && "--" != n) ? m : "incdec"),
                y(b, c, m, n, a));
          },
          indent: function (b, f) {
            if (b.tokenize == r) return a.Pass;
            if (b.tokenize != p) return 0;
            var g = f && f.charAt(0),
              h = b.lexical;
            if (!/^\s*else\b/.test(f))
              for (var i = b.cc.length - 1; i >= 0; --i) {
                var j = b.cc[i];
                if (j == H) h = h.prev;
                else if (j != ib) break;
              }
            "stat" == h.type && "}" == g && (h = h.prev),
              e && ")" == h.type && "stat" == h.prev.type && (h = h.prev);
            var k = h.type,
              l = g == k;
            return "vardef" == k
              ? h.indented +
                  ("operator" == b.lastType || "," == b.lastType
                    ? h.info + 1
                    : 0)
              : "form" == k && "{" == g
                ? h.indented
                : "form" == k
                  ? h.indented + d
                  : "stat" == k
                    ? h.indented +
                      ("operator" == b.lastType || "," == b.lastType
                        ? e || d
                        : 0)
                    : "switch" != h.info || l || 0 == c.doubleIndentSwitch
                      ? h.align
                        ? h.column + (l ? 0 : 1)
                        : h.indented + (l ? 0 : d)
                      : h.indented +
                        (/^(?:case|default)\b/.test(f) ? d : 2 * d);
          },
          electricChars: ":{}",
          blockCommentStart: g ? null : "/*",
          blockCommentEnd: g ? null : "*/",
          lineComment: g ? null : "//",
          fold: "brace",
          helperType: g ? "json" : "javascript",
          jsonldMode: f,
          jsonMode: g,
        }
      );
    }),
      a.defineMIME("text/javascript", "javascript"),
      a.defineMIME("text/ecmascript", "javascript"),
      a.defineMIME("application/javascript", "javascript"),
      a.defineMIME("application/ecmascript", "javascript"),
      a.defineMIME("application/json", { name: "javascript", json: !0 }),
      a.defineMIME("application/x-json", { name: "javascript", json: !0 }),
      a.defineMIME("application/ld+json", { name: "javascript", jsonld: !0 }),
      a.defineMIME("text/typescript", { name: "javascript", typescript: !0 }),
      a.defineMIME("application/typescript", {
        name: "javascript",
        typescript: !0,
      });
  }),
  (function (a) {
    "object" == typeof exports && "object" == typeof module
      ? a(require("./codemirror"))
      : "function" == typeof define && define.amd
        ? define(["./codemirror"], a)
        : a(CodeMirror);
  })(function (a) {
    function f(a, b) {
      var c = a.getRange(e(b.line, b.ch - 1), e(b.line, b.ch + 1));
      return 2 == c.length ? c : null;
    }
    function g(b) {
      for (
        var c = {
            name: "autoCloseBrackets",
            Backspace: function (c) {
              if (c.getOption("disableInput")) return a.Pass;
              for (var d = c.listSelections(), g = 0; g < d.length; g++) {
                if (!d[g].empty()) return a.Pass;
                var h = f(c, d[g].head);
                if (!h || 0 != b.indexOf(h) % 2) return a.Pass;
              }
              for (var g = d.length - 1; g >= 0; g--) {
                var i = d[g].head;
                c.replaceRange("", e(i.line, i.ch - 1), e(i.line, i.ch + 1));
              }
            },
          },
          g = "",
          h = 0;
        h < b.length;
        h += 2
      )
        !(function (b, f) {
          b != f && (g += f),
            (c["'" + b + "'"] = function (c) {
              if (c.getOption("disableInput")) return a.Pass;
              for (var i, j, h = c.listSelections(), k = 0; k < h.length; k++) {
                var n,
                  l = h[k],
                  m = l.head;
                if ("'" == b && "comment" == c.getTokenTypeAt(m)) return a.Pass;
                var j = c.getRange(m, e(m.line, m.ch + 1));
                if (l.empty())
                  if (b == f && j == f)
                    n =
                      c.getRange(m, e(m.line, m.ch + 3)) == b + b + b
                        ? "skipThree"
                        : "skip";
                  else if (
                    b == f &&
                    m.ch > 1 &&
                    c.getRange(e(m.line, m.ch - 2), m) == b + b &&
                    (m.ch <= 2 ||
                      c.getRange(e(m.line, m.ch - 3), e(m.line, m.ch - 2)) != b)
                  )
                    n = "addFour";
                  else {
                    if (b == f && a.isWordChar(j)) return a.Pass;
                    if (
                      !(
                        c.getLine(m.line).length == m.ch ||
                        g.indexOf(j) >= 0 ||
                        d.test(j)
                      )
                    )
                      return a.Pass;
                    n = "both";
                  }
                else n = "surround";
                if (i) {
                  if (i != n) return a.Pass;
                } else i = n;
              }
              c.operation(function () {
                if ("skip" == i) c.execCommand("goCharRight");
                else if ("skipThree" == i)
                  for (var a = 0; 3 > a; a++) c.execCommand("goCharRight");
                else if ("surround" == i) {
                  for (var d = c.getSelections(), a = 0; a < d.length; a++)
                    d[a] = b + d[a] + f;
                  c.replaceSelections(d, "around");
                } else
                  "both" == i
                    ? (c.replaceSelection(b + f, null),
                      c.execCommand("goCharLeft"))
                    : "addFour" == i &&
                      (c.replaceSelection(b + b + b + b, "before"),
                      c.execCommand("goCharRight"));
              });
            }),
            b != f &&
              (c["'" + f + "'"] = function (b) {
                for (var c = b.listSelections(), d = 0; d < c.length; d++) {
                  var g = c[d];
                  if (
                    !g.empty() ||
                    b.getRange(g.head, e(g.head.line, g.head.ch + 1)) != f
                  )
                    return a.Pass;
                }
                b.execCommand("goCharRight");
              });
        })(b.charAt(h), b.charAt(h + 1));
      return c;
    }
    function h(b) {
      return function (c) {
        if (c.getOption("disableInput")) return a.Pass;
        for (var d = c.listSelections(), e = 0; e < d.length; e++) {
          if (!d[e].empty()) return a.Pass;
          var g = f(c, d[e].head);
          if (!g || 0 != b.indexOf(g) % 2) return a.Pass;
        }
        c.operation(function () {
          c.replaceSelection("\n\n", null),
            c.execCommand("goCharLeft"),
            (d = c.listSelections());
          for (var a = 0; a < d.length; a++) {
            var b = d[a].head.line;
            c.indentLine(b, null, !0), c.indentLine(b + 1, null, !0);
          }
        });
      };
    }
    var b = "()[]{}''\"\"",
      c = "[]{}",
      d = /\s/,
      e = a.Pos;
    a.defineOption("autoCloseBrackets", !1, function (d, e, f) {
      if ((f != a.Init && f && d.removeKeyMap("autoCloseBrackets"), e)) {
        var i = b,
          j = c;
        "string" == typeof e
          ? (i = e)
          : "object" == typeof e &&
            (null != e.pairs && (i = e.pairs),
            null != e.explode && (j = e.explode));
        var k = g(i);
        j && (k.Enter = h(j)), d.addKeyMap(k);
      }
    });
  }),
  (function (a) {
    "object" == typeof exports && "object" == typeof module
      ? a(require("./codemirror"))
      : "function" == typeof define && define.amd
        ? define(["./codemirror"], a)
        : a(CodeMirror);
  })(function (a) {
    function d(b) {
      if (b.getOption("disableInput")) return a.Pass;
      for (var d, c = b.listSelections(), f = [], g = 0; g < c.length; g++) {
        var h = c[g].head,
          i = b.getTokenAt(h);
        if ("comment" != i.type) return a.Pass;
        var j = a.innerMode(b.getMode(), i.state).mode;
        if (d) {
          if (d != j) return a.Pass;
        } else d = j;
        var k = null;
        if (d.blockCommentStart && d.blockCommentContinue) {
          var n,
            l = i.string.indexOf(d.blockCommentEnd),
            m = b.getRange(a.Pos(h.line, 0), a.Pos(h.line, i.end));
          if (
            -1 != l &&
            l == i.string.length - d.blockCommentEnd.length &&
            h.ch >= l
          );
          else if (0 == i.string.indexOf(d.blockCommentStart)) {
            if (((k = m.slice(0, i.start)), !/^\s*$/.test(k))) {
              k = "";
              for (var o = 0; o < i.start; ++o) k += " ";
            }
          } else
            -1 != (n = m.indexOf(d.blockCommentContinue)) &&
              n + d.blockCommentContinue.length > i.start &&
              /^\s*$/.test(m.slice(0, n)) &&
              (k = m.slice(0, n));
          null != k && (k += d.blockCommentContinue);
        }
        if (null == k && d.lineComment && e(b)) {
          var p = b.getLine(h.line),
            n = p.indexOf(d.lineComment);
          n > -1 &&
            ((k = p.slice(0, n)),
            /\S/.test(k)
              ? (k = null)
              : (k +=
                  d.lineComment +
                  p.slice(n + d.lineComment.length).match(/^\s*/)[0]));
        }
        if (null == k) return a.Pass;
        f[g] = "\n" + k;
      }
      b.operation(function () {
        for (var a = c.length - 1; a >= 0; a--)
          b.replaceRange(f[a], c[a].from(), c[a].to(), "+insert");
      });
    }
    function e(a) {
      var b = a.getOption("continueComments");
      return b && "object" == typeof b ? b.continueLineComment !== !1 : !0;
    }
    for (var b = ["clike", "css", "javascript"], c = 0; c < b.length; ++c)
      a.extendMode(b[c], { blockCommentContinue: " * " });
    a.defineOption("continueComments", null, function (b, c, e) {
      if ((e && e != a.Init && b.removeKeyMap("continueComment"), c)) {
        var f = "Enter";
        "string" == typeof c
          ? (f = c)
          : "object" == typeof c && c.key && (f = c.key);
        var g = { name: "continueComment" };
        (g[f] = d), b.addKeyMap(g);
      }
    });
  }),
  (function (a) {
    "object" == typeof exports && "object" == typeof module
      ? a(require("./codemirror"))
      : "function" == typeof define && define.amd
        ? define(["./codemirror"], a)
        : a(CodeMirror);
  })(function (a) {
    function c(a, b) {
      for (var c = 0, d = a.length; d > c; ++c) b(a[c]);
    }
    function d(a, b) {
      if (!Array.prototype.indexOf) {
        for (var c = a.length; c--; ) if (a[c] === b) return !0;
        return !1;
      }
      return -1 != a.indexOf(b);
    }
    function e(c, d, e, f) {
      var g = c.getCursor(),
        h = e(c, g),
        i = h;
      if (!/\b(?:string|comment)\b/.test(h.type)) {
        for (
          h.state = a.innerMode(c.getMode(), h.state).state,
            /^[\w$_]*$/.test(h.string) ||
              (h = i =
                {
                  start: g.ch,
                  end: g.ch,
                  string: "",
                  state: h.state,
                  type: "." == h.string ? "property" : null,
                });
          "property" == i.type;

        ) {
          if (((i = e(c, b(g.line, i.start))), "." != i.string)) return;
          if (((i = e(c, b(g.line, i.start))), !j)) var j = [];
          j.push(i);
        }
        return {
          list: n(h, j, d, f),
          from: b(g.line, h.start),
          to: b(g.line, h.end),
        };
      }
    }
    function f(a, b) {
      return e(
        a,
        l,
        function (a, b) {
          return a.getTokenAt(b);
        },
        b,
      );
    }
    function g(a, b) {
      var c = a.getTokenAt(b);
      return (
        b.ch == c.start + 1 && "." == c.string.charAt(0)
          ? ((c.end = c.start), (c.string = "."), (c.type = "property"))
          : /^\.[\w$_]*$/.test(c.string) &&
            ((c.type = "property"),
            c.start++,
            (c.string = c.string.replace(/\./, ""))),
        c
      );
    }
    function h(a, b) {
      return e(a, m, g, b);
    }
    function n(a, b, e, f) {
      function l(a) {
        0 != a.lastIndexOf(h, 0) || d(g, a) || g.push(a);
      }
      function m(a) {
        "string" == typeof a
          ? c(i, l)
          : a instanceof Array
            ? c(j, l)
            : a instanceof Function && c(k, l);
        for (var b in a) l(b);
      }
      var g = [],
        h = a.string;
      if (b && b.length) {
        var o,
          n = b.pop();
        for (
          n.type && 0 === n.type.indexOf("variable")
            ? (f && f.additionalContext && (o = f.additionalContext[n.string]),
              (o = o || window[n.string]))
            : "string" == n.type
              ? (o = "")
              : "atom" == n.type
                ? (o = 1)
                : "function" == n.type &&
                  (null == window.jQuery ||
                  ("$" != n.string && "jQuery" != n.string) ||
                  "function" != typeof window.jQuery
                    ? null != window._ &&
                      "_" == n.string &&
                      "function" == typeof window._ &&
                      (o = window._())
                    : (o = window.jQuery()));
          null != o && b.length;

        )
          o = o[b.pop().string];
        null != o && m(o);
      } else {
        for (var p = a.state.localVars; p; p = p.next) l(p.name);
        for (var p = a.state.globalVars; p; p = p.next) l(p.name);
        m(window), c(e, l);
      }
      return g;
    }
    var b = a.Pos;
    a.registerHelper("hint", "javascript", f),
      a.registerHelper("hint", "coffeescript", h);
    var i =
        "charAt charCodeAt indexOf lastIndexOf substring substr slice trim trimLeft trimRight toUpperCase toLowerCase split concat match replace search".split(
          " ",
        ),
      j =
        "length concat join splice push pop shift unshift slice reverse sort indexOf lastIndexOf every some filter forEach map reduce reduceRight ".split(
          " ",
        ),
      k = "prototype apply call bind".split(" "),
      l =
        "break case catch continue debugger default delete do else false finally for function if in instanceof new null return switch throw true try typeof var void while with".split(
          " ",
        ),
      m =
        "and break catch class continue delete do else extends false finally for if in instanceof isnt new no not null of off on or return switch then throw true try typeof until void while with yes".split(
          " ",
        );
  }),
  (function (a) {
    "object" == typeof exports && "object" == typeof module
      ? a(require("./codemirror"))
      : "function" == typeof define && define.amd
        ? define(["./codemirror"], a)
        : a(CodeMirror);
  })(function (a) {
    function e(a, b, e, g) {
      var h = a.getLineHandle(b.line),
        i = b.ch - 1,
        j = (i >= 0 && d[h.text.charAt(i)]) || d[h.text.charAt(++i)];
      if (!j) return null;
      var k = ">" == j.charAt(1) ? 1 : -1;
      if (e && k > 0 != (i == b.ch)) return null;
      var l = a.getTokenTypeAt(c(b.line, i + 1)),
        m = f(a, c(b.line, i + (k > 0 ? 1 : 0)), k, l || null, g);
      return null == m
        ? null
        : {
            from: c(b.line, i),
            to: m && m.pos,
            match: m && m.ch == j.charAt(0),
            forward: k > 0,
          };
    }
    function f(a, b, e, f, g) {
      for (
        var h = (g && g.maxScanLineLength) || 1e4,
          i = (g && g.maxScanLines) || 1e3,
          j = [],
          k = g && g.bracketRegex ? g.bracketRegex : /[(){}[\]]/,
          l =
            e > 0
              ? Math.min(b.line + i, a.lastLine() + 1)
              : Math.max(a.firstLine() - 1, b.line - i),
          m = b.line;
        m != l;
        m += e
      ) {
        var n = a.getLine(m);
        if (n) {
          var o = e > 0 ? 0 : n.length - 1,
            p = e > 0 ? n.length : -1;
          if (!(n.length > h))
            for (m == b.line && (o = b.ch - (0 > e ? 1 : 0)); o != p; o += e) {
              var q = n.charAt(o);
              if (
                k.test(q) &&
                (void 0 === f || a.getTokenTypeAt(c(m, o + 1)) == f)
              ) {
                var r = d[q];
                if ((">" == r.charAt(1)) == e > 0) j.push(q);
                else {
                  if (!j.length) return { pos: c(m, o), ch: q };
                  j.pop();
                }
              }
            }
        }
      }
      return m - e == (e > 0 ? a.lastLine() : a.firstLine()) ? !1 : null;
    }
    function g(a, d, f) {
      for (
        var g = a.state.matchBrackets.maxHighlightLineLength || 1e3,
          h = [],
          i = a.listSelections(),
          j = 0;
        j < i.length;
        j++
      ) {
        var k = i[j].empty() && e(a, i[j].head, !1, f);
        if (k && a.getLine(k.from.line).length <= g) {
          var l = k.match
            ? "CodeMirror-matchingbracket"
            : "CodeMirror-nonmatchingbracket";
          h.push(
            a.markText(k.from, c(k.from.line, k.from.ch + 1), { className: l }),
          ),
            k.to &&
              a.getLine(k.to.line).length <= g &&
              h.push(
                a.markText(k.to, c(k.to.line, k.to.ch + 1), { className: l }),
              );
        }
      }
      if (h.length) {
        b && a.state.focused && a.display.input.focus();
        var m = function () {
          a.operation(function () {
            for (var a = 0; a < h.length; a++) h[a].clear();
          });
        };
        if (!d) return m;
        setTimeout(m, 800);
      }
    }
    function i(a) {
      a.operation(function () {
        h && (h(), (h = null)), (h = g(a, !1, a.state.matchBrackets));
      });
    }
    var b =
        /MSIE \d/.test(navigator.userAgent) &&
        (null == document.documentMode || document.documentMode < 8),
      c = a.Pos,
      d = { "(": ")>", ")": "(<", "[": "]>", "]": "[<", "{": "}>", "}": "{<" },
      h = null;
    a.defineOption("matchBrackets", !1, function (b, c, d) {
      d && d != a.Init && b.off("cursorActivity", i),
        c &&
          ((b.state.matchBrackets = "object" == typeof c ? c : {}),
          b.on("cursorActivity", i));
    }),
      a.defineExtension("matchBrackets", function () {
        g(this, !0);
      }),
      a.defineExtension("findMatchingBracket", function (a, b, c) {
        return e(this, a, b, c);
      }),
      a.defineExtension("scanForBracket", function (a, b, c, d) {
        return f(this, a, b, c, d);
      });
  }),
  (function (a) {
    "object" == typeof exports && "object" == typeof module
      ? a(require("./codemirror"))
      : "function" == typeof define && define.amd
        ? define(["./codemirror"], a)
        : a(CodeMirror);
  })(function (a) {
    "use strict";
    function d(a, b, c) {
      (this.cm = a),
        (this.getHints = b),
        (this.options = c),
        (this.widget = this.onClose = null);
    }
    function e(a) {
      return "string" == typeof a ? a : a.text;
    }
    function f(a, b) {
      function e(a, e) {
        var f;
        (f =
          "string" != typeof e
            ? function (a) {
                return e(a, b);
              }
            : c.hasOwnProperty(e)
              ? c[e]
              : e),
          (d[a] = f);
      }
      var c = {
          Up: function () {
            b.moveFocus(-1);
          },
          Down: function () {
            b.moveFocus(1);
          },
          PageUp: function () {
            b.moveFocus(-b.menuSize() + 1, !0);
          },
          PageDown: function () {
            b.moveFocus(b.menuSize() - 1, !0);
          },
          Home: function () {
            b.setFocus(0);
          },
          End: function () {
            b.setFocus(b.length - 1);
          },
          Enter: b.pick,
          Tab: b.pick,
          Esc: b.close,
        },
        d = a.customKeys ? {} : c;
      if (a.customKeys)
        for (var f in a.customKeys)
          a.customKeys.hasOwnProperty(f) && e(f, a.customKeys[f]);
      if (a.extraKeys)
        for (var f in a.extraKeys)
          a.extraKeys.hasOwnProperty(f) && e(f, a.extraKeys[f]);
      return d;
    }
    function g(a, b) {
      for (; b && b != a; ) {
        if ("LI" === b.nodeName.toUpperCase() && b.parentNode == a) return b;
        b = b.parentNode;
      }
    }
    function h(d, h) {
      (this.completion = d), (this.data = h);
      var i = this,
        j = d.cm,
        k = d.options,
        l = (this.hints = document.createElement("ul"));
      (l.className = "CodeMirror-hints"),
        (this.selectedHint = k.getDefaultSelection
          ? k.getDefaultSelection(j, k, h)
          : 0);
      for (var m = h.list, n = 0; n < m.length; ++n) {
        var o = l.appendChild(document.createElement("li")),
          p = m[n],
          q = b + (n != this.selectedHint ? "" : " " + c);
        null != p.className && (q = p.className + " " + q),
          (o.className = q),
          p.render
            ? p.render(o, h, p)
            : o.appendChild(document.createTextNode(p.displayText || e(p))),
          (o.hintId = n);
      }
      var r = j.cursorCoords(k.alignWithWord !== !1 ? h.from : null),
        s = r.left,
        t = r.bottom,
        u = !0;
      (l.style.left = s + "px"), (l.style.top = t + "px");
      var v =
          window.innerWidth ||
          Math.max(
            document.body.offsetWidth,
            document.documentElement.offsetWidth,
          ),
        w =
          window.innerHeight ||
          Math.max(
            document.body.offsetHeight,
            document.documentElement.offsetHeight,
          );
      (k.container || document.body).appendChild(l);
      var x = l.getBoundingClientRect(),
        y = x.bottom - w;
      if (y > 0) {
        var z = x.bottom - x.top,
          A = x.top - (r.bottom - r.top);
        if (A - z > 0) (l.style.top = (t = A - z) + "px"), (u = !1);
        else if (z > w) {
          (l.style.height = w - 5 + "px"),
            (l.style.top = (t = r.bottom - x.top) + "px");
          var B = j.getCursor();
          h.from.ch != B.ch &&
            ((r = j.cursorCoords(B)),
            (l.style.left = (s = r.left) + "px"),
            (x = l.getBoundingClientRect()));
        }
      }
      var C = x.left - v;
      if (
        (C > 0 &&
          (x.right - x.left > v &&
            ((l.style.width = v - 5 + "px"), (C -= x.right - x.left - v)),
          (l.style.left = (s = r.left - C) + "px")),
        j.addKeyMap(
          (this.keyMap = f(k, {
            moveFocus: function (a, b) {
              i.changeActive(i.selectedHint + a, b);
            },
            setFocus: function (a) {
              i.changeActive(a);
            },
            menuSize: function () {
              return i.screenAmount();
            },
            length: m.length,
            close: function () {
              d.close();
            },
            pick: function () {
              i.pick();
            },
            data: h,
          })),
        ),
        k.closeOnUnfocus !== !1)
      ) {
        var D;
        j.on(
          "blur",
          (this.onBlur = function () {
            D = setTimeout(function () {
              d.close();
            }, 100);
          }),
        ),
          j.on(
            "focus",
            (this.onFocus = function () {
              clearTimeout(D);
            }),
          );
      }
      var E = j.getScrollInfo();
      return (
        j.on(
          "scroll",
          (this.onScroll = function () {
            var a = j.getScrollInfo(),
              b = j.getWrapperElement().getBoundingClientRect(),
              c = t + E.top - a.top,
              e =
                c -
                (window.pageYOffset ||
                  (document.documentElement || document.body).scrollTop);
            return (
              u || (e += l.offsetHeight),
              e <= b.top || e >= b.bottom
                ? d.close()
                : ((l.style.top = c + "px"),
                  (l.style.left = s + E.left - a.left + "px"),
                  void 0)
            );
          }),
        ),
        a.on(l, "dblclick", function (a) {
          var b = g(l, a.target || a.srcElement);
          b && null != b.hintId && (i.changeActive(b.hintId), i.pick());
        }),
        a.on(l, "click", function (a) {
          var b = g(l, a.target || a.srcElement);
          b &&
            null != b.hintId &&
            (i.changeActive(b.hintId), k.completeOnSingleClick && i.pick());
        }),
        a.on(l, "mousedown", function () {
          setTimeout(function () {
            j.focus();
          }, 20);
        }),
        a.signal(h, "select", m[0], l.firstChild),
        !0
      );
    }
    var b = "CodeMirror-hint",
      c = "CodeMirror-hint-active";
    (a.showHint = function (b, c, e) {
      if (!(b.listSelections().length > 1 || b.somethingSelected())) {
        if (null == c) {
          if (e && e.async) return;
          c = a.hint.auto;
        }
        b.state.completionActive && b.state.completionActive.close();
        var f = (b.state.completionActive = new d(b, c, e || {}));
        return (
          a.signal(b, "startCompletion", b),
          f.options.async
            ? (c(
                b,
                function (a) {
                  f.showHints(a);
                },
                f.options,
              ),
              void 0)
            : f.showHints(c(b, f.options))
        );
      }
    }),
      (d.prototype = {
        close: function () {
          this.active() &&
            ((this.cm.state.completionActive = null),
            this.widget && this.widget.close(),
            this.onClose && this.onClose(),
            a.signal(this.cm, "endCompletion", this.cm));
        },
        active: function () {
          return this.cm.state.completionActive == this;
        },
        pick: function (b, c) {
          var d = b.list[c];
          d.hint
            ? d.hint(this.cm, b, d)
            : this.cm.replaceRange(
                e(d),
                d.from || b.from,
                d.to || b.to,
                "complete",
              ),
            a.signal(b, "pick", d),
            this.close();
        },
        showHints: function (a) {
          return a && a.list.length && this.active()
            ? (0 != this.options.completeSingle && 1 == a.list.length
                ? this.pick(a, 0)
                : this.showWidget(a),
              void 0)
            : this.close();
        },
        showWidget: function (b) {
          function l() {
            e ||
              ((e = !0),
              d.close(),
              d.cm.off("cursorActivity", p),
              b && a.signal(b, "close"));
          }
          function m() {
            e ||
              (a.signal(b, "update"),
              d.options.async
                ? d.getHints(d.cm, n, d.options)
                : n(d.getHints(d.cm, d.options)));
          }
          function n(a) {
            if (((b = a), !e)) {
              if (!b || !b.list.length) return l();
              d.widget && d.widget.close(), (d.widget = new h(d, b));
            }
          }
          function o() {
            c && (k(c), (c = 0));
          }
          function p() {
            o();
            var a = d.cm.getCursor(),
              b = d.cm.getLine(a.line);
            a.line != g.line ||
            b.length - a.ch != i - g.ch ||
            a.ch < g.ch ||
            d.cm.somethingSelected() ||
            (a.ch && f.test(b.charAt(a.ch - 1)))
              ? d.close()
              : ((c = j(m)), d.widget && d.widget.close());
          }
          (this.widget = new h(this, b)), a.signal(b, "shown");
          var e,
            c = 0,
            d = this,
            f = this.options.closeCharacters || /[\s()\[\]{};:>,]/,
            g = this.cm.getCursor(),
            i = this.cm.getLine(g.line).length,
            j =
              window.requestAnimationFrame ||
              function (a) {
                return setTimeout(a, 1e3 / 60);
              },
            k = window.cancelAnimationFrame || clearTimeout;
          this.cm.on("cursorActivity", p), (this.onClose = l);
        },
      }),
      (h.prototype = {
        close: function () {
          if (this.completion.widget == this) {
            (this.completion.widget = null),
              this.hints.parentNode.removeChild(this.hints),
              this.completion.cm.removeKeyMap(this.keyMap);
            var a = this.completion.cm;
            this.completion.options.closeOnUnfocus !== !1 &&
              (a.off("blur", this.onBlur), a.off("focus", this.onFocus)),
              a.off("scroll", this.onScroll);
          }
        },
        pick: function () {
          this.completion.pick(this.data, this.selectedHint);
        },
        changeActive: function (b, d) {
          if (
            (b >= this.data.list.length
              ? (b = d ? this.data.list.length - 1 : 0)
              : 0 > b && (b = d ? 0 : this.data.list.length - 1),
            this.selectedHint != b)
          ) {
            var e = this.hints.childNodes[this.selectedHint];
            (e.className = e.className.replace(" " + c, "")),
              (e = this.hints.childNodes[(this.selectedHint = b)]),
              (e.className += " " + c),
              e.offsetTop < this.hints.scrollTop
                ? (this.hints.scrollTop = e.offsetTop - 3)
                : e.offsetTop + e.offsetHeight >
                    this.hints.scrollTop + this.hints.clientHeight &&
                  (this.hints.scrollTop =
                    e.offsetTop + e.offsetHeight - this.hints.clientHeight + 3),
              a.signal(
                this.data,
                "select",
                this.data.list[this.selectedHint],
                e,
              );
          }
        },
        screenAmount: function () {
          return (
            Math.floor(
              this.hints.clientHeight / this.hints.firstChild.offsetHeight,
            ) || 1
          );
        },
      }),
      a.registerHelper("hint", "auto", function (b, c) {
        var e,
          d = b.getHelpers(b.getCursor(), "hint");
        if (d.length)
          for (var f = 0; f < d.length; f++) {
            var g = d[f](b, c);
            if (g && g.list.length) return g;
          }
        else if ((e = b.getHelper(b.getCursor(), "hintWords"))) {
          if (e) return a.hint.fromList(b, { words: e });
        } else if (a.hint.anyword) return a.hint.anyword(b, c);
      }),
      a.registerHelper("hint", "fromList", function (b, c) {
        for (
          var d = b.getCursor(), e = b.getTokenAt(d), f = [], g = 0;
          g < c.words.length;
          g++
        ) {
          var h = c.words[g];
          h.slice(0, e.string.length) == e.string && f.push(h);
        }
        return f.length
          ? { list: f, from: a.Pos(d.line, e.start), to: a.Pos(d.line, e.end) }
          : void 0;
      }),
      (a.commands.autocomplete = a.showHint);
  });
