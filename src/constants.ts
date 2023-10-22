/** 材质的着色器配置 */
export const SHADER_CONFIG = {
  /** 点着色器 */
  vertexShader: `
varying vec2 vUv;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  vUv = uv;
}
`,
  /** 片段着色器 */
  fragmentShader: `
uniform sampler2D videoTexture;
uniform vec2 resolution;

varying vec2 vUv;

void main() {
  vec4 color = texture2D(videoTexture, vUv);

  // 计算透明度
  float alpha = 1.0;
  if (vUv.y > 0.5) {
    vec4 lowerColor = texture2D(videoTexture, vec2(vUv.x, vUv.y - 0.5));
    alpha = lowerColor.r;
  }

  gl_FragColor = vec4(color.rgb, alpha);
}
`,
};

/** 渲染模式 */
export const RENDER_MODE = {
  /** 自动模式(默认,会通过 webgl 检查, 如果支持 webgl 则使用 three 渲染,不支持则使用 canvas2d 渲染) */
  auto: 'auto',
  /** 纯 canvas 2d 模式渲染 */
  canvas2d: 'canvas2d',
  /** 使用 three 模式渲染 */
  three: 'three',
} as const;

export type TRenderMode = (typeof RENDER_MODE)[keyof typeof RENDER_MODE];

/** 日志前缀 */
export const LOG_PREFIX = '==>tv_log';

/** canvas2d 模式下, 隐藏的 canvas dom id */
export const DEFAULT_CANVAS_2D_HIDE_CANVAS_DOM_ID = 'default_canvas_2d_hide_canvas';

/** canvas2d 模式下,展示的 canvas dom 的 classname */
export const DEFAULT_CANVAS_2D_CANVAS_DOM_CLASSNAME = 'default_canvas_2d_canvas';

/** hooks 和组件 props 的公共配置 */
export interface ICommonConfig {
  renderMode?: TRenderMode;
  /** 原视频播放 dom */
  getVideoDom: () => HTMLVideoElement | null;
  /** 渲染 canvas 元素的 className(该 className 只在 startTransform 时生效, 后期动态修改无效) */
  canvasClassName?: string;
  /** 渲染的 fps.不传则按 requestAnimationFrame 的间隔渲染 */
  fps?: number;
  /** debug 模式会开启日志 */
  debug?: boolean;
  /** debug 模式下 stats 插件模式,默认为 1. 0: fps, 1:单帧渲染耗时(毫秒)  */
  debugStatsMode?: number;
  /** debug 模式下 stats 插件模式,fps 改变时回调函数  */
  debugStatsFpsChange?: (fps: number) => void;
  /** debug 模式下 stats 插件模式,单帧 ms 改变时回调函数  */
  debugStatsMsChange?: (ms: number) => void;
}

export interface ITransparentVideoRef {
  startTransform: () => Promise<void>;
}
