import { LOG_PREFIX } from "../constants";
var createPrefix = function createPrefix(msg) {
  return "".concat(LOG_PREFIX, " ").concat(msg);
};
/** 统一日志信息 */
var logger = {
  log: function log(msg) {
    var _console;
    for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      rest[_key - 1] = arguments[_key];
    }
    (_console = console).log.apply(_console, [createPrefix(msg)].concat(rest));
  },
  warn: function warn(msg) {
    var _console2;
    for (var _len2 = arguments.length, rest = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
      rest[_key2 - 1] = arguments[_key2];
    }
    (_console2 = console).warn.apply(_console2, [createPrefix(msg)].concat(rest));
  },
  error: function error(msg) {
    var _console3;
    for (var _len3 = arguments.length, rest = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
      rest[_key3 - 1] = arguments[_key3];
    }
    (_console3 = console).error.apply(_console3, [createPrefix(msg)].concat(rest));
  }
};
export default logger;