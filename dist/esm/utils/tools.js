import logger from "./logger";
import Stats from "./Stats";
export var sleep = function sleep(timeout, data) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve(data);
    }, timeout);
  });
};

/** 检测 webgl 的兼容性 */
export var detectWebGLContext = function detectWebGLContext() {
  try {
    var canvas = document.createElement('canvas');
    var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return Boolean(gl && gl instanceof WebGLRenderingContext);
  } catch (error) {
    logger.warn('webgl detect error', error);
    return false;
  }
};

/** 获取 dom 元素信息 */
export var getDomInfo = function getDomInfo(dom) {
  var domInfo = getComputedStyle(dom);
  var width = parseInt(domInfo.width, 10);
  var height = parseInt(domInfo.height, 10);
  return {
    width: width,
    height: height
  };
};
/** 根据业务逻辑创建 Stats 对象 */
export var createStats = function createStats(config) {
  var debug = config.debug,
    debugStatsMode = config.debugStatsMode,
    containerDom = config.containerDom,
    debugStatsFpsChange = config.debugStatsFpsChange,
    debugStatsMsChange = config.debugStatsMsChange;
  // 创建stats对象(用于查看帧率)
  var stats = debug ? new Stats(debugStatsFpsChange, debugStatsMsChange) : null;
  if (stats) {
    stats.showPanel(debugStatsMode);
    containerDom.appendChild(stats.dom);
  }
  return stats;
};

/** 设置元素样式 */
export var setDomStyle = function setDomStyle(dom, styles) {
  Object.keys(styles).forEach(function (key) {
    dom.style[key] = styles[key];
  });
};