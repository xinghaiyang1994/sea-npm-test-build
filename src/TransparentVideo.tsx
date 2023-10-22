import React, { useRef, forwardRef, useImperativeHandle } from 'react';

import { ICommonConfig, ITransparentVideoRef } from './constants';

import useTransparentVideo from './useTransparentVideo';

export interface ITransparentVideoProps extends ICommonConfig {
  className?: string;
  style?: React.CSSProperties;
}

const TransparentVideo = forwardRef<ITransparentVideoRef, ITransparentVideoProps>((props, ref): any => {
  const { className, style, ...restProps } = props;
  const containerDom = useRef<HTMLDivElement>(null);
  const { startTransform } = useTransparentVideo({
    ...restProps,
    getContainerDom: () => containerDom.current,
  });

  useImperativeHandle(ref, () => ({
    startTransform,
  }));

  return <div className={className} style={style} ref={containerDom} />;
});

export default TransparentVideo;
