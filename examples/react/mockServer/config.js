/** 通用正常响应 */
const COMMON_RESPONSE = {
  code: 200,
  data: {},
  message: '成功',
};

/** 配置项 */
const config = {
  /** 从相应环境的浏览器中拿一下 */
  cookie: '',
  /** 是否开启 mock */
  mock: false,
  /**
   * 自定义的 mock api
   *
   * key: 'method|路径|mockFile'
   *    - method 不区分大小写
   *    - 路径可以使 path-to-regexp 路径字符串
   *    - mockFile,可选,对应 mock/method/下的文件,这里的 method 目录是小写
   * value: object | () => object
   * 返回值的优先级 value > mockFile
   */
  mockApi: {
    // 直接返回值,优先级高
    'get|/api/user/detail': () => {
      return {
        data: {
          name: 'mock_name',
        },
      };
    },
    // 读取 mockFile 文件,即 mock/get/detail_data
    // 'get|/api/user/detail|detail_data': undefined,
  },
};

module.exports = config;
