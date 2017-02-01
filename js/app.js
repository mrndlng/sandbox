var ß = function(t) {
    var i = Sizzle(t)
      , n = 1 === i.length ? i[0] : i;
    return n
}
  , Each = function(t, i) {
    t.forEach(function(t, n) {
        i.call(t, n)
    })
}
  , Event = function(t, i, n, s) {
    var e, h = s ? "true" : "false";
    t.constructor === Array ? (e = t.length,
    0 !== e && t.forEach(function(t, s) {
        t.addEventListener(i, n.bind(t, s), h)
    })) : t.addEventListener(i, n, h)
}
  , RemoveEvent = function(t, i, n, s) {
    var e, h = s ? "true" : "false";
    t.constructor === Array ? (e = t.length,
    0 !== e && t.forEach(function(t, s) {
        t.removeEventListener(i, n.bind(t, s), h)
    })) : t.removeEventListener(i, n, h)
}
  , Throttle = function(t, i) {
    var n = !1;
    return function() {
        n || (t.call(),
        n = !0,
        setTimeout(function() {
            n = !1
        }, i))
    }
}
  , UI = {
    mobile: 680,
    tablet: 1026,
    desktop: 1450,
    desktop2: 2e3,
    init: function() {
        this.links()
    },
    links: function() {
        var t = ß(".prevent");
        Event(t, "click", function(t) {
            t.preventDefault()
        })
    }
};
UI.init();
var Draw = {
    i: 0,
    id: "#worldofm",
    full: 1,
    scale: null,
    drawing: !1,
    brush: null,
    brushes: [],
    touch: Modernizr.touchevents,
    pointer: {
        x: 0,
        y: 0
    },
    init: function() {
        "12" === document.body.dataset.id && this.start()
    },
    start: function() {
        this.canvas = ß(this.id),
        this.caption = ß(".caption span"),
        this.header = ß("header"),
        this.context = this.canvas.getContext("2d"),
        this.cursor = window.getComputedStyle(this.canvas).cursor,
        this.mouseDownEvent = this.touch ? "touchstart" : "mousedown",
        this.mouseMoveEvent = this.touch ? "touchmove" : "mousemove",
        this.mouseUpEvent = this.touch ? "touchend" : "mouseup",
        this.updateCanvas(),
        this.loadBrushes(),
        this.bind()
    },
    bind: function() {
        window.addEventListener("resize", Draw.updateCanvas.bind(this)),
        this.canvas.addEventListener(this.mouseDownEvent, Draw.down.bind(this)),
        this.canvas.addEventListener(this.mouseUpEvent, Draw.up.bind(this)),
        this.canvas.addEventListener(this.mouseMoveEvent, Draw.move.bind(this))
    },
    down: function(t) {
        this.drawing = !0,
        this.canvas.style.cursor = "url(data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7), auto",
        this.header.classList.add("nopointer"),
        this.pointPosition(t),
        this.draw(t),
        this.insertCaption()
    },
    up: function() {
        this.drawing = !1,
        this.canvas.style.cursor = this.cursor,
        this.header.classList.remove("nopointer"),
        this.caption.innerHTML = "",
        this.switchBrush()
    },
    move: function(t) {
        this.drawing && (t.preventDefault(),
        this.draw(t))
    },
    loadBrushes: function() {
        var t, n = ß("#slides"), s = n.children;
        for (i = 0; i < s.length; i++)
            t = {
                img: s[i],
                caption: s[i].dataset.caption
            },
            this.brushes.push(t);
        this.brush = this.brushes[this.i],
        n.parentElement.removeChild(n)
    },
    switchBrush: function() {
        this.i += 1,
        this.i >= this.brushes.length && (this.i = 0),
        this.brush = this.brushes[this.i]
    },
    scaleBrush: function() {
        window.innerWidth < UI.mobile ? this.scale = .2 : window.innerWidth < UI.tablet ? this.scale = .35 : window.innerWidth < UI.desktop ? this.scale = .5 : window.innerWidth < UI.desktop2 ? this.scale = .75 : this.scale = this.full
    },
    insertCaption: function() {
        this.brush.caption && (this.caption.innerHTML = this.brush.caption)
    },
    draw: function(t) {
        var i, n, s = this.brush.img.width * this.scale, e = this.brush.img.height * this.scale, h = {
            x: this.pointer.x,
            y: this.pointer.y
        };
        this.pointPosition(t);
        for (var o = {
            x: this.pointer.x,
            y: this.pointer.y
        }, a = this.pointDistance(h, o), r = this.pointAngle(h, o), c = 0; c <= a || 0 === c; c++)
            i = h.x + Math.sin(r) * c - s / 2,
            n = h.y + Math.cos(r) * c - e / 2,
            this.context.drawImage(this.brush.img, i, n, s, e)
    },
    pointPosition: function(t) {
        var i = this.touch ? t.touches[0] : t;
        this.pointer.x = i.pageX - this.canvas.offsetLeft,
        this.pointer.y = i.pageY - this.canvas.offsetTop
    },
    pointDistance: function(t, i) {
        var n = i.x - t.x
          , s = i.y - t.y;
        return Math.sqrt(Math.pow(n, 2) + Math.pow(s, 2))
    },
    pointAngle: function(t, i) {
        var n = i.x - t.x
          , s = i.y - t.y;
        return Math.atan2(n, s)
    },
    updateCanvas: function() {
        this.canvas.width = window.innerWidth,
        this.canvas.height = window.innerHeight,
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height),
        this.scaleBrush()
    }
};
Draw.init();
