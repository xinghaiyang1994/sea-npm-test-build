import { ICommonConfig } from './constants';
interface IConfig extends ICommonConfig {
    /** 渲染后透明视频的外层 dom */
    getContainerDom?: () => HTMLDivElement | null;
}
/**
 * 透明视频的 hooks
 */
declare const useTransparentVideo: (config: IConfig) => {
    startTransform: () => Promise<void>;
};
export default useTransparentVideo;
