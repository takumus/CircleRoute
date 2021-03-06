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
/***/ function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = Object.setPrototypeOf ||
	        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var WF;
	(function (WF) {
	    var HoldableWorm = (function (_super) {
	        __extends(HoldableWorm, _super);
	        function HoldableWorm(length) {
	            return _super.call(this, length) || this;
	        }
	        HoldableWorm.prototype.dispose = function () {
	            this.holder = null;
	            this.prevHolder = null;
	        };
	        HoldableWorm.prototype.setHolder = function (holder, def) {
	            if (def === void 0) { def = false; }
	            if (def)
	                this.holder = holder;
	            this.prevHolder = this.holder;
	            this.holder = holder;
	        };
	        return HoldableWorm;
	    }(WORMS.Base));
	    WF.HoldableWorm = HoldableWorm;
	})(WF || (WF = {}));
	var WF;
	(function (WF) {
	    var Figure = (function (_super) {
	        __extends(Figure, _super);
	        function Figure() {
	            var _this = _super.call(this) || this;
	            _this['__proto__'] = Figure.prototype;
	            return _this;
	        }
	        Figure.prototype.initWithOject = function (data) {
	            var _this = this;
	            this.clear();
	            data.forEach(function (lo) { return _this.push(new ROUTES.Line(lo)); });
	            this._length = this.length;
	        };
	        Figure.prototype.initWithLines = function (data) {
	            var _this = this;
	            this.clear();
	            data.forEach(function (line) { return _this.push(line.clone()); });
	            this._length = this.length;
	        };
	        Figure.prototype.clone = function () {
	            var figure = new Figure();
	            figure.initWithLines(this);
	            return figure;
	        };
	        Figure.prototype.setPositionOffset = function (pos) {
	            this.forEach(function (l) {
	                l.setPositionOffset(pos);
	            });
	            return this;
	        };
	        return Figure;
	    }(UTILS.ArrayWrapper));
	    WF.Figure = Figure;
	})(WF || (WF = {}));
	var WF;
	(function (WF) {
	    var Holder = (function () {
	        function Holder(WormClass) {
	            this._worms = [];
	            this._positionOffset = new UTILS.Pos();
	            this.WormClass = WormClass;
	        }
	        Object.defineProperty(Holder.prototype, "worms", {
	            get: function () { return this._worms; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(Holder.prototype, "figure", {
	            get: function () { return this._figure; },
	            enumerable: true,
	            configurable: true
	        });
	        Object.defineProperty(Holder.prototype, "animating", {
	            get: function () { return this._animating; },
	            set: function (val) { this._animating = val; },
	            enumerable: true,
	            configurable: true
	        });
	        Holder.prototype.setPositionOffset = function (pos) {
	            if (this._animating) {
	                console.error('Cannnot call "Holder.prototype.setPositionOffset" while animating');
	                return;
	            }
	            this._positionOffset = pos;
	            if (this._figure)
	                this._figure.setPositionOffset(pos);
	        };
	        Holder.prototype.setFigure = function (figure) {
	            if (this._animating) {
	                console.error('Cannnot call "Holder.prototype.setFigure" while animating');
	                return;
	            }
	            this._figure = figure.clone();
	            this._figure.setPositionOffset(this._positionOffset);
	        };
	        Holder.prototype.generate = function () {
	            if (this._animating) {
	                console.error('Cannnot call "Holder.prototype.generate" while animating');
	                return;
	            }
	            this.dispose();
	            for (var i = 0; i < this._figure.length; i++) {
	                var l = this._figure[i];
	                var w = new this.WormClass(l.length);
	                w.setHolder(this, true);
	                w.setRoute(l);
	                this._worms.push(w);
	            }
	        };
	        Holder.prototype.dispose = function () {
	            if (this._animating) {
	                console.error('Cannnot call "Holder.prototype.clear" while animating');
	                return;
	            }
	            this._worms.forEach(function (worm) { return worm.dispose(); });
	            this.clear();
	        };
	        Holder.prototype.clear = function () {
	            this._worms = [];
	        };
	        return Holder;
	    }());
	    WF.Holder = Holder;
	})(WF || (WF = {}));
	var WF;
	(function (WF) {
	    var HolderMaster = (function () {
	        function HolderMaster() {
	        }
	        Object.defineProperty(HolderMaster.prototype, "holders", {
	            get: function () { return this._holders; },
	            enumerable: true,
	            configurable: true
	        });
	        ;
	        HolderMaster.prototype.transformMe = function (me, option) {
	            return this.transform(me, me, option);
	        };
	        HolderMaster.prototype.transform = function (fromHolders, toHolders, option) {
	            var _this = this;
	            if (this.animating) {
	                console.error('Cannnot call "HolderMaster.prototype.transform" while animating');
	                return false;
	            }
	            var from = Array.isArray(fromHolders) ? fromHolders : [fromHolders];
	            var to = Array.isArray(toHolders) ? toHolders : [toHolders];
	            option.wave = UTILS.def(option.wave, { enabled: false, amplitude: 0, frequency: 0 });
	            if (typeof option.radius == 'number') {
	                option.radius = { begin: option.radius, end: option.radius };
	            }
	            var animatingHolders = false;
	            from.forEach(function (holder) { if (holder.animating)
	                animatingHolders = true; });
	            to.forEach(function (holder) { if (holder.animating)
	                animatingHolders = true; });
	            if (animatingHolders) {
	                console.error('Cannnot call "HolderMaster.prototype.transform" while Holder[] is animating');
	                return false;
	            }
	            this._holders = to;
	            this.step = 0;
	            var worms = [];
	            from.forEach(function (holder) {
	                holder.worms.forEach(function (worm) {
	                    worms.push(worm);
	                });
	                holder.clear();
	            });
	            // create init worms
	            if (worms.length == 0) {
	                to.forEach(function (holder) {
	                    holder.generate();
	                });
	                return true;
	            }
	            var lineCount = 0;
	            to.forEach(function (holder) { return lineCount += holder.figure.length; });
	            // create if need more worms
	            if (worms.length < lineCount) {
	                var prevWorms = worms.concat();
	                var prevWormsLength = prevWorms.length;
	                for (var i = prevWormsLength; i < lineCount; i++) {
	                    var pw = prevWorms[Math.floor(Math.random() * prevWormsLength)];
	                    var w = new pw.holder.WormClass(pw.currentLength);
	                    w.setHolder(pw.holder, true);
	                    w.setRoute(pw.getCurrentLine());
	                    worms.push(w);
	                }
	            }
	            // shuffle
	            UTILS.shuffle(worms);
	            UTILS.shuffle(to);
	            // generate route to figures
	            to.forEach(function (holder) {
	                for (var i = 0; i < holder.figure.length; i++) {
	                    var line = holder.figure[i];
	                    var worm = worms.pop();
	                    worm.setHolder(holder);
	                    _this.setRoute(worm, line, option);
	                    holder.worms.push(worm);
	                }
	                holder.animating = true;
	            });
	            worms.forEach(function (worm) {
	                var holder = to[Math.floor(Math.random() * to.length)];
	                var figure = holder.figure;
	                var target = figure[Math.floor(Math.random() * figure.length)];
	                worm.setHolder(holder);
	                _this.setRoute(worm, target, option);
	                holder.worms.push(worm);
	            });
	            this.animating = true;
	            return true;
	        };
	        HolderMaster.prototype.setRoute = function (worm, target, option) {
	            target = target.clone();
	            if (Math.random() < 0.5)
	                worm.reverse();
	            if (Math.random() < 0.5)
	                target.reverse();
	            var route = ROUTES.RouteGenerator.getMinimumRoute(worm.getHeadVecPos(), target.getHeadVecPos(), option.radius.begin, option.radius.end, option.resolution);
	            if (option.wave.enabled)
	                route.wave(option.wave.amplitude, option.wave.frequency);
	            worm.setRoute(worm.getCurrentLine()
	                .pushLine(route)
	                .pushLine(target), target.length);
	        };
	        HolderMaster.prototype.endMovement = function () {
	            var _this = this;
	            if (!this.animating) {
	                console.error('Cannnot call "HolderMaster.prototype.endMovement" after completed animation');
	                return;
	            }
	            this._holders.forEach(function (holder) {
	                if (_this.step == 1) {
	                    // completely complete
	                    var removedWorms = holder.worms.splice(holder.figure.length);
	                    // holder.setStepToAll(1);
	                    holder.worms.forEach(function (worm) { return worm.updateLength(); });
	                    removedWorms.forEach(function (worm) { return worm.dispose(); });
	                    // console.log('completely complete!!');
	                }
	                else {
	                    // force complete
	                    holder.worms.forEach(function (worm) { return worm.updateLength(); });
	                    // console.log('force complete!!');
	                }
	                holder.animating = false;
	            });
	            this.autoTweening = false;
	            this.animating = false;
	            // console.log('all worms:' + WF.FigureWorm.getWorms().length);
	        };
	        HolderMaster.prototype.autoTween = function (time, delay, complete) {
	            var _this = this;
	            if (!this.animating) {
	                // console.error('Cannnot call "HolderMaster.prototype.autoTween" while not animating');
	                return;
	            }
	            if (this.autoTweening) {
	                console.error('Cannnot call "HolderMaster.prototype.autoTween" while autoTweening');
	                return;
	            }
	            this.autoTweening = true;
	            var props = { s: 0 };
	            // move worms
	            new TWEEN.Tween(props)
	                .easing(TWEEN.Easing.Sinusoidal.InOut)
	                .to({ s: 1 }, time)
	                .onUpdate(function () {
	                _this.setStep(props.s);
	            })
	                .onComplete(function () {
	                _this.endMovement();
	                if (complete)
	                    complete();
	            })
	                .delay(delay)
	                .start();
	        };
	        HolderMaster.prototype.setStep = function (step) {
	            if (!this.animating) {
	                console.error('Cannnot call "HolderMaster.prototype.setStep" after completed animation');
	                return;
	            }
	            this.step = step;
	            this._holders.forEach(function (holder) {
	                if (!holder.animating) {
	                    console.error('already ended');
	                    return;
	                }
	                // holder.setStepToAll(step);
	                holder.worms.forEach(function (worm) {
	                    // this.setStepToWorm(worm, step, <T>worm.prevHolder, <T>worm.holder);
	                    worm.setStep(step);
	                });
	            });
	        };
	        HolderMaster.prototype.dispose = function () {
	            this._holders = null;
	        };
	        return HolderMaster;
	    }());
	    WF.HolderMaster = HolderMaster;
	})(WF || (WF = {}));
	/// <reference path="./worms/worm.ts" />
	/// <reference path="./figures/figure.ts" />
	/// <reference path="./figures/holder.ts" />
	/// <reference path="./figures/holderMaster.ts" />
	window['WF'] = WF;


/***/ }
/******/ ]);