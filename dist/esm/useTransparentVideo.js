function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return exports; }; var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function (obj, key, desc) { obj[key] = desc.value; }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag"; function define(obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: !0, configurable: !0, writable: !0 }), obj[key]; } try { define({}, ""); } catch (err) { define = function define(obj, key, value) { return obj[key] = value; }; } function wrap(innerFn, outerFn, self, tryLocsList) { var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context(tryLocsList || []); return defineProperty(generator, "_invoke", { value: makeInvokeMethod(innerFn, self, context) }), generator; } function tryCatch(fn, obj, arg) { try { return { type: "normal", arg: fn.call(obj, arg) }; } catch (err) { return { type: "throw", arg: err }; } } exports.wrap = wrap; var ContinueSentinel = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var IteratorPrototype = {}; define(IteratorPrototype, iteratorSymbol, function () { return this; }); var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([]))); NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype); var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype); function defineIteratorMethods(prototype) { ["next", "throw", "return"].forEach(function (method) { define(prototype, method, function (arg) { return this._invoke(method, arg); }); }); } function AsyncIterator(generator, PromiseImpl) { function invoke(method, arg, resolve, reject) { var record = tryCatch(generator[method], generator, arg); if ("throw" !== record.type) { var result = record.arg, value = result.value; return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) { invoke("next", value, resolve, reject); }, function (err) { invoke("throw", err, resolve, reject); }) : PromiseImpl.resolve(value).then(function (unwrapped) { result.value = unwrapped, resolve(result); }, function (error) { return invoke("throw", error, resolve, reject); }); } reject(record.arg); } var previousPromise; defineProperty(this, "_invoke", { value: function value(method, arg) { function callInvokeWithMethodAndArg() { return new PromiseImpl(function (resolve, reject) { invoke(method, arg, resolve, reject); }); } return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(innerFn, self, context) { var state = "suspendedStart"; return function (method, arg) { if ("executing" === state) throw new Error("Generator is already running"); if ("completed" === state) { if ("throw" === method) throw arg; return doneResult(); } for (context.method = method, context.arg = arg;;) { var delegate = context.delegate; if (delegate) { var delegateResult = maybeInvokeDelegate(delegate, context); if (delegateResult) { if (delegateResult === ContinueSentinel) continue; return delegateResult; } } if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) { if ("suspendedStart" === state) throw state = "completed", context.arg; context.dispatchException(context.arg); } else "return" === context.method && context.abrupt("return", context.arg); state = "executing"; var record = tryCatch(innerFn, self, context); if ("normal" === record.type) { if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue; return { value: record.arg, done: context.done }; } "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg); } }; } function maybeInvokeDelegate(delegate, context) { var methodName = context.method, method = delegate.iterator[methodName]; if (undefined === method) return context.delegate = null, "throw" === methodName && delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel; var record = tryCatch(method, delegate.iterator, context.arg); if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel; var info = record.arg; return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel); } function pushTryEntry(locs) { var entry = { tryLoc: locs[0] }; 1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry); } function resetTryEntry(entry) { var record = entry.completion || {}; record.type = "normal", delete record.arg, entry.completion = record; } function Context(tryLocsList) { this.tryEntries = [{ tryLoc: "root" }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0); } function values(iterable) { if (iterable) { var iteratorMethod = iterable[iteratorSymbol]; if (iteratorMethod) return iteratorMethod.call(iterable); if ("function" == typeof iterable.next) return iterable; if (!isNaN(iterable.length)) { var i = -1, next = function next() { for (; ++i < iterable.length;) if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next; return next.value = undefined, next.done = !0, next; }; return next.next = next; } } return { next: doneResult }; } function doneResult() { return { value: undefined, done: !0 }; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), defineProperty(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) { var ctor = "function" == typeof genFun && genFun.constructor; return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name)); }, exports.mark = function (genFun) { return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun; }, exports.awrap = function (arg) { return { __await: arg }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () { return this; }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) { void 0 === PromiseImpl && (PromiseImpl = Promise); var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl); return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) { return result.done ? result.value : iter.next(); }); }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () { return this; }), define(Gp, "toString", function () { return "[object Generator]"; }), exports.keys = function (val) { var object = Object(val), keys = []; for (var key in object) keys.push(key); return keys.reverse(), function next() { for (; keys.length;) { var key = keys.pop(); if (key in object) return next.value = key, next.done = !1, next; } return next.done = !0, next; }; }, exports.values = values, Context.prototype = { constructor: Context, reset: function reset(skipTempReset) { if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined); }, stop: function stop() { this.done = !0; var rootRecord = this.tryEntries[0].completion; if ("throw" === rootRecord.type) throw rootRecord.arg; return this.rval; }, dispatchException: function dispatchException(exception) { if (this.done) throw exception; var context = this; function handle(loc, caught) { return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught; } for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i], record = entry.completion; if ("root" === entry.tryLoc) return handle("end"); if (entry.tryLoc <= this.prev) { var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc"); if (hasCatch && hasFinally) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } else if (hasCatch) { if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0); } else { if (!hasFinally) throw new Error("try statement without catch or finally"); if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc); } } } }, abrupt: function abrupt(type, arg) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) { var finallyEntry = entry; break; } } finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null); var record = finallyEntry ? finallyEntry.completion : {}; return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record); }, complete: function complete(record, afterLoc) { if ("throw" === record.type) throw record.arg; return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel; }, finish: function finish(finallyLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel; } }, catch: function _catch(tryLoc) { for (var i = this.tryEntries.length - 1; i >= 0; --i) { var entry = this.tryEntries[i]; if (entry.tryLoc === tryLoc) { var record = entry.completion; if ("throw" === record.type) { var thrown = record.arg; resetTryEntry(entry); } return thrown; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(iterable, resultName, nextLoc) { return this.delegate = { iterator: values(iterable), resultName: resultName, nextLoc: nextLoc }, "next" === this.method && (this.arg = undefined), ContinueSentinel; } }, exports; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
import { useMemo, useRef, useCallback, useEffect } from 'react';
import cx from 'classnames';
import { WebGLRenderer, Scene, OrthographicCamera, PlaneGeometry, VideoTexture, LinearFilter, RGBAFormat, ShaderMaterial, Vector2, Mesh } from 'three';
import { SHADER_CONFIG, RENDER_MODE, DEFAULT_CANVAS_2D_HIDE_CANVAS_DOM_ID, DEFAULT_CANVAS_2D_CANVAS_DOM_CLASSNAME } from "./constants";
import logger from "./utils/logger";
import { sleep, detectWebGLContext, getDomInfo, createStats, setDomStyle } from "./utils/tools";

/** 错误信息 */
var ERROR_MSG = {
  DOM_NOT_EXIST: 'videoDom 或 containerDom 不存在',
  VIDEO_HEIGHT_NOT_EVEN: 'getComputedStyle(videoDom) 的 height 必须为偶数,目前为 %s, 请调整高度'
};
/**
 * 透明视频的 hooks
 */
var useTransparentVideo = function useTransparentVideo(config) {
  var getVideoDom = config.getVideoDom,
    getContainerDom = config.getContainerDom,
    _config$renderMode = config.renderMode,
    renderMode = _config$renderMode === void 0 ? RENDER_MODE.auto : _config$renderMode,
    canvasClassName = config.canvasClassName,
    fps = config.fps,
    debug = config.debug,
    _config$debugStatsMod = config.debugStatsMode,
    debugStatsMode = _config$debugStatsMod === void 0 ? 1 : _config$debugStatsMod,
    debugStatsFpsChange = config.debugStatsFpsChange,
    debugStatsMsChange = config.debugStatsMsChange;

  /** fps 信息 */
  var fpsInfo = useMemo(function () {
    var isValid = typeof fps === 'number';
    if (!isValid) {
      return {
        /** 是否有效 */
        isValid: isValid,
        /** 单位时间 */
        unitTime: 0
      };
    }
    return {
      isValid: isValid,
      unitTime: parseInt((1000 / fps).toString(), 10)
    };
  }, [fps]);

  /** debug 模式下的日志 */
  var debugLog = useCallback(function () {
    debug && logger.log.apply(logger, arguments);
  }, [debug]);

  /** 实际渲染的模式 */
  var mode = useMemo(function () {
    var modeResult = RENDER_MODE[renderMode] ? renderMode : RENDER_MODE.auto;
    // auto 检测
    if (modeResult === RENDER_MODE.auto) {
      return detectWebGLContext() ? RENDER_MODE.three : RENDER_MODE.canvas2d;
    }
    // 其他类型
    return modeResult;
  }, [renderMode]);

  /** 是否开启动画(用于 requestAnimationFrame 持续的执行) */
  var isOpenAnimation = useRef(false);
  /** 上次渲染的时间戳 */
  var lastRenderTimestampRef = useRef(0);

  /** 开始用 three 转换为透明视频 */
  var startThreeTransform = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
      var videoDom, containerDom, _getDomInfo, width, height, renderer, scene, camera, geometry, videoTexture, material, mesh, stats, render;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            videoDom = getVideoDom === null || getVideoDom === void 0 ? void 0 : getVideoDom();
            containerDom = getContainerDom === null || getContainerDom === void 0 ? void 0 : getContainerDom();
            if (videoDom && containerDom) {
              _context.next = 5;
              break;
            }
            logger.error(ERROR_MSG.DOM_NOT_EXIST, videoDom, containerDom);
            return _context.abrupt("return");
          case 5:
            if (!isOpenAnimation.current) {
              _context.next = 9;
              break;
            }
            isOpenAnimation.current = false;
            _context.next = 9;
            return sleep(50);
          case 9:
            isOpenAnimation.current = true;
            _getDomInfo = getDomInfo(videoDom), width = _getDomInfo.width, height = _getDomInfo.height;
            if (!(height % 2)) {
              _context.next = 14;
              break;
            }
            logger.error(ERROR_MSG.VIDEO_HEIGHT_NOT_EVEN, height);
            return _context.abrupt("return");
          case 14:
            // 清空容器内的子元素
            containerDom.innerHTML = '';

            // 渲染器及 dom 挂载
            renderer = new WebGLRenderer(); // renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setClearColor(0xffffff, 0);
            renderer.setSize(width, height / 2);
            setDomStyle(renderer.domElement, {
              width: '',
              height: ''
            });
            renderer.domElement.className = cx(DEFAULT_CANVAS_2D_CANVAS_DOM_CLASSNAME, canvasClassName);
            containerDom.appendChild(renderer.domElement);

            // 场景
            scene = new Scene(); // 相机
            camera = new OrthographicCamera(-width / 2, width / 2, height / 2, 0, 1, 100);
            camera.position.set(0, 0, 1);
            camera.lookAt(0, 0, 0);

            // 长方形
            geometry = new PlaneGeometry(width, height); // 视频纹理
            videoTexture = new VideoTexture(videoDom);
            videoTexture.minFilter = LinearFilter;
            videoTexture.magFilter = LinearFilter;
            videoTexture.format = RGBAFormat;

            // 材质
            material = new ShaderMaterial({
              vertexShader: SHADER_CONFIG.vertexShader,
              fragmentShader: SHADER_CONFIG.fragmentShader,
              transparent: true,
              uniforms: {
                resolution: {
                  value: new Vector2(window.innerWidth, window.innerHeight)
                },
                videoTexture: {
                  value: videoTexture
                }
              }
            }); // 网格
            mesh = new Mesh(geometry, material);
            scene.add(mesh);

            // 创建stats对象(用于查看帧率)
            stats = createStats({
              debug: debug,
              debugStatsMode: debugStatsMode,
              containerDom: containerDom,
              debugStatsFpsChange: debugStatsFpsChange,
              debugStatsMsChange: debugStatsMsChange
            });
            render = function render() {
              var now = Date.now();

              // 没配置fps 或达到渲染时间间隔
              if (!fpsInfo.isValid || now - lastRenderTimestampRef.current > fpsInfo.unitTime) {
                lastRenderTimestampRef.current = now;
                stats === null || stats === void 0 ? void 0 : stats.update();
                renderer.render(scene, camera);
              }
              isOpenAnimation.current && requestAnimationFrame(render);
            };
            render();
          case 36:
          case "end":
            return _context.stop();
        }
      }, _callee);
    }));
    return function startThreeTransform() {
      return _ref.apply(this, arguments);
    };
  }();

  /** 开始用 canvas2d 转换为透明视频 */
  var startCanvas2dTransform = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
      var videoDom, containerDom, _getDomInfo2, width, height, hideCanvasDom, hideCt, canvasDom, realCt, stats, render;
      return _regeneratorRuntime().wrap(function _callee2$(_context2) {
        while (1) switch (_context2.prev = _context2.next) {
          case 0:
            videoDom = getVideoDom === null || getVideoDom === void 0 ? void 0 : getVideoDom();
            containerDom = getContainerDom === null || getContainerDom === void 0 ? void 0 : getContainerDom();
            if (videoDom && containerDom) {
              _context2.next = 5;
              break;
            }
            logger.error(ERROR_MSG.DOM_NOT_EXIST, videoDom, containerDom);
            return _context2.abrupt("return");
          case 5:
            _getDomInfo2 = getDomInfo(videoDom), width = _getDomInfo2.width, height = _getDomInfo2.height;
            if (!(height % 2)) {
              _context2.next = 9;
              break;
            }
            logger.error(ERROR_MSG.VIDEO_HEIGHT_NOT_EVEN, height);
            return _context2.abrupt("return");
          case 9:
            // 清空容器内的子元素
            containerDom.innerHTML = '';

            // 隐藏的 canvas (用于色彩值计算, 宽高与视频一致)
            hideCanvasDom = document.createElement('canvas');
            hideCanvasDom.id = DEFAULT_CANVAS_2D_HIDE_CANVAS_DOM_ID;
            hideCanvasDom.width = width;
            hideCanvasDom.height = height;
            // 视觉隐藏
            setDomStyle(hideCanvasDom, {
              opacity: '0',
              position: 'fixed',
              zIndex: '-1',
              left: '0',
              top: '0'
            });
            containerDom.appendChild(hideCanvasDom);
            hideCt = hideCanvasDom.getContext('2d'); // 展示渲染的 canvas (高度为视频一半)
            canvasDom = document.createElement('canvas');
            canvasDom.className = cx(DEFAULT_CANVAS_2D_CANVAS_DOM_CLASSNAME, canvasClassName);
            canvasDom.width = width;
            canvasDom.height = height / 2;
            containerDom.appendChild(canvasDom);
            realCt = canvasDom.getContext('2d'); // 如果之前已经有动画,则暂停之前的动画再开始
            if (!isOpenAnimation.current) {
              _context2.next = 27;
              break;
            }
            isOpenAnimation.current = false;
            _context2.next = 27;
            return sleep(50);
          case 27:
            isOpenAnimation.current = true;

            // 创建stats对象(用于查看帧率)
            stats = createStats({
              debug: debug,
              debugStatsMode: debugStatsMode,
              containerDom: containerDom,
              debugStatsFpsChange: debugStatsFpsChange,
              debugStatsMsChange: debugStatsMsChange
            });
            render = function render() {
              var now = Date.now();
              // 没配置fps 或达到渲染时间间隔
              if (!fpsInfo.isValid || now - lastRenderTimestampRef.current > fpsInfo.unitTime) {
                lastRenderTimestampRef.current = now;
                stats === null || stats === void 0 ? void 0 : stats.update();

                // 利用隐藏的 canvas 处理数据
                hideCt.drawImage(videoDom, 0, 0, width, height);
                var imgData = hideCt.getImageData(0, 0, width, height);
                var halfLength = imgData.data.length / 2;
                for (var i = 0; i < halfLength; i += 4) {
                  var targetIndex = halfLength + i;
                  imgData.data[i + 3] = imgData.data[targetIndex];
                }

                // 数据给实际的 canvas 渲染
                realCt.putImageData(imgData, 0, 0);
              }
              isOpenAnimation.current && requestAnimationFrame(render);
            };
            render();
          case 31:
          case "end":
            return _context2.stop();
        }
      }, _callee2);
    }));
    return function startCanvas2dTransform() {
      return _ref2.apply(this, arguments);
    };
  }();
  useEffect(function () {
    debugLog('input mode: %s, actual mode: %s', renderMode, mode);
    return function () {
      // 结束渲染
      isOpenAnimation.current = false;
    };
  }, []);
  return {
    startTransform: mode === RENDER_MODE.three ? startThreeTransform : startCanvas2dTransform
  };
};
export default useTransparentVideo;