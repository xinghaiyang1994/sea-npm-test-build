import { useMemo, useRef, useCallback, useEffect } from 'react';
import cx from 'classnames';
import { WebGLRenderer, Scene, OrthographicCamera, PlaneGeometry, VideoTexture, LinearFilter, RGBAFormat, ShaderMaterial, Vector2, Mesh } from 'three';

import { ICommonConfig, SHADER_CONFIG, RENDER_MODE, DEFAULT_CANVAS_2D_HIDE_CANVAS_DOM_ID, DEFAULT_CANVAS_2D_CANVAS_DOM_CLASSNAME } from './constants';
import logger, { TLoggerFn } from './utils/logger';
import { sleep, detectWebGLContext, getDomInfo, createStats, setDomStyle } from './utils/tools';

/** 错误信息 */
const ERROR_MSG = {
  DOM_NOT_EXIST: 'videoDom 或 containerDom 不存在',
  VIDEO_HEIGHT_NOT_EVEN: 'getComputedStyle(videoDom) 的 height 必须为偶数,目前为 %s, 请调整高度',
};

interface IConfig extends ICommonConfig {
  /** 渲染后透明视频的外层 dom */
  getContainerDom?: () => HTMLDivElement | null;
}

/**
 * 透明视频的 hooks
 */
const useTransparentVideo = (config: IConfig) => {
  const {
    getVideoDom,
    getContainerDom,
    renderMode = RENDER_MODE.auto,
    canvasClassName,
    debug,
    debugStatsMode = 1,
    debugStatsFpsChange,
    debugStatsMsChange,
  } = config;

  /** debug 模式下的日志 */
  const debugLog = useCallback(
    (...rest: Parameters<TLoggerFn>) => {
      debug && logger.log(...rest);
    },
    [debug]
  );

  /** 实际渲染的模式 */
  const mode = useMemo(() => {
    const modeResult = RENDER_MODE[renderMode] ? renderMode : RENDER_MODE.auto;
    // auto 检测
    if (modeResult === RENDER_MODE.auto) {
      return detectWebGLContext() ? RENDER_MODE.three : RENDER_MODE.canvas2d;
    }
    // 其他类型
    return modeResult;
  }, [renderMode]);

  /** 是否开启动画(用于 requestAnimationFrame 持续的执行) */
  const isOpenAnimation = useRef(false);

  /** 开始用 three 转换为透明视频 */
  const startThreeTransform = async () => {
    const videoDom = getVideoDom?.();
    const containerDom = getContainerDom?.();

    if (!(videoDom && containerDom)) {
      logger.error(ERROR_MSG.DOM_NOT_EXIST, videoDom, containerDom);
      return;
    }

    // 如果之前已经有动画,则暂停之前的动画再开始
    if (isOpenAnimation.current) {
      isOpenAnimation.current = false;
      await sleep(50);
    }
    isOpenAnimation.current = true;

    const { width, height } = getDomInfo(videoDom);
    if (height % 2) {
      logger.error(ERROR_MSG.VIDEO_HEIGHT_NOT_EVEN, height);
      return;
    }

    // 清空容器内的子元素
    containerDom.innerHTML = '';

    // 渲染器及 dom 挂载
    const renderer = new WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0xffffff, 0);
    renderer.setSize(width, height / 2);
    setDomStyle(renderer.domElement, {
      width: '',
      height: '',
    });
    renderer.domElement.className = cx(DEFAULT_CANVAS_2D_CANVAS_DOM_CLASSNAME, canvasClassName);
    containerDom.appendChild(renderer.domElement);

    // 场景
    const scene = new Scene();

    // 相机
    const camera = new OrthographicCamera(-width / 2, width / 2, height / 2, 0, 1, 100);
    camera.position.set(0, 0, 1);
    camera.lookAt(0, 0, 0);

    // 长方形
    const geometry = new PlaneGeometry(width, height);

    // 视频纹理
    const videoTexture = new VideoTexture(videoDom);
    videoTexture.minFilter = LinearFilter;
    videoTexture.magFilter = LinearFilter;
    videoTexture.format = RGBAFormat;

    // 材质
    const material = new ShaderMaterial({
      vertexShader: SHADER_CONFIG.vertexShader,
      fragmentShader: SHADER_CONFIG.fragmentShader,
      transparent: true,
      uniforms: {
        resolution: {
          value: new Vector2(window.innerWidth, window.innerHeight),
        },
        videoTexture: { value: videoTexture },
      },
    });

    // 网格
    const mesh = new Mesh(geometry, material);
    scene.add(mesh);

    // 创建stats对象(用于查看帧率)
    const stats = createStats({
      debug,
      debugStatsMode,
      containerDom,
      debugStatsFpsChange,
      debugStatsMsChange,
    });

    const render = () => {
      stats?.update();

      renderer.render(scene, camera);

      isOpenAnimation.current && requestAnimationFrame(render);
    };

    render();
  };

  /** 开始用 canvas2d 转换为透明视频 */
  const startCanvas2dTransform = async () => {
    const videoDom = getVideoDom?.();
    const containerDom = getContainerDom?.();

    if (!(videoDom && containerDom)) {
      logger.error(ERROR_MSG.DOM_NOT_EXIST, videoDom, containerDom);
      return;
    }

    const { width, height } = getDomInfo(videoDom);

    if (height % 2) {
      logger.error(ERROR_MSG.VIDEO_HEIGHT_NOT_EVEN, height);
      return;
    }

    // 清空容器内的子元素
    containerDom.innerHTML = '';

    // 隐藏的 canvas (用于色彩值计算, 宽高与视频一致)
    const hideCanvasDom = document.createElement('canvas');
    hideCanvasDom.id = DEFAULT_CANVAS_2D_HIDE_CANVAS_DOM_ID;
    hideCanvasDom.width = width;
    hideCanvasDom.height = height;
    // 视觉隐藏
    setDomStyle(hideCanvasDom, {
      opacity: '0',
      position: 'fixed',
      zIndex: '-1',
      left: '0',
      top: '0',
    });
    containerDom.appendChild(hideCanvasDom);
    const hideCt = hideCanvasDom.getContext('2d')!;

    // 展示渲染的 canvas (高度为视频一半)
    const canvasDom = document.createElement('canvas');
    canvasDom.className = cx(DEFAULT_CANVAS_2D_CANVAS_DOM_CLASSNAME, canvasClassName);
    canvasDom.width = width;
    canvasDom.height = height / 2;
    containerDom.appendChild(canvasDom);
    const realCt = canvasDom.getContext('2d')!;

    // 如果之前已经有动画,则暂停之前的动画再开始
    if (isOpenAnimation.current) {
      isOpenAnimation.current = false;
      await sleep(50);
    }
    isOpenAnimation.current = true;

    // 创建stats对象(用于查看帧率)
    const stats = createStats({
      debug,
      debugStatsMode,
      containerDom,
      debugStatsFpsChange,
      debugStatsMsChange,
    });

    const render = () => {
      stats?.update();

      // 利用隐藏的 canvas 处理数据
      hideCt.drawImage(videoDom, 0, 0, width, height);
      const imgData = hideCt.getImageData(0, 0, width, height);

      const halfLength = imgData.data.length / 2;
      for (let i = 0; i < halfLength; i += 4) {
        const targetIndex = halfLength + i;
        imgData.data[i + 3] = imgData.data[targetIndex];
      }

      // 数据给实际的 canvas 渲染
      realCt.putImageData(imgData, 0, 0);

      isOpenAnimation.current && requestAnimationFrame(render);
    };

    render();
  };

  useEffect(() => {
    debugLog('input mode: %s, actual mode: %s', renderMode, mode);
    return () => {
      // 结束渲染
      isOpenAnimation.current = false;
    };
  }, []);

  return {
    startTransform: mode === RENDER_MODE.three ? startThreeTransform : startCanvas2dTransform,
  };
};

export default useTransparentVideo;
