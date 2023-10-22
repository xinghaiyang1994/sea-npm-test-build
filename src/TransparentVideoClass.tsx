import ReactDOM from 'react-dom';
import React from 'react';

import TransparentVideo, { ITransparentVideoProps } from './TransparentVideo';
import { ITransparentVideoRef } from './constants';

interface TransparentVideoClassConfig extends ITransparentVideoProps {
  rootId: string;
}

/** 封装成 class, 方便非 react 项目引入 */
class TransparentVideoClass {
  config: TransparentVideoClassConfig
  private tvRef = React.createRef<ITransparentVideoRef>()
  constructor(config: TransparentVideoClassConfig) {
    this.config = config
    this.init()
  }
  /** 初始化挂载 */
  private init() {
    const { rootId, ...rest } =  this.config
    const dom = document.querySelector(`#${rootId}`)
    const reactView = <TransparentVideo ref={this.tvRef} {...rest} /> as any
    ReactDOM.render(reactView, dom)
  }
  /** 开始转换 */
  startTransform() {
    this.tvRef.current?.startTransform()
  }
}

export default TransparentVideoClass