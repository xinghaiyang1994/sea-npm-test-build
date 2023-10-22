/** 材质的着色器配置 */
export var SHADER_CONFIG = {
  /** 点着色器 */
  vertexShader: "\nvarying vec2 vUv;\n\nvoid main() {\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n  vUv = uv;\n}\n",
  /** 片段着色器 */
  fragmentShader: "\nuniform sampler2D videoTexture;\nuniform vec2 resolution;\n\nvarying vec2 vUv;\n\nvoid main() {\n  vec4 color = texture2D(videoTexture, vUv);\n\n  // \u8BA1\u7B97\u900F\u660E\u5EA6\n  float alpha = 1.0;\n  if (vUv.y > 0.5) {\n    vec4 lowerColor = texture2D(videoTexture, vec2(vUv.x, vUv.y - 0.5));\n    alpha = lowerColor.r;\n  }\n\n  gl_FragColor = vec4(color.rgb, alpha);\n}\n"
};

/** 渲染模式 */
export var RENDER_MODE = {
  /** 自动模式(默认,会通过 webgl 检查, 如果支持 webgl 则使用 three 渲染,不支持则使用 canvas2d 渲染) */
  auto: 'auto',
  /** 纯 canvas 2d 模式渲染 */
  canvas2d: 'canvas2d',
  /** 使用 three 模式渲染 */
  three: 'three'
};
/** 日志前缀 */
export var LOG_PREFIX = '==>tv_log';

/** canvas2d 模式下, 隐藏的 canvas dom id */
export var DEFAULT_CANVAS_2D_HIDE_CANVAS_DOM_ID = 'default_canvas_2d_hide_canvas';

/** canvas2d 模式下,展示的 canvas dom 的 classname */
export var DEFAULT_CANVAS_2D_CANVAS_DOM_CLASSNAME = 'default_canvas_2d_canvas';

/** hooks 和组件 props 的公共配置 */