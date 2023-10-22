var _excluded = ["rootId"];
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import ReactDOM from 'react-dom';
import React from 'react';
import TransparentVideo from "./TransparentVideo";
/** 封装成 class, 方便非 react 项目引入 */
var TransparentVideoClass = /*#__PURE__*/function () {
  function TransparentVideoClass(config) {
    _classCallCheck(this, TransparentVideoClass);
    _defineProperty(this, "config", void 0);
    _defineProperty(this, "tvRef", /*#__PURE__*/React.createRef());
    this.config = config;
    this.init();
  }
  /** 初始化挂载 */
  _createClass(TransparentVideoClass, [{
    key: "init",
    value: function init() {
      var _this$config = this.config,
        rootId = _this$config.rootId,
        rest = _objectWithoutProperties(_this$config, _excluded);
      var dom = document.querySelector("#".concat(rootId));
      var reactView = /*#__PURE__*/React.createElement(TransparentVideo, _extends({
        ref: this.tvRef
      }, rest));
      ReactDOM.render(reactView, dom);
    }
    /** 开始转换 */
  }, {
    key: "startTransform",
    value: function startTransform() {
      var _this$tvRef$current;
      (_this$tvRef$current = this.tvRef.current) === null || _this$tvRef$current === void 0 ? void 0 : _this$tvRef$current.startTransform();
    }
  }]);
  return TransparentVideoClass;
}();
export default TransparentVideoClass;