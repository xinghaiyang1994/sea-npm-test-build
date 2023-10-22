import React from 'react';
// import { TransparentVideo, ITransparentVideoRef } from '@/utils/transparentVideo';
import { TransparentVideo, ITransparentVideoRef } from 'sea-npm-test-build';

const Demo = () => {
  const tvRef = React.useRef<ITransparentVideoRef>(null);
  const domVideo = React.useRef<HTMLVideoElement>(null);

  return (
    <div>
      <div>
        <button
          type="button"
          onClick={() => {
            // 开始触发转换
            tvRef.current?.startTransform();
          }}
        >
          点击1
        </button>
      </div>
      {/* 原视频 */}
      <video
        style={{
          height: 300,
        }}
        ref={domVideo}
        controls
        autoPlay
        loop
        muted
        src="/statics/video/transparent-video-demo.mp4"
      />
      {/* 渲染后的视频 */}
      <TransparentVideo debug debugStatsMode={0} renderMode="canvas2d" ref={tvRef} getVideoDom={() => domVideo.current} />
    </div>
  );
};

export default Demo;
