import logger from './logger';
import Stats from './Stats';
import { ICommonConfig } from '../constants';

export const sleep = <T = any>(timeout: number, data?: T) =>
  new Promise<T | undefined>((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, timeout);
  });

/** 检测 webgl 的兼容性 */
export const detectWebGLContext = () => {
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return Boolean(gl && gl instanceof WebGLRenderingContext);
  } catch (error) {
    logger.warn('webgl detect error', error);
    return false;
  }
};

/** 获取 dom 元素信息 */
export const getDomInfo = (dom: HTMLElement) => {
  const domInfo = getComputedStyle(dom);

  const width = parseInt(domInfo.width, 10);
  const height = parseInt(domInfo.height, 10);

  return {
    width,
    height,
  };
};

interface IConfig extends Pick<ICommonConfig, 'debug' | 'debugStatsMode' | 'debugStatsFpsChange' | 'debugStatsMsChange'> {
  containerDom: HTMLElement;
}

/** 根据业务逻辑创建 Stats 对象 */
export const createStats = (config: IConfig) => {
  const { debug, debugStatsMode, containerDom, debugStatsFpsChange, debugStatsMsChange } = config;
  // 创建stats对象(用于查看帧率)
  const stats = debug ? new (Stats as any)(debugStatsFpsChange, debugStatsMsChange) : null;
  if (stats) {
    stats.showPanel(debugStatsMode);
    containerDom.appendChild(stats.dom);
  }
  return stats;
};

/** 设置元素样式 */
export const setDomStyle = (dom: HTMLElement, styles: Record<string, string>) => {
  Object.keys(styles).forEach((key: any) => {
    dom.style[key] = styles[key];
  });
};
