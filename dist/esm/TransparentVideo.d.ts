import React from 'react';
import { ICommonConfig, ITransparentVideoRef } from './constants';
export interface ITransparentVideoProps extends ICommonConfig {
    className?: string;
    style?: React.CSSProperties;
}
declare const TransparentVideo: React.ForwardRefExoticComponent<ITransparentVideoProps & React.RefAttributes<ITransparentVideoRef>>;
export default TransparentVideo;
