import { ITransparentVideoProps } from './TransparentVideo';
interface TransparentVideoClassConfig extends ITransparentVideoProps {
    rootId: string;
}
/** 封装成 class, 方便非 react 项目引入 */
declare class TransparentVideoClass {
    config: TransparentVideoClassConfig;
    private tvRef;
    constructor(config: TransparentVideoClassConfig);
    /** 初始化挂载 */
    private init;
    /** 开始转换 */
    startTransform(): void;
}
export default TransparentVideoClass;
