/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var utils_1 = __webpack_require__(1);
	var route_1 = __webpack_require__(3);
	var renderer;
	var stage = new PIXI.Container();
	var canvas;
	var sw, sh;
	var init = function () {
	    renderer = PIXI.autoDetectRenderer(800, 800, { antialias: true });
	    canvas = document.getElementById("content");
	    canvas.appendChild(renderer.view);
	    renderer.view.style.width = "100%";
	    renderer.view.style.height = "100%";
	    window.addEventListener("resize", resize);
	    var shape = new PIXI.Graphics();
	    shape.lineStyle(2, 0xffffff);
	    shape.moveTo(0, 0);
	    shape.lineTo(100, 100);
	    shape.drawCircle(50, 50, 50);
	    stage.addChild(shape);
	    window.onresize = function () {
	        resize();
	    };
	    draw();
	    resize();
	    var g = new PIXI.Graphics();
	    stage.addChild(g);
	    var rg = new route_1.RouteGenerator(g);
	    g.lineStyle(2, 0xff0000);
	    rg.getAllRoute(new utils_1.VecPos(100, 100, 0), new utils_1.VecPos(250, 300, 0), 50, 50);
	};
	var draw = function () {
	    TWEEN.update();
	    renderer.render(stage);
	    requestAnimationFrame(draw);
	};
	var resize = function () {
	    var width = canvas.offsetWidth * 2;
	    var height = canvas.offsetHeight * 2;
	    sw = width;
	    sh = height;
	    renderer.resize(width, height);
	};
	window.onload = init;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var matthew_1 = __webpack_require__(2);
	var Pos = (function () {
	    function Pos(x, y) {
	        if (x === void 0) { x = 0; }
	        if (y === void 0) { y = 0; }
	        this.x = 0;
	        this.y = 0;
	        this.x = x;
	        this.y = y;
	    }
	    return Pos;
	}());
	exports.Pos = Pos;
	var VecPos = (function () {
	    function VecPos(x, y, r) {
	        if (x === void 0) { x = 0; }
	        if (y === void 0) { y = 0; }
	        if (r === void 0) { r = 0; }
	        this.r = 0;
	        this.pos = new Pos(x, y);
	        this.r = r;
	    }
	    return VecPos;
	}());
	exports.VecPos = VecPos;
	var Circle = (function () {
	    function Circle(x, y, r, d, tr) {
	        this.pos = new Pos(x, y);
	        this.r = r;
	        this.d = d;
	        this.tr = matthew_1.default.normalize(tr);
	    }
	    return Circle;
	}());
	exports.Circle = Circle;


/***/ },
/* 2 */
/***/ function(module, exports) {

	"use strict";
	var Matthew = (function () {
	    function Matthew() {
	    }
	    Matthew.normalize = function (r) {
	        r = r % this.D_PI;
	        if (r < 0)
	            return this.D_PI + r;
	        return r;
	    };
	    Matthew.abs = function (v) {
	        return v < 0 ? -v : v;
	    };
	    return Matthew;
	}());
	Matthew.PI = Math.PI;
	Matthew.H_PI = Math.PI / 2;
	Matthew.D_PI = Math.PI * 2;
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = Matthew;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var utils_1 = __webpack_require__(1);
	var matthew_1 = __webpack_require__(2);
	var Route = (function () {
	    function Route(c1, c2, c1rb, c2rb, c1rl, c2rl) {
	        this.c1 = c1;
	        this.c2 = c2;
	        this.c1rb = c1rb;
	        this.c2rb = c2rb;
	        this.c1rl = c1rl;
	        this.c2rl = c2rl;
	    }
	    Route.prototype.generateRoute = function (res, route) {
	        if (route === void 0) { route = null; }
	        var _route;
	        if (route) {
	            _route = route;
	            _route.length = 0;
	        }
	        else {
	            _route = new Array();
	        }
	        var c1rres = res / (this.c1.r * 2 * matthew_1.default.PI) * matthew_1.default.D_PI;
	        var c2rres = res / (this.c2.r * 2 * matthew_1.default.PI) * matthew_1.default.D_PI;
	        var _x = Math.cos(this.c1rb) * this.c1.r + this.c1.pos.x;
	        var _y = Math.sin(this.c1rb) * this.c1.r + this.c1.pos.y;
	        var tr;
	        for (var _r = 0; _r < matthew_1.default.abs(this.c1rl); _r += c1rres) {
	            tr = this.c1rb + _r * this.c1.d;
	            _x = Math.cos(tr) * this.c1.r + this.c1.pos.x;
	            _y = Math.sin(tr) * this.c1.r + this.c1.pos.y;
	            _route.push(new utils_1.VecPos(_x, _y, tr + matthew_1.default.H_PI * this.c1.d));
	        }
	        _route.pop();
	        this.getLineRoot(new utils_1.Pos(_x, _y), new utils_1.Pos(Math.cos(this.c2rb) * this.c2.r + this.c2.pos.x, Math.sin(this.c2rb) * this.c2.r + this.c2.pos.y), res, _route);
	        //trace(_x, _y, Math.cos(c2rb) * c2.r + c2.pos.x, Math.sin(c2rb) * c2.r + c2.pos.y)
	        for (_r = 0; _r < matthew_1.default.abs(this.c2rl) - c2rres; _r += c2rres) {
	            tr = this.c2rb + _r * this.c2.d;
	            _x = Math.cos(tr) * this.c2.r + this.c2.pos.x;
	            _y = Math.sin(tr) * this.c2.r + this.c2.pos.y;
	            _route.push(new utils_1.VecPos(_x, _y, tr + matthew_1.default.H_PI * this.c2.d));
	        }
	        _route.push(new utils_1.VecPos(Math.cos(this.c2rb + (matthew_1.default.abs(this.c2rl)) * this.c2.d) * this.c2.r + this.c2.pos.x, Math.sin(this.c2rb + (matthew_1.default.abs(this.c2rl)) * this.c2.d) * this.c2.r + this.c2.pos.y, this.c2rb + matthew_1.default.abs(this.c2rl) * this.c2.d + matthew_1.default.H_PI * this.c2.d));
	        return _route;
	    };
	    Route.prototype.getLength = function () {
	        var t1x, t1y;
	        var t2x, t2y;
	        var dx, dy;
	        var l = 0;
	        l += this.c1.r * 2 * matthew_1.default.PI * (matthew_1.default.abs(this.c1rl) / (matthew_1.default.D_PI));
	        l += this.c2.r * 2 * matthew_1.default.PI * (matthew_1.default.abs(this.c2rl) / (matthew_1.default.D_PI));
	        t1x = Math.cos(this.c1rb + this.c1rl) * this.c1.r + this.c1.pos.x;
	        t1y = Math.sin(this.c1rb + this.c1rl) * this.c1.r + this.c1.pos.y;
	        t2x = Math.cos(this.c2rb) * this.c2.r + this.c2.pos.x;
	        t2y = Math.sin(this.c2rb) * this.c2.r + this.c2.pos.y;
	        dx = t1x - t2x;
	        dy = t1y - t2y;
	        l += Math.sqrt(dx * dx + dy * dy);
	        return l;
	    };
	    Route.prototype.getLineRoot = function (bp, ep, res, vector) {
	        var tx = ep.x - bp.x;
	        var ty = ep.y - bp.y;
	        var r = Math.atan2(ty, tx);
	        var dx = Math.cos(r) * res;
	        var dy = Math.sin(r) * res;
	        var l = Math.sqrt(tx * tx + ty * ty) - res;
	        for (var i = 0; i < l / res; i++) {
	            var x = dx * i + bp.x;
	            var y = dy * i + bp.y;
	            vector.push(new utils_1.VecPos(x, y, r));
	        }
	    };
	    return Route;
	}());
	exports.Route = Route;
	var RouteGenerator = (function () {
	    function RouteGenerator(graphics) {
	        this.graphics = graphics;
	    }
	    RouteGenerator.prototype.getAllRoute = function (vposB, vposE, rB, rE) {
	        var cB1;
	        var cB2;
	        var cE1;
	        var cE2;
	        var tx;
	        var ty;
	        var tr;
	        tx = Math.cos(vposB.r + matthew_1.default.H_PI) * rB + vposB.pos.x;
	        ty = Math.sin(vposB.r + matthew_1.default.H_PI) * rB + vposB.pos.y;
	        cB1 = new utils_1.Circle(tx, ty, rB, 1, vposB.r - matthew_1.default.H_PI);
	        tx = Math.cos(vposB.r - matthew_1.default.H_PI) * rB + vposB.pos.x;
	        ty = Math.sin(vposB.r - matthew_1.default.H_PI) * rB + vposB.pos.y;
	        cB2 = new utils_1.Circle(tx, ty, rB, -1, vposB.r + matthew_1.default.H_PI);
	        tx = Math.cos(vposE.r + matthew_1.default.H_PI) * rE + vposE.pos.x;
	        ty = Math.sin(vposE.r + matthew_1.default.H_PI) * rE + vposE.pos.y;
	        cE1 = new utils_1.Circle(tx, ty, rE, 1, vposE.r - matthew_1.default.H_PI);
	        tx = Math.cos(vposE.r - matthew_1.default.H_PI) * rE + vposE.pos.x;
	        ty = Math.sin(vposE.r - matthew_1.default.H_PI) * rE + vposE.pos.y;
	        cE2 = new utils_1.Circle(tx, ty, rE, -1, vposE.r + matthew_1.default.H_PI);
	        var allRoute = [];
	        var route;
	        route = this.getRoute(cB1, cE1);
	        if (route)
	            allRoute.push(route);
	        route = this.getRoute(cB1, cE2);
	        if (route)
	            allRoute.push(route);
	        route = this.getRoute(cB2, cE1);
	        if (route)
	            allRoute.push(route);
	        route = this.getRoute(cB2, cE2);
	        if (route)
	            allRoute.push(route);
	        return allRoute;
	    };
	    RouteGenerator.prototype.getRoute = function (c1, c2) {
	        var dx = c2.pos.x - c1.pos.x;
	        var dy = c2.pos.y - c1.pos.y;
	        var l = dx * dx + dy * dy;
	        var a1 = new utils_1.Pos(), a2 = new utils_1.Pos(), b1 = new utils_1.Pos(), b2 = new utils_1.Pos();
	        var br = Math.atan2(c2.pos.y - c1.pos.y, c2.pos.x - c1.pos.x);
	        var r;
	        var D;
	        var c1tr = c1.tr;
	        var c2tr = c2.tr;
	        var c1r;
	        var c2r;
	        var c1dr;
	        var c2dr;
	        this.circle(c1.pos.x + Math.cos(c1tr) * c1.r, c1.pos.y + Math.sin(c1tr) * c1.r, 3);
	        this.circle(c2.pos.x + Math.cos(c2tr) * c2.r, c2.pos.y + Math.sin(c2tr) * c2.r, 3);
	        if (c1.d == c2.d) {
	            D = l - (c2.r - c1.r) * (c2.r - c1.r);
	            if (D < 0)
	                return null;
	            D = Math.sqrt(D);
	            a1.x = c1.r * ((c1.r - c2.r) * dx + D * dy) / l + c1.pos.x;
	            a1.y = c1.r * ((c1.r - c2.r) * dy - D * dx) / l + c1.pos.y;
	            a2.x = c1.r * ((c1.r - c2.r) * dx - D * dy) / l + c1.pos.x;
	            a2.y = c1.r * ((c1.r - c2.r) * dy + D * dx) / l + c1.pos.y;
	            b1.x = c2.r * ((c2.r - c1.r) * -dx - D * -dy) / l + c2.pos.x;
	            b1.y = c2.r * ((c2.r - c1.r) * -dy + D * -dx) / l + c2.pos.y;
	            b2.x = c2.r * ((c2.r - c1.r) * -dx + D * -dy) / l + c2.pos.x;
	            b2.y = c2.r * ((c2.r - c1.r) * -dy - D * -dx) / l + c2.pos.y;
	            r = Math.atan2(a1.y - c1.pos.y, a1.x - c1.pos.x) - br;
	            if (c1.d > 0) {
	                c2r = c1r = matthew_1.default.normalize(r + br);
	                this.line(a1.x, a1.y, b1.x, b1.y);
	            }
	            else {
	                c2r = c1r = matthew_1.default.normalize(-r + br);
	                this.line(a2.x, a2.y, b2.x, b2.y);
	            }
	            this.line(c1.pos.x, c1.pos.y, Math.cos(c1r) * c1.r + c1.pos.x, Math.sin(c1r) * c1.r + c1.pos.y);
	            this.line(c2.pos.x, c2.pos.y, Math.cos(c2r) * c2.r + c2.pos.x, Math.sin(c2r) * c2.r + c2.pos.y);
	        }
	        else if (c1.d != c2.d) {
	            D = l - (c2.r + c1.r) * (c2.r + c1.r);
	            if (D < 0)
	                return null;
	            D = Math.sqrt(D);
	            a1.x = c1.r * ((c2.r + c1.r) * dx + D * dy) / l + c1.pos.x;
	            a1.y = c1.r * ((c2.r + c1.r) * dy - D * dx) / l + c1.pos.y;
	            a2.x = c1.r * ((c2.r + c1.r) * dx - D * dy) / l + c1.pos.x;
	            a2.y = c1.r * ((c2.r + c1.r) * dy + D * dx) / l + c1.pos.y;
	            b1.x = c2.r * ((c1.r + c2.r) * -dx + D * -dy) / l + c2.pos.x;
	            b1.y = c2.r * ((c1.r + c2.r) * -dy - D * -dx) / l + c2.pos.y;
	            b2.x = c2.r * ((c1.r + c2.r) * -dx - D * -dy) / l + c2.pos.x;
	            b2.y = c2.r * ((c1.r + c2.r) * -dy + D * -dx) / l + c2.pos.y;
	            r = Math.atan2(a1.y - c1.pos.y, a1.x - c1.pos.x) - br;
	            if (c1.d > 0) {
	                c1r = matthew_1.default.normalize(r + br);
	                c2r = matthew_1.default.normalize(r + br + matthew_1.default.PI);
	                this.line(a1.x, a1.y, b1.x, b1.y);
	            }
	            else {
	                c1r = matthew_1.default.normalize(-r + br);
	                c2r = matthew_1.default.normalize(-r + br + matthew_1.default.PI);
	                this.line(a2.x, a2.y, b2.x, b2.y);
	            }
	            this.line(c1.pos.x, c1.pos.y, Math.cos(c1r) * c1.r + c1.pos.x, Math.sin(c1r) * c1.r + c1.pos.y);
	            this.line(c2.pos.x, c2.pos.y, Math.cos(c2r) * c2.r + c2.pos.x, Math.sin(c2r) * c2.r + c2.pos.y);
	        }
	        if (c1.d > 0) {
	            if (c1.tr < c1r) {
	                c1dr = c1r - c1.tr;
	            }
	            else {
	                c1dr = matthew_1.default.D_PI - (c1.tr - c1r);
	            }
	        }
	        else {
	            if (c1.tr < c1r) {
	                c1dr = matthew_1.default.D_PI - (c1r - c1.tr);
	            }
	            else {
	                c1dr = c1.tr - c1r;
	            }
	        }
	        if (c2.d > 0) {
	            if (c2r < c2.tr) {
	                c2dr = c2.tr - c2r;
	            }
	            else {
	                c2dr = matthew_1.default.D_PI - (c2r - c2.tr);
	            }
	        }
	        else {
	            if (c2r < c2.tr) {
	                c2dr = matthew_1.default.D_PI - (c2.tr - c2r);
	            }
	            else {
	                c2dr = c2r - c2.tr;
	            }
	        }
	        this.circle(c1.pos.x, c1.pos.y, 2);
	        this.circle(c2.pos.x, c2.pos.y, 2);
	        this.circle(c1.pos.x, c1.pos.y, c1.r);
	        this.circle(c2.pos.x, c2.pos.y, c2.r);
	        return new Route(c1, c2, c1.tr, c2r, c1dr * c1.d, c2dr * c2.d);
	    };
	    RouteGenerator.prototype.line = function (x1, y1, x2, y2) {
	        this.graphics.moveTo(x1, y1);
	        this.graphics.lineTo(x2, y2);
	    };
	    RouteGenerator.prototype.circle = function (x, y, r) {
	        this.graphics.drawCircle(x, y, r);
	    };
	    return RouteGenerator;
	}());
	exports.RouteGenerator = RouteGenerator;


/***/ }
/******/ ]);