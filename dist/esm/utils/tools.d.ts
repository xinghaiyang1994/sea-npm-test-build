import { ICommonConfig } from '../constants';
export declare const sleep: <T = any>(timeout: number, data?: T | undefined) => Promise<T | undefined>;
/** 检测 webgl 的兼容性 */
export declare const detectWebGLContext: () => boolean;
/** 获取 dom 元素信息 */
export declare const getDomInfo: (dom: HTMLElement) => {
    width: number;
    height: number;
};
interface IConfig extends Pick<ICommonConfig, 'debug' | 'debugStatsMode' | 'debugStatsFpsChange' | 'debugStatsMsChange'> {
    containerDom: HTMLElement;
}
/** 根据业务逻辑创建 Stats 对象 */
export declare const createStats: (config: IConfig) => any;
/** 设置元素样式 */
export declare const setDomStyle: (dom: HTMLElement, styles: Record<string, string>) => void;
export {};
