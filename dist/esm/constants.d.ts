/** 材质的着色器配置 */
export declare const SHADER_CONFIG: {
    /** 点着色器 */
    vertexShader: string;
    /** 片段着色器 */
    fragmentShader: string;
};
/** 渲染模式 */
export declare const RENDER_MODE: {
    /** 自动模式(默认,会通过 webgl 检查, 如果支持 webgl 则使用 three 渲染,不支持则使用 canvas2d 渲染) */
    readonly auto: "auto";
    /** 纯 canvas 2d 模式渲染 */
    readonly canvas2d: "canvas2d";
    /** 使用 three 模式渲染 */
    readonly three: "three";
};
export type TRenderMode = (typeof RENDER_MODE)[keyof typeof RENDER_MODE];
/** 日志前缀 */
export declare const LOG_PREFIX = "==>tv_log";
/** canvas2d 模式下, 隐藏的 canvas dom id */
export declare const DEFAULT_CANVAS_2D_HIDE_CANVAS_DOM_ID = "default_canvas_2d_hide_canvas";
/** canvas2d 模式下,展示的 canvas dom 的 classname */
export declare const DEFAULT_CANVAS_2D_CANVAS_DOM_CLASSNAME = "default_canvas_2d_canvas";
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
